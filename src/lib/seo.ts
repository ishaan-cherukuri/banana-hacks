import type { Metadata } from "next";
import { siteConfig, getPage } from "@/lib/site";

/**
 * Builds per-page metadata from the central page map. Every content page uses
 * this so no page can ship without a unique title, description, canonical, and
 * matching OG tags.
 */
export function buildMetadata(path: string): Metadata {
  const page = getPage(path);
  return {
    // `absolute` opts out of the root layout's "%s · Banana Hacks 2026"
    // template, these titles already contain the brand, and letting the
    // template append it produces a doubled, truncated SERP title.
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

/** BreadcrumbList schema so SERP results show Home › Page instead of a raw URL. */
export function breadcrumbJsonLd(path: string) {
  const page = getPage(path);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.label,
        item: `${siteConfig.url}${path}`,
      },
    ],
  };
}
