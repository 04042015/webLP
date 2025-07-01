import { promises as fs } from 'fs'
import path from 'path'
import { format } from 'date-fns'
import zodiakData from '@/data/zodiak.json'

export async function getTodayZodiak() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const dirPath = path.join(process.cwd(), 'data', 'arsip-zodiak')
  const filePath = path.join(dirPath, `${today}.json`)

  try {
    await fs.access(filePath)
  } catch {
    // Jika file belum ada, buat folder dan file JSON
    await fs.mkdir(dirPath, { recursive: true })
    const data = {
      date: today,
      zodiak: zodiakData,
    }
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  }

  const file = await fs.readFile(filePath, 'utf-8')
  const json = JSON.parse(file)

  return json.zodiak // hanya ambil array zodiaknya
                       }
