# Semear Agronegócios — site institucional

Brief do projeto. Leia antes de escrever qualquer código.

**Atualização (2026-08-13):** o Guilherme entregou um pacote de design completo em alta
fidelidade (protótipos `.dc.html` + `mapa-nordeste.html`, ver histórico do commit que
introduziu esta atualização) cobrindo Home, Unidades, Consultoria e Institucional, desktop
e mobile, com instrução explícita de implementar "exatamente dessa forma". Esse pacote
supera vários pontos do brief original abaixo — as seções 1, 5 e 8 têm notas marcando onde.
Ele não substitui o resto do documento (empresa, tese, regra de conteúdo continuam valendo).

---

## 1. O que estamos construindo

Um MVP do novo site institucional da Semear, para apresentar à equipe de marketing.
Não é o site final: é a prova de que a direção funciona.

**Escopo do MVP:**

- Home completa
- Página `/unidades` completa
- Página `/institucional` completa — **superou o brief original** (ver nota abaixo)
- Formulário de consultoria funcionando ponta a ponta
- Deploy em preview na Vercel, com URL aberta no celular

**Fora do escopo (não implemente, mesmo que pareça natural):**

- CMS, painel administrativo, autenticação
- Catálogo de produtos com página por SKU
- Blog, e-commerce, carrinho
- Páginas `/contato`, `/trabalhe-conosco` — deixe como rota vazia (o CTA "Enviar currículo"
  de `/institucional` aponta para `/trabalhe-conosco`, que segue vazia até ter destino real)
- Configuração de domínio ou DNS

> **Nota:** a versão original deste documento também listava `/institucional` como rota
> vazia. O pacote de design de 2026-08-13 veio com essa página inteiramente desenhada
> (história, linha do tempo, valores, credenciais, trabalhe conosco) e o Guilherme pediu para
> implementar exatamente assim — por isso ela saiu do "fora do escopo". Onde o conteúdo real
> não existe (fotos, datas de expansão), a página usa `<Pendente>`/`<PendenteFoto>`, não
> inventa.

Se uma feature não cabe no escopo acima, ela não entra. O MVP tem que ficar pronto rápido e
ser navegável no celular numa reunião.

---

## 2. A empresa

Distribuidora de insumos agropecuários, fundada em 2007 em Maceió/AL por Hélio Jatobá e
Marcos Pacheco. Nove unidades em sete estados do Nordeste (AL, SE, PE, CE, RN, MA, BA — a
versão original deste documento dizia "seis estados", contagem errada; corrigido em
2026-08-13 a partir da contagem real das UFs na tabela abaixo).

| Unidade | Cidade / UF |
|---|---|
| Matriz | Maceió/AL — Av. Durval de Góes Monteiro, 5798, Tabuleiro dos Martins |
| Arapiraca | Arapiraca/AL — Av. Gov. Semeão Lamenha Filho, 435 |
| Itabaiana | Itabaiana/SE — Av. Manoel Antonio dos Santos, 839A |
| Carpina | Carpina/PE — Av. Cons. João Alfredo, 330 |
| Limoeiro | Limoeiro do Norte/CE — R. Cel. Clovis Alexandrino, 1726A |
| Mossoró | Mossoró/RN — R. Dr. João Marcelino, 1021 |
| Imperatriz | Imperatriz/MA — Rod. BR 010, 518 |
| Paripiranga | Paripiranga/BA — Pç. Dona Maria Angélica, 45 |
| Rio Real | Rio Real/BA — R. Joaquim Mattos, 69 |

**Linhas atendidas:** sementes, fertilizantes, herbicidas, fungicidas, inseticidas,
medicamentos veterinários, ferramentas e utensílios.

**Culturas e criações relevantes:** cana, citros, pastagem e pecuária, coco, fruticultura.

**Credenciais reais:** selo de excelência do CRMV-AL; parceria com Bayer; presença em
Citros Show e Expoimp.

**WhatsApp comercial:** (82) 3328-1831.

---

## 3. A tese do site

O site antigo vende catálogo. A operação vende **consultoria técnica com presença local**.
O novo site inverte isso.

Duas coisas convencem um produtor a comprar da Semear e não do concorrente:

1. **Tem gente perto dele.** Nove unidades, sete estados.
2. **Alguém vai até a propriedade.** Consultor acompanha manejo e resultado — é disso que
   o Instagram da empresa fala o tempo todo, e é o que o site nunca disse.

