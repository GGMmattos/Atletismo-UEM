# PRD — Site do Projeto de Extensão em Atletismo (UEM)

## 1. Contexto e Visão Geral

O Atletismo-UEM é um projeto de extensão universitária (Universidade Estadual de Maringá) com três frentes de atuação:

- **Atletismo Universitário** — equipe competitiva de estudantes da UEM.
- **Atletismo Master** — modalidade voltada a um público de faixa etária mais elevada.
- **Escola na Pista** — ação social/educacional de vivências de atletismo para alunos de escolas públicas.

O projeto precisa de um site institucional que apresente essas três frentes, divulgue resultados e o ranking histórico de marcas da equipe universitária, e sirva como canal de contato — incluindo agendamento de visitas do "Escola na Pista".

O site é mantido por **bolsistas/voluntários que trocam a cada semestre**, sem garantia de conhecimento técnico avançado nem orçamento para infraestrutura paga. Isso é a restrição mais importante do projeto e orienta praticamente todas as decisões técnicas abaixo.

### 1.1 Materiais de referência já existentes
- `detalhamento.pdf` — proposta de estrutura de conteúdo do site (base deste PRD).
- `Ranking Atletismo UEM.xlsx` — planilha com o ranking histórico de marcas (ver seção 6).
- `Imagens/` — logos oficiais (ver seção 7, Identidade Visual).
- Arquivo texto com informações de cores do site: `infos.txt`

## 2. Objetivos de Negócio

1. Dar visibilidade institucional ao projeto de extensão (fortalece renovação de bolsas, apoio institucional e captação de novos atletas/voluntários).
2. Centralizar e preservar o histórico de marcas e resultados da equipe (hoje disperso em planilha).
3. Facilitar a divulgação e adesão de escolas ao programa "Escola na Pista" via formulário de agendamento.
4. Ser fácil de manter por uma equipe não-técnica ou com rotatividade, sem depender de um "dono" fixo do site.

## 3. Público-alvo

- **Atletas/candidatos a atletas** da UEM interessados em participar da equipe universitária.
- **Público master** interessado na modalidade.
- **Escolas públicas / professores** interessados em agendar visitas do "Escola na Pista".
- **Comunidade acadêmica e institucional da UEM** (coordenação, possíveis apoiadores/patrocinadores).
- **Familiares e torcida**, acompanhando resultados e a equipe.

## 4. Escopo do Projeto (Fases)

O projeto será entregue em fases. Este PRD cobre o **MVP em detalhe**; as fases seguintes estão descritas em nível de escopo para orientar decisões de arquitetura (ex: não construir nada que precise ser jogado fora na Fase 2).

### 4.1 MVP (Fase 1) — escopo deste documento
- Início (Home)
- Sobre o Projeto
- Atletismo Universitário — incluindo Ranking de Marcas Históricas e Atletas Atuais
- Contato

### 4.2 Fase 2 (fora do escopo de construção agora, mas considerar na arquitetura)
- Atletismo Master
- Escola na Pista (incluindo formulário de agendamento)
- Notícias / Blog

> Decisão registrada: o formulário de agendamento do "Escola na Pista", quando construído na Fase 2, deve funcionar por **envio simples de e-mail** (sem painel de acompanhamento de status). O Blog/Notícias, quando construído, deve usar **arquivos Markdown no repositório** (um arquivo por notícia), consistente com o modelo de conteúdo via Git adotado no MVP.

## 5. Decisões de Produto já validadas com o responsável pelo projeto

| Tema | Decisão |
|---|---|
| Complexidade técnica | Site estático, sem backend/banco de dados próprio |
| Atualização de ranking/atletas | Via Git — bolsistas editam arquivos de dados versionados no repositório |
| Agendamento Escola na Pista (Fase 2) | Formulário que envia e-mail simples (sem painel de status) |
| Hospedagem | Gratuita (Vercel ou Netlify) |
| Formulários (contato) | Serviço de formulário pronto (ex: Formspree), sem backend próprio |
| Escopo MVP | Enxuto: Home, Sobre, Atletismo Universitário, Contato |
| Conteúdo disponível hoje | Parcial — ranking (planilha) e logos prontos; fotos/bios/textos institucionais **ainda faltam** e devem ser tratados como placeholders editáveis |
| Notícias/Blog | Fora do MVP |

