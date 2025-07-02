import { notFound } from "next/navigation"
import zodiacData from "@/data/zodiak.json"
import { format } from "date-fns"
import { getDynamicPrediction } from "@/lib/getDynamicPrediction"
import ZodiakShareButtons from "@/components/ZodiakShareButtons"

export async function generateStaticParams() {
  return zodiacData.map((zodiak) => ({
    slug: zodiak.slug,
  }))
}

export default function ZodiakPage({ params }: { params: { slug: string } }) {
  const zodiak = zodiacData.find((z) => z.slug === params.slug)
  if (!zodiak) return notFound()

  const today = new Date()
  const formattedDate = format(today, "yyyy-MM-dd")
  const formattedDateDisplay = format(today, "dd MMMM yyyy")

  const prediction = getDynamicPrediction(zodiak.name, formattedDate)

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4">
      <h1 className="text-center text-lg font-semibold">
        Zodiak Hari Ini - {formattedDateDisplay}
      </h1>
      <div className="text-center text-4xl mt-2">{zodiak.icon} {zodiak.name.toUpperCase()}</div>
      <p className="text-center text-sm mb-2">{zodiak.date_range} • Unsur: {zodiak.element}</p>

      <div className="bg-blue-800 p-4 rounded-lg mt-4 text-center text-lg">
        {prediction}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <div>
          <div>❤️ Cinta:</div>
          <div>★★★★☆</div>
        </div>
        <div>
          <div>💼 Karier:</div>
          <div>★★★★☆</div>
        </div>
        <div>
          <div>💪 Kesehatan:</div>
          <div>★★★★★</div>
        </div>
      </div>

      <div className="text-center mt-4">
        <div>Warna Keberuntungan: <strong>Biru Navy</strong></div>
      </div>

      {/* Import tombol share */}
      <ZodiakShareButtons prediction={prediction} slug={zodiak.slug} name={zodiak.name} />

      <div className="mt-6 text-center">
        <a href="/" className="bg-white text-blue-800 px-4 py-2 rounded">🏠 Kembali ke Homepage</a>
      </div>
    </div>
  )
      }
