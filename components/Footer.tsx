import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-uem-black text-uem-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logos/logo-branca.png" alt="" width={32} height={37} />
          <span className="font-semibold">Atletismo UEM</span>
        </div>

        <ul className="flex flex-col gap-1 text-sm text-white/80 sm:items-end">
          <li>
            {SITE.emailInstitucional ? (
              <a href={`mailto:${SITE.emailInstitucional}`} className="hover:text-uem-green">
                {SITE.emailInstitucional}
              </a>
            ) : (
              "[e-mail institucional a definir]"
            )}
          </li>
          <li>
            {SITE.instagram ? (
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-uem-green">
                Instagram
              </a>
            ) : (
              "[redes sociais a definir]"
            )}
          </li>
        </ul>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        Projeto de extensão — Universidade Estadual de Maringá (UEM)
      </div>
    </footer>
  );
}