Produto é consequência dessas duas coisas, não a vitrine.

**Público:** produtor rural do Nordeste, na maioria acessando pelo celular, muitas vezes em
conexão ruim. Escreva e projete para ele, não para um comitê de marca.

---

## 4. Direção de design

### Conceito

**O território é o herói.** A home não abre com foto aérea de lavoura nem com headline
genérica sobre "soluções para o campo". Abre com o mapa do Nordeste e os nove pontos da
Semear desenhados sobre ele.

### Elemento assinatura

**Mapa de cobertura interativo.** O produtor digita o município ou toca no mapa, e o site
responde: qual unidade atende, quanto fica de distância, telefone direto e um botão que
abre o WhatsApp daquela unidade específica.

É a única peça com investimento pesado de execução — animação de entrada dos pontos,
transição suave para o estado selecionado. Todo o resto do site é contido em volta dela.

**Atualizado (2026-08-13):** implementado com geometria real — `d3-geo` (`geoMercator` +
`geoPath`) sobre o TopoJSON do `world-atlas@2.0.2` (vendorizado em
`public/mapa/countries-110m.json` para não depender de CDN no LCP), não um SVG desenhado à
mão. Três temas de cor (`mata`, `osso`, `ousado` — este com pulso animado), rótulos de UF,
entrada animada e seleção via clique/teclado. Ver `components/mapa-cobertura/mapa.tsx` e o
protótipo de referência `mapa-nordeste.html` (histórico do commit). Não integre Google Maps
API — a geometria é local.

### Paleta

**Atualizado (2026-08-12):** a paleta original deste documento (verde-oliva/massapê marrom)
foi descartada a pedido do Guilherme — no ar, o site não lembrava as cores da Semear.
A paleta atual vem de duas fontes reais, não de invenção:

1. `brand-source/SEMEAR-LOGO-APROVADO.pdf` — a logo aprovada da empresa. As cores abaixo
   foram extraídas dos valores RGB exatos dos vetores do PDF (ver processo em
   `public/logo/`), não escolhidas visualmente.
2. As cores de fato usadas em produção em semear-br.com (heading `#00663A`, ícones
   `#779643`, hover/destaque `#B4E75D`, fundo de seção `#F8FFEC`).

```
--cana        #73C82C   verde-lima da logo — pontos do mapa, botões de ação sobre fundo escuro
--mata        #0B3D24   verde escuro — fundo de seções densas e texto padrão
--mata-fundo  #072418   verde ainda mais escuro — header, footer e cartões sobre --mata,
                        dá profundidade sem introduzir cor nova (adicionado 2026-08-13)
--osso        #F3F8EC   off-white com leve viés verde — fundo padrão
--dourado     #F9A70D   o sol da logo — acento quente, usado sobre fundo escuro/mata
--grafite     #42513F   texto secundário
```

Fundo padrão claro. Seções escuras em `--mata`/`--mata-fundo` marcam mudança de assunto, não
decoração.

**Regra de contraste:** `--cana` e `--dourado` são claros (luminância alta) — funcionam bem
como preenchimento sobre `--mata`/`--mata-fundo` (fundo escuro) ou como fundo de botão com
texto `--mata` em cima. Não usar como cor de texto nem borda fina sobre `--osso`/branco — o
contraste fica abaixo de WCAG AA (~1.9:1). Testado com a fórmula de contraste relativo do
WCAG; ver commit que introduziu esta paleta para os pares verificados.

**Forma — atualizado 2026-08-13:** zero border-radius e zero box-shadow em todo o site
(regra global em `app/globals.css`, `* { border-radius: 0 !important; box-shadow: none
!important; }`). As únicas curvas do site são as do próprio logo. Separação é sempre por
borda de 1px ou troca de fundo — nunca sombra. Isso substitui a rodada anterior de polish
(cantos arredondados, sombras suaves) que uma sessão anterior havia adicionado; o pacote de
design de 2026-08-13 pediu explicitamente o visual reto de volta, agora com as cores reais da
marca em vez da paleta terrosa original.

### Tipografia

- **Display:** **Archivo**, pesos 600 e 800 (`next/font/google`), com Roboto Condensed como
  fallback. `letter-spacing` negativo (−.02em a −.045em conforme o tamanho — maior o texto,
  mais negativo). Números grandes ficam legíveis e o conjunto tem cara de sinalização de
  estrada, não de startup.
