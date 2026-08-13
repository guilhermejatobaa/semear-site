"use client";

import { useEffect, useMemo, useState } from "react";
import unidades from "@/content/unidades.json";
import municipios from "@/content/municipios.json";
import { unidadeMaisProxima } from "@/lib/distancia";
import { normalizar } from "@/lib/normalizar";
import { Mapa } from "./mapa";

const WHATSAPP_COMERCIAL = "558233281831";

const CIDADES_ROTACAO = [
  "Arapiraca",
  "Sobral",
  "Mossoró",
  "Caruaru",
  "Balsas",
  "Ribeira do Pombal",
  "Limoeiro do Norte",
  "Itabaiana",
  "Garanhuns",
  "Alagoinhas",
];

type Selecao =
  | { tipo: "unidade"; slug: string }
  | { tipo: "municipio"; nome: string; uf: string; lat: number; lng: number };

export function BuscaCobertura() {
  const [indiceCidade, setIndiceCidade] = useState(0);
  const [busca, setBusca] = useState("");
  const [selecao, setSelecao] = useState<Selecao | null>(null);

  useEffect(() => {
    const id = setInterval(
      () => setIndiceCidade((i) => (i + 1) % CIDADES_ROTACAO.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  const sugestoes = useMemo(() => {
    if (selecao || normalizar(busca).length < 2) return [];
    const alvo = normalizar(busca);
    return municipios.filter((m) => normalizar(m.nome).includes(alvo)).slice(0, 5);
  }, [busca, selecao]);

  const resultado = useMemo(() => {
    if (!selecao) return null;
    if (selecao.tipo === "unidade") {
      const unidade = unidades.find((u) => u.slug === selecao.slug);
      return unidade ? { unidade, distanciaKm: 0 } : null;
    }
    return unidadeMaisProxima(selecao.lat, selecao.lng);
  }, [selecao]);

  function selecionarMunicipio(m: (typeof municipios)[number]) {
    setBusca(`${m.nome}/${m.uf}`);
    setSelecao({ tipo: "municipio", nome: m.nome, uf: m.uf, lat: m.lat, lng: m.lng });
  }

  function selecionarUnidade(slug: string) {
    setBusca("");
    setSelecao({ tipo: "unidade", slug });
  }

  const conteudo = (
    <>
      <p className="flex items-center gap-3 font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
        <span className="h-[2px] w-[34px] bg-dourado sm:w-[24px]" />
        Cobertura Nordeste
      </p>
      <h1 className="mt-4 font-display text-[52px]/[.92] font-extrabold tracking-[-.04em] text-osso sm:mt-5 sm:text-[104px]/[.9] sm:tracking-[-.045em]">
        Do mapa
        <br />
        até a
        <br />
        <span className="text-cana">porteira.</span>
      </h1>
      <p className="mt-4 max-w-[38ch] text-[16px]/relaxed text-osso/82 sm:mt-6 sm:text-[19px]/relaxed">
        Nove unidades próprias e consultor técnico que entra na área. Diga o
        município e o site diz quem atende você — com distância e WhatsApp
        direto.
      </p>
      <p className="mt-3 text-[13px] font-medium tracking-[.06em] text-osso/55 sm:mt-3.5 sm:text-[14px]">
        Cobertura em municípios como{" "}
        <strong className="font-bold text-cana">
          {CIDADES_ROTACAO[indiceCidade]}
        </strong>
      </p>

      <div className="mt-6 max-w-[520px] sm:mt-8">
        <div className="flex border-2 border-cana bg-mata-fundo/80 sm:bg-mata-fundo/82">
          <label htmlFor="busca-cobertura-hero" className="sr-only">
            Seu município
          </label>
          <input
            id="busca-cobertura-hero"
            type="text"
            autoComplete="off"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setSelecao(null);
            }}
            placeholder="Seu município"
            className="min-w-0 flex-1 bg-transparent px-4 py-4 text-[16px] font-semibold text-osso outline-none placeholder:text-osso/50 sm:px-5 sm:py-[19px] sm:text-[18px]"
          />
          <span className="flex shrink-0 items-center bg-cana px-5 font-display text-[12px] font-extrabold tracking-[.14em] text-mata uppercase sm:px-6 sm:text-[13px] sm:tracking-[.16em]">
            Buscar
          </span>
        </div>

        {sugestoes.length > 0 && (
          <ul className="border border-cana/40 bg-mata-fundo">
            {sugestoes.map((m) => (
              <li key={`${m.nome}-${m.uf}`} className="border-t border-cana/16 first:border-t-0">
                <button
                  type="button"
                  onClick={() => selecionarMunicipio(m)}
                  className="block min-h-[48px] w-full px-4 py-3.5 text-left text-[15px] font-medium text-osso hover:bg-[#0f3d26] sm:px-[18px] sm:text-[16px]"
                >
                  {m.nome}/{m.uf}
                </button>
              </li>
            ))}
          </ul>
        )}

        {resultado && (
          <div className="mt-4 flex flex-col bg-osso text-mata sm:flex-row">
            <div className="flex-1 px-5 py-5 sm:px-7 sm:py-[26px]">
              <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-grafite uppercase">
                Unidade que atende você
              </p>
              <p className="mt-2 font-display text-[36px]/[.95] font-extrabold tracking-[-.035em] sm:text-[48px]/[.95]">
                {resultado.unidade.nome}
              </p>
              <p className="mt-2.5 text-[14px]/relaxed text-grafite sm:text-[15px]">
                {resultado.unidade.cidade}/{resultado.unidade.uf} —{" "}
                {resultado.unidade.endereco}
              </p>
              {resultado.distanciaKm > 0 && (
                <p className="mt-1.5 text-[12.5px] font-semibold text-grafite">
                  Aprox. {Math.round(resultado.distanciaKm)} km em linha reta
                </p>
              )}
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
                `Olá! Vim pelo site e quero falar com a unidade ${resultado.unidade.nome}.`
              )}`}
              className="flex min-h-[54px] items-center justify-center bg-cana px-6 py-4 text-center font-display text-[13px] font-extrabold tracking-[.1em] text-mata uppercase hover:bg-dourado sm:w-[150px]"
            >
              Chamar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden bg-mata-fundo px-4 py-10 sm:h-[760px] sm:px-0 sm:py-0">
      <div className="hidden sm:absolute sm:top-0 sm:right-[-40px] sm:block sm:h-full sm:w-[900px]">
        <Mapa tema="ousado" mostrarUf={false} selecionada={resultado?.unidade.slug ?? null} onSelecionar={selecionarUnidade} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(96deg, rgba(7,36,24,.97) 0%, rgba(7,36,24,.93) 38%, rgba(7,36,24,.15) 66%, rgba(7,36,24,.5) 100%)",
        }}
      />

      <div className="relative sm:absolute sm:top-16 sm:left-12 sm:w-[640px]">{conteudo}</div>

      <div className="mt-6 h-[360px] border border-cana/30 sm:hidden">
        <Mapa tema="ousado" mostrarUf={false} selecionada={resultado?.unidade.slug ?? null} onSelecionar={selecionarUnidade} />
      </div>
      <p className="mt-2.5 text-center text-[11px] font-medium tracking-[.12em] text-osso/50 uppercase sm:absolute sm:right-12 sm:bottom-[34px] sm:mt-0 sm:text-[12px] sm:tracking-[.14em]">
        Toque ou clique num ponto do mapa
      </p>
    </section>
  );
}
