import type { Metadata } from "next";
import RankingTable from "@/components/RankingTable";
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
    <Section title="Ranking de Marcas Históricas">
      <RankingTable secoes={secoes} />
    </Section>
  );
}
