import { siteConfig } from "@/lib/site";

/**
 * Server-rendered, crawlable description of the event. The visual site is a
 * client-side OS simulation that renders almost no text in the initial HTML,
 * so this block gives search engines (and screen readers) the real content.
 * It is visually hidden via `sr-only` but present in the DOM and indexable.
 */
export default function SeoContent() {
  return (
    <section className="sr-only" aria-label="About Banana Hacks 2026">
      <h1>Banana Hacks 2026 — Generative AI &amp; Image Creation Hackathon</h1>
      <p>{siteConfig.description}</p>

      <h2>When and where</h2>
      <p>
        Banana Hacks 2026 runs from October 9 to October 16, 2026. It is a
        100% virtual hackathon — join from anywhere in the world. The community
        hub is on Discord, and workshops and ceremonies are hosted on Zoom.
      </p>

      <h2>What is Banana Hacks?</h2>
      <p>
        Banana Hacks is a free, week-long online hackathon focused on
        generative AI and image creation. Participants build creative AI tools,
        fine-tune image and diffusion models, and ship surprising AI-powered
        projects. Tracks span AI, image generation, and creative tooling.
      </p>

      <h2>Prizes</h2>
      <p>
        Over $10,000 in total prizes, including cash, GPU and compute credits
        (AWS, Replicate, Modal), and tooling subscriptions. Category prizes
        include Best Creative Tool, Best Fine-tune, Most Surprising Output, and
        People&apos;s Choice.
      </p>

      <h2>Cost</h2>
      <p>
        Banana Hacks is completely free to enter. Free compute credits are
        provided so you can train models and run inference without cost.
      </p>

      <h2>How to register</h2>
      <p>
        Registration is free and open at{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a>. Apply to join the
        generative AI hackathon and start building.
      </p>
    </section>
  );
}
