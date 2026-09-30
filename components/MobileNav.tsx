"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { isAtivo } from "@/components/NavLinks";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // As três linhas do ícone viram um "X" (em vez de trocar de ícone de uma vez).
  const linha = "absolute left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out-strong";

  return (
    <div className="lg:hidden" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full p-3 text-uem-white transition-transform duration-150 active:scale-[0.94]"
      >
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className={`${linha} top-0 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`${linha} top-[7px] ${open ? "scale-x-0" : ""}`} />
          <span className={`${linha} top-[14px] ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </span>
      </button>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-uem-black shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-200 ease-out-strong starting:-translate-y-2 starting:opacity-0"
        >
          <ul className="flex flex-col px-4 py-3">
            {NAV_ITEMS.map((item, i) => {
              const ativo = isAtivo(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    aria-current={ativo ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 font-display text-2xl font-semibold uppercase tracking-tight transition-colors ${
                      ativo ? "bg-uem-white/10 text-uem-white" : "text-uem-white/80 active:bg-uem-white/5"
                    }`}
                  >
                    {item.label}
                    {ativo && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-uem-green" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
