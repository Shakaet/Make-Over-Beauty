import React from 'react'

const ImageModal = ({ image, onClose }) => {
  return (
    <div className='z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80'>
      <div className='relative'>
        <img
          src={image}
          alt='Gallery'
          className='shadow-lg rounded-sm max-w-[90vw] max-h-[80vh]'
        />
        <button
          className='top-2 right-2 absolute bg-white px-3 py-1 rounded text-black cursor-pointer'
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default ImageModal
