import { articleService } from "@/lib/supabase"
import ArticleDetailPageClient from "./ArticleDetailPageClient"

export async function generateStaticParams() {
  const articles = await articleService.getArticles({})

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticleDetailPage() {
  return <ArticleDetailPageClient />
}
