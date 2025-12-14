'use client'

import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

const CART_EXPIRY_MINUTES = 10080

export default function useAddToCart() {
    const [cart, setCart] = useState([])

    /** ------------------- Load cart from localStorage with expiry check ------------------- **/
    const loadCart = useCallback(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('tempCart') || '[]')
            const now = Date.now()
            const validCart = stored.filter(
                (item) => item.addedAt && now - item.addedAt < CART_EXPIRY_MINUTES * 60 * 1000
            )
            setCart(validCart)
            localStorage.setItem('tempCart', JSON.stringify(validCart))
        } catch (err) {
            console.error('Error loading cart:', err)
            setCart([])
        }
    }, [])

    useEffect(() => {
        loadCart()
        window.addEventListener('cartUpdated', loadCart)
        window.addEventListener('storage', loadCart)

        // Optional: auto-remove expired items every minute
        const interval = setInterval(loadCart, 60 * 1000)
        return () => {
            clearInterval(interval)
            window.removeEventListener('cartUpdated', loadCart)
            window.removeEventListener('storage', loadCart)
        }
    }, [loadCart])

    /** ------------------- Update cart helper ------------------- **/
    const updateCart = useCallback((newCart) => {
        setCart(newCart)
        localStorage.setItem('tempCart', JSON.stringify(newCart))
        window.dispatchEvent(new Event('cartUpdated')) // Notify other components like CartDrawer
    }, [])

    /** ------------------- Add or update product in cart ------------------- **/
    const addToCart = useCallback(
        (product, quantity = 1, onSuccess) => {
            try {
                const { _id, name, imagePrimary, lowprice, stock } = product

                if (!quantity || quantity <= 0) {
                    toast('Please select a valid quantity.')
                    return
                }

                if (quantity > stock) {
                    toast('Not enough stock available!')
                    return
                }

                const existingCart = [...cart]
                const existingIndex = existingCart.findIndex((item) => item.productId === _id)

                if (existingIndex !== -1) {
                    // Update existing quantity
                    const currentQty = existingCart[existingIndex].quantity
                    const newQty = currentQty + quantity
                    if (newQty > stock) {
                        toast('Cannot add more than available stock.')
                        return
                    }
                    existingCart[existingIndex].quantity = newQty
                    existingCart[existingIndex].addedAt = Date.now() // reset timestamp
                } else {
                    // Add new product
                    existingCart.push({
                        productId: _id,
                        name,
                        image: imagePrimary,
                        price: lowprice,
                        quantity,
                        stock,
                        addedAt: Date.now(), // timestamp in ms
                    })
                }

                updateCart(existingCart)
                toast.success(`${name} added to cart!`)
                if (onSuccess) onSuccess()
            } catch (err) {
                console.error('Error adding to cart:', err)
                toast.error('Something went wrong while adding to cart.')
            }
        },
        [cart, updateCart]
    )

    return {
        cart,
        addToCart,
        loadCart,
    }
}
