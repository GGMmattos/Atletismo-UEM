import Image from "next/image";
import Link from "next/link";
import { formatarData } from "@/lib/format";
import type { NoticiaMeta } from "@/lib/types";

/**
 * - `padrao`: card vertical (listagem de notícias).
 * - `destaque`: card grande, foto alta (notícia mais recente na Home).
 * - `compacto`: linha horizontal com miniatura (demais notícias na Home).
 * Nos cards a foto é recortada para preencher o quadro; a foto inteira aparece na página da notícia.
 */
export default function NoticiaCard({
  noticia,
  variante = "padrao",
}: {
  noticia: NoticiaMeta;
  variante?: "padrao" | "destaque" | "compacto";
}) {
  const compacto = variante === "compacto";
  const destaque = variante === "destaque";

  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl bg-uem-surface transition-[transform,box-shadow] duration-300 ease-out-strong hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,112,61,0.35)] active:scale-[0.99] ${
        compacto ? "flex-row items-stretch" : "flex-col"
      }`}
    >
      {noticia.capa && (
        <div
          className={`relative shrink-0 overflow-hidden bg-uem-black ${
            compacto ? "w-28 sm:w-40" : destaque ? "aspect-[4/3]" : "aspect-[3/2]"
          }`}
        >
          <Image
            src={noticia.capa}
            alt={noticia.capaAlt ?? ""}
            fill
            sizes={destaque ? "(min-width: 1024px) 640px, 100vw" : compacto ? "160px" : "(min-width: 1024px) 380px, 100vw"}
            className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${compacto ? "justify-center p-4 sm:p-5" : destaque ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
        {noticia.data && (
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uem-green-deep">
            {formatarData(noticia.data)}
          </p>
        )}
        <h3
          className={`mt-2 font-display font-bold uppercase leading-tight tracking-tight ${
            destaque ? "text-3xl sm:text-4xl" : compacto ? "text-lg sm:text-xl" : "text-2xl"
          }`}
        >
          {noticia.titulo}
        </h3>
        {!compacto && <p className="mt-3 text-sm leading-relaxed text-uem-black/70">{noticia.resumo}</p>}
      </div>
    </Link>
  );
}
