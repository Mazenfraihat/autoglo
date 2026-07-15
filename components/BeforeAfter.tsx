"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeIn } from "./motion";

const clamp = (v: number) => Math.max(2, Math.min(98, v));

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false); // once the user drags, stop following scroll
  const reduce = useReducedMotion();

  // Scroll progress across the section drives the wipe by default.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  // Revealed % of the "after" image (left → right). Starts fully on "before"
  // and sweeps to fully "after" as the section scrolls through the viewport.
  const reveal = useMotionValue(reduce ? 50 : 4);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce || touched.current || dragging.current) return;
    reveal.set(4 + p * 92);
  });

  const rightInset = useTransform(reveal, (v) => 100 - v);
  const afterClip = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;
  const handleLeft = useMotionTemplate`${reveal}%`;

  const setFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    reveal.set(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
            The Auto Glo Difference
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Watch the transformation.
          </h2>
          <p className="mt-4 text-white/70">
            Scroll to reveal the finish — or drag the handle to compare for
            yourself. Same panel, same light. That&apos;s a real detail.
          </p>
        </FadeIn>
      </div>

      <FadeIn className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={frameRef}
          onPointerDown={(e) => {
            dragging.current = true;
            touched.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl ring-chrome sm:aspect-[16/9]"
        >
          {/* BEFORE (base layer) */}
          <Image
            src="/images/before-paint.svg"
            alt="Dull, dusty paint before detailing"
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
          {/* AFTER (clipped overlay) */}
          <motion.div className="absolute inset-0" style={{ clipPath: afterClip }}>
            <Image
              src="/images/after-paint.svg"
              alt="Glossy, corrected paint after detailing"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </motion.div>

          {/* corner labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-line bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            Before
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-chrome/40 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-chrome backdrop-blur">
            After
          </span>

          {/* draggable chrome handle */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-chrome shadow-[0_0_18px_rgba(229,231,235,0.7)]"
            style={{ left: handleLeft }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-chrome/70 bg-black/70 text-chrome backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
              </svg>
            </div>
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}
