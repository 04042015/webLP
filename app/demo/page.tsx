"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Download, Share, Play, ShoppingCart, Send, Zap, Sparkles, Rocket, Crown } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              LangsaPost
            </Link>
            <Badge variant="secondary">Demo Styling</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Demo Kustomisasi Button & Styling
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lihat berbagai variasi button dan styling yang bisa Anda gunakan untuk mengkustomisasi tampilan website
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gradient Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-accent-500" />
                Gradient Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <CustomButton variant="gradient" size="default">
                  <Star className="h-4 w-4 mr-2" />
                  Primary Gradient
                </CustomButton>
                <CustomButton variant="gradient-success" size="default">
                  <Heart className="h-4 w-4 mr-2" />
                  Success Gradient
                </CustomButton>
                <CustomButton variant="gradient-warning" size="default">
                  <Zap className="h-4 w-4 mr-2" />
                  Warning Gradient
                </CustomButton>
                <CustomButton variant="gradient-danger" size="default">
                  <Crown className="h-4 w-4 mr-2" />
                  Danger Gradient
                </CustomButton>
              </div>
            </CardContent>
          </Card>

          {/* Neon Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary-500" />
                Neon Effect Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <CustomButton variant="neon" size="default">
                  <Rocket className="h-4 w-4 mr-2" />
                  Neon Blue
                </CustomButton>
                <CustomButton variant="neon-accent" size="default">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Neon Purple
                </CustomButton>
              </div>
            </CardContent>
          </Card>

          {/* Glass Morphism */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share className="h-5 w-5 mr-2 text-gray-500" />
                Glass Morphism
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary-400 to-accent-400 p-6 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <CustomButton variant="glass" size="default">
                    <Download className="h-4 w-4 mr-2" />
                    Glass Light
                  </CustomButton>
                  <CustomButton variant="glass-dark" size="default">
                    <Send className="h-4 w-4 mr-2" />
                    Glass Dark
                  </CustomButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Effect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2 text-success-500" />
                3D Effect Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <CustomButton variant="3d" size="default">
                  <Play className="h-4 w-4 mr-2" />
                  3D Primary
                </CustomButton>
                <CustomButton variant="3d-success" size="default">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  3D Success
                </CustomButton>
              </div>
            </CardContent>
          </Card>

          {/* Different Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <CustomButton variant="gradient" size="sm">
                  Small
                </CustomButton>
                <CustomButton variant="gradient" size="default">
                  Default
                </CustomButton>
                <CustomButton variant="gradient" size="lg">
                  Large
                </CustomButton>
                <CustomButton variant="gradient" size="xl">
                  Extra Large
                </CustomButton>
              </div>
            </CardContent>
          </Card>

          {/* Different Shapes */}
          <Card>
            <CardHeader>
              <CardTitle>Button Shapes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <CustomButton variant="gradient" shape="square">
                  Square
                </CustomButton>
                <CustomButton variant="gradient" shape="default">
                  Default
                </CustomButton>
                <CustomButton variant="gradient" shape="rounded">
                  Rounded
                </CustomButton>
                <CustomButton variant="pill" shape="pill">
                  Pill Shape
                </CustomButton>
                <CustomButton variant="gradient" shape="circle" size="icon">
                  <Heart className="h-4 w-4" />
                </CustomButton>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Interactive Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-gray-600">Klik tombol di bawah untuk melihat efek interaktif:</p>

              <div className="flex flex-wrap justify-center gap-4">
                <CustomButton variant="gradient" size="lg" onClick={() => alert("Button Gradient diklik!")}>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Klik Saya!
                </CustomButton>

                <CustomButton variant="neon" size="lg" onClick={() => alert("Button Neon diklik!")}>
                  <Zap className="h-5 w-5 mr-2" />
                  Neon Effect
                </CustomButton>

                <CustomButton variant="3d" size="lg" onClick={() => alert("Button 3D diklik!")}>
                  <Rocket className="h-5 w-5 mr-2" />
                  3D Effect
                </CustomButton>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Cara Menggunakan:</h3>
                <div className="text-left space-y-2 text-sm">
                  <p>
                    <code className="bg-gray-200 px-2 py-1 rounded">variant="gradient"</code> - Untuk efek gradient
                  </p>
                  <p>
                    <code className="bg-gray-200 px-2 py-1 rounded">variant="neon"</code> - Untuk efek neon
                  </p>
                  <p>
                    <code className="bg-gray-200 px-2 py-1 rounded">variant="3d"</code> - Untuk efek 3D
                  </p>
                  <p>
                    <code className="bg-gray-200 px-2 py-1 rounded">size="lg"</code> - Untuk ukuran besar
                  </p>
                  <p>
                    <code className="bg-gray-200 px-2 py-1 rounded">shape="pill"</code> - Untuk bentuk pill
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <CustomButton variant="pill-outline" size="lg">
              Kembali ke Beranda
            </CustomButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
