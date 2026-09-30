"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

/** Compara ignorando a barra final (o site usa trailingSlash). Subpáginas marcam a seção mãe. */
export function isAtivo(pathname: string, href: string): boolean {
  const atual = pathname.replace(/\/$/, "") || "/";
  if (href === "/") return atual === "/";
  return atual === href || atual.startsWith(`${href}/`);
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const ativo = isAtivo(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={`relative block rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                ativo ? "bg-uem-white/10 text-uem-white" : "text-uem-white/75 hover:text-uem-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
