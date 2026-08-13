"use client";

import { useState } from "react";
import unidades from "@/content/unidades.json";
import { Mapa } from "./mapa";

const WHATSAPP_COMERCIAL = "558233281831";

function linkWhatsapp(nome: string) {
  return `https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
    `Olá! Vim pelo site e quero falar com a unidade ${nome}.`
  )}`;
}

export function TrilhaUnidades() {
  const [emFoco, setEmFoco] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {unidades.map((u, i) => (
          <div
            key={u.slug}
            onMouseEnter={() => setEmFoco(u.slug)}
            onMouseLeave={() => setEmFoco(null)}
            className="border border-osso/14 bg-mata p-[22px] transition-[background,border-color,transform] duration-200 hover:-translate-y-[3px] hover:border-cana hover:bg-[#0f4a2c]"
          >
            <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-cana tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-[26px]/none font-extrabold tracking-[-.025em] text-osso">
              {u.nome}
            </p>
            <p className="mt-1.5 text-[13px] font-medium tracking-[.1em] text-osso/60 uppercase">
              {u.cidade}/{u.uf}
            </p>
            <p className="mt-2.5 min-h-[39px] text-[13px]/relaxed text-osso/55">
              {u.endereco}
            </p>
            <a
              href={linkWhatsapp(u.nome)}
              className="mt-3 inline-block border-b border-dourado/50 font-display text-[11px] font-extrabold tracking-[.14em] text-dourado uppercase"
            >
              WhatsApp →
            </a>
          </div>
        ))}
      </div>
      <div className="hidden border border-cana/30 lg:block">
        <div className="h-[520px]">
          <Mapa tema="mata" selecionada={emFoco} />
        </div>
        <p className="bg-mata px-[18px] py-3.5 text-[12px] font-medium tracking-[.12em] text-osso/55 uppercase">
          Passe o mouse nos cartões
        </p>
      </div>
    </div>
  );
}
