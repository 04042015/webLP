import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ articles: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slug = body.title.toLowerCase().replace(/\s+/g, '-')

  const { data, error } = await supabase
    .from('articles')
    .insert([{ 
      title: body.title, 
      slug,
      content: body.content, 
      category: body.category 
    }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ article: data[0] })
}
