import Link from "next/link"

const AVAILABLE_CATEGORIES = [
  { slug: "politik", name: "Politik" },
  { slug: "ekonomi", name: "Ekonomi" },
  { slug: "olahraga", name: "Olahraga" },
  { slug: "teknologi", name: "Teknologi" },
  { slug: "internasional", name: "Internasional" },
  { slug: "nasional", name: "Nasional" },
  { slug: "hiburan", name: "Hiburan" },
  { slug: "kesehatan", name: "Kesehatan" },
  { slug: "pendidikan", name: "Pendidikan" },
  { slug: "otomotif", name: "Otomotif" },
  { slug: "langsa", name: "Langsa" },
  { slug: "loker", name: "Loker" },
  { slug: "zodiak", name: "Zodiak" },
]

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Kategori Tidak Ditemukan</h2>
        <p className="text-lg text-gray-600 mb-8">Maaf, kategori yang Anda cari tidak tersedia di LangsaPost.</p>

        <div className="mb-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Kategori yang Tersedia:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AVAILABLE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/kategori/${category.slug}`}
                className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
              >
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
