import Image from "next/image";
import Link from "next/link";
import { formatarData } from "@/lib/format";
import type { NoticiaMeta } from "@/lib/types";

export default function NoticiaCard({ noticia }: { noticia: NoticiaMeta }) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="block overflow-hidden rounded-lg border border-uem-black/10 transition-shadow hover:shadow-lg"
    >
      {noticia.capa && (
        <div className="relative aspect-video bg-uem-black">
          <Image src={noticia.capa} alt={noticia.capaAlt ?? ""} fill className="object-cover" />
        </div>
      )}
      <div className="p-5">
        {noticia.data && (
          <p className="text-xs font-medium uppercase tracking-wide text-uem-black/50">
            {formatarData(noticia.data)}
          </p>
        )}
        <h3 className="mt-1 text-lg font-semibold">{noticia.titulo}</h3>
        <p className="mt-2 text-sm text-uem-black/70">{noticia.resumo}</p>
      </div>
    </Link>
  );
}
