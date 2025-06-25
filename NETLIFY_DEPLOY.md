# 🚀 Deploy ke Netlify - Panduan Lengkap

## ✅ Yang TIDAK Berubah (Tetap Sama):
- 🎨 **Tampilan**: 100% identik
- 🖼️ **Layout**: Semua sama
- 🎯 **Fungsionalitas**: Admin panel tetap berjalan
- 📱 **Responsive**: Tetap mobile-friendly
- 🔐 **Security**: Login admin tetap aman

## 🔧 Yang Berubah (Hanya Teknis):
- 📦 **Build**: Static export
- 💾 **Database**: Menggunakan localStorage
- 🖼️ **Images**: Unoptimized (tetap tampil sama)

## 📋 Langkah Deploy:

### 1. Persiapan (1 menit)
\`\`\`bash
# Jalankan script persiapan
bash scripts/prepare-netlify.sh

# Build website
npm run build
\`\`\`

### 2. Upload ke Netlify (2 menit)
1. Buka [netlify.com](https://netlify.com)
2. Drag & drop folder `out` ke Netlify
3. Set environment variables (opsional)

### 3. Selesai! 🎉
Website langsung live dengan tampilan yang sama persis!

## 🔑 Environment Variables (Opsional):
\`\`\`
NEXT_PUBLIC_ADMIN_PASSWORD=your-password
\`\`\`

## 🎯 Fitur yang Tetap Berjalan:
- ✅ Admin panel
- ✅ Buat/edit artikel
- ✅ Upload gambar
- ✅ Semua styling
- ✅ Responsive design
- ✅ Search & filter
