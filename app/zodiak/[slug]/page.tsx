'use client'

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Zap, Shield, Copy, Share2 } from "lucide-react"
import zodiakData from "@/data/zodiak.json"

export default function ZodiakDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug?.toLowerCase()
  const zodiak = zodiakData.find((z) => z.name.toLowerCase() === slug)

  if (!zodiak) return notFound()

  const shareText = `Ramalan Zodiak ${zodiak.name} hari ini: ${zodiak.prediction}`
  const hashtags = `#zodiak #${zodiak.name} #ramalanzodiak #langsapost`
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-10">
      <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="text-5xl mb-2">{zodiak.icon}</div>
          <CardTitle className="text-2xl font-bold text-gray-800">{zodiak.name}</CardTitle>
          <p className="text-sm text-gray-500">{zodiak.date}</p>
          <Badge variant="secondary" className="mt-2">{zodiak.element}</Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">{zodiak.prediction}</p>

          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Heart className="h-4 w-4 text-red-500" /> Cinta
              </div>
              <span>{zodiak.love}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-yellow-500" /> Karir
              </div>
              <span>{zodiak.career}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-green-500" /> Kesehatan
              </div>
              <span>{zodiak.health}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Warna Keberuntungan:</span>
              <Badge variant="outline">{zodiak.lucky}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(shareText)}>
              <Copy className="h-4 w-4 mr-2" /> Salin Teks
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(hashtags)}>
              <Copy className="h-4 w-4 mr-2" /> Salin Hashtag
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`)
              }
            >
              <Share2 className="h-4 w-4 mr-2" /> WhatsApp
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
              }
            >
              <Share2 className="h-4 w-4 mr-2" /> Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
            }
