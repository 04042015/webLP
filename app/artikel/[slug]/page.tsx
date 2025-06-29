"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Eye, Share2, Heart } from "lucide-react"
import Image from "next/image"
import { articleService, localStorageService, type Article } from "@/lib/supabase"

export default function ArticleDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const slug = params.slug as string

        // Try Supabase first, fallback to localStorage
        try {
          const articleData = await articleService.getArticleBySlug(slug)
          setArticle(articleData)

          // Increment views
          await articleService.incrementViews(articleData.id)

          // Load related articles
          const related = await articleService.getArticles({
            category: articleData.category,
            limit: 3,
          })
          setRelatedArticles(related.filter((a) => a.id !== articleData.id))
        } catch (supabaseError) {
          console.warn("Supabase not available, using localStorage")
          const articles = localStorageService.getArticles()
          const articleData = articles.find((a) => a.slug === slug)

          if (articleData) {
            setArticle(articleData)

            // Load related articles
            const related = articles
              .filter((a) => a.category === articleData.category && a.id !== articleData.id)
              .slice(0, 3)
            setRelatedArticles(related)
          }
        }
      } catch (error) {
        console.error("Error loading article:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-langsapost-500 mx-auto mb-4"></div>
            <p>Memuat artikel...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600">Artikel yang Anda cari tidak tersedia.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            {article.featured && <Badge className="mb-4 bg-langsapost-500">Featured</Badge>}

            <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {article.views.toLocaleString()} views
              </div>
            </div>

            {article.excerpt && <p className="text-xl text-gray-700 leading-relaxed mb-6">{article.excerpt}</p>}

            {/* Social Share */}
            <div className="flex items-center space-x-4 mb-8">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Suka
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {article.image_url && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image src={article.image_url || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Artikel Terkait</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image_url || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {relatedArticle.category}
                      </Badge>
                      <h4 className="font-bold mb-2 line-clamp-2 hover:text-langsapost-600">
                        <a href={`/artikel/${relatedArticle.slug}`}>{relatedArticle.title}</a>
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
