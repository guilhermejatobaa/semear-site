"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import unidades from "@/content/unidades.json";
import { TEMAS, UFS_ROTULO, type NomeTema } from "./temas";

// ufs-nordeste.json traz as nove UFs do Nordeste, e a Semear atende todas —
// a região inteira. Por isso o preenchimento é uniforme: o que distingue os
// estados não é a cor, são os pontos das unidades. PI e PB não têm loja, mas
// são território atendido como qualquer outro (devolutiva, item 1.1).

// O viewBox segue a proporção real do Nordeste projetado em Mercator (0,932:
// a região é mais ALTA que larga). A versão anterior era 760x640 — mais larga
// que alta —, o que deixava faixas mortas de 130px a 190px em cima e embaixo
// dentro dos contêineres, que são todos mais altos que largos.
const W = 671;
const H = 720;
const PAD = 12;
// Limites exatos da terra das nove UFs, medidos de ufs-nordeste.json. O recorte
// anterior parava em lat -14.8 e cortava a Bahia, que desce até -18.34: a ponta
// dela ficava fora do retângulo do mar e era recortada pela borda do elemento.
const RECORTE: GeoJSON.Feature<GeoJSON.Polygon> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-48.76, -1.05],
        [-32.41, -1.05],
        [-32.41, -18.34],
        [-48.76, -18.34],
        [-48.76, -1.05],
      ],
    ],
  },
};

let paisesCache: FeatureCollection<Geometry, { name: string }> | null = null;
let paisesCachePromise: Promise<FeatureCollection<Geometry, { name: string }>> | null =
  null;

function carregarPaises() {
  if (paisesCache) return Promise.resolve(paisesCache);
  if (!paisesCachePromise) {
    paisesCachePromise = fetch("/mapa/countries-110m.json")
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao carregar geometria do mapa");
        return r.json();
      })
      .then((topo: Topology) => {
        const paises = feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as unknown as FeatureCollection<Geometry, { name: string }>;
        paisesCache = paises;
        return paises;
      });
  }
  return paisesCachePromise;
}

type PropsUf = { sigla: string; nome: string };
let ufsCache: FeatureCollection<Geometry, PropsUf> | null = null;
let ufsCachePromise: Promise<FeatureCollection<Geometry, PropsUf>> | null = null;

function carregarUfs() {
  if (ufsCache) return Promise.resolve(ufsCache);
  if (!ufsCachePromise) {
    ufsCachePromise = fetch("/mapa/ufs-nordeste.json")
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao carregar geometria das UFs");
        return r.json();
      })
      .then((fc: FeatureCollection<Geometry, PropsUf>) => {
        ufsCache = fc;
        return fc;
      });
  }
  return ufsCachePromise;
}

const projecao = geoMercator().fitExtent(
  [
    [PAD, PAD],
    [W - PAD, H - PAD],
  ],
  RECORTE
);
// .digits(2) e o arredondamento manual em xy() existem para dar
// determinismo bit-a-bit entre SSR (Node) e o cliente (Chromium): as
// funções trigonométricas da projeção de Mercator podem divergir no
// último dígito entre motores JS, o que quebra a hidratação do React
// em coordenadas SVG não arredondadas.
const caminho = geoPath(projecao).digits(2);
function xy(lat: number, lng: number): [number, number] {
  const p = projecao([lng, lat]);
  if (!p) return [0, 0];
  return [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100];
}

export type MapaProps = {
  tema?: NomeTema;
  mostrarUf?: boolean;
  selecionada?: string | null;
  onSelecionar?: (slug: string) => void;
  className?: string;
};

