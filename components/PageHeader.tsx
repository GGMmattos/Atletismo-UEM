import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Cabeçalho escuro das páginas internas: dá a cada página um <h1> de verdade e, nas subpáginas,
 * um link de volta para a seção "mãe".
 */
export default function PageHeader({
  title,
  eyebrow,
  voltar,
  children,
}: {
  title: string;
  /** Texto curto acima do título (ex: nome da seção). */
  eyebrow?: string;
  /** Link de volta para a página anterior na hierarquia. */
  voltar?: { href: string; label: string };
  /** Parágrafo de introdução opcional abaixo do título. */
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-uem-black text-uem-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(0,179,98,0.22),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
        {voltar ? (
          <Link
            href={voltar.href}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-uem-green transition-colors hover:text-uem-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {voltar.label}
          </Link>
        ) : (
          eyebrow && (
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-uem-green">{eyebrow}</p>
          )
        )}
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-uem-white/80">{children}</div>}
      </div>
    </div>
  );
}
