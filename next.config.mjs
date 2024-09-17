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
  staticPageGenerationTimeout: 300,
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
        source: "/notices",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/pyqs",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/students",
        destination: "/under-construction",
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*",
      },
    ]
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
