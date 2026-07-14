"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BUSINESS } from "@/lib/data";
import { Phone, Menu, Close } from "./Icons";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#book", label: "Get A Quote" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > Math.min(window.innerHeight * 0.7, 560));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={BUSINESS.name}>
          <Image
            src="/logo.svg"
            alt="Auto Glo logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full"
            priority
          />
          <span className="font-display text-lg font-extrabold tracking-[0.22em] text-chrome">
            AUTO GLO
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white lg:flex"
          >
            <Phone className="h-4 w-4 text-chrome" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href="#book"
            className="btn-chrome hidden rounded-full px-5 py-2.5 text-sm font-bold sm:inline-flex"
          >
            Book Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-white md:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href={BUSINESS.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-white/90 hover:bg-white/5"
            >
              <Phone className="h-4 w-4 text-chrome" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn-chrome mt-2 rounded-full px-5 py-3 text-center text-sm font-bold"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
