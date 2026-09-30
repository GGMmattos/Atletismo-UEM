import Image from "next/image";
import Link from "next/link";
import type { Atleta } from "@/lib/types";

export default function AtletaCard({ atleta }: { atleta: Atleta }) {
  return (
    <Link
      href={`/atletismo-universitario/atletas/${atleta.slug}`}
      className="group block overflow-hidden rounded-2xl bg-uem-surface transition-[transform,box-shadow] duration-300 ease-out-strong hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,112,61,0.35)] active:scale-[0.99]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-uem-black">
        <Image
          src={atleta.foto}
          alt={`Foto de ${atleta.nome}`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">{atleta.nome}</h3>
        <p className="mt-1 text-sm text-uem-black/70">{atleta.provas.join(", ")}</p>
        <p className="mt-3 text-sm">
          <span className="text-uem-black/60">Melhor marca </span>
          <span className="font-semibold tabular-nums text-uem-green-deep">{atleta.melhorMarca}</span>
        </p>
      </div>
    </Link>
  );
}
