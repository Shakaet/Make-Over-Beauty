'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import api from '../libs/axios'

const CategoryShowcase = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch categories with featured products
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Replace with your API endpoint
                const response = api.get('/api/products')
                const data = await response.json()
                setCategories(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching categories:', error)
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // Fallback demo data for display
    const demoCategories = [
        {
            _id: '1',
            name: 'কসমেটিক কালার',
            slug: 'cosmetic-color',
            imageprimary: '/images/categories/cosmetic.jpg',
            productCount: 45,
            bgColor: 'from-pink-200 to-purple-200'
        },
        {
            _id: '2',
            name: 'গার্গেটস কালেকশন',
            slug: 'gadgets-collection',
            imageprimary: '/images/categories/gadgets.jpg',
            productCount: 32,
            bgColor: 'from-blue-200 to-cyan-200'
        },
        {
            _id: '3',
            name: 'মাদ্য - কন্ডিশনার',
            slug: 'hair-conditioner',
            imageprimary: '/images/categories/hair-care.jpg',
            productCount: 28,
            bgColor: 'from-teal-200 to-green-200'
        }
    ]

    const displayCategories = categories.length > 0 ? categories : demoCategories

    if (loading) {
        return (
            <section className='py-16 bg-gradient-to-b from-white to-pink-50'>
                <div className='mx-auto max-w-7xl px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[1, 2, 3].map(i => (
                            <div key={i} className='h-64 bg-gray-200 rounded-2xl animate-pulse'></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className='py-16 bg-gradient-to-b from-white to-pink-50'>
            <div className='mx-auto max-w-7xl px-6'>
                {/* Section Header */}
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                        Shop By Category
                    </h2>
                    <p className='text-gray-600 text-lg'>
                        Explore our wide range of premium products
                    </p>
                </div>

                {/* Category Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {displayCategories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const CategoryCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            href={`/categories/${category.slug}`}
            className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-90`}></div>

            {/* Background Image */}
            <div className='relative h-64 overflow-hidden'>
                <Image
                    src={category.imageprimary}
                    alt={category.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                />

                {/* Overlay Gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
            </div>

            {/* Content */}
            <div className='absolute inset-0 flex flex-col justify-end p-6'>
                {/* Category Name */}
                <h3 className='text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg'>
                    {category.name}
                </h3>

                {/* Product Count */}
                <p className='text-white/90 text-sm mb-4 drop-shadow-md'>
                    {category.productCount} পণ্য উপলব্ধ
                </p>

                {/* Call to Action Button */}
                <button className={`
          flex items-center gap-2 px-6 py-2.5 
          bg-white text-gray-800 rounded-full 
          font-medium text-sm shadow-lg
          transition-all duration-300
          ${isHovered ? 'bg-pink-600 text-white translate-x-2' : ''}
          w-fit
        `}>
                    <span>এখনই কিনুন</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                </button>
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-4 right-4'>
                <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export default CategoryShowcase