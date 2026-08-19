# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Site institucional do Atletismo-UEM (projeto de extensão da Universidade Estadual de Maringá), implementado como MVP conforme `prd.md` — **leia o PRD por inteiro antes de mudar escopo ou arquitetura**, ele documenta as decisões de produto já validadas (stack, modelo de dados, fases). `README.md` é o guia de manutenção voltado a bolsistas não-técnicos que editam `/data` e `/content` — não duplique aquele conteúdo aqui.

Materiais de origem (não fazem parte do site em si): `detalhamento.pdf` (proposta original), `Ranking Atletismo UEM.xlsx` (fonte da migração única do ranking, não é reimportada depois), `Imagens/` (logos originais não otimizados — as versões usadas pelo site já foram migradas para `/public/logos`).

## Comandos

```bash
npm run dev      # servidor de desenvolvimento (localhost:3000)
npm run build    # build de produção — gera export estático em /out (output: 'export')
npm run lint     # eslint
```

Não há suíte de testes automatizados neste projeto.

**Ambiente Windows**: se `node`/`npm` não forem reconhecidos numa sessão nova de PowerShell logo após instalar o Node, o PATH da sessão pode estar desatualizado — rode primeiro:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Arquitetura

**Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, `output: 'export'` em `next.config.ts` — o site é 100% estático, sem servidor Node em produção, sem banco de dados, sem CMS. Isso implica restrições reais do Next que já foram resolvidas aqui e devem ser respeitadas em qualquer mudança:

- **Sem Route Handlers/Server Actions.** O formulário de contato (`components/ContactForm.tsx`) é um Client Component que faz `fetch` direto para a API do Formspree — não crie `app/api/*`, não funciona em export estático.
- **Rotas dinâmicas exigem `generateStaticParams()`.** Veja `app/atletismo-universitario/atletas/[slug]/page.tsx`: usa `generateStaticParams()` a partir de `data/atletas.json` e `export const dynamicParams = false` (falha o build se algum link apontar para um slug inexistente, em vez de comportamento inconsistente em produção).
- **`sitemap.ts`/`robots.ts` precisam de `export const dynamic = "force-static"`** nesta versão do Next com `output: export`, senão o build falha.
- **`next/image` está com `images.unoptimized: true`** (obrigatório em export estático sem loader customizado) — isso significa que imagens **não são comprimidas automaticamente**. Otimize manualmente antes de adicionar a `/public` (veja `scripts/optimize-logos.mjs` como referência — usa `sharp`).
- **`metadata` export não pode conviver com `'use client'` no mesmo arquivo.** Padrão usado em todo o projeto: `page.tsx` é Server Component (exporta `metadata`/`generateMetadata`) e renderiza um Client Component filho para qualquer parte interativa (`RankingTable`, `ContactForm`, `MobileNav`).

**Tailwind v4**: não há `tailwind.config.ts` — a paleta da marca é definida via `@theme inline` em `app/globals.css` (`--color-uem-black`, `--color-uem-green`, `--color-uem-green-deep`, `--color-uem-red`, `--color-uem-red-deep`, `--color-uem-white`). **Verde é a cor principal** da identidade visual (`#00B362`, ver `infos.txt`); vermelho é cor secundária, mantida de propósito em usos pontuais (estados de erro/atenção em formulários, indicador de campo obrigatório) — não expanda o uso do vermelho além disso sem pedir.

Cada cor tem uma versão "vivid" e uma "-deep" pelo mesmo motivo (contraste AA), mas a regra **não é simétrica entre as duas**, por causa do peso do canal verde na fórmula de luminância:
- `uem-red` (vivid) passa em contraste 3:1 mesmo sobre fundo claro em texto grande (≥24px) — pode ser usado nesse caso, além de fundo escuro e elementos decorativos.
- `uem-green` (vivid) **não** passa nem no limite mais frouxo de 3:1 sobre fundo claro, em nenhum tamanho de texto — reserve `uem-green` (vivid) para fundo escuro (onde passa com folga) ou elementos decorativos sem exigência de contraste (ex: preenchimentos, ilustrações, borda de destaque sobre fundo escuro). Qualquer texto/botão/link sobre fundo claro, **de qualquer tamanho**, usa `uem-green-deep` (#00703D); o mesmo vale para `uem-red-deep` (#B71C2B) nos poucos usos de vermelho que restaram. O anel de foco global (`:focus-visible` em `globals.css`) usa `uem-green-deep` por esse motivo.

Não introduza um terceiro tom em nenhuma das duas famílias sem necessidade.

**Dados e conteúdo**: `/data/*.json` (ranking, atletas, impacto, resultados, galeria, equipe-tecnica, parceiros) são importados diretamente nos `page.tsx` (Server Components) via `resolveJsonModule` e passados como props — sem fetch em runtime. `/content/*.md` (textos institucionais) usam frontmatter + corpo Markdown, lidos em build-time por `lib/content.ts` (`gray-matter` + `remark`). Campos opcionais ausentes (ex: `data`/`competicao` no ranking, `impacto.json`) são `null` no JSON — os componentes tratam isso explicitamente para nunca renderizar a string `"null"` (ex: `RankingTable`, `ImpactoStats`).

**Tipos**: `lib/types.ts` centraliza os shapes de todos os arquivos em `/data` — ao alterar um schema de dados, atualize os tipos lá também (os `page.tsx` fazem `import x from "@/data/x.json"` seguido de `as Tipo`, sem validação em runtime).

**`scripts/`**: `migrate-ranking.ts` e `optimize-logos.mjs` foram migrações/otimizações pontuais (planilha → JSON, PNGs originais → `/public/logos`), não fazem parte do fluxo recorrente — não os re-execute como parte de tarefas normais, eles não são idempotentes em relação a edições manuais feitas depois nos arquivos gerados.

## Verificação de UI

Não há Playwright/browser tooling instalado permanentemente no projeto (foi usado uma vez para verificar visualmente o MVP e depois removido para manter as dependências enxutas). Se for necessário verificar mudanças visuais, instale `playwright` como devDependency temporária, rode `npx playwright install chromium`, valide, e desinstale de novo — não deixe como dependência permanente sem necessidade contínua.
