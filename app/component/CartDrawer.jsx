'use client'

import { useContext, useEffect, useState, useCallback } from 'react'
import { X, Trash2 } from 'lucide-react'
import { Context } from '../provider/AuthProvider'
import api from '@/app/libs/axios'


export default function CartDrawer({ isOpen, toggleDrawer }) {
    const { user } = useContext(Context)
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCart = useCallback(async () => {
        if (!user?.email) return
        try {
            setLoading(true)
            const res = await api.get(`/api/addTocart/${user.email}`)
            if (res.status === 200) {
                setCartItems(res.data?.data || [])
                setError(null)
            } else {
                setError('Failed to load cart data.')
            }
        } catch (err) {
            console.error('Error fetching cart:', err)
            setError('Failed to load cart.')
        } finally {
            setLoading(false)
        }
    }, [user?.email])

    // Fetch on drawer open or user login
    useEffect(() => {
        if (isOpen && user?.email) fetchCart()
    }, [isOpen, user?.email, fetchCart])

    // Fetch once after page load for count persist
    useEffect(() => {
        if (user?.email) fetchCart()
    }, [user?.email, fetchCart])

    const subtotal = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
    )

    const handleRemove = async (itemId) => {
        if (!confirm('Remove this item from your cart?')) return
        try {
            await api.delete(`/api/addTocart/${itemId}`)
            await fetchCart()
        } catch (err) {
            console.error('Error deleting item:', err)
            alert('Failed to remove item. Try again.')
        }
    }

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleDrawer}
                    className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity'
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className='flex justify-between items-center p-4 border-b'>
                    <h2 className='text-lg font-semibold'>Your Cart</h2>
                    <button onClick={toggleDrawer}>
                        <X className='w-5 h-5 text-gray-600 hover:text-black' />
                    </button>
                </div>

                {/* Cart List */}
                <div className='flex-1 overflow-y-auto max-h-[70vh] divide-y'>
                    {loading ? (
                        <div className='flex justify-center items-center h-full'>
                            <p>Loading...</p>
                        </div>
                    ) : error ? (
                        <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                            <p>{error}</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item._id} className='flex items-center p-4 gap-3'>
                                <img
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    className='w-16 h-16 rounded-lg object-cover border'
                                />
                                <div className='flex-1'>
                                    <h3 className='text-sm font-medium'>{item.name}</h3>
                                    <p className='text-gray-900 text-sm'>৳{item.price}</p>
                                    <p className='text-xs text-gray-700'>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className='text-gray-400 hover:text-red-500'
                                >
                                    <Trash2 className='w-4 h-4' />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Summary */}
                <div className='border-t p-4'>
                    <div className='flex justify-between mb-3'>
                        <span className='text-gray-600'>Subtotal</span>
                        <span className='font-semibold'>৳{subtotal.toFixed(2)}</span>
                    </div>
                    <button
                        disabled={cartItems.length === 0}
                        className='w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50'
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* Cart Icon for Navbar */}
            <button
                aria-label='Cart'
                onClick={toggleDrawer}
                className='relative hover:opacity-80 p-1'
            >
                <svg
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                >
                    <circle cx='9' cy='20' r='1.5' />
                    <circle cx='18' cy='20' r='1.5' />
                    <path d='M2 3h3l3 12h10l2-8H6' strokeLinecap='round' />
                </svg>
                <span className='-top-1 -right-1 absolute bg-black px-1 rounded-full text-[10px] text-white'>
                    {cartItems.length}
                </span>
            </button>
        </>
    )
}
