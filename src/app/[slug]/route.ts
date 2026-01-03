import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: link } = await supabase
    .from('links')
    .select('id, original_url')
    .eq('slug', slug)
    .single()

  if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const source = request.nextUrl.searchParams.get('src')
  const referrer = request.headers.get('referer')
  const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country')

  await supabase.from('clicks').insert({
    link_id: link.id,
    source_tag: source,
    referrer,
    country
  })

  return NextResponse.redirect(link.original_url)
}
