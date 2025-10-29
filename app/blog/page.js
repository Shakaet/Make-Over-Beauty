'use client'

import React, { useState } from 'react'
import Heading from '../component/Heading'
import SidebarBlog from './SidebarBlog'
import Pagination from '../component/Pagination'
import BlogCard from './BlogCard'
import ImageModal from '../component/ImageModal'

const posts = [
  {
    id: 1,
    title: 'Making CBD-Infused Pastries And Cupcakes',
    date: 'Jun 24, 2023',
    excerpt: 'Nibh tellus molestie nunc non blandit massa...',
    categories: ['Sun Protection'],
    tags: ['Sensitive'],
    image: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/blog-1.jpg'
  },
  {
    id: 2,
    title: 'Natural And Detergent-Free Handmade Soap',
    date: 'Jun 24, 2023',
    excerpt: 'Feugiat tempor nec nisi pretium fusce id...',
    categories: ['Enlarged Pores', 'Dryness'],
    tags: ['Normal', 'Combination'],
    image: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/blog-2.jpg'
  },
  {
    id: 3,
    title: 'Fine And Smooth Organic Face Pack',
    date: 'Oct 29, 2025',
    excerpt:
      'Dempor nec feugiat nisl pretium fusce id. Nibh tellus molestie nunc non blandit...',
    categories: ['Dark Spot', 'Fine Lines'],
    tags: ['Combination'],
    image:
      'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/blog-3.webp',
    slug: 'post-title-one'
  }
]

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

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

  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading />
      <section className='relative bg-[#f7efe6] px-4 py-10 sm:px-10 lg:px-16'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
          <div className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:order-2'>
            {currentPosts.length > 0 ? (
              currentPosts.map(post => <BlogCard key={post.id} post={post} />)
            ) : (
              <p className='text-center text-gray-600 col-span-full'>
                No posts found.
              </p>
            )}
          </div>
          <div className='lg:order-1'>
            <SidebarBlog
              posts={posts}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              onImageClick={handleImageClick}
            />
          </div>
        </div>

        <div className='flex justify-center mt-10'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {showModal && (
        <ImageModal image={modalImage} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Page
