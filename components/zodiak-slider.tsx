'use client'

import zodiakData from "@/data/zodiak.json"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function ZodiakSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1"
        onClick={() => scroll('left')}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
      >
        {zodiakData.map((zodiak) => (
          <Link key={zodiak.name} href={`/zodiak/${zodiak.name.toLowerCase()}`}>
            <Card className="min-w-[150px] hover:shadow-lg transition">
              <CardContent className="p-4 text-center">
                <div className="text-3xl">{zodiak.icon}</div>
                <div className="font-bold text-sm mt-1">{zodiak.name}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1"
        onClick={() => scroll('right')}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
                        }
