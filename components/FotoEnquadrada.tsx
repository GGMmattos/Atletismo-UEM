import Image from "next/image";

/**
 * Mostra a foto inteira (sem cortar) dentro de um quadro de proporção fixa. O espaço que sobra
 * (ex: foto vertical ou quadrada num quadro 16:9) é preenchido com a própria foto desfocada ao fundo.
 * Deve ser usado dentro de um container `relative` com tamanho definido (ex: `aspect-video`).
 */
export default function FotoEnquadrada({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <Image src={src} alt="" aria-hidden="true" fill className="scale-110 object-cover blur-xl brightness-75" />
      <Image src={src} alt={alt} fill className="object-contain" />
    </>
  );
}
