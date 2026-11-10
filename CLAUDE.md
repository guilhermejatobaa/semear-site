# Semear Agronegócios — site institucional

Brief do projeto. Leia antes de escrever qualquer código.

**Atualização (2026-11-10) — fotos do marketing e preparação para o lançamento:** o marketing
entregou as fotos (pasta do Drive, originais fora do repo). Decisões do Guilherme nesta rodada:

- Fotos reais entraram no lugar dos `<PendenteFoto>` da home, `/institucional`, `/consultoria`
  e `/trabalhe-conosco`, pelo componente `components/foto.tsx` (`next/image`, arquivos em
  `public/fotos/`, todos abaixo de 200 KB). Autorização de imagem dos colaboradores: o
  marketing já tem.
- **Imagem de banco é aceita para foto de lavoura** (cana, citros, hortaliças e frutas). A
  regra da seção 6 continua valendo para gente: nada de banco posando como equipe.
- **Culturas agora são cinco:** cana, milho, citros, pastagem e pecuária, e **hortaliças e
  frutas (HFF)**, que substituiu coco e fruticultura (`content/culturas.json`, formulário e
  texto da institucional).
- **Parceiros agora são sete:** a Dekalb entrou. Logos em `public/parceiros/`, todos sobre
  fundo branco; o da Biogénesis teve as letras recoloridas de branco para preto.
- **Valores oficiais da Semear, nesta ordem:** fidelidade a Deus, conduta ética, respeito às
  pessoas, centralidade no cliente, solidez financeira. Estão em `/trabalhe-conosco`, junto do
  texto de cultura (prioridade aos funcionários). A `/institucional` ainda lista três valores
  antigos, a alinhar.
- A `/consultoria` ficou sem fotos, a pedido do Guilherme.
- Não veio foto de estoque: o quadro "Estoque" da institucional usa um colaborador diante das
  prateleiras da loja. Fotos de depoimento seguem pendentes.

- **O formulário de consultoria entrega no WhatsApp comercial** (+55 82 3328-1831): monta a
  mensagem com os campos e abre a conversa já escrita. Isso supera a seção 8 (envio via
  Resend); o route handler `/api/consultoria` ficou sem uso.
- **Horário das unidades:** segunda a sexta, das 7h30 às 17h20, igual para todas
  (`/unidades`).

Onde as seções abaixo ainda falam em seis culturas, seis parceiros ou logos pendentes, vale
esta nota.

**Atualização (2026-09-23) — conferência com o banco do Siagri:** o conteúdo do site foi
conferido contra o ERP (lojas, linhas e culturas que de fato vendem), a partir do BI de vendas
em `~/Desktop/bi-semear`. O Guilherme aprovou as mudanças abaixo, marcadas nas seções 2, 4, 7
e 8 com a etiqueta *(banco 2026-09-23)*:

- Imperatriz abre em **12/2015** (data de fundação no cadastro de empresas), não em 2017.
- **Milho** entrou nas culturas: 19% do faturamento de 2025 e 23% de 2026. É a segunda cultura
  em venda, atrás da cana.
- **Quatro linhas novas:** biológicos, nutrição animal, reprodução e manejo animal, e o serviço
  de aplicação por drone. O contador de linhas de insumo passou a ser calculado do
  `content/linhas.json` e mostra **10** (o drone é serviço e fica fora da contagem).
- A **Cultivar**, segunda bandeira da empresa, passou a ser citada na `/institucional`.

Os fatos de banco vêm de documentos fora deste repo: `~/Downloads/contexto-vendas.md` e a
seção 10 de `~/Downloads/contexto-banco-semear.md`.

**Atualização (2026-09-14) — devolutiva do marketing:** o marketing entregou a
`DEVOLUTIVA MARKETING.pdf` com pedidos de estrutura, conteúdo e funcionalidade. Foi
implementada integralmente. Os pontos em que ela **supera** este documento estão marcados
nas seções 1, 2, 4, 5, 6 e 7 com a etiqueta *(devolutiva 2026-09-14)*. Três decisões foram
tomadas pelo Guilherme em cima de conflitos com este brief:
`/unidades` fica (a devolutiva sugeria avaliar remoção); o Instagram usa embed oficial,
não link estático; e "Credenciais" foi substituído por "Parceiros estratégicos", o que
removeu o selo do CRMV-AL do site.

