'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type LinkType = { id: string; slug: string; original_url: string }

export default function Dashboard() {
  const [links, setLinks] = useState<LinkType[]>([])
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [user, setUser] = useState('')
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u) router.push('/login')
    else {
      setUser(u)
      setLinks(JSON.parse(localStorage.getItem('links') || '[]'))
    }
  }, [router])

  function createLink(e: React.FormEvent) {
    e.preventDefault()
    const newLink = { id: crypto.randomUUID(), slug, original_url: url, user }
    const updated = [...links, newLink]
    setLinks(updated)
    localStorage.setItem('links', JSON.stringify(updated))
    setUrl('')
    setSlug('')
  }

  function logout() {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b-2 border-black sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-black italic tracking-tighter uppercase">LinkTrack</Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono border-2 border-black px-2 py-1 bg-gray-100 hidden sm:block">{user}</span>
              <button 
                onClick={logout}
                className="text-sm font-bold text-black border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all bg-[#FF5757] text-white"
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Create Link Section */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-12">
          <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black pb-2 inline-block">New Target</h2>
          <form onSubmit={createLink} className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-grow w-full">
              <label className="block text-sm font-bold uppercase mb-2">Destination URL</label>
              <input 
                type="url" 
                placeholder="HTTPS://..." 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none font-mono transition-all" 
                required 
              />
            </div>
            <div className="md:w-1/3 w-full">
              <label className="block text-sm font-bold uppercase mb-2">Slug</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border-2 border-r-0 border-black bg-gray-200 text-black font-bold text-sm">
                  /
                </span>
                <input 
                  type="text" 
                  placeholder="SHORT" 
                  value={slug} 
                  onChange={e => setSlug(e.target.value)} 
                  className="flex-1 min-w-0 block w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none font-mono transition-all" 
                  required 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto px-8 py-3 bg-[#5CE1E6] text-black font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap"
            >
              Shorten It
            </button>
          </form>
        </div>

        {/* Links List */}
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase italic">Active Links</h3>
          
          {links.length === 0 ? (
            <div className="bg-white border-2 border-black border-dashed p-12 text-center">
              <p className="text-xl font-bold text-gray-400 uppercase">Nothing to track yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {links.map(link => (
                <div key={link.id} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:-translate-y-1 transition-transform duration-200">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-black text-black">/{link.slug}</span>
                      <span className="px-2 py-0.5 border-2 border-black text-xs font-bold bg-[#FFDE59] uppercase">Live</span>
                    </div>
                    <p className="text-sm font-mono truncate max-w-md text-gray-600 border-b border-black inline-block">{link.original_url}</p>
                  </div>
                  
                  <div className="w-full md:w-auto bg-gray-100 p-3 border-2 border-black font-mono text-xs break-all select-all">
                    {typeof window !== 'undefined' ? `${window.location.origin}/${link.slug}?src=twitter` : `.../${link.slug}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
