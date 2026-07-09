import Image from "next/image";
import Link from "next/link";
import type { Atleta } from "@/lib/types";

export default function AtletaCard({ atleta }: { atleta: Atleta }) {
  return (
    <Link
      href={`/atletismo-universitario/atletas/${atleta.slug}`}
      className="group block overflow-hidden rounded-lg border border-uem-black/10 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-uem-black">
        <Image
          src={atleta.foto}
          alt={`Foto de ${atleta.nome}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{atleta.nome}</h3>
        <p className="text-sm text-uem-black/70">{atleta.provas.join(", ")}</p>
        <p className="mt-1 text-sm font-medium text-uem-red-deep">Melhor marca: {atleta.melhorMarca}</p>
      </div>
    </Link>
  );
}
