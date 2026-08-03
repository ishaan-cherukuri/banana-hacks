import Link from "next/link";
import { siteConfig, sitePages } from "@/lib/site";

/**
 * Shared chrome for the server-rendered, crawlable content pages.
 *
 * These pages exist alongside the OS-simulation homepage: the homepage is the
 * experience, these are what search engines and screen readers can actually
 * read. Every page here is reachable from every other in one click, so crawl
 * depth never exceeds 2 from the root.
 */
export default function InfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full flex flex-col bg-banana-100">
      <header className="sticky top-0 z-50 border-b border-studio-ink/10 bg-banana-100/90 backdrop-blur">
        <div className="mx-auto max-w-4xl px-5 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 hover:opacity-75 transition-opacity"
          >
            <span className="text-lg leading-none" aria-hidden="true">
              🍌
            </span>
            <span className="font-display font-bold text-sm text-studio-ink">
              Banana Hacks
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="flex items-center gap-1 overflow-x-auto ml-auto"
          >
            {sitePages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="px-2.5 py-1.5 rounded-lg font-display font-semibold text-xs text-studio-ink/65 hover:text-studio-ink hover:bg-banana-400/25 transition-colors whitespace-nowrap"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl px-5 py-10">
        {children}
      </main>

      <footer className="border-t border-studio-ink/10 mt-10">
        <div className="mx-auto max-w-4xl px-5 py-8 grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base leading-none" aria-hidden="true">
                🍌
              </span>
              <span className="font-display font-bold text-sm text-studio-ink">
                Banana Hacks 2026
              </span>
            </div>
            <p className="font-body text-xs text-studio-ink/55 leading-relaxed">
              A free, virtual generative AI &amp; image creation hackathon.{" "}
              {siteConfig.dateRangeLabel}.
            </p>
          </div>

          <nav aria-label="Footer" className="sm:col-span-1">
            <h2 className="font-display font-semibold text-xs uppercase tracking-wider text-studio-ink/45 mb-2">
              Event
            </h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className="font-body text-xs text-studio-ink/70 hover:text-peri-500 hover:underline"
                >
                  Home
                </Link>
              </li>
              {sitePages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="font-body text-xs text-studio-ink/70 hover:text-peri-500 hover:underline"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-1">
            <h2 className="font-display font-semibold text-xs uppercase tracking-wider text-studio-ink/45 mb-2">
              Contact
            </h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-body text-xs text-peri-500 hover:underline break-all"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
