# 🔧 Fix Netlify Deployment Error

## ❌ Error yang Terjadi:
\`\`\`
npm error Missing script: "netlify-build"
\`\`\`

## ✅ Solusi:

### 1. Update package.json
Tambahkan script `netlify-build`:
\`\`\`json
{
  "scripts": {
    "netlify-build": "next build"
  }
}
\`\`\`

### 2. Update netlify.toml
Ganti build command:
\`\`\`toml
[build]
  command = "npm run build"  # Bukan "npm run netlify-build"
\`\`\`

### 3. Commit & Push ke GitHub
\`\`\`bash
git add .
git commit -m "Fix Netlify build configuration"
git push origin main
\`\`\`

### 4. Redeploy di Netlify
- Buka Netlify dashboard
- Klik "Trigger deploy"
- Atau push commit baru

## 🎯 Hasil Setelah Fix:
✅ Build berhasil
✅ Website live di Netlify
✅ Admin panel berfungsi
✅ Responsive design tetap sempurna
