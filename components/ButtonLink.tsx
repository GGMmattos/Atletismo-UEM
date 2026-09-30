import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTES = {
  // Verde -deep: passa em contraste AA tanto sobre fundo claro quanto escuro.
  primario: "bg-uem-green-deep text-uem-white hover:bg-[#005c32]",
  // Contorno claro: só para fundo escuro (hero, cabeçalhos).
  contornoClaro: "border border-uem-white/40 text-uem-white hover:border-uem-white hover:bg-uem-white/10",
};

/** Botão em formato de link, com seta que desliza no hover e leve "afundada" no clique. */
export default function ButtonLink({
  href,
  children,
  variante = "primario",
  seta = true,
}: {
  href: string;
  children: ReactNode;
  variante?: keyof typeof VARIANTES;
  seta?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-[background-color,border-color,transform] duration-200 ease-out-strong active:scale-[0.97] ${VARIANTES[variante]}`}
    >
      {children}
      {seta && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="-mr-1 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}
