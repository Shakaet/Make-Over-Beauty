'use client'
import React, { useState } from 'react'
import Heading from '../../component/Heading'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert('Thank you for contacting us! We’ll reply soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div>
      <Heading />
      <section className='bg-[#F9F5F2] py-16'>
        <div className='max-w-6xl mx-auto px-6 md:px-10'>
          {/* Header */}
          <div className='text-center mb-10'>
            <p className='text-gray-500 text-xs uppercase tracking-widest'>
              Get in Touch
            </p>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
              Let’s Connect & Glow Together
            </h2>
            <p className='text-gray-600 mt-3 max-w-2xl mx-auto'>
              Have a question about our products, orders, or skincare tips? Our
              friendly team is here to help you shine with confidence. Reach out
              and we’ll respond promptly!
            </p>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            {/* Left - Contact Info */}
            <div className='space-y-6 text-gray-700'>
              <div className='flex items-start space-x-3 hover:text-[#dec5a4] transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12'
                  />
                </svg>
                <div>
                  <h3 className='font-semibold text-lg'>Visit Us</h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    72 St. Merch Street, LA, California
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-3 hover:text-[#dec5a4] transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3'
                  />
                </svg>
                <div>
                  <h3 className='font-semibold text-lg'>Call Us</h3>
                  <p className='text-sm text-gray-600 mt-1'>+00 123 456 789</p>
                </div>
              </div>

              <div className='flex items-start space-x-3 hover:text-[#dec5a4] transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='none'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087c.46.11.939.11 1.398 0c.52-.125 1.001-.446 1.964-1.087l6.98-4.654M7.157 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327'
                  />
                </svg>
                <div>
                  <h3 className='font-semibold text-lg'>Email Us</h3>
                  <p className='text-sm text-gray-600 mt-1'>info@example.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-3 hover:text-[#dec5a4] transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M13 12.6V9q0-.425-.288-.712T12 8t-.712.288T11 9v3.975q0 .2.075.388t.225.337l2.8 2.8q.275.275.7.275t.7-.275t.275-.7t-.275-.7zM12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13t.713-3.512t1.924-2.85t2.85-1.925T12 4t3.513.713t2.85 1.925t1.925 2.85T21 13t-.712 3.513t-1.925 2.85t-2.85 1.925T12 22M2.05 7.3q-.275-.275-.275-.7t.275-.7L4.9 3.05q.275-.275.7-.275t.7.275t.275.7t-.275.7L3.45 7.3q-.275.275-.7.275t-.7-.275m19.9 0q-.275.275-.7.275t-.7-.275L17.7 4.45q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l2.85 2.85q.275.275.275.7t-.275.7M12 20q2.925 0 4.963-2.037T19 13t-2.037-4.962T12 6T7.038 8.038T5 13t2.038 4.963T12 20'
                  />
                </svg>
                <div>
                  <h3 className='font-semibold text-lg'>Working Hours</h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    Mon - Fri: 08:30 - 20:00
                  </p>
                  <p className='text-sm text-gray-600'>
                    Sat - Sun: 09:30 - 21:30
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <form
              onSubmit={handleSubmit}
              className='bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-5'
            >
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition'
                  placeholder='Your full name'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition'
                  placeholder='you@example.com'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className='w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition'
                  placeholder='Write your message here...'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-[#E8D8C0] hover:bg-[#dec5a4] text-gray-900 font-medium py-2 rounded-full shadow transition'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
