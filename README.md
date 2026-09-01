# Site do Atletismo-UEM

Guia rápido para quem vai manter este site — pensado para bolsistas/voluntários **sem experiência avançada em programação**. Se você só precisa atualizar o ranking, os atletas ou os números de impacto, leia a seção **"Editando o conteúdo"** abaixo — não é necessário entender o resto.

## O que tem em cada pasta

- **`/data`** — as informações que aparecem no site: ranking (`ranking.json`), atletas atuais (`atletas.json`), números de impacto (`impacto.json`), resultados de competições (`resultados.json`), fotos da galeria (`galeria.json`), equipe técnica (`equipe-tecnica.json`) e parceiros (`parceiros.json`). **É aqui que você mexe no dia a dia.**
- **`/content`** — textos institucionais mais longos (Sobre o Projeto, apresentação da Home, introdução do Contato), em Markdown.
- **`/content/noticias`** — as notícias do site, **um arquivo Markdown por notícia**. Aparecem em `/noticias` e nas "Últimas notícias" da Home.
- **`/public`** — imagens do site: logos em `/public/logos`, fotos de atletas em `/public/atletas`, fotos da galeria em `/public/galeria`.
- **`/materiais-origem`** — arquivos brutos recebidos (`.docx` de biografias e notícias, fotos originais não otimizadas, PDFs de artigos, planilhas). **Nada aqui é lido pelo site** — é só o material de referência antes de virar conteúdo de verdade em `/data`, `/content` ou `/public`. Veja o [`README.md`](materiais-origem/README.md) dessa pasta para saber onde guardar cada tipo de arquivo.
- **`/app`** e **`/components`** — o código do site. **Não edite estas pastas se você não souber programar** — um erro aqui pode quebrar o site inteiro.
- **`/scripts`** — scripts pontuais já usados uma vez (migração da planilha de ranking, otimização dos logos). Não fazem parte do fluxo normal de atualização.

## Editando o conteúdo

### Como adicionar/editar um atleta (`data/atletas.json`)

Se você recebeu o `.docx` com a biografia e a foto do atleta, salve uma cópia em `materiais-origem/atletas/nome-do-atleta/` antes de começar (veja o [README dessa pasta](materiais-origem/README.md)) — isso é só o arquivo-fonte, o site não lê de lá.

Depois, abra `data/atletas.json`, encontre um bloco entre `{` e `}` (isso é um atleta) e edite os campos. Exemplo de um bloco **válido**:

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

O número de "Atletas na equipe" **não fica nesse arquivo** — é contado automaticamente a partir de quantos atletas existem em `data/atletas.json`. Ou seja: não precisa atualizar nada à parte quando adicionar ou remover um atleta em "Atletas Atuais", o número na Home já reflete isso sozinho.

### Como adicionar uma notícia (`content/noticias/<slug>/`)

Cada notícia é uma **pasta**, não um arquivo solto — assim o texto e as fotos dela ficam juntos e organizados. O nome da pasta (o `slug`) precisa ser curto e sem espaço/acento (ex: `selecao-2026` — vira o endereço `/noticias/selecao-2026`) e **precisa ser igual nos dois lugares abaixo**:

1. **`content/noticias/<slug>/index.md`** — o texto da notícia. Comece com um bloco de metadados entre `---` e depois o texto em Markdown:

   ```md
   ---
   titulo: "Título da notícia"
   data: "2026-09-10"
   resumo: "Um ou dois parágrafos curtos que aparecem no card da listagem e da Home."
   capa: "/noticias/selecao-2026/capa.jpg"
   capaAlt: "Descrição da foto para quem usa leitor de tela"
   ---

   Primeiro parágrafo da notícia.

   ## Um subtítulo, se precisar

   Mais texto. Pode usar **negrito**, listas com `- item` e parágrafos normais.

   Para colocar mais fotos no meio do texto (além da capa), use `![Descrição da foto](/noticias/selecao-2026/foto-2.jpg)` em qualquer linha.
   ```

   Se tiver **várias fotos do mesmo evento** (ex: fotos de uma formação, de uma competição), em vez de espalhar todas no meio do texto, coloque-as em `fotos:` no frontmatter — elas aparecem como um **carrossel** (com setas para passar de foto) no fim da notícia. `fotos` é opcional — se a notícia tiver só a foto de capa, não precisa dessa lista:

   ```yaml
   fotos:
     - src: "/noticias/selecao-2026/foto-1.jpg"
       alt: "Descrição da primeira foto"
     - src: "/noticias/selecao-2026/foto-2.jpg"
       alt: "Descrição da segunda foto"
   ```

2. **`public/noticias/<slug>/`** — todas as fotos dessa notícia (a capa e qualquer foto usada no meio do texto ou no `fotos:`), com o nome que você quiser (ex: `capa.jpg`, `foto-2.jpg`). É esse caminho, começando em `/noticias/...`, que você usa no `capa:` do frontmatter, no `fotos:` e nas imagens `![...](...)` do corpo.

- `data` é sempre `"AAAA-MM-DD"` (entre aspas) — define a ordem das notícias (mais recente primeiro) e a data mostrada na página. Se ainda não tiver uma data definida, deixe `data: null` (sem aspas).
- `capa` e `capaAlt` são opcionais — se não tiver uma foto de capa ainda, apague as duas linhas (ou deixe `capa: null`) que a notícia aparece só com texto.
- Não é preciso registrar a notícia em nenhum outro lugar do site — qualquer pasta com `index.md` dentro de `content/noticias` aparece automaticamente em `/noticias`.
- Se alguém da coordenação mandar o texto em `.docx`, salve uma cópia do arquivo original em `materiais-origem/noticias` (fora de `/content`) só como referência/arquivo-fonte, e transcreva o conteúdo para o `index.md` seguindo o formato acima — o site nunca lê `.docx` diretamente.

### Adicionando fotos

1. Coloque o arquivo de imagem em `/public/atletas` (foto de atleta), `/public/galeria` (foto da galeria) ou `/public/noticias/<slug>` (fotos de uma notícia específica, ver seção acima). Prefira `.jpg` ou `.png`, largura de até ~1200px (fotos maiores deixam o site mais lento).
2. Aponte para esse caminho no lugar certo: `foto` em `data/atletas.json`, `src` em `data/galeria.json`, ou `capa`/`![...]()` no `index.md` da notícia.

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
