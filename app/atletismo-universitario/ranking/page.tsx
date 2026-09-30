import type { Metadata } from "next";
import RankingTable from "@/components/RankingTable";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import type { SecaoRanking } from "@/lib/types";
import ranking from "@/data/ranking.json";

export const metadata: Metadata = {
  title: "Ranking de Marcas Históricas",
  description: "Ranking histórico de marcas do Atletismo Universitário UEM, por prova e naipe.",
};

export default function RankingPage() {
  const secoes = ranking as SecaoRanking[];

  return (
    <>
      <PageHeader title="Ranking de Marcas Históricas" voltar={{ href: "/atletismo-universitario", label: "Atletismo Universitário" }} />
      <Section>
        <RankingTable secoes={secoes} />
      </Section>
    </>
  );
}
