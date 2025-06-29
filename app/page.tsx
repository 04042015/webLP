import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { AdminAccess } from "@/components/ui/admin-access"

// Sample data - in production, this would come from a CMS or database
const featuredArticles = [
  {
    id: 1,
    title: "Perkembangan Teknologi AI di Indonesia Tahun 2024",
    excerpt:
      "Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi dan implementasi di berbagai sektor.",
    category: "Teknologi",
    author: "Admin",
    date: "2024-01-15",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Tips Investasi untuk Pemula di Era Digital",
    excerpt: "Panduan lengkap untuk memulai investasi dengan aman dan menguntungkan di era digital ini.",
    category: "Ekonomi",
    author: "Editor",
    date: "2024-01-14",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Ramalan Zodiak Minggu Ini: Aries hingga Pisces",
    excerpt: "Simak ramalan bintang untuk semua zodiak minggu ini dan persiapkan diri untuk menghadapi tantangan.",
    category: "Zodiak",
    author: "Astrolog",
    date: "2024-01-13",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// UPDATE: 13 Kategori Baru
const categories = [
  { name: "Politik", count: 28, color: "bg-red-500", slug: "politik" },
  { name: "Ekonomi", count: 24, color: "bg-green-500", slug: "ekonomi" },
  { name: "Olahraga", count: 35, color: "bg-blue-500", slug: "olahraga" },
  { name: "Teknologi", count: 25, color: "bg-purple-500", slug: "teknologi" },
  { name: "Internasional", count: 22, color: "bg-indigo-500", slug: "internasional" },
  { name: "Nasional", count: 31, color: "bg-red-600", slug: "nasional" },
  { name: "Hiburan", count: 18, color: "bg-pink-500", slug: "hiburan" },
  { name: "Kesehatan", count: 20, color: "bg-emerald-500", slug: "kesehatan" },
  { name: "Pendidikan", count: 16, color: "bg-yellow-500", slug: "pendidikan" },
  { name: "Otomotif", count: 12, color: "bg-gray-500", slug: "otomotif" },
  { name: "Langsa", count: 45, color: "bg-orange-500", slug: "langsa" },
  { name: "Loker", count: 14, color: "bg-cyan-500", slug: "loker" },
  { name: "Zodiak", count: 32, color: "bg-violet-500", slug: "zodiak" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Top Row - Logo & Brand */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Logo */}
              <div className="w-16 h-12 relative">
                <Image
                  src="/assets/logo.png"
                  alt="LangsaPost Logo"
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
            {/* Login Button - Hidden by default */}
            {(process.env.NODE_ENV === "development" ||
              (typeof window !== "undefined" && window.location.search.includes("admin=true"))) && (
              <Link href="/admin">
                <CustomButton
                  variant="outline"
                  className="bg-white text-langsapost-500 border-langsapost-500 hover:bg-langsapost-50"
                >
                  Login Admin
                </CustomButton>
              </Link>
            )}
          </div>

          {/* Bottom Row - Navigation */}
          <nav className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/"
                  className="text-langsapost-500 border-b-2 border-langsapost-500 pb-1 font-medium transition-colors"
                >
                  Beranda
                </Link>
                <Link href="/artikel" className="text-gray-700 hover:text-langsapost-500 font-medium transition-colors">
                  Artikel
                </Link>

                {/* UPDATE: Kategori Baru - Tampilkan 6 Kategori Utama */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 font-medium text-sm">Kategori:</span>
                  <Link
                    href="/kategori/politik"
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Politik
                  </Link>
                  <Link
                    href="/kategori/ekonomi"
                    className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                  >
                    Ekonomi
                  </Link>
                  <Link
                    href="/kategori/olahraga"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Olahraga
                  </Link>
                  <Link
                    href="/kategori/teknologi"
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    Teknologi
                  </Link>
                  <Link
                    href="/kategori/langsa"
                    className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                  >
                    Langsa
                  </Link>
                  <Link
                    href="/kategori/loker"
                    className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    Loker
                  </Link>
                  <Link
                    href="/kategori/zodiak"
                    className="text-gray-700 hover:text-violet-600 transition-colors font-medium"
                  >
                    Zodiak
                  </Link>
                  <Link
                    href="/kategori"
                    className="text-langsapost-500 hover:text-langsapost-600 font-medium transition-colors"
                  >
                    Lihat Semua →
                  </Link>
                </div>

                {/* Tentang Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-langsapost-500 font-medium transition-colors flex items-center">
                    Tentang
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link
                        href="/tentang"
                        className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                      >
                        Tentang Kami
                      </Link>
                      <Link
                        href="/kontak"
                        className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                      >
                        Kontak
                      </Link>
                      <Link
                        href="/kebijakan"
                        className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                      >
                        Kebijakan Privasi
                      </Link>
                      <Link
                        href="/karir"
                        className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                      >
                        Karir
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Icon */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-langsapost-500 transition-colors hover:bg-langsapost-50 rounded-lg">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Article */}
            {featuredArticles[0] && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={featuredArticles[0].image || "/placeholder.svg"}
                    alt={featuredArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-langsapost-500 hover:bg-langsapost-600">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <Badge variant="secondary">{featuredArticles[0].category}</Badge>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredArticles[0].author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredArticles[0].date).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 hover:text-langsapost-600 cursor-pointer">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-gray-600 mb-4">{featuredArticles[0].excerpt}</p>
                  <CustomButton
                    variant="pill-outline"
                    className="bg-white text-langsapost-600 border-langsapost-600 hover:bg-langsapost-50"
                  >
                    Baca Selengkapnya
                  </CustomButton>
                </CardContent>
              </Card>
            )}

            {/* Recent Articles */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Artikel Terbaru</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.slice(1).map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString("id-ID")}</span>
                      </div>
                      <h4 className="font-bold mb-2 hover:text-langsapost-600 cursor-pointer line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* UPDATE: Categories - Semua 13 Kategori */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Kategori
                  <Link href="/kategori" className="text-sm text-langsapost-500 hover:text-langsapost-600">
                    Lihat Semua
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/kategori/${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-medium hover:text-langsapost-600">{category.name}</span>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Dapatkan update artikel terbaru langsung di email Anda</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  />
                  <CustomButton variant="gradient" className="w-full">
                    Berlangganan
                  </CustomButton>
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Artikel Populer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredArticles.slice(0, 3).map((article, index) => (
                  <div key={article.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <div className="flex-shrink-0 w-12 h-12 bg-langsapost-100 rounded-lg flex items-center justify-center">
                      <span className="text-langsapost-600 font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm line-clamp-2 hover:text-langsapost-600">{article.title}</h5>
                      <p className="text-xs text-gray-500 mt-1">{new Date(article.date).toLocaleDateString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-6 relative">
                  <Image
                    src="/assets/logo.png"
                    alt="LangsaPost Logo"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-gray-400">
                Portal berita terpercaya dengan informasi terkini dan akurat untuk masyarakat Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori Utama</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/kategori/politik" className="hover:text-white">
                    Politik
                  </Link>
                </li>
                <li>
                  <Link href="/kategori/ekonomi" className="hover:text-white">
                    Ekonomi
                  </Link>
                </li>
                <li>
                  <Link href="/kategori/olahraga" className="hover:text-white">
                    Olahraga
                  </Link>
                </li>
                <li>
                  <Link href="/kategori/teknologi" className="hover:text-white">
                    Teknologi
                  </Link>
                </li>
                <li>
                  <Link href="/kategori/langsa" className="hover:text-white">
                    Langsa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tentang</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tentang" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/kebijakan" className="hover:text-white">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/syarat" className="hover:text-white">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span className="sr-only">Facebook</span>📘
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span className="sr-only">Twitter</span>🐦
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span className="sr-only">Instagram</span>📷
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LangsaPost. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Secret Admin Access */}
      <AdminAccess />
    </div>
  )
}
