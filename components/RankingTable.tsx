"use client";

import { useMemo, useState } from "react";
import type { SecaoRanking } from "@/lib/types";

const NAIPE_LABELS: Record<string, string> = {
  feminino: "Feminino",
  masculino: "Masculino",
  misto: "Misto",
};

export default function RankingTable({ secoes }: { secoes: SecaoRanking[] }) {
  const provas = useMemo(
    () => Array.from(new Set(secoes.map((s) => s.prova))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [secoes]
  );
  const naipes = useMemo(() => Array.from(new Set(secoes.map((s) => s.naipe))), [secoes]);

  const [prova, setProva] = useState<string>("todas");
  const [naipe, setNaipe] = useState<string>("todos");

  const secoesFiltradas = secoes.filter(
    (s) => (prova === "todas" || s.prova === prova) && (naipe === "todos" || s.naipe === naipe)
  );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-uem-surface p-4 sm:flex-row sm:p-5">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium">
          Prova
          <select
            value={prova}
            onChange={(e) => setProva(e.target.value)}
            className="rounded-xl border border-uem-black/15 bg-uem-white px-3 py-2.5 transition-colors hover:border-uem-black/30"
          >
            <option value="todas">Todas as provas</option>
            {provas.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-1 flex-col gap-1 text-sm font-medium">
          Naipe
          <select
            value={naipe}
            onChange={(e) => setNaipe(e.target.value)}
            className="rounded-xl border border-uem-black/15 bg-uem-white px-3 py-2.5 transition-colors hover:border-uem-black/30"
          >
            <option value="todos">Todos</option>
            {naipes.map((n) => (
              <option key={n} value={n}>
                {NAIPE_LABELS[n] ?? n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {secoesFiltradas.length === 0 && (
        <p className="text-uem-black/70">Nenhum resultado para os filtros selecionados.</p>
      )}

      <div className="flex flex-col gap-10">
        {secoesFiltradas.map((secao) => (
          <div key={`${secao.prova}-${secao.naipe}`}>
            <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight">
              {secao.prova}, {NAIPE_LABELS[secao.naipe] ?? secao.naipe}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm tabular-nums">
                <thead>
                  <tr className="border-b-2 border-uem-black text-left text-xs uppercase tracking-[0.1em] text-uem-black/60">
                    <th className="py-2 pr-4">Posição</th>
                    <th className="py-2 pr-4">Atleta</th>
                    <th className="py-2 pr-4">Marca</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Competição</th>
                  </tr>
                </thead>
                <tbody>
                  {secao.marcas.map((marca) => (
                    <tr key={marca.posicao} className="border-b border-uem-black/10 transition-colors hover:bg-uem-surface">
                      <td className="py-2.5 pr-4 font-display text-base font-bold text-uem-green-deep">{marca.posicao}º</td>
                      <td className="py-2 pr-4">{marca.atleta}</td>
                      <td className="py-2 pr-4 font-semibold">{marca.marca}</td>
                      <td className="py-2 pr-4">{marca.data ?? "—"}</td>
                      <td className="py-2 pr-4">{marca.competicao ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
