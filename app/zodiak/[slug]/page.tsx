'use client'

import { useParams } from 'next/navigation'
import zodiacData from '@/data/zodiak.json'
import { useState } from 'react'
import { FaFacebook, FaWhatsapp, FaHashtag, FaLink } from 'react-icons/fa'

export default function ZodiakDetailPage() {
  const { slug } = useParams()
  const [copied, setCopied] = useState({ link: false, hashtag: false })

  const zodiak = zodiacData.find((z) => z.name.toLowerCase() === String(slug).toLowerCase())
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const hashtag = `#${zodiak?.name} #ZodiakHarian #LangsaPost`

  const copyToClipboard = (text: string, type: 'link' | 'hashtag') => {
    navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [type]: true }))
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000)
  }

  const shareToWhatsApp = () => {
    const message = `Zodiak hari ini untuk ${zodiak?.name}:\n${url}\n\n${hashtag}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  if (!zodiak) return <div className="p-4">Zodiak tidak ditemukan.</div>

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div
        className="rounded-2xl text-white p-6 space-y-4 shadow-md"
        style={{ backgroundColor: getZodiacColor(zodiak.name) }}
      >
        <div className="text-5xl">{zodiak.icon}</div>
        <h1 className="text-3xl font-bold capitalize">{zodiak.name}</h1>
        <p className="text-sm italic">{zodiak.date} • Elemen: {zodiak.element}</p>
        <hr className="opacity-30" />

        <p className="text-base">{zodiak.prediction}</p>
        <ul className="text-sm space-y-1">
          <li>❤️ Cinta: {zodiak.love}</li>
          <li>💼 Karier: {zodiak.career}</li>
          <li>💪 Kesehatan: {zodiak.health}</li>
          <li>🎨 Warna Keberuntungan: {zodiak.lucky}</li>
        </ul>

        <div className="pt-4">
          <h2 className="font-semibold mb-2">Bagikan:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={shareToWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <FaWhatsapp /> WhatsApp
            </button>
            <button
              onClick={shareToFacebook}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <FaFacebook /> Facebook
            </button>
            <button
              onClick={() => copyToClipboard(url, 'link')}
              className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <FaLink />
              {copied.link ? 'Tersalin!' : 'Salin Link'}
            </button>
            <button
              onClick={() => copyToClipboard(hashtag, 'hashtag')}
              className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <FaHashtag />
              {copied.hashtag ? 'Tersalin!' : 'Salin Hashtag'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getZodiacColor(name: string) {
  const colors: Record<string, string> = {
    aries: '#ef4444', // merah
    taurus: '#22c55e', // hijau
    gemini: '#eab308', // kuning
    cancer: '#3b82f6', // biru
    leo: '#f97316', // oranye
    virgo: '#8b5cf6', // ungu
    libra: '#ec4899', // pink
    scorpio: '#6b7280', // abu gelap
    sagittarius: '#a855f7',
    capricorn: '#4b5563',
    aquarius: '#0ea5e9',
    pisces: '#14b8a6',
  }
  return colors[name.toLowerCase()] || '#888888'
              }
