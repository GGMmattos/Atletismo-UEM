import type { Metadata } from "next";
import NoticiaCard from "@/components/NoticiaCard";
import Section from "@/components/Section";
import { getAllNoticias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Últimas novidades do Atletismo UEM.",
};

export default function NoticiasPage() {
  const noticias = getAllNoticias();

  return (
    <Section title="Notícias">
      {noticias.length === 0 ? (
        <p className="text-uem-black/70">Nenhuma notícia publicada ainda.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <NoticiaCard key={noticia.slug} noticia={noticia} />
          ))}
        </div>
      )}
    </Section>
  );
}
