"use client";

import { useMemo, useState } from "react";
import unidades from "@/content/unidades.json";
import { Pendente } from "@/components/pendente";
import { Mapa } from "@/components/mapa-cobertura/mapa";

const WHATSAPP_COMERCIAL = "558233281831";

function linkWhatsapp(nome: string) {
  return `https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
    `Olá! Vim pelo site e quero falar com a unidade ${nome}.`
  )}`;
}

export function UnidadesLista() {
  const [uf, setUf] = useState("Todas");
  const [emFoco, setEmFoco] = useState<string | null>(null);

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
              onMouseEnter={() => setEmFoco(u.slug)}
              onMouseLeave={() => setEmFoco(null)}
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

        <div className="mt-6">
          <Pendente>
            Horário de funcionamento e telefone fixo por unidade
          </Pendente>
        </div>
      </div>

      <div className="px-4 pb-10 sm:sticky sm:top-0 sm:px-12 sm:py-14">
        <div className="h-[360px] border border-mata/20 sm:h-[640px]">
          <Mapa tema="mata" selecionada={emFoco} />
        </div>
        <p className="mt-3 text-[12px] font-medium tracking-[.12em] text-grafite uppercase">
          Clique num ponto ou passe o mouse nos cartões
        </p>
      </div>
    </div>
  );
}
