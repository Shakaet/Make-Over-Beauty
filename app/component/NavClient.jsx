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
import { useProduct } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'

const NavClient = () => {
  const { user, signOuts } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (categoryOpen && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categoryOpen, categories]);

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

  const { products, fetchProducts, selectedCategories } = useProduct();

  useEffect(() => {
    fetchProducts()
  }, [selectedCategories]) // Only refetch when search/price changes

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <nav className="relative bg-[var(--blush)] z-50">
        <div className="mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="Logo"
                width={200}
                height={80}
                className="object-contain drop-shadow-xl"
              />
            </Link>

            {/* Center Menu */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--pink)]">
              <li><Link href="/product">Products</Link></li>

              {/* Categories */}
              <li
                className="relative"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoryOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-1"
                >
                  <Menu className="w-4 h-4" />
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>


                {categoryOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[700px] bg-white shadow-2xl rounded-xl p-8">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Skin Concerns */}
                      {/* <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">Skin Concerns</h3>
                        {products
                          .flatMap(product => product.tags) // get all tags from all products
                          .filter((tag, index, self) => tag && self.indexOf(tag) === index) // remove duplicates & falsy
                          .map((t, i) => (
                            <p
                              key={i}
                              className="block text-sm py-1 hover:text-pink-500"
                            >
                              {t}
                            </p>
                          ))}
                      </div> */}


                      {/* Skin Category */}
                      <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">Product Category</h3>
                        <div className="max-h-72 overflow-y-auto custom-scrollbar">
                          {categories.map((cat) => (
                            <Link
                              key={cat._id}
                              href={{
                                pathname: "/product",
                                query: { category: cat._id },
                              }}
                              onMouseEnter={() => setActiveCategory(cat)}
                              className="block text-sm py-1 hover:text-pink-500"
                            >
                              {cat.categoryName}
                            </Link>
                          ))}

                        </div>
                      </div>

                      {/* Product Sub-Category */}
                      <div>
                        <h3 className="font-semibold mb-3 border-b pb-2">
                          {activeCategory?.categoryName || "Sub Categories"}
                        </h3>
                        {activeCategory?.subCategories?.map((sub) => (
                          <Link
                            key={sub._id}
                            href={{
                              pathname: "/product",
                              query: {
                                category: activeCategory._id,
                                subcategory: sub.name,
                              },
                            }}
                            className="block text-sm py-1 hover:text-pink-500"
                          >
                            {sub.name}
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
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input
                className="w-full px-4 py-2 rounded-l-md border border-pink-300"
                placeholder="Search products..."
              />
              <button className="px-4 bg-[var(--pink)] text-white rounded-r-md">
                <SearchIcon />
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {!user ? (
                <Link
                  href="/my-account"
                  className="hidden md:flex items-center gap-2 shadow-lg bg-white text-[var(--pink)] px-3 py-1 rounded-full"
                >
                  <User className="w-4 h-4" /> Log In
                </Link>
              ) : (
                <>
                  <Link href="/dashboard"><User /></Link>
                  <button onClick={signOuts}><LogOut /></button>
                </>
              )}
              <CartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
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