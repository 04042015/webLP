import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Hanya buat client jika environment variables tersedia
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Types for our database
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

// Article service functions - Netlify compatible
export const articleService = {
  // Get all articles - fallback to localStorage
  async getArticles(filters?: { category?: string; status?: string; limit?: number }) {
    // Try Supabase first if available
    if (supabase) {
      try {
        let query = supabase.from("articles").select("*").order("created_at", { ascending: false })

        if (filters?.category) {
          query = query.eq("category", filters.category)
        }

        if (filters?.status) {
          query = query.eq("status", filters.status)
        }

        if (filters?.limit) {
          query = query.limit(filters.limit)
        }

        const { data, error } = await query

        if (error) throw error
        return data as Article[]
      } catch (error) {
        console.warn("Supabase error, falling back to localStorage:", error)
      }
    }

    // Fallback to localStorage
    return localStorageService.getArticles()
  },

  // Get single article
  async getArticle(id: number) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()
        if (error) throw error
        return data as Article
      } catch (error) {
        console.warn("Supabase error, falling back to localStorage:", error)
      }
    }

    // Fallback to localStorage
    const articles = localStorageService.getArticles()
    const article = articles.find((a) => a.id === id)
    if (!article) throw new Error("Article not found")
    return article
  },

  // Get article by slug
  async getArticleBySlug(slug: string) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()
        if (error) throw error
        return data as Article
      } catch (error) {
        console.warn("Supabase error, falling back to localStorage:", error)
      }
    }

    // Fallback to localStorage
    const articles = localStorageService.getArticles()
    const article = articles.find((a) => a.slug === slug)
    if (!article) throw new Error("Article not found")
    return article
  },

  // Create article - localStorage only untuk Netlify
  async createArticle(articleData: CreateArticleData) {
    return localStorageService.createArticle(articleData)
  },

  // Update article - localStorage only untuk Netlify
  async updateArticle(id: number, articleData: Partial<CreateArticleData>) {
    return localStorageService.updateArticle(id, articleData)
  },

  // Delete article - localStorage only untuk Netlify
  async deleteArticle(id: number) {
    return localStorageService.deleteArticle(id)
  },

  // Increment views - localStorage only untuk Netlify
  async incrementViews(id: number) {
    const articles = localStorageService.getArticles()
    const index = articles.findIndex((a) => a.id === id)
    if (index !== -1) {
      articles[index].views += 1
      localStorageService.saveArticles(articles)
    }
  },
}

// Local storage service - Enhanced untuk Netlify
export const localStorageService = {
  getArticles(): Article[] {
    if (typeof window === "undefined") return []

    const articles = localStorage.getItem("langsapost_articles")
    if (articles) {
      return JSON.parse(articles)
    }

    // Jika belum ada artikel, buat sample articles
    const sampleArticles: Article[] = [
      {
        id: 1,
        title: "Perkembangan Teknologi AI di Indonesia Tahun 2024",
        slug: "perkembangan-teknologi-ai-indonesia-2024",
        excerpt:
          "Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi dan implementasi di berbagai sektor.",
        content:
          "<h2>Perkembangan AI di Indonesia</h2><p>Artificial Intelligence (AI) telah menjadi salah satu teknologi yang paling berpengaruh di era digital ini. Di Indonesia, perkembangan AI menunjukkan tren yang sangat positif dengan berbagai implementasi di berbagai sektor.</p><h3>Sektor yang Terpengaruh</h3><ul><li>Perbankan dan Fintech</li><li>E-commerce</li><li>Kesehatan</li><li>Pendidikan</li></ul><p>Pemerintah Indonesia juga telah menunjukkan komitmen yang kuat dalam mengembangkan ekosistem AI melalui berbagai program dan inisiatif.</p>",
        category: "Teknologi",
        author: "Admin",
        status: "published",
        featured: true,
        image_url: "/placeholder.svg?height=300&width=500",
        views: 1234,
        created_at: "2024-01-15T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z",
      },
      {
        id: 2,
        title: "Tips Investasi untuk Pemula di Era Digital",
        slug: "tips-investasi-pemula-era-digital",
        excerpt: "Panduan lengkap untuk memulai investasi dengan aman dan menguntungkan di era digital ini.",
        content:
          "<h2>Memulai Investasi di Era Digital</h2><p>Investasi di era digital menawarkan berbagai kemudahan dan peluang yang tidak tersedia sebelumnya. Berikut adalah panduan lengkap untuk pemula.</p><h3>Langkah-langkah Memulai</h3><ol><li>Tentukan tujuan investasi</li><li>Pilih platform yang terpercaya</li><li>Diversifikasi portfolio</li><li>Monitor secara berkala</li></ol><p>Ingatlah bahwa investasi selalu memiliki risiko, jadi pastikan untuk melakukan riset yang mendalam sebelum memutuskan.</p>",
        category: "Keuangan",
        author: "Editor",
        status: "published",
        featured: false,
        image_url: "/placeholder.svg?height=300&width=500",
        views: 892,
        created_at: "2024-01-14T00:00:00Z",
        updated_at: "2024-01-14T00:00:00Z",
      },
      {
        id: 3,
        title: "Ramalan Zodiak Minggu Ini: Aries hingga Pisces",
        slug: "ramalan-zodiak-minggu-ini-aries-pisces",
        excerpt: "Simak ramalan bintang untuk semua zodiak minggu ini dan persiapkan diri untuk menghadapi tantangan.",
        content:
          "<h2>Ramalan Zodiak Minggu Ini</h2><p>Minggu ini membawa energi yang berbeda untuk setiap zodiak. Mari kita lihat apa yang menanti Anda.</p><h3>Aries (21 Mar - 19 Apr)</h3><p>Energi Anda sedang tinggi minggu ini. Manfaatkan untuk memulai proyek baru.</p><h3>Taurus (20 Apr - 20 Mei)</h3><p>Fokus pada stabilitas keuangan. Hindari pengeluaran yang tidak perlu.</p><p>Dan seterusnya untuk zodiak lainnya...</p>",
        category: "Zodiak",
        author: "Astrolog",
        status: "published",
        featured: false,
        image_url: "/placeholder.svg?height=300&width=500",
        views: 2156,
        created_at: "2024-01-13T00:00:00Z",
        updated_at: "2024-01-13T00:00:00Z",
      },
    ]

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
}