- **Corpo:** Inter, pesos 400/500/600/700, 15–19px conforme o contexto. O público lê no
  celular, ao sol.
- **Dados e rótulos:** Archivo ou Inter em versalete espaçado (`tracking` .14em–.24em). Nada
  de monoespaçada — aqui ela seria pose técnica sem função. Números de contador/distância em
  `font-variant-numeric: tabular-nums` (já no `body` via `globals.css`).

### Movimento

Discreto e com propósito. Entrada dos pontos do mapa em sequência; revelação por scroll nas
seções de etapas/linha do tempo (componente `components/revela.tsx`). Nada de parallax, nada
de fade em tudo. `prefers-reduced-motion` respeitado.

**Contador animado — exceção deliberada e aprovada pelo cliente (2026-08-13):** a seção 5
lista "contador animado" como anti-padrão. O Guilherme pediu explicitamente os contadores da
faixa de números (9 unidades · 7 estados · 7 linhas · 19 anos) com rampa `easeOutCubic` ao
entrar na tela — ver `components/contador.tsx`. A condição que preserva o espírito do
anti-padrão original: **os números são sempre reais e verificáveis**, nunca uma métrica
inflada tipo "3.000+ clientes". Se o marketing reverter essa decisão, basta renderizar o
valor final sem a rampa (o componente já escreve o valor final via `setTimeout` de segurança,
então a mudança é só remover a rampa visual).

---

## 5. Anti-padrões — não faça

- Hero com foto de drone sobre lavoura e headline sobreposta
- Gradiente verde-para-verde em qualquer lugar
- Ícones genéricos de folhinha, trator e engrenagem
- Cards com ícone circular no topo repetidos em grade genérica (a grade de cartões em si —
  unidades, culturas — está OK; o clichê é o ícone-em-círculo, não o card)
- Seção de "números" com contador animado inflado (3.000+ clientes etc.) — **contador em si
  não é mais proibido**, ver exceção aprovada na seção 4 (Movimento): os números da faixa
  9/7/7/19 são reais e verificáveis, o anti-padrão é a métrica chutada, não a animação
- Texto de marketing vazio: "soluções inovadoras", "excelência", "compromisso com o campo"
- Carrossel de logos de parceiros rolando infinitamente
- Chat bubble flutuante no canto além do botão de WhatsApp
- Cookie banner que cobre metade da tela
- Estética "AI genérica": cream + serifada alta + acento terracota; preto + verde ácido;
  layout de jornal com filetes soltos sem sistema

> **Nota sobre border-radius (2026-08-13):** a versão original desta lista citava "zero
> border-radius" como sintoma da estética AI genérica. Isso mudou de sentido — a seção 4 agora
> define zero border-radius como regra *deliberada* do site inteiro (paleta verde-escuro real
> da marca, tipografia Archivo, mapa real, sem o resto do combo cream/serifada/terracota que
> tornava aquele visual genérico). O que continua proibido é o combo completo descrito ali,
> não o cantos-retos isolado.

---

## 6. Regra de conteúdo — inegociável

O site atual está no ar com depoimentos em Lorem Ipsum e quatro produtos de demonstração com
preço falso. Foi assim que a agência entregou e ninguém percebeu por anos.

**Não invente conteúdo.** Nada de depoimento fictício, número de clientes chutado, nome de
cliente inventado, foto de banco de imagem posando como equipe da Semear.

Onde faltar conteúdo real, renderize um bloco visivelmente marcado:

```tsx
<Pendente>Depoimento de cliente — a coletar com o comercial</Pendente>
```

O componente `Pendente` tem fundo `--dourado` a 10%, borda tracejada e o texto em versalete
— texto e borda em `--mata`, não em `--dourado`, para manter contraste WCAG AA (ver regra de
contraste na seção 4). Tem que ser impossível confundir com conteúdo pronto, inclusive numa
apresentação.

Para fotos que ainda não existem (a maioria do pacote de design de 2026-08-13 usa placeholders
de imagem), use `<PendenteFoto legenda="..." />` (`components/pendente-foto.tsx`) — mesma
lógica do `Pendente`, dimensionado para preencher o espaço da foto na composição.

---

## 7. Stack

