import type { Metadata } from "next";
import { Pendente } from "@/components/pendente";
import { PendenteFoto } from "@/components/pendente-foto";
import { Revela } from "@/components/revela";
import externos from "@/content/externos.json";
import unidades from "@/content/unidades.json";

const EMAIL = externos.emailCurriculos;
const UFS = [...new Set(unidades.map((u) => u.uf))];

export const metadata: Metadata = {
  title: "Trabalhe conosco",
  description: `Vagas técnicas e comerciais nas nove unidades da Semear Agronegócios, em ${UFS.length} estados do Nordeste. Envie seu currículo para ${EMAIL}.`,
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <section className="bg-mata px-4 py-14 text-osso sm:px-12 sm:py-20">
        <div className="mx-auto max-w-[1680px]">
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
            Trabalhe conosco
          </p>
          <h1 className="mt-4 max-w-[16ch] font-display text-[44px]/[.95] font-extrabold tracking-[-.04em] sm:text-[72px]/[.94] sm:tracking-[-.045em]">
            Contratamos quem gosta de campo.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px]/relaxed text-osso/80 sm:text-[18px]">
            Vagas técnicas e comerciais nas nove unidades, em {UFS.length}{" "}
            estados do Nordeste. Manda o currículo dizendo em qual região você
            quer atuar. Quem atende é gente da própria unidade.
          </p>

          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Currículo para a Semear Agronegócios")}`}
            className="mt-8 inline-block bg-cana px-7 py-[18px] font-display text-[13px] font-extrabold tracking-[.14em] text-mata uppercase hover:bg-dourado sm:mt-9 sm:px-8 sm:py-5 sm:text-[14px]"
          >
            Enviar currículo
          </a>
          <p className="mt-4 text-[15px] text-osso/72">
            Ou escreva direto para{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-cana underline underline-offset-4">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* Cultura da empresa com foto dos colaboradores, pedido na devolutiva
          (item 2.8). As fotos ainda não existem. */}
      <section className="bg-osso px-4 py-14 sm:px-12 sm:py-[72px]">
        <div className="mx-auto max-w-[1680px]">
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
            Como é trabalhar aqui
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-[30px]/none font-extrabold tracking-[-.03em] text-mata sm:text-[44px]/none">
            Nove unidades, a mesma forma de atender
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {[
              "Colaboradores na unidade",
              "Consultor em campo",
              "Equipe do balcão",
              "Time reunido",
            ].map((legenda) => (
              <div key={legenda} className="h-[150px] sm:h-[220px]">
                <PendenteFoto legenda={legenda} />
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-[62ch]">
            <Pendente>
              Texto sobre cultura da empresa e benefícios · a escrever com o RH
            </Pendente>
          </div>
        </div>
      </section>

      <section className="bg-mata-fundo px-4 py-14 text-osso sm:px-12 sm:py-[72px]">
        <div className="mx-auto max-w-[1680px]">
          <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
            Onde temos unidade
          </p>
          <div className="mt-6 flex flex-col gap-0 border-t border-osso/16 sm:mt-7">
            {unidades.map((u) => (
              <Revela key={u.slug}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-osso/16 py-4">
                  <span className="font-display text-[18px] font-extrabold tracking-[-.02em] sm:text-[20px]">
                    {u.cidade}/{u.uf}
                  </span>
                  <span className="text-[14px] text-osso/60">{u.nome}</span>
                </div>
              </Revela>
            ))}
          </div>
          <div className="mt-8 max-w-[62ch]">
            <Pendente>Vagas abertas por unidade · a levantar com o RH</Pendente>
          </div>
        </div>
      </section>
    </>
  );
}
