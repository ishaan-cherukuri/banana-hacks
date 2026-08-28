import Link from "next/link";
import { siteConfig, sitePages } from "@/lib/site";

/**
 * Server-rendered, crawlable summary of the event for the homepage.
 *
 * The homepage itself is a client-side OS simulation that renders almost no
 * text in the initial HTML. This block gives search engines and screen readers
 * the real content, and, just as importantly, real <a> links to the content
 * pages, so they are discoverable by crawl rather than by sitemap alone.
 *
 * It is visually hidden via `sr-only` but present in the DOM. The full versions
 * of this content live on the pages linked below.
 */
export default function SeoContent() {
  return (
    /*
      Crawlable, visually hidden, but its 11 links are focusable, so tabbing
      into the homepage used to move focus through eleven off-screen anchors
      before reaching any visible control, and the focus ring simply vanished.
      `focus-within:not-sr-only` brings the whole block on screen the moment
      anything inside it takes focus, so focus is always visible while staying
      out of the way for everyone else. See AUDIT.md A2.
    */
    <section
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:inset-x-0 focus-within:top-9 focus-within:z-[9998] focus-within:max-h-[70vh] focus-within:overflow-y-auto focus-within:bg-banana-50 focus-within:p-6 focus-within:border-b-[1.5px] focus-within:border-studio-ink focus-within:prose-sm"
      aria-label="About Banana Hacks 2026"
    >
      <h1>Banana Hacks 2026: Generative AI &amp; Image Creation Hackathon</h1>
      <p>{siteConfig.description}</p>

      <h2>When and where</h2>
      <p>
        Banana Hacks 2026 runs October 9 to 12, entirely online. Times are
        listed in EDT, and workshops are recorded for people in other time
        zones. We use Discord for the community and Zoom for live sessions. See the{" "}
        <Link href="/schedule">full schedule</Link>.
      </p>

      <h2>What is Banana Hacks?</h2>
      <p>
        Banana Hacks is a free weekend for building with generative AI. You can
        make an image tool, fine-tune a model, or bring a different idea. Work
        solo or in a team of up to four.{" "}
        <Link href="/about">Read more about the event</Link>.
      </p>

      <h2>Prizes and judging</h2>
      <p>
        The prize pool is over $10,000 in cash, compute credits, and tooling
        from our sponsors. We confirm how it splits between categories before
        the event. Judges score creativity and originality, technical
        implementation, visual quality, and potential impact. There are also
        awards for Best Creative Tool, Best Fine-tune, Most Surprising Output,
        and People&apos;s Choice.{" "}
        <Link href="/prizes">See prizes and judging criteria</Link>.
      </p>

      <h2>Cost</h2>
      <p>
        Entering costs nothing. Sponsors provide compute credits so you can
        train models and run inference without paying for GPU time.
      </p>

      <h2>How to register</h2>
      <p>
        Signing up is free and takes about a minute.{" "}
        <Link href="/register">Sign up for Banana Hacks 2026</Link> and start
        building. The <Link href="/faq">FAQ</Link> covers the questions people
        ask most.
      </p>

      <h2>More about Banana Hacks 2026</h2>
      <ul>
        {sitePages.map((page) => (
          <li key={page.path}>
            <Link href={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
