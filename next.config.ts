/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  devIndicators: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  async redirects() {
    return [{ source: "/chat", destination: "/tarot/reading", permanent: true }];
  },
};

export default nextConfig;
