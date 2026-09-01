"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { FotoNoticia } from "@/lib/types";

export default function NoticiaCarrossel({ fotos }: { fotos: FotoNoticia[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (fotos.length === 0) return null;

  const foto = fotos[index];

  function showPrev() {
    setIndex((i) => (i - 1 + fotos.length) % fotos.length);
  }

  function showNext() {
    setIndex((i) => (i + 1) % fotos.length);
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) showPrev();
    else if (delta < -50) showNext();
    touchStartX.current = null;
  }

  return (
    <div className="my-8">
      <div
        className="relative aspect-video overflow-hidden rounded-lg bg-uem-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image src={foto.src} alt={foto.alt} fill className="object-cover" />

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-uem-white hover:bg-black/60"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-uem-white hover:bg-black/60"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="absolute bottom-2 right-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-uem-white">
              {index + 1} / {fotos.length}
            </span>
          </>
        )}
      </div>

      {foto.alt && <p className="mt-2 text-center text-sm text-uem-black/60">{foto.alt}</p>}

      {fotos.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {fotos.map((f, i) => (
            <button
              key={`${f.src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-uem-green-deep" : "bg-uem-black/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
