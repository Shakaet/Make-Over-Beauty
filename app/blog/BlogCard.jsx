import Link from "next/link"

const BlogCard = ({ post }) => {
  return (
    <article className='bg-[#F7F2EA] pb-10 rounded-sm transition hover:-translate-y-2'>
      {/* Image with side date ribbon */}
      <div className='relative w-full h-72 overflow-hidden'>
        <img src={post.image} alt={post.title} fill="true" className='object-cover' />

        {/* Date Ribbon */}
        <div className='top-0 left-0 absolute flex items-center h-full'>
          <div className='bg-white shadow-sm px-3 py-2 text-center'>
            <span className='block font-semibold text-[10px] text-gray-700 tracking-widest rotate-90'>
              {post.date.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className='flex mt-5 px-6'>
        {post.categories.map((cat, i) => (
          <div
            key={i}
            className='flex items-center bg-[#B49A7E] px-2 py-1 mr-2 rounded gap-2 text-[11px] text-white uppercase tracking-wide'
          >
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <h2 className='mt-4 px-6 font-bold group-hover:text-[#B49A7E] text-2xl transition'>
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className='mt-3 px-6 max-w-xl text-gray-600 text-sm line-clamp-2'>
        {post.excerpt}
      </p>

      {/* Read More */}
      <div className='mt-5 px-6'>
        <Link
          href={`/blog/single-blog/${post._id}`}
          className='pb-0.5 border-[#B49A7E] border-b font-semibold text-[#B49A7E] text-sm uppercase tracking-widest'>
          Read more
        </Link>
      </div>

      {/* Divider */}
      <div className='mx-6 mt-6 border-gray-300 border-b'></div>
    </article>
  )
}

export default BlogCard
