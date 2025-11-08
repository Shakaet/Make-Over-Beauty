'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import api from '@/app/libs/axios'
import { Context } from '@/app/provider/AuthProvider'

export default function useAddToCart() {
    const router = useRouter()
    const { user } = useContext(Context)

    const addToCart = async (productId, quantity, currentStock, onSuccess) => {
        try {
            if (!user) {
                alert('Please login first.')
                router.push('/login')
                return
            }

            if (quantity <= 0) {
                alert('Please select a quantity before adding to cart.')
                return
            }

            if (quantity > currentStock) {
                alert('Not enough stock available!')
                return
            }

            const payload = {
                userEmail: user.email,
                quantity,
            }

            const res = await api.post(`/api/addTocart/${productId}`, payload)

            if (res.status === 200 || res.status === 201) {
                alert('Added to cart successfully!')
                if (onSuccess) onSuccess()
            } else {
                alert('Failed to add to cart. Try again later.')
            }
        } catch (err) {
            console.error('Add to cart error:', err)

            if (err?.response?.status === 404) {
                alert('API endpoint not found — please check your backend route name or URL.')
            } else if (err?.response?.status === 400) {
                alert(err.response.data.message || 'Bad request — check request body.')
            } else {
                alert('Failed to add to cart. Please try again.')
            }
        }
    }

    return { addToCart }
}
