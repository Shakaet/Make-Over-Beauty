'use client'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { Context } from '../provider/AuthProvider'
import CartDrawer from './CartDrawer'

const NavClient = () => {
  const { user, signOuts } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showPages, setShowPages] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMounted(true), [])

  const toggleDrawer = () => setIsOpen(prev => !prev)

  return (
    <nav>
      {(() => {
        const scrolled = mounted && isScrolled
        return (
          <div
            className={`${scrolled
              ? 'fixed top-0 inset-x-0 bg-gray-100/70 backdrop-blur-sm'
              : 'absolute top-0 inset-x-0 bg-[#ffdcdc] mt-10 border-b border-black/10 shadow-sm'
              } z-30 transition-all`}
          >
            <div className='mx-auto px-4 sm:px-6 max-w-7xl'>
              <div className='flex justify-between items-center h-16'>
                {/* Logo */}
                <Link
                  href='/'
                  className='font-semibold text-black text-2xl uppercase tracking-[0.35em]'
                >
                  LILAC
                </Link>

                {/* Desktop Menu */}
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
                            <div className='invisible group-hover:visible absolute top-full left-0 bg-[#ffdcdc] opacity-0 group-hover:opacity-100 shadow-xl mt-1 border border-black/10 w-56 text-black transition-opacity duration-150'>
                              <ul className='py-2'>
                                <li>
                                  <Link href='/pages/history' className='block px-4 py-2 hover:bg-black/5'>
                                    Our History
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/pages/faq' className='block px-4 py-2 hover:bg-black/5'>
                                    FAQ
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/pages/contact' className='block px-4 py-2 hover:bg-black/5'>
                                    Contact Us
                                  </Link>
                                </li>
                                <li>
                                  <Link href='/pages/404' className='block px-4 py-2 hover:bg-black/5'>
                                    404
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                            className='inline-flex items-center gap-1 hover:text-black/80 transition-colors'
                          >
                            <span className='uppercase tracking-[0.25em]'>{item}</span>
                          </Link>
                        )}
                      </li>
                    )
                  )}
                </ul>

                {/* Right icons */}
                <div className='flex items-center gap-5'>
                  {user && (
                    <Link href='/dashboard' aria-label='Login' className='hover:opacity-80 p-1 tooltip' data-tip="hello">
                      <User className='w-5 h-5 btn' />
                    </Link>
                  )}
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
                  <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />

                  {!user ? (
                    // 🔹 Show only User icon
                    <Link href='/my-account' aria-label='Login' className='hover:opacity-80 p-1 tooltip' data-tip="hello">
                      <User className='w-5 h-5 btn' />
                    </Link>
                  ) : (
                    <>
                      {/* Logout */}
                      <button
                        aria-label='Logout'
                        onClick={signOuts}
                        className='hover:opacity-80 p-1'
                      >
                        <LogOut className='w-5 h-5' />
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  aria-label='Toggle menu'
                  className='md:hidden ml-2 p-2'
                  onClick={() => setMobileOpen(v => !v)}
                >
                  {mobileOpen ? (
                    <svg width='22' height='22' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                      <path d='M6 6l12 12M6 18L18 6' />
                    </svg>
                  ) : (
                    <svg width='26' height='26' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                      <path d='M3 6h18M3 12h18M3 18h18' />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </nav>
  )
}

export default NavClient
