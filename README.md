# Site do Atletismo-UEM

Guia rápido para quem vai manter este site — pensado para bolsistas/voluntários **sem experiência avançada em programação**. Se você só precisa atualizar o ranking, os atletas ou os números de impacto, leia a seção **"Editando o conteúdo"** abaixo — não é necessário entender o resto.

## O que tem em cada pasta

- **`/data`** — as informações que aparecem no site: ranking (`ranking.json`), atletas atuais (`atletas.json`), números de impacto (`impacto.json`), resultados de competições (`resultados.json`), fotos da galeria (`galeria.json`), equipe técnica (`equipe-tecnica.json`) e parceiros (`parceiros.json`). **É aqui que você mexe no dia a dia.**
- **`/content`** — textos institucionais mais longos (Sobre o Projeto, apresentação da Home, introdução do Contato), em Markdown.
- **`/content/noticias`** — as notícias do site, **um arquivo Markdown por notícia**. Aparecem em `/noticias` e nas "Últimas notícias" da Home.
- **`/public`** — imagens do site: logos em `/public/logos`, fotos de atletas em `/public/atletas`, fotos da galeria em `/public/galeria`.
- **`/app`** e **`/components`** — o código do site. **Não edite estas pastas se você não souber programar** — um erro aqui pode quebrar o site inteiro.
- **`/scripts`** — scripts pontuais já usados uma vez (migração da planilha de ranking, otimização dos logos). Não fazem parte do fluxo normal de atualização.

## Editando o conteúdo

### Como adicionar/editar um atleta (`data/atletas.json`)

Abra o arquivo, encontre um bloco entre `{` e `}` (isso é um atleta) e edite os campos. Exemplo de um bloco **válido**:

```json
{
  "slug": "joao-silva",
  "nome": "João Silva",
  "foto": "/atletas/joao-silva.jpg",
  "provas": ["100 metros", "200 metros"],
  "melhorMarca": "10.97",
  "bioCurta": "Estudante de Educação Física, na equipe desde 2024.",
  "bioCompleta": "Texto mais completo sobre o atleta, conquistas, histórico...",
  "redesSociais": { "instagram": "https://instagram.com/joaosilva" }
}
```

- `slug` é o endereço da página do atleta (`/atletismo-universitario/atletas/joao-silva`) — use só letras minúsculas, números e hífen, sem espaço ou acento.
- `foto` é o caminho da imagem dentro de `/public/atletas` (a foto real precisa estar lá, ver "Adicionando fotos" abaixo).
- Se não tiver Instagram, deixe `"redesSociais": {}`.

Erros comuns que **quebram o site** (evite):

```json
{
  "slug": "joao-silva",
  "nome": "João Silva",     // ❌ vírgula sobrando não pode ter comentário
  "provas": ["100 metros" "200 metros"]   // ❌ faltou vírgula entre os itens
}
```

