'use client'

import { useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import api from '../libs/axios'
import toast from 'react-hot-toast'
import useAddToCart from '@/app/hooks/useAddToCart'

export default function CartDrawer({ isOpen, toggleDrawer }) {
    const { cart, addToCart, loadCart } = useAddToCart()
    const [loading, setLoading] = useState(true)

    // Coupon states
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [appliedCoupon, setAppliedCoupon] = useState(null)

    // Load cart and handle updates
    useEffect(() => {
        loadCart()
        const handleUpdate = () => loadCart()
        window.addEventListener('cartUpdated', handleUpdate)
        window.addEventListener('storage', handleUpdate)
        setLoading(false)

        return () => {
            window.removeEventListener('cartUpdated', handleUpdate)
            window.removeEventListener('storage', handleUpdate)
        }
    }, [loadCart])

    const handleRemove = (productId) => {
        if (!confirm('Remove this item from your cart?')) return
        const updated = cart.filter((item) => item.productId !== productId)
        localStorage.setItem('tempCart', JSON.stringify(updated))
        window.dispatchEvent(new Event('cartUpdated'))
        toast.success('Item removed from cart')
    }

    const handleClearCart = () => {
        if (!confirm('Clear your entire cart?')) return
        localStorage.removeItem('tempCart')
        window.dispatchEvent(new Event('cartUpdated'))
        setDiscount(0)
        setAppliedCoupon(null)
        toast.success('Cart cleared')
    }

    const applyCoupon = async () => {
        const code = coupon.trim()
        if (!code) {
            toast('Please enter a coupon code')
            return
        }
        try {
            const res = await api.post('api/coupons/validate', { code })
            const data = res.data

            if (!data.success) {
                setDiscount(0)
                setAppliedCoupon(null)
                toast.error('Invalid or expired coupon')
                return
            }

            const percentage = data.discountPercentage
            const subtotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
            const discountAmount = (subtotal * percentage) / 100

            setDiscount(discountAmount)
            setAppliedCoupon({ code, percentage })
            toast.success(`Coupon applied: ${percentage}% discount`)
        } catch (error) {
            toast.error('Server error validating coupon')
        }
    }

    const subtotal = cart.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
    )
    const totalAfterDiscount = subtotal - discount

    return (
        <>
            {isOpen && (
                <div
                    onClick={toggleDrawer}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={toggleDrawer}>
                        <X className="w-5 h-5 text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* Cart List */}
                <div className="flex-1 overflow-y-auto max-h-[60vh] divide-y">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading...</p>
                        </div>
                    ) : cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.productId} className="flex items-center p-4 gap-3">
                                <img
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover border"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-900 text-sm">৳{item.price}</p>
                                    <p className="text-xs text-gray-700">
                                        Qty: {item.quantity} / Stock: {item.stock}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Coupon Section */}
                <div className="p-4 border-t">
                    <label className="text-sm font-medium text-gray-700">Have a coupon?</label>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={coupon} onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
                        />
                        <button
                            onClick={applyCoupon}
                            className="bg-gray-900 text-white px-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="border-t p-4 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                        <div className="flex justify-between text-green-600 text-sm">
                            <span>Coupon ({appliedCoupon.code}) -{appliedCoupon.percentage}%</span>
                            <span>-৳{discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span>৳{totalAfterDiscount.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={handleClearCart}
                            disabled={cart.length === 0}
                            className="w-1/2 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            Clear
                        </button>
                        <button
                            disabled={cart.length === 0}
                            className="w-1/2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Cart Icon */}
            <button
                aria-label="Cart"
                onClick={toggleDrawer}
                className="relative hover:opacity-80 p-1"
            >
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
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black px-1 rounded-full text-[10px] text-white">
                        {cart.length}
                    </span>
                )}
            </button>
        </>
    )
}
