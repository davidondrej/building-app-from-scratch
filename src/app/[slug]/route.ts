import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const link = store.links.find(l => l.slug === slug)

  if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  store.clicks.push({ link_id: link.id, source_tag: request.nextUrl.searchParams.get('src') })
  return NextResponse.redirect(link.original_url)
}
