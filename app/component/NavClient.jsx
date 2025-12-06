'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../provider/AuthProvider'
import CartDrawer from './CartDrawer'
import { LogOut, User } from 'lucide-react'

import logo from "/public/images/logoup2.png"
import Image from 'next/image'

const NavClient = () => {
  const { user, signOuts } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
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

  const toggleDrawer = () => setIsOpen(prev => !prev)

  return (
    <nav>
      {/* Main navigation - transparent when scrolled */}
      {(() => {
        const scrolled = mounted && isScrolled
        return (
          <div
            className={`${scrolled
              ? 'fixed top-0 inset-x-0 opacity-40 bg-gray-100 '
              : 'absolute inset-x-0 top-0 bg-[#ffdcdc] mt-10 border-b border-black/10 shadow-sm'
              } z-30 transition-colors`}
          >
            <div className='mx-auto px-4 sm:px-6 max-w-7xl'>
              <div className='flex justify-between items-center h-16'>
                {/* Logo */}
                <a
                  href='/'
                  className='font-semibold text-black text-2xl uppercase tracking-[0.35em]'
                >
                  {/* LILAC */}
                  <div className="bg-transparent">
                    <Image src={logo} alt="Logo" width={80} height={80} />
                  </div>
                </a>

                {/* Menu */}
                <ul className='hidden md:flex items-center gap-8 text-black text-sm'>
                  {['Home', 'About', 'Product', 'Blog', 'Gallery'].map(
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
                          </div>
                        ) : (
                          <Link
                            href={`${item === 'Home'
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
                  {user && (
                    <Link href='/dashboard' aria-label='Login' className='hover:opacity-80 p-1 tooltip' data-tip="hello">
                      <User className='w-5 h-5 btn' />
                    </Link>
                  )}
                  {/* Cart */}
                  <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
                  {/* Logout */}
                  {!user ? (
                    // Show only User icon
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
                  {['Home', 'About', 'Product', 'Blog', 'Gallery'].map(item => (
                    <li key={item}>
                      <Link
                        href={`${item === 'Home' ? '/' : `/${item.toLocaleLowerCase()}`
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