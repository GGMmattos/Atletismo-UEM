export type Marca = {
  posicao: number;
  atleta: string;
  marca: string;
  data: string | null;
  competicao: string | null;
};

export type SecaoRanking = {
  prova: string;
  naipe: string;
  marcas: Marca[];
};

export type Atleta = {
  slug: string;
  nome: string;
  foto: string;
  provas: string[];
  melhorMarca: string;
  bioCurta: string;
  bioCompleta: string;
  redesSociais: {
    instagram?: string;
  };
};

export type Resultado = {
  competicao: string;
  data: string | null;
  local: string | null;
  destaques: string[];
};

export type FotoGaleria = {
  src: string;
  alt: string;
  categoria: string | null;
};

export type MembroEquipe = {
  nome: string;
  funcao: string;
};

export type Parceiro = {
  nome: string;
  logo?: string;
  url?: string;
};

export type Impacto = {
  alunosAtendidos: number | null;
  escolasVisitadas: number | null;
  medalhasConquistadas: number | null;
  atletasNaEquipe: number | null;
};

export type NoticiaMeta = {
  slug: string;
  titulo: string;
  data: string | null;
  resumo: string;
  capa: string | null;
  capaAlt: string | null;
};

export type Noticia = NoticiaMeta & { html: string };
