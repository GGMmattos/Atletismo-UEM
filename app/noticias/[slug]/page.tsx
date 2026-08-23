import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import Section from "@/components/Section";
import { getAllNoticias, getNoticia } from "@/lib/content";
import { formatarData } from "@/lib/format";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNoticias().map((noticia) => ({ slug: noticia.slug }));
}

function noticiaExiste(slug: string): boolean {
  return getAllNoticias().some((noticia) => noticia.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!noticiaExiste(slug)) return {};

  const noticia = await getNoticia(slug);
  return {
    title: noticia.titulo,
    description: noticia.resumo,
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!noticiaExiste(slug)) notFound();

  const noticia = await getNoticia(slug);

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        {noticia.capa && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-uem-black">
            <Image src={noticia.capa} alt={noticia.capaAlt ?? ""} fill className="object-cover" />
          </div>
        )}
        <h1 className="text-2xl font-bold sm:text-3xl">{noticia.titulo}</h1>
        {noticia.data && (
          <p className="mt-2 text-sm text-uem-black/50">{formatarData(noticia.data)}</p>
        )}
        <div className="mt-6">
          <Markdown html={noticia.html} />
        </div>

        {(SITE.emailInstitucional || SITE.telefone) && (
          <p className="mt-8 border-t border-uem-black/10 pt-6 text-sm text-uem-black/70">
            Mais informações:{" "}
            {SITE.emailInstitucional && (
              <a
                href={`mailto:${SITE.emailInstitucional}`}
                className="text-uem-green-deep hover:underline"
              >
                {SITE.emailInstitucional}
              </a>
            )}
            {SITE.emailInstitucional && SITE.telefone && " | "}
            {SITE.telefone && (
              <a
                href={`tel:+55${SITE.telefone.replace(/\D/g, "")}`}
                className="text-uem-green-deep hover:underline"
              >
                {SITE.telefone}
              </a>
            )}
          </p>
        )}
      </article>
    </Section>
  );
}
