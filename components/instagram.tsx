"use client";

import { useEffect, useRef, useState } from "react";
import externos from "@/content/externos.json";
import { Pendente } from "./pendente";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const POSTS = externos.instagramPosts as string[];
const PERFIL = externos.instagramUrl as string | null;
const USUARIO = externos.instagramUsuario as string | null;

/**
 * Integração com o Instagram (devolutiva, item 2.5), com o embed oficial.
 *
 * O embed oficial do Instagram é por post — o embed de feed de perfil foi
 * descontinuado pela Meta —, então o marketing precisa entregar uma lista de
 * permalinks em content/externos.json.
 *
 * O script de terceiros só é carregado quando a seção entra na tela. Isso é
 * deliberado: o §9 exige LCP abaixo de 2,5s em 4G, e embed.js traz cookies e
 * ~100KB de JS que não podem competir com o carregamento inicial da página.
 */
export function Instagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visivel || POSTS.length === 0) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visivel]);

  useEffect(() => {
    if (!visivel) return;
    const existente = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (existente) {
      window.instgrm?.Embeds.process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(s);
  }, [visivel]);

  return (
    <section className="bg-osso px-4 py-14 sm:px-12 sm:py-[72px]">
      <div className="mx-auto max-w-[1680px]" ref={ref}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
              No Instagram
            </p>
            <h2 className="mt-3 max-w-[22ch] font-display text-[30px]/none font-extrabold tracking-[-.03em] text-mata sm:text-[44px]/none">
              O que a equipe está fazendo em campo
            </h2>
          </div>
          {PERFIL && USUARIO && (
            <a
              href={PERFIL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-b-2 border-mata pb-1 font-display text-[13px] font-extrabold tracking-[.14em] text-mata uppercase"
            >
              @{USUARIO} →
            </a>
          )}
        </div>

        {POSTS.length === 0 ? (
          <div className="mt-8">
            <Pendente>
              Perfil do Instagram e permalinks dos posts a exibir · a pedir ao
              marketing. O embed oficial da Meta é por post; não existe mais
              embed de feed de perfil.
            </Pendente>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
            {POSTS.map((url) => (
              <blockquote
                key={url}
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ margin: 0, minWidth: 0, width: "100%" }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
