"use client";

import { useState } from "react";
import externos from "@/content/externos.json";
import { Pendente } from "./pendente";

const VIDEO_ID = externos.videoInstitucionalId as string | null;

/**
 * Vídeo institucional no YouTube (devolutiva, item 2.9).
 *
 * Carrega por fachada: até o clique existe só uma imagem e um botão, e o
 * iframe do YouTube (com o JS e os cookies dele) só entra depois. Um iframe
 * do YouTube montado direto custa ~1MB e derruba o LCP que o §9 exige.
 */
export function VideoInstitucional() {
  const [tocando, setTocando] = useState(false);

  return (
    <section className="bg-mata-fundo px-4 py-14 text-osso sm:px-12 sm:py-[72px]">
      <div className="mx-auto max-w-[1180px]">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-dourado uppercase">
          Vídeo institucional
        </p>
        <h2 className="mt-3 max-w-[20ch] font-display text-[30px]/none font-extrabold tracking-[-.03em] sm:text-[44px]/none">
          A Semear por dentro
        </h2>

        {!VIDEO_ID ? (
          <div className="mt-8">
            <Pendente>
              Link do vídeo institucional no YouTube · a pedir ao marketing
            </Pendente>
          </div>
        ) : (
          <div className="relative mt-8 aspect-video w-full max-w-full bg-mata">
            {tocando ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                title="Vídeo institucional da Semear Agronegócios"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setTocando(true)}
                aria-label="Reproduzir o vídeo institucional da Semear"
                className="group absolute inset-0 h-full w-full cursor-pointer"
                style={{
                  backgroundImage: `url(https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-mata-fundo/35 transition-colors group-hover:bg-mata-fundo/20" />
                <span className="absolute top-1/2 left-1/2 flex h-[72px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-cana">
                  <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
                    <path d="M0 0v30l26-15z" fill="#0B3D24" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
