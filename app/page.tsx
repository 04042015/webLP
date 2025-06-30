"use client" import { useState } from "react" import { Badge } from "@/components/ui/badge" import { Card, CardContent } from "@/components/ui/card" import { Calendar, User } from "lucide-react" import Image from "next/image" import Link from "next/link" import zodiacData from "./data/zodiak.json"

const categories = [ { name: "Politik", slug: "politik" }, { name: "Ekonomi", slug: "ekonomi" }, { name: "Olahraga", slug: "olahraga" }, { name: "Teknologi", slug: "teknologi" }, { name: "Internasional", slug: "internasional" }, { name: "Nasional", slug: "nasional" }, { name: "Hiburan", slug: "hiburan" }, { name: "Kesehatan", slug: "kesehatan" }, { name: "Pendidikan", slug: "pendidikan" }, { name: "Otomotif", slug: "otomotif" }, { name: "Langsa", slug: "langsa" }, { name: "Loker", slug: "loker" }, { name: "Zodiak", slug: "zodiak" }, ]

const articles = [ { id: 1, title: "Perkembangan Teknologi AI di Indonesia Tahun 2024", excerpt: "AI semakin berkembang pesat di Indonesia...", category: "Teknologi", author: "Admin", date: "2024-01-15", image: "/placeholder.svg?height=300&width=500", }, { id: 2, title: "Tips Investasi Aman untuk Pemula", excerpt: "Cara memulai investasi dengan risiko rendah...", category: "Ekonomi", author: "Editor", date: "2024-01-12", image: "/placeholder.svg?height=300&width=500", }, ]

export default function HomePage() { const [activeCategory, setActiveCategory] = useState<string | null>(null)

return ( <div className="min-h-screen bg-white text-black"> {/* Header */} <header className="bg-white border-b sticky top-0 z-50"> <div className="container mx-auto px-4 py-4 flex items-center justify-between"> <Link href="/" className="flex items-center space-x-2"> <div className="relative w-10 h-8"> <Image src="/assets/logo.png" alt="LangsaPost" fill className="object-contain" /> </div> <span className="text-lg font-bold text-langsapost-600">LangsaPost</span> </Link> <Link href="/artikel" className="text-sm text-gray-600 hover:text-black"> Semua Artikel </Link> </div>

{/* Horizontal Kategori ala Kompas */}
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

  {/* Artikel */}
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

    {/* Zodiak Hari Ini */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-langsapost-600">Zodiak Hari Ini</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {zodiacData.slice(0, 3).map((sign) => (
          <Link
            key={sign.slug}
            href={`/zodiak/${sign.slug}`}
            className="p-4 bg-white border rounded-lg hover:shadow transition duration-300"
          >
            <div className="flex items-center space-x-4 mb-2">
              <div className="text-4xl">{sign.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{sign.name}</h3>
                <p className="text-sm text-gray-500">{sign.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">{sign.prediction}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-right">
        <Link
          href="/zodiak"
          className="text-langsapost-500 hover:text-langsapost-600 font-medium transition-colors"
        >
          Lihat Semua Zodiak →
        </Link>
      </div>
    </div>
  </main>

  {/* Footer Profesional */}
  <footer className="bg-gray-900 text-white py-12 mt-8">
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
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/kategori/${cat.slug}`} className="hover:text-white">
                  {cat.name}
                </Link>
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
            <li><Link href="/syarat" className="hover:text-white">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex space-x-4">
            <button className="bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-1 rounded-full">📘</button>
            <button className="bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-1 rounded-full">🐦</button>
            <button className="bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-1 rounded-full">📷</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 LangsaPost. Semua hak dilindungi.</p>
      </div>
    </div>
  </footer>
</div>

) }

