"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomButton } from "@/components/ui/custom-button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { generateSlug } from "@/lib/utils/slug"
import { articleService, localStorageService, type Article, type CreateArticleData } from "@/lib/supabase"
import { ArrowLeft, Save, Eye, Upload } from "lucide-react"

interface ArticleFormProps {
  article?: Article
  onSave?: (article: Article) => void
}

const categories = ["Teknologi", "Keuangan", "Zodiak", "Lifestyle", "Berita", "Olahraga"]

const statusOptions = [
  { value: "draft", label: "Draft", color: "bg-gray-500" },
  { value: "review", label: "Review", color: "bg-yellow-500" },
  { value: "published", label: "Published", color: "bg-green-500" },
]

export function ArticleForm({ article, onSave }: ArticleFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateArticleData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Teknologi",
    author: "Admin",
    status: "draft",
    featured: false,
    image_url: "",
  })

  // Load article data if editing
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content,
        category: article.category,
        author: article.author,
        status: article.status,
        featured: article.featured,
        image_url: article.image_url || "",
      })
    }
  }, [article])

  // Auto-generate slug from title
  useEffect(() => {
    if (!article && formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(formData.title),
      }))
    }
  }, [formData.title, article])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let savedArticle: Article

      // Try Supabase first, fallback to localStorage
      try {
        if (article) {
          savedArticle = await articleService.updateArticle(article.id, formData)
        } else {
          savedArticle = await articleService.createArticle(formData)
        }
      } catch (supabaseError) {
        console.warn("Supabase not available, using localStorage:", supabaseError)

        if (article) {
          savedArticle = localStorageService.updateArticle(article.id, formData)
        } else {
          savedArticle = localStorageService.createArticle(formData)
        }
      }

      onSave?.(savedArticle)
      router.push("/admin?tab=articles")
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Gagal menyimpan artikel. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a service like Supabase Storage
      // For demo, we'll use a placeholder
      const imageUrl = `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(file.name)}`
      setFormData((prev) => ({ ...prev, image_url: imageUrl }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push("/admin?tab=articles")} className="hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">{article ? "Edit Artikel" : "Artikel Baru"}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Badge className={`${statusOptions.find((s) => s.value === formData.status)?.color} text-white`}>
            {statusOptions.find((s) => s.value === formData.status)?.label}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Judul Artikel</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul artikel..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500 text-lg"
                  required
                />
              </CardContent>
            </Card>

            {/* Slug */}
            <Card>
              <CardHeader>
                <CardTitle>URL Slug</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-artikel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">URL: /artikel/{formData.slug}</p>
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat artikel..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                />
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Konten Artikel</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Tulis konten artikel di sini..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Publikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as "draft" | "review" | "published",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-gray-300 text-langsapost-500 focus:ring-langsapost-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Artikel Unggulan
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Gambar Utama</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.image_url && (
                  <div className="relative">
                    <img
                      src={formData.image_url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Gambar
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <CustomButton type="submit" variant="gradient" className="w-full" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Menyimpan..." : article ? "Update Artikel" : "Simpan Artikel"}
                  </CustomButton>

                  {formData.status === "published" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`/artikel/${formData.slug}`, "_blank")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
