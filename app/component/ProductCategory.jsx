"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getAllProducts } from "../api/productApi";
import { categoryApi } from "../api/categoryApi";
import { Star, StarHalf } from "lucide-react";

/* ---------------- PRODUCT CARD ---------------- */

const ProductCard = ({ product }) => {
  const discount =
    product.highprice && product.lowprice
      ? Math.round(
        ((product.highprice - product.lowprice) / product.highprice) * 100
      )
      : 0;

  const categoryName =
    product.category_id?.categoryName ||
    product.category ||
    "-";

  return (
    <Link href={`/product/products/${product._id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative aspect-square">
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <span className="bg-white text-[10px] font-semibold px-2 py-1 rounded">
              NEW
            </span>
            {discount > 0 && (
              <span className="bg-[var(--pink)] text-white text-[10px] px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Image */}
          <img
            src={product.imagePrimary}
            alt={product.name}
            className="w-full h-full object-contain"
            onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=No+Image")
            }
          />
        </div>

        <div className="p-4">
          <p className="text-[11px] text-[var(--rose)] uppercase mb-1">
            {categoryName} - {product.subcategory}
          </p>

          <h3 className="text-lg font-medium line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Rating value={product.rating} />
            <span className="text-xs text-gray-500">
              {product.rating?.toFixed(1) || "0.0"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              ৳{product.lowprice || product.highprice}
            </span>
            {product.highprice > product.lowprice && (
              <span className="text-sm text-gray-400 line-through">
                ৳{product.highprice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ---------------- RATING ---------------- */

const Rating = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;

  return (
    <span className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < full)
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        if (i === full && half)
          return <StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        return <Star key={i} className="w-4 h-4 fill-gray-200 text-gray-300" />;
      })}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [productRes, categoryRes] = await Promise.all([
          getAllProducts(),
          categoryApi.getAllCategory(),
        ]);

        setProducts(productRes?.data || []);
        setCategories(categoryRes?.data || categoryRes || []);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ----------- TABS (ALL + categories) ----------- */
  const TABS = useMemo(
    () => ["ALL", ...categories.map((c) => c.categoryName)],
    [categories]
  );

  /* ----------- FILTER PRODUCTS ----------- */
  const filteredProducts = useMemo(() => {
    if (active === "ALL") return products;

    return products.filter((p) => {
      const cat = p.category_id?.categoryName || p.category;
      return cat === active;
    });
  }, [products, active]);

  const activeCategory = useMemo(() => {
    if (active === "ALL") return null;
    return categories.find(
      (c) => c.categoryName === active
    );
  }, [active, categories]);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <div className="w-8 h-8 border-2 border-[var(--pink)] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="bg-[var(--blush)] py-12">
      <div className="px-8 md:px-14 mx-auto">

        {/* Header */}
        <div className="grid md:grid-cols-2 grid-cols-1 mb-10 gap-6">
          <h2 className="text-5xl font-medium">
            Browse Shop
          </h2>

          {/* Tabs */}
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            grabCursor={true}              // mouse drag
            freeMode={true}                // smooth free scrolling
            mousewheel={{ forceToAxis: true }} // mouse wheel horizontal
            className="cursor-grab active:cursor-grabbing w-full "
          >
            {TABS.map((tab) => (
              <SwiperSlide key={tab} style={{ width: "auto" }}>
                <button
                  onClick={() => setActive(tab)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${active === tab
                    ? "bg-[var(--pink)] text-white shadow-md"
                    : "bg-white border hover:text-[var(--pink)]"
                    }`}
                >
                  {tab}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {filteredProducts.slice(0, 8).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href={
                active === "ALL"
                  ? "/product"
                  : {
                    pathname: "/product",
                    query: { category: activeCategory?._id },
                  }
              }
              className="inline-block bg-[var(--pink)] text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg"
            >
              CONTINUE SHOPPING →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCategory;
