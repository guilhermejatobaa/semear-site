"use client";

import { useState, type FormEvent } from "react";

const WHATSAPP_COMERCIAL = "558233281831";

const CULTURAS = ["Cana", "Milho", "Citros", "Pastagem/pecuária", "Hortaliças e frutas"] as const;

type DadosFormulario = {
  nome: string;
  whatsapp: string;
  municipio: string;
  area: string;
  cultura: string;
};

const DADOS_INICIAIS: DadosFormulario = {
  nome: "",
  whatsapp: "",
  municipio: "",
  area: "",
  cultura: "Cana",
};

type StatusEnvio = "ocioso" | "sucesso";

/**
 * O formulário entrega a solicitação no WhatsApp comercial (decisão do
 * Guilherme, 2026-11-10): monta a mensagem com os campos e abre a conversa
 * já escrita. O produtor só toca em enviar. Não depende de servidor nem de
 * e-mail; o route handler /api/consultoria (Resend) ficou sem uso.
 */
function linkWhatsapp(d: DadosFormulario) {
  const linhas = [
    "Olá! Quero falar com um consultor da Semear.",
    "",
    `Nome: ${d.nome.trim()}`,
    `WhatsApp: ${d.whatsapp.trim()}`,
    `Município: ${d.municipio.trim() || "não informado"}`,
    `Área (ha): ${d.area.trim() || "não informado"}`,
    `Cultura ou criação: ${d.cultura}`,
  ];
  return `https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(linhas.join("\n"))}`;
}

export function ConsultoriaForm() {
  const [dados, setDados] = useState<DadosFormulario>(DADOS_INICIAIS);
  const [status, setStatus] = useState<StatusEnvio>("ocioso");

  const podeEnviar =
    dados.nome.trim().length > 2 && dados.whatsapp.replace(/\D/g, "").length >= 10;

  function atualizar<K extends keyof DadosFormulario>(campo: K, valor: string) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;
    // Aberto dentro do próprio clique, senão o navegador bloqueia como pop-up.
    window.open(linkWhatsapp(dados), "_blank", "noopener,noreferrer");
    setStatus("sucesso");
  }

  if (status === "sucesso") {
    return (
      <div className="border-2 border-mata bg-white p-9">
        <p className="inline-block bg-cana px-3 py-1.5 font-display text-[11px] font-extrabold tracking-[.18em] text-mata uppercase">
          Falta só enviar
        </p>
        <h2 className="mt-5 font-display text-[40px]/[1] font-extrabold tracking-[-.035em]">
          Obrigado, {dados.nome.split(" ")[0]}.
        </h2>
        <p className="mt-3.5 text-[17px]/relaxed text-grafite">
          Abrimos o WhatsApp da Semear com a sua solicitação já escrita. Toque
          em enviar na conversa e um consultor responde por lá. Se o WhatsApp
          não abriu, use o botão:
        </p>
        <a
          href={linkWhatsapp(dados)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-cana px-[26px] py-[17px] font-display text-[13px] font-extrabold tracking-[.14em] text-mata uppercase"
        >
          Abrir WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setDados(DADOS_INICIAIS);
            setStatus("ocioso");
          }}
          className="mt-4 block bg-transparent text-[14px] font-semibold text-grafite underline"
        >
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-[36px]/[1] font-extrabold tracking-[-.035em] sm:text-[40px]">
        Chamar um consultor
      </h2>
      <p className="mt-3 text-[15px]/relaxed text-grafite sm:text-[16px]">
        Obrigatórios: nome e WhatsApp. O resto ajuda o técnico a chegar
        preparado.
      </p>

      <form onSubmit={enviar} noValidate className="mt-7 flex flex-col gap-5 sm:mt-[30px]">
        <div>
          <label
            htmlFor="nome"
            className="block font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase"
          >
            Nome *
          </label>
          <input
            id="nome"
            type="text"
            required
            value={dados.nome}
            onChange={(e) => atualizar("nome", e.target.value)}
            placeholder="Como o consultor deve te chamar"
            className="mt-2 w-full border border-mata/35 bg-white px-4 py-4 text-[17px] text-mata outline-none focus-visible:border-mata"
          />
        </div>

        <div>
          <label
            htmlFor="whatsapp"
            className="block font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase"
          >
            WhatsApp *
          </label>
          <input
            id="whatsapp"
            type="tel"
            required
            value={dados.whatsapp}
            onChange={(e) => atualizar("whatsapp", e.target.value)}
            placeholder="(82) 90000-0000"
            className="mt-2 w-full border border-mata/35 bg-white px-4 py-4 text-[17px] text-mata outline-none focus-visible:border-mata"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="municipio"
              className="block font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase"
            >
              Município
            </label>
            <input
              id="municipio"
              type="text"
              value={dados.municipio}
              onChange={(e) => atualizar("municipio", e.target.value)}
              placeholder="Onde fica a área"
              className="mt-2 w-full border border-mata/35 bg-white px-4 py-4 text-[17px] text-mata outline-none focus-visible:border-mata"
            />
          </div>
          <div>
            <label
              htmlFor="area"
              className="block font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase"
            >
              Área (ha)
            </label>
            <input
              id="area"
              type="text"
              value={dados.area}
              onChange={(e) => atualizar("area", e.target.value)}
              placeholder="Ex.: 40"
              className="mt-2 w-full border border-mata/35 bg-white px-4 py-4 text-[17px] text-mata outline-none focus-visible:border-mata"
            />
          </div>
        </div>

        <div>
          <p className="font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase">
            Cultura ou criação
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {CULTURAS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => atualizar("cultura", c)}
                className={`border border-mata/35 px-[18px] py-3 text-[13px] font-bold ${
                  dados.cultura === c ? "bg-mata text-osso" : "bg-transparent text-mata"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!podeEnviar}
          className="mt-1.5 py-5 font-display text-[14px] font-extrabold tracking-[.14em] text-osso uppercase disabled:cursor-not-allowed"
          style={{ background: podeEnviar ? "var(--mata)" : "rgba(11,61,36,.35)" }}
        >
          Quero falar com um consultor
        </button>
        <p className="text-[13px]/relaxed text-grafite">
          O botão abre o WhatsApp da Semear com estes dados já preenchidos.
          Usamos só para este contato comercial.
        </p>
      </form>

      <div className="mt-9 border-t border-mata/16 pt-6">
        <p className="font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase">
          Prefere chamar direto?
        </p>
        <p className="mt-2.5 font-display text-[30px] font-extrabold tracking-[-.02em]">
          <a href={`https://wa.me/${WHATSAPP_COMERCIAL}`}>(82) 3328-1831</a>
        </p>
        <p className="mt-1.5 text-[13px] text-grafite">WhatsApp comercial</p>
      </div>
    </div>
  );
}
