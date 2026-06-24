/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  devIndicators: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
