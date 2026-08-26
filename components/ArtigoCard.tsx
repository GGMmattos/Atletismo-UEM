import type { Artigo } from "@/lib/types";

export default function ArtigoCard({ artigo }: { artigo: Artigo }) {
  const ficha = [artigo.revista, artigo.ano].filter(Boolean).join(" · ");

  return (
    <article className="rounded-lg border border-uem-black/10 p-6">
      <h3 className="text-lg font-semibold">{artigo.titulo}</h3>
      <p className="mt-1 text-sm text-uem-black/70">{artigo.autores.join(", ")}</p>
      {ficha && <p className="mt-1 text-xs font-medium uppercase tracking-wide text-uem-black/50">{ficha}</p>}
      <p className="mt-3">{artigo.resumo}</p>
      <a
        href={artigo.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-medium text-uem-green-deep hover:underline"
      >
        Ler artigo completo (DOI)
      </a>
    </article>
  );
}
