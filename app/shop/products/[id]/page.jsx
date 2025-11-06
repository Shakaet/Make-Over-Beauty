'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Heart, ShoppingBag, Star, Plus, Minus, Car } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import axios from 'axios'
import api from '@/app/libs/axios'

const ProductDetailPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const [mainImage, setMainImage] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [activeTab, setActiveTab] = useState('description')
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                // Fetch single product
                const res = await api.get(`/api/products/product/${id}`)
                const data = res.data.data

                if (data) {
                    setProduct(data)
                    setMainImage(data.imagePrimary)

                    // Fetch related items (optional)
                    try {
                        const relatedRes = await api.get(`/api/products/all-products`)
                        const all = relatedRes.data.data
                        const relatedItems = all
                            .filter(p => p.category === data.category && p._id !== data._id)
                            .slice(0, 4)
                        setRelated(relatedItems)
                    } catch (relatedErr) {
                        console.error('Error fetching related products:', relatedErr)
                    }
                } else {
                    console.error('Product not found.')
                }
            } catch (err) {
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])


    const handleQuantity = type => {
        if (type === 'add') setQuantity(q => q + 1)
        else if (quantity > 0) setQuantity(q => q - 1)
    }

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
        <div className="bg-gradient-to-b from-[#f9f5ef] to-[#f1e8db]">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 mb-10 bg-white/70 backdrop-blur-sm border border-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-[#E8D8C0]/80 hover:text-gray-900 shadow-sm transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Shop</span>
                </button>

                {/* Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                    {/* Gallery */}
                    <div>
                        <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-[480px] md:h-[560px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {product.discount && (
                                <div className="absolute top-5 left-5 bg-[#E8D8C0] text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                                    -{product.discount}%
                                </div>
                            )}
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all ${isWishlisted
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
                        <div className="mt-6">
                            <Swiper
                                modules={[Navigation, Thumbs]}
                                slidesPerView={4}
                                spaceBetween={14}
                                navigation
                                className="!px-6"
                            >
                                {[product.imagePrimary, product.imageSecondary, product.imageThird, product.imageFourth]
                                    .filter(Boolean)
                                    .map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <button
                                                onClick={() => setMainImage(img)}
                                                className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${mainImage === img
                                                    ? 'border-[#E8D8C0] shadow-lg scale-105'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                    } transition-transform duration-200`}
                                            >
                                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                                            </button>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className=" lg:top-28 bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-7 border border-[#e6dbc7]/60">
                        {/* Category / Tagline */}
                        <p className="text-sm uppercase tracking-wider text-[#8b7355]/80 font-medium">
                            {product.category || 'Natural Collection'}
                        </p>

                        {/* Product Name */}
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Short Tagline */}
                        <p className="text-gray-600 italic text-sm">
                            A blend of luxury and nature — made to enhance your natural glow.
                        </p>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 pt-2">
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

                        {/* Price Block */}
                        <div className="pt-3 pb-2 border-y border-gray-200">
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-4xl font-bold text-gray-900 drop-shadow-sm">
                                    ${product.lowprice.toFixed(2)}
                                </span>
                                {product.highprice && (
                                    <span className="text-2xl text-gray-400 line-through">
                                        ${product.highprice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {product.discount && (
                                <p className="text-sm text-[#8B7355] font-medium mt-1">
                                    Save {product.discount}% today!
                                </p>
                            )}
                        </div>

                        {/* Key Highlights */}
                        <ul className="text-sm text-gray-700 space-y-2 pt-2">
                            <li>• 100% organic & cruelty-free</li>
                            <li>• Gentle on all skin types</li>
                            <li>• Free shipping on orders over $50</li>
                        </ul>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                                <button
                                    onClick={() => handleQuantity('minus')}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-5 text-gray-800 font-medium">{quantity}</span>
                                <button
                                    onClick={() => handleQuantity('add')}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button className="bg-[#E8D8C0] hover:bg-[#d8c0a1] text-gray-900 font-semibold px-10 py-3 rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.04]">
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Wishlist & Shipping Info */}
                        <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`flex items-center gap-2 font-medium transition ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-400'
                                    }`}
                            >
                                <Heart
                                    className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : 'fill-transparent'
                                        }`}
                                />
                                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                            </button>
                            <span className="text-gray-500 flex  items-center gap-2">
                                <Car className="transform -scale-x-100" />
                                <span className='pt-1'>Ships in 2–4 business days </span>
                            </span>
                        </div>
                    </div>

                </div>

                {/* Tabs Section */}
                <div className="mt-20 border-t border-gray-300 pt-10">
                    <div className="flex border-b border-gray-200 mb-6 justify-center">
                        {['description', 'ingredients', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 text-sm font-medium capitalize border-b-2 transition-all ${activeTab === tab
                                    ? 'border-[#E8D8C0] text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed text-[15px]">
                        {activeTab === 'description' && (
                            <p>{product.description || 'No description available.'}</p>
                        )}
                        {activeTab === 'ingredients' && product.ingredients && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 list-disc list-inside space-y-1">
                                {product.ingredients.map((ing, i) => (
                                    <li key={i}>{ing}</li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                {product.reviewsList?.length > 0 ? (
                                    product.reviewsList.map((rev, i) => (
                                        <div
                                            key={i}
                                            className="border p-4 rounded-xl bg-white shadow-sm"
                                        >
                                            <div className="flex justify-between mb-1">
                                                <span className="font-semibold text-gray-800">
                                                    {rev.user}
                                                </span>
                                                <div className="flex text-yellow-500">
                                                    {[...Array(5)].map((_, j) => (
                                                        <Star
                                                            key={j}
                                                            className={`w-4 h-4 ${j < rev.rating
                                                                ? 'fill-yellow-400'
                                                                : 'fill-gray-200'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{rev.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No reviews yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {related.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => router.push(`/product/${item.id}`)}
                                    className="group bg-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <img
                                        src={item.imagePrimary}
                                        alt={item.name}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-800 group-hover:text-gray-900 truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-[#8B7355] font-semibold mt-1">
                                            ${item.lowprice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailPage
