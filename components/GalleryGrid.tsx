"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { FotoGaleria } from "@/lib/types";

export default function GalleryGrid({ fotos }: { fotos: FotoGaleria[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const isOpen = activeIndex !== null;
  const foto = isOpen ? fotos[activeIndex] : null;

  function close() {
    const previousIndex = activeIndex;
    setActiveIndex(null);
    if (previousIndex !== null) thumbRefs.current[previousIndex]?.focus();
  }

  function showPrev() {
    setActiveIndex((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length));
  }

  function showNext() {
    setActiveIndex((i) => (i === null ? i : (i + 1) % fotos.length));
  }

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  if (fotos.length === 0) {
    return <p className="text-uem-black/70">Galeria em breve.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {fotos.map((f, i) => (
          <button
            key={`${f.src}-${i}`}
            type="button"
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            onClick={() => setActiveIndex(i)}
            aria-label={`Ampliar foto: ${f.alt}`}
            className="group relative aspect-[3/2] overflow-hidden rounded bg-uem-black"
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 11h6M11 8v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {isOpen && foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-3 top-3 rounded-full p-2 text-uem-white hover:bg-white/10 sm:right-6 sm:top-6"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-uem-white hover:bg-white/10 sm:left-4"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-uem-white hover:bg-white/10 sm:right-4"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[75vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={foto.src} alt={foto.alt} fill className="object-contain" priority />
          </div>

          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm text-uem-white/80 sm:bottom-6">
            {foto.alt} — {activeIndex! + 1} / {fotos.length}
          </p>
        </div>
      )}
    </>
  );
}
