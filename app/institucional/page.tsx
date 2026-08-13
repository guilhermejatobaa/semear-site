import type { Metadata } from "next";
import Link from "next/link";
import { Revela } from "@/components/revela";
import { Pendente } from "@/components/pendente";
import { PendenteFoto } from "@/components/pendente-foto";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "A história da Semear Agronegócios: fundada em 2007 em Maceió/AL, hoje nove unidades em sete estados do Nordeste.",
};

const MARCOS = [
  {
    ano: "2007",
    t: "Fundação em Maceió",
    d: "Hélio Jatobá e Marcos Pacheco abrem a primeira loja, com foco em cana e pecuária em Alagoas.",
    pendente: false,
  },
  {
    ano: "—",
    t: "Expansão para Sergipe e Pernambuco",
    d: "Itabaiana, Carpina e Paripiranga: o atendimento passa a acompanhar o produtor além de AL.",
    pendente: true,
  },
  {
    ano: "—",
    t: "Chegada ao Ceará e ao Rio Grande do Norte",
    d: "Limoeiro do Norte e Mossoró abrem a operação de fruticultura irrigada.",
    pendente: true,
  },
  {
    ano: "—",
    t: "Maranhão: Imperatriz",
    d: "A unidade mais a oeste, atendendo grãos e pecuária no corredor da BR-010.",
    pendente: true,
  },
  {
    ano: "2026",
    t: "Nove unidades em sete estados",
    d: "Consultoria técnica própria em campo e sete linhas de insumo.",
    pendente: false,
  },
];

const VALORES = [
  {
    t: "Presença, não representação",
    d: "Loja própria com estoque e equipe na região — o produtor sabe onde nos achar.",
  },
  {
    t: "Recomendação técnica antes da venda",
    d: "Consultor visita a área e responde pelo que recomendou na safra seguinte.",
  },
  {
    t: "Preço justo com prazo real",
    d: "Condição combinada é condição cumprida, inclusive na entrega.",
  },
];

