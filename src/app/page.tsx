import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b-2 border-black bg-white">
        <div className="text-2xl font-black tracking-tighter uppercase italic">LinkTrack</div>
        <nav className="flex gap-4">
          <Link href="/login" className="px-6 py-2 font-bold hover:underline decoration-2 underline-offset-4">Login</Link>
          <Link href="/signup" className="px-6 py-2 bg-[#FFDE59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-5xl mx-auto">
        <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none uppercase">
            Track <span className="bg-[#FF5757] text-white px-2">Every</span> Click
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto font-mono">
            // The no-nonsense URL shortener for people who like data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-[#5CE1E6] text-black text-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Start Tracking -&gt;
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white text-black text-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left w-full">
          {/* Card 1 */}
          <div className="p-6 bg-[#CB6CE6] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
            <h3 className="text-2xl font-black mb-2 uppercase border-b-2 border-black pb-2">01. Shorten</h3>
            <p className="font-medium font-mono">Make ugly links pretty. Custom slugs included.</p>
          </div>
          
          {/* Card 2 */}
          <div className="p-6 bg-[#FFDE59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
            <h3 className="text-2xl font-black mb-2 uppercase border-b-2 border-black pb-2">02. Track</h3>
            <p className="font-medium font-mono">Know the source. Add tags instantly.</p>
          </div>
          
          {/* Card 3 */}
          <div className="p-6 bg-[#FF5757] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
            <h3 className="text-2xl font-black mb-2 uppercase border-b-2 border-black pb-2">03. Analyze</h3>
            <p className="font-medium font-mono">Real numbers. No fluff. Just data.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center font-bold border-t-2 border-black bg-white mt-auto">
        <p className="font-mono">EST. {new Date().getFullYear()} • LINKTRACK INC.</p>
      </footer>
    </div>
  )
}
