import parceiros from "@/content/parceiros.json";
import { PendenteFoto } from "./pendente-foto";

/**
 * Parceiros estratégicos (devolutiva, item 2.7 — substitui o antigo bloco
 * "Credenciais"). Grade estática de propósito: o §5 do CLAUDE.md proíbe
 * carrossel de logos rolando infinitamente.
 *
 * Os logos ainda não existem no repo, então cada tile é um PendenteFoto —
 * pelo §6 não se inventa ativo de marca de terceiro.
 */
export function Parceiros({
  escuro = false,
  className = "",
}: {
  escuro?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`font-display text-[12px] font-extrabold tracking-[.24em] uppercase ${
          escuro ? "text-dourado" : "text-grafite"
        }`}
      >
        Parceiros estratégicos
      </p>
      <h2
        className={`mt-3 max-w-[20ch] font-display text-[30px]/[1.02] font-extrabold tracking-[-.03em] sm:text-[42px] ${
          escuro ? "text-osso" : "text-mata"
        }`}
      >
        As marcas que a gente representa no Nordeste
      </h2>
      <p
        className={`mt-4 max-w-[54ch] text-[15px]/relaxed sm:text-[16px] ${
          escuro ? "text-osso/72" : "text-grafite"
        }`}
      >
        Distribuição autorizada e assistência técnica com respaldo do
        fabricante. É o que garante receituário, procedência e reposição.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {parceiros.map((p) => (
          <li key={p.slug} className="h-[104px] sm:h-[120px]">
            <PendenteFoto legenda={`Logo ${p.nome}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
