import parceiros from "@/content/parceiros.json";
import Image from "next/image";

/**
 * Parceiros estratégicos (devolutiva, item 2.7 — substitui o antigo bloco
 * "Credenciais"). Grade estática de propósito: o §5 do CLAUDE.md proíbe
 * carrossel de logos rolando infinitamente.
 *
 * Logos entregues pelo marketing em 2026-11-10 (public/parceiros/), todos
 * sobre fundo branco. O da Biogénesis veio com o nome em branco; o arquivo
 * do repo teve as letras recoloridas para preto, a pedido do Guilherme.
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

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 lg:grid-cols-7 lg:gap-4">
        {parceiros.map((p) => (
          <li
            key={p.slug}
            className="relative h-[104px] border border-mata/15 bg-white sm:h-[120px]"
          >
            <Image
              src={`/parceiros/${p.slug}.png`}
              alt={p.nome}
              fill
              sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw"
              className="object-contain p-4 sm:p-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
