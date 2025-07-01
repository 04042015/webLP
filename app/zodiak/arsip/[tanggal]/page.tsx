import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'

interface Params {
  params: {
    tanggal: string
  }
}

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), 'data', 'arsip-zodiak')
  const files = fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : []

  return files.map((file) => ({
    tanggal: file.replace('.json', '')
  }))
}

export default function ArsipZodiak({ params }: Params) {
  const { tanggal } = params

  if (!tanggal.match(/^\d{4}-\d{2}-\d{2}$/)) notFound()

  const filePath = path.join(process.cwd(), 'data', 'arsip-zodiak', `${tanggal}.json`)
  if (!fs.existsSync(filePath)) notFound()

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const zodiakHariItu = data.zodiak || []

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        🔮 Zodiak Hari {format(new Date(tanggal), 'dd MMMM yyyy')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zodiakHariItu.map((zodiak: any) => (
          <Card key={zodiak.slug}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{zodiak.icon}</span>
                <div>
                  <div className="text-lg font-bold capitalize">{zodiak.name}</div>
                  <div className="text-sm text-gray-500">Unsur: {zodiak.element}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{zodiak.prediction}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
