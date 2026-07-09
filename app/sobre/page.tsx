import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Markdown from "@/components/Markdown";
import Section from "@/components/Section";
import type { MembroEquipe, Parceiro } from "@/lib/types";
import equipeTecnica from "@/data/equipe-tecnica.json";
import parceiros from "@/data/parceiros.json";

export const metadata: Metadata = {
  title: "Sobre o Projeto",
  description: "Conheça a história, os objetivos e a equipe do Atletismo UEM.",
};

export default async function SobrePage() {
  const conteudo = await getContent("sobre");
  const equipe = equipeTecnica as MembroEquipe[];
  const listaParceiros = parceiros as Parceiro[];

  return (
    <>
      <Section title={conteudo.titulo}>
        <Markdown html={conteudo.html} />
      </Section>

      <Section title="Equipe técnica">
        {equipe.length === 0 ? (
          <p className="text-uem-black/70">[conteúdo a definir]</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {equipe.map((membro) => (
              <li key={membro.nome} className="rounded border border-uem-black/10 p-4">
                <p className="font-medium">{membro.nome}</p>
                <p className="text-sm text-uem-black/70">{membro.funcao}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {listaParceiros.length > 0 && (
        <Section title="Parceiros e apoiadores">
          <ul className="flex flex-wrap gap-6">
            {listaParceiros.map((parceiro) => (
              <li key={parceiro.nome} className="text-sm font-medium">
                {parceiro.nome}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
