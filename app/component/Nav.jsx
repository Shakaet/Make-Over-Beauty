"use client"
import React, { useEffect, useState } from 'react'



const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav>
        

      {/* Main navigation - transparent when scrolled */}
      {(() => {
        const scrolled = mounted && isScrolled
        return (
          <div className={`${scrolled ? 'fixed top-0 inset-x-0 opacity-40 bg-gray-100 ' : 'absolute inset-x-0 top-0 bg-[#ffdcdc] mt-10 border-b border-black/10 shadow-sm'} z-30 transition-colors`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="text-2xl tracking-[0.35em] font-semibold uppercase text-black">LILAC</a>

                {/* Menu */}
                <ul className="hidden md:flex items-center gap-8 text-sm text-black">
                  {['Home','About','Shop','Blog','Gallery','Pages'].map((item) => (
                    <li key={item}>
                      <a href="#" className="inline-flex items-center gap-1 hover:text-black/80 transition-colors">
                        <span className="tracking-[0.25em] uppercase">{item}</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                          <path d="M2 3l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Right icons */}
                <div className="flex items-center gap-5">
                  {/* Account */}
                  <button aria-label="Account" className="relative p-1 hover:opacity-80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>
                    </svg>
                  </button>
                  {/* Wishlist */}
                  <button aria-label="Wishlist" className="relative p-1 hover:opacity-80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 21s-7-4.35-9-8.5C1 8 3.5 5.5 6.5 5.5 8.24 5.5 9.86 6.44 11 7.86 12.14 6.44 13.76 5.5 15.5 5.5 18.5 5.5 21 8 21 12.5 19 16.65 12 21 12 21z"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full px-1">0</span>
                  </button>
                  {/* Cart */}
                  <button aria-label="Cart" className="relative p-1 hover:opacity-80">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="20" r="1.5"/>
                      <circle cx="18" cy="20" r="1.5"/>
                      <path d="M2 3h3l3 12h10l2-8H6" strokeLinecap="round"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full px-1">0</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </nav>
  )
}

export default Nav