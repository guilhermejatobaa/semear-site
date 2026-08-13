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
  page.tsx                  home — mapa de cobertura, faixa de números, unidades, culturas
  unidades/page.tsx          + unidades-lista.tsx — filtro por UF, mapa sincronizado por hover
  consultoria/page.tsx       + consultoria-form.tsx — formulário real, POST ao route handler
  institucional/page.tsx     história, linha do tempo, valores, trabalhe conosco
  api/consultoria/route.ts   route handler, envia e-mail via Resend
  contato/, trabalhe-conosco/   rotas vazias (fora do escopo do MVP, ver CLAUDE.md)
components/
  cabecalho.tsx, rodape.tsx  header (barra de topo + mega-menu + hambúrguer) e footer
  mapa-cobertura/            elemento assinatura — mapa real (d3-geo + topojson)
  culturas-hover.tsx, contador.tsx, revela.tsx, barra-fixa-mobile.tsx
  pendente.tsx, pendente-foto.tsx   marcadores de conteúdo/foto pendente (ver CLAUDE.md)
content/
  unidades.json, linhas.json, culturas.json, municipios.json
public/
  logo/                      logo oficial (extraída de brand-source/)
  mapa/countries-110m.json   TopoJSON vendorizado — sem chamada a CDN em runtime
```

Ver [CLAUDE.md](./CLAUDE.md) seção 7 para a árvore completa e o histórico de decisões.

## Deploy

Vercel, preview por branch. Sem banco de dados, sem CMS — conteúdo em JSON no repo.