## 6. Ranking de Marcas Históricas — Modelo de Dados

A planilha `Ranking Atletismo UEM.xlsx` já contém o ranking histórico (2024–2026), organizado por **prova + naipe**, com colunas **Colocação | Atleta | Marca**. Ela deve ser convertida em dados estruturados versionados no repositório (ex: um arquivo JSON), e não continuar sendo editada como planilha solta.

### 6.1 Provas mapeadas na planilha atual (39 categorias)
Corridas: 100m, 200m, 400m, 800m, 1.500m, 5.000m, 10.000m, 100m/110m com barreiras, 400m com barreiras, 3.000m com obstáculos — cada uma Feminino/Masculino (conforme aplicável).
Revezamentos: 4x100m, 4x400m, 4x400m Misto.
Saltos: Distância, Triplo, Altura, Vara.
Arremesso/Lançamentos: Peso, Dardo, Disco, Martelo.
Combinadas: Heptatlo (Feminino), Decatlo (Masculino).

### 6.2 Estrutura de dados sugerida (`data/ranking.json`)
```json
[
  {
    "prova": "100 metros",
    "naipe": "masculino",
    "marcas": [
      { "posicao": 1, "atleta": "Gabriel Gonçalves de Marins", "marca": "10.97", "data": null, "competicao": null }
    ]
  }
]
```
- Campos `data` e `competicao` fazem parte do modelo (conforme sugerido no PDF de referência), mas **são opcionais** — a planilha atual não os preenche. A tela de ranking deve funcionar corretamente mesmo com esses campos vazios (não exibir "null"/"undefined").
- Formato de marca: manter como **texto livre** (ex: `10.97`, `5.56.88`), pois provas de tempo e de distância têm formatos diferentes — não tentar normalizar como número único.
- A tela de Ranking deve permitir **filtro por prova e por naipe**, conforme especificado no PDF de referência.

### 6.3 Atletas Atuais — Modelo de Dados (`data/atletas.json`)
```json
[
  {
    "slug": "nome-do-atleta",
    "nome": "Nome do Atleta",
    "foto": "/atletas/nome-do-atleta.jpg",
    "provas": ["100 metros", "200 metros"],
    "melhorMarca": "10.97",
    "bioCurta": "Texto curto.",
    "bioCompleta": "Texto completo com histórico e conquistas.",
    "redesSociais": { "instagram": "https://instagram.com/..." }
  }
]
```
Enquanto fotos/bios reais não estiverem disponíveis, usar 2–3 atletas de exemplo com foto placeholder e texto `[conteúdo a definir]`, deixando claro no próprio arquivo de dados (comentário/README) como preencher depois.

## 7. Identidade Visual

Baseada nos arquivos em `Imagens/`:
- **Paleta**: preto/cinza-escuro (`#1A1A1A` aprox.), vermelho vibrante de destaque (`#EE2E3C` aprox.) e branco.
- **Logos disponíveis**: versão preta (com e sem escrita), versão branca (com e sem escrita), e logo institucional da UEM — usar a versão branca sobre fundos escuros e a preta sobre fundos claros.
- O vermelho deve ser usado como **cor de destaque/ação** (CTAs como "Agende uma visita", links ativos, elementos de resultado/medalha), não como cor de fundo dominante.
- Tipografia, fotos de equipe em ação e demais elementos visuais ainda **não foram definidos** — usar uma tipografia sans-serif neutra (ex: Inter) como padrão até haver diretriz de marca mais completa.

## 8. Especificação Funcional — Páginas do MVP

