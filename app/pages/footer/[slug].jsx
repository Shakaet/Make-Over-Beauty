'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { footerLinks } from '@/app/footer/FooterData'

export default function FooterDetails() {
    const { slug } = useParams()
    const router = useRouter()

    // Find matching footer link
    const linkData = footerLinks
        .flatMap(section => section.links)
        .find(link => link.slug === slug)

    // Redirect if no matching link found
    useEffect(() => {
        if (!linkData) {
            router.replace('/')  
        }
    }, [linkData, router])
    if (!linkData) return null

    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-4">{linkData.label}</h1>
            <p className="text-gray-700 leading-relaxed">{linkData.description}</p>

            <div className="mt-8">
                <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
            </div>
        </div>
    )
}
