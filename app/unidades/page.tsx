import type { Metadata } from "next";
import Link from "next/link";
import { UnidadesLista } from "./unidades-lista";

export const metadata: Metadata = {
  title: "Unidades",
  description:
    "As nove unidades da Semear Agronegócios em Alagoas, Sergipe, Pernambuco, Ceará, Rio Grande do Norte, Maranhão e Bahia. Endereço e WhatsApp de cada uma.",
};

export default function UnidadesPage() {
  return (
    <>
      <section className="bg-mata px-4 py-14 text-osso sm:px-12 sm:py-16">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
          Unidades
        </p>
        <h1 className="mt-3.5 font-display text-[52px]/[.95] font-extrabold tracking-[-.04em] sm:text-[76px]/[.95]">
          Nove endereços,
          <br />
          todo o Nordeste.
        </h1>
        <p className="mt-4 max-w-[56ch] text-[16px]/relaxed text-osso/78 sm:mt-4.5 sm:text-[18px]">
          Lojas próprias em sete estados, com estoque e equipe técnica, não
          representantes. A consultoria atende os nove estados do Nordeste.
          Filtre por estado ou passe o mouse num endereço
          para vê-lo no mapa.
        </p>
      </section>

      <UnidadesLista />

      <section className="flex flex-col items-start gap-6 bg-cana px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-14">
        <h2 className="max-w-[26ch] font-display text-[30px]/[1] font-extrabold tracking-[-.03em] text-mata sm:text-[42px]">
          Não achou a sua região? Fale com a matriz.
        </h2>
        <Link
          href="/consultoria"
          className="shrink-0 bg-mata px-7 py-4 font-display text-[13px] font-extrabold tracking-[.14em] text-osso uppercase sm:px-8 sm:py-5 sm:text-[14px]"
        >
          Falar com um consultor
        </Link>
      </section>
    </>
  );
}
