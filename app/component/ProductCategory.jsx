"use client"
import React, { useMemo, useState } from 'react'
import Image from 'next/image'

import img1 from '../images/makeup1.jpeg'
import img2 from '../images/makeup2.png'
import img3 from '../images/makeup3.webp'
import img4 from '../images/makeuo4.webp'
import img5 from '../images/makeup5.jpeg'
import hero from '../images/banner1.jpg'

const ALL_PRODUCTS = [
  {
    id: 'p-1',
    name: 'Anti-Aging Face Cream',
    price: '$5.00 – $10.00',
    rating: 4,
    category: 'Skin Care',
    primary: img2,
    secondary: img1,
  },
  {
    id: 'p-2',
    name: 'Moisturizing Curl Activator…',
    price: '$11.00',
    rating: 5,
    category: 'Body Care',
    primary: img3,
    secondary: img4,
  },
  {
    id: 'p-3',
    name: 'Face Moisturizer & Face Wash',
    price: '$11.05',
    rating: 4,
    category: 'Moisturizer',
    primary: img5,
    secondary: img2,
  },
  {
    id: 'p-4',
    name: 'Soothing Sun Cream',
    price: '$6.00 – $13.00',
    rating: 4,
    category: 'Skin Care',
    primary: img1,
    secondary: img5,
  },
  {
    id: 'p-5',
    name: 'Natural Butt Lifting Cream',
    price: '$4.00 – $20.00',
    rating: 4,
    category: 'Body Care',
    primary: img3,
    secondary: img1,
  },
  {
    id: 'p-6',
    name: 'Eye And Lip Wrinkle Cream',
    price: '$5.00 – $8.00',
    rating: 4,
    category: 'Skin Care',
    primary: img4,
    secondary: img2,
  },
  {
    id: 'p-7',
    name: 'Under‑Eye Bags Removal…',
    price: '$6.00',
    rating: 3,
    category: 'Moisturizer',
    primary: img1,
    secondary: img3,
  },
  {
    id: 'p-4',
    name: 'Soothing Sun Cream',
    price: '$6.00 – $13.00',
    rating: 4,
    category: 'Skin Care',
    primary: img1,
    secondary: img5,
  },
  {
    id: 'p-5',
    name: 'Natural Butt Lifting Cream',
    price: '$4.00 – $20.00',
    rating: 4,
    category: 'Body Care',
    primary: img3,
    secondary: img1,
  },
  {
    id: 'p-6',
    name: 'Eye And Lip Wrinkle Cream',
    price: '$5.00 – $8.00',
    rating: 4,
    category: 'Skin Care',
    primary: img4,
    secondary: img2,
  },
  {
    id: 'p-7',
    name: 'Under‑Eye Bags Removal…',
    price: '$6.00',
    rating: 3,
    category: 'Moisturizer',
    primary: img1,
    secondary: img3,
  },
  {
    id: 'p-6',
    name: 'Eye And Lip Wrinkle Cream',
    price: '$5.00 – $8.00',
    rating: 4,
    category: 'Skin Care',
    primary: img4,
    secondary: img2,
  },
    {
    id: 'p-5',
    name: 'Natural Butt Lifting Cream',
    price: '$4.00 – $20.00',
    rating: 4,
    category: 'Body Care',
    primary: img3,
    secondary: img1,
  },
    {
    id: 'p-5',
    name: 'Natural Butt Lifting Cream',
    price: '$4.00 – $20.00',
    rating: 4,
    category: 'Body Care',
    primary: img3,
    secondary: img1,
  },
]

const TABS = ['All Product', 'Skin Care', 'Body Care', 'Moisturizer']

function Rating({ value }) {
  return (
    <span>
      <span className="text-amber-500">{'★'.repeat(value)}</span>
      <span className="text-stone-300">{'★'.repeat(5 - value)}</span>
    </span>
  )
}

const ProductRow = ({ product }) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative w-20 h-24 overflow-hidden rounded-md ring-1 ring-black/5 group">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-out group-hover:-translate-x-full">
          <div className="relative shrink-0 w-full h-full">
            <Image src={product.primary} alt={product.name} fill sizes="96px" className="object-cover" />
          </div>
          <div className="relative shrink-0 w-full h-full">
            <Image src={product.secondary} alt={`${product.name} alt`} fill sizes="96px" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-stone-900 truncate">{product.name}</p>
        <div className="mt-1 text-xs"><Rating value={product.rating} /></div>
        <p className="mt-1 text-sm text-stone-700 font-medium">{product.price}</p>
      </div>
    </div>
  )
}

const ProductCategory = () => {
  const [active, setActive] = useState('Skin Care')

  const filtered = useMemo(() => {
    if (active === 'All Product') return ALL_PRODUCTS.slice(0,6)
    return ALL_PRODUCTS.filter((p) => p.category === active)
  }, [active])

  const visible = useMemo(() => filtered.slice(0, 6), [filtered])
  const leftList = useMemo(() => visible.slice(0, Math.ceil(visible.length / 2)), [visible])
  const rightList = useMemo(() => visible.slice(Math.ceil(visible.length / 2)), [visible])

  return (
    <section className="bg-[#f5f1ec] py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left hero */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl">
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full">
            <Image src={hero} alt="Care Collections" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/0 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col">
            <div className="mt-auto max-w-md text-white drop-shadow">
              <h3 className="text-3xl sm:text-4xl font-extrabold">Care Collections</h3>
              <p className="mt-3 text-sm opacity-90">Vivulum ut tempor sem leo, a ultricies quam aliquam eget.</p>
              <button className="mt-6 inline-flex items-center gap-2 bg-white/90 text-stone-900 px-5 py-2 text-xs uppercase tracking-[0.25em]">View All</button>
            </div>
          </div>
        </div>

        {/* Right side - tabs and list */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-3 pb-6 border-b border-black/10">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium ring-1 ring-black/10 transition-colors ${
                  active === t ? 'bg-[#efe2cc] text-[#0a0a0a]' : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div>
              {leftList.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
            <div>
              {rightList.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCategory