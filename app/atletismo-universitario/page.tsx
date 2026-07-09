import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Atletismo Universitário",
  description: "Equipe competitiva de atletismo da UEM: ranking histórico, atletas e resultados.",
};

const SUBSECOES = [
  { href: "/atletismo-universitario/ranking", titulo: "Ranking de Marcas Históricas" },
  { href: "/atletismo-universitario/atletas", titulo: "Atletas Atuais" },
  { href: "/atletismo-universitario/resultados", titulo: "Resultados e Competições" },
  { href: "/atletismo-universitario/galeria", titulo: "Galeria" },
];

export default async function AtletismoUniversitarioPage() {
  const conteudo = await getContent("sobre-equipe-universitario");

  return (
    <>
      <Section title={conteudo.titulo}>
        <Markdown html={conteudo.html} />
      </Section>

      <Section title="Explore" className="bg-uem-black/5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBSECOES.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block rounded-lg border border-uem-black/10 bg-white p-6 text-center font-medium transition-shadow hover:shadow-lg"
            >
              {sub.titulo}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
