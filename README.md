# Semear Agronegócios — site institucional (MVP)

MVP do novo site institucional da Semear. Ver [CLAUDE.md](./CLAUDE.md) para o brief completo
(escopo, direção de design, regra de conteúdo).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha para o formulário de consultoria enviar
e-mail via [Resend](https://resend.com):

```
RESEND_API_KEY=
CONSULTORIA_EMAIL_DESTINO=
CONSULTORIA_EMAIL_REMETENTE=
```

Sem essas variáveis configuradas, o endpoint `/api/consultoria` responde com erro 503 e
registra o payload recebido no log do servidor — o formulário no navegador continua
funcionando ponta a ponta, só o envio de e-mail fica pendente.

## Estrutura

```
app/
  page.tsx                 home — mapa de cobertura + tese do site
  unidades/page.tsx         as nove unidades
  consultoria/page.tsx      formulário de consultoria
  api/consultoria/route.ts  route handler, envia e-mail via Resend
  institucional/, contato/, trabalhe-conosco/   rotas vazias (fora do escopo do MVP)
components/
  mapa-cobertura/           elemento assinatura — SVG estilizado + busca por município
  pendente.tsx              marcador de conteúdo pendente (ver regra no CLAUDE.md)
content/
  unidades.json             as nove unidades, com lat/lng
  linhas.json               as sete linhas de produto
  municipios.json           municípios usados na busca do mapa de cobertura
```

## Deploy

Vercel, preview por branch. Sem banco de dados, sem CMS — conteúdo em JSON no repo.
