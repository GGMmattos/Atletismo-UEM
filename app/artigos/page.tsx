import type { Metadata } from "next";
import Section from "@/components/Section";
import ArtigoCard from "@/components/ArtigoCard";
import type { Artigo } from "@/lib/types";
import artigos from "@/data/artigos.json";

export const metadata: Metadata = {
  title: "Artigos Científicos",
  description:
    "Artigos publicados em parceria com o Atletismo UEM, muitos deles escritos por atletas atuais e ex-atletas do projeto.",
};

export default function ArtigosPage() {
  const lista = artigos as Artigo[];

  return (
    <Section title="Artigos Científicos">
      <p className="mb-8 max-w-3xl text-uem-black/70">
        Além do trabalho na pista, o Atletismo UEM também é um projeto de extensão universitária: parte do
        conteúdo produzido aqui vira pesquisa. Os artigos abaixo foram feitos em parceria com o projeto —
        vários deles por atletas atuais ou ex-atletas da equipe.
      </p>

      {lista.length === 0 ? (
        <p className="text-uem-black/70">Nenhum artigo publicado ainda.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {lista.map((artigo) => (
            <ArtigoCard key={artigo.doi} artigo={artigo} />
          ))}
        </div>
      )}
    </Section>
  );
}