Na mesma rodada o Guilherme corrigiu um erro que estava no ar desde o começo: **a Semear
atende os nove estados do Nordeste**, não sete — sete é a contagem de lojas físicas. Ver
seções 2 e 4.

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
- Página `/contato` — deixe como rota vazia
- ~~`/trabalhe-conosco` como rota vazia~~ — **(devolutiva 2026-09-14)** entrou no escopo: a
  devolutiva deu o destino real dos currículos (`curriculos@semear-br.com`), que era a
  condição registrada aqui para a página sair do limbo. O bloco "Trabalhe conosco" saiu da
  `/institucional` por pedido do item 2.8 e agora vive só nessa página
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
Marcos Pacheco.

**Cobertura e lojas são números diferentes — não confunda os dois (corrigido 2026-09-14):**

- **Atende os nove estados do Nordeste**, ou seja, a região inteira. Confirmado pelo
  Guilherme. É o número que o site comunica como cobertura.
- **Tem loja própria em sete deles**: AL, SE, PE, CE, RN, MA, BA. Piauí e Paraíba são
  atendidos pela consultoria, sem unidade física.

Use "sete estados" só quando a frase for literalmente sobre lojas. A versão original deste
documento dizia "seis estados" (contagem errada, corrigida em 2026-08-13) e depois "sete
estados" como se fosse cobertura — era a contagem de lojas ocupando o lugar da cobertura.
Ver seção 4 para o efeito disso no mapa e na faixa de números.

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
medicamentos veterinários, ferramentas e utensílios, biológicos, nutrição animal, reprodução e
manejo animal, e o serviço de aplicação por drone. *(banco 2026-09-23)* As quatro últimas
entraram porque vendem de verdade: no banco elas são os grupos Biológicos (bioativadores,
inoculantes, biodefensivos), Nutrição Animal (sal mineral e rações), Pecuária (hormônios de
reprodução, brincos, aplicadores) e Serviços. Os defensivos, que o site divide em herbicidas,
fungicidas e inseticidas, são 71% do faturamento de 2025.

**Culturas e criações relevantes:** cana, milho, citros, pastagem e pecuária, coco,
fruticultura. *(banco 2026-09-23)* Participação no faturamento de 2025: cana 49%, milho 19%,
pastagem 18%, citros 2,7%, coco 0,3%. O milho se concentra em Itabaiana e Arapiraca.

**Cultivar — a segunda bandeira (banco 2026-09-23).** A empresa opera duas bandeiras,
Semear e Cultivar. A primeira loja Cultivar abriu em 2010 em Itabaiana/SE, e hoje há loja
Cultivar cadastrada nas nove cidades das unidades; em seis delas, no mesmo endereço da Semear
ou ao lado. A Cultivar foi 22% do faturamento de 01/2025 a 09/2026. As nove unidades do site
são as lojas Semear. A `/institucional` cita a Cultivar em um parágrafo da história; o resto
do site continua falando só da Semear.

A frase da `/institucional` diz "ao lado de várias unidades Semear", e não "em todas as
cidades", de propósito: as lojas Cultivar de Rio Real, Paripiranga e Limoeiro não emitem nota
de venda desde maio/junho de 2026. Confirmar com o Guilherme se fecharam antes de afirmar mais.

**Dados de unidade conferidos no banco (banco 2026-09-23).** As datas de abertura batem com o
cadastro de empresas (`CADEMP`), exceto Imperatriz, corrigida para 12/2015. Duas diferenças
seguem abertas: o banco registra Mossoró como "S/N" (o site usa o nº 1021), e o banco não tem
o telefone de Paripiranga (só o da matriz), então a pendência continua.

**Credenciais reais:** selo de excelência do CRMV-AL; parceria com Bayer; presença em
Citros Show e Expoimp.

**(devolutiva 2026-09-14) — o site não mostra mais as credenciais.** O item 2.7 mandou
substituir o bloco "Credenciais" por "Parceiros estratégicos", e o Guilherme optou por
cumprir ao pé da letra. O selo do CRMV-AL continua sendo um fato real da empresa, mas saiu
da home e da institucional. Parceiros exibidos: Bayer, UPL, Nortox, Biogénesis, Germisul,
Belgo (`content/parceiros.json`) — em grade estática, nunca carrossel (seção 5).

**(devolutiva 2026-09-14) — datas de abertura e telefone por unidade.** Vieram no item 2.3 e
vivem em `content/unidades.json` (`abertura`, `aberturaAno`, `telefone`). A linha do tempo da
`/institucional` é derivada desses dados, não escrita à mão. Paripiranga (2023) ainda não tem
telefone definido — o campo é `null` e a interface marca como pendente. Os números são quase
todos fixos, então os links são `tel:`, não `wa.me`: um `wa.me` sobre número fixo abre uma
conversa que não existe.

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

