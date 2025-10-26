import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <ul className='inline-flex space-x-3 text-gray-600 text-sm'>
      <li>
        <button
          className='px-4 py-2 border rounded-md'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
      </li>

      {pages.map(page => (
        <li key={page}>
          <button
            className={`px-4 py-2 border rounded-md ${
              currentPage === page ? 'bg-gray-300' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          className='px-4 py-2 border rounded-md'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </li>
    </ul>
  )
}

export default Pagination
