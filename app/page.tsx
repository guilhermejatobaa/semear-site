import Link from "next/link";
import { BuscaCobertura } from "@/components/mapa-cobertura/busca-cobertura";
import { TrilhaUnidades } from "@/components/mapa-cobertura/trilha-unidades";
import { CulturasHover } from "@/components/culturas-hover";
import { Depoimentos } from "@/components/depoimentos";
import { Parceiros } from "@/components/parceiros";
import { Contador } from "@/components/contador";
import { Revela } from "@/components/revela";
import { PendenteFoto } from "@/components/pendente-foto";
import { BarraFixaMobile } from "@/components/barra-fixa-mobile";

const ETAPAS = [
  {
    n: "01",
    t: "Você diz o município",
    d: "O site aponta a unidade que atende a sua região e abre o WhatsApp dela.",
  },
  {
    n: "02",
    t: "O consultor liga",
    d: "Cultura, área e época de manejo, antes de qualquer cotação.",
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

export default function Home() {
  return (
    <>
      <BuscaCobertura />

      <div className="grid grid-cols-2 bg-dourado text-mata sm:grid-cols-4">
        <div className="border-r border-mata/25 px-6 py-9 sm:px-10">
          <Contador ate={9} rotulo="Unidades próprias" />
        </div>
        <div className="border-r-0 px-6 py-9 sm:border-r sm:border-mata/25 sm:px-10">
          <Contador ate={9} rotulo="Estados atendidos" />
        </div>
        <div className="border-t border-r border-mata/25 px-6 py-9 sm:border-t-0 sm:px-10">
          <Contador ate={7} rotulo="Linhas de insumo" />
        </div>
        <div className="border-t border-mata/25 px-6 py-9 sm:border-t-0 sm:px-10">
          <Contador ate={19} rotulo="Anos de operação" />
        </div>
      </div>

      <section className="bg-mata-fundo px-4 py-14 sm:px-12 sm:py-[76px]">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
              As nove unidades
            </p>
            <h2 className="mt-3 font-display text-[32px]/none font-extrabold tracking-[-.03em] text-osso sm:text-[52px]/none">
              Escolha a sua. O mapa acompanha.
            </h2>
          </div>
          <Link
            href="/unidades"
            className="shrink-0 border-b-2 border-cana pb-1 font-display text-[12px] font-extrabold tracking-[.16em] text-cana uppercase"
          >
            Página de unidades →
          </Link>
        </div>
        <div className="mx-auto mt-10 max-w-[1680px] text-osso">
          <TrilhaUnidades />
        </div>
      </section>

      <section id="consultoria" className="bg-osso px-4 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[1680px]">
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
            Como funciona a consultoria
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-[34px]/[1] font-extrabold tracking-[-.03em] sm:text-[56px]/[1] sm:tracking-[-.04em]">
            Recomendação de campo, não de balcão.
          </h2>
          <div className="mt-10 flex flex-col gap-5 sm:mt-12 sm:grid sm:grid-cols-4 sm:gap-0 sm:border-t-2 sm:border-mata">
            {ETAPAS.map((e) => (
              <Revela key={e.n} className="border-t-2 border-mata pt-4 sm:border-t-0 sm:pt-7 sm:pr-7">
                <p className="-mt-0 inline-block bg-cana px-2.5 py-1.5 font-display text-[12px] font-extrabold tracking-[.12em] text-mata sm:-mt-[38px] sm:text-[14px]">
                  {e.n}
                </p>
                <h3 className="mt-3 font-display text-[21px]/[1.15] font-extrabold tracking-[-.02em] sm:mt-[22px] sm:text-[27px]/[1.1]">
                  {e.t}
                </h3>
                <p className="mt-2 text-[15px]/relaxed text-grafite sm:mt-2.5 sm:pr-6 sm:text-[16px]">
                  {e.d}
                </p>
              </Revela>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-[300px] sm:h-[520px]">
        <PendenteFoto
          legenda="Foto larga: consultor técnico com produtor na propriedade"
          className="absolute inset-0"
          posicao="topo"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-end p-6 sm:p-12"
          style={{
            background:
              "linear-gradient(0deg, rgba(7,36,24,.9) 0%, rgba(7,36,24,.1) 60%)",
          }}
        >
          <div>
            <h2 className="max-w-[22ch] font-display text-[30px]/[.98] font-extrabold tracking-[-.03em] text-osso sm:text-[58px]/[.98] sm:tracking-[-.04em]">
              O consultor não manda cotação. Ele vai até lá.
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px]/relaxed text-osso/80 sm:mt-4 sm:text-[17px]">
              Manejo acompanhado safra a safra, com a mesma pessoa, do
              plantio ao resultado.
            </p>
          </div>
        </div>
      </div>

      <section id="culturas" className="scroll-mt-24 bg-mata px-4 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
                Culturas e criações
              </p>
              <h2 className="mt-3 font-display text-[32px]/none font-extrabold tracking-[-.03em] text-osso sm:text-[52px]/none">
                O que a gente atende de verdade
              </h2>
            </div>
            <a
              href="#culturas"
              className="shrink-0 border-b-2 border-cana pb-1 font-display text-[12px] font-extrabold tracking-[.16em] text-cana uppercase"
            >
              Sete linhas de insumo →
            </a>
          </div>
          <div className="mt-10 sm:mt-11">
            <CulturasHover />
          </div>
        </div>
      </section>

      <Depoimentos />

      <section className="bg-mata px-4 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[1680px]">
          <Parceiros escuro />
        </div>
      </section>

      <section className="grid grid-cols-1 bg-cana sm:grid-cols-2">
        <div className="px-4 py-14 sm:px-12 sm:py-[72px]">
          <h2 className="font-display text-[34px]/[.98] font-extrabold tracking-[-.035em] text-mata sm:text-[52px]/[.98] sm:tracking-[-.04em]">
            Diga o município.
            <br />A gente vai até lá.
          </h2>
          <p className="mt-4 max-w-[40ch] text-[15px]/relaxed text-mata/80 sm:mt-[18px] sm:text-[17px]">
            Dois campos obrigatórios: nome e WhatsApp. Cultura, área e época
            de manejo ajudam o consultor a chegar preparado.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5 sm:mt-8">
            <Link
              href="/consultoria"
              className="bg-mata px-7 py-4 font-display text-[13px] font-extrabold tracking-[.14em] text-osso uppercase hover:bg-mata-fundo sm:px-8 sm:py-5 sm:text-[14px]"
            >
              Falar com um consultor
            </Link>
            <a
              href="https://wa.me/558233281831"
              className="border-2 border-mata px-6 py-3.5 font-display text-[13px] font-extrabold tracking-[.14em] text-mata uppercase hover:bg-mata hover:text-cana sm:px-[30px] sm:py-[18px] sm:text-[14px]"
            >
              WhatsApp comercial
            </a>
          </div>
        </div>
        <div className="relative min-h-[260px] sm:min-h-[340px]">
          <PendenteFoto legenda="Foto: equipe Semear na unidade" className="absolute inset-0" />
        </div>
      </section>

      <BarraFixaMobile />
    </>
  );
}
