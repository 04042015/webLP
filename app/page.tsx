"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { AdminAccess } from "@/components/ui/admin-access"

// Data Artikel & Kategori
const featuredArticles = [
  {
    id: 1,
    title: "Perkembangan Teknologi AI di Indonesia Tahun 2024",
    excerpt: "Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi dan implementasi di berbagai sektor.",
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
          {/* Logo dan Admin */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-16 h-12 relative">
                <Image src="/assets/logo.png" alt="LangsaPost Logo" fill className="object-contain" priority />
              </div>
            </Link>
            {(process.env.NODE_ENV === "development" ||
              (typeof window !== "undefined" && window.location.search.includes("admin=true"))) && (
              <Link href="/admin">
                <CustomButton variant="outline" className="bg-white text-langsapost-500 border-langsapost-500 hover:bg-langsapost-50">
                  Login Admin
                </CustomButton>
              </Link>
            )}
          </div>

          {/* Nav */}
          <nav className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/" className="text-langsapost-500 border-b-2 border-langsapost-500 pb-1 font-medium">
                  Beranda
                </Link>
                <Link href="/artikel" className="text-gray-700 hover:text-langsapost-500 font-medium">
                  Artikel
                </Link>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-gray-500 text-sm">Kategori:</span>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/kategori/${cat.slug}`}
                      className="text-gray-700 hover:text-langsapost-500 font-medium transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <Link href="/kategori" className="text-langsapost-500 hover:text-langsapost-600 font-medium">
                  Lihat Semua →
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-langsapost-500 hover:bg-langsapost-50 rounded-lg">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artikel Utama */}
          <div className="lg:col-span-2">
            {featuredArticles[0] && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image src={featuredArticles[0].image} alt={featuredArticles[0].title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-langsapost-500">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <Badge variant="secondary">{featuredArticles[0].category}</Badge>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />{featuredArticles[0].author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredArticles[0].date).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{featuredArticles[0].title}</h3>
                  <p className="text-gray-600 mb-4">{featuredArticles[0].excerpt}</p>
                  <CustomButton variant="pill-outline" className="bg-white border-langsapost-600 text-langsapost-600 hover:bg-langsapost-50">
                    Baca Selengkapnya
                  </CustomButton>
                </CardContent>
              </Card>
            )}

            {/* Artikel Terbaru */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Artikel Terbaru</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.slice(1).map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg">
                    <div className="relative h-48">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString("id-ID")}</span>
                      </div>
                      <h4 className="font-bold mb-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Kategori
                  <Link href="/kategori" className="text-sm text-langsapost-500 hover:text-langsapost-600">Lihat Semua</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/kategori/${cat.slug}`} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                      <span>{cat.name}</span>
                    </div>
                    <Badge variant="secondary">{cat.count}</Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-6 relative">
                <Image src="/assets/logo.png" alt="LangsaPost Logo" fill className="object-contain brightness-0 invert" />
              </div>
            </div>
            <p className="text-gray-400">Portal berita terpercaya dengan informasi terkini dan akurat untuk masyarakat Indonesia.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kategori Utama</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/kategori/${cat.slug}`} className="hover:text-white">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tentang</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tentang" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
              <li><Link href="/kebijakan" className="hover:text-white">Kebijakan Privasi</Link></li>
              <li><Link href="/karir" className="hover:text-white">Karir</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">📘</Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">🐦</Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">📷</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LangsaPost. Semua hak dilindungi.</p>
        </div>
      </footer>

      <AdminAccess />
    </div>
  )
      }
