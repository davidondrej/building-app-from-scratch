'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Link = { id: string; slug: string; original_url: string; created_at: string }
type Click = { source_tag: string; count: number }

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [clicks, setClicks] = useState<Record<string, Click[]>>({})
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [user, setUser] = useState<{ id: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else {
        setUser(data.user)
        loadLinks(data.user.id)
      }
    })
  }, [router])

  async function loadLinks(userId: string) {
    const { data } = await supabase.from('links').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) {
      setLinks(data)
      // Load click stats for each link
      const clickData: Record<string, Click[]> = {}
      for (const link of data) {
        const { data: stats } = await supabase.rpc('get_click_stats', { link_id_param: link.id })
        clickData[link.id] = stats || []
      }
      setClicks(clickData)
    }
  }

  async function createLink(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    await supabase.from('links').insert({ user_id: user.id, original_url: url, slug })
    setUrl('')
    setSlug('')
    loadLinks(user.id)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>

      <form onSubmit={createLink} className="mb-8 space-y-4">
        <h2 className="font-semibold">Create Link</h2>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full p-2 border rounded bg-transparent"
          required
        />
        <input
          type="text"
          placeholder="custom-slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="w-full p-2 border rounded bg-transparent"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>

      <div className="space-y-4">
        <h2 className="font-semibold">Your Links</h2>
        {links.map(link => (
          <div key={link.id} className="p-4 border rounded">
            <p className="font-mono text-sm">/{link.slug} → {link.original_url}</p>
            <p className="text-xs text-gray-500 mt-1">
              Use: {window.location.origin}/{link.slug}?src=twitter
            </p>
            {clicks[link.id]?.length > 0 && (
              <div className="mt-2 text-sm">
                <p className="font-semibold">Clicks by source:</p>
                {clicks[link.id].map(c => (
                  <p key={c.source_tag}>{c.source_tag || 'direct'}: {c.count}</p>
                ))}
              </div>
            )}
          </div>
        ))}
        {links.length === 0 && <p className="text-gray-500">No links yet</p>}
      </div>
    </div>
  )
}
