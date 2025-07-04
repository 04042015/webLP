"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("LangsaPost AI");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setArticle(null);

    try {
      const res = await fetch("https://batyohvfirsxgduloyvq.supabase.co/functions/v1/generate-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, category, author }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        console.error("Error:", result);
        throw new Error(result.error || "Gagal generate artikel");
      }

      setArticle(result);
      setMessage("✅ Artikel berhasil dibuat!");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Generate Artikel Otomatis</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Kategori</label>
          <select
            className="w-full border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Politik">Politik</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Olahraga">Olahraga</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Internasional">Internasional</option>
            <option value="Nasional">Nasional</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Otomotif">Otomotif</option>
            <option value="Langsa">Langsa</option>
            <option value="Loker">Loker</option>
            <option value="Zodiak">Zodiak</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Penulis</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Generate Artikel"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 border rounded bg-gray-100 text-sm text-gray-700">
          {message}
        </div>
      )}

      {article && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            {article.category} • oleh {article.author}
          </p>
          <div className="whitespace-pre-line">{article.content}</div>
        </div>
      )}
    </div>
  );
}
