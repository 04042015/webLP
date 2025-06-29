import EditArticlePageClient from "./EditArticlePageClient"

// Add generateStaticParams for static export
export async function generateStaticParams() {
  // Return empty array for static export - pages will be generated on demand
  return []
}

export default function EditArticlePage() {
  return <EditArticlePageClient />
}
