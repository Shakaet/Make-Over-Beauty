'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import api from '@/app/libs/axios'
import { Context } from '@/app/provider/AuthProvider'

export default function useAddToCart(fetchCart) {
    const router = useRouter()
    const { user } = useContext(Context)

    const addToCart = async (
        productId,
        quantity,
        currentStock,
        onSuccess
    ) => {
        try {
            if (!user) {
                alert('Please login first.')
                router.push('/my-account')
                return
            }

            if (quantity <= 0) {
                alert('Please select a valid quantity.')
                return
            }

            if (quantity > currentStock) {
                alert('Not enough stock available!')
                return
            }

            const payload = { userEmail: user.email, quantity }

            const res = await api.post(`/api/addTocart/${productId}`, payload)

            if (res.status === 200 || res.status === 201) {
                alert(res.data?.message || 'Added to cart successfully!')
                if (fetchCart) await fetchCart()
                if (onSuccess) onSuccess()
            } else {
                alert('Unexpected response from server.')
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            const message =
                err?.response?.data?.message ||
                (err?.response?.status === 404
                    ? 'Product not found.'
                    : 'Failed to add to cart. Please try again.')
            alert(message)
        }
    }

    return { addToCart }
}
