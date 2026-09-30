import type { Metadata } from "next";
import NoticiaCard from "@/components/NoticiaCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { getAllNoticias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Últimas novidades do Atletismo UEM.",
};

export default function NoticiasPage() {
  const noticias = getAllNoticias();

  return (
    <>
      <PageHeader title="Notícias" eyebrow="Atletismo UEM" />
      <Section>
      {noticias.length === 0 ? (
        <p className="text-uem-black/70">Nenhuma notícia publicada ainda.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <div key={noticia.slug} className="revelar">
              <NoticiaCard noticia={noticia} />
            </div>
          ))}
        </div>
      )}
      </Section>
    </>
  );
}
