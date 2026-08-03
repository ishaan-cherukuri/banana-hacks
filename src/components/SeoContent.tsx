import Link from "next/link";
import { siteConfig, sitePages } from "@/lib/site";

/**
 * Server-rendered, crawlable summary of the event for the homepage.
 *
 * The homepage itself is a client-side OS simulation that renders almost no
 * text in the initial HTML. This block gives search engines and screen readers
 * the real content, and — just as importantly — real <a> links to the content
 * pages, so they are discoverable by crawl rather than by sitemap alone.
 *
 * It is visually hidden via `sr-only` but present in the DOM. The full versions
 * of this content live on the pages linked below.
 */
export default function SeoContent() {
  return (
    <section className="sr-only" aria-label="About Banana Hacks 2026">
      <h1>Banana Hacks 2026 — Generative AI &amp; Image Creation Hackathon</h1>
      <p>{siteConfig.description}</p>

      <h2>When and where</h2>
      <p>
        Banana Hacks 2026 runs from October 9 to October 12, 2026. It is a 100%
        virtual hackathon — join from anywhere in the world. The community hub is
        on Discord, and workshops and ceremonies are hosted on Zoom. See the{" "}
        <Link href="/schedule">full schedule</Link>.
      </p>

      <h2>What is Banana Hacks?</h2>
      <p>
        Banana Hacks is a free, weekend-long online hackathon focused on
        generative AI and image creation. Participants build creative AI tools,
        fine-tune image and diffusion models, and ship surprising AI-powered
        projects. Tracks span AI, image generation, and creative tooling.{" "}
        <Link href="/about">Read more about the event</Link>.
      </p>

      <h2>Prizes and judging</h2>
      <p>
        The prize pool is being finalised with sponsors and will be announced
        before the event. Projects are judged on creativity and originality,
        technical implementation, visual quality, and potential impact, with
        category awards for Best Creative Tool, Best Fine-tune, Most Surprising
        Output, and People&apos;s Choice.{" "}
        <Link href="/prizes">See prizes and judging criteria</Link>.
      </p>

      <h2>Cost</h2>
      <p>
        Banana Hacks is completely free to enter, and sponsors provide compute
        credits so you can train models and run inference without cost.
      </p>

      <h2>How to register</h2>
      <p>
        Registration is free and open worldwide.{" "}
        <Link href="/register">Sign up for Banana Hacks 2026</Link> to join the
        generative AI hackathon and start building. Common questions are answered
        in the <Link href="/faq">FAQ</Link>.
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
