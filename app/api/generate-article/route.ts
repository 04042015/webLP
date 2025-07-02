import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, category, author } = body

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    const content = `<h2>${title}</h2><p>Ini adalah artikel otomatis dengan kategori ${category} yang dibuat oleh ${author}.</p>`

    const { data, error } = await supabase.from('articles').insert([{
      title,
      slug,
      content,
      category,
      author,
      status: 'published',
      featured: false,
      views: 0
    }])

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
