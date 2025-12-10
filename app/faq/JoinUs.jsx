"use client"
import React, { useState } from 'react'

const JoinUs = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <section className="bg-[#f3eadf] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 50 Q100 30 150 50 T250 50 T350 50" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M100 100 Q150 80 200 100 T300 100" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M80 150 Q130 130 180 150 T280 150" stroke="#f59e0b" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/60 mb-4">
                SUBSCRIBE
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                Join Our Mail List Today
              </h2>
              <p className="text-black/70 text-base sm:text-lg leading-relaxed">
                Vestibulum imperdiet, sapien ac ullamcorper vestibulum tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          {/* Right Side - Subscription Form */}
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="flex-1 px-4 py-3 border border-black/20 bg-[#f3eadf] text-black placeholder:text-black/50 rounded-sm focus:outline-none focus:border-black/40 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#e5d9c9] border border-black/20 text-black uppercase tracking-[0.15em] font-semibold text-sm hover:bg-[#decfb9] transition-colors whitespace-nowrap rounded-sm"
              >
                SUBSCRIBE NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinUs