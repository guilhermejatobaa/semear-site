import type { Metadata } from "next";
import { Pendente } from "@/components/pendente";

export const metadata: Metadata = {
  title: "Contato",
  description: "Página em construção.",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <Pendente>Página de contato · fora do escopo do MVP</Pendente>
    </section>
  );
}
