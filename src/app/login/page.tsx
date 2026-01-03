'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('user', email)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-8 border-b-2 border-black pb-4">
          <h1 className="text-4xl font-black uppercase italic">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="YOU@EXAMPLE.COM" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all font-mono" 
              required 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold uppercase">Password</label>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all font-mono" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 px-4 bg-[#FF5757] text-white font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Enter Dashboard
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold">
          NO ACCOUNT?{' '}
          <Link href="/signup" className="underline decoration-2 underline-offset-2 hover:bg-[#FFDE59] px-1">
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  )
}
