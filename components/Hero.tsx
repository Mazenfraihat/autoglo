"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { BUSINESS, TRUST_POINTS } from "@/lib/data";
import { ArrowRight, Check, Phone, Star } from "./Icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LINE1 = [{ t: "Premium" }, { t: "Detailing" }];
const LINE2 = [{ t: "That" }, { t: "Comes", c: true }, { t: "To", c: true }, { t: "You", c: true }];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fade: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20"
    >
      {/* Parallax background image */}
      <motion.div style={{ y: imgY }} className="absolute inset-x-0 -top-[8%] -z-20 h-[116%]">
        <Image
          src="/images/hero-car.svg"
          alt="Black luxury car under showroom lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/70" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={fade}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-chrome" />
            Serving Pomona &amp; Surrounding Areas, CA
          </motion.span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              {LINE1.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.25em] inline-block">
                  {w.t}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {LINE2.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className={`mr-[0.25em] inline-block ${w.c ? "text-chrome" : ""}`}
                >
                  {w.t}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p variants={fade} className="font-display mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-muted sm:text-xl">
            {BUSINESS.tagline}
          </motion.p>

          <motion.p variants={fade} className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Mobile and in-shop detailing that protects your investment and delivers
            showroom-ready results — foam washes, ceramic protection, and interior
            restoration, done right at your door.
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap gap-4">
            <a href="#book" className="btn-chrome inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold">
              Book Now <ArrowRight className="h-5 w-5" />
            </a>
            <a href={BUSINESS.phoneHref} className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold">
              <Phone className="h-5 w-5 text-chrome" /> Call Now
            </a>
          </motion.div>

          <motion.div variants={fade} className="mt-8 flex items-center gap-3 text-sm text-white/70">
            <span className="flex text-chrome">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span>Trusted by drivers across the Inland Empire</span>
          </motion.div>

          <motion.ul variants={fade} className="mt-10 grid max-w-2xl grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium text-white/85">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line bg-white/5">
                  <Check className="h-3.5 w-3.5 text-chrome" />
                </span>
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
