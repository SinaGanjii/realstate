/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/realstate",
  assetPrefix: "/realstate/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
