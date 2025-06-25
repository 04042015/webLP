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
  // Remove experimental.appDir - tidak diperlukan di Next.js 15
}

export default nextConfig