### 8.1 Início (Home)
- Banner de impacto com foto da equipe em ação (placeholder até haver foto real).
- Frase de apresentação do projeto (missão/propósito) — texto placeholder a ser validado pela coordenação.
- Destaque das 3 frentes de atuação com link para cada uma (Atletismo Universitário ativo; Master e Escola na Pista podem apontar para uma página "em breve" enquanto não existirem na Fase 1).
- Números de impacto (ex: alunos atendidos, escolas visitadas, medalhas conquistadas) — campo de dados simples e editável (`data/impacto.json`), com placeholders até haver números reais.
- Chamada para ação principal: "Conheça o projeto" (leva para Sobre) e "Participe" (leva para Atletismo Universitário/Contato).

### 8.2 Sobre o Projeto
- História e objetivos da extensão (texto placeholder).
- Vínculo institucional (universidade, curso, coordenação).
- Equipe técnica (professores, treinadores, monitores/bolsistas) — lista simples, nome + função.
- Parceiros e apoiadores (opcional, exibir seção apenas se houver dados).

### 8.3 Atletismo Universitário (foco principal do MVP)
- **Sobre a equipe**: categorias e provas trabalhadas; como participar (critérios, seletiva, horários de treino).
- **Ranking de Marcas Históricas**: tabela por prova, separada por naipe, colunas Posição | Atleta | Marca | Data | Competição (os dois últimos podem ficar vazios), com filtro por prova e naipe — conforme seção 6.
- **Atletas Atuais**: grade de cards (foto, nome, prova(s) principal(is), melhor marca pessoal, bio curta) com perfil individual ao clicar (histórico, conquistas, redes sociais opcionais).
- **Resultados e Competições**: lista simples de participações (JUBs, campeonatos universitários etc.) — pode reutilizar a mesma estrutura de dados do ranking/ ou lista de texto simples no MVP.
- **Galeria** de fotos (vídeos podem ficar para Fase 2) — usar placeholders se não houver fotos reais ainda.

### 8.4 Contato
- Formulário de contato geral (nome, e-mail, mensagem) via serviço de formulário (Formspree ou similar) — ver seção 9.4.
- Redes sociais (links).
- Localização (CT/pista de treino), se aplicável.
- E-mail institucional.

### 8.5 Elementos transversais (em todas as páginas)
- Identidade visual da UEM (cores e logo) no cabeçalho e rodapé.
- Botões de compartilhamento em redes sociais (opcional no MVP, pode ser simples share link).
- Menu de navegação principal: Início | Sobre o Projeto | Atletismo Universitário | Atletismo Master* | Escola na Pista* | Notícias* | Contato — itens marcados com * exibem uma página "em breve" até serem construídos na Fase 2 (não remover do menu, para já comunicar o escopo completo do projeto).

## 9. Requisitos Técnicos

### 9.1 Stack recomendada
- **Framework**: Next.js (App Router), gerado como site estático (SSG) — sem servidor Node persistente, sem banco de dados.
- **Linguagem**: TypeScript.
- **Estilização**: Tailwind CSS (produtividade alta para uma equipe pequena/rotativa, fácil de aplicar a paleta da seção 7).
- **Conteúdo/dados**: arquivos JSON (ranking, atletas, impacto) e Markdown (texto institucional, quando aplicável) versionados no próprio repositório em `/data` e `/content`. Nenhum CMS externo, nenhum banco de dados.
- **Imagens**: armazenadas em `/public`, otimizadas via `next/image`.

### 9.2 Hospedagem e Deploy
- **Vercel** (recomendado, integração nativa com Next.js, plano gratuito suficiente para o volume esperado) — alternativa: Netlify.
- Deploy automático a cada `push`/merge na branch principal do repositório (CI/CD simples via integração Git da própria Vercel, sem pipeline customizado).
- Domínio: a definir — pode iniciar em subdomínio gratuito (`*.vercel.app`) até a UEM/coordenação decidir sobre domínio próprio.

### 9.3 Fluxo de atualização de conteúdo (equipe não-técnica/rotativa)
- Ranking, atletas e números de impacto são editados alterando os arquivos JSON em `/data` e abrindo um Pull Request (ou push direto, a critério da equipe) — **não há painel administrativo nem login**.
- Deve existir um `README.md` no repositório explicando, em linguagem simples, como editar cada arquivo de dados (formato esperado, exemplos), pensando explicitamente em bolsistas com pouca experiência técnica que vão herdar o projeto no próximo semestre.

### 9.4 Formulários
- Formulário de Contato (MVP) e, futuramente, o formulário de agendamento do "Escola na Pista" (Fase 2) devem usar um **serviço de formulário para sites estáticos** (ex: Formspree) que envia diretamente por e-mail para a coordenação, sem necessidade de backend próprio.
- Validação de campos obrigatórios no frontend (nome, e-mail válido, mensagem).
- Mensagem de confirmação de envio na própria página (sem necessidade de página de redirecionamento).

### 9.5 SEO e Performance
- Meta tags (título, descrição, Open Graph) por página, usando os metadados nativos do Next.js.
- Site deve ser responsivo (mobile-first), já que boa parte do público (escolas, atletas, torcida) acessará por celular.
- Otimização básica de imagens (compressão, formatos modernos via `next/image`).

### 9.6 Acessibilidade
- Contraste adequado entre o vermelho de destaque e fundos claros/escuros (validar com a paleta da seção 7).
- Textos alternativos (`alt`) em todas as imagens, incluindo fotos de atletas e galeria.
- Navegação por teclado funcional no menu e formulários.

### 9.7 Fora de escopo (explicitamente, para o MVP)
- Login/autenticação de qualquer tipo.
- Banco de dados ou backend próprio.
- Painel administrativo.
- Internacionalização (site apenas em português).
- Blog/Notícias, Atletismo Master, Escola na Pista (Fase 2).
- Importação automática/sincronização com a planilha Excel — a planilha é usada apenas como fonte para a migração inicial dos dados (seção 6).

## 10. Estrutura de repositório sugerida
```
/app                 → páginas Next.js (Home, Sobre, Universitário, Contato)
/components          → componentes reutilizáveis (Header, Footer, RankingTable, AtletaCard, etc.)
/data
  ranking.json
  atletas.json
  impacto.json
/content              → textos institucionais (Sobre, etc.), Markdown ou JSON simples
/public
  /logos              → arquivos de Imagens/ já existentes
  /atletas             → fotos dos atletas
README.md             → guia de manutenção para bolsistas
prd.md                → este documento
```

## 11. Critérios de Aceite do MVP
- [ ] Site publicado em URL pública (Vercel/Netlify), responsivo em mobile e desktop.
- [ ] Home, Sobre, Atletismo Universitário e Contato implementadas conforme seção 8.
- [ ] Ranking de marcas exibido a partir de `data/ranking.json` (migrado da planilha), com filtro por prova e naipe funcionando.
- [ ] Cards de Atletas Atuais renderizados a partir de `data/atletas.json`, com página de perfil individual.
- [ ] Formulário de Contato envia e-mail com sucesso via serviço configurado.
- [ ] Identidade visual (cores e logos da seção 7) aplicada no header/footer e nos CTAs.
- [ ] Menu principal exibe todos os 7 itens do PDF de referência, com "em breve" nos itens de Fase 2.
- [ ] `README.md` explica como editar ranking, atletas e impacto sem conhecimento avançado de programação.

## 12. Riscos e Pontos em Aberto
- **Conteúdo real (fotos, bios, textos institucionais, números de impacto)** ainda não existe — o MVP será entregue com placeholders claramente marcados; alguém da coordenação precisa assumir a tarefa de fornecer o conteúdo final.
- **Domínio próprio**: não definido; decisão pode ficar para depois do MVP sem bloquear o desenvolvimento.
- **Rotatividade de bolsistas**: mitigada pelo modelo "tudo em Git + README", mas depende de que o README seja mantido atualizado a cada troca de equipe.
- **Planilha de ranking sem campos Data/Competição preenchidos**: o modelo de dados já suporta esses campos como opcionais; decidir depois se vale o esforço de preenchê-los retroativamente.
