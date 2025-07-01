"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Zap, Shield } from "lucide-react"
import { Header } from "@/components/ui/header"

// Fungsi acak tetap berdasarkan nama zodiak + tanggal
function getDailyValue(name: string, array: string[]) {
  const day = new Date().getDate()
  const seed = name.length + day
  return array[seed % array.length]
}

// Ramalan dan rating acak
const predictions = [
  "Hari penuh energi positif dan kejutan menarik.",
  "Waspadai konflik kecil yang bisa membesar.",
  "Kesempatan emas menanti di depan mata.",
  "Saatnya introspeksi dan perbaikan diri.",
  "Jaga komunikasi dengan orang tersayang.",
  "Rejeki tak terduga bisa datang hari ini.",
  "Jangan ragu untuk membuat keputusan penting.",
  "Bersikap terbuka membawa banyak manfaat."
]

const loveRatings = ["★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★", "★☆☆☆☆"]
const careerRatings = ["★★★☆☆", "★★★★☆", "★★☆☆☆", "★★★★★", "★★★☆☆"]
const healthRatings = ["★★★☆☆", "★★☆☆☆", "★★★★☆", "★★★★★", "★★★☆☆"]
const luckyColors = ["Merah", "Hijau", "Kuning", "Biru", "Ungu", "Putih", "Hitam"]

// Data utama
const zodiacSigns = [
  { name: "Aries", date: "21 Mar - 19 Apr", element: "Api", icon: "🐏" },
  { name: "Taurus", date: "20 Apr - 20 Mei", element: "Tanah", icon: "🐂" },
  { name: "Gemini", date: "21 Mei - 20 Jun", element: "Udara", icon: "👥" },
  { name: "Cancer", date: "21 Jun - 22 Jul", element: "Air", icon: "🦀" },
  { name: "Leo", date: "23 Jul - 22 Agu", element: "Api", icon: "🦁" },
  { name: "Virgo", date: "23 Agu - 22 Sep", element: "Tanah", icon: "👩" },
  { name: "Libra", date: "23 Sep - 22 Okt", element: "Udara", icon: "⚖️" },
  { name: "Scorpio", date: "23 Okt - 21 Nov", element: "Air", icon: "🦂" },
  { name: "Sagittarius", date: "22 Nov - 21 Des", element: "Api", icon: "🏹" },
  { name: "Capricorn", date: "22 Des - 19 Jan", element: "Tanah", icon: "🐐" },
  { name: "Aquarius", date: "20 Jan - 18 Feb", element: "Udara", icon: "🏺" },
  { name: "Pisces", date: "19 Feb - 20 Mar", element: "Air", icon: "🐟" },
].map((sign) => ({
  ...sign,
  prediction: getDailyValue(sign.name, predictions),
  love: getDailyValue(sign.name, loveRatings),
  career: getDailyValue(sign.name, careerRatings),
  health: getDailyValue(sign.name, healthRatings),
  lucky: getDailyValue(sign.name, luckyColors),
}))

export default function ZodiakPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header currentPage="zodiak" />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ramalan Zodiak Hari Ini
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Diperbarui otomatis setiap hari. Baca ramalan cinta, karir, kesehatan, dan warna keberuntungan Anda hari ini.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-500">Berlaku: {new Date().toLocaleDateString("id-ID")}</span>
          </div>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zodiacSigns.map((sign) => (
            <Card
              <Link href={`/zodiak/${sign.name.toLowerCase()}`} key={sign.name}>
  <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
    <CardHeader className="text-center pb-4">
      <div className="text-4xl mb-2">{sign.icon}</div>
      <CardTitle className="text-xl font-bold text-gray-800">{sign.name}</CardTitle>
      <p className="text-sm text-gray-500">{sign.date}</p>
      <Badge variant="secondary" className="w-fit mx-auto">{sign.element}</Badge>
    </CardHeader>

    <CardContent className="space-y-4">
      <p className="text-sm text-gray-700 leading-relaxed">{sign.prediction}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Cinta</h4>
          <span className="text-sm">{sign.love}</span>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Karier</h4>
          <span className="text-sm">{sign.career}</span>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Kesehatan</h4>
          <span className="text-sm">{sign.health}</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Warna Keberuntungan:</span>
            <Badge variant="outline" className="text-xs">{sign.lucky}</Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</Link> 
