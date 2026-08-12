import Link from "next/link";
import { MapaCobertura } from "@/components/mapa-cobertura/mapa-cobertura";
import { Pendente } from "@/components/pendente";
import linhas from "@/content/linhas.json";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          Nove unidades. Seis estados. Um consultor perto da sua porteira.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-grafite">
          Digite seu município e veja qual unidade da Semear atende sua região —
          com telefone direto e WhatsApp.
        </p>
        <div className="mt-8">
          <MapaCobertura />
        </div>
      </section>

      <section className="bg-massape text-osso">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-display text-6xl font-bold text-cana">01</p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Tem gente perto de você
              </h2>
              <p className="mt-3 text-osso/80">
                Nove unidades em seis estados do Nordeste — Alagoas, Sergipe,
                Pernambuco, Ceará, Rio Grande do Norte, Maranhão e Bahia. Não é
                um representante a quilômetros de distância.
              </p>
            </div>
            <div>
              <p className="font-display text-6xl font-bold text-cana">02</p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Alguém vai até a propriedade
              </h2>
              <p className="mt-3 text-osso/80">
                Consultor técnico acompanha manejo e resultado na sua área, não
                só na venda. É recomendação de campo, não balcão.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold">Linhas que atendemos</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-massape/15 pt-6 sm:grid-cols-3">
          {linhas.map((linha) => (
            <li
              key={linha.slug}
              className="text-sm font-semibold uppercase tracking-wide text-grafite"
            >
              {linha.nome}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-2xl font-bold">Credenciais</h2>
        <ul className="mt-6 space-y-2 text-grafite">
          <li>Selo de excelência do CRMV-AL</li>
          <li>Parceria com a Bayer</li>
          <li>Presença na Citros Show e na Expoimp</li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-2xl font-bold">O que os produtores dizem</h2>
        <div className="mt-6">
          <Pendente>Depoimento de cliente — a coletar com o comercial</Pendente>
        </div>
      </section>

      <section className="bg-cana">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-massape">
            Fale com um consultor da sua região
          </h2>
          <Link
            href="/consultoria"
            className="mt-6 inline-block bg-massape px-8 py-4 text-lg font-semibold text-osso hover:bg-massape/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-osso"
          >
            Falar com um consultor
          </Link>
        </div>
      </section>
    </>
  );
}
