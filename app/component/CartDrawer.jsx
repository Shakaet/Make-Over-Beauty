'use client'

import { useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'

export default function CartDrawer({ isOpen, toggleDrawer }) {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    // Coupon states
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [appliedCoupon, setAppliedCoupon] = useState(null)

    // Demo coupon list (you can replace with API later)
    const COUPONS = {
        SAVE10: 10,   // 10% discount
        SAVE20: 20,   // 20% discount
        FLAT50: 50    // 50% discount
    }

    // Load cart data
    const loadCart = () => {
        const stored = JSON.parse(localStorage.getItem('tempCart') || '[]')
        setCartItems(stored)
        setLoading(false)
    }

    useEffect(() => {
        loadCart()
        window.addEventListener('storage', loadCart)
        return () => window.removeEventListener('storage', loadCart)
    }, [])

    const handleRemove = (productId) => {
        if (!confirm('Remove this item from your cart?')) return
        const updated = cartItems.filter((item) => item.productId !== productId)
        setCartItems(updated)
        localStorage.setItem('tempCart', JSON.stringify(updated))
        window.dispatchEvent(new Event('storage'))
    }

    const subtotal = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
    )

    const totalAfterDiscount = subtotal - discount

    const handleClearCart = () => {
        if (!confirm('Clear your entire cart?')) return
        setCartItems([])
        localStorage.removeItem('tempCart')
        setDiscount(0)
        setAppliedCoupon(null)
        window.dispatchEvent(new Event('storage'))
    }

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase()

        if (!COUPONS[code]) {
            alert('Invalid coupon code')
            setDiscount(0)
            setAppliedCoupon(null)
            return
        }

        const percentage = COUPONS[code]
        const discountAmount = (subtotal * percentage) / 100

        setDiscount(discountAmount)
        setAppliedCoupon({ code, percentage })
    }

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
                    ) : cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
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
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
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
                            disabled={cartItems.length === 0}
                            className="w-1/2 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            Clear
                        </button>
                        <button
                            disabled={cartItems.length === 0}
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
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black px-1 rounded-full text-[10px] text-white">
                        {cartItems.length}
                    </span>
                )}
            </button>
        </>
    )
}
