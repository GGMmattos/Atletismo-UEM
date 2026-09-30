import type { ReactNode } from "react";

/**
 * Faixa de conteúdo da página. O fundo (ex: `bg-uem-surface`, passado em `className`) ocupa a
 * largura toda da tela; o conteúdo fica centralizado no container de largura máxima.
 */
export default function Section({
  title,
  children,
  className = "",
  action,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  /** Link/elemento opcional alinhado à direita do título (ex: "Ver todas"). */
  action?: ReactNode;
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        {(title || action) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            {title && (
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
            )}
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
