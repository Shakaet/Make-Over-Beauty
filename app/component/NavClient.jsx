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
import useAddToCart from '../hooks/useAddToCart'

const NavClient = () => {
  const { cart, loadCart } = useAddToCart()
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

  const {
    allProducts,
    fetchAllProducts,
    setSearchTerm,
  } = useProduct();

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = searchValue
    ? allProducts
      .filter((p) => {
        const query = searchValue.toLowerCase();

        return (
          p.name?.toLowerCase().includes(query) ||
          p.category_id?.categoryName?.toLowerCase().includes(query) ||
          p.subcategory?.toLowerCase().includes(query) ||
          p.brand_id?.brandName?.toLowerCase().includes(query)
        );
      })
      .slice(0, 8)
    : [];


  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setSearchTerm(searchValue.trim());
    setShowSuggestions(false);
  };

  return (
    <>
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

              <li><Link href="/offers">Offers</Link></li>
            </ul>


            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <input
                className="w-full px-4 py-2 rounded-l-md border border-pink-300"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);
                  setShowSuggestions(!!value.trim());
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              <button
                onClick={handleSearch}
                className="px-4 bg-[var(--pink)] text-white rounded-r-md"
              >
                <SearchIcon />
              </button>

              {/* Live Suggestions */}
              {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-80 overflow-auto">
                  {filteredProducts.map((item) => (
                    <Link
                      key={item._id}
                      href={`/product/products/${item._id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="block px-4 py-2 text-sm hover:bg-pink-50"
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.category_id?.categoryName} •{" "}
                        {item.brand_id?.brandName}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
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
              {/* Floating Cart Icon */}
              <button
                aria-label="Cart"
                onClick={toggleDrawer}
                className="relative hover:opacity-80 p-1 cursor-pointer hidden md:flex"
              >
                <div className='flex items-center gap-2 rounded-full shadow-lg px-3 py-1 bg-[var(--pink)] text-white'>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="9" cy="20" r="1.5" />
                    <circle cx="18" cy="20" r="1.5" />
                    <path d="M2 3h3l3 12h10l2-8H6" strokeLinecap="round" />
                  </svg>
                  <h1>Cart</h1>
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-white px-2 py-0.5 rounded-full text-xs text-bold ">
                  {cart.length}
                </span>
              </button>
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