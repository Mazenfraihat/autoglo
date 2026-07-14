import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://detailingautoglo.com";
const TITLE = "Auto Glo Mobile Detailing — Premium Mobile Detailing in Pomona, CA";
const DESCRIPTION =
  "Premium mobile and shop car detailing in Pomona & the Inland Empire. Foam washes, ceramic protection, interior restoration — showroom-ready results that come to you. Detail Driven, Showroom Glow.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "car detailing Pomona",
    "mobile detailing Inland Empire",
    "ceramic coating Pomona",
    "auto detailing",
    "mobile car wash Pomona CA",
    "Auto Glo Detailing",
  ],
  applicationName: "Auto Glo Mobile Detailing",
  authors: [{ name: "Auto Glo Mobile Detailing" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Auto Glo Mobile Detailing",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: "Auto Glo Mobile Detailing — Detail Driven, Showroom Glow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable}`}
    >
      <body className="min-h-dvh bg-ink text-white antialiased">{children}</body>
    </html>
  );
}
