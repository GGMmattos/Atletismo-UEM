import type { Artigo } from "@/lib/types";

export default function ArtigoCard({ artigo }: { artigo: Artigo }) {
  const ficha = [artigo.revista, artigo.ano].filter(Boolean).join(" · ");

  return (
    <article className="revelar rounded-2xl bg-uem-surface p-6 sm:p-8">
      <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">{artigo.titulo}</h3>
      <p className="mt-1 text-sm text-uem-black/70">{artigo.autores.join(", ")}</p>
      {ficha && <p className="mt-1 text-xs font-medium uppercase tracking-wide text-uem-black/50">{ficha}</p>}
      <p className="mt-4 max-w-[68ch] leading-relaxed text-uem-black/85">{artigo.resumo}</p>
      <a
        href={artigo.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 inline-flex items-center gap-1.5 font-medium text-uem-green-deep"
      >
        Ler artigo completo (DOI)
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </article>
  );
}