**Atualizado (2026-08-17):** a busca por município cobre os 1.794 municípios dos 9 estados
do Nordeste (AL, BA, CE, MA, PB, PE, PI, RN, SE) — não só os ~44 municípios-sede das nove
unidades, que era a lista anterior. Faz sentido mesmo fora dos sete estados com unidade
física: `unidadeMaisProxima()` (`lib/distancia.ts`) sempre responde com a unidade mais perto
em linha reta, então um produtor no Piauí ou na Paraíba ainda recebe uma unidade e um
WhatsApp válidos. Dados de `kelvins/municipios-brasileiros` (IBGE), filtrados para os 9
códigos de UF do Nordeste. Servidos de `public/mapa/municipios-nordeste.json` e buscados em
runtime (mesmo padrão do `countries-110m.json`) para não engordar o bundle JS da home — ver
`components/mapa-cobertura/busca-cobertura.tsx`.

**Estados delimitados (devolutiva 2026-09-14, item 1.1):** o mapa agora desenha os
contornos das UFs, não só o do país. Geometria das malhas do IBGE
(`servicodados.ibge.gov.br/api/v3/malhas`, qualidade intermediária), filtrada para as 9 UFs
do Nordeste e vendorizada em `public/mapa/ufs-nordeste.json` (65 KB, buscada em runtime como
o `countries-110m.json`).

> **Armadilha, se for regerar esse arquivo:** o d3-geo usa a convenção de enrolamento
> **oposta** à da RFC 7946 — anel exterior **horário**, buracos anti-horário. O IBGE entrega
> no sentido do GeoJSON (anti-horário). Com o sentido do IBGE, o d3 desenha o *complemento*
> de cada polígono e pinta a tela inteira, deixando só um estado visível como buraco. O
> script de geração rebobina os 16 anéis exteriores. O TopoJSON do world-atlas já vem na
> convenção do d3, e é por isso que o mapa de países nunca teve esse problema.

**A Semear atende os nove estados do Nordeste (2026-09-14).** Confirmado pelo Guilherme, e
é a correção mais importante desta rodada: a contagem de **sete** estados sempre foi sobre
**lojas físicas**, nunca sobre cobertura. PI e PB não têm unidade, mas são atendidos pela
consultoria como qualquer outro estado — o que, aliás, o `unidadeMaisProxima()`
(`lib/distancia.ts`) já fazia desde 2026-08-17.

Consequências no código, todas deliberadas:

- O mapa preenche as nove UFs com **o mesmo tom** (`atuacao`). Uma versão intermediária
  chegou a pintar PI e PB num tom mais apagado; foi descartada porque sugeria cobertura
  parcial. O que distingue os estados são os pontos das unidades, não a cor.
- O Nordeste tem exatamente nove estados, então atender os nove é atender a região inteira —
  daí "todo o Nordeste atendido" na barra de topo e no Open Graph, que é uma afirmação mais
  forte e igualmente verificável.
- O contador da home é **9 estados atendidos**, não 7. A faixa passou a ser
  9 unidades · 9 estados · 7 linhas · 19 anos. *(banco 2026-09-23)* Agora 9 · 9 · 10 · 19: o
  contador de linhas é calculado de `content/linhas.json`, sem os serviços.
- Onde o texto fala de **loja**, "sete estados" continua correto e foi mantido
  (`/unidades`, parágrafo de história da institucional).

**Seleção no mapa (2026-08-17):** o círculo invisível de clique de cada ponto tinha
`tabIndex` sem `outline` customizado, então o navegador desenhava o anel de foco padrão (um
quadrado azul) ao redor do ponto sempre que ele era selecionado — não só na navegação por
teclado. Removido (`outline-none` + `focus-visible:outline-cana`, que só aparece para
navegação real por teclado). A indicação de "unidade selecionada" agora é só o ponto ficando
maior, laranja (`--dourado`) e piscando (`@keyframes mapa-pisca`, respeitando
`prefers-reduced-motion` como as demais animações do mapa).

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
faixa de números (9 unidades · 9 estados · 10 linhas · 19 anos) com rampa `easeOutCubic` ao
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
  9/9/10/19 são reais e verificáveis, o anti-padrão é a métrica chutada, não a animação
