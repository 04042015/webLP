"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomButton } from "@/components/ui/custom-button"
import { BarChart3, Users, FileText, Eye, Plus, Edit, Trash2, Search } from "lucide-react"
import { articleService, localStorageService, type Article } from "@/lib/supabase"
import Link from "next/link"
import { useAuth } from "@/components/auth/admin-auth"

const CATEGORY_OPTIONS = [
  "Politik",
  "Ekonomi",
  "Olahraga",
  "Teknologi",
  "Internasional",
  "Nasional",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Otomotif",
  "Langsa",
  "Loker",
  "Zodiak",
]
const stats = [
  {
    title: "Total Artikel",
    value: "0",
    change: "+12%",
    icon: FileText,
    color: "text-langsapost-600",
  },
  {
    title: "Total Pengunjung",
    value: "24,567",
    change: "+8%",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Artikel Dilihat",
    value: "0",
    change: "+15%",
    icon: Eye,
    color: "text-purple-600",
  },
  {
    title: "Engagement Rate",
    value: "67%",
    change: "+3%",
    icon: BarChart3,
    color: "text-orange-600",
  },
]

export default function AdminPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "dashboard")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const { logout } = useAuth()

  // Load articles
  useEffect(() => {
    const loadArticles = async () => {
      try {
        try {
          const articlesData = await articleService.getArticles()
          setArticles(articlesData)
        } catch (supabaseError) {
          console.warn("Supabase not available, using localStorage")
          const articlesData = localStorageService.getArticles()
          setArticles(articlesData)
        }
      } catch (error) {
        console.error("Error loading articles:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Update stats based on articles
  useEffect(() => {
    if (articles.length > 0) {
      const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
      stats[0].value = articles.length.toString()
      stats[2].value = totalViews.toLocaleString()
    }
  }, [articles])

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || article.category === categoryFilter
    const matchesStatus = !statusFilter || article.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteArticle = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return

    try {
      try {
        await articleService.deleteArticle(id)
      } catch (supabaseError) {
        localStorageService.deleteArticle(id)
      }

      setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch (error) {
      console.error("Error deleting article:", error)
      alert("Gagal menghapus artikel")
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/admin?tab=${tab}`)
    }
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article)
    setShowEditor(true)
  }

  const handleNewArticle = () => {
    setEditingArticle(null)
    setShowEditor(true)
  }

  // Simple inline editor component
  const ArticleEditor = ({
    article,
    onSave,
    onCancel,
  }: {
    article?: Article | null
    onSave: (article: Article) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      title: article?.title || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      category: article?.category || "Teknologi",
      author: article?.author || "Admin",
      status: article?.status || ("draft" as "draft" | "review" | "published"),
      featured: article?.featured || false,
      image_url: article?.image_url || "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      try {
        let savedArticle: Article

        if (article) {
          savedArticle = await articleService.updateArticle(article.id, formData)
        } else {
          savedArticle = await articleService.createArticle(formData)
        }

        onSave(savedArticle)
      } catch (error) {
        console.error("Error saving article:", error)
        alert("Gagal menyimpan artikel")
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{article ? "Edit Artikel" : "Artikel Baru"}</h2>
              <Button variant="ghost" onClick={onCancel}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ringkasan</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Konten</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full p-2 border rounded"
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select
  value={formData.category}
  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
  className="w-full p-2 border rounded"
>
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
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                />
                <label className="text-sm font-medium">Artikel Unggulan</label>
              </div>

              <div className="flex space-x-4">
                <CustomButton type="submit" variant="gradient">
                  {article ? "Update" : "Simpan"}
                </CustomButton>
                <Button type="button" variant="outline" onClick={onCancel}>
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (showEditor) {
    return (
      <ArticleEditor
        article={editingArticle}
        onSave={(savedArticle) => {
          if (editingArticle) {
            setArticles((prev) => prev.map((a) => (a.id === savedArticle.id ? savedArticle : a)))
          } else {
            setArticles((prev) => [savedArticle, ...prev])
          }
          setShowEditor(false)
          setEditingArticle(null)
        }}
        onCancel={() => {
          setShowEditor(false)
          setEditingArticle(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-langsapost-600">
              LangsaPost Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Admin Panel</Badge>
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  window.location.href = "/"
                }}
              >
                Logout
              </CustomButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === "articles" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleTabChange("articles")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Artikel
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                  <p className="text-gray-600">Selamat datang di panel admin LangsaPost</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <Card key={stat.title}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-green-600">{stat.change} dari bulan lalu</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Artikel Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-langsapost-500 mx-auto mb-4"></div>
                        <p>Memuat artikel...</p>
                      </div>
                    ) : articles.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Belum ada artikel</p>
                        <CustomButton variant="gradient" onClick={handleNewArticle}>
                          <Plus className="h-4 w-4 mr-2" />
                          Buat Artikel Pertama
                        </CustomButton>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {articles.slice(0, 5).map((article) => (
                          <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{article.title}</h4>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <Badge variant="secondary">{article.category}</Badge>
                                <span>{article.views} views</span>
                                <span>{new Date(article.created_at).toLocaleDateString("id-ID")}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  article.status === "published"
                                    ? "default"
                                    : article.status === "draft"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {article.status}
                              </Badge>
                              <Button variant="ghost" size="sm" onClick={() => handleEditArticle(article)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "articles" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Kelola Artikel</h1>
                    <p className="text-gray-600">Buat, edit, dan kelola semua artikel</p>
                  </div>
                  <CustomButton variant="gradient" onClick={handleNewArticle}>
                    <Plus className="h-4 w-4 mr-2" />
                    Artikel Baru
                  </CustomButton>
                </div>

                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Cari artikel..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                        />
                      </div>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                      >
                        <option value="">Semua Kategori</option>
                        <option value="Teknologi">Teknologi</option>
                        <option value="Keuangan">Keuangan</option>
                        <option value="Zodiak">Zodiak</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Berita">Berita</option>
                      </select>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                      >
                        <option value="">Semua Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="review">Review</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Articles Table */}
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-langsapost-500 mx-auto mb-4"></div>
                        <p>Memuat artikel...</p>
                      </div>
                    ) : filteredArticles.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {articles.length === 0 ? "Belum ada artikel" : "Tidak ada artikel yang sesuai filter"}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Judul
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kategori
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Views
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArticles.map((article) => (
                              <tr key={article.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900 line-clamp-2">{article.title}</div>
                                  {article.featured && <Badge className="mt-1 bg-langsapost-500">Featured</Badge>}
                                </td>
                                <td className="px-6 py-4">
                                  <Badge variant="secondary">{article.category}</Badge>
                                </td>
                                <td className="px-6 py-4">
                                  <Badge
                                    variant={
                                      article.status === "published"
                                        ? "default"
                                        : article.status === "draft"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {article.status}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{article.views.toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-500">
                                  {new Date(article.created_at).toLocaleDateString("id-ID")}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleEditArticle(article)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700"
                                      onClick={() => handleDeleteArticle(article.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
