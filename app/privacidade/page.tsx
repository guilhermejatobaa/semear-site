import type { Metadata } from "next";
import { Pendente } from "@/components/pendente";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a Semear Agronegócios trata os dados pessoais enviados pelo site, incluindo o formulário de consultoria.",
};

export default function PrivacidadePage() {
  return (
    <section className="bg-osso px-4 py-14 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-[760px]">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
          Política de privacidade
        </p>
        <h1 className="mt-4 font-display text-[36px]/[1] font-extrabold tracking-[-.035em] text-mata sm:text-[52px]/[1] sm:tracking-[-.04em]">
          Como tratamos seus dados
        </h1>

        <div className="mt-8 flex flex-col gap-4">
          <Pendente>
            Texto da política de privacidade · documento jurídico, a redigir com
            apoio jurídico e não a partir de modelo genérico
          </Pendente>
        </div>

        {/* Levantamento factual do que o site de fato coleta hoje, para quem for
            redigir a política. É o que o código faz, não promessa de texto. */}
        <div className="mt-10 border-t-2 border-mata pt-8">
          <h2 className="font-display text-[22px]/[1.1] font-extrabold tracking-[-.02em] text-mata sm:text-[26px]">
            O que o site coleta hoje
          </h2>
          <ul className="mt-5 divide-y divide-mata/14 border-t border-mata/14">
            <li className="py-4 text-[15px]/relaxed text-grafite sm:text-[16px]">
              <strong className="text-mata">Formulário de consultoria.</strong>{" "}
              Nome, WhatsApp, município, área em hectares e cultura. Enviados por
              e-mail ao comercial via Resend. Não há banco de dados.
            </li>
            <li className="py-4 text-[15px]/relaxed text-grafite sm:text-[16px]">
              <strong className="text-mata">Instagram.</strong> Os posts
              incorporados na página institucional carregam script e cookies da
              Meta quando a seção entra na tela.
            </li>
            <li className="py-4 text-[15px]/relaxed text-grafite sm:text-[16px]">
              <strong className="text-mata">YouTube.</strong> O vídeo
              institucional só carrega o player (e os cookies do YouTube)
              depois que a pessoa clica em reproduzir.
            </li>
          </ul>
          <div className="mt-6">
            <Pendente>
              Confirmar com o jurídico se o carregamento de Instagram e YouTube
              exige consentimento prévio, e não só aviso
            </Pendente>
          </div>
        </div>
      </div>
    </section>
  );
}
