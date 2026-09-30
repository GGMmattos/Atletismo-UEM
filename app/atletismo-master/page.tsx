import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ButtonLink from "@/components/ButtonLink";
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader title={conteudo.titulo} eyebrow="30 anos ou mais" />

      <Section>
        <Markdown html={conteudo.html} />
      </Section>

      <Section title="Como participar" className="bg-uem-surface">
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            { rotulo: "Quando", valor: "Terças e quintas-feiras" },
            { rotulo: "Horário", valor: "Das 17h30 às 19h30" },
            { rotulo: "Onde", valor: "Pista de Atletismo da UEM (N-19)" },
          ].map((item) => (
            <div key={item.rotulo} className="rounded-2xl bg-uem-white p-5">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">{item.rotulo}</dt>
              <dd className="mt-1 font-display text-2xl font-bold uppercase leading-tight tracking-tight">{item.valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-[68ch] text-uem-black/80">
          Não importa se você já teve experiência com o atletismo ou se está começando agora: o espaço está aberto para
          quem deseja se movimentar, cuidar da saúde e descobrir novas possibilidades através do esporte.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contato">Fale com a gente</ButtonLink>
        </div>
      </Section>
    </>
  );
}
