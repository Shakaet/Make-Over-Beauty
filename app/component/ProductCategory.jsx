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
import { Star, StarHalf } from "lucide-react"

const ProductCard = ({ product }) => {
  const discount = product.highprice && product.lowprice
    ? Math.round(((product.highprice - product.lowprice) / product.highprice) * 100)
    : 0;

  return (
    <Link href={`/product/products/${product._id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-square ">
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <span className="bg-white text-[10px] font-semibold px-2 py-1 rounded">
              NEW
            </span>
            {discount > 0 && (
              <span className="bg-[var(--pink)] text-white text-[10px] font-semibold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <img
              src={product.imagePrimary}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-[11px] text-[var(--rose)] uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Rating value={product.rating} />
            <span className="text-xs text-gray-500 ml-1">
              {product.rating}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              ৳{product.lowprice}
            </span>
            {product.highprice && product.highprice > product.lowprice && (
              <>
                <span className="text-sm text-[var(--rose)] line-through">
                  ৳{product.highprice}
                </span>
                <span className="text-xs font-semibold text-[var(--pink)] bg-[var(--pink)]/20 px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function Rating({ value }) {
  return (
    <span className="flex">
      {[...Array(5)].map((_, i) => {
        const fullStars = Math.floor(value);
        const hasHalfStar = value % 1 >= 0.5;

        if (i < fullStars) {
          // Full star
          return (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }

        if (i === fullStars && hasHalfStar) {
          // Half star
          return (
            <StarHalf
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }

        // Empty star
        return (
          <Star
            key={i}
            className="w-4 h-4 fill-gray-200 text-gray-300"
          />
        );
      })}
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

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>

  return (
    <section className="bg-[var(--blush)] py-12 px-4">
      <div className="px-12 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Browse Shop</h2>

          {/* Category Tabs */}
          <div className="w-full sm:w-auto">
            <Swiper
              slidesPerView="auto"
              spaceBetween={8}
              loop={false}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="category-swiper"
            >
              {TABS.map((t) => (
                <SwiperSlide key={t} style={{ width: 'auto' }}>
                  <button
                    onClick={() => setActive(t)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${active === t
                      ? "bg-[var(--pink)] text-white border-[var(--pink)]"
                      : "bg-[var(--blush)] text-gray-700 border-[var(--rose)] hover:border-[var(--pink)]"
                      }`}
                  >
                    {t}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {filtered.slice(-8).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <button className="mt-8 mx-auto block bg-[var(--pink)] text-white px-6 py-2 rounded-full hover:bg-black/80 transition">
          <Link href={`/product?category=${encodeURIComponent(active)}`}>
            CONTINUE SHOPPING
          </Link>
        </button>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}


      </div>
    </section>
  )
}

export default ProductCategory