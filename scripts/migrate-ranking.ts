/**
 * Migração única: converte "Ranking Atletismo UEM.xlsx" em data/ranking.json.
 *
 * Uso: npx tsx scripts/migrate-ranking.ts
 *
 * A planilha tem uma única aba, organizada em seções repetidas:
 *   linha de título ("Prova — Naipe", só coluna A)
 *   linha de cabeçalho ("Colocação", "Atleta", "Marca")
 *   N linhas de dados (posicao, atleta, marca)
 *   linha em branco (separador)
 *
 * Este script não deve ser reexecutado como parte do fluxo normal de
 * atualização do ranking — depois da migração inicial, data/ranking.json
 * é editado diretamente (ver README.md).
 */
import xlsx from "xlsx";
import fs from "node:fs";
import path from "node:path";

type Marca = {
  posicao: number;
  atleta: string;
  marca: string;
  data: string | null;
  competicao: string | null;
};

type Secao = {
  prova: string;
  naipe: string;
  marcas: Marca[];
};

const NAIPE_MAP: Record<string, string> = {
  feminino: "feminino",
  masculino: "masculino",
  "m/f": "misto",
  misto: "misto",
};

function normalizeNaipe(raw: string): string {
  const key = raw.trim().toLowerCase();
  const mapped = NAIPE_MAP[key];
  if (!mapped) {
    console.warn(`[migrate-ranking] naipe desconhecido "${raw}" — mantendo como está, revisar manualmente.`);
    return key;
  }
  return mapped;
}

const SRC = path.join(process.cwd(), "Ranking Atletismo UEM.xlsx");
const DEST = path.join(process.cwd(), "data", "ranking.json");

const wb = xlsx.readFile(SRC);
const sheetName = wb.SheetNames[0];
const ws = wb.Sheets[sheetName];
const rows: (string | number | null)[][] = xlsx.utils.sheet_to_json(ws, {
  header: 1,
  defval: null,
});

const secoes: Secao[] = [];
let atual: Secao | null = null;

function isBlankRow(row: (string | number | null)[]): boolean {
  return row.every((cell) => cell === null || cell === "");
}

function isTitleRow(row: (string | number | null)[]): boolean {
  const [a, b, c] = row;
  return typeof a === "string" && a.includes(" — ") && b === null && c === null;
}

function isHeaderRow(row: (string | number | null)[]): boolean {
  const [a] = row;
  return typeof a === "string" && a.trim().toLowerCase().startsWith("coloca");
}

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  if (isBlankRow(row)) {
    if (atual) {
      secoes.push(atual);
      atual = null;
    }
    continue;
  }

  if (isTitleRow(row)) {
    if (atual) {
      // seção anterior não foi fechada por linha em branco antes da próxima — sinaliza e fecha mesmo assim.
      console.warn(`[migrate-ranking] linha ${i}: nova seção começou sem linha em branco antes ("${atual.prova} — ${atual.naipe}").`);
      secoes.push(atual);
    }
    const [tituloBruto] = row as [string, null, null];
    const [prova, naipeRaw] = tituloBruto.split(" — ");
    atual = {
      prova: prova.trim(),
      naipe: normalizeNaipe(naipeRaw ?? ""),
      marcas: [],
    };
    continue;
  }

  if (isHeaderRow(row)) {
    continue;
  }

  const [posicao, atleta, marca] = row;
  if (!atual) {
    console.warn(`[migrate-ranking] linha ${i}: linha de dados fora de qualquer seção, ignorada: ${JSON.stringify(row)}`);
    continue;
  }
  if (typeof posicao !== "number" || typeof atleta !== "string" || typeof marca === "undefined" || marca === null) {
    console.warn(`[migrate-ranking] linha ${i}: linha com formato inesperado, revisar manualmente: ${JSON.stringify(row)}`);
    continue;
  }

  atual.marcas.push({
    posicao,
    atleta: atleta.trim(),
    marca: String(marca).trim(),
    data: null,
    competicao: null,
  });
}

if (atual) {
  secoes.push(atual);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, JSON.stringify(secoes, null, 2) + "\n", "utf8");

const totalMarcas = secoes.reduce((acc, s) => acc + s.marcas.length, 0);
console.log(`[migrate-ranking] ${secoes.length} seções migradas, ${totalMarcas} marcas no total.`);
console.log(`[migrate-ranking] gravado em ${DEST}`);
console.log(
  "[migrate-ranking] atenção: nomes de atletas foram mantidos exatamente como estavam na planilha (capitalização inconsistente em vários casos) — revisar manualmente antes de publicar."
);
