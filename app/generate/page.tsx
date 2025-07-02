"use client"

import { useState } from "react"

export default function GenerateArticlePage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!title || !category || !author) {
      setMessage("❗ Mohon isi semua field")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, author })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(`✅ Artikel berhasil dibuat: ${data.slug}`)
      } else {
        setMessage(`❌ Gagal: ${data.error || "Terjadi kesalahan"}`)
      }
    } catch (err) {
      console.error(err)
      setMessage("❌ Error saat mengirim request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-lg font-bold mb-4 text-center">📝 Generate Artikel Otomatis</h1>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan judul artikel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan kategori (misal: Teknologi)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan nama author"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Generate Artikel"}
          </button>

          {message && (
            <div className="mt-3 text-center text-sm">{message}</div>
          )}
        </div>
      </div>
    </div>
  )
}
