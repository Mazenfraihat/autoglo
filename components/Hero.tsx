import Image from "next/image";
import { BUSINESS, TRUST_POINTS } from "@/lib/data";
import { ArrowRight, Check, Phone, Star } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20">
      {/* Background image + overlays */}
      <Image
        src="/images/hero-car.svg"
        alt="Black luxury car under showroom lighting"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/70" />

      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-chrome" />
            Serving Pomona &amp; Surrounding Areas, CA
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium Detailing
            <br />
            That <span className="text-chrome">Comes To You</span>
          </h1>

          <p className="font-display mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-muted sm:text-xl">
            {BUSINESS.tagline}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Mobile and in-shop detailing that protects your investment and delivers
            showroom-ready results — foam washes, ceramic protection, and interior
            restoration, done right at your door.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#book" className="btn-chrome inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold">
              Book Now <ArrowRight className="h-5 w-5" />
            </a>
            <a href={BUSINESS.phoneHref} className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold">
              <Phone className="h-5 w-5 text-chrome" /> Call Now
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
            <span className="flex text-chrome">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span>Trusted by drivers across the Inland Empire</span>
          </div>

          <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium text-white/85">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line bg-white/5">
                  <Check className="h-3.5 w-3.5 text-chrome" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
