'use client'

import { useParams, useRouter } from 'next/navigation'
import data from '@/data/zodiak.json'
import { FaFacebook, FaWhatsapp, FaLink, FaHashtag, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const colorMap: Record<string, string> = {
  merah: 'bg-red-500',
  hijau: 'bg-green-500',
  kuning: 'bg-yellow-400',
  perak: 'bg-gray-300',
  emas: 'bg-yellow-600',
  'biru navy': 'bg-blue-900',
  pink: 'bg-pink-400',
  maroon: 'bg-red-900',
  ungu: 'bg-purple-600',
  hitam: 'bg-black',
  'biru elektrik': 'bg-blue-500',
  'biru laut': 'bg-cyan-500'
}

export default function ZodiakDetail() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const index = data.findIndex((z) => z.name === slug)
  if (index === -1) return <div className="p-4">Zodiak tidak ditemukan.</div>

  const z = data[index]
  const prev = data[(index - 1 + data.length) % data.length].name
  const next = data[(index + 1) % data.length].name

  const luckyColor = z.lucky.toLowerCase()
  const bgColor = colorMap[luckyColor] || 'bg-gray-200'

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const hashtags = `#${z.name} #zodiak #langsapost`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Tersalin!')
  }

  const shareWhatsApp = () => {
    const message = `Baca ramalan zodiak ${z.name.toUpperCase()} hari ini di LangsaPost!\n\n${currentUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
  }

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`)
  }

  return (
    <div className={`min-h-screen ${bgColor} text-white p-4`}>
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center">
          {z.icon} {z.name.toUpperCase()}
        </h1>
        <p className="text-center">{z.date} • Unsur: {z.element}</p>
        <p className="text-lg bg-white/20 p-4 rounded">{z.prediction}</p>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-white/20 p-2 rounded">❤️ Cinta: {z.love}</div>
          <div className="bg-white/20 p-2 rounded">💼 Karier: {z.career}</div>
          <div className="bg-white/20 p-2 rounded">💪 Kesehatan: {z.health}</div>
        </div>

        <div className="bg-white/30 p-3 rounded flex flex-col gap-2">
          <p className="text-sm">Warna Keberuntungan: <strong>{z.lucky}</strong></p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={shareWhatsApp} className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded hover:opacity-80 text-sm">
              <FaWhatsapp /> WhatsApp
            </button>
            <button onClick={shareFacebook} className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded hover:opacity-80 text-sm">
              <FaFacebook /> Facebook
            </button>
            <button onClick={() => copyToClipboard(currentUrl)} className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded hover:opacity-80 text-sm">
              <FaLink /> Salin Link
            </button>
            <button onClick={() => copyToClipboard(hashtags)} className="flex items-center gap-1 bg-purple-700 px-3 py-1 rounded hover:opacity-80 text-sm">
              <FaHashtag /> Salin Hashtag
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <button onClick={() => router.push(`/zodiak/${prev}`)} className="flex items-center gap-1 bg-white/30 px-3 py-1 rounded hover:opacity-80">
            <FaArrowLeft /> {prev.toUpperCase()}
          </button>
          <button onClick={() => router.push(`/zodiak/${next}`)} className="flex items-center gap-1 bg-white/30 px-3 py-1 rounded hover:opacity-80">
            {next.toUpperCase()} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
    }
