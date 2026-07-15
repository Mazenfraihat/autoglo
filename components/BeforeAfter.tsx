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

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

export default function BeforeAfter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();

  // The section is a tall scroll "track"; the image is pinned (sticky) in the
  // middle of it. Progress goes 0 → 1 as you scroll through the track, so the
  // image starts fully on BEFORE and sweeps to AFTER the further you scroll.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const reveal = useMotionValue(reduce ? 50 : 4); // % of "after" shown

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce || dragging.current) return;
    // Hold on BEFORE briefly, wipe across the middle, settle on AFTER.
    reveal.set(4 + clamp((p - 0.1) / 0.7, 0, 1) * 92);
  });

  const rightInset = useTransform(reveal, (v) => 100 - v);
  const afterClip = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;
  const handleLeft = useMotionTemplate`${reveal}%`;

  const setFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    reveal.set(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98));
  };

  return (
    <section className="relative border-t border-line bg-ink">
      <div ref={trackRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-6 py-16">
          {/* heading */}
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
              The Auto Glo Difference
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Watch the transformation.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/60 sm:text-base">
              Keep scrolling to reveal the finish — or drag the handle to compare
              it yourself. Same panel, same light.
            </p>
          </div>

          {/* comparison frame */}
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <div
              ref={frameRef}
              onPointerDown={(e) => {
                dragging.current = true;
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                setFromClientX(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
              className="relative aspect-[16/10] max-h-[58vh] w-full touch-none select-none overflow-hidden rounded-2xl ring-chrome sm:aspect-[16/9]"
            >
              {/* BEFORE (base) */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
