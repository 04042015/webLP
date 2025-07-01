import { notFound } from "next/navigation"
import zodiacData from "@/data/zodiak.json"
import { Calendar, HeartPulse, Star, Target } from "lucide-react"
import Link from "next/link"

const colorMap: Record<string, string> = {
  Merah: "#ef4444",
  Hijau: "#10b981",
  Kuning: "#facc15",
  Perak: "#9ca3af",
  Emas: "#f59e0b",
  "Biru Navy": "#1e3a8a",
  Pink: "#ec4899",
  Maroon: "#7f1d1d",
  Ungu: "#8b5cf6",
  Hitam: "#000000",
  "Biru Elektrik": "#3b82f6",
  "Biru Laut": "#0ea5e9",
}

export async function generateStaticParams() {
  return zodiacData.map((z) => ({ slug: z.name }))
}

export default function ZodiakDetail({ params }: { params: { slug: string } }) {
  const zodiak = zodiacData.find((z) => z.name === params.slug)
  if (!zodiak) return notFound()

  const bgColor = colorMap[zodiak.lucky] || "#4b5563" // default abu jika tidak ditemukan

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div
        className="max-w-xl w-full rounded-2xl shadow-2xl text-white p-6 space-y-4"
        style={{
          background: `linear-gradient(135deg, ${bgColor}, #111827)`,
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span>{zodiak.icon}</span> {zodiak.name.toUpperCase()}
          </h1>
          <span className="text-sm opacity-80">{zodiak.date}</span>
        </div>

        <p className="text-sm">{zodiak.prediction}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4" />
            <span>Kesehatan: {zodiak.health}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Karier: {zodiak.career}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Asmara: {zodiak.love}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Warna Keberuntungan: {zodiak.lucky}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block mt-4 text-sm underline text-white/80 hover:text-white"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
        }
