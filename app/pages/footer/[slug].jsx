'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { footerLinks } from '@/app/footer/FooterData'

export default function FooterDetails() {
    const { slug } = useParams()

    // Find content by slug
    const linkData = footerLinks
        .flatMap(section => section.links)
        .find(link => link.slug === slug)

    if (!linkData) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
                <p className="text-gray-500 mb-4">The requested content could not be found.</p>
                <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
            </div>
        )
    }

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
