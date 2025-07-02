import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    let query = supabase.from("articles").select("*").order("created_at", { ascending: false })

    if (filters?.category) query = query.eq("category", filters.category)
    if (filters?.status) query = query.eq("status", filters.status)
    if (filters?.limit) query = query.limit(filters.limit)

    const { data, error } = await query
    if (error) throw error
    return data as Article[]
  },

  async getArticle(id: number) {
    const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()
    if (error) throw error
    return data as Article
  },

  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()
    if (error) throw error
    return data as Article
  },

  async createArticle(articleData: CreateArticleData) {
    const { data, error } = await supabase.from("articles").insert([articleData]).select().single()
    if (error) throw error
    return data as Article
  },

  async updateArticle(id: number, articleData: Partial<CreateArticleData>) {
    const { data, error } = await supabase.from("articles").update(articleData).eq("id", id).select().single()
    if (error) throw error
    return data as Article
  },

  async deleteArticle(id: number) {
    const { error } = await supabase.from("articles").delete().eq("id", id)
    if (error) throw error
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc("increment_views", { article_id: id })
    if (error) throw error

    const { data, error: selectError } = await supabase.from("articles").select("*").eq("id", id).single()
    if (selectError) throw selectError
    return data as Article
  },
}
