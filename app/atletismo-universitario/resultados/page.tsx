import type { Metadata } from "next";
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
    <Section title="Resultados e Competições">
      {lista.length === 0 ? (
        <p className="text-uem-black/70">Resultados serão publicados em breve.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {lista.map((resultado, i) => (
            <li key={i} className="rounded border border-uem-black/10 p-4">
              <p className="font-medium">{resultado.competicao}</p>
              <p className="text-sm text-uem-black/70">
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
  );
}
