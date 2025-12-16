'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../provider/AuthProvider'
import CartDrawer from './CartDrawer'
import { LogOut, SearchIcon, User, ChevronDown, Menu, ShoppingCart, Phone } from 'lucide-react'

import logo from "@/public/images/logoup9.png"
import Image from 'next/image'
import MobileBottomBar from './MobileBottomBar'
import Banner from './Banner'

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
    <>
      {/* ================= TOP NAV ================= */}
      <nav className="relative bg-[var(--blush)] z-50">
        <div className="mx-auto px-12">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="Logo"
                width={180}
                height={60}
                className="object-contain drop-shadow-xl"
              />
            </Link>

            {/* Center Menu */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--pink)]">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/product">Products</Link></li>

              {/* Categories */}
              <li
                className="relative"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
              >
                <button className="flex items-center gap-1">
                  <Menu className="w-4 h-4" />
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>

                {categoryOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[900px] bg-white shadow-2xl rounded-xl p-8">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Skin Types */}
                      <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">Skin Types</h3>
                        {categoryData.skinTypes.map((t, i) => (
                          <Link
                            key={i}
                            href={`/categories/skin-types/${t.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block text-sm py-1 hover:text-pink-500"
                          >
                            {t}
                          </Link>
                        ))}
                      </div>

                      {/* Skin Concerns */}
                      <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">Skin Concerns</h3>
                        <div className="max-h-72 overflow-y-auto custom-scrollbar">
                          {categoryData.tags.map((t, i) => (
                            <Link
                              key={i}
                              href={`/categories/skin-concerns/${t.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block text-sm py-1 hover:text-pink-500"
                            >
                              {t}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Product Category */}
                      <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">Product Category</h3>
                        {categoryData.category.map((t, i) => (
                          <Link
                            key={i}
                            href={`/categories/products/${t.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block text-sm py-1 hover:text-pink-500"
                          >
                            {t}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li><Link href="/combo">Combo</Link></li>
              <li><Link href="/offers">Offers</Link></li>
            </ul>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <input
                className="w-full px-4 py-2 rounded-l-md border border-pink-300"
                placeholder="Search products..."
              />
              <button className="px-4 bg-[var(--pink)] text-white rounded-r-md">
                <SearchIcon />
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
              <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />

              {!user ? (
                <Link
                  href="/my-account"
                  className="hidden md:flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md"
                >
                  <User className="w-4 h-4" /> Sign In
                </Link>
              ) : (
                <>
                  <Link href="/dashboard"><User /></Link>
                  <button onClick={signOuts}><LogOut /></button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <Banner /> */}
      </nav>

      <MobileBottomBar />

      {/* Scrollbar */}
      <style jsx global>{`
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #ec4899;
        border-radius: 10px;
      }
    `}</style>
    </>
  );

}




export default NavClient