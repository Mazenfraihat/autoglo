"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { BUSINESS, DIRTY_FEE_NOTICE } from "@/lib/data";
import { Check, MapPin, Phone, Mail, Sparkle } from "./Icons";
import {
  ADD_ONS,
  SERVICE_OPTIONS,
  VEHICLE_SIZES,
  estimatePrice,
  serviceIdFromOption,
  formatUSD,
  type VehicleSize,
} from "@/lib/pricing";

type Status = "idle" | "sending" | "success" | "error";

export default function Booking() {
  const [service, setService] = useState(SERVICE_OPTIONS[1].value); // Signature default
  const [size, setSize] = useState<VehicleSize>("sedan");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const estimate = useMemo(
    () => estimatePrice(serviceIdFromOption(service), size, addOnIds),
    [service, size, addOnIds]
  );

  const toggleAddOn = (id: string) =>
    setAddOnIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Please add your name and phone number.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          serviceValue: service,
          serviceLabel: SERVICE_OPTIONS.find((o) => o.value === service)?.label,
          size,
          sizeLabel: VEHICLE_SIZES.find((s) => s.id === size)?.label,
          addOnIds,
          vehicle,
          date,
          notes,
          company, // honeypot
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please call us at " + BUSINESS.phoneDisplay + ".");
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/35 focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome transition-colors";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";

  return (
    <section id="book" className="relative border-t border-line bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: pitch + contact */}
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
              Book Now / Get A Quote
            </p>
            <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Reserve your detail in seconds.
            </h2>
            <p className="mt-5 text-white/70">
              Tell us about your car and we&apos;ll confirm your time. Mobile
              appointments available across {BUSINESS.area}.
            </p>

            <div className="mt-8 space-y-4">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-3 text-white/85 hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5">
                  <Phone className="h-4 w-4 text-chrome" />
                </span>
                {BUSINESS.phoneDisplay}
              </a>
              <a href={BUSINESS.emailHref} className="flex items-center gap-3 text-white/85 hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5">
                  <Mail className="h-4 w-4 text-chrome" />
                </span>
                {BUSINESS.email}
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5">
                  <MapPin className="h-4 w-4 text-chrome" />
                </span>
                {BUSINESS.area}
              </div>
            </div>

            {/* Live estimate */}
            <div className="mt-8 rounded-2xl card-surface p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                <Sparkle className="h-4 w-4 text-chrome" /> Estimated starting price
              </div>
              <p className="font-display mt-2 text-4xl font-extrabold text-chrome">
                {estimate !== null ? formatUSD(estimate) + "+" : "—"}
              </p>
              <p className="mt-2 text-xs text-muted">
                Based on your selected service, vehicle size, and add-ons. Final price
                confirmed on arrival.
              </p>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={80}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-chrome/30 bg-chrome/[0.05] p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-chrome/40">
                  <Check className="h-8 w-8 text-chrome" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold text-white">
                  We got it — we&apos;ll text/call you shortly to confirm.
                </h3>
                <p className="mt-3 text-white/70">
                  Thanks, {name.split(" ")[0] || "there"}. Keep an eye on your phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl card-surface p-6 sm:p-8" noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="name">Name *</label>
                    <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">Phone *</label>
                    <input id="phone" type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(909) 000-0000" required />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="service">Service</label>
                    <select id="service" className={inputCls} value={service} onChange={(e) => setService(e.target.value)}>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value} className="bg-card">{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="size">Vehicle size</label>
                    <select id="size" className={inputCls} value={size} onChange={(e) => setSize(e.target.value as VehicleSize)}>
                      {VEHICLE_SIZES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-card">{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelCls}>Add-ons</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ADD_ONS.map((a) => {
                      const checked = addOnIds.includes(a.id);
                      return (
                        <label
                          key={a.id}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                            checked ? "border-chrome/60 bg-chrome/[0.06]" : "border-line bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 text-white/85">
                            <span className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? "border-chrome bg-chrome text-ink" : "border-white/30"}`}>
                              {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                            </span>
                            {a.label}
                            {a.note && <span className="text-muted">({a.note})</span>}
                          </span>
                          <span className="font-semibold text-chrome">+{formatUSD(a.price)}</span>
                          <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleAddOn(a.id)} />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="vehicle">Car (year / make / model)</label>
                    <input id="vehicle" className={inputCls} value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="2021 BMW M3" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="date">Preferred date</label>
                    <input id="date" type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelCls} htmlFor="notes">Notes (optional)</label>
                  <textarea id="notes" className={`${inputCls} min-h-[90px] resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know — heavy pet hair, stains, location details…" />
                </div>

                {status === "error" && (
                  <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-chrome mt-6 w-full rounded-full px-6 py-3.5 text-base font-bold disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Book My Detail"}
                </button>

                <p className="mt-4 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-white/80">Dirty fee: </span>
                  {DIRTY_FEE_NOTICE.replace("A dirty fee of ", "")}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
