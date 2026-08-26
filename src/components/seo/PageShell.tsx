import Link from "next/link";
import { getPage } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

interface PageShellProps {
  path: string;
  /** The single H1 for this page. Kept distinct from the <title>. */
  heading: string;
  lede: string;
  /** Extra JSON-LD (FAQPage, ItemList, …) merged into the page's graph. */
  jsonLd?: object[];
  children: React.ReactNode;
}

/**
 * Standard wrapper for a content page: breadcrumbs, exactly one H1, and the
 * page's structured data. Centralising this is what guarantees the "one H1 per
 * page" and "every page has breadcrumbs" rules hold as pages get added.
 */
export default function PageShell({
  path,
  heading,
  lede,
  jsonLd = [],
  children,
}: PageShellProps) {
  const page = getPage(path);
  const graph = [breadcrumbJsonLd(path), ...jsonLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/65">
          <li>
            <Link href="/" className="hover:text-vine-600 underline decoration-studio-ink/25 underline-offset-2">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-studio-ink">
            {page.label}
          </li>
        </ol>
      </nav>

      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-studio-ink leading-tight mb-3">
        {heading}
      </h1>
      <p className="font-body text-base text-studio-ink/80 leading-relaxed max-w-2xl mb-10">
        {lede}
      </p>

      {children}
    </>
  );
}
