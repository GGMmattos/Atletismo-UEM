const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

/**
 * Formata uma data "AAAA-MM-DD" como "23 de agosto de 2026".
 * Faz o parse manual dos componentes (em vez de `new Date(iso)`) para não
 * depender do fuso horário do ambiente onde o build roda.
 */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (!ano || !mes || !dia) return iso;
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}
