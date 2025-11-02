'use client'

import React, { useEffect, useState } from 'react'
import Heading from '../component/Heading'
import SidebarBlog from './SidebarBlog'
import Pagination from '../component/Pagination'
import BlogCard from './BlogCard'
import ImageModal from '../component/ImageModal'

//import posts from '../data/posts.json'

const Page = () => {
  const [posts, setPosts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const postsPerPage = 6

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/data/posts.json')
        if (!res.ok) throw new Error('Failed to load posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleImageClick = image => {
    setModalImage(image)
    setShowModal(true)
  }

  const toggleCategory = category => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
    setCurrentPage(1)
  }

  const toggleTag = tag => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
    setCurrentPage(1)
  }

  const filteredPosts = posts.filter(post => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.every(cat => post.categories.includes(cat))

    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.every(tag => post.tags.includes(tag))

    return categoryMatch && tagMatch
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const currentPosts = filteredPosts.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  )

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#f7efe6] text-gray-700'>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#f7efe6] text-red-500'>
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading />

      <section className='relative bg-[#f7efe6] px-4 py-10 sm:px-8 md:px-10 lg:px-16 xl:px-20'>
        <div className='grid gap-8 lg:gap-12 lg:grid-cols-4'>
          {/* Sidebar */}
          <aside className='order-2 lg:order-1 lg:col-span-1'>
            <SidebarBlog
              posts={posts}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              onImageClick={handleImageClick}
            />
          </aside>

          {/* Main Content */}
          <main className='order-1 lg:order-2 lg:col-span-3'>
            <div className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8 '>
              {currentPosts.length > 0 ? (
                currentPosts.map(post => <BlogCard key={post.id} post={post} />)
              ) : (
                <p className='col-span-full text-center text-gray-600 text-base sm:text-lg'>
                  No posts found.
                </p>
              )}
            </div>

            {/* Pagination */}
            <div className='flex justify-center mt-10'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <ImageModal image={modalImage} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Page
