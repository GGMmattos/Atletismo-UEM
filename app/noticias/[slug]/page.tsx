import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import NoticiaCarrossel from "@/components/NoticiaCarrossel";
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
        <Link
          href="/noticias"
          className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-uem-green-deep"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5"
          >
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Notícias
        </Link>
        {noticia.capa && (
          <Image
            src={noticia.capa}
            alt={noticia.capaAlt ?? ""}
            width={1200}
            height={1200}
            priority
            className="mx-auto mb-8 block h-auto max-h-[70vh] w-auto max-w-full rounded-2xl"
          />
        )}
        {noticia.data && (
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uem-green-deep">
            {formatarData(noticia.data)}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
          {noticia.titulo}
        </h1>
        <div className="mt-8">
          <Markdown html={noticia.html} />
        </div>

        {noticia.fotos.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-3xl font-bold uppercase tracking-tight">Fotos</h2>
            <NoticiaCarrossel fotos={noticia.fotos} />
          </>
        )}

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
