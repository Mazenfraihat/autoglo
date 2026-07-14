// Central pricing model. Used by the Services cards, the booking form's live
// estimate, and the server-side email so the numbers can never drift apart.

export type VehicleSize = "sedan" | "small_suv" | "large";
export type ServiceId = "basic" | "signature" | "premium" | "maintenance";

export const VEHICLE_SIZES: { id: VehicleSize; label: string }[] = [
  { id: "sedan", label: "Sedan" },
  { id: "small_suv", label: "Small SUV" },
  { id: "large", label: "Large SUV / Truck" },
];

// Starting prices by service + vehicle size (USD). "+" ranges in the copy map
// to these floors; final price is confirmed on arrival.
export const BASE_PRICE: Record<ServiceId, Record<VehicleSize, number>> = {
  basic: { sedan: 60, small_suv: 75, large: 90 },
  signature: { sedan: 130, small_suv: 150, large: 180 },
  premium: { sedan: 230, small_suv: 250, large: 280 },
  maintenance: { sedan: 110, small_suv: 130, large: 160 },
};

export type AddOn = { id: string; label: string; price: number; note?: string };

export const ADD_ONS: AddOn[] = [
  { id: "odor", label: "Odor Removal", price: 50 },
  { id: "pet_hair", label: "Pet Hair Removal", price: 30 },
  { id: "leather", label: "Leather Conditioning", price: 15, note: "per seat" },
  { id: "trim", label: "Trim & Plastic Restoration", price: 50 },
  { id: "headlight", label: "Headlight Restoration", price: 50, note: "each" },
];

// Booking dropdown options -> pricing service id.
export const SERVICE_OPTIONS: { value: string; label: string; service: ServiceId }[] = [
  { value: "basic", label: "Full Basic Wash", service: "basic" },
  { value: "signature", label: "Signature Detail", service: "signature" },
  { value: "premium", label: "Premium Detail", service: "premium" },
  { value: "maint_weekly", label: "Maintenance Plan (Weekly)", service: "maintenance" },
  { value: "maint_biweekly", label: "Maintenance Plan (Bi-Weekly)", service: "maintenance" },
  { value: "maint_monthly", label: "Maintenance Plan (Monthly)", service: "maintenance" },
];

export function serviceIdFromOption(value: string): ServiceId | null {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.service ?? null;
}

export function addOnPrice(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (ADD_ONS.find((a) => a.id === id)?.price ?? 0), 0);
}

/** Estimated starting price for a service + vehicle size + add-ons. */
export function estimatePrice(
  service: ServiceId | null,
  size: VehicleSize | null,
  addOnIds: string[] = []
): number | null {
  if (!service || !size) return null;
  return BASE_PRICE[service][size] + addOnPrice(addOnIds);
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
