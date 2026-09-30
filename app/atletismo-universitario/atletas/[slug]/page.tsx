import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
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
    <>
      <PageHeader title={atleta.nome} voltar={{ href: "/atletismo-universitario/atletas", label: "Atletas Atuais" }}>
        <p>{atleta.provas.join(", ")}</p>
      </PageHeader>
      <Section>
        <div className="grid gap-10 md:grid-cols-[320px_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-uem-black">
              <Image
                src={atleta.foto}
                alt={`Foto de ${atleta.nome}`}
                fill
                priority
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-uem-surface p-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">Melhor marca</p>
              <ul className="mt-1">
                {/* Atletas com mais de uma prova têm as marcas separadas por " · " em data/atletas.json. */}
                {atleta.melhorMarca.split(" · ").map((marca) => (
                  <li key={marca} className="font-display text-2xl font-bold tabular-nums text-uem-green-deep">
                    {marca}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-[68ch]">
            <div className="space-y-4 text-lg leading-relaxed text-uem-black/85">
              {atleta.bioCompleta.split("\n\n").map((paragrafo, i) => (
                <p key={i}>{paragrafo}</p>
              ))}
            </div>
            {atleta.redesSociais.instagram && (
              <a
                href={atleta.redesSociais.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block font-medium text-uem-green-deep hover:underline"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