- Texto de marketing vazio: "soluções inovadoras", "excelência", "compromisso com o campo"
- Carrossel de logos de parceiros rolando infinitamente — **a seção de parceiros existe**
  desde a devolutiva 2026-09-14 (`components/parceiros.tsx`), mas em grade estática; o
  proibido continua sendo o carrossel
- Chat bubble flutuante no canto **além** do botão de WhatsApp — o botão de WhatsApp em si é
  o caso aceito, e desde a devolutiva 2026-09-14 ele existe (`components/botao-whatsapp.tsx`,
  item 2.1). É o único elemento flutuante do site. Na home em telas pequenas ele some, porque
  a `BarraFixaMobile` já ocupa a borda inferior com um botão de WhatsApp
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

**(devolutiva 2026-09-14) — o que ainda está pendente e por quê.** A devolutiva pediu várias
seções cujo conteúdo real não veio junto. Todas foram construídas com a estrutura pronta e o
conteúdo marcado, nunca preenchido por invenção:

| O que falta | Onde | Formato de entrega |
|---|---|---|
| Depoimentos de clientes | `content/depoimentos.json` (vazio) | nome, município, cultura, texto, foto |
| Perfis das redes sociais | `content/externos.json` | URLs de Instagram, Facebook, LinkedIn, YouTube |
| Posts do Instagram | `content/externos.json` → `instagramPosts` | permalinks (o embed oficial da Meta é por post; embed de perfil foi descontinuado) |
| Vídeo institucional | `content/externos.json` → `videoInstitucionalId` | ID do vídeo no YouTube |
| Logos dos parceiros | `public/` | 6 logos em SVG ou PNG com fundo transparente |
| Missão e visão | `app/institucional/page.tsx` | texto oficial dos sócios |
| Política de privacidade | `app/privacidade/page.tsx` | documento jurídico — não redigir a partir de modelo genérico |
| Telefone de Paripiranga | `content/unidades.json` | a devolutiva registra "ainda não definido" |

Nota sobre o texto do item 6.2 (aviso de defensivos, no rodapé): o parêntese final do PDF
("é uma obrigação legal estar em dia com INPEV, mas também é uma boa prática que podemos
evidenciar") é nota interna ao documento, não copy — não foi publicado.

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
  institucional/page.tsx          história, linha do tempo real, missão/visão/valores,
                                  vídeo institucional, parceiros, Instagram
  privacidade/page.tsx            política de privacidade (devolutiva 5) — texto pendente
  trabalhe-conosco/page.tsx       vagas e envio de currículo (devolutiva 2.8)
  contato/                        rota vazia — fora do escopo, ver seção 1
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
  botao-whatsapp.tsx              botão flutuante de WhatsApp (devolutiva 2.1)
  parceiros.tsx                   grade estática de parceiros (devolutiva 2.7)
  depoimentos.tsx                 "Quem compra da Semear" (devolutiva 1.2)
  instagram.tsx                   embed oficial, carregado por IntersectionObserver (2.5)
  video-institucional.tsx         YouTube por fachada, iframe só após o clique (2.9)
  redes-sociais.tsx               ícones do rodapé (devolutiva 6.1)
content/
  unidades.json                        as nove unidades, com lat/lng, abertura e telefone
  parceiros.json                       os seis parceiros estratégicos (devolutiva 2.7)
  depoimentos.json                     depoimentos de clientes — vazio, a coletar (devolutiva 1.2)
  externos.json                        links de terceiros (redes, Instagram, YouTube) e e-mail de currículos
  linhas.json                          as linhas de produto: dez de insumo + aplicação por drone
                                        (`"servico": true`, fora do contador da home)
  culturas.json                        as seis culturas/criações + linhas atendidas (mega-menu, hover)
public/logo/                           logo oficial extraída de brand-source/SEMEAR-LOGO-APROVADO.pdf
                                        (semear-color.svg para fundo claro, semear-branco.svg para --mata)
public/mapa/countries-110m.json        TopoJSON do world-atlas@2.0.2, vendorizado (não busca de CDN)
public/mapa/municipios-nordeste.json   os 1.794 municípios dos 9 estados do Nordeste, buscado
                                        em runtime pela busca de cobertura (ver seção 4)
public/mapa/ufs-nordeste.json          malhas de UF do IBGE, 9 estados, rebobinadas para a
                                        convenção do d3-geo (ver seção 4)
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
- Cultura ou criação — grupo de botões: cana, milho, citros, pastagem/pecuária, coco,
  fruticultura (milho incluído em 2026-09-23)

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

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
