"use client";

import { useState, type FormEvent } from "react";
import { Pendente } from "@/components/pendente";

const WHATSAPP_COMERCIAL = "558233281831";

const CULTURAS = ["Cana", "Citros", "Pastagem/pecuária", "Coco", "Fruticultura"] as const;

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

type StatusEnvio = "ocioso" | "enviando" | "sucesso" | "erro";

export function ConsultoriaForm() {
  const [dados, setDados] = useState<DadosFormulario>(DADOS_INICIAIS);
  const [status, setStatus] = useState<StatusEnvio>("ocioso");
  const [erro, setErro] = useState<string | null>(null);

  const podeEnviar =
    dados.nome.trim().length > 2 && dados.whatsapp.replace(/\D/g, "").length >= 10;

  function atualizar<K extends keyof DadosFormulario>(campo: K, valor: string) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;
    setErro(null);
    setStatus("enviando");
    try {
      const resposta = await fetch("/api/consultoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!resposta.ok) throw new Error("Falha no envio");
      setStatus("sucesso");
    } catch {
      setStatus("erro");
      setErro(
        `Não conseguimos registrar agora. Confira sua conexão e tente de novo, ou chame direto no WhatsApp (82) 3328-1831.`
      );
    }
  }

  if (status === "sucesso") {
    return (
      <div className="border-2 border-mata bg-white p-9">
        <p className="inline-block bg-cana px-3 py-1.5 font-display text-[11px] font-extrabold tracking-[.18em] text-mata uppercase">
          Solicitação registrada
        </p>
        <h2 className="mt-5 font-display text-[40px]/[1] font-extrabold tracking-[-.035em]">
          Obrigado, {dados.nome.split(" ")[0]}.
        </h2>
        <p className="mt-3.5 text-[17px]/relaxed text-grafite">
          Um consultor da unidade mais próxima entra em contato pelo WhatsApp{" "}
          <strong>{dados.whatsapp}</strong> em até um dia útil. Se preferir
          adiantar, chame agora:
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_COMERCIAL}`}
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

        {status === "erro" && erro && (
          <p role="alert" className="border border-mata bg-dourado/10 px-4 py-3 text-[14px] text-mata">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={!podeEnviar || status === "enviando"}
          className="mt-1.5 py-5 font-display text-[14px] font-extrabold tracking-[.14em] text-osso uppercase disabled:cursor-not-allowed"
          style={{ background: podeEnviar ? "var(--mata)" : "rgba(11,61,36,.35)" }}
        >
          {status === "enviando" ? "Enviando..." : "Quero falar com um consultor"}
        </button>
        <p className="text-[13px]/relaxed text-grafite">
          Usamos seus dados só para este contato comercial.
        </p>
      </form>

      <div className="mt-9 border-t border-mata/16 pt-6">
        <p className="font-display text-[11px] font-extrabold tracking-[.18em] text-grafite uppercase">
          Prefere ligar?
        </p>
        <p className="mt-2.5 font-display text-[30px] font-extrabold tracking-[-.02em]">
          <a href={`https://wa.me/${WHATSAPP_COMERCIAL}`}>(82) 3328-1831</a>
        </p>
        <div className="mt-4">
          <Pendente>
            Para onde o formulário envia (e-mail, CRM ou WhatsApp da unidade)
          </Pendente>
        </div>
      </div>
    </div>
  );
}
