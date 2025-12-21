"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { getAllProducts } from "../api/productApi"
import { Star, StarHalf } from "lucide-react"
import { categoryApi } from "../api/categoryApi";

const ProductCard = ({ product }) => {
  const discount = product.highprice && product.lowprice
    ? Math.round(((product.highprice - product.lowprice) / product.highprice) * 100)
    : 0;

  // Get category name from populated object or direct property
  const categoryName = product.category_id?.categoryName || product.category || "Uncategorized";

  return (
    <Link href={`/product/products/${product._id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-square">
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
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
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
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-[11px] text-[var(--rose)] uppercase tracking-wide mb-1">
            {categoryName}
          </p>
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Rating value={product.rating} />
            <span className="text-xs text-gray-500 ml-1">
              {product.rating?.toFixed(1) || "0.0"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              ৳{product.lowprice || product.highprice || "0"}
            </span>
            {product.highprice && product.highprice > (product.lowprice || 0) && (
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
  const ratingValue = value || 0;

  return (
    <span className="flex">
      {[...Array(5)].map((_, i) => {
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 >= 0.5;

        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }

        if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        }

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
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both APIs
        const [productRes, categoryRes] = await Promise.all([
          getAllProducts(),
          categoryApi.getAllCategory(),
        ]);

        // Handle products
        if (productRes?.data) {
          const productsData = productRes.data;
          setProducts(productsData);
        }

        // Handle categories
        if (Array.isArray(categoryRes)) {
          setCategories(categoryRes);
        } else if (categoryRes?.data && Array.isArray(categoryRes.data)) {
          setCategories(categoryRes.data);
        } else {
          setCategories([]);
        }

      } catch (err) {
        console.error("Error in fetchData:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get categories that actually have products
  const categoriesWithProducts = useMemo(() => {
    if (!products.length || !categories.length) return [];

    // Filter categories that have at least one product
    return categories.filter(category => {
      return products.some(product => {
        const productCategory = product.category_id?.categoryName || product.category;
        return productCategory === category.categoryName;
      });
    });
  }, [products, categories]);

  // Get category names for tabs (only those with products)
  const TABS = useMemo(() => {
    return categoriesWithProducts.map(category => category.categoryName);
  }, [categoriesWithProducts]);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    if (!active || !products.length) return [];

    return products.filter(product => {
      const productCategory = product.category_id?.categoryName || product.category;
      return productCategory === active;
    });
  }, [products, active]);

  // Set default active category if not set
  useEffect(() => {
    if (!active && TABS.length > 0) {
      setActive(TABS[0]);
    }
  }, [TABS, active]);

  if (loading) {
    return (
      <section className="bg-[var(--blush)] py-12 px-4">
        <div className="px-12 mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-[var(--pink)] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[var(--blush)] py-12 px-4">
        <div className="px-12 mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[var(--pink)] text-white rounded-full hover:bg-pink-600"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--blush)] py-12 px-4">
      <div className="px-12 mx-auto px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 pb-2">
              Browse Shop
            </h2>
          </div>

          {/* Category Tabs - Only show categories that have products */}
          {TABS.length > 0 ? (
            <div className="w-full sm:w-auto overflow-hidden">
              <Swiper
                slidesPerView="auto"
                spaceBetween={12}
                loop={false}
                className="category-swiper"
                breakpoints={{
                  320: { slidesPerView: 'auto', spaceBetween: 8 },
                  640: { slidesPerView: 'auto', spaceBetween: 12 },
                }}
              >
                {TABS.map((tabName) => (
                  <SwiperSlide key={tabName} style={{ width: 'auto' }}>
                    <button
                      onClick={() => setActive(tabName)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${active === tabName
                        ? "bg-[var(--pink)] text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[var(--pink)] hover:text-[var(--pink)]"
                        }`}
                    >
                      {tabName}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              No categories with products available
            </div>
          )}
        </div>

        {/* Active category info */}
        {active && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {active} ({filteredProducts.length} products)
            </h3>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* View More Button */}
            {active && (
              <div className="mt-12 text-center">
                <Link
                  href={`/product?category=${encodeURIComponent(active)}`}
                  className="inline-block bg-[var(--pink)] text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg"
                >
                  CONTINUE SHOPPING →
                </Link>
              </div>
            )}
          </>
        ) : active && TABS.length > 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found in {active}
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products available
            </h3>
            <p className="text-gray-600">
              Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategory;