import type { Metadata } from "next";
import unidades from "@/content/unidades.json";

export const metadata: Metadata = {
  title: "Unidades",
  description:
    "As nove unidades da Semear Agronegócios em Alagoas, Sergipe, Pernambuco, Ceará, Rio Grande do Norte, Maranhão e Bahia — endereço e WhatsApp de cada uma.",
};

const WHATSAPP_COMERCIAL = "558233281831";

export default function UnidadesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Unidades</h1>
      <p className="mt-3 max-w-2xl text-grafite">
        Nove unidades em seis estados do Nordeste. Todas atendem pelo mesmo
        WhatsApp comercial — diga qual unidade fica mais perto de você.
      </p>

      <ul className="mt-10 divide-y divide-mata/15 border-t border-b border-mata/15">
        {unidades.map((unidade) => (
          <li key={unidade.slug} className="py-6 sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold">
                {unidade.nome === unidade.cidade
                  ? unidade.cidade
                  : `${unidade.nome} — ${unidade.cidade}`}
                <span className="ml-2 text-base font-normal text-grafite">
                  /{unidade.uf}
                </span>
              </h2>
              <p className="mt-1 text-grafite">{unidade.endereco}</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(
                `Olá! Vim pelo site e quero falar com a unidade ${unidade.nome}.`
              )}`}
              className="mt-4 inline-block shrink-0 rounded-md bg-cana px-5 py-3 font-semibold text-mata shadow-sm hover:bg-cana/90 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mata sm:mt-0"
            >
              WhatsApp
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
