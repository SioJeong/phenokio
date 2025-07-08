/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Enable experimental features if needed
  experimental: {
    // optimizeCss: true,
  },
  // Configure webpack if needed
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
