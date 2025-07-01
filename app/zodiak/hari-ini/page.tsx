'use client'

import { useEffect, useState } from 'react'
import zodiakData from '@/data/zodiak.json'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function ZodiakHariIniPage() {
  const [tanggal, setTanggal] = useState('')
  const [zodiakHariIni, setZodiakHariIni] = useState([])

  useEffect(() => {
    const today = new Date()
    const tglFormat = format(today, 'yyyy-MM-dd')
    const tglDisplay = format(today, "dd MMMM yyyy", { locale: id })
    setTanggal(tglFormat)

    // Rotasi berdasarkan tanggal (satu zodiak ditampilkan duluan)
    const offset = today.getDate() % zodiakData.length
    const rotated = [...zodiakData.slice(offset), ...zodiakData.slice(0, offset)]
    setZodiakHariIni(rotated)
  }, [])

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Zodiak Hari Ini - {tanggal}</h1>
      <Link href={`/zodiak/arsip/${tanggal}`} className="text-sm text-blue-500 underline">Lihat Arsip Hari Ini</Link>

      {zodiakHariIni.map((zodiak, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-4 my-4 border-l-4" style={{ borderColor: getColor(zodiak.name) }}>
          <h2 className="text-xl font-semibold">{zodiak.icon} {capitalize(zodiak.name)}</h2>
          <p className="text-sm text-gray-600">{zodiak.date} • Unsur: {zodiak.element}</p>
          <p className="mt-2">{zodiak.prediction}</p>
        </div>
      ))}

      <Link href="/" className="mt-4 inline-block text-blue-500 underline">← Kembali ke Beranda</Link>
    </main>
  )
}

function getColor(name: string) {
  const colors: { [key: string]: string } = {
    aries: '#f87171',
    taurus: '#34d399',
    gemini: '#facc15',
    cancer: '#60a5fa',
    leo: '#fbbf24',
    virgo: '#10b981',
    libra: '#c084fc',
    scorpio: '#f43f5e',
    sagittarius: '#3b82f6',
    capricorn: '#9ca3af',
    aquarius: '#06b6d4',
    pisces: '#8b5cf6',
  }
  return colors[name] || '#e5e7eb'
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
    }
