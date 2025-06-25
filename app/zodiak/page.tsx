import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Zap, Shield } from "lucide-react"
import { Header } from "@/components/ui/header"

const zodiacSigns = [
  {
    name: "Aries",
    date: "21 Mar - 19 Apr",
    element: "Api",
    prediction:
      "Hari ini adalah waktu yang tepat untuk memulai proyek baru. Energi Anda sedang tinggi dan semangat juang menggebu-gebu.",
    love: "★★★★☆",
    career: "★★★★★",
    health: "★★★☆☆",
    lucky: "Merah",
    icon: "🐏",
  },
  {
    name: "Taurus",
    date: "20 Apr - 20 Mei",
    element: "Tanah",
    prediction:
      "Fokus pada stabilitas keuangan hari ini. Hindari pengeluaran yang tidak perlu dan pertimbangkan investasi jangka panjang.",
    love: "★★★☆☆",
    career: "★★★★☆",
    health: "★★★★☆",
    lucky: "Hijau",
    icon: "🐂",
  },
  {
    name: "Gemini",
    date: "21 Mei - 20 Jun",
    element: "Udara",
    prediction:
      "Komunikasi adalah kunci sukses hari ini. Manfaatkan kemampuan berbicara Anda untuk membangun hubungan yang baik.",
    love: "★★★★☆",
    career: "★★★☆☆",
    health: "★★★★☆",
    lucky: "Kuning",
    icon: "👥",
  },
  {
    name: "Cancer",
    date: "21 Jun - 22 Jul",
    element: "Air",
    prediction:
      "Intuisi Anda sangat kuat hari ini. Percayai insting dan jangan ragu untuk mengambil keputusan penting.",
    love: "★★★★★",
    career: "★★★☆☆",
    health: "★★★☆☆",
    lucky: "Perak",
    icon: "🦀",
  },
  {
    name: "Leo",
    date: "23 Jul - 22 Agu",
    element: "Api",
    prediction: "Saatnya untuk bersinar! Kepercayaan diri Anda akan membawa kesuksesan dalam berbagai aspek kehidupan.",
    love: "★★★☆☆",
    career: "★★★★★",
    health: "★★★★☆",
    lucky: "Emas",
    icon: "🦁",
  },
  {
    name: "Virgo",
    date: "23 Agu - 22 Sep",
    element: "Tanah",
    prediction:
      "Perhatian terhadap detail akan membawa hasil yang memuaskan. Organisasi dan perencanaan adalah kunci sukses.",
    love: "★★★★☆",
    career: "★★★★☆",
    health: "★★★★★",
    lucky: "Biru Navy",
    icon: "👩",
  },
  {
    name: "Libra",
    date: "23 Sep - 22 Okt",
    element: "Udara",
    prediction: "Keseimbangan dalam segala hal akan membawa keharmonisan. Hindari konflik dan cari solusi yang adil.",
    love: "★★★★★",
    career: "★★★☆☆",
    health: "★★★☆☆",
    lucky: "Pink",
    icon: "⚖️",
  },
  {
    name: "Scorpio",
    date: "23 Okt - 21 Nov",
    element: "Air",
    prediction:
      "Transformasi besar menanti Anda. Jangan takut untuk melepaskan hal-hal lama demi kemajuan yang lebih baik.",
    love: "★★★☆☆",
    career: "★★★★☆",
    health: "★★★★☆",
    lucky: "Maroon",
    icon: "🦂",
  },
  {
    name: "Sagittarius",
    date: "22 Nov - 21 Des",
    element: "Api",
    prediction: "Petualangan dan pembelajaran baru menanti. Buka pikiran untuk pengalaman dan pengetahuan baru.",
    love: "★★★★☆",
    career: "★★★☆☆",
    health: "★★★★☆",
    lucky: "Ungu",
    icon: "🏹",
  },
  {
    name: "Capricorn",
    date: "22 Des - 19 Jan",
    element: "Tanah",
    prediction:
      "Kerja keras Anda akan segera membuahkan hasil. Tetap fokus pada tujuan jangka panjang dan jangan menyerah.",
    love: "★★★☆☆",
    career: "★★★★★",
    health: "★★★☆☆",
    lucky: "Hitam",
    icon: "🐐",
  },
  {
    name: "Aquarius",
    date: "20 Jan - 18 Feb",
    element: "Udara",
    prediction: "Inovasi dan kreativitas akan membuka peluang baru. Jangan ragu untuk berpikir di luar kotak.",
    love: "★★★★☆",
    career: "★★★★☆",
    health: "★★★★☆",
    lucky: "Biru Elektrik",
    icon: "🏺",
  },
  {
    name: "Pisces",
    date: "19 Feb - 20 Mar",
    element: "Air",
    prediction: "Empati dan intuisi Anda akan membantu orang lain. Jangan lupa untuk juga merawat diri sendiri.",
    love: "★★★★★",
    career: "★★★☆☆",
    health: "★★★☆☆",
    lucky: "Biru Laut",
    icon: "🐟",
  },
]

export default function ZodiakPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <Header currentPage="zodiak" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ramalan Zodiak Hari Ini
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan ramalan bintang Anda hari ini dan persiapkan diri untuk menghadapi tantangan serta peluang yang
            menanti
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-500">Diperbarui setiap hari</span>
          </div>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zodiacSigns.map((sign) => (
            <Card
              key={sign.name}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{sign.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-800">{sign.name}</CardTitle>
                <p className="text-sm text-gray-500">{sign.date}</p>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {sign.element}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">{sign.prediction}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Cinta</span>
                    </div>
                    <span className="text-sm">{sign.love}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Karir</span>
                    </div>
                    <span className="text-sm">{sign.career}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Kesehatan</span>
                    </div>
                    <span className="text-sm">{sign.health}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Warna Keberuntungan:</span>
                    <Badge variant="outline" className="text-xs">
                      {sign.lucky}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ingin Ramalan Lebih Detail?</h3>
              <p className="mb-6">
                Dapatkan ramalan zodiak mingguan dan bulanan dengan analisis mendalam tentang cinta, karir, dan keuangan
                Anda.
              </p>
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Berlangganan Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
