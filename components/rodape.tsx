import Image from "next/image";
import Link from "next/link";
import unidades from "@/content/unidades.json";
import linhas from "@/content/linhas.json";
import { RedesSociais } from "./redes-sociais";

const WHATSAPP_COMERCIAL = "558233281831";

export function Rodape() {
  return (
    <footer className="bg-mata-fundo px-4 py-16 text-osso sm:px-12">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <Image
            src="/logo/semear-branco.svg"
            alt="Semear Agronegócios"
            width={228}
            height={63}
            className="h-10 w-auto"
          />
          <p className="mt-[18px] max-w-[30ch] text-[15px]/relaxed text-osso/62">
            Distribuidora de insumos agropecuários fundada em 2007 em Maceió/AL
            por Hélio Jatobá e Marcos Pacheco.
          </p>
          <p className="mt-[18px] text-[16px] font-bold">
            <a href={`https://wa.me/${WHATSAPP_COMERCIAL}`} className="text-cana">
              (82) 3328-1831
            </a>
          </p>
          <div className="mt-6">
            <RedesSociais />
          </div>
        </div>

        <div>
          <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-dourado uppercase">
            Unidades
          </p>
          <ul className="mt-4 flex flex-col gap-[9px]">
            {unidades.map((u) => (
              <li key={u.slug}>
                <Link href="/unidades" className="text-[14px] text-osso/70">
                  {u.nome} · {u.cidade}/{u.uf}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-dourado uppercase">
            Linhas
          </p>
          <ul className="mt-4 flex flex-col gap-[9px]">
            {linhas.map((l) => (
              <li key={l.slug}>
                <Link href="/#culturas" className="text-[14px] text-osso/70">
                  {l.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-dourado uppercase">
            Institucional
          </p>
          <ul className="mt-4 flex flex-col gap-[9px]">
            <li>
              <Link href="/institucional" className="text-[14px] text-osso/70">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/consultoria" className="text-[14px] text-osso/70">
                Consultoria técnica
              </Link>
            </li>
            <li>
              <Link href="/trabalhe-conosco" className="text-[14px] text-osso/70">
                Trabalhe conosco
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="text-[14px] text-osso/70">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-11 max-w-[1680px] border-t border-osso/12 pt-8">
        <p className="font-display text-[11px] font-extrabold tracking-[.2em] text-dourado uppercase">
          Comercialização de defensivos agrícolas
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 text-[13.5px]/relaxed text-osso/58 sm:grid-cols-3 sm:gap-8">
          <p>
            Na Semear, a comercialização de defensivos agrícolas é realizada
            mediante receituário agronômico e destinada exclusivamente a
            produtores rurais cadastrados.
          </p>
          <p>
            Nosso compromisso vai além da entrega do produto: oferecemos
            consultoria técnica para orientar o produtor em decisões mais
            seguras e eficientes no campo. A utilização dos produtos deve
            seguir rigorosamente as recomendações do rótulo e da bula, sempre
            com orientação profissional.
          </p>
          <p>
            Também fazemos nossa parte na preservação do meio ambiente. A
            Semear segue as normas de logística reversa e orienta sobre a
            devolução e a destinação correta das embalagens vazias, conforme as
            diretrizes do INPEV.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1680px] border-t border-osso/12 pt-5 text-[12px] tracking-[.08em] text-osso/45">
        © 2026 Semear Agronegócios · Maceió/AL
      </p>
    </footer>
  );
}
