'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NavClient = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showPages, setShowPages] = useState(false)

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
          <div
            className={`${
              scrolled
                ? 'fixed top-0 inset-x-0 opacity-40 bg-gray-100 '
                : 'absolute inset-x-0 top-0 bg-[#ffdcdc] mt-10 border-b border-black/10 shadow-sm'
            } z-30 transition-colors`}
          >
            <div className='mx-auto px-4 sm:px-6 max-w-7xl'>
              <div className='flex justify-between items-center h-16'>
                {/* Logo */}
                <a
                  href='#'
                  className='font-semibold text-black text-2xl uppercase tracking-[0.35em]'
                >
                  LILAC
                </a>

                {/* Menu */}
                <ul className='hidden md:flex items-center gap-8 text-black text-sm'>
                  {['Home', 'About', 'Shop', 'Blog', 'Gallery', 'Pages'].map(
                    item => (
                      <li key={item} className='relative'>
                        {item === 'Pages' ? (
                          <div className='group inline-flex items-center'>
                            <button className='inline-flex items-center gap-1 hover:text-black/80 transition-colors'>
                              <span className='uppercase tracking-[0.25em]'>
                                {item}
                              </span>
                              <svg
                                width='10'
                                height='10'
                                viewBox='0 0 10 10'
                                aria-hidden='true'
                              >
                                <path
                                  d='M2 3l3 3 3-3'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  fill='none'
                                  strokeLinecap='round'
                                />
                              </svg>
                            </button>
                            {/* Dropdown */}
                            <div className='invisible group-hover:visible top-full left-0 z-40 absolute bg-[#ffdcdc] opacity-0 group-hover:opacity-100 shadow-xl mt-1 border border-black/10 w-56 text-black transition-opacity duration-150'>
                              <ul className='py-2'>
                                <li>
                                  <Link
                                    href='/pages/history'
                                    className='block hover:bg-black/5 px-4 py-2'
                                  >
                                    Our History
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/pages/faq'
                                    className='block hover:bg-black/5 px-4 py-2'
                                  >
                                    Faq
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/pages/contact'
                                    className='block hover:bg-black/5 px-4 py-2'
                                  >
                                    Contact Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/pages/404'
                                    className='block hover:bg-black/5 px-4 py-2'
                                  >
                                    404
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={`${
                              item === 'Home'
                                ? '/'
                                : `/${item.toLocaleLowerCase()}`
                            }`}
                            className='inline-flex items-center gap-1 hover:text-black/80 transition-colors'
                          >
                            <span className='uppercase tracking-[0.25em]'>
                              {item}
                            </span>
                          </Link>
                        )}
                      </li>
                    )
                  )}
                </ul>

                {/* Right icons */}
                <div className='flex items-center gap-5'>
                  {/* Account */}
                  <button
                    aria-label='Account'
                    className='relative hover:opacity-80 p-1'
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <circle cx='12' cy='8' r='4' />
                      <path d='M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5' />
                    </svg>
                  </button>
                  {/* Wishlist */}
                  <button
                    aria-label='Wishlist'
                    className='relative hover:opacity-80 p-1'
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <path d='M12 21s-7-4.35-9-8.5C1 8 3.5 5.5 6.5 5.5 8.24 5.5 9.86 6.44 11 7.86 12.14 6.44 13.76 5.5 15.5 5.5 18.5 5.5 21 8 21 12.5 19 16.65 12 21 12 21z' />
                    </svg>
                    <span className='-top-1 -right-1 absolute bg-black px-1 rounded-full text-[10px] text-white'>
                      0
                    </span>
                  </button>
                  {/* Cart */}
                  <button
                    aria-label='Cart'
                    className='relative hover:opacity-80 p-1'
                  >
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <circle cx='9' cy='20' r='1.5' />
                      <circle cx='18' cy='20' r='1.5' />
                      <path d='M2 3h3l3 12h10l2-8H6' strokeLinecap='round' />
                    </svg>
                    <span className='-top-1 -right-1 absolute bg-black px-1 rounded-full text-[10px] text-white'>
                      0
                    </span>
                  </button>
                </div>
                {/* Mobile toggle */}
                <button
                  aria-label='Toggle menu'
                  className='md:hidden ml-2 p-2'
                  onClick={() => setMobileOpen(v => !v)}
                >
                  {/* Hamburger / Close icons */}
                  {mobileOpen ? (
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <path d='M6 6l12 12M6 18L18 6' />
                    </svg>
                  ) : (
                    <svg
                      width='26'
                      height='26'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <path d='M3 6h18M3 12h18M3 18h18' />
                    </svg>
                  )}
                </button>
              </div>
              {/* Mobile menu panel */}
              <div
                className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} pb-4`}
              >
                <ul className='space-y-1 pt-2 border-black/10 border-t text-black text-sm'>
                  {['Home', 'About', 'Shop', 'Blog', 'Gallery'].map(item => (
                    <li key={item}>
                      <Link
                        href={`${
                          item === 'Home' ? '/' : `/${item.toLocaleLowerCase()}`
                        }`}
                        className='block px-1 py-2'
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className='uppercase tracking-[0.25em]'>
                          {item}
                        </span>
                      </Link>
                    </li>
                  ))}

                  <li className='mt-1 pt-2 border-black/10 border-t'>
                    {/* New local state toggle for "Pages" */}
                    <button
                      onClick={() => setShowPages(prev => !prev)}
                      className='flex justify-between items-center px-1 py-2 w-full uppercase tracking-[0.25em]'
                    >
                      <span>Pages</span>
                      <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        className={`transition-transform duration-200 ${
                          showPages ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d='M3 4l3 3 3-3'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          fill='none'
                          strokeLinecap='round'
                        />
                      </svg>
                    </button>

                    {/* Collapsible sub-menu */}
                    <ul
                      className={`pl-3 space-y-1 transition-all duration-300 overflow-hidden ${
                        showPages ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <li>
                        <Link
                          href='/pages/history'
                          className='block px-1 py-2'
                          onClick={() => setMobileOpen(false)}
                        >
                          Our History
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='/pages/faq'
                          className='block px-1 py-2'
                          onClick={() => setMobileOpen(false)}
                        >
                          Faq
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='/pages/contact'
                          className='block px-1 py-2'
                          onClick={() => setMobileOpen(false)}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='/pages/404'
                          className='block px-1 py-2'
                          onClick={() => setMobileOpen(false)}
                        >
                          404
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      })()}
    </nav>
  )
}

export default NavClient
