"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GeneratePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-article", {
        body: {
          title,
          category,
          author,
        },
      });

      if (error) {
        console.error(error);
        setMessage("❌ Gagal: " + error.message);
      } else {
        console.log(data);
        setMessage("✅ Berhasil generate artikel!");
      }
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Artikel Otomatis</h1>
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
          <input
            type="text"
            className="w-full border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
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
          {loading ? "Generating..." : "Generate Artikel"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {message}
        </div>
      )}
    </div>
  );
}
