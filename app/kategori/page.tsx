import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Semua Kategori Berita - LangsaPost",
  description:
    "Jelajahi semua kategori berita di LangsaPost - Politik, Ekonomi, Olahraga, Teknologi, Loker, dan kategori khusus Langsa",
  keywords: "kategori berita, LangsaPost, berita Langsa, politik, ekonomi, olahraga, teknologi, loker",
}

const CATEGORIES = [
  {
    slug: "politik",
    name: "Politik",
    description: "Berita politik terkini dan analisis mendalam",
  },
  {
    slug: "ekonomi",
    name: "Ekonomi",
    description: "Berita ekonomi, bisnis, dan keuangan terbaru",
  },
  {
    slug: "olahraga",
    name: "Olahraga",
    description: "Berita olahraga dan hasil pertandingan terkini",
  },
  {
    slug: "teknologi",
    name: "Teknologi",
    description: "Berita teknologi dan inovasi terbaru",
  },
  {
    slug: "internasional",
    name: "Internasional",
    description: "Berita internasional dan hubungan luar negeri",
  },
  {
    slug: "nasional",
    name: "Nasional",
    description: "Berita nasional Indonesia terkini",
  },
  {
    slug: "hiburan",
    name: "Hiburan",
    description: "Berita hiburan, selebriti, dan lifestyle",
  },
  {
    slug: "kesehatan",
    name: "Kesehatan",
    description: "Berita kesehatan dan tips hidup sehat",
  },
  {
    slug: "pendidikan",
    name: "Pendidikan",
    description: "Berita pendidikan dan dunia akademik",
  },
  {
    slug: "otomotif",
    name: "Otomotif",
    description: "Berita otomotif dan transportasi",
  },
  {
    slug: "langsa",
    name: "Langsa",
    description: "Berita khusus Kota Langsa dan sekitarnya",
  },
  {
    slug: "loker",
    name: "Loker",
    description: "Informasi lowongan kerja dan peluang karir terbaru",
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header - Style seperti halaman Tentang */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Semua Kategori Berita</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Jelajahi berita berdasarkan kategori yang Anda minati. Dari politik hingga lowongan kerja, temukan informasi
          terkini yang relevan dengan minat dan kebutuhan Anda.
        </p>
      </div>

      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-blue-600">
              Beranda
            </a>
          </li>
          <li>{">"}</li>
          <li className="text-gray-900 font-medium">Kategori</li>
        </ol>
      </nav>

      {/* Grid Kategori - Style sederhana */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/kategori/${category.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
              {category.name}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.description}</p>
            <div className="flex justify-end">
              <span className="text-blue-600 text-sm font-medium">Lihat Semua →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
