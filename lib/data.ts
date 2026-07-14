// Site content — copy, services, gallery. Kept in one place so it's easy to edit.

export const BUSINESS = {
  name: "Auto Glo Mobile Detailing",
  shortName: "Auto Glo",
  tagline: "Detail Driven, Showroom Glow",
  phoneDisplay: "(909) 307-4711",
  phoneHref: "tel:+19093074711",
  email: "info@detailingautoglo.com",
  emailHref: "mailto:info@detailingautoglo.com",
  area: "Pomona & surrounding areas, CA",
  instagram: "https://instagram.com/officialautoglo",
  facebook: "https://facebook.com/officialautoglo",
  social: "@officialautoglo",
} as const;

export const TRUST_POINTS = [
  "Fully Mobile Service",
  "Premium Grade Products",
  "Luxury Vehicle Experience",
  "Easy Instant Booking",
];

export const ABOUT_COPY =
  "At Auto Glo Detailing, we're passionate about bringing out the absolute best in your vehicle. From daily drivers to luxury cars, our expert team provides premium mobile and shop detailing designed to protect your investment and keep your ride looking showroom-ready. We don't just clean cars—we elevate them.";

export const WHY_CHOOSE = [
  {
    n: "01",
    title: "High-End Mobile Setup",
    kicker: "Skip the Waiting Room.",
    body: "We bring high-level detailing right to your location in Pomona and surrounding areas. You stay relaxed at home or focused at work while we bring your car back to life.",
  },
  {
    n: "02",
    title: "Premium Care & Chemicals",
    kicker: "No Shortcuts, Ever.",
    body: "Your paint and delicate interior surfaces deserve proper care. We invest in top-shelf products and specialized tools to safely restore finishes, eliminate interior grime, and apply real, long-lasting protection.",
  },
  {
    n: "03",
    title: "Instant, Easy Booking",
    kicker: "Scheduled in Seconds.",
    body: "No unnecessary accounts, no tedious paperwork. Pick your package, choose a date, and we take care of the rest.",
  },
];

export type ServiceCard = {
  name: string;
  popular?: boolean;
  priceLabel: string;
  sizePricing?: { size: string; price: string }[];
  description: string;
  features: string[];
  note?: string;
};

export const SERVICES: ServiceCard[] = [
  {
    name: "Full Basic Wash",
    priceLabel: "$60–$90",
    description:
      "Exterior wash and dry paired with a quick interior vacuum and wipe down.",
    features: [
      "Exterior hand wash & dry",
      "Interior vacuum",
      "Interior wipe down",
    ],
    note: "Priced by vehicle size.",
  },
  {
    name: "Signature Detail",
    priceLabel: "From $130",
    sizePricing: [
      { size: "Sedan", price: "$130+" },
      { size: "Small SUV", price: "$150+" },
      { size: "Large SUV / Truck", price: "$180+" },
    ],
    description:
      "A complete two-step foam wash, tire shine, and 2-month wax protection. Includes a full interior blowout, deep vacuum, wipe down, and glass cleaning.",
    features: [
      "Two-step foam wash",
      "Tire shine",
      "2-month wax protection",
      "Interior blowout & deep vacuum",
      "Glass cleaning",
    ],
  },
  {
    name: "Premium Detail",
    popular: true,
    priceLabel: "From $230",
    sizePricing: [
      { size: "Sedan", price: "$230+" },
      { size: "Small SUV", price: "$250+" },
      { size: "Large SUV / Truck", price: "$280+" },
    ],
    description:
      "Everything in Signature, upgraded with a deep upholstery shampoo, intensive wheel detail, and premium ceramic protection. Our most popular option for vehicles needing deeper attention.",
    features: [
      "Everything in Signature",
      "Deep upholstery shampoo",
      "Intensive wheel detail",
      "Premium ceramic protection",
    ],
  },
  {
    name: "Maintenance Plan",
    priceLabel: "From $110 / wash",
    description:
      "Everything in Signature, scheduled every 2–4 weeks (weekly, bi-weekly, or monthly) to keep your car pristine.",
    features: [
      "Includes everything in Signature",
      "Weekly, bi-weekly, or monthly",
      "Trucks / SUVs +$20–$50 (provide year/make/model)",
    ],
    note: "A full detail is required to enroll in the monthly maintenance plan.",
  },
];

export const DIRTY_FEE_NOTICE =
  "A dirty fee of $10–$50 may apply based on vehicle condition: heavy dirt, pet hair, stains, trash, mud/sand, vomit. Final price confirmed on arrival.";

export const PRICING_DISCLAIMER =
  "Starting prices — final price may vary based on vehicle condition.";

export type GalleryImage = { src: string; alt: string; caption: string };

export const GALLERY: GalleryImage[] = [
  { src: "/images/gallery-ceramic-coating.svg", alt: "Ceramic coating application on black paint", caption: "Ceramic Coating" },
  { src: "/images/gallery-foam-bath.svg", alt: "Two-step foam bath on a luxury car", caption: "Foam Bath" },
  { src: "/images/gallery-interior-detail.svg", alt: "Restored luxury car interior", caption: "Interior Detail" },
  { src: "/images/gallery-wheel-detail.svg", alt: "Intensive wheel and tire detail", caption: "Wheel Detail" },
  { src: "/images/gallery-paint-correction.svg", alt: "Paint correction removing swirls", caption: "Paint Correction" },
  { src: "/images/gallery-hand-wash.svg", alt: "Careful two-bucket hand wash", caption: "Hand Wash" },
  { src: "/images/gallery-leather-care.svg", alt: "Leather conditioning on seats", caption: "Leather Care" },
  { src: "/images/gallery-engine-bay.svg", alt: "Dressed and cleaned engine bay", caption: "Engine Bay" },
  { src: "/images/gallery-headlight.svg", alt: "Restored clear headlight", caption: "Headlight Restoration" },
  { src: "/images/gallery-trim.svg", alt: "Restored black exterior trim", caption: "Trim Restoration" },
  { src: "/images/gallery-mobile-setup.svg", alt: "Mobile detailing setup at a driveway", caption: "Mobile Setup" },
  { src: "/images/gallery-showroom-finish.svg", alt: "Finished car with a showroom glow", caption: "Showroom Finish" },
];
