import Image from "next/image";
import { BUSINESS } from "@/lib/data";
import { Phone, Mail, MapPin, Instagram, Facebook } from "./Icons";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#book", label: "Get A Quote" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Auto Glo Mobile Detailing logo" width={48} height={48} className="h-12 w-12 rounded-full" />
              <span className="font-display text-lg font-extrabold tracking-[0.22em] text-chrome">AUTO GLO</span>
            </div>
            <p className="font-display mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              {BUSINESS.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Premium mobile detailing serving {BUSINESS.area}. We protect your
              investment and deliver showroom-ready results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Explore</h4>
              <ul className="mt-4 space-y-3">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-white/75 hover:text-chrome">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Contact</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-white/75 hover:text-chrome">
                    <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={BUSINESS.emailHref} className="flex items-center gap-2 text-white/75 hover:text-chrome">
                    <Mail className="h-4 w-4" /> {BUSINESS.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/75">
                  <MapPin className="h-4 w-4" /> {BUSINESS.area}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Follow</h4>
              <div className="mt-4 flex gap-3">
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white/80 hover:border-chrome/60 hover:text-chrome">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white/80 hover:border-chrome/60 hover:text-chrome">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-4 text-sm text-white/60">{BUSINESS.social}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <p>
            Made with{" "}
            <a
              href="https://mazenfraihat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 underline-offset-4 transition-colors hover:text-chrome hover:underline"
            >
              mazenfraihat.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
