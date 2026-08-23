import type { Impacto } from "@/lib/types";

const LABELS: { key: keyof Impacto; label: string }[] = [
  { key: "alunosAtendidos", label: "Alunos atendidos" },
  { key: "escolasVisitadas", label: "Escolas visitadas" },
  { key: "atletasNaEquipe", label: "Atletas na equipe" },
];

export default function ImpactoStats({ impacto }: { impacto: Impacto }) {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {LABELS.map(({ key, label }) => (
        <div key={key} className="text-center">
          <dt className="text-sm text-uem-black/70">{label}</dt>
          <dd className="text-3xl font-bold text-uem-green-deep">
            {impacto[key] === null ? "—" : impacto[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
