"use client"

import { useState } from "react"
import { articleService } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function GenerateArticlePage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug || !form.category || !form.author || !form.content) {
      toast.error("Semua field wajib diisi!")
      return
    }

    setLoading(true)
    try {
      await articleService.createArticle({
        title: form.title,
        slug: form.slug,
        category: form.category,
        author: form.author,
        content: form.content,
        status: "published",
        featured: false,
      })
      toast.success("Artikel berhasil dibuat!")
      setForm({
        title: "",
        slug: "",
        category: "",
        author: "",
        content: "",
      })
    } catch (err) {
      console.error(err)
      toast.error("Gagal membuat artikel. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">🚀 Generate Artikel Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Judul Artikel"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          name="slug"
          placeholder="Slug (tanpa spasi, gunakan tanda -)"
          value={form.slug}
          onChange={handleChange}
        />
        <Input
          name="category"
          placeholder="Kategori"
          value={form.category}
          onChange={handleChange}
        />
        <Input
          name="author"
          placeholder="Penulis"
          value={form.author}
          onChange={handleChange}
        />
        <Textarea
          name="content"
          placeholder="Konten artikel (boleh HTML)"
          value={form.content}
          onChange={handleChange}
          rows={6}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Menyimpan..." : "Generate Artikel"}
        </Button>
      </form>
    </div>
  )
}
