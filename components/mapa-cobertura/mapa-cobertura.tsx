"use client";

import { useMemo, useState } from "react";
import unidades from "@/content/unidades.json";
import municipios from "@/content/municipios.json";
import { unidadeMaisProxima } from "@/lib/distancia";
import { projetar, VIEWBOX_W, VIEWBOX_H } from "./projecao";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

const WHATSAPP_COMERCIAL = "558233281831";

type Selecao =
  | { tipo: "unidade"; slug: string }
  | { tipo: "municipio"; nome: string; uf: string; lat: number; lng: number };

export function MapaCobertura() {
  const [busca, setBusca] = useState("");
  const [selecao, setSelecao] = useState<Selecao | null>(null);

  const sugestoes = useMemo(() => {
    if (busca.trim().length < 2) return [];
    const alvo = normalizar(busca);
    return municipios
      .filter((m) => normalizar(m.nome).includes(alvo))
      .slice(0, 6);
  }, [busca]);

  const resultado = useMemo(() => {
    if (!selecao) return null;
    if (selecao.tipo === "unidade") {
      const unidade = unidades.find((u) => u.slug === selecao.slug);
      if (!unidade) return null;
      return { unidade, distanciaKm: 0 };
    }
    return unidadeMaisProxima(selecao.lat, selecao.lng);
  }, [selecao]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="relative">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="w-full rounded-sm bg-massape"
          role="img"
          aria-label="Mapa de cobertura da Semear no Nordeste"
        >
          {unidades.map((unidade, i) => {
            const { x, y } = projetar(unidade.lat, unidade.lng);
            const ativo =
              selecao?.tipo === "unidade" && selecao.slug === unidade.slug;
            const destacado =
              resultado?.unidade.slug === unidade.slug;
            return (
              <g
                key={unidade.slug}
                className="group/ponto"
                style={{
                  animation: `ponto-entrada 0.5s ease-out ${i * 0.08}s both`,
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={ativo || destacado ? 10 : 7}
                  className={
                    destacado
                      ? "fill-ferrugem"
                      : "fill-cana"
                  }
                />
                <circle
                  cx={x}
                  cy={y}
                  r={ativo || destacado ? 16 : 12}
                  className={
                    destacado ? "fill-ferrugem/25" : "fill-cana/25"
                  }
                />
                <text
                  x={x}
                  y={y - 18}
                  textAnchor="middle"
                  className={`fill-osso text-[13px] font-semibold uppercase tracking-wide transition-opacity ${
                    ativo || destacado
                      ? "opacity-100"
                      : "opacity-0 group-hover/ponto:opacity-100 group-focus-within/ponto:opacity-100"
                  }`}
                >
                  {unidade.nome}
                </text>
                <rect
                  x={x - 22}
                  y={y - 22}
                  width={44}
                  height={44}
                  fill="transparent"
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver unidade ${unidade.nome}`}
                  onClick={() => {
                    setSelecao({ tipo: "unidade", slug: unidade.slug });
                    setBusca("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelecao({ tipo: "unidade", slug: unidade.slug });
                      setBusca("");
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
        <style>{`
          @keyframes ponto-entrada {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>

      <div>
        <label htmlFor="busca-municipio" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
          Digite seu município
        </label>
        <input
          id="busca-municipio"
          type="text"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setSelecao(null);
          }}
          placeholder="Ex.: Arapiraca, Garanhuns, Sobral..."
          className="mt-2 w-full border border-massape/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-ferrugem"
          autoComplete="off"
        />

        {sugestoes.length > 0 && (
          <ul className="mt-2 divide-y divide-massape/10 border border-massape/20 bg-white">
            {sugestoes.map((m) => (
              <li key={`${m.nome}-${m.uf}`}>
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-osso focus-visible:outline focus-visible:outline-2 focus-visible:outline-ferrugem"
                  onClick={() => {
                    setSelecao({
                      tipo: "municipio",
                      nome: m.nome,
                      uf: m.uf,
                      lat: m.lat,
                      lng: m.lng,
                    });
                    setBusca(`${m.nome}/${m.uf}`);
                  }}
                >
                  {m.nome}/{m.uf}
                </button>
              </li>
            ))}
          </ul>
        )}

        {resultado && (
          <div className="mt-6 border-2 border-ferrugem bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ferrugem">
              Unidade mais próxima
            </p>
            <p className="mt-1 font-display text-3xl font-bold">
              {resultado.unidade.nome}
            </p>
            <p className="mt-1 text-grafite">
              {resultado.unidade.cidade}/{resultado.unidade.uf} —{" "}
              {resultado.unidade.endereco}
            </p>
            {resultado.distanciaKm > 0 && (
              <p className="mt-1 text-sm text-grafite">
                Aprox. {Math.round(resultado.distanciaKm)} km em linha reta
              </p>
            )}
            <a
              href={`https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
                `Olá! Vim pelo site e quero falar com a unidade ${resultado.unidade.nome}.`
              )}`}
              className="mt-4 inline-block bg-cana px-5 py-3 font-semibold text-massape hover:bg-cana/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ferrugem"
            >
              Chamar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
