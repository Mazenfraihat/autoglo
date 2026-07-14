import Reveal from "./Reveal";
import { Stagger, StaggerItem } from "./motion";
import { Check } from "./Icons";
import { SERVICES, DIRTY_FEE_NOTICE, PRICING_DISCLAIMER } from "@/lib/data";
import { ADD_ONS, formatUSD } from "@/lib/pricing";

export default function Services() {
  return (
    <section id="services" className="relative border-t border-line bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
            Services &amp; Pricing
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Packages built around your vehicle.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">{PRICING_DISCLAIMER}</p>
        </Reveal>

        {/* Package cards */}
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-4 md:grid-cols-2">
          {SERVICES.map((svc) => (
            <StaggerItem key={svc.name} className="h-full">
              <article
                className={`card-hover relative flex h-full flex-col rounded-2xl p-7 ${
                  svc.popular
                    ? "bg-gradient-to-b from-[#232323] to-[#141414] ring-chrome"
                    : "card-surface"
                }`}
              >
                {svc.popular && (
                  <span className="btn-chrome absolute -top-3 right-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-white">{svc.name}</h3>
                <p className="font-display mt-3 text-3xl font-extrabold text-chrome">
                  {svc.priceLabel}
                </p>

                {svc.sizePricing && (
                  <dl className="mt-4 space-y-1.5 border-y border-line py-4 text-sm">
                    {svc.sizePricing.map((row) => (
                      <div key={row.size} className="flex justify-between text-white/70">
                        <dt>{row.size}</dt>
                        <dd className="font-semibold text-white">{row.price}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {svc.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-chrome" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {svc.note && (
                  <p className="mt-5 rounded-lg border border-line bg-white/[0.03] p-3 text-xs italic text-muted">
                    {svc.note}
                  </p>
                )}

                <a
                  href="#book"
                  className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-bold ${
                    svc.popular ? "btn-chrome" : "btn-outline"
                  }`}
                >
                  Book {svc.name}
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Add-ons */}
        <Reveal>
          <div className="mt-8 rounded-2xl card-surface p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Specialized Add-Ons</h3>
                <p className="mt-1 text-sm text-white/60">
                  Tailor your detail to your vehicle&apos;s specific needs — attachable to any service.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ADD_ONS.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-xl border border-line bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-sm text-white/85">
                    {a.label}
                    {a.note && <span className="text-muted"> ({a.note})</span>}
                  </span>
                  <span className="font-display font-bold text-chrome">+{formatUSD(a.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dirty fee disclosure */}
        <Reveal>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-chrome/25 bg-chrome/[0.04] p-5">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-chrome/40 text-xs font-bold text-chrome">
              !
            </span>
            <p className="text-sm leading-relaxed text-white/80">
              <span className="font-bold text-white">Dirty fee: </span>
              {DIRTY_FEE_NOTICE.replace("A dirty fee of ", "")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
