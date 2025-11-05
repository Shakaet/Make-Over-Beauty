'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react'

const ProductDetailPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mainImage, setMainImage] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [activeTab, setActiveTab] = useState('description')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('/data/products.json')
                const data = await res.json()
                const found = data.find(p => p.id === parseInt(id))
                setProduct(found)
                if (found) setMainImage(found.imagePrimary)
            } catch (err) {
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                Loading product details...
            </div>
        )

    if (!product)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                Product not found.
            </div>
        )
    return (
        <div className='bg-[#f7efe6]'>
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 mb-10 bg-white/70 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-[#E8D8C0]/80 hover:text-gray-900 shadow-sm transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Shop</span>
                </button>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                    {/* Left - Gallery */}
                    <div>
                        <div className="relative rounded-3xl  overflow-hidden bg-white shadow-xl">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-[500px] md:h-[580px]  object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {product.discount && (
                                <div className="absolute top-5 left-5 bg-[#E8D8C0] text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                                    -{product.discount}%
                                </div>
                            )}

                            {/* Wishlist Button */}
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${isWishlisted
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-gray-700 hover:text-red-500'
                                    }`}
                            >
                                <Heart
                                    className={`w-6 h-6 ${isWishlisted ? 'fill-white' : 'fill-transparent'
                                        } transition`}
                                />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 mt-5 justify-center">
                            {[product.imagePrimary, product.imageSecondary].map(
                                (img, index) =>
                                    img && (
                                        <button
                                            key={index}
                                            onClick={() => setMainImage(img)}
                                            className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${mainImage === img
                                                ? 'border-[#E8D8C0] shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-gray-400'
                                                } transition-transform duration-200`}
                                        >
                                            <img
                                                src={img}
                                                alt="thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    )
                            )}
                        </div>
                    </div>

                    {/* Right - Details */}
                    <div className="lg:sticky lg:top-28 space-y-6">
                        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.round(product.rating)
                                            ? 'fill-yellow-400'
                                            : 'fill-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">
                                {product.rating.toFixed(1)} / 5 ({product.reviews || 0} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-3">
                            <span className="text-4xl font-semibold text-gray-800">
                                ${product.lowprice.toFixed(2)}
                            </span>
                            {product.highprice && (
                                <span className="text-2xl text-gray-400 line-through">
                                    ${product.highprice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="bg-[#E8D8C0] hover:bg-[#dec5a4] text-gray-900 font-medium px-10 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition">
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`border-2 font-medium px-10 py-3 rounded-full flex items-center justify-center gap-2 transition ${isWishlisted
                                    ? 'border-pink-800 bg-pink-50 text-pink-800'
                                    : 'border-gray-300 hover:bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <Heart
                                    className={`w-5 h-5 ${isWishlisted ? 'fill-pink-400' : 'fill-transparent'
                                        }`}
                                />
                                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Shipping Info */}
                        <div className="pt-6 text-sm text-gray-500 space-y-1">
                            {/* Shipping Info */}
                            {product.shippingInfo && product.shippingInfo.length > 0 && (
                                <div className="pt-6 text-sm text-gray-500 space-y-1">
                                    {product.shippingInfo.map((info, i) => (
                                        <p key={i}>• {info}</p>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* Tabs */}
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <div className="flex border-b border-gray-200 mb-5">
                                {['description', 'ingredients'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition ${activeTab === tab
                                            ? 'border-[#E8D8C0] text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[120px]">
                                {activeTab === 'description' && (
                                    <p className="text-gray-600 leading-relaxed text-[15px]">
                                        {product.description ||
                                            'This luxurious formula nourishes and rejuvenates your skin using nature’s finest ingredients, leaving it soft, supple, and radiant.'}
                                    </p>
                                )}
                                {activeTab === 'ingredients' && product.ingredients && (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 list-disc list-inside text-gray-600 text-[15px] space-y-1">
                                        {product.ingredients.map((ing, i) => (
                                            <li key={i}>{ing}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        {product.tags && (
                            <div className="pt-6 flex flex-wrap gap-2">
                                {product.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
