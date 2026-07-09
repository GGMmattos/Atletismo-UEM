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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium">
          Prova
          <select
            value={prova}
            onChange={(e) => setProva(e.target.value)}
            className="rounded border border-uem-black/20 px-3 py-2"
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
            className="rounded border border-uem-black/20 px-3 py-2"
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
            <h3 className="mb-3 text-lg font-semibold">
              {secao.prova} — {NAIPE_LABELS[secao.naipe] ?? secao.naipe}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-uem-black text-left">
                    <th className="py-2 pr-4">Posição</th>
                    <th className="py-2 pr-4">Atleta</th>
                    <th className="py-2 pr-4">Marca</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Competição</th>
                  </tr>
                </thead>
                <tbody>
                  {secao.marcas.map((marca) => (
                    <tr key={marca.posicao} className="border-b border-uem-black/10">
                      <td className="py-2 pr-4">{marca.posicao}º</td>
                      <td className="py-2 pr-4">{marca.atleta}</td>
                      <td className="py-2 pr-4 font-medium">{marca.marca}</td>
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
