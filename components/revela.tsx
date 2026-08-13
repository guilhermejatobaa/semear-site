"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revelação por scroll com dupla garantia: IntersectionObserver como
 * caminho principal, e uma varredura por getBoundingClientRect em
 * scroll/resize como reforço — o observer sozinho já é confiável no
 * Next puro, mas o custo do reforço é baixo e evita qualquer elemento
 * "preso" em invisível por uma perda de evento.
 */
export function Revela({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visivel) return;

    const checar = () => {
      const r = el.getBoundingClientRect();
      const alturaTela = window.innerHeight || 800;
      if (r.top < alturaTela + 100 && r.bottom > -100) setVisivel(true);
    };

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) setVisivel(true);
      },
      { threshold: 0.05 }
    );
    io.observe(el);

    checar();
    window.addEventListener("scroll", checar, { passive: true });
    window.addEventListener("resize", checar);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", checar);
      window.removeEventListener("resize", checar);
    };
  }, [visivel]);

  return (
    <div
      ref={ref}
      className={className}
      style={visivel ? { animation: "revela-sobe .7s cubic-bezier(.22,.9,.28,1) both" } : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
