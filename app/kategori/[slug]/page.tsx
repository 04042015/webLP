import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Data kategori untuk LangsaPost (dengan tambahan Zodiak)
const CATEGORIES = {
  politik: {
    name: "Politik",
    description: "Berita politik terkini dan analisis mendalam",
  },
  ekonomi: {
    name: "Ekonomi",
    description: "Berita ekonomi, bisnis, dan keuangan terbaru",
  },
  olahraga: {
    name: "Olahraga",
    description: "Berita olahraga dan hasil pertandingan terkini",
  },
  teknologi: {
    name: "Teknologi",
    description: "Berita teknologi dan inovasi terbaru",
  },
  internasional: {
    name: "Internasional",
    description: "Berita internasional dan hubungan luar negeri",
  },
  nasional: {
    name: "Nasional",
    description: "Berita nasional Indonesia terkini",
  },
  hiburan: {
    name: "Hiburan",
    description: "Berita hiburan, selebriti, dan lifestyle",
  },
  kesehatan: {
    name: "Kesehatan",
    description: "Berita kesehatan dan tips hidup sehat",
  },
  pendidikan: {
    name: "Pendidikan",
    description: "Berita pendidikan dan dunia akademik",
  },
  otomotif: {
    name: "Otomotif",
    description: "Berita otomotif dan transportasi",
  },
  langsa: {
    name: "Langsa",
    description: "Berita khusus Kota Langsa dan sekitarnya",
  },
  loker: {
    name: "Loker",
    description: "Informasi lowongan kerja dan peluang karir terbaru",
  },
  zodiak: {
    name: "Zodiak",
    description: "Ramalan zodiak harian dan informasi astrologi",
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES[params.slug as keyof typeof CATEGORIES]

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan - LangsaPost",
    }
  }

  return {
    title: `${category.name} - LangsaPost`,
    description: `${category.description} - Baca berita ${category.name.toLowerCase()} terbaru di LangsaPost`,
    keywords: `berita ${category.name.toLowerCase()}, ${category.name} terbaru, LangsaPost`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES[params.slug as keyof typeof CATEGORIES]

  // Jika kategori tidak ditemukan, tampilkan 404
  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Kategori - Style seperti halaman Tentang */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kategori {category.name}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{category.description}</p>
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
          <li>
            <a href="/kategori" className="hover:text-blue-600">
              Kategori
            </a>
          </li>
          <li>{">"}</li>
          <li className="text-gray-900 font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Daftar Artikel */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder artikel dengan konten yang disesuaikan per kategori */}
        <ArticleCard
          title={getArticleTitle(category.name, 1)}
          excerpt={getArticleExcerpt(category.name, 1)}
          category={category.name}
          slug="artikel-terbaru-1"
          date="2024-01-15"
          author="Tim Redaksi"
        />
        <ArticleCard
          title={getArticleTitle(category.name, 2)}
          excerpt={getArticleExcerpt(category.name, 2)}
          category={category.name}
          slug="artikel-update-2"
          date="2024-01-14"
          author="Reporter LangsaPost"
        />
        <ArticleCard
          title={getArticleTitle(category.name, 3)}
          excerpt={getArticleExcerpt(category.name, 3)}
          category={category.name}
          slug="artikel-analisis-3"
          date="2024-01-13"
          author="Analis Senior"
        />
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Sebelumnya
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Selanjutnya</button>
        </div>
      </div>
    </div>
  )
}

// Fungsi untuk generate judul artikel sesuai kategori
function getArticleTitle(category: string, index: number): string {
  switch (category) {
    case "Loker":
      return index === 1
        ? "Lowongan Kerja Terbaru Hari Ini"
        : index === 2
          ? "Update Loker: Peluang Karir Menarik"
          : "Tips Karir: Panduan Sukses Berkarir"
    case "Zodiak":
      return index === 1
        ? "Ramalan Zodiak Hari Ini"
        : index === 2
          ? "Update Zodiak: Prediksi Mingguan"
          : "Analisis Astrologi: Pengaruh Bintang"
    default:
      return index === 1
        ? `Berita ${category} Terbaru Hari Ini`
        : index === 2
          ? `Update ${category}: Informasi Penting`
          : `Analisis Mendalam: ${category}`
  }
}

// Fungsi untuk generate excerpt artikel sesuai kategori
function getArticleExcerpt(category: string, index: number): string {
  switch (category) {
    case "Loker":
      return index === 1
        ? "Temukan peluang karir terbaru dan lowongan kerja yang sesuai dengan keahlian Anda..."
        : index === 2
          ? "Informasi penting seputar dunia kerja yang dapat membantu mengembangkan karir Anda..."
          : "Tips dan panduan praktis untuk meningkatkan peluang sukses dalam berkarir..."
    case "Zodiak":
      return index === 1
        ? "Simak ramalan bintang hari ini untuk semua zodiak dan temukan prediksi keberuntungan Anda..."
        : index === 2
          ? "Update prediksi zodiak mingguan dengan analisis mendalam tentang pengaruh planet..."
          : "Analisis astrologi komprehensif tentang pengaruh pergerakan bintang terhadap kehidupan..."
    default:
      return `Simak perkembangan terbaru di bidang ${category.toLowerCase()} yang perlu Anda ketahui dan pahami...`
  }
}

// Komponen untuk card artikel - style sederhana
function ArticleCard({
  title,
  excerpt,
  category,
  slug,
  date,
  author,
}: {
  title: string
  excerpt: string
  category: string
  slug: string
  date: string
  author: string
}) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Placeholder Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Foto Berita</span>
      </div>

      <div className="p-6">
        {/* Kategori dan Tanggal */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-blue-600 font-medium">{category}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Judul */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{title}</h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Oleh: {author}</span>
          <a href={`/artikel/${slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Baca Selengkapnya →
          </a>
        </div>
      </div>
    </article>
  )
}

// Generate static params untuk semua kategori
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug: slug,
  }))
}
