import Image from "next/image";
import depoimentos from "@/content/depoimentos.json";
import { Pendente } from "./pendente";
import { PendenteFoto } from "./pendente-foto";

type Depoimento = {
  nome: string;
  municipio: string;
  cultura: string;
  texto: string;
  /** Caminho em /public. null enquanto a foto não chega. */
  foto: string | null;
};

const LISTA = depoimentos as Depoimento[];
const VAGAS = 3;

/**
 * "Quem compra da Semear" (devolutiva, item 1.2).
 *
 * Enquanto content/depoimentos.json estiver vazio a seção renderiza VAGAS
 * cartões pendentes — o §6 do CLAUDE.md proíbe depoimento fictício, e o site
 * atual já está no ar com Lorem Ipsum nesse exato lugar. Assim que o comercial
 * entregar nome, município, cultura, texto e foto, basta preencher o JSON.
 */
export function Depoimentos() {
  const vazio = LISTA.length === 0;

  return (
    <section className="bg-osso px-4 py-14 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-[1680px]">
        <p className="font-display text-[12px] font-extrabold tracking-[.24em] text-grafite uppercase">
          Quem compra da Semear
        </p>
        <h2 className="mt-3 max-w-[22ch] font-display text-[32px]/none font-extrabold tracking-[-.03em] text-mata sm:text-[52px]/none">
          Produtor que já trabalha com a gente
        </h2>

        {vazio ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
              {Array.from({ length: VAGAS }, (_, i) => (
                <article key={i} className="border border-mata/14">
                  <div className="h-[240px] sm:h-[280px]">
                    <PendenteFoto legenda="Foto do produtor" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <Pendente>
                      Depoimento {i + 1} · texto, nome, município e cultura, a
                      coletar com o comercial
                    </Pendente>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-[62ch] text-[14px]/relaxed text-grafite">
              É o bloco que mais pesa na comparação com a concorrência: nenhuma
              distribuidora da região mostra produtor com nome e cultura. Vale
              gravar em vídeo na próxima visita.
            </p>
          </>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
            {LISTA.map((d) => (
              <article key={`${d.nome}-${d.municipio}`} className="border border-mata/14">
                <div className="relative h-[240px] sm:h-[280px]">
                  {d.foto ? (
                    <Image
                      src={d.foto}
                      alt={`${d.nome}, produtor em ${d.municipio}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <PendenteFoto legenda={`Foto de ${d.nome}`} />
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[16px]/relaxed text-mata sm:text-[17px]">
                    “{d.texto}”
                  </p>
                  <p className="mt-4 font-display text-[15px] font-extrabold tracking-[-.01em] text-mata">
                    {d.nome}
                  </p>
                  <p className="mt-1 text-[12px] font-medium tracking-[.1em] text-grafite uppercase">
                    {d.municipio} · {d.cultura}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
