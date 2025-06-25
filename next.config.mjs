/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk Netlify - Static Export
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // Disable server features untuk static export
  experimental: {
    appDir: true
  }
}

export default nextConfig
