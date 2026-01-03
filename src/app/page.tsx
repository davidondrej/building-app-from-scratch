import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">LinkTrack</h1>
      <p className="text-lg text-gray-500 mb-8">
        Create short links. Track which sources drive clicks.
      </p>
      <div className="space-x-4">
        <Link href="/login" className="px-6 py-2 border rounded">Login</Link>
        <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded">Sign Up</Link>
      </div>
    </div>
  )
}
