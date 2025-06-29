"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomButton } from "@/components/ui/custom-button"
import { Calendar, User, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Daftar kategori
const categories = [
  { name: "Politik", slug: "politik" },
  { name: "Ekonomi", slug: "ekonomi" },
  { name: "Olahraga", slug: "olahraga" },
  { name: "Teknologi", slug: "teknologi" },
  { name: "Internasional", slug: "internasional" },
  { name: "Nasional", slug: "nasional" },
  { name: "Hiburan", slug: "hiburan" },
  { name: "Kesehatan", slug: "kesehatan" },
  { name: "Pendidikan", slug: "pendidikan" },
  { name: "Otomotif", slug: "otomotif" },
  { name: "Langsa", slug: "langsa" },
  { name: "Loker", slug: "loker" },
  { name: "Zodiak", slug: "zodiak" },
]

// Artikel contoh
const articles = [
  {
    id: 1,
    title: "Perkembangan Teknologi AI di Indonesia Tahun 2024",
    excerpt: "AI semakin berkembang pesat di Indonesia...",
    category: "Teknologi",
    author: "Admin",
    date: "2024-01-15",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Tips Investasi Aman untuk Pemula",
    excerpt: "Cara memulai investasi dengan risiko rendah...",
    category: "Ekonomi",
    author: "Editor",
    date: "2024-01-12",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-8">
              <Image src="/assets/logo.png" alt="LangsaPost" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-langsapost-600">LangsaPost</span>
          </Link>
          <Link href="/artikel" className="text-sm text-gray-600 hover:text-black">
            Semua Artikel
          </Link>
        </div>

        {/* Horizontal Category Scroll */}
        <div className="overflow-x-auto whitespace-nowrap border-t border-gray-200">
          <div className="flex space-x-4 px-4 py-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-sm px-3 py-1 rounded-full ${
                  activeCategory === cat.slug
                    ? "bg-langsapost-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-48 md:h-64">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex gap-4 items-center">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("id-ID")}
                </span>
              </div>
              <h2 className="text-xl font-bold hover:text-langsapost-600 transition">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
