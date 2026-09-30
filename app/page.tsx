import Link from "next/link";
import Image from "next/image";
import { getAllNoticias, getContent } from "@/lib/content";
import ButtonLink from "@/components/ButtonLink";
import ImpactoStats from "@/components/ImpactoStats";
import NoticiaCard from "@/components/NoticiaCard";
import Section from "@/components/Section";
import type { Impacto } from "@/lib/types";
import impactoBase from "@/data/impacto.json";
import atletas from "@/data/atletas.json";

// "Atletas na equipe" não é editado à mão em data/impacto.json: conta direto
// data/atletas.json, para nunca ficar desatualizado quando um atleta é
// adicionado ou removido em "Atletas Atuais".
const impacto: Impacto = { ...impactoBase, atletasNaEquipe: atletas.length };

// Conquistas citadas em content/sobre-equipe-universitario.md.
const CONQUISTAS = [
  { ano: "2023", titulo: "Campeã dos Jogos Universitários do Paraná (JUPs)" },
  { ano: "2024", titulo: "Vice-campeã dos Jogos Universitários do Paraná (JUPs)" },
  {
    ano: "2024",
    titulo: "Campeã por equipes (feminino, masculino e geral) no Troféu Adhemar Ferreira da Silva, Bragança Paulista-SP",
  },
];

function Seta() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-uem-white/15 backdrop-blur-sm transition-transform duration-300 ease-out-strong group-hover:translate-x-1"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default async function Home() {
  const apresentacao = await getContent("home-apresentacao");
  const [destaque, ...outrasNoticias] = getAllNoticias().slice(0, 3);

  return (
    <>
      <div className="relative isolate flex min-h-[78dvh] items-end overflow-hidden bg-uem-black text-uem-white sm:min-h-[640px]">
        <Image
          src="/hero-trofeu-adhemar-2025.jpg"
          alt="Equipe do Atletismo UEM comemorando com medalhas e troféus no Troféu Adhemar Ferreira da Silva 2025"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-uem-black via-uem-black/60 to-uem-black/10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-uem-black/70 via-uem-black/20 to-transparent" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_100%,rgba(0,179,98,0.28),transparent_55%)]"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-32 sm:pb-20">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-uem-white/90">
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-uem-green" />
            Projeto de extensão · <span className="sm:hidden">UEM</span>
            <span className="hidden sm:inline">Universidade Estadual de Maringá</span>
          </p>
          <h1 className="mt-4 font-display text-7xl font-bold uppercase leading-[0.85] tracking-tight sm:text-8xl lg:text-9xl">
            Atletismo
            <br />
            UEM
          </h1>
          <p className="mt-6 max-w-xl text-lg text-uem-white/85 sm:text-xl">{apresentacao.frase}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/sobre">Conheça o projeto</ButtonLink>
            <ButtonLink href="/atletismo-universitario" variante="contornoClaro" seta={false}>
              Participe
            </ButtonLink>
          </div>
        </div>
      </div>

      <Section title="Frentes de atuação">
        <div className="grid gap-4 lg:grid-cols-5 lg:grid-rows-2">
          <Link
            href="/atletismo-universitario"
            className="revelar group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl bg-uem-black p-6 text-uem-white active:scale-[0.99] sm:p-8 lg:col-span-3 lg:row-span-2 lg:min-h-[520px]"
          >
            <Image
              src="/galeria/chegada-revezamento.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 660px, 100vw"
              className="-z-10 object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-uem-black/90 via-uem-black/30 to-transparent" />
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-uem-white/90">
                  <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-uem-green" />
                  Equipe competitiva
                </p>
                <h3 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl">
                  Atletismo Universitário
                </h3>
                <p className="mt-3 max-w-md text-uem-white/80">
                  Estudantes de graduação e pós-graduação da UEM, do primeiro treino às competições estaduais e nacionais.
                </p>
              </div>
              <Seta />
            </div>
          </Link>

          <Link
            href="/escola-na-pista"
            className="revelar group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-uem-black p-6 text-uem-white active:scale-[0.99] lg:col-span-2"
          >
            <Image
              src="/noticias/atletismo-uem-amplia-atuacao/capa.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="-z-10 object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-uem-black/90 via-uem-black/40 to-transparent" />
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">Escola na Pista</h3>
                <p className="mt-2 text-sm text-uem-white/80">Vivências de atletismo para alunos de escolas.</p>
              </div>
              <Seta />
            </div>
          </Link>

          <Link
            href="/atletismo-master"
            className="revelar group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-3xl bg-uem-green-deep p-6 text-uem-white active:scale-[0.99] lg:col-span-2"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[10rem] font-bold leading-none text-uem-white/10"
            >
              30+
            </span>
            <div className="relative flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">Atletismo Master</h3>
                <p className="mt-2 text-sm text-uem-white/85">Treinos para quem tem 30 anos ou mais, com ou sem experiência.</p>
              </div>
              <Seta />
            </div>
          </Link>
        </div>
      </Section>

      <Section className="bg-uem-surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="revelar">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">Nosso impacto</h2>
            <p className="mt-3 max-w-md text-uem-black/70">
              Treinos três vezes por semana na Pista de Atletismo da UEM (N-19), abertos a toda a comunidade universitária.
            </p>
            <div className="mt-8">
              <ImpactoStats impacto={impacto} />
            </div>
          </div>

          <div className="revelar">
            <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-uem-black/60">Conquistas da equipe</h3>
            <ol className="mt-4 divide-y divide-uem-black/10 border-y border-uem-black/10">
              {CONQUISTAS.map((c) => (
                <li key={c.titulo} className="flex items-baseline gap-5 py-4">
                  <span className="font-display text-2xl font-bold tabular-nums text-uem-green-deep">{c.ano}</span>
                  <span className="font-medium">{c.titulo}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {destaque && (
        <Section
          title="Últimas notícias"
          action={
            <Link
              href="/noticias"
              className="group inline-flex items-center gap-1.5 font-medium text-uem-green-deep"
            >
              Ver todas
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="revelar">
              <NoticiaCard noticia={destaque} variante="destaque" />
            </div>
            {outrasNoticias.length > 0 && (
              <div className="grid content-start gap-4">
                {outrasNoticias.map((noticia) => (
                  <div key={noticia.slug} className="revelar">
                    <NoticiaCard noticia={noticia} variante="compacto" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
