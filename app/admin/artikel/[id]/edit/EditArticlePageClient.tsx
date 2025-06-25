"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArticleForm } from "@/components/admin/article-form"
import { articleService, localStorageService, type Article } from "@/lib/supabase"

export default function EditArticlePageClient() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const id = Number.parseInt(params.id as string)

        // Try Supabase first, fallback to localStorage
        try {
          const articleData = await articleService.getArticle(id)
          setArticle(articleData)
        } catch (supabaseError) {
          console.warn("Supabase not available, using localStorage")
          const articles = localStorageService.getArticles()
          const articleData = articles.find((a) => a.id === id)
          setArticle(articleData || null)
        }
      } catch (error) {
        console.error("Error loading article:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-langsapost-500 mx-auto mb-4"></div>
          <p>Memuat artikel...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600">Artikel yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    )
  }

  return <ArticleForm article={article} />
}