export default function InstitucionalPage() {
  return (
    <>
      <div className="relative h-[320px] sm:h-[460px]">
        <PendenteFoto
          legenda="Foto larga: fachada da matriz ou equipe reunida"
          className="absolute inset-0"
          posicao="topo"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-end p-6 sm:p-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,36,24,.94) 0%, rgba(7,36,24,.6) 55%, rgba(7,36,24,.2) 100%)",
          }}
        >
          <div>
            <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
              Institucional
            </p>
            <h1 className="mt-3.5 font-display text-[42px]/[.95] font-extrabold tracking-[-.04em] text-osso sm:text-[74px]/[.95] sm:tracking-[-.045em]">
              Dezenove anos
              <br />
              plantando presença.
            </h1>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-12 bg-osso px-4 py-14 sm:px-12 sm:py-[72px] lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-[32px]/[1.02] font-extrabold tracking-[-.035em] sm:text-[40px]">
            Começou com duas pessoas e um estoque em Maceió.
          </h2>
          <p className="mt-5 text-[16px]/[1.7] text-grafite sm:text-[17px]">
            Em 2007, Hélio Jatobá e Marcos Pacheco abriram a Semear para
            atender o produtor alagoano com o que faltava na região: insumo
            disponível e alguém que soubesse recomendar. A lógica não mudou
            desde então — cada unidade nova nasceu de um pedido de cliente
            que queria a mesma assistência mais perto da propriedade.
          </p>
          <p className="mt-4 text-[16px]/[1.7] text-grafite sm:text-[17px]">
            Hoje são nove unidades próprias em sete estados do Nordeste, sete
            linhas de insumo e uma equipe técnica que atende cana, citros,
            pastagem e pecuária, coco e fruticultura.
          </p>
          <div className="mt-7">
            <Pendente>
              Revisar este texto com os sócios e confirmar as datas de cada
              expansão
            </Pendente>
          </div>
        </div>

        <div>
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
            Linha do tempo
          </p>
          <div className="mt-6 flex flex-col gap-6 border-l-2 border-cana pl-6 sm:mt-[22px] sm:gap-[26px] sm:pl-[26px]">
            {MARCOS.map((m) => (
              <Revela key={m.t}>
                {m.pendente ? (
                  <span className="inline-block border border-dashed border-dourado bg-dourado/10 px-2 py-1 font-display text-[13px] font-bold tracking-[.04em] text-dourado uppercase">
                    Data pendente
                  </span>
                ) : (
                  <p className="font-display text-[22px]/none font-extrabold tracking-[-.02em]">
                    {m.ano}
                  </p>
                )}
                <h3 className="mt-2 text-[18px]/[1.2] font-bold sm:mt-2 sm:text-[19px]">
                  {m.t}
                </h3>
                <p className="mt-1.5 text-[15px]/relaxed text-grafite sm:text-[15.5px]">
                  {m.d}
                </p>
              </Revela>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mata px-4 py-14 text-osso sm:px-12 sm:py-[72px]">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
          Como trabalhamos
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 border-t-2 border-cana/60 sm:mt-9 sm:grid-cols-3 sm:gap-0">
          {VALORES.map((v) => (
            <div key={v.t} className="border-osso/14 pt-6 sm:border-r sm:pt-8 sm:pr-8 sm:last:border-r-0">
              <h3 className="font-display text-[24px]/[1.1] font-extrabold tracking-[-.025em] sm:text-[28px]">
                {v.t}
              </h3>
              <p className="mt-3 text-[15px]/relaxed text-osso/75 sm:mt-3 sm:pr-6 sm:text-[16px]">
                {v.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:mt-[52px] sm:grid-cols-4 sm:gap-4">
          <div className="h-[150px] sm:h-[220px]">
            <PendenteFoto legenda="Equipe técnica" />
          </div>
          <div className="h-[150px] sm:h-[220px]">
            <PendenteFoto legenda="Balcão de atendimento" />
          </div>
          <div className="h-[150px] sm:h-[220px]">
            <PendenteFoto legenda="Estoque" />
          </div>
          <div className="h-[150px] sm:h-[220px]">
            <PendenteFoto legenda="Feira ou evento" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-12 bg-osso px-4 py-14 sm:px-12 sm:py-[72px] lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
            Credenciais
          </p>
          <ul className="mt-6 divide-y divide-mata/14 border-t-2 border-mata">
            <li className="flex items-baseline gap-4 py-5 text-[19px]/none font-semibold">
              <span className="h-2 w-2 shrink-0 bg-cana" />
              Selo de excelência do CRMV-AL
            </li>
            <li className="flex items-baseline gap-4 py-5 text-[19px]/none font-semibold">
              <span className="h-2 w-2 shrink-0 bg-cana" />
              Parceria com a Bayer
            </li>
            <li className="flex items-baseline gap-4 py-5 text-[19px]/none font-semibold">
              <span className="h-2 w-2 shrink-0 bg-cana" />
              Presença na Citros Show e na Expoimp
            </li>
          </ul>
        </div>

        <div id="trabalhe-conosco" className="scroll-mt-24 bg-dourado px-6 py-9 text-mata sm:px-10 sm:py-10">
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] uppercase">
            Trabalhe conosco
          </p>
          <h2 className="mt-3.5 font-display text-[32px]/[1] font-extrabold tracking-[-.035em] sm:text-[38px]">
            Contratamos quem gosta de campo.
          </h2>
          <p className="mt-3.5 text-[15px]/relaxed text-mata/82 sm:text-[16px]">
            Vagas técnicas e comerciais nas nove unidades. Manda currículo
            dizendo em qual região você quer atuar.
          </p>
          <Link
            href="/trabalhe-conosco"
            className="mt-6 inline-block bg-mata px-7 py-[18px] font-display text-[13px] font-extrabold tracking-[.14em] text-osso uppercase"
          >
            Enviar currículo
          </Link>
          <div className="mt-5 border border-dashed border-mata/45 p-3.5">
            <p className="font-display text-[11px] font-bold tracking-[.16em] uppercase">
              Pendente · e-mail de RH e vagas abertas
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start gap-6 bg-cana px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-14">
        <h2 className="max-w-[24ch] font-display text-[30px]/[1] font-extrabold tracking-[-.03em] text-mata sm:text-[44px]">
          Diga o município.
          <br />A gente vai até lá.
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
