'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BlogDetailPage = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch('/data/posts.json')
                if (!res.ok) throw new Error('Failed to load posts')
                const data = await res.json()
                const foundPost = data.find(p => p.slug === slug)
                if (!foundPost) throw new Error('Post not found')
                setPost(foundPost)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug])

    // Ensure posts is an array, exclude current post, then take last 4
    const safePostsArray = Array.isArray(post) ? post : []
    const recentCandidates = safePostsArray.filter(p => p.slug !== post.slug && String(p.id) !== String(post.id))
    // If your array is already ordered newest-last, we take last 4.
    // If you want newest-first, reverse() first.
    const last4 = recentCandidates.length
        ? recentCandidates.slice(-4).reverse() // reverse to show newest first among those last 4
        : []

    if (loading) return <p className="text-center mt-20">Loading...</p>
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>

    return (
        <div className='bg-[#f7efe6]'>
            <div className="max-w-7xl mx-auto px-4 py-22 sm:px-6 lg:px-8 rounded-lg ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 mb-10 bg-white/70 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-[#E8D8C0]/80 hover:text-gray-900 shadow-sm transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Shop</span>
                        </button>

                        {/* Hero Section */}
                        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg mb-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            {/* Date & Categories */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm font-medium">{post.date}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {post.categories.map((cat, i) => (
                                        <span
                                            key={i}
                                            className="bg-[#B49A7E]/90 hover:bg-[#B49A7E] transition text-xs px-3 py-1 rounded-full font-semibold"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            {post.title}
                        </h1>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {post.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-sm text-[#B49A7E] border border-[#B49A7E] px-3 py-1 rounded-full hover:bg-[#B49A7E] hover:text-white transition"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg sm:prose-xl max-w-none text-gray-800 leading-relaxed">
                            {post.content.split('\n').map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                        {/* Share Buttons */}
                        <div className="mt-12 border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Share this post</h3>
                            <div className="flex gap-4">
                                <a
                                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#4267B2] text-white px-4 py-2 rounded-full text-sm hover:bg-[#365899] transition"
                                >
                                    Facebook
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1DA1F2] text-white px-4 py-2 rounded-full text-sm hover:bg-[#0d8de1] transition"
                                >
                                    Twitter / X
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#0077B5] text-white px-4 py-2 rounded-full text-sm hover:bg-[#006097] transition"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 mt-22">
                        <div className="sticky top-24 space-y-10">
                            {/* Recent Posts */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Recent Posts</h3>
                                <ul className="space-y-4">
                                    {Array.isArray(last4) && last4.length > 0 ? (
                                        last4.map((item, i) => (
                                            <li key={i} className="flex gap-4">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                                                <div>
                                                    <Link href={`/blog/single-blog/${item.slug}`} className="font-semibold text-sm text-gray-800 hover:text-[#B49A7E] transition">
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-xs text-gray-500">{item.date}</p>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500">No recent posts.</li>
                                    )}
                                </ul>
                            </div>

                            {/* Social Follow */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="text-[#4267B2] hover:text-[#365899]">
                                        <i className="fab fa-facebook-f text-xl"></i>
                                    </a>
                                    <a href="#" className="text-[#1DA1F2] hover:text-[#0d8de1]">
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="#" className="text-[#E1306C] hover:text-[#C13584]">
                                        <i className="fab fa-instagram text-xl"></i>
                                    </a>
                                    <a href="#" className="text-[#0077B5] hover:text-[#006097]">
                                        <i className="fab fa-linkedin-in text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default BlogDetailPage
