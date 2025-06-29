import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LangsaPost - Portal Berita Terpercaya Langsa",
  description:
    "Portal berita terpercaya dengan informasi terkini dan akurat untuk masyarakat Langsa dan Indonesia. Berita Politik, Ekonomi, Olahraga, Teknologi, dan kategori lainnya.",
  keywords:
    "berita langsa, langsapost, berita aceh, portal berita, berita terkini, politik, ekonomi, olahraga, teknologi",
  authors: [{ name: "LangsaPost Team" }],
  creator: "LangsaPost",
  publisher: "LangsaPost",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://langsapost-xi.vercel.app"),
  openGraph: {
    title: "LangsaPost - Portal Berita Terpercaya",
    description: "Portal berita terpercaya dengan informasi terkini dan akurat untuk masyarakat Langsa dan Indonesia.",
    url: "https://langsapost-xi.vercel.app",
    siteName: "LangsaPost",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LangsaPost - Portal Berita Terpercaya",
    description: "Portal berita terpercaya dengan informasi terkini dan akurat untuk masyarakat Langsa dan Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  )
}
