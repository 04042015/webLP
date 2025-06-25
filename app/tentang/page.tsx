import { Header } from "@/components/ui/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomButton } from "@/components/ui/custom-button"
import { Users, Target, Award, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Ahmad Rizki",
    position: "Editor in Chief",
    image: "/placeholder.svg?height=200&width=200",
    description: "Berpengalaman 10+ tahun di dunia jurnalistik dan media digital.",
  },
  {
    name: "Sari Dewi",
    position: "Tech Reporter",
    image: "/placeholder.svg?height=200&width=200",
    description: "Spesialis teknologi dan inovasi dengan background IT yang kuat.",
  },
  {
    name: "Budi Santoso",
    position: "Finance Analyst",
    image: "/placeholder.svg?height=200&width=200",
    description: "Ahli keuangan dan investasi dengan sertifikasi CFA.",
  },
]

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="tentang" />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tentang LangsaPost
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Portal berita terpercaya yang menghadirkan informasi terkini, akurat, dan berkualitas untuk masyarakat
            Indonesia. Kami berkomitmen memberikan berita yang objektif dan mendidik.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Target className="h-6 w-6 mr-3" />
                Visi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Menjadi portal berita digital terdepan di Indonesia yang menyajikan informasi berkualitas tinggi,
                terpercaya, dan mudah diakses oleh seluruh lapisan masyarakat.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Award className="h-6 w-6 mr-3" />
                Misi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-700 space-y-2">
                <li>• Menyajikan berita yang akurat dan objektif</li>
                <li>• Memberikan analisis mendalam tentang isu terkini</li>
                <li>• Mendukung literasi digital masyarakat</li>
                <li>• Menjadi platform informasi yang edukatif</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Cerita Kami</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    LangsaPost didirikan pada tahun 2020 dengan visi menjadi sumber informasi terpercaya di era digital.
                    Berawal dari keprihatinan terhadap maraknya hoaks dan misinformasi, kami berkomitmen menghadirkan
                    berita yang faktual dan berimbang.
                  </p>
                  <p>
                    Dengan tim redaksi yang berpengalaman dan jaringan koresponden di berbagai daerah, kami terus
                    berkembang menjadi platform berita yang dipercaya oleh jutaan pembaca di Indonesia.
                  </p>
                  <p>
                    Kami tidak hanya menyajikan berita, tetapi juga konten edukatif seperti tips keuangan, ramalan
                    zodiak, dan artikel lifestyle yang bermanfaat untuk kehidupan sehari-hari.
                  </p>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Tim LangsaPost" fill className="object-cover" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dibalik setiap artikel berkualitas, ada tim profesional yang berdedikasi tinggi untuk memberikan yang
              terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Prinsip-prinsip yang menjadi fondasi dalam setiap karya jurnalistik kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold mb-2">Integritas</h3>
                <p className="text-sm text-blue-100">Menjunjung tinggi kejujuran dan transparansi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="font-bold mb-2">Akurasi</h3>
                <p className="text-sm text-blue-100">Memastikan setiap informasi yang disajikan akurat</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-bold mb-2">Kualitas</h3>
                <p className="text-sm text-blue-100">Mengutamakan kualitas konten di atas kuantitas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold mb-2">Responsif</h3>
                <p className="text-sm text-blue-100">Cepat tanggap terhadap perkembangan berita</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Hubungi Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">redaksi@langsapost.com</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Telepon</h3>
                <p className="text-gray-600">+62 21 1234 5678</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Alamat</h3>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <CustomButton variant="gradient" size="lg">
                Kirim Pesan
              </CustomButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
