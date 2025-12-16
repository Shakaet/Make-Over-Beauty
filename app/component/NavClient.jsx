'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../provider/AuthProvider'
import CartDrawer from './CartDrawer'
import { LogOut, SearchIcon, User, ChevronDown, Menu, ShoppingCart, Phone } from 'lucide-react'

import logo from "@/public/images/logoup9.png"
import Image from 'next/image'
import MobileBottomBar from './MobileBottomBar'

const NavClient = () => {
  const { user, signOuts } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

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

  // Category data structure
  const categoryData = {
    skinTypes: [
      'Oily',
      'Dry',
      'Combination',
      'Normal',
      'Sensitive',
      'Combination To Oily',
      'Combination To Dry'
    ],
    tags: [
      'Acne & Spot Solution',
      'Aging & Wrinkle',
      'Dryness & Hydration',
      'Oiliness & Sebum Control',
      'Rash, Redness & Sensitivity',
      'Under Eye Dark Circles & Puffiness',
      'Fine Line & Puffiness',
      'Damage Skin Repair & Scars',
      'Sun Damage & Uneven Skin Tone',
      'Large Pores',
      'Whiteheads & Blackheads',
      'Hyperpigmentation, Freckles & Melasma',
      'Brightening & Pigmentation',
      'Exfoliation',
      'Lip Care',
      'Hair Care'
    ],
    category: [
      'Pimple Patch',
      'Powder',
      'Serum',
      'Shampoo',
      'Sheet Mask',
      'Sleeping Mask',
      'Soothing Gel',
      'Sun Stick',
      'Sunscreen',
      'Supplement',
      'Toner',
      'Toner Pad',
      'Underarm Cream',
      'Wash-off Mask',
      'Soap'
    ]
  }

  return (
    <nav className='relative'>
      {/* TOP BAR - Light Pink Background */}
      <div className='bg-[#ffdcdc] border-b border-pink-200'>
        <div className='mx-auto px-12'>
          <div className='flex justify-between items-center h-20'>
            {/* Logo */}
            <Link href='/' className='flex-shrink-0'>
              <Image src={logo} alt="Logo" width={180} height={60} className='object-contain drop-shadow-xl shadow-[var(--pink)]/40' />
            </Link>

            {/* Search Bar - Center */}
            <div className='hidden md:flex flex-1 max-w-2xl mx-8'>
              <div className='relative w-full flex'>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2.5 border border-pink-300 rounded-l-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm bg-white"
                />
                <button className='px-6 bg-[var(--pink)] hover:bg-pink-700 text-white rounded-r-md transition-colors'>
                  <SearchIcon className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Right Side - Cart & Account */}
            <div className='flex items-center gap-4'>
              {/* Cart */}

              <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />

              {/* User Account */}
              {!user ? (
                <Link href='/my-account' className='hidden md:flex items-center gap-2 px-5 py-2.5 bg-[var(--pink)] hover:bg-pink-700 text-white rounded-md transition-colors text-sm font-medium shadow-sm'>
                  <User className='w-4 h-4' />
                  Sign In
                </Link>
              ) : (
                <div className='flex items-center gap-2'>
                  <Link href='/dashboard' className='md:flex items-center gap-2 px-4 py-2 hover:bg-pink-200 rounded-md transition-colors text-sm font-medium text-gray-800'>
                    <User className='w-5 h-5' />
                  </Link>
                  <button
                    onClick={signOuts}
                    className='p-2 hover:bg-pink-200 rounded-full transition-colors'
                    aria-label='Logout'
                  >
                    <LogOut className='w-5 h-5 text-gray-800' />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR - Navigation Menu */}
      <div className={`${isScrolled
        ? 'fixed top-0 left-0 right-0 bg-[#ffdcdc]/95 backdrop-blur-md shadow-lg z-50'
        : 'bg-gradient-to-r from-pink-500 to-pink-400 relative'
        } transition-all duration-300`}>
        <div className='mx-auto px-12'>
          <div className='flex items-center justify-between h-14'>
            {/* Logo (visible only when scrolled) */}
            {isScrolled && (
              <Link href='/' className='flex-shrink-0'>
                <Image src={logo} alt="Logo" width={120} height={40} className='object-contain' />
              </Link>
            )}

            {/* Main Navigation Links - Center */}
            <ul className={`hidden md:flex items-center justify-center gap-8 text-sm font-medium ${isScrolled ? 'text-gray-800 mx-auto' : 'text-white'
              }`}>
              <li>
                <Link
                  href='/'
                  className={`hover:text-pink-200 transition-colors ${isScrolled ? '' : 'hover:text-pink-300'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/product'
                  className={`hover:text-pink-200 transition-colors ${isScrolled ? '' : 'hover:text-pink-300'}`}
                >
                  Products
                </Link>
              </li>

              {/* Categories with Mega Menu */}
              <li className='relative'>
                <button
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => setCategoryOpen(false)}
                  className={`flex items-center gap-1 transition-colors ${isScrolled
                    ? 'hover:text-pink-200'
                    : 'hover:text-pink-300'
                    }`}
                >
                  <Menu className='w-4 h-4' />
                  <span>Categories</span>
                  <ChevronDown className='w-4 h-4' />
                </button>

                {/* Mega Menu Dropdown */}
                {categoryOpen && (
                  <div
                    onMouseEnter={() => setCategoryOpen(true)}
                    onMouseLeave={() => setCategoryOpen(false)}
                    className='absolute left-2 transform -translate-x-2 top-full mt-2 w-screen max-w-3xl bg-white border border-gray-200 shadow-2xl rounded-lg p-8 z-50'
                  >
                    <div className='grid grid-cols-3 gap-2'>
                      {/* Skin Types */}
                      <div>
                        <h3 className='font-bold text-sm mb-4 text-gray-900 uppercase tracking-wider border-b-2 border-[var(--pink)] pb-2'>
                          Skin Types:
                        </h3>
                        <ul className='space-y-2'>
                          {categoryData.skinTypes.map((type, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/categories/skin-types/${type.toLowerCase().replace(/\s+/g, '-')}`}
                                className='text-xs text-gray-700 hover:text-[var(--pink)] hover:pl-2 transition-all block'
                              >
                                {type}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skin Concerns */}
                      <div>
                        <h3 className='font-bold text-sm mb-4 text-gray-900 uppercase tracking-wider border-b-2 border-[var(--pink)] pb-2'>
                          Skin Concerns:
                        </h3>
                        <ul className='space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
                          {categoryData.tags.map((concern, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/categories/skin-concerns/${concern.toLowerCase().replace(/\s+/g, '-')}`}
                                className='text-xs text-gray-700 hover:text-[var(--pink)] hover:pl-2 transition-all block'
                              >
                                {concern}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Product Category */}
                      <div>
                        <h3 className='font-bold text-sm mb-4 text-gray-900 uppercase tracking-wider border-b-2 border-[var(--pink)] pb-2'>
                          Product Category:
                        </h3>
                        <ul className='space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
                          {categoryData.category.map((product, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/categories/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                className='text-xs text-gray-700 hover:text-[var(--pink)] hover:pl-2 transition-all block'
                              >
                                {product}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li>
                <Link
                  href='/combo'
                  className={`hover:text-pink-200 transition-colors ${isScrolled ? '' : 'hover:text-pink-300'}`}
                >
                  Combo
                </Link>
              </li>
              <li>
                <Link
                  href='/offers'
                  className={`hover:text-[var(--pink)] transition-colors ${isScrolled ? '' : 'hover:text-pink-300'}`}
                >
                  Offers
                </Link>
              </li>
            </ul>


            {isScrolled ?
              (
                <div className='flex items-center gap-2 text-sm'>
                  <Phone className='w-5 h-5 text-[var(--pink)]' />
                  <div>
                    <div className='text-xs text-gray-600'>Hotline:</div>
                    <div className='font-semibold text-gray-800'>+880 1XXXXXXXXX</div>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-2 text-sm'>
                  <Phone className='w-5 h-5 text-[var(--pink)]' />
                  <div>
                    <div className='text-xs text-gray-300'>Hotline:</div>
                    <div className=' text-gray-100'>+880 1XXXXXXXXX</div>
                  </div>
                </div>
              )}


            {/* Mobile Menu Button */}
            <button
              className='md:hidden p-2'
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label='Toggle menu'
            >
              {mobileOpen ? (
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={isScrolled ? 'currentColor' : 'white'} strokeWidth='2'>
                  <path d='M6 6l12 12M6 18L18 6' />
                </svg>
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className='md:hidden pb-4 border-t border-white/20'>
              <ul className='space-y-1 pt-4'>
                {['Home', 'Products', 'Categories', 'Combo', 'Offers'].map(item => (
                  <li key={item}>
                    <Link
                      href={`${item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}`}
                      className={`block px-4 py-2 ${isScrolled ? 'text-gray-800 hover:bg-pink-200' : 'text-white hover:bg-white/10'
                        } rounded transition-colors`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #db2777;
        }
      `}</style>

      <MobileBottomBar />
    </nav>
  )
}




export default NavClient