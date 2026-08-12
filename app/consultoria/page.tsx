import type { Metadata } from "next";
import { ConsultoriaForm } from "./consultoria-form";

export const metadata: Metadata = {
  title: "Falar com um consultor",
  description:
    "Peça consultoria técnica da Semear Agronegócios. Conte sua cultura, área e município — um consultor da unidade mais próxima entra em contato pelo WhatsApp.",
};

export default function ConsultoriaPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Falar com um consultor</h1>
      <p className="mt-3 text-grafite">
        Conte um pouco sobre sua propriedade. Um consultor da unidade mais
        próxima entra em contato pelo WhatsApp.
      </p>
      <div className="mt-8">
        <ConsultoriaForm />
      </div>
    </section>
  );
}
