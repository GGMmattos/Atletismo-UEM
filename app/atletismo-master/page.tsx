import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Atletismo Master",
  description:
    "Treinamentos de atletismo para atletas com 30 anos ou mais, com ou sem experiência prévia na modalidade.",
};

export default async function AtletismoMasterPage() {
  const conteudo = await getContent("atletismo-master");

  return (
    <>
      <Section title={conteudo.titulo}>
        <Markdown html={conteudo.html} />
      </Section>

      <Section title="Como participar" className="bg-uem-black/5">
        <p>
          Os treinos acontecem às terças e quintas-feiras, das 17h30 às 19h30, na Pista de Atletismo
          da UEM (N-19). Não importa se você já teve experiência com o atletismo ou se está começando
          agora: o espaço está aberto para quem deseja se movimentar, cuidar da saúde e descobrir novas
          possibilidades através do esporte.
        </p>
        <Link
          href="/contato"
          className="mt-6 inline-block rounded bg-uem-green-deep px-6 py-3 font-medium text-uem-white hover:opacity-90"
        >
          Fale com a gente
        </Link>
      </Section>
    </>
  );
}
