"use client";

import { useEffect, useRef, useState } from "react";

const DURACAO_MS = 1100;

export function Contador({ ate, rotulo }: { ate: number; rotulo: string }) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const animouRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animar = () => {
      if (animouRef.current) return;
      animouRef.current = true;
      const inicio = performance.now();
      const passo = (agora: number) => {
        const p = Math.min(1, (agora - inicio) / DURACAO_MS);
        setValor(Math.round(ate * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
      // Rede de segurança: garante o valor final mesmo se o rAF for
      // interrompido (aba em segundo plano, etc.) — nunca fica truncado.
      setTimeout(() => setValor(ate), DURACAO_MS + 300);
    };

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) animar();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ate]);

  return (
    <div>
      <p
        ref={ref}
        className="font-display text-[44px]/none font-extrabold tracking-[-.04em] sm:text-[68px]"
      >
        {valor}
      </p>
      <p className="mt-1 font-display text-[10.5px] font-extrabold tracking-[.16em] uppercase sm:mt-1 sm:text-[12px] sm:tracking-[.18em]">
        {rotulo}
      </p>
    </div>
  );
}
