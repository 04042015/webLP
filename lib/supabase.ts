
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface Article {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  category: string
  author: string
  status: "draft" | "review" | "published"
  featured: boolean
  image_url?: string
  views: number
  created_at: string
  updated_at: string
}

export interface CreateArticleData {
  title: string
  slug: string
  excerpt?: string
  content: string
  category: string
  author: string
  status?: "draft" | "review" | "published"
  featured?: boolean
  image_url?: string
}

export const articleService = {
  async getArticles(filters?: { category?: string; status?: string; limit?: number }) {
    if (supabase) {
      try {
        let query = supabase.from("articles").select("*").order("created_at", { ascending: false })
        if (filters?.category) query = query.eq("category", filters.category)
        if (filters?.status) query = query.eq("status", filters.status)
        if (filters?.limit) query = query.limit(filters.limit)

        const { data, error } = await query
        if (error) throw error
        return data as Article[]
      } catch (error) {
        console.warn("Supabase error, fallback to localStorage:", error)
      }
    }
    return localStorageService.getArticles()
  },

  async getArticle(id: number) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()
        if (error) throw error
        return data as Article
      } catch (error) {
        console.warn("Supabase error, fallback to localStorage:", error)
      }
    }
    const articles = localStorageService.getArticles()
    const article = articles.find((a) => a.id === id)
    if (!article) throw new Error("Article not found")
    return article
  },

  async getArticleBySlug(slug: string) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()
        if (error) throw error
        return data as Article
      } catch (error) {
        console.warn("Supabase error, fallback to localStorage:", error)
      }
    }
    const articles = localStorageService.getArticles()
    const article = articles.find((a) => a.slug === slug)
    if (!article) throw new Error("Article not found")
    return article
  },

  async createArticle(articleData: CreateArticleData) {
    return localStorageService.createArticle(articleData)
  },

  async updateArticle(id: number, articleData: Partial<CreateArticleData>) {
    return localStorageService.updateArticle(id, articleData)
  },

  async deleteArticle(id: number) {
    return localStorageService.deleteArticle(id)
  },

  async incrementViews(id: number) {
    if (supabase) {
      try {
        const { error: rpcError } = await supabase.rpc("increment_views", { article_id: id })
        if (rpcError) throw rpcError

        const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()
        if (error) throw error
        return data as Article
      } catch (error) {
        console.warn("Supabase error, fallback to localStorage:", error)
      }
    }
    return localStorageService.incrementViews(id)
  },
}

export const localStorageService = {
  getArticles(): Article[] {
    if (typeof window === "undefined") return []
    const articles = localStorage.getItem("langsapost_articles")
    if (articles) return JSON.parse(articles)
    const sampleArticles: Article[] = []
    this.saveArticles(sampleArticles)
    return sampleArticles
  },

  saveArticles(articles: Article[]) {
    if (typeof window === "undefined") return
    localStorage.setItem("langsapost_articles", JSON.stringify(articles))
  },

  createArticle(articleData: CreateArticleData): Article {
    const articles = this.getArticles()
    const newArticle: Article = {
      id: Date.now(),
      ...articleData,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    articles.unshift(newArticle)
    this.saveArticles(articles)
    return newArticle
  },

  updateArticle(id: number, articleData: Partial<CreateArticleData>): Article {
    const articles = this.getArticles()
    const index = articles.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Article not found")
    articles[index] = {
      ...articles[index],
      ...articleData,
      updated_at: new Date().toISOString(),
    }
    this.saveArticles(articles)
    return articles[index]
  },

  deleteArticle(id: number) {
    const articles = this.getArticles()
    const filtered = articles.filter((a) => a.id !== id)
    this.saveArticles(filtered)
  },

  incrementViews(id: number) {
    const articles = this.getArticles()
    const index = articles.findIndex((a) => a.id === id)
    if (index !== -1) {
      articles[index].views += 1
      this.saveArticles(articles)
      return articles[index]
    }
  },
}
