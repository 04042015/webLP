"use client"

import { useState, useRef, useEffect, use } from "react" 
import { Badge } from "@/components/ui/badge" 
import { Card, CardContent } from "@/components/ui/card" 
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react" 
import Image from "next/image" 
import Link from "next/link" 
import zodiacData from "@/data/zodiak.json" 
import { format } from "date-fns"

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
    image: "/placeholder.svg?height=300&width=500", }, ]

function getDailyZodiacs() {
    const today = new Date().toISOString().slice(0, 10)
    const seed = parseInt(today.replace(/-/g, ""), 10) 
    const shuffled = [...zodiacData].sort((a, b) => {
        const hashA = (a.name.charCodeAt(0) * seed) % 100 
        const hashB = (b.name.charCodeAt(0) * seed) % 100 
        return hashA - hashB 
    }) 
    return shuffled.map((z, i) => ({ ...z, date: today })) 
 }

function ZodiakSlider() { 
    const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => { 
    if (scrollRef.current) {
     scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" }) 
    } 
  }

return ( 
    <div className="relative">
        <button
            onClick={() => scroll("left")} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full" 
        >
            <ArrowLeft className="w-5 h-5" /> 
        </button> 
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        >
    {zodiacData.map((zodiak) => (
      <Link key={zodiak.slug} href={/zodiak/${zodiak.slug}}> 
        <Card className="min-w-[150px] hover:shadow-lg transition"> 
          <CardContent className="p-4 text-center"> 
            <div className="text-3xl">{zodiak.icon}</div> 
            <div className="font-bold text-sm mt-1">{zodiak.name}</div> 
          </CardContent> 
        </Card> 
      </Link> 
    ))} 
  </div> 
  <button
    onClick={() => scroll("right")} 
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full" 
  > 
     <ArrowRight className="w-5 h-5" /> 
   </button> 
 </div>
 ) 
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null) 
  const dailyZodiacs = getDailyZodiacs()  
  const todayFormatted = format(new Date(), "dd MMMM yyyy")

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
          <Link href="/artikel" className="text-sm text-gray-600 hover:text-black"> Semua Artikel 
          </Link>
        </div>

{/* Kategori */}
    <div className="bg-black overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-4 px-4 py-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategori/${cat.slug}`}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-sm text-white font-semibold border-b-2 ${
              activeCategory === cat.slug
                ? "border-white"
                : "border-transparent hover:border-white"
            } pb-1`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  </header>

  {/* Konten Utama */}
  <main className="container mx-auto px-4 py-6 space-y-6">

    {/* SLIDER ZODIAK */}
    <section>
      <h2 className="text-xl font-bold text-langsapost-600 mb-2">🔮 Ramalan Zodiak Hari Ini</h2>
      <ZodiakSlider />
    </section>

    {/* Artikel */}
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

    {/* Zodiak Hari Ini - Grid */}
    <section className="pt-6">
      <h2 className="text-xl font-bold mb-4 text-langsapost-600">Zodiak Hari Ini, {todayFormatted}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dailyZodiacs.map((zodiak) => (
          <Card key={zodiak.slug}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{zodiak.icon}</span>
                <div>
                  <Link href={`/zodiak/${zodiak.slug}`} className="text-lg font-semibold hover:text-langsapost-600">
                    {zodiak.name}
                  </Link>
                  <div className="text-xs text-gray-500">{zodiak.date}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{zodiak.prediction.slice(0, 100)}...</p>
              <Link href={`/zodiak/${zodiak.slug}`} className="text-sm text-blue-600 hover:underline">
                Baca Selengkapnya →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </main>

  {/* Footer */}
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
        <p>&copy; 2025 LangsaPost. Semua hak dilindungi.</p>
      </div>
    </div>
  </footer>
</div>

) }

