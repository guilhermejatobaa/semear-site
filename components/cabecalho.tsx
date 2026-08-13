"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import culturas from "@/content/culturas.json";

const WHATSAPP_COMERCIAL = "558233281831";

export function Cabecalho() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const [mobileAberto, setMobileAberto] = useState(false);
  const naHome = pathname === "/";
  const naConsultoria = pathname?.startsWith("/consultoria");

  return (
    <>
      {naHome && (
        <div className="hidden items-center justify-between gap-6 bg-dourado px-12 py-[9px] text-[12px] font-bold tracking-[.12em] text-mata uppercase sm:flex">
          <span>Nove unidades próprias · sete estados do Nordeste · desde 2007</span>
          <a
            href={`https://wa.me/${WHATSAPP_COMERCIAL}`}
            className="border-b border-mata/45 text-mata no-underline"
          >
            WhatsApp comercial (82) 3328-1831
          </a>
        </div>
      )}

      <header className="relative z-30 border-b border-osso/10 bg-mata-fundo">
        <nav className="flex items-center justify-between gap-8 px-4 py-4 sm:px-12 sm:py-5">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo/semear-branco.svg"
              alt="Semear Agronegócios"
              width={228}
              height={63}
              priority
              className="h-7 w-auto sm:h-[38px]"
            />
          </Link>

          <div className="hidden items-center gap-8 text-[12px] font-extrabold tracking-[.16em] text-osso uppercase lg:flex">
            <Link
              href="/institucional"
              className={`border-b-2 pb-[3px] hover:border-cana ${
                pathname === "/institucional" ? "border-cana text-cana" : "border-transparent"
              }`}
            >
              Institucional
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setMenuAberto(true)}
              onMouseLeave={() => setMenuAberto(false)}
            >
              <span className="cursor-pointer border-b-2 border-transparent pb-[3px] hover:border-cana">
                Atuação ▾
              </span>
              {menuAberto && (
                <div className="absolute top-[34px] left-[-24px] grid w-[520px] grid-cols-2 gap-[2px] border border-cana/35 bg-mata p-2">
                  {culturas.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/#culturas`}
                      className="bg-mata-fundo px-4 py-3.5 hover:bg-[#0f3d26]"
                    >
                      <span className="block font-display text-[15px] font-semibold tracking-[-0.01em] text-osso normal-case">
                        {c.nome}
                      </span>
                      <span className="mt-1 block text-[12px] font-normal tracking-normal text-osso/60 normal-case">
                        {c.linha}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/#culturas"
                    className="flex items-center bg-cana px-4 py-3.5 font-display text-[13px] font-extrabold tracking-[.12em] text-mata"
                  >
                    Ver todas as linhas →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/unidades"
              className={`border-b-2 pb-[3px] hover:border-cana ${
                pathname === "/unidades" ? "border-cana text-cana" : "border-transparent"
              }`}
            >
              Unidades
            </Link>
            <Link
              href="/trabalhe-conosco"
              className="border-b-2 border-transparent pb-[3px] hover:border-cana"
            >
              Trabalhe conosco
            </Link>

            {naConsultoria ? (
              <a
                href={`https://wa.me/${WHATSAPP_COMERCIAL}`}
                className="bg-dourado px-[22px] py-[14px] text-mata hover:bg-dourado/90"
              >
                WhatsApp (82) 3328-1831
              </a>
            ) : (
              <Link
                href="/consultoria"
                className="bg-cana px-[22px] py-[14px] text-mata hover:bg-dourado"
              >
                Falar com um consultor
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label={mobileAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileAberto}
            onClick={() => setMobileAberto((v) => !v)}
            className="flex w-6 flex-col gap-[5px] lg:hidden"
          >
            <span
              className={`h-[2px] bg-cana transition-transform ${
                mobileAberto ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] bg-cana transition-opacity ${mobileAberto ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] bg-osso transition-transform ${
                mobileAberto ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {mobileAberto && (
          <div className="border-t border-osso/10 bg-mata-fundo px-4 pb-6 lg:hidden">
            <ul className="flex flex-col gap-1 pt-4 text-[13px] font-extrabold tracking-[.14em] text-osso uppercase">
              <li>
                <Link
                  href="/institucional"
                  onClick={() => setMobileAberto(false)}
                  className="block min-h-[48px] content-center border-b border-osso/10"
                >
                  Institucional
                </Link>
              </li>
              <li>
                <Link
                  href="/unidades"
                  onClick={() => setMobileAberto(false)}
                  className="block min-h-[48px] content-center border-b border-osso/10"
                >
                  Unidades
                </Link>
              </li>
              <li>
                <Link
                  href="/trabalhe-conosco"
                  onClick={() => setMobileAberto(false)}
                  className="block min-h-[48px] content-center border-b border-osso/10"
                >
                  Trabalhe conosco
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  href="/consultoria"
                  onClick={() => setMobileAberto(false)}
                  className="flex min-h-[54px] items-center justify-center bg-cana text-mata"
                >
                  Falar com um consultor
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
