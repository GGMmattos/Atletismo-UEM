import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import type { Resultado } from "@/lib/types";
import resultados from "@/data/resultados.json";

export const metadata: Metadata = {
  title: "Resultados e Competições",
  description: "Participações da equipe universitária de Atletismo UEM em competições.",
};

export default function ResultadosPage() {
  const lista = resultados as Resultado[];

  return (
    <>
      <PageHeader title="Resultados e Competições" voltar={{ href: "/atletismo-universitario", label: "Atletismo Universitário" }} />
      <Section>
        {lista.length === 0 ? (
          <p className="text-uem-black/70">Resultados serão publicados em breve.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {lista.map((resultado, i) => (
              <li key={i} className="rounded-2xl bg-uem-surface p-5 sm:p-6">
                <p className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">{resultado.competicao}</p>
                <p className="mt-1 text-sm text-uem-black/70">
                  {resultado.data ?? "—"} {resultado.local ? `· ${resultado.local}` : ""}
                </p>
                {resultado.destaques.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm">
                    {resultado.destaques.map((destaque, j) => (
                      <li key={j}>{destaque}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
