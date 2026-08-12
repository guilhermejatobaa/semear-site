# Semear Agronegócios — site institucional

Brief do projeto. Leia antes de escrever qualquer código.

---

## 1. O que estamos construindo

Um MVP do novo site institucional da Semear, para apresentar à equipe de marketing.
Não é o site final: é a prova de que a direção funciona.

**Escopo do MVP — apenas isto:**

- Home completa
- Página `/unidades` completa
- Formulário de consultoria funcionando ponta a ponta
- Deploy em preview na Vercel, com URL aberta no celular

**Fora do escopo (não implemente, mesmo que pareça natural):**

- CMS, painel administrativo, autenticação
- Catálogo de produtos com página por SKU
- Blog, e-commerce, carrinho
- Páginas `/institucional`, `/contato`, `/trabalhe-conosco` — deixe como rota vazia
- Configuração de domínio ou DNS

Se uma feature não cabe nas quatro linhas acima, ela não entra. O MVP tem que ficar pronto
rápido e ser navegável no celular numa reunião.

---

## 2. A empresa

Distribuidora de insumos agropecuários, fundada em 2007 em Maceió/AL por Hélio Jatobá e
Marcos Pacheco. Nove unidades em seis estados do Nordeste.

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

1. **Tem gente perto dele.** Nove unidades, seis estados.
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

No MVP, o mapa pode ser um SVG do Nordeste com os pontos posicionados manualmente e uma
busca por município que consulta um JSON local. Não integre Google Maps API.

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
--mata        #0B3D24   verde bem escuro — fundo das seções densas e texto padrão
--osso        #F3F8EC   off-white com leve viés verde — fundo padrão
--dourado     #F9A70D   o sol da logo — acento quente, usado sobre fundo escuro/mata
--grafite     #42513F   texto secundário
```

Fundo padrão claro. Seções escuras em `--mata` marcam mudança de assunto, não decoração.

**Regra de contraste:** `--cana` e `--dourado` são claros (luminância alta) — funcionam bem
como preenchimento sobre `--mata` (fundo escuro) ou como fundo de botão com texto `--mata`
em cima. Não usar como cor de texto nem borda fina sobre `--osso`/branco — o contraste fica
abaixo de WCAG AA (~1.9:1). Testado com a fórmula de contraste relativo do WCAG; ver commit
que introduziu esta paleta para os pares verificados.

### Tipografia

- **Display:** uma grotesca condensada com peso — sugestão: Archivo Condensed ou
  Roboto Condensed em 700. Números grandes ficam legíveis e o conjunto tem cara de
  sinalização de estrada, não de startup.
- **Corpo:** Inter ou Source Sans 3, 17px mínimo. O público lê no celular, ao sol.
- **Dados e rótulos:** a mesma família do corpo, em versalete espaçado. Nada de monoespaçada
  — aqui ela seria pose técnica sem função.

### Movimento

Discreto e com propósito. Entrada dos pontos do mapa em sequência; revelação por scroll nas
seções de unidade. Nada de parallax, nada de contador animado, nada de fade em tudo.
`prefers-reduced-motion` respeitado.

---

## 5. Anti-padrões — não faça

- Hero com foto de drone sobre lavoura e headline sobreposta
- Gradiente verde-para-verde em qualquer lugar
- Ícones genéricos de folhinha, trator e engrenagem
- Cards com borda arredondada, sombra suave e ícone circular no topo, repetidos em grade
- Seção de "números" com contador animado (3.000+ clientes etc.)
- Texto de marketing vazio: "soluções inovadoras", "excelência", "compromisso com o campo"
- Carrossel de logos de parceiros rolando infinitamente
- Chat bubble flutuante no canto além do botão de WhatsApp
- Cookie banner que cobre metade da tela
- Estética "AI genérica": cream + serifada alta + acento terracota; preto + verde ácido;
  layout de jornal com filetes e zero border-radius

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

O componente `Pendente` tem fundo `--ferrugem` a 10%, borda tracejada e o texto em versalete.
Tem que ser impossível confundir com conteúdo pronto, inclusive numa apresentação.

---

## 7. Stack

- Next.js (App Router) + TypeScript
- Tailwind
- Conteúdo em MDX e JSON no próprio repo — sem CMS
- Formulário: route handler em `/app/api/consultoria/route.ts`, envio via Resend
- Deploy: Vercel, preview por branch
- Sem banco de dados

Estrutura:

```
app/
  page.tsx                 home
  unidades/page.tsx
  api/consultoria/route.ts
components/
  mapa-cobertura/          elemento assinatura
  pendente.tsx
content/
  unidades.json            as nove unidades, com lat/lng e municípios atendidos
  linhas.json              as sete linhas de produto
public/logo/               logo oficial extraída de brand-source/SEMEAR-LOGO-APROVADO.pdf
                            (semear-color.svg para fundo claro, semear-branco.svg para --mata)
```

---

## 8. O formulário é o produto

Metade do objetivo do site é gerar contato qualificado. Um "fale conosco" com nome, e-mail e
mensagem não serve — o representante precisa saber do que se trata antes de ligar.

Campos:

- Nome e WhatsApp (obrigatórios; só esses dois)
- Município — dispara a sugestão da unidade mais próxima
- Cultura ou criação — cana, citros, pastagem/pecuária, coco, fruticultura, outra
- Área aproximada em hectares — faixas, não campo numérico livre
- Época prevista de plantio ou manejo
- Observação livre, opcional

Uma coisa por tela no mobile. O botão diz "Falar com um consultor" e o e-mail que chega diz a
mesma coisa. Erro de validação explica o que fazer, não pede desculpa.

Confirme com o Guilherme quais campos o comercial realmente usa antes de fechar isso — a
lista acima é hipótese, não requisito.

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
