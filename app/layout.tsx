import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { CLINIC, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CLINIC.name} | CIDCO N-2, Chhatrapati Sambhajinagar`,
    template: `%s | ${CLINIC.shortName}`,
  },
  description:
    "Shriram Dental Clinic & Implant Center in CIDCO N-2, Chhatrapati Sambhajinagar — general dentistry, root canal treatment, braces, cosmetic dentistry and dental implants.",
  keywords: [
    "dental clinic Chhatrapati Sambhajinagar",
    "dentist CIDCO N-2",
    "dental implants Chhatrapati Sambhajinagar",
    "Shriram Dental Clinic",
    "root canal treatment Sambhajinagar",
  ],
  openGraph: {
    title: `${CLINIC.name}`,
    description:
      "General dentistry and dental implants in CIDCO N-2, Chhatrapati Sambhajinagar.",
    url: SITE_URL,
    siteName: CLINIC.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CLINIC.name,
    description:
      "General dentistry and dental implants in CIDCO N-2, Chhatrapati Sambhajinagar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: CLINIC.name,
  image: `${SITE_URL}/opengraph-image`,
  telephone: "+91-8788267331",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.addressLine1,
    addressLocality: "Chhatrapati Sambhajinagar",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  url: SITE_URL,
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/book`,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Dental Appointment",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="pb-16 sm:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
