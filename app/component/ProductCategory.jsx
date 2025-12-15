"use client"

import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import hero from "@/public/images/makeup2.png"
import api from "../libs/axios"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { getAllProducts } from "../api/productApi"


const ProductRow = ({ product }) => {
  return (
    <Link
      href={`/product/products/${product._id}`}
    >
      <div className="flex items-center gap-4 py-4">
        <div className="relative w-20 h-24 overflow-hidden rounded-md ring-1 ring-black/5 group">
          <div className="absolute inset-0 flex transition-transform duration-500 ease-out group-hover:-translate-x-full">
            <div className="relative shrink-0 w-full h-full">
              <img
                src={product.imagePrimary}
                alt={product.name}
                fill="true"
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="relative shrink-0 w-full h-full">
              <img
                src={product.imageSecondary}
                alt={`${product.name} alt`}
                fill="true"
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-stone-900 truncate">
            {product.name}
          </p>
          <div className="mt-1 text-xs">
            <Rating value={product.rating} />
          </div>
          <p className="mt-1 text-sm text-stone-700 font-medium">
            ৳ {product.lowprice}
          </p>
        </div>
      </div>
    </Link>
  )
}

function Rating({ value }) {
  return (
    <span>
      <span className="text-amber-500">{'★'.repeat(value)}</span>
      <span className="text-stone-300">{'★'.repeat(5 - value)}</span>
    </span>
  )
}

const ProductCategory = () => {
  const [products, setProducts] = useState([])
  const [active, setActive] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        const data = res.data
        setProducts(data)

        // set first category as default active
        const categories = [...new Set(data.map(p => p.category))]
        setActive(categories[0])
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Dynamic category list
  const TABS = useMemo(() => {
    return [...new Set(products.map(p => p.category))]
  }, [products])

  // Filtered by category
  const filtered = useMemo(() => {
    return products.filter(p => p.category === active)
  }, [products, active])

  // Split into 2 columns
  const half = Math.ceil(filtered.length / 2)
  const leftList = filtered.slice(0, half)
  const rightList = filtered.slice(half)

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>

  return (
    <section className="bg-[#f5f1ec] py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left hero */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl">
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full">
            <img src={hero} alt="Care Collections" fill="true" sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/0 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col">
            <div className="mt-auto max-w-md text-white drop-shadow">
              <h3 className="text-3xl sm:text-4xl font-extrabold">Care Collections</h3>
              <p className="mt-3 text-sm opacity-90">
                Vivulum ut tempor sem leo, a ultricies quam aliquam eget.
              </p>
              <Link
                href="/product"
                className="mt-6 inline-flex items-center gap-2 bg-white/90 text-stone-900 px-5 py-2 text-xs uppercase tracking-[0.25em]">
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="lg:col-span-7">
          <div className="pb-6 border-b border-black/10">
            <Swiper
              slidesPerView={4}
              spaceBetween={12}
              loop={true}
              speed={800}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                0: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {TABS.map((t) => (
                <SwiperSlide key={t}>
                  <button
                    onClick={() => setActive(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ring-1 ring-black/10 whitespace-nowrap transition-colors ${active === t
                      ? "bg-[#efe2cc] text-[#0a0a0a]"
                      : "bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                  >
                    {t}
                  </button>
                </SwiperSlide>

              ))}
            </Swiper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 ">
            <div>
              {leftList.map((p) => (
                <ProductRow key={p._id} product={p} />
              ))}
            </div>
            <div>
              {rightList.map((p) => (
                <ProductRow key={p._id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCategory
