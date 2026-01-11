/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/.next/**",
        "**/node_modules/**",
        "**/Application Data/**",
        "**/AppData/**",
      ],
      aggregateTimeout: 300,
      poll: 1000,
    }
    return config
  },
}

export default nextConfig
