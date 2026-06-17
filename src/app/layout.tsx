import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import SeoContent from "@/components/SeoContent";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Banana Hacks 2026 — Generative AI & Image Creation Hackathon",
    template: "%s · Banana Hacks 2026",
  },
  description: siteConfig.description,
  keywords: [
    "banana hacks",
    "banana hackathon",
    "banana hacks 2026",
    "generative AI hackathon",
    "image creation hackathon",
    "virtual hackathon",
    "online hackathon 2026",
    "AI hackathon",
  ],
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Banana Hacks 2026 — Generative AI & Image Creation Hackathon",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana Hacks 2026 — Generative AI & Image Creation Hackathon",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFBF0",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: siteConfig.name,
  description: siteConfig.description,
  startDate: siteConfig.startDate,
  endDate: siteConfig.endDate,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  isAccessibleForFree: true,
  location: {
    "@type": "VirtualLocation",
    url: siteConfig.url,
  },
  organizer: {
    "@type": "Organization",
    name: siteConfig.organizer,
    url: siteConfig.url,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: siteConfig.url,
    validFrom: siteConfig.startDate,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="h-full overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <SeoContent />
        {children}
      </body>
    </html>
  );
}
