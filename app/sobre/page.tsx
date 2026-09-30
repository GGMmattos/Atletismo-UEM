import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader title={conteudo.titulo} eyebrow="Projeto de extensão" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <Markdown html={conteudo.html} />

          <aside className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl bg-uem-surface p-6">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Equipe técnica</h2>
              {equipe.length === 0 ? (
                <p className="mt-3 text-uem-black/70">[conteúdo a definir]</p>
              ) : (
                <ul className="mt-4 flex flex-col gap-4">
                  {equipe.map((membro) => (
                    <li key={membro.nome}>
                      <p className="font-medium">{membro.nome}</p>
                      <p className="text-sm text-uem-black/70">{membro.funcao}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {listaParceiros.length > 0 && (
              <div className="rounded-2xl bg-uem-surface p-6">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Parceiros e apoiadores</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {listaParceiros.map((parceiro) => (
                    <li key={parceiro.nome} className="text-sm font-medium">
                      {parceiro.nome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
