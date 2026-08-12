import type { Metadata } from "next";
import { Pendente } from "@/components/pendente";

export const metadata: Metadata = {
  title: "Trabalhe conosco",
  description: "Página em construção.",
};

export default function TrabalheConoscoPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <Pendente>Página trabalhe conosco — fora do escopo do MVP</Pendente>
    </section>
  );
}
