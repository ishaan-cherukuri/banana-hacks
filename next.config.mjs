/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep one canonical URL shape — /faq, never /faq/ — so crawlers don't see
  // two URLs for the same page.
  trailingSlash: false,
  /**
   * Security headers. The live response carried only HSTS (Vercel's default) —
   * no CSP, no X-Frame-Options, no Referrer-Policy, no Permissions-Policy.
   * See AUDIT.md B1.
   *
   * The CSP allows 'unsafe-inline' for styles because Tailwind and next/font
   * inject inline style tags, and for scripts because Next's App Router
   * bootstraps with inline scripts. Tightening those needs a nonce-based
   * setup, which is a larger change than this pass.
   */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /bananahacks rendered a byte-identical copy of the homepage, which is
      // duplicate content. 301 so any existing inbound links pass equity to /.
      { source: "/bananahacks", destination: "/", permanent: true },
      // Common inbound guesses, pointed at the real pages.
      { source: "/apply", destination: "/register", permanent: true },
      { source: "/signup", destination: "/register", permanent: true },
    ];
  },
};

export default nextConfig;