- Next.js (App Router) + TypeScript
- Tailwind v4
- `d3-geo` + `topojson-client` para a geometria real do mapa (ver seção 4)
- Conteúdo em JSON no próprio repo — sem CMS
- Formulário: route handler em `/app/api/consultoria/route.ts`, envio via Resend
- Deploy: Vercel, preview por branch
- Sem banco de dados

Estrutura (atualizada 2026-08-13):

```
app/
  page.tsx                        home
  unidades/page.tsx               + unidades-lista.tsx (filtro por UF + mapa sincronizado)
  consultoria/page.tsx            + consultoria-form.tsx (formulário real, POST ao route handler)
  institucional/page.tsx          história, linha do tempo, valores, trabalhe conosco
  contato/, trabalhe-conosco/     rotas vazias — fora do escopo, ver seção 1
  api/consultoria/route.ts
components/
  cabecalho.tsx                   header + barra de topo (home) + mega-menu + hambúrguer mobile
  rodape.tsx                      footer de 4 colunas
  mapa-cobertura/
    mapa.tsx                      mapa real (d3-geo + topojson), controlado por props
    busca-cobertura.tsx           busca + mapa + card de resultado (herói da home)
    trilha-unidades.tsx           grade de unidades + mapa secundário, sincronizados por hover
    temas.ts                      3 paletas cartográficas (mata/osso/ousado)
  culturas-hover.tsx              painéis que crescem no hover (seção "culturas")
  contador.tsx                    contador animado com IntersectionObserver + trava de segurança
  revela.tsx                      revelação por scroll (fade + translateY)
  pendente.tsx                    texto pendente
  pendente-foto.tsx               placeholder de foto pendente
  barra-fixa-mobile.tsx           barra inferior fixa (WhatsApp/Unidades) — só na home mobile
content/
  unidades.json                   as nove unidades, com lat/lng
  linhas.json                     as sete linhas de produto
  culturas.json                   as cinco culturas/criações + linhas atendidas (mega-menu, hover)
  municipios.json                 municípios usados na busca do mapa de cobertura
public/logo/                      logo oficial extraída de brand-source/SEMEAR-LOGO-APROVADO.pdf
                                   (semear-color.svg para fundo claro, semear-branco.svg para --mata)
public/mapa/countries-110m.json   TopoJSON do world-atlas@2.0.2, vendorizado (não busca de CDN)
```

---

## 8. O formulário é o produto

Metade do objetivo do site é gerar contato qualificado. Um "fale conosco" com nome, e-mail e
mensagem não serve — o representante precisa saber do que se trata antes de ligar.

**Atualizado (2026-08-13) a partir do pacote de design — campos e formato mudaram:**

Campos:

- Nome e WhatsApp (obrigatórios; validação: nome com mais de 2 caracteres e telefone com
  pelo menos 10 dígitos)
- Município — texto livre
- Área em hectares — texto livre (`Ex.: 40`); a versão anterior deste documento pedia faixas
  em vez de campo numérico livre, o pacote de design substituiu por texto livre
- Cultura ou criação — grupo de botões: cana, citros, pastagem/pecuária, coco, fruticultura

Removidos em relação à hipótese original: época prevista de manejo, observação livre. Não
estavam no pacote de design; reavaliar com o comercial se fizerem falta.

**Formato:** o pacote de design mudou de wizard em etapas ("uma coisa por tela") para
formulário de tela única com todos os campos visíveis — é o que está implementado. O botão
diz "Quero falar com um consultor" e fica desabilitado (opacidade reduzida) até nome e
WhatsApp serem válidos. Envio real acontece via POST para `/app/api/consultoria/route.ts`
(Resend) — isso é código de produção, diferente do protótipo estático de referência, que só
simulava o envio em estado local.

Confirme com o Guilherme quais campos o comercial realmente usa antes de fechar isso de vez.

---

## 9. Qualidade mínima

- Mobile-first de verdade; testar em viewport de 360px
- **Nunca** usar `maximum-scale` ou `user-scalable=no` — o site atual bloqueia zoom e isso é
  falha de acessibilidade
- Contraste WCAG AA
- Foco de teclado visível
- LCP abaixo de 2,5s em 4G — o público está em conexão ruim
- `next/image` em tudo; nenhuma imagem acima de 200KB
- `<title>` e meta description por página, específicos. O site atual tem só "Semear"
- Open Graph com imagem 1200×630 real — o WhatsApp é o principal canal da empresa
