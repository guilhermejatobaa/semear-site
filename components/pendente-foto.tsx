export function PendenteFoto({
  legenda,
  className = "",
  posicao = "centro",
}: {
  legenda: string;
  className?: string;
  /** "topo": usar quando um título/texto real vai ficar ancorado embaixo,
   *  sobre um gradiente (hero, faixa de foto, painéis de cultura) — evita
   *  a legenda pendente colidir com esse texto. */
  posicao?: "centro" | "topo";
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center gap-2 border border-dashed border-dourado bg-mata-fundo p-4 text-center ${
        posicao === "topo" ? "justify-start pt-6" : "justify-center"
      } ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-dourado/70"
      >
        <rect x="3" y="3" width="18" height="18" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <p className="max-w-[26ch] text-[11px] font-semibold tracking-[.12em] text-dourado uppercase">
        Pendente · {legenda}
      </p>
    </div>
  );
}
