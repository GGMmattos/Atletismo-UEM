import Image from "next/image";
import type { FotoGaleria } from "@/lib/types";

export default function GalleryGrid({ fotos }: { fotos: FotoGaleria[] }) {
  if (fotos.length === 0) {
    return <p className="text-uem-black/70">Galeria em breve.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {fotos.map((foto, i) => (
        <div key={`${foto.src}-${i}`} className="relative aspect-[3/2] overflow-hidden rounded bg-uem-black">
          <Image src={foto.src} alt={foto.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
