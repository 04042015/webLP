import { notFound } from 'next/navigation'
import { getZodiakByDate } from '@/lib/getZodiakByDate'
import { getDynamicPrediction } from "@lib/getDynamicPrediction"

export default async function ArsipZodiak({ params }: { params: { tanggal: string } }) {
  const { tanggal } = params

  if (!tanggal.match(/^\d{4}-\d{2}-\d{2}$/)) notFound()

  let zodiakHariItu = []
  try {
    zodiakHariItu = await getZodiakByDate(tanggal)
  } catch (err) {
    notFound()
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Arsip Zodiak: {tanggal}</h1>
      {zodiakHariItu.map((zodiak, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-4 my-4 border-l-4" style={{ borderColor: getColor(zodiak.name) }}>
          <h2 className="text-xl font-semibold">{zodiak.icon} {capitalize(zodiak.name)}</h2>
          <p className="text-sm text-gray-600">Unsur: {zodiak.element}</p>
          <p className="mt-2">{getDynamicPrediction(zodiak.name,tanggal)}
          </p>
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
