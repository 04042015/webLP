import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ArsipZodiakPage() {
  const dirPath = path.join(process.cwd(), 'data', 'arsip-zodiak')
  const files = fs.readdirSync(dirPath).sort().reverse()

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">📅 Arsip Zodiak Harian</h1>
      <ul className="space-y-3">
        {files.map((file) => {
          const date = file.replace('.json', '')
          return (
            <li key={date}>
              <Link
                href={`/zodiak/arsip/${date}`}
                className="text-blue-600 hover:underline"
              >
                Zodiak Tanggal {format(new Date(date), 'dd MMMM yyyy')}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
