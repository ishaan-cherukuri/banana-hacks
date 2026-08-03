/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep one canonical URL shape — /faq, never /faq/ — so crawlers don't see
  // two URLs for the same page.
  trailingSlash: false,
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
