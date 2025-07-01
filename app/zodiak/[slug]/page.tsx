'use client'

import { useParams } from 'next/navigation'
import zodiacData from '@/data/zodiak.json'
import { useEffect, useState } from 'react'

export default function ZodiakDetailPage() {
  const { slug } = useParams()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedHashtag, setCopiedHashtag] = useState(false)

  const zodiak = zodiacData.find((z) => z.name.toLowerCase() === String(slug).toLowerCase())

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const hashtag = `#${zodiak?.name} #ZodiakHarian #LangsaPost`

  const copyToClipboard = (text: string, type: 'link' | 'hashtag') => {
    navigator.clipboard.writeText(text)
    if (type === 'link') {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } else {
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    }
  }

  const shareToWhatsApp = () => {
    const text = `Zodiak hari ini untuk ${zodiak?.name.toUpperCase()}:\n${url}\n\n${hashtag}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  if (!zodiak) {
    return <div className="p-4">Zodiak tidak ditemukan.</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="rounded-xl p-6 text-white" style={{ backgroundColor: getZodiacColor(zodiak.name) }}>
        <div className="text-5xl mb-2">{zodiak.icon}</div>
        <h1 className="text-2xl font-bold capitalize">{zodiak.name}</h1>
        <div className="text-sm">{zodiak.date} • Elemen: {zodiak.element}</div>
      </div>

      <div className="space-y-2 text-gray-800">
        <p>{zodiak.prediction}</p>
        <div>❤️ Cinta: {zodiak.love}</div>
        <div>💼 Karier: {zodiak.career}</div>
        <div>💪 Kesehatan: {zodiak.health}</div>
        <div>🎨 Warna Keberuntungan: {zodiak.lucky}</div>
      </div>

      {/* Tombol Share */}
      <div className="pt-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Bagikan:</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={shareToWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm"
          >
            WhatsApp
          </button>
          <button
            onClick={shareToFacebook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
          >
            Facebook
          </button>
          <button
            onClick={() => copyToClipboard(url, 'link')}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded-full text-sm"
          >
            {copiedLink ? 'Tersalin!' : 'Salin Link'}
          </button>
          <button
            onClick={() => copyToClipboard(hashtag, 'hashtag')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm"
          >
            {copiedHashtag ? 'Tersalin!' : 'Salin Hashtag'}
          </button>
        </div>
      </div>
    </div>
  )
}

function getZodiacColor(name: string) {
  const colors: Record<string, string> = {
    aries: '#f87171',
    taurus: '#34d399',
    gemini: '#facc15',
    cancer: '#60a5fa',
    leo: '#f97316',
    virgo: '#a78bfa',
    libra: '#f472b6',
    scorpio: '#4b5563',
    sagittarius: '#c084fc',
    capricorn: '#6b7280',
    aquarius: '#38bdf8',
    pisces: '#5eead4',
  }
  return colors[name.toLowerCase()] || '#888888'
}
