/** @type {import('next').NextConfig} */
const nextConfig = {
  // NUCLEAR OPTION: Complete static export without dynamic routes
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
  // EXCLUDE all dynamic routes from static export
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/artikel': { page: '/artikel' },
      '/zodiak': { page: '/zodiak' },
      '/tentang': { page: '/tentang' },
      '/kontak': { page: '/kontak' },
      '/kategori': { page: '/kategori' },
      '/demo': { page: '/demo' },
      '/admin': { page: '/admin' },
      // NO dynamic routes - they'll be handled client-side
    }
  }
}

export default nextConfig
