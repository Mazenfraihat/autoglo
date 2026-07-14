"use client";

import { FadeIn } from "./motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
};

/** Backwards-compatible wrapper around the Framer Motion FadeIn primitive. */
export default function Reveal({ children, className = "", delay = 0 }: Props) {
  return (
    <FadeIn className={className} delay={delay}>
      {children}
    </FadeIn>
  );
}
