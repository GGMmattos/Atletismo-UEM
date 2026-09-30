import type { Metadata } from "next";
import AtletaCard from "@/components/AtletaCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import type { Atleta } from "@/lib/types";
import atletas from "@/data/atletas.json";

export const metadata: Metadata = {
  title: "Atletas Atuais",
  description: "Conheça os atletas atuais da equipe universitária de Atletismo UEM.",
};

export default function AtletasPage() {
  const lista = atletas as Atleta[];

  return (
    <>
      <PageHeader title="Atletas Atuais" voltar={{ href: "/atletismo-universitario", label: "Atletismo Universitário" }} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((atleta) => (
            <AtletaCard key={atleta.slug} atleta={atleta} />
          ))}
        </div>
      </Section>
    </>
  );
}
