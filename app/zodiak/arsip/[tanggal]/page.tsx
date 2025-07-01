import { notFound } from 'next/navigation'
import zodiakData from '@/data/zodiak.json'

export async function generateStaticParams() {
  // Simulasikan daftar tanggal arsip
  return ['2025-07-01', '2025-07-02', '2025-07-03'].map((tanggal) => ({
    tanggal,
  }))
}

export default function ArsipZodiak({ params }: { params: { tanggal: string } }) {
  const { tanggal } = params

  if (!tanggal.match(/^\d{4}-\d{2}-\d{2}$/)) {
    notFound()
  }

  // Simulasikan hasil zodiak per tanggal
  const offset = new Date(tanggal).getDate() % zodiakData.length
  const zodiakHariItu = [...zodiakData.slice(offset), ...zodiakData.slice(0, offset)]

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Arsip Zodiak: {tanggal}</h1>
      {zodiakHariItu.map((zodiak, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-4 my-4 border-l-4" style={{ borderColor: getColor(zodiak.name) }}>
          <h2 className="text-xl font-semibold">{zodiak.icon} {capitalize(zodiak.name)}</h2>
          <p className="text-sm text-gray-600">{zodiak.date} • Unsur: {zodiak.element}</p>
          <p className="mt-2">{zodiak.prediction}</p>
        </div>
      ))}
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
