"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/data";
import { Close, ArrowRight } from "./Icons";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="relative border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
          Gallery
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          The finish speaks for itself.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-chrome"
              aria-label={`View ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && index !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[index].caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white hover:bg-white/10"
            aria-label="Close"
          >
            <Close className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 inline-flex h-11 w-11 rotate-180 items-center justify-center rounded-full border border-line bg-white/5 text-white hover:bg-white/10 sm:left-6"
            aria-label="Previous"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <figure
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-chrome">
              <Image
                src={GALLERY[index].src}
                alt={GALLERY[index].alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-chrome">
              {GALLERY[index].caption}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white hover:bg-white/10 sm:right-6"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
