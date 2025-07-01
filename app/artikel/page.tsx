import Link from "next/link"
import { articleService } from "@/lib/supabase"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic" // Pakai fetch server-side setiap request

export default async function ArtikelListPage() {
  // Ambil data artikel dari Supabase
  const articles = await articleService.getArticles({})

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-langsapost-600">📚 Semua Artikel</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel tersedia.</p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition">
              <CardContent className="p-4 space-y-2">
                <div className="text-sm text-gray-500 flex gap-4 items-center">
                  <Badge variant="secondary">{article.category || "Umum"}</Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <Link href={`/artikel/${article.slug}`} className="block">
                  <h2 className="text-xl font-bold hover:text-langsapost-600 transition">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
