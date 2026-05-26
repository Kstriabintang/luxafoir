/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export (served by Cloudflare Pages). The secure Pakasir endpoints
  // live as Cloudflare Pages Functions in /functions (edge workers on the same
  // domain) — that's what keeps the API key server-side without a Node server.
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
