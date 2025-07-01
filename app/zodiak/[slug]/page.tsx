import { notFound } from "next/navigation"
import zodiacData from "@/data/zodiak.json"
import Link from "next/link"
import { Metadata } from "next"
import { FaWhatsapp, FaFacebookF, FaLink, FaHashtag } from "react-icons/fa"

export const dynamicParams = false

export async function generateStaticParams() {
  return zodiacData.map((zodiak) => ({ slug: zodiak.name }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const zodiak = zodiacData.find((z) => z.name === params.slug)
  if (!zodiak) return { title: "Zodiak tidak ditemukan" }
  return {
    title: `Ramalan ${zodiak.name} Hari Ini`,
    description: zodiak.prediction,
  }
}

export default function ZodiakPage({ params }: { params: { slug: string } }) {
  const zodiak = zodiacData.find((z) => z.name === params.slug)
  if (!zodiak) return notFound()

  const url = `https://langsapost.vercel.app/zodiak/${zodiak.name}`
  const hashtag = `#${zodiak.name} #ZodiakHariIni #LangsaPost`

  const zodiacOrder = [...zodiacData]
  const currentIndex = zodiacOrder.findIndex(z => z.name === params.slug)
  const prevZodiac = zodiacOrder[currentIndex - 1] || null
  const nextZodiac = zodiacOrder[currentIndex + 1] || null

  const cardColor: Record<string, string> = {
    aries: "bg-red-100",
    taurus: "bg-green-100",
    gemini: "bg-yellow-100",
    cancer: "bg-blue-100",
    leo: "bg-orange-100",
    virgo: "bg-emerald-100",
    libra: "bg-pink-100",
    scorpio: "bg-purple-100",
    sagittarius: "bg-violet-100",
    capricorn: "bg-gray-200",
    aquarius: "bg-sky-100",
    pisces: "bg-cyan-100",
  }

  return (
    <div className={`min-h-screen p-6 md:p-10 ${cardColor[zodiak.name] || "bg-gray-100"}`}>
      <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-6 bg-white space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{zodiak.icon}</span>
          <div>
            <h1 className="text-2xl font-bold capitalize">{zodiak.name}</h1>
            <div className="text-sm text-gray-500">{zodiak.date} — Unsur: {zodiak.element}</div>
          </div>
        </div>
        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Umum:</strong> {zodiak.prediction}</p>
          <p><strong>Cinta:</strong> {zodiak.love}</p>
          <p><strong>Karier:</strong> {zodiak.career}</p>
          <p><strong>Kesehatan:</strong> {zodiak.health}</p>
          <p><strong>Warna Keberuntungan:</strong> {zodiak.lucky}</p>
        </div>

        <div className="pt-4 border-t">
          <h2 className="font-semibold mb-2">Bagikan Ramalan Ini:</h2>
          <div className="flex gap-3">
            <Link href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" className="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full">
              <FaWhatsapp />
            </Link>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
              <FaFacebookF />
            </Link>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="text-white bg-gray-500 hover:bg-gray-600 p-2 rounded-full"
            >
              <FaLink />
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(hashtag)}
              className="text-white bg-purple-500 hover:bg-purple-600 p-2 rounded-full"
            >
              <FaHashtag />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between">
          {prevZodiac && (
            <Link href={`/zodiak/${prevZodiac.name}`} className="text-sm text-blue-600 hover:underline">
              ← {prevZodiac.name}
            </Link>
          )}
          <Link href="/" className="text-sm text-gray-600 hover:underline text-center sm:text-left">
            ⬅️ Kembali ke Zodiak Hari Ini
          </Link>
          {nextZodiac && (
            <Link href={`/zodiak/${nextZodiac.name}`} className="text-sm text-blue-600 hover:underline text-right">
              {nextZodiac.name} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
    }
