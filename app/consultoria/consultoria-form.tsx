"use client";

import { useState, type FormEvent } from "react";
import municipios from "@/content/municipios.json";

const CULTURAS = [
  "Cana",
  "Citros",
  "Pastagem/pecuária",
  "Coco",
  "Fruticultura",
  "Outra",
] as const;

const FAIXAS_AREA = [
  "Até 10 ha",
  "10 a 50 ha",
  "50 a 200 ha",
  "200 a 500 ha",
  "Acima de 500 ha",
] as const;

type DadosFormulario = {
  nome: string;
  whatsapp: string;
  municipio: string;
  cultura: string;
  areaHectares: string;
  epoca: string;
  observacao: string;
};

const DADOS_INICIAIS: DadosFormulario = {
  nome: "",
  whatsapp: "",
  municipio: "",
  cultura: "",
  areaHectares: "",
  epoca: "",
  observacao: "",
};

type Etapa = 0 | 1 | 2 | 3 | 4 | 5;
const TOTAL_ETAPAS = 6;

type StatusEnvio = "ocioso" | "enviando" | "sucesso" | "erro";

export function ConsultoriaForm() {
  const [etapa, setEtapa] = useState<Etapa>(0);
  const [dados, setDados] = useState<DadosFormulario>(DADOS_INICIAIS);
  const [erro, setErro] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusEnvio>("ocioso");

  function atualizar<K extends keyof DadosFormulario>(campo: K, valor: string) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  function avancar() {
    setErro(null);
    if (etapa === 0) {
      if (!dados.nome.trim()) {
        setErro("Preencha seu nome para continuar.");
        return;
      }
      if (!dados.whatsapp.trim() || dados.whatsapp.replace(/\D/g, "").length < 10) {
        setErro("Informe um WhatsApp válido, com DDD, para continuar.");
        return;
      }
    }
    setEtapa((e) => (e < 5 ? ((e + 1) as Etapa) : e));
  }

  function voltar() {
    setErro(null);
    setEtapa((e) => (e > 0 ? ((e - 1) as Etapa) : e));
  }

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setStatus("enviando");
    try {
      const resposta = await fetch("/api/consultoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!resposta.ok) {
        throw new Error("Falha no envio");
      }
      setStatus("sucesso");
    } catch {
      setStatus("erro");
      setErro(
        "Não conseguimos enviar agora. Confira sua conexão e tente de novo, ou chame direto no WhatsApp (82) 3328-1831."
      );
    }
  }

  if (status === "sucesso") {
    return (
      <div className="rounded-lg border-2 border-mata bg-white p-6 shadow-md">
        <p className="font-display text-2xl font-bold">Recebemos seu pedido</p>
        <p className="mt-2 text-grafite">
          Um consultor da Semear entra em contato pelo WhatsApp{" "}
          <strong>{dados.whatsapp}</strong> em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div className="mb-6 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: TOTAL_ETAPAS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= etapa ? "bg-mata" : "bg-mata/15"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-grafite">
        Etapa {etapa + 1} de {TOTAL_ETAPAS}
      </p>

      {etapa === 0 && (
        <div className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              required
              value={dados.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
              className="mt-2 w-full rounded-md border border-mata/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              required
              placeholder="(82) 99999-9999"
              value={dados.whatsapp}
              onChange={(e) => atualizar("whatsapp", e.target.value)}
              className="mt-2 w-full rounded-md border border-mata/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
            />
          </div>
        </div>
      )}

      {etapa === 1 && (
        <div>
          <label htmlFor="municipio" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
            Em qual município fica sua propriedade?
          </label>
          <input
            id="municipio"
            type="text"
            list="lista-municipios"
            value={dados.municipio}
            onChange={(e) => atualizar("municipio", e.target.value)}
            placeholder="Digite o município"
            className="mt-2 w-full rounded-md border border-mata/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
          />
          <datalist id="lista-municipios">
            {municipios.map((m) => (
              <option key={`${m.nome}-${m.uf}`} value={`${m.nome}/${m.uf}`} />
            ))}
          </datalist>
        </div>
      )}

      {etapa === 2 && (
        <fieldset>
          <legend className="block text-sm font-semibold uppercase tracking-wide text-grafite">
            Cultura ou criação
          </legend>
          <div className="mt-3 space-y-2">
            {CULTURAS.map((c) => (
              <label
                key={c}
                className="flex items-center gap-3 rounded-md border border-mata/20 px-4 py-3 has-[:checked]:border-mata has-[:checked]:bg-dourado/10"
              >
                <input
                  type="radio"
                  name="cultura"
                  value={c}
                  checked={dados.cultura === c}
                  onChange={(e) => atualizar("cultura", e.target.value)}
                  className="accent-mata"
                />
                {c}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {etapa === 3 && (
        <fieldset>
          <legend className="block text-sm font-semibold uppercase tracking-wide text-grafite">
            Área aproximada
          </legend>
          <div className="mt-3 space-y-2">
            {FAIXAS_AREA.map((f) => (
              <label
                key={f}
                className="flex items-center gap-3 rounded-md border border-mata/20 px-4 py-3 has-[:checked]:border-mata has-[:checked]:bg-dourado/10"
              >
                <input
                  type="radio"
                  name="areaHectares"
                  value={f}
                  checked={dados.areaHectares === f}
                  onChange={(e) => atualizar("areaHectares", e.target.value)}
                  className="accent-mata"
                />
                {f}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {etapa === 4 && (
        <div>
          <label htmlFor="epoca" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
            Época prevista de plantio ou manejo
          </label>
          <input
            id="epoca"
            type="text"
            placeholder="Ex.: início da próxima safra, agora, ainda não sei"
            value={dados.epoca}
            onChange={(e) => atualizar("epoca", e.target.value)}
            className="mt-2 w-full rounded-md border border-mata/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
          />
        </div>
      )}

      {etapa === 5 && (
        <div>
          <label htmlFor="observacao" className="block text-sm font-semibold uppercase tracking-wide text-grafite">
            Observação (opcional)
          </label>
          <textarea
            id="observacao"
            rows={4}
            value={dados.observacao}
            onChange={(e) => atualizar("observacao", e.target.value)}
            className="mt-2 w-full rounded-md border border-mata/30 bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
          />
        </div>
      )}

      {erro && (
        <p role="alert" className="mt-4 rounded-md border border-mata bg-dourado/10 px-4 py-3 text-sm text-mata">
          {erro}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        {etapa > 0 ? (
          <button
            type="button"
            onClick={voltar}
            className="px-4 py-3 font-semibold text-grafite hover:text-mata focus-visible:outline focus-visible:outline-2 focus-visible:outline-mata"
          >
            Voltar
          </button>
        ) : (
          <span />
        )}

        {etapa < 5 ? (
          <button
            type="button"
            onClick={avancar}
            className="rounded-md bg-dourado px-6 py-3 font-semibold text-mata shadow-sm hover:bg-dourado/90 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mata"
          >
            Continuar
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "enviando"}
            className="rounded-md bg-dourado px-6 py-3 font-semibold text-mata shadow-sm hover:bg-dourado/90 hover:shadow disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mata"
          >
            {status === "enviando" ? "Enviando..." : "Falar com um consultor"}
          </button>
        )}
      </div>
    </form>
  );
}
