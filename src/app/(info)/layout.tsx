import Link from "next/link";
import { siteConfig, sitePages } from "@/lib/site";
import { BananaLineIcon } from "@/components/svgs/DockIcons";

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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-banana-400 focus:text-studio-ink focus:font-display focus:font-bold focus:text-sm focus:border-[1.5px] focus:border-studio-ink"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b-[1.5px] border-studio-ink bg-banana-100">
        <div className="mx-auto max-w-4xl px-5 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 hover:opacity-75 transition-opacity"
          >
            <BananaLineIcon size={18} />
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
                className="px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-studio-ink/75 hover:bg-banana-400 hover:text-studio-ink transition-colors whitespace-nowrap"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1 mx-auto w-full max-w-4xl px-5 py-10">
        {children}
      </main>

      <footer className="border-t-[1.5px] border-studio-ink mt-10">
        <div className="mx-auto max-w-4xl px-5 py-8 grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <BananaLineIcon size={17} />
              <span className="font-display font-bold text-sm text-studio-ink">
                Banana Hacks 2026
              </span>
            </div>
            <p className="font-body text-xs text-studio-ink/70 leading-relaxed mb-2">
              A free online weekend for building with generative AI.{" "}
              {siteConfig.dateRangeLabel}. {siteConfig.registrationCount} people registered so far.
            </p>
            {/* Names a human. Nothing on the site previously said who runs the
                event, which is the first thing a parent or teacher checks. */}
            <p className="font-body text-xs text-studio-ink/70 leading-relaxed">
              {siteConfig.organizerBlurb}
            </p>
          </div>

          <nav aria-label="Footer" className="sm:col-span-1">
            <h2 className="font-display font-semibold text-xs uppercase tracking-wider text-studio-ink/65 mb-2">
              Event
            </h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className="font-body text-xs text-studio-ink/70 hover:text-vine-500 hover:underline"
                >
                  Home
                </Link>
              </li>
              {sitePages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="font-body text-xs text-studio-ink/70 hover:text-vine-500 hover:underline"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-1">
            <h2 className="font-display font-semibold text-xs uppercase tracking-wider text-studio-ink/65 mb-2">
              Contact
            </h2>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-body text-xs text-vine-600 hover:underline break-all"
                >
                  {siteConfig.contactEmail}
                </a>
                <span className="block font-body text-[11px] text-studio-ink/65">
                  General &amp; participant questions
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.sponsorEmail}`}
                  className="font-body text-xs text-vine-600 hover:underline break-all"
                >
                  {siteConfig.sponsorEmail}
                </a>
                <span className="block font-body text-[11px] text-studio-ink/65">
                  Sponsorship
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-vine-600 hover:underline"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
