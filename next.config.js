/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseurl: "http://127.0.0.1:3000"
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ }
  //   return config;
  // }
  staticPageGenerationTimeout: 120
}

module.exports = nextConfig