export function Mapa({
  tema = "mata",
  mostrarUf = true,
  selecionada = null,
  onSelecionar,
  className = "",
}: MapaProps) {
  const [paises, setPaises] = useState<FeatureCollection<
    Geometry,
    { name: string }
  > | null>(paisesCache);
  const [ufs, setUfs] = useState<FeatureCollection<Geometry, PropsUf> | null>(
    ufsCache
  );
  const [erro, setErro] = useState(false);
  const [sobrevoo, setSobrevoo] = useState<string | null>(null);
  const T = TEMAS[tema];

  useEffect(() => {
    if (paises) return;
    carregarPaises()
      .then(setPaises)
      .catch(() => setErro(true));
  }, [paises]);

  useEffect(() => {
    if (ufs) return;
    // Falha aqui não quebra o mapa: sem as UFs ele volta ao desenho de país.
    carregarUfs()
      .then(setUfs)
      .catch(() => undefined);
  }, [ufs]);

  const pontosXy = useMemo(
    () =>
      unidades.map((u) => {
        const [x, y] = xy(u.lat, u.lng);
        return { ...u, x, y };
      }),
    []
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      // Ancorado no topo, não centralizado: quando sobra altura no contêiner,
      // o padrão (xMidYMid) divide a sobra em cima e embaixo e empurra a costa
      // do Maranhão para baixo. Com YMin a sobra vai toda para o rodapé, onde
      // é só mar, e o mapa encosta na divisória do cabeçalho.
      preserveAspectRatio="xMidYMin meet"
      className={className}
      role="img"
      aria-label="Mapa de cobertura da Semear no Nordeste do Brasil"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* Deliberadamente muito maior que o viewBox: o SVG recorta no viewport
          do elemento, não no viewBox, então isto garante mar em toda a sobra
          quando a proporção do contêiner não bate com a do mapa. */}
      <rect x={-W} y={-H} width={W * 3} height={H * 3} fill={T.mar} />

      {paises &&
        paises.features.map((f, i) => (
          <path
            key={i}
            d={caminho(f) ?? undefined}
            fill={f.properties.name === "Brazil" ? T.terra : T.vizinho}
            stroke={T.traco}
            strokeWidth={0.8}
          />
        ))}

      {ufs &&
        ufs.features.map((f) => {
          return (
            <path
              key={f.properties.sigla}
              d={caminho(f) ?? undefined}
              fill={T.atuacao}
              stroke={T.atuacaoTraco}
              strokeWidth={1}
              strokeLinejoin="round"
            />
          );
        })}

      {erro && (
        <text x={PAD} y={PAD + 16} fill={T.rotulo} fontSize={12}>
          Mapa offline: geometria não carregada
        </text>
      )}

      {mostrarUf &&
        UFS_ROTULO.map((u) => {
          const [x, y] = xy(u.lat, u.lng);
          return (
            <text
              key={u.s}
              x={x}
              y={y}
              textAnchor="middle"
              fill={T.uf}
              className="select-none"
              style={{
                font: '600 11px Inter, system-ui, sans-serif',
                letterSpacing: ".16em",
              }}
            >
              {u.s}
            </text>
          );
        })}

      {pontosXy.map((u, i) => {
        const ativo = selecionada === u.slug;
        const comLabel = ativo || sobrevoo === u.slug;
        return (
          <g
            key={u.slug}
            style={{
              animation: `mapa-ponto-entrada .55s cubic-bezier(.34,1.56,.64,1) ${
                0.25 + i * 0.09
              }s both`,
            }}
          >
            <circle
              cx={u.x}
              cy={u.y}
              r={ativo ? 26 : 17}
              fill={T.halo}
              style={{ transition: "r .3s ease" }}
            />
            {T.onda && (
              <circle
                cx={u.x}
                cy={u.y}
                r={8}
                fill="none"
                stroke={T.ponto}
                strokeWidth={1.4}
                opacity={0.5}
                style={{
                  animation: `mapa-onda 3.2s ${i * 0.35}s ease-out infinite`,
                }}
              />
            )}
            <circle
              cx={u.x}
              cy={u.y}
              r={ativo ? 10 : 6.5}
              fill={ativo ? T.ativo : T.ponto}
              style={{
                transition: "r .3s ease, fill .3s ease",
                animation: ativo ? "mapa-pisca 1.1s ease-in-out infinite" : undefined,
              }}
            />
            <text
              x={u.x}
              y={u.y - 24}
              textAnchor="middle"
              fill={T.rotulo}
              opacity={comLabel ? 1 : 0}
              className="select-none pointer-events-none"
              style={{
                font: '700 13px "Roboto Condensed", Inter, sans-serif',
                letterSpacing: ".06em",
                textTransform: "uppercase",
                transition: "opacity .22s ease",
              }}
            >
              {u.nome}
            </text>
            <circle
              cx={u.x}
              cy={u.y}
              r={22}
              fill="transparent"
              className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cana"
              tabIndex={0}
              role="button"
              aria-label={`Ver unidade ${u.nome}`}
              onMouseEnter={() => setSobrevoo(u.slug)}
              onMouseLeave={() => setSobrevoo(null)}
              onFocus={() => setSobrevoo(u.slug)}
              onBlur={() => setSobrevoo(null)}
              onClick={() => onSelecionar?.(u.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelecionar?.(u.slug);
                }
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
