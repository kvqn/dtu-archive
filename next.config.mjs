import "./src/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseurl: "http://127.0.0.1:3000",
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ }
  //   return config;
  // }
  reactStrictMode: true,
  staticPageGenerationTimeout: 120,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
  async redirects() {
    return [
      {
        source: "/result",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/courses",
        destination: "/under-construction",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
