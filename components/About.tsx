import Image from "next/image";
import Reveal from "./Reveal";
import { ABOUT_COPY } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative border-t border-line bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-chrome">
            <Image
              src="/images/about-interior.jpg"
              alt="Auto Glo detailer restoring a luxury SUV interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
            About Us
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            We don&apos;t just clean cars—
            <br className="hidden sm:block" /> we elevate them.
          </h2>
          <div className="mt-6 h-px w-24 chrome-hairline" />
          <p className="mt-6 text-lg leading-relaxed text-white/75">{ABOUT_COPY}</p>
        </Reveal>
      </div>
    </section>
  );
}
