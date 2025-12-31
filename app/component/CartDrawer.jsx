'use client'

import { useContext, useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import api from '../libs/axios'
import toast from 'react-hot-toast'
import useAddToCart from '@/app/hooks/useAddToCart'
import { Context } from '../provider/AuthProvider'
import { useRouter } from 'next/navigation'
import { createOrder } from '../api/orderApi'

export default function CartDrawer({ isOpen, toggleDrawer }) {
    const { cart, loadCart } = useAddToCart() 
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { user } = useContext(Context)

    // Coupon states
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [appliedCoupon, setAppliedCoupon] = useState(null)

    // Load cart on mount + listen to updates
    useEffect(() => {
        loadCart()
        const handleUpdate = () => loadCart()
        window.addEventListener('cartUpdated', handleUpdate)
        window.addEventListener('storage', handleUpdate)

        return () => {
            window.removeEventListener('cartUpdated', handleUpdate)
            window.removeEventListener('storage', handleUpdate)
        }
    }, [loadCart])

    // Add this useEffect to show toast when user is logged in and cart drawer opens
    useEffect(() => {
        if (user && cart.length > 0) {
            // Show toast notification after a short delay
            const timer = setTimeout(() => {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
                    max-w-md w-full bg-gradient-to-r from-green-50 to-emerald-50 
                    border border-green-200 rounded-lg shadow-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                                        <div className="w-3 h-3 bg-green-600 rounded-full relative"></div>
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-semibold text-green-800">Welcome back, {user.name || user.email}!</p>
                                    <p className="mt-1 text-sm text-green-600">You're logged in and ready to checkout.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-green-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-800 focus:outline-none"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ), {
                    duration: 4000,
                    position: 'bottom-right',
                });
            }, 500); // Delay to let drawer open first

            return () => clearTimeout(timer);
        }
    }, [isOpen, user, cart.length]);

    // Remove item
    const handleRemove = (productId) => {
        if (!confirm('Remove this item from your cart?')) return
        const updated = cart.filter(item => item.productId !== productId)
        localStorage.setItem('tempCart', JSON.stringify(updated))
        window.dispatchEvent(new Event('cartUpdated'))
        toast.success('Item removed')
    }

    // Clear cart
    const handleClearCart = () => {
        if (!confirm('Clear entire cart?')) return
        localStorage.removeItem('tempCart')
        window.dispatchEvent(new Event('cartUpdated'))
        setDiscount(0)
        setAppliedCoupon(null)
        toast.success('Cart cleared')
    }

    // ---------------------------
    //  PLACE ORDER (MAIN FIX)
    // ---------------------------
    const placeOrder = async () => {
        if (!user) {
            toast(<div className='text-red-500 text-lg font-semibold px-2'>
                Please login first!
            </div>);
            router.push('/my-account');
            return;
        }

        toggleDrawer();

        setLoading(true);
        try {
            const items = cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));

            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const couponCode = appliedCoupon?.code || '';
            const discountPercent = appliedCoupon?.percentage || 0;
            const totalAmount = subtotal - (subtotal * discountPercent) / 100;

            // Use API service instead of calling api.post directly
            await createOrder({
                email: user.email,
                subtotal,
                couponCode,
                discountPercent,
                totalAmount,
                items
            });

            alert('Order placed successfully!');

            // Clear cart
            localStorage.removeItem('tempCart');
            window.dispatchEvent(new Event('cartUpdated'));
            setDiscount(0);
            setAppliedCoupon(null);
            setCoupon('');

        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };


    // Apply coupon
    const applyCoupon = async () => {
        const code = coupon.trim()
        if (!code) return toast.error("Please enter a coupon")

        try {
            const res = await api.post('api/coupons/validate', { code })
            const data = res.data

            if (!data.success) {
                setDiscount(0)
                setAppliedCoupon(null)
                toast.error('Invalid coupon')
                return
            }

            const percentage = data.discountPercentage
            const subtotal = cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            )

            const discountAmount = (subtotal * percentage) / 100

            setDiscount(discountAmount)
            setAppliedCoupon({ code, percentage })

            toast.success(`Coupon applied (${percentage}% OFF)`)

        } catch (error) {
            const msg = error.response?.data?.message || 'Coupon validation error'
            toast.error(msg)
        }
    }

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
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
                className={`fixed top-0 right-0 h-full w-80 bg-[#FFF5F7] shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-semibold text-[#FF5A7A]">Your Cart</h2>

                    <button onClick={toggleDrawer}>
                        <X className="w-5 h-5 text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* Cart List */}
                <div className="flex-1 overflow-y-auto max-h-[60vh] ">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#FF8FA3]">
                            <p className="text-sm">Your cart is empty</p>
                        </div>

                    ) : (
                        cart.map(item => (
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

                {/* Coupon */}
                <div className="border-[#FFD6DE] p-4 space-y-2 text-[#FF5A7A]">
                    <label className="text-sm font-medium text-[var(--rose)]">Have a coupon?</label>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 border border-[#FFCCD5] rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5A7A]"
                        />
                        <button
                            onClick={applyCoupon}
                            className="bg-[var(--rose)] text-white px-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="border-t p-4 space-y-2 border-[#FFD6DE] text-[#FF5A7A]">
                    <div className="flex justify-between">
                        <span className="text-[var(--pink)] font-medium">Subtotal</span>
                        <span className="font-medium">৳{subtotal.toFixed(2)}</span>
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
                            className="bg-white text-[#FF5A7A] border-[#FF5A7A] border-2 px-4 rounded-xl text-sm hover:opacity-90 transition"
                        >
                            Clear
                        </button>

                        <button
                            onClick={() => {
                                toggleDrawer();
                                placeOrder();
                            }}
                            disabled={cart.length === 0 || loading}
                            className={`w-full ${user
                                ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-200 animate-pulse'
                                : 'bg-[#FF5A7A]'} text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
                        >
                            {/* Subtle shimmer effect for logged-in users */}
                            {user && (
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                            )}

                            <span className="relative flex items-center justify-center gap-2">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : user ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                        Secure Checkout
                                    </span>
                                ) : (
                                    'Login to Checkout'
                                )}
                            </span>

                            {/* Add shimmer animation style */}
                            <style jsx>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }
    `}</style>
                        </button>


                    </div>
                    <div>
                        <p className='text-sm p-2'>
                            * আপনার অর্ডার কনফার্ম করতে চেকআউট বাটনে ক্লিক করুন।
                        </p>
                    </div>
                </div>
            </div>
            {/* Floating Cart Icon
            <button
                aria-label="Cart"
                onClick={toggleDrawer}
                className="relative hover:opacity-80 p-1 cursor-pointer"
            >
                <div className='flex items-center gap-2 rounded-full shadow-lg px-3 py-1 bg-[var(--pink)] text-white'>
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
                    <h1>Cart</h1>
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-white px-2 py-0.5 rounded-full text-xs text-bold ">
                    {cart.length}
                </span>
            </button> */}
        </>
    )
}
