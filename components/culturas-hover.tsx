"use client";

import culturas from "@/content/culturas.json";
import { Foto } from "./foto";

export function CulturasHover() {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2.5 sm:h-[420px]">
      {culturas.map((c) => (
        <div
          key={c.slug}
          className="group relative h-[220px] overflow-hidden border border-osso/14 transition-[flex-grow] duration-500 ease-[cubic-bezier(.22,.9,.28,1)] sm:h-auto sm:flex-1 sm:hover:flex-[2.4]"
        >
          <Foto
            src={`/fotos/cultura-${c.slug}.jpg`}
            alt={c.alt}
            sizes="(min-width: 640px) 40vw, 100vw"
            className="absolute inset-0"
          />
          <div
            className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6"
            style={{
              background:
                "linear-gradient(0deg, rgba(7,36,24,.92) 0%, rgba(7,36,24,.25) 55%, rgba(7,36,24,.5) 100%)",
            }}
          >
            <p className="font-display text-[26px]/none font-extrabold tracking-[-.025em] text-osso sm:text-[30px]/none">
              {c.nome}
            </p>
            <p className="mt-2 text-[12px] font-medium tracking-[.1em] text-cana uppercase">
              {c.linha}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
