#!/bin/bash

echo "🚀 Preparing for Netlify deployment..."

# Update next.config.mjs for static export
cat > next.config.mjs << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
EOF

# Build for static export
echo "📦 Building static export..."
npm run build

echo "✅ Ready for Netlify deployment!"
echo "📁 Upload the 'out' folder to Netlify"
