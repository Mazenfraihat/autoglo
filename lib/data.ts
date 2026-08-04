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
  "At Auto Glo Detailing, we're passionate about bringing out the absolute best in your vehicle. From daily drivers to luxury cars, our expert team provides premium mobile detailing designed to protect your investment and keep your ride looking showroom-ready. We don't just clean cars—we elevate them.";

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
  { src: "/images/gallery-foam-bath.jpg", alt: "Two-step foam bath on a black luxury car", caption: "Foam Bath" },
  { src: "/images/gallery-paint-correction.jpg", alt: "Machine polishing during paint correction", caption: "Paint Correction" },
  { src: "/images/gallery-ceramic-coating.jpg", alt: "Applying ceramic protection to paint", caption: "Ceramic Coating" },
  { src: "/images/gallery-wheel-detail.jpg", alt: "Detailing a wheel with a brush", caption: "Wheel Detail" },
  { src: "/images/gallery-interior-detail.jpg", alt: "Detailed luxury car interior console", caption: "Interior Detail" },
  { src: "/images/gallery-hand-wash.jpg", alt: "Careful hand wash of a wheel and paint", caption: "Hand Wash" },
  { src: "/images/gallery-headlight.jpg", alt: "Headlight restoration close up", caption: "Headlight Restoration" },
  { src: "/images/gallery-luxury-interior.jpg", alt: "Luxury interior with ambient lighting", caption: "Luxury Interiors" },
  { src: "/images/gallery-gloss.jpg", alt: "Deep gloss reflection on detailed paint", caption: "Gloss Enhancement" },
  { src: "/images/gallery-exterior.jpg", alt: "Black sports car exterior detail", caption: "Exterior Detail" },
  { src: "/images/gallery-wheels-tires.jpg", alt: "Foam wash on wheels and tires", caption: "Wheels & Tires" },
  { src: "/images/gallery-showroom-finish.jpg", alt: "Finished car with a showroom glow", caption: "Showroom Finish" },
];

export type Review = {
  name: string;
  badge?: string;
  text: string;
};

/** Real Google reviews — text used verbatim. */
export const REVIEWS: Review[] = [
  {
    name: "Eli Reyes",
    text: "Great experience, fast turnaround and proper service. Had a Corolla coming back spotless. Recommend for the price 👍",
  },
  {
    name: "Hamidehh",
    badge: "Local Guide",
    text: "The work is really good. I was impressed, so I definitely have to leave a review! This business is communicative and concerned with making sure the consumer is happy, which is a huge plus. Sometimes companies just dont care. I would definitely recommend to anyone looking for a worthwhile clean. Thanks a lot!",
  },
  {
    name: "Zubair Ibrahim",
    text: "I never had my car detailed before & this was easily one of the best experiences I've had. Great work and fair pricing.",
  },
  {
    name: "Zayd Aweinat",
    text: "Got my car detailed with them inside and out my car looks amazing never been cleaner like this except when I got it brand new from the dealership. Highly recommend!",
  },
  {
    name: "Talha Mala",
    text: "Auto Glo Detailing is definitely the best detailing company I've worked with. Prices are amazing and their work is phenomenal. Highly recommend them to everyone!",
  },
  {
    name: "Taylor Marie",
    text: "AMAZING AMAZING AMAZING!!!! They have worked on 4 cars for us & they all turned out beautiful!! Their attention to detail & hard work certainly shows! Highly recommend to anyone & EVERYONE!!!",
  },
];
