import Image from "next/image";
import { SITE } from "@/lib/site";

const linkClass = "text-uem-white/80 transition-colors hover:text-uem-green";

export default function Footer() {
  return (
    <footer className="bg-uem-black text-uem-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logos/logo-branca.png" alt="" width={32} height={37} />
            <span className="font-display text-2xl font-bold uppercase tracking-tight">Atletismo UEM</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-uem-white/60">
            Projeto de extensão da Universidade Estadual de Maringá. Treinos na Pista de Atletismo da UEM (N-19).
          </p>
        </div>

        <ul className="flex flex-col gap-1.5 text-sm sm:items-end">
          <li>
            {SITE.emailInstitucional ? (
              <a href={`mailto:${SITE.emailInstitucional}`} className={linkClass}>
                {SITE.emailInstitucional}
              </a>
            ) : (
              "[e-mail institucional a definir]"
            )}
          </li>
          {SITE.telefone && (
            <li>
              <a href={`tel:+55${SITE.telefone.replace(/\D/g, "")}`} className={linkClass}>
                {SITE.telefone}
              </a>
            </li>
          )}
          <li>
            {SITE.instagram ? (
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Instagram
              </a>
            ) : (
              "[redes sociais a definir]"
            )}
          </li>
        </ul>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-uem-white/50 sm:flex-row sm:justify-between">
          <p>Projeto de extensão, Universidade Estadual de Maringá (UEM)</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/gabriel-matos-8122943b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-uem-white/70 transition-colors hover:text-uem-green"
            >
              Gabriel Matos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
