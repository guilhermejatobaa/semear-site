"use client";

import { useMemo, useState } from "react";
import unidades from "@/content/unidades.json";
import { Mapa } from "@/components/mapa-cobertura/mapa";

const WHATSAPP_COMERCIAL = "558233281831";

function linkWhatsapp(nome: string) {
  return `https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
    `Olá! Vim pelo site e quero falar com a unidade ${nome}.`
  )}`;
}

export function UnidadesLista() {
  const [uf, setUf] = useState("Todas");
  // Dois estados distintos de propósito: `sobHover` é passageiro (mouse nos
  // cartões) e `selecionada` é fixo (clique num ponto do mapa). Com um estado
  // só, passar o mouse num cartão apagaria a unidade escolhida no mapa.
  const [sobHover, setSobHover] = useState<string | null>(null);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const emFoco = sobHover ?? selecionada;

  function selecionarNoMapa(slug: string) {
    setSelecionada((atual) => (atual === slug ? null : slug));
    // Se o filtro de UF escondia essa unidade, o clique no mapa apontaria para
    // um cartão invisível — então o filtro abre.
    const alvo = unidades.find((u) => u.slug === slug);
    if (alvo && uf !== "Todas" && alvo.uf !== uf) setUf("Todas");
  }

  const ufs = useMemo(
    () => ["Todas", ...Array.from(new Set(unidades.map((u) => u.uf)))],
    []
  );
  const filtradas = useMemo(
    () => unidades.filter((u) => uf === "Todas" || u.uf === uf),
    [uf]
  );

  return (
    <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_520px]">
      <div className="px-4 py-10 sm:px-12 sm:py-14">
        <div className="flex flex-wrap gap-2.5">
          {ufs.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setUf(f)}
              className={`min-h-[44px] border px-5 py-3 font-display text-[12px] font-extrabold tracking-[.14em] uppercase ${
                uf === f
                  ? "border-cana bg-cana text-mata"
                  : "border-grafite/30 bg-transparent text-mata"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[13px] font-semibold tracking-[.1em] text-grafite uppercase">
          {filtradas.length} unidades listadas
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtradas.map((u) => (
            <div
              key={u.slug}
              onMouseEnter={() => setSobHover(u.slug)}
              onMouseLeave={() => setSobHover(null)}
              className={`border bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cana ${
                emFoco === u.slug ? "border-cana" : "border-mata/16"
              }`}
            >
              <div className="flex items-baseline gap-3">
                <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-grafite tabular-nums">
                  {String(unidades.indexOf(u) + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-[30px]/none font-extrabold tracking-[-.03em]">
                  {u.nome}
                </p>
              </div>
              <p className="mt-2 text-[12px] font-semibold tracking-[.12em] text-grafite uppercase">
                {u.cidade}/{u.uf}
              </p>
              <p className="mt-2.5 min-h-[46px] text-[15px]/[1.55] text-grafite">
                {u.endereco}
              </p>
              <div className="mt-4 flex gap-2.5">
                <a
                  href={linkWhatsapp(u.nome)}
                  className="bg-cana px-[18px] py-[13px] font-display text-[12px] font-extrabold tracking-[.12em] text-mata uppercase"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    `${u.endereco}, ${u.cidade}/${u.uf}`
                  )}`}
                  className="border border-mata/30 px-[18px] py-[13px] font-display text-[12px] font-extrabold tracking-[.12em] text-mata uppercase"
                >
                  Rota
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 border-t border-mata/16 pt-5 text-[15px]/relaxed text-grafite">
          <span className="font-display text-[11px] font-extrabold tracking-[.18em] uppercase">
            Horário de funcionamento
          </span>
          <br />
          Todas as unidades: segunda a sexta, das 7h30 às 17h20.
        </p>
      </div>

      <div className="px-4 pb-10 sm:sticky sm:top-0 sm:px-12 sm:py-14">
        <div className="aspect-[671/720] max-h-[640px] w-full border border-mata/20">
          <Mapa tema="mata" selecionada={emFoco} onSelecionar={selecionarNoMapa} />
        </div>
        <p className="mt-3 text-[12px] font-medium tracking-[.12em] text-grafite uppercase">
          Toque num ponto do mapa ou passe o mouse nos cartões
        </p>
      </div>
    </div>
  );
}
