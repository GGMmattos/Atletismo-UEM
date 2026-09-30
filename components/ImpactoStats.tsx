import type { Impacto } from "@/lib/types";

const LABELS: { key: keyof Impacto; label: string }[] = [
  { key: "alunosAtendidos", label: "Alunos atendidos" },
  { key: "escolasVisitadas", label: "Escolas visitadas" },
  { key: "atletasNaEquipe", label: "Atletas na equipe" },
];

/** Mostra só os números já preenchidos em data/impacto.json (os `null` ficam de fora, em vez de "—"). */
export default function ImpactoStats({ impacto }: { impacto: Impacto }) {
  const preenchidos = LABELS.filter(({ key }) => impacto[key] !== null);
  if (preenchidos.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-12 gap-y-6">
      {preenchidos.map(({ key, label }) => (
        <div key={key} className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-uem-black/60">{label}</dt>
          <dd className="font-display text-7xl font-bold leading-none tabular-nums text-uem-green-deep">
            {impacto[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
