/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi khusus untuk Netlify
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
