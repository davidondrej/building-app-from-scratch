import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Find the link
  const { data: link } = await supabase
    .from('links')
    .select('id, original_url')
    .eq('slug', slug)
    .single()

  if (!link) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Get tracking params
  const source = request.nextUrl.searchParams.get('src')
  const referrer = request.headers.get('referer')
  const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country')

  // Log the click
  await supabase.from('clicks').insert({
    link_id: link.id,
    source_tag: source,
    referrer,
    country
  })

  // Redirect
  return NextResponse.redirect(link.original_url)
}
