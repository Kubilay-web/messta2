import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "public/assets/scss")],
    silenceDeprecations: ["legacy-js-api"],
    quietDeps: true,
  },

  reactStrictMode: false,

  productionBrowserSourceMaps: false, // source map üretimini kapat

  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = false; // RAM kullanımı azalt
      config.cache = false; // cache kapalı
    }
    return config;
  },

  rewrites: async () => {
    return [
      {
        source: "/social/hashtag/:tag",
        destination: "/social/search?q=%23:tag",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sb52wuzhjx.ufs.sh",
        pathname: `/f/*`,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    unoptimized: true,
  },

};

export default nextConfig;