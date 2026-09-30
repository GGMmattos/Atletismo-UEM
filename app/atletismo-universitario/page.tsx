import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Atletismo Universitário",
  description: "Equipe competitiva de atletismo da UEM: ranking histórico, atletas e resultados.",
};

const SUBSECOES = [
  { href: "/atletismo-universitario/ranking", titulo: "Ranking de Marcas Históricas", descricao: "As melhores marcas da equipe, por prova e naipe" },
  { href: "/atletismo-universitario/atletas", titulo: "Atletas Atuais", descricao: "Quem veste a camisa da UEM hoje" },
  { href: "/atletismo-universitario/resultados", titulo: "Resultados e Competições", descricao: "Participações e destaques em competições" },
  { href: "/atletismo-universitario/galeria", titulo: "Galeria", descricao: "Fotos da equipe em treinos e competições" },
];

export default async function AtletismoUniversitarioPage() {
  const conteudo = await getContent("sobre-equipe-universitario");

  return (
    <>
      <PageHeader title="Atletismo Universitário" eyebrow="Equipe competitiva">
        <p>Treinos às segundas, quartas e sextas-feiras, das 17h30 às 19h30, na Pista de Atletismo da UEM (N-19).</p>
      </PageHeader>

      <nav aria-label="Seções do Atletismo Universitário" className="bg-uem-surface">
        <ul className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUBSECOES.map((sub, i) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className="group flex h-full flex-col rounded-2xl bg-uem-white p-5 transition-[transform,box-shadow] duration-300 ease-out-strong hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(0,112,61,0.35)] active:scale-[0.99]"
              >
                <span className="font-display text-sm font-bold tabular-nums text-uem-green-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 flex items-start justify-between gap-3">
                  <span className="font-display text-xl font-bold uppercase leading-tight tracking-tight">{sub.titulo}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-uem-green-deep transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 text-sm text-uem-black/65">{sub.descricao}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Section title={conteudo.titulo}>
        <Markdown html={conteudo.html} />
      </Section>
    </>
  );
}
