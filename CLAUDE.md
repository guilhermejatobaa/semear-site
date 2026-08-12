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

Nada de verde corporativo de agro. A referência é o material da região, não o estoque.

```
--cana        #7A9A3B   verde-cana, mais amarelado e específico que verde agro
--massape     #2C2620   solo escuro do tabuleiro — fundo das seções densas
--osso        #F4F1E8   off-white de papel de receituário — fundo padrão
--ferrugem    #B4521E   acento, usado só em ação e destaque de dado
--grafite     #4A4A44   texto secundário
```

Fundo padrão claro. Seções escuras em `--massape` marcam mudança de assunto, não decoração.

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
