#!/bin/bash

echo "🚀 Preparing for Vercel deployment..."

# Update next.config.mjs for Vercel
cat > next.config.mjs << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
}

export default nextConfig
EOF

echo "✅ Ready for Vercel deployment!"
echo "🔗 Run: npx vercel --prod"
