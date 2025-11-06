'use client'

import { Filter } from 'lucide-react'
import React, { useState } from 'react'

const SidebarBlog = ({
  posts,
  selectedCategories,
  setSelectedCategories,
  toggleCategory,
  selectedTags,
  setSelectedTags,
  toggleTag,
  onImageClick
}) => {
  const allCategories = [...new Set(posts.flatMap(p => p.categories))]
  const allTags = [...new Set(posts.flatMap(p => p.tags))]
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showTagFilters, setShowTagFilters] = useState(false)

  // const handleCategoryChange = category => {
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter(c => c !== category))
  //   } else {
  //     setSelectedCategories([...selectedCategories, category])
  //   }
  // }

  // const handleTagChange = tags => {
  //   if (selectedTags.includes(tags)) {
  //     setSelectedCategories(selectedTags.filter(c => c !== tags))
  //   } else {
  //     setSelectedCategories([...selectedTags, tags])
  //   }
  // }



  return (
    <aside className='space-y-10 w-full'>
      {/* Mobile toggle buttons */}
      <div className="lg:hidden flex justify-between mb-4">
        <button
          onClick={() => {
            setShowCategoryFilter(!showCategoryFilter)
            setShowTagFilters(false)
          }}
          className="flex-1 bg-[#f0e3cd] mr-2 p-2 border border-gray-400 rounded-md text-sm font-semibold text-gray-800"
        >
          <span className='justify-center gap-2 items-center flex'> <Filter size={14} />Filter By Category</span>
        </button>
        <button
          onClick={() => {
            setShowTagFilters(!showTagFilters)
            setShowCategoryFilter(false)
          }}
          className="flex-1 bg-[#f0e3cd] mr-2 p-2 border border-gray-400 rounded-md text-sm font-semibold text-gray-800"
        >
          <span className='justify-center gap-2 items-center flex'> <Filter size={14} />Filter By Tag</span>
        </button>
      </div>


      {/* Categories */}

      <div className={`${showCategoryFilter ? 'block' : 'hidden'} lg:block`}>
        <div className='p-4 border border-gray-400 rounded'>
          <h4 className='bg-[#f0e3cd] mb-3 p-2 font-semibold text-sm sm:text-base'>
            Categories
          </h4>
          <ul className='space-y-2 text-gray-700 text-sm'>
            {allCategories.map(category => (
              <li key={category} className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2 accent-[#c19a6b]'
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span
                  className={`cursor-pointer ${selectedCategories.includes(category)
                    ? 'text-[#c19a6b] font-semibold'
                    : ''
                    }`}
                >
                  {category} (
                  {posts.filter(p => p.categories.includes(category)).length})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Posts */}
      <div className='hidden lg:block p-4 border border-gray-400 rounded'>
        <h4 className='bg-[#f0e3cd] mb-3 p-2 font-semibold text-sm sm:text-base'>
          Recent Post
        </h4>
        {posts
          .slice(-3)
          .reverse()
          .map(post => (
            <div key={post._id} className='flex items-center gap-3 mb-3'>
              <img
                src={post.image}
                alt={post.title}
                className='border w-16 sm:w-20 h-16 sm:h-20 object-cover cursor-pointer'
                onClick={() => onImageClick(post.image)}
              />
              <p className='font-medium text-sm line-clamp-2 leading-tight'>
                {post.title}
              </p>
            </div>
          ))}
      </div>

      {/* Tags */}

      <div className={`${showTagFilters ? 'block' : 'hidden'} lg:block`}>
        <div className='p-4 border border-gray-400 rounded'>
          <h4 className='bg-[#f0e3cd] mb-3 p-2 font-semibold text-sm sm:text-base'>
            Tags
          </h4>
          <div className='flex flex-wrap gap-2'>
            {allTags.map(tag => (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs sm:text-sm rounded cursor-pointer transition ${selectedTags.includes(tag)
                  ? 'bg-[#c19a6b] text-white'
                  : 'bg-[#f0e3cd]'
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className='hidden lg:block p-4 border border-gray-400 rounded'>
        <h4 className='bg-[#f0e3cd] mb-3 p-2 font-semibold text-sm sm:text-base'>
          Gallery
        </h4>
        <div className='gap-2 grid grid-cols-3'>
          {posts.slice(0, 6).map(post => (
            <img
              key={post._id}
              src={post.image}
              alt={post.title}
              className='border w-full object-cover aspect-square cursor-pointer'
              onClick={() => onImageClick(post.image)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default SidebarBlog
