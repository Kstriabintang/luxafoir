/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-rendered on Vercel (was a static export for GitHub Pages). The
  // server runtime is what lets the Pakasir API routes keep the API key secret.
  reactStrictMode: true,
  images: {
    // Product imagery is self-hosted in /public; no external optimizer needed.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
