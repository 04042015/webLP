"use client"

import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { ChevronDown, Search } from "lucide-react"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage = "" }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row - Logo & Brand */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center space-x-3 group">
            {/* Logo */}
            <div className="w-16 h-12 relative">
              <Image
                src="/assets/logo.png"
                alt="LangsaPost Logo"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Login Button - Hidden by default, show only in dev or with special access */}
          {(process.env.NODE_ENV === "development" ||
            (typeof window !== "undefined" && window.location.search.includes("admin=true"))) && (
            <Link href="/admin">
              <CustomButton
                variant="outline"
                className="bg-white text-langsapost-500 border-langsapost-500 hover:bg-langsapost-50"
              >
                Login Admin
              </CustomButton>
            </Link>
          )}
        </div>

        {/* Bottom Row - Navigation */}
        <nav className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  currentPage === "home"
                    ? "text-langsapost-500 border-b-2 border-langsapost-500 pb-1"
                    : "text-gray-700 hover:text-langsapost-500"
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/artikel"
                className={`font-medium transition-colors ${
                  currentPage === "artikel"
                    ? "text-langsapost-500 border-b-2 border-langsapost-500 pb-1"
                    : "text-gray-700 hover:text-langsapost-500"
                }`}
              >
                Artikel
              </Link>

              {/* Kategori - Tampilkan Semua */}
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-medium text-sm">Kategori:</span>
                <Link
                  href="/kategori/teknologi"
                  className="flex items-center text-gray-700 hover:text-langsapost-500 transition-colors font-medium"
                >
                  <span className="w-2 h-2 bg-langsapost-500 rounded-full mr-2"></span>
                  Teknologi
                </Link>
                <Link
                  href="/kategori/keuangan"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Keuangan
                </Link>
                <Link
                  href="/zodiak"
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Zodiak
                </Link>
                <Link
                  href="/kategori/lifestyle"
                  className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Lifestyle
                </Link>
                <Link
                  href="/kategori/berita"
                  className="flex items-center text-gray-700 hover:text-langsapost-600 transition-colors font-medium"
                >
                  <span className="w-2 h-2 bg-langsapost-600 rounded-full mr-2"></span>
                  Berita
                </Link>
              </div>

              {/* Tentang Dropdown */}
              <div className="relative group">
                <button
                  className={`font-medium transition-colors flex items-center ${
                    currentPage === "tentang"
                      ? "text-langsapost-500 border-b-2 border-langsapost-500 pb-1"
                      : "text-gray-700 hover:text-langsapost-500"
                  }`}
                >
                  Tentang
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/tentang"
                      className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                    >
                      Tentang Kami
                    </Link>
                    <Link
                      href="/kontak"
                      className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                    >
                      Kontak
                    </Link>
                    <Link
                      href="/kebijakan"
                      className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                    >
                      Kebijakan Privasi
                    </Link>
                    <Link
                      href="/karir"
                      className="block px-4 py-2 text-gray-700 hover:bg-langsapost-50 hover:text-langsapost-600 transition-colors"
                    >
                      Karir
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Icon */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-langsapost-500 transition-colors hover:bg-langsapost-50 rounded-lg">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
