'use client'

import { useEffect, useState, useCallback } from 'react'

export default function useAddToCart() {
    const [cart, setCart] = useState([])

    //  Load cart from localStorage
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('tempCart') || '[]')
            setCart(stored)
        } catch (err) {
            console.error('Error loading cart:', err)
        }
    }, [])

    //  Sync with localStorage + broadcast to other components
    const updateCart = useCallback((newCart) => {
        setCart(newCart)
        localStorage.setItem('tempCart', JSON.stringify(newCart))
        window.dispatchEvent(new Event('storage')) // Notify others like CartDrawer
    }, [])

    // Add or update product in cart
    const addToCart = useCallback(
        (product, quantity, onSuccess) => {
            try {
                const { _id, name, imagePrimary, lowprice, stock } = product
                if (!quantity || quantity <= 0) {
                    alert('Please select a valid quantity.')
                    return
                }
                if (quantity > stock) {
                    alert('Not enough stock available!')
                    return
                }

                const existingCart = [...cart]
                const existingIndex = existingCart.findIndex(
                    (item) => item.productId === _id
                )

                if (existingIndex !== -1) {
                    // Update existing item quantity
                    const currentQty = existingCart[existingIndex].quantity
                    const newQty = currentQty + quantity

                    if (newQty > stock) {
                        alert('Cannot add more than available stock.')
                        return
                    }

                    existingCart[existingIndex].quantity = newQty
                } else {
                    // Add new product to cart
                    existingCart.push({
                        productId: _id,
                        name,
                        image: imagePrimary,
                        price: lowprice,
                        quantity,
                        stock,
                        addedAt: new Date().toISOString(),
                    })
                }

                updateCart(existingCart)
                alert(`${name} added to cart!`)
                if (onSuccess) onSuccess()
            } catch (err) {
                console.error('Error adding to cart:', err)
                alert('Something went wrong while adding to cart.')
            }
        },
        [cart, updateCart]
    )



    return {
        cart,
        addToCart,
    }
}
