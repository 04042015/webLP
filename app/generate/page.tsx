"use client"

import { useState } from "react"

export default function GenerateArticlePage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Artikel Otomatis Pertama",
          category: "Teknologi",
          author: "Bot"
        })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("✅ Artikel berhasil dibuat: " + data.slug)
      } else {
        setMessage("❌ Gagal: " + (data.error || "Terjadi kesalahan"))
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
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
        <h1 className="text-lg font-bold mb-4">Generate Artikel Otomatis</h1>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Generate Artikel"}
        </button>
        {message && (
          <p className="mt-4 text-sm">{message}</p>
        )}
      </div>
    </div>
  )
}
