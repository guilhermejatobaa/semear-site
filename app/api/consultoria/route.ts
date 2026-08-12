import { NextResponse } from "next/server";
import { Resend } from "resend";

type PayloadConsultoria = {
  nome: string;
  whatsapp: string;
  municipio: string;
  cultura: string;
  areaHectares: string;
  epoca: string;
  observacao: string;
};

const DESTINATARIO = process.env.CONSULTORIA_EMAIL_DESTINO;
const REMETENTE = process.env.CONSULTORIA_EMAIL_REMETENTE ?? "onboarding@resend.dev";

function validar(payload: Partial<PayloadConsultoria>): string | null {
  if (!payload.nome?.trim()) return "Nome é obrigatório.";
  if (!payload.whatsapp?.replace(/\D/g, "").match(/^\d{10,11}$/)) {
    return "WhatsApp inválido.";
  }
  return null;
}

export async function POST(request: Request) {
  let payload: Partial<PayloadConsultoria>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const erro = validar(payload);
  if (erro) {
    return NextResponse.json({ erro }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !DESTINATARIO) {
    console.error(
      "Consultoria recebida, mas RESEND_API_KEY ou CONSULTORIA_EMAIL_DESTINO não configurados:",
      payload
    );
    return NextResponse.json(
      { erro: "Envio de e-mail não configurado no servidor." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { nome, whatsapp, municipio, cultura, areaHectares, epoca, observacao } = payload;

  const { error } = await resend.emails.send({
    from: REMETENTE,
    to: DESTINATARIO,
    subject: `Falar com um consultor — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `WhatsApp: ${whatsapp}`,
      `Município: ${municipio || "não informado"}`,
      `Cultura ou criação: ${cultura || "não informado"}`,
      `Área aproximada: ${areaHectares || "não informado"}`,
      `Época prevista: ${epoca || "não informado"}`,
      `Observação: ${observacao || "-"}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Erro ao enviar e-mail via Resend:", error);
    return NextResponse.json({ erro: "Falha ao enviar." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
