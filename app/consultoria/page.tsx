import type { Metadata } from "next";
import { ConsultoriaForm } from "./consultoria-form";
import { Revela } from "@/components/revela";
import { PendenteFoto } from "@/components/pendente-foto";

export const metadata: Metadata = {
  title: "Falar com um consultor",
  description:
    "Peça consultoria técnica da Semear Agronegócios. Conte sua cultura, área e município — um consultor da unidade mais próxima entra em contato pelo WhatsApp.",
};

const ETAPAS = [
  {
    n: "01",
    t: "Você diz o município",
    d: "O site aponta a unidade que atende a sua região e abre o WhatsApp dela.",
  },
  {
    n: "02",
    t: "O consultor liga",
    d: "Cultura, área e época de manejo — antes de qualquer cotação.",
  },
  {
    n: "03",
    t: "Visita na propriedade",
    d: "Recomendação feita na sua área, com o que está no chão.",
  },
  {
    n: "04",
    t: "Acompanhamento na safra",
    d: "O mesmo consultor volta para ver resultado, não só para vender de novo.",
  },
];

export default function ConsultoriaPage() {
  return (
    <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.05fr_.95fr]">
      <div className="bg-mata px-4 py-14 text-osso sm:px-12 sm:py-16">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
          Consultoria técnica
        </p>
        <h1 className="mt-4 font-display text-[52px]/[.94] font-extrabold tracking-[-.04em] sm:text-[72px]/[.94] sm:tracking-[-.045em]">
          Um técnico
          <br />
          na sua área,
          <br />
          <span className="text-cana">nesta safra.</span>
        </h1>
        <p className="mt-5 max-w-[44ch] text-[16px]/relaxed text-osso/80 sm:text-[18px]">
          Sem cotação genérica: o consultor da unidade mais próxima liga,
          entende cultura e área, visita a propriedade e acompanha o manejo.
        </p>

        <div className="mt-9 flex flex-col border-t border-osso/16 sm:mt-11">
          {ETAPAS.map((e) => (
            <Revela key={e.n} className="flex gap-6 border-b border-osso/16 py-6">
              <p className="w-[44px] shrink-0 font-display text-[26px]/none font-extrabold tracking-[-.02em] text-cana">
                {e.n}
              </p>
              <div>
                <h3 className="font-display text-[22px]/[1.1] font-extrabold tracking-[-.02em] sm:text-[24px]">
                  {e.t}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px]/relaxed text-osso/72 sm:text-[16px]">
                  {e.d}
                </p>
              </div>
            </Revela>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="h-[160px] sm:h-[210px]">
            <PendenteFoto legenda="Consultor analisando folha" />
          </div>
          <div className="h-[160px] sm:h-[210px]">
            <PendenteFoto legenda="Reunião na propriedade" />
          </div>
        </div>
      </div>

      <div className="bg-osso px-4 py-14 sm:px-12 sm:py-16">
        <ConsultoriaForm />
      </div>
    </div>
  );
}
