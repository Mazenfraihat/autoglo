import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BUSINESS } from "@/lib/data";
import {
  ADD_ONS,
  SERVICE_OPTIONS,
  VEHICLE_SIZES,
  estimatePrice,
  serviceIdFromOption,
  formatUSD,
  type VehicleSize,
} from "@/lib/pricing";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
  serviceValue?: string;
  serviceLabel?: string;
  size?: VehicleSize;
  sizeLabel?: string;
  addOnIds?: string[];
  vehicle?: string;
  date?: string;
  notes?: string;
  company?: string; // honeypot
};

const TO = "info@detailingautoglo.com";
// Sends from the verified domain. Requires detailingautoglo.com to be verified
// in Resend. Override with BOOKING_FROM env var if needed.
const FROM =
  process.env.BOOKING_FROM ||
  "Auto Glo Mobile Detailing <info@detailingautoglo.com>";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept so bots don't learn anything.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  const serviceLabel =
    body.serviceLabel ||
    SERVICE_OPTIONS.find((o) => o.value === body.serviceValue)?.label ||
    "—";
  const sizeLabel =
    body.sizeLabel || VEHICLE_SIZES.find((s) => s.id === body.size)?.label || "—";
  const addOns = (body.addOnIds || [])
    .map((id) => ADD_ONS.find((a) => a.id === id))
    .filter(Boolean) as (typeof ADD_ONS)[number][];

  const estimate = estimatePrice(
    serviceIdFromOption(body.serviceValue || ""),
    (body.size as VehicleSize) || null,
    body.addOnIds || []
  );

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Service", serviceLabel],
    ["Vehicle size", sizeLabel],
    ["Car", body.vehicle?.trim() || "—"],
    ["Add-ons", addOns.length ? addOns.map((a) => `${a.label}${a.note ? ` (${a.note})` : ""} +${formatUSD(a.price)}`).join(", ") : "None"],
    ["Preferred date", body.date || "—"],
    ["Notes", body.notes?.trim() || "—"],
    ["Estimated starting price", estimate !== null ? `${formatUSD(estimate)}+` : "—"],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;padding:24px;color:#fff">
    <div style="max-width:560px;margin:auto;background:#141414;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid #2a2a2a">
        <div style="font-size:12px;letter-spacing:3px;color:#9ca3af">AUTO GLO MOBILE DETAILING</div>
        <div style="font-size:20px;font-weight:800;color:#e5e7eb;margin-top:4px">New Booking Request</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v], i) => `
          <tr style="background:${i % 2 ? "#141414" : "#181818"}">
            <td style="padding:12px 24px;color:#9ca3af;font-size:13px;width:42%;vertical-align:top">${k}</td>
            <td style="padding:12px 24px;color:#ffffff;font-size:14px;font-weight:600">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="padding:16px 24px;border-top:1px solid #2a2a2a;color:#6b7280;font-size:12px">
        Dirty fee of $10–$50 may apply based on vehicle condition. Final price confirmed on arrival.
      </div>
    </div>
  </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  // No API key configured (e.g. local dev) — accept the booking so the UX works,
  // and log it to the server console instead of emailing.
  if (!process.env.RESEND_API_KEY) {
    console.warn("[book] RESEND_API_KEY not set — booking not emailed:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `New Booking Request — ${name} (${serviceLabel})`,
      html,
      text: `New booking request for ${BUSINESS.name}\n\n${text}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[book] Resend error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send. Please call us." },
      { status: 502 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
