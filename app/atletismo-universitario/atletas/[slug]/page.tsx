import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import type { Atleta } from "@/lib/types";
import atletas from "@/data/atletas.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return (atletas as Atleta[]).map((atleta) => ({ slug: atleta.slug }));
}

function getAtleta(slug: string): Atleta | undefined {
  return (atletas as Atleta[]).find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const atleta = getAtleta(slug);
  if (!atleta) return {};
  return {
    title: atleta.nome,
    description: atleta.bioCurta,
  };
}

export default async function AtletaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const atleta = getAtleta(slug);
  if (!atleta) notFound();

  return (
    <Section>
      <div className="grid gap-8 sm:grid-cols-[240px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-uem-black">
          <Image src={atleta.foto} alt={`Foto de ${atleta.nome}`} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{atleta.nome}</h1>
          <p className="mt-1 text-uem-black/70">{atleta.provas.join(", ")}</p>
          <p className="mt-1 font-medium text-uem-green-deep">Melhor marca: {atleta.melhorMarca}</p>
          <p className="mt-4">{atleta.bioCompleta}</p>
          {atleta.redesSociais.instagram && (
            <a
              href={atleta.redesSociais.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-medium text-uem-green-deep hover:underline"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
