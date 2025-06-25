import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Search } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/ui/header"

const articles = [
  {
    id: 1,
    title: "Perkembangan Teknologi AI di Indonesia Tahun 2024",
    excerpt:
      "Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi dan implementasi di berbagai sektor.",
    category: "Teknologi",
    author: "Admin",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Tips Investasi untuk Pemula di Era Digital",
    excerpt: "Panduan lengkap untuk memulai investasi dengan aman dan menguntungkan di era digital ini.",
    category: "Keuangan",
    author: "Editor",
    date: "2024-01-14",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Ramalan Zodiak Minggu Ini: Aries hingga Pisces",
    excerpt: "Simak ramalan bintang untuk semua zodiak minggu ini dan persiapkan diri untuk menghadapi tantangan.",
    category: "Zodiak",
    author: "Astrolog",
    date: "2024-01-13",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Tren Fashion Sustainable di Indonesia",
    excerpt: "Mode berkelanjutan menjadi tren yang semakin populer di kalangan masyarakat Indonesia.",
    category: "Lifestyle",
    author: "Fashion Editor",
    date: "2024-01-12",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Startup Fintech Indonesia Raih Pendanaan Besar",
    excerpt: "Beberapa startup fintech Indonesia berhasil meraih pendanaan dalam jumlah besar untuk ekspansi bisnis.",
    category: "Berita",
    author: "Business Reporter",
    date: "2024-01-11",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Cara Mengelola Keuangan Pribadi yang Efektif",
    excerpt: "Tips dan strategi untuk mengelola keuangan pribadi agar lebih teratur dan menguntungkan.",
    category: "Keuangan",
    author: "Financial Advisor",
    date: "2024-01-10",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ArtikelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header currentPage="artikel" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Semua Artikel</h1>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <p className="text-gray-600">Temukan artikel menarik seputar berbagai topik</p>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Semua
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Teknologi
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Keuangan
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Zodiak
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Lifestyle
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Berita
            </Button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <span>•</span>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {article.author}
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(article.date).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <h3 className="font-bold mb-2 hover:text-blue-600 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                <Button variant="outline" size="sm" className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50">
                  Baca Selengkapnya
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Sebelumnya
            </Button>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              1
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              2
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              3
            </Button>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
