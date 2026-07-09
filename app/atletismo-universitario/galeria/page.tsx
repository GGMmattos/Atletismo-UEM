import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Section from "@/components/Section";
import type { FotoGaleria } from "@/lib/types";
import galeria from "@/data/galeria.json";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos da equipe universitária de Atletismo UEM em ação.",
};

export default function GaleriaPage() {
  const fotos = galeria as FotoGaleria[];

  return (
    <Section title="Galeria">
      <GalleryGrid fotos={fotos} />
    </Section>
  );
}
