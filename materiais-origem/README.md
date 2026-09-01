# Materiais de origem

Esta pasta guarda os **arquivos brutos/originais** que a coordenação, os atletas ou os bolsistas enviam (`.docx`, fotos em tamanho grande, PDFs, planilhas). **Nada aqui é lido pelo site** — é só o arquivo-fonte, guardado para referência e para quem for atualizar o conteúdo depois. O passo a passo de como transformar isso no que aparece no site está no [`README.md`](../README.md) da raiz do projeto.

Fluxo geral: **1)** salve o material bruto na subpasta certa aqui embaixo → **2)** transcreva o texto / otimize a foto → **3)** coloque o resultado final em `/content`, `/data` ou `/public` (é isso que o site publica).

## Onde colocar cada coisa

- **`atletas/`** — uma subpasta por atleta (nome no mesmo padrão do `slug` usado em `data/atletas.json`, ex: `luis-vilela`). Dentro: o `.docx` com a autodescrição/biografia e a(s) foto(s) original(is) recebida(s).
  - Novo atleta? Crie a subpasta aqui com os arquivos recebidos, depois siga a seção "Como adicionar/editar um atleta" do README da raiz para: escolher a foto final e colocá-la (redimensionada) em `/public/atletas`, e escrever o bloco em `data/atletas.json`.
- **`noticias/`** — rascunhos `.docx` de notícias recebidos da coordenação, antes de virarem `index.md`. Depois de transcrever para `content/noticias/<slug>/index.md` (+ fotos em `public/noticias/<slug>/`, ver README da raiz), o rascunho pode continuar aqui como histórico.
- **`artigos/`** — PDFs dos artigos científicos e a planilha de controle (`artigos-e-dois.xlsx`). Ao publicar um novo artigo em `data/artigos.json`, não precisa reimportar nada automaticamente — é só preencher o JSON com título/autores/resumo/DOI.
- **`imagens/`** — fotos e logos originais (não otimizados) recebidos ao longo do projeto, incluindo a subpasta `universitarios/` com fotos de eventos. As versões já usadas pelo site foram otimizadas e migradas para `/public/logos` e `/public/galeria` — não é preciso mexer aqui para isso.
- **`formularios/`** — versão de referência do formulário original (`forms.html`), anterior à implementação em React (`components/ContactForm.tsx`, `components/EscolaVisitaForm.tsx`).
- **`info-projeto/`** — documentos institucionais gerais sobre o projeto (`.docx`), usados como base para os textos em `/content` (ex: `sobre.md`, `atletismo-master.md`).
- **`detalhamento.pdf`** — proposta original do projeto de extensão.
- **`ranking-atletismo-uem.xlsx`** — planilha fonte da migração única do ranking para `data/ranking.json` (script `scripts/migrate-ranking.ts`, já executado — não é reimportada automaticamente depois; atualizações de ranking daqui pra frente são feitas direto em `data/ranking.json`).

## Boas práticas ao adicionar arquivos aqui

- Pode manter o nome do arquivo como foi recebido (ex: `IMG_7145.JPG`, `Informações.docx`) — só o **nome da subpasta do atleta** precisa seguir o padrão sem espaço/acento, porque ele é usado como referência ao criar o `slug` correspondente.
- Fotos aqui podem ficar em tamanho/qualidade original — a otimização (redimensionar, comprimir) acontece só na cópia final que vai para `/public`.
