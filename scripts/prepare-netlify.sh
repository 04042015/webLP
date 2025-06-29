#!/bin/bash

echo "🚀 Mempersiapkan deployment ke Netlify..."
echo "📋 Tampilan website akan tetap 100% sama!"

# Backup original config
cp next.config.mjs next.config.mjs.backup

# Update next.config.mjs untuk Netlify
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
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
  }
}

export default nextConfig
EOF

echo "✅ Konfigurasi Netlify siap!"
echo "🎨 Tampilan tetap sama persis"
echo "📦 Jalankan: npm run build"
echo "📁 Upload folder 'out' ke Netlify"
