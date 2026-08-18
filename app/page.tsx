import Link from "next/link";
import Image from "next/image";
import { getContent } from "@/lib/content";
import ImpactoStats from "@/components/ImpactoStats";
import Section from "@/components/Section";
import impacto from "@/data/impacto.json";

const FRENTES = [
  {
    titulo: "Atletismo Universitário",
    descricao: "Equipe competitiva de estudantes da UEM.",
    href: "/atletismo-universitario",
  },
  {
    titulo: "Atletismo Master",
    descricao: "Modalidade voltada a um público de faixa etária mais elevada.",
    href: "/atletismo-master",
  },
  {
    titulo: "Escola na Pista",
    descricao: "Vivências de atletismo para alunos de escolas públicas.",
    href: "/escola-na-pista",
  },
];

export default async function Home() {
  const apresentacao = await getContent("home-apresentacao");

  return (
    <>
      <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-uem-black text-center text-uem-white">
        <Image src="/hero-placeholder.svg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,179,98,0.25),transparent_60%)]" />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4 px-4">
          <h1 className="text-4xl font-bold sm:text-5xl">Atletismo UEM</h1>
          <p className="text-lg text-white/90">{apresentacao.frase}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link href="/sobre" className="rounded bg-uem-green-deep px-6 py-3 font-medium hover:opacity-90">
              Conheça o projeto
            </Link>
            <Link
              href="/atletismo-universitario"
              className="rounded border border-uem-white px-6 py-3 font-medium hover:bg-uem-white hover:text-uem-black"
            >
              Participe
            </Link>
          </div>
        </div>
      </div>

      <Section title="Frentes de atuação">
        <div className="grid gap-6 sm:grid-cols-3">
          {FRENTES.map((frente) => (
            <Link
              key={frente.href}
              href={frente.href}
              className="block rounded-lg border border-uem-black/10 p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">{frente.titulo}</h3>
              <p className="text-sm text-uem-black/70">{frente.descricao}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Nosso impacto" className="bg-uem-black/5">
        <ImpactoStats impacto={impacto} />
      </Section>
    </>
  );
}
