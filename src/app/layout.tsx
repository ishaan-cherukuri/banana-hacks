import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, analytics } from "@/lib/site";
import Analytics from "@/components/Analytics";

// Type stack is deliberately not the default sans trio. Bricolage Grotesque
// has real quirks in its terminals and apertures, Instrument Sans reads clean
// at small sizes, and Space Mono's slab-ish mono carries the "studio machine"
// tone the OS chrome is going for.
const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Banana Hacks 2026",
    template: "%s · Banana Hacks 2026",
  },
  description: siteConfig.description,
  keywords: [
    "banana hacks",
    "banana hackathon",
    "banana hacks 2026",
    "generative AI hackathon",
    "image creation hackathon",
    "international hackathon",
    "global hackathon 2026",
    "virtual hackathon",
    "online hackathon 2026",
    "worldwide AI hackathon",
    "AI hackathon",
    "diffusion model hackathon",
    "free hackathon for beginners",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.organizerName, url: siteConfig.url }],
  creator: siteConfig.organizerName,
  publisher: siteConfig.organizer,
  // Note: `alternates.canonical` is intentionally NOT set here. A canonical in
  // the root layout is inherited by every child route, which would point all
  // pages at "/" and de-index them. Each page declares its own.
  openGraph: {
    title: "Banana Hacks 2026 | Generative AI & Image Creation Hackathon",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana Hacks 2026 | Generative AI & Image Creation Hackathon",
    description: siteConfig.description,
  },
  verification: {
    ...(analytics.googleVerification
      ? { google: analytics.googleVerification }
      : {}),
    ...(analytics.bingVerification
      ? { other: { "msvalidate.01": analytics.bingVerification } }
      : {}),
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.organizer,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.contactEmail,
  description: siteConfig.description,
  // A named human. The Organization node previously had no founder at all,
  // which is also how the rendered site read: nothing anywhere said who runs
  // the event. See AUDIT.md T3.
  founder: {
    "@type": "Person",
    name: siteConfig.organizerName,
  },
  sameAs: [siteConfig.instagramUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.contactEmail,
    availableLanguage: "English",
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${siteConfig.url}/#event`,
  name: siteConfig.name,
  description: siteConfig.description,
  startDate: siteConfig.startDate,
  endDate: siteConfig.endDate,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  inLanguage: "en",
  location: {
    "@type": "VirtualLocation",
    url: siteConfig.url,
  },
  organizer: { "@id": `${siteConfig.url}/#organization` },
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${siteConfig.url}/register`,
    validFrom: "2026-01-01T00:00:00-05:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, eventJsonLd]),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
