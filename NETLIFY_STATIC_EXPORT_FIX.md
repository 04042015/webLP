# 🔧 Fix Netlify Static Export Error

## ❌ Error yang Terjadi:
\`\`\`
Page "/admin/artikel/[id]/edit" is missing "generateStaticParams()" 
so it cannot be used with "output: export" config.
\`\`\`

## 🔍 Penyebab:
- Next.js `output: 'export'` memerlukan `generateStaticParams()` untuk dynamic routes
- Routes seperti `[id]` dan `[slug]` perlu function ini

## ✅ Solusi yang Diterapkan:

### 1. Tambah generateStaticParams()
\`\`\`typescript
export async function generateStaticParams() {
  return [] // Empty array untuk client-side routing
}
\`\`\`

### 2. Perbaiki next.config.mjs
- Remove `experimental.appDir` (tidak diperlukan di Next.js 15)
- Keep `output: 'export'` untuk static generation

### 3. Client-Side Routing
- Dynamic routes akan di-handle di client-side
- Data loading menggunakan useEffect
- Fallback ke localStorage jika Supabase tidak tersedia

## 🎯 Hasil Setelah Fix:
✅ Build berhasil
✅ Static export ke folder `out/`
✅ Dynamic routes berfungsi di client-side
✅ Admin panel tetap berfungsi
✅ Responsive design tetap sempurna

## 📋 Files yang Diperbaiki:
1. `app/admin/artikel/[id]/edit/page.tsx` - Tambah generateStaticParams
2. `app/artikel/[slug]/page.tsx` - Tambah generateStaticParams  
3. `next.config.mjs` - Remove experimental.appDir
4. `netlify.toml` - Tetap sama

## 🚀 Deploy Process:
1. Commit & push changes
2. Netlify auto-redeploy
3. Website live dalam 2-3 menit
