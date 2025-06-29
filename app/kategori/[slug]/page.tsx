import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

const dataKategori = {
  teknologi: {
    title: "Teknologi",
    deskripsi: "Artikel terbaru tentang teknologi, AI, gadget, dan inovasi digital.",
    artikel: [
      { id: 1, judul: "AI GPT-5 Diluncurkan", slug: "ai-gpt5" },
      { id: 2, judul: "Perbandingan Smartphone 2025", slug: "smartphone-2025" },
    ],
  },
  zodiak: {
    title: "Zodiak",
    deskripsi: "Ramalan dan tips hidup berdasarkan bintang.",
    artikel: [
      { id: 1, judul: "Zodiak Minggu Ini: Leo Beruntung!", slug: "leo-beruntung" },
    ],
  },
  lifestyle: {
    title: "Lifestyle",
    deskripsi: "Tips gaya hidup, kesehatan, dan fashion.",
    artikel: [],
  },
  // tambahkan kategori lainnya di sini...
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Kategori ${params.slug} | LangsaPost`,
  }
}

export default function KategoriDetail({ params }: Props) {
  const kategori = dataKategori[params.slug as keyof typeof dataKategori]

  if (!kategori) return notFound()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{kategori.title}</h1>
      <p className="text-gray-600 mb-6">{kategori.deskripsi}</p>

      <h2 className="text-2xl font-semibold mb-3">Artikel:</h2>
      {kategori.artikel.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {kategori.artikel.map((a) => (
            <li key={a.id}>
              <Link href={`/artikel/${a.slug}`} className="text-blue-600 hover:underline">
                {a.judul}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Belum ada artikel untuk kategori ini.</p>
      )}
    </main>
  )
    }