Antes de salvar, cole o conteúdo do arquivo em [jsonlint.com](https://jsonlint.com) para conferir se está um JSON válido.

### Como editar uma marca do ranking (`data/ranking.json`)

O arquivo é uma lista de seções (uma por prova + naipe). Dentro de cada seção, `marcas` é a lista de posições:

```json
{
  "posicao": 1,
  "atleta": "Nome do Atleta",
  "marca": "10.97",
  "data": "2025-04-12",
  "competicao": "Campeonato Universitário"
}
```

- `marca` é sempre texto (entre aspas), mesmo quando parece um número — provas de tempo (`5.56.88`) e de distância (`10.97`) têm formatos diferentes.
- `data` e `competicao` podem ficar como `null` (sem aspas) se você não tiver essa informação ainda — o site não vai mostrar "null" na tela, só deixa em branco.

### Números de impacto (`data/impacto.json`)

Substitua os valores `null` pelos números reais quando a coordenação definir (ex: `"alunosAtendidos": 120`). Enquanto for `null`, o site mostra "—" no lugar do número.

### Como adicionar uma notícia (`content/noticias/`)

Crie um arquivo novo em `content/noticias/`, com nome curto e sem espaço/acento (ex: `selecao-2026.md` — esse nome vira o endereço `/noticias/selecao-2026`). Comece com um bloco de metadados entre `---` e depois o texto da notícia em Markdown:

```md
---
titulo: "Título da notícia"
data: "2026-09-10"
resumo: "Um ou dois parágrafos curtos que aparecem no card da listagem e da Home."
capa: "/galeria/foto-do-evento.jpg"
capaAlt: "Descrição da foto para quem usa leitor de tela"
---

Primeiro parágrafo da notícia.

## Um subtítulo, se precisar

Mais texto. Pode usar **negrito**, listas com `- item` e parágrafos normais.
```

- `data` é sempre `"AAAA-MM-DD"` (entre aspas) — define a ordem das notícias (mais recente primeiro) e a data mostrada na página. Se ainda não tiver uma data definida, deixe `data: null` (sem aspas).
- `capa` e `capaAlt` são opcionais — se não tiver uma foto ainda, apague as duas linhas (ou deixe `capa: null`) que a notícia aparece só com texto. Quando tiver a foto, coloque o arquivo em `/public/galeria` (ou outra pasta de imagens) e aponte `capa` para esse caminho.
- Não é preciso registrar a notícia em nenhum outro lugar do site — qualquer arquivo `.md` dentro de `content/noticias` aparece automaticamente em `/noticias`.
- Se alguém da coordenação mandar o texto em `.docx`, salve uma cópia do arquivo original em `/Noticias` (fora de `/content`) só como referência/arquivo-fonte, e transcreva o conteúdo para um `.md` novo em `content/noticias` seguindo o formato acima — o site nunca lê `.docx` diretamente.

### Adicionando fotos

1. Coloque o arquivo de imagem em `/public/atletas` (foto de atleta) ou `/public/galeria` (foto da galeria). Prefira `.jpg` ou `.png`, largura de até ~1200px (fotos maiores deixam o site mais lento).
2. No `data/atletas.json` ou `data/galeria.json`, aponte o campo `foto`/`src` para `/atletas/nome-do-arquivo.jpg` ou `/galeria/nome-do-arquivo.jpg`.

## Rodando o site no seu computador antes de publicar

Pré-requisito: [Node.js](https://nodejs.org) instalado (versão LTS).

```bash
npm install       # só na primeira vez, ou quando dependências mudarem
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e confira se sua alteração aparece certa antes de subir para o repositório.

## Como a publicação funciona

O site é publicado automaticamente pela Vercel a cada `push`/merge na branch principal (`main`) — **não existe um botão de "publicar"**, nem login de administrador. Editar um arquivo `.json` pelo próprio site do GitHub e confirmar ("commit") já dispara uma nova publicação sozinha, em poucos minutos.

### Configuração dos formulários (Formspree)

O formulário de Contato e o de agendamento do "Escola na Pista" usam o [Formspree](https://formspree.io) para enviar e-mails, sem precisar de servidor próprio. São dois formulários separados no Formspree (para não misturar os assuntos na mesma caixa), cada um com sua variável de ambiente:

- `NEXT_PUBLIC_FORMSPREE_ID` → formulário de Contato.
- `NEXT_PUBLIC_FORMSPREE_ESCOLA_ID` → formulário de agendamento de visitas do "Escola na Pista".

1. Crie uma conta gratuita em formspree.io e um formulário novo para cada uso acima.
2. Copie o ID de cada formulário (algo como `xreqwabc`).
3. No painel do projeto na Vercel, em Settings → Environment Variables, crie as duas variáveis com esses valores, e refaça o deploy.
4. Para testar localmente, copie `.env.local.example` para `.env.local` e preencha os mesmos valores.

## O que NÃO editar sem saber programar

- Qualquer arquivo dentro de `/app`, `/components` ou `/lib`.
- `next.config.ts`, `package.json`, `tsconfig.json`.

Se precisar de uma mudança nessas pastas (nova página, novo layout, etc.), procure alguém com experiência em programação ou peça ajuda a quem construiu o site.
