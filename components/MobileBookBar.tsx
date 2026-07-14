import { BUSINESS } from "@/lib/data";
import { Phone } from "./Icons";

export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <a
          href={BUSINESS.phoneHref}
          className="btn-outline inline-flex h-12 flex-none items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
          aria-label="Call Auto Glo"
        >
          <Phone className="h-5 w-5 text-chrome" /> Call
        </a>
        <a
          href="#book"
          className="btn-chrome inline-flex h-12 flex-1 items-center justify-center rounded-full text-base font-bold"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
