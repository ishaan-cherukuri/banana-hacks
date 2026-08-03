import Script from "next/script";
import { analytics } from "@/lib/site";

/**
 * Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_ID is set, so the
 * site ships zero tracking scripts until a real measurement ID exists.
 */
export default function Analytics() {
  if (!analytics.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analytics.gaId}');
        `}
      </Script>
    </>
  );
}
