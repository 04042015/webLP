import { Header } from "@/components/ui/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Teknologi",
    slug: "teknologi",
    description: "Berita terkini seputar teknologi, gadget, dan inovasi digital",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    textColor: "text-blue-600",
    count: 25,
    image: "/placeholder.svg?height=200&width=300",
    trending: true,
  },
  {
    name: "Keuangan",
    slug: "keuangan",
    description: "Tips investasi, analisis pasar, dan berita ekonomi terpercaya",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    textColor: "text-green-600",
    count: 18,
    image: "/placeholder.svg?height=200&width=300",
    trending: false,
  },
  {
    name: "Zodiak",
    slug: "zodiak",
    description: "Ramalan bintang harian, mingguan, dan tips berdasarkan zodiak",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    textColor: "text-purple-600",
    count: 32,
    image: "/placeholder.svg?height=200&width=300",
    trending: true,
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Gaya hidup, fashion, kesehatan, dan tips kehidupan sehari-hari",
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600",
    textColor: "text-pink-600",
    count: 15,
    image: "/placeholder.svg?height=200&width=300",
    trending: false,
  },
  {
    name: "Berita",
    slug: "berita",
    description: "Berita terkini dari dalam dan luar negeri yang akurat dan terpercaya",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    textColor: "text-red-600",
    count: 42,
    image: "/placeholder.svg?height=200&width=300",
    trending: true,
  },
  {
    name: "Olahraga",
    slug: "olahraga",
    description: "Berita olahraga, hasil pertandingan, dan profil atlet terkini",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    textColor: "text-orange-600",
    count: 28,
    image: "/placeholder.svg?height=200&width=300",
    trending: false,
  },
]

const recentArticles = [
  {
    id: 1,
    title: "AI ChatGPT Terbaru Diluncurkan dengan Fitur Voice",
    category: "Teknologi",
    views: 1234,
    date: "2024-01-15",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Saham Tech Melonjak 15% di Bursa Asia",
    category: "Keuangan",
    views: 892,
    date: "2024-01-14",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    title: "Ramalan Zodiak: Leo Beruntung Minggu Ini",
    category: "Zodiak",
    views: 2156,
    date: "2024-01-13",
    image: "/placeholder.svg?height=100&width=150",
  },
]

export default function KategoriPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="kategori" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Semua Kategori
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai kategori artikel menarik yang kami sajikan khusus untuk Anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card
              key={category.slug}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-48">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  {category.trending && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {category.count} artikel
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                <Link href={`/kategori/${category.slug}`}>
                  <Button className={`w-full ${category.color} ${category.hoverColor} text-white`}>
                    Lihat Artikel {category.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Articles by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Artikel Terpopuler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex space-x-3 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative w-20 h-16 flex-shrink-0">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {article.category}
                    </Badge>
                    <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600 mb-1">{article.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.date).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
