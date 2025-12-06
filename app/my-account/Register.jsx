"use client"
import React, { useContext, useState } from 'react'
import { Context } from '../provider/AuthProvider'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { fallbackModeToFallbackField } from 'next/dist/lib/fallback'
// import { toast } from 'react-hot-toast'

const Register = () => {
  const router = useRouter()
  let { createRegistered, updateUserProfile } = useContext(Context)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role:"customer",
    product_access:false,
    blog_access:false,
    order_access:false,
    siteSetting_access:false,
    customer_access:false
  })
  const [errors, setErrors] = useState({})

  const patterns = {
    username: /^[a-zA-Z\s]{3,40}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone: /^\+?[0-9\s\-()]{7,20}$/,
    address: /^[a-zA-Z0-9\s.,#\-]{5,100}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = (data) => {
    const newErrors = {}
    if (!patterns.username.test(data.username)) newErrors.username = 'Invalid username (3-20 chars; letters, digits, underscore).'
    if (!patterns.email.test(data.email)) newErrors.email = 'Invalid email.'
    const digits = data.phone.replace(/\D/g, '').length
    if (!patterns.phone.test(data.phone) || digits < 7) newErrors.phone = 'Invalid phone number.'
    if (!patterns.address.test(data.address)) newErrors.address = 'Invalid address (5-100 characters).'
    if (!patterns.password.test(data.password)) newErrors.password = 'Invalid password (min 8 with letters and numbers).'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: formData.password,
      role:formData.role
    }
    const validationErrors = validate(trimmed)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0]
      const el = e.currentTarget.querySelector(`[name="${firstField}"]`)
      if (el) el.focus()
      return
    }
    const { password: password, ...safeData } = trimmed
    console.log('Register submit:', safeData)

    let profileUpdates = {
      displayName: safeData.username,

    }

    // console.log(password)
    createRegistered(safeData.email,password)
            .then((res)=>{
              return updateUserProfile(res.user,profileUpdates)
              .then(()=>{
              //  toast.success("Profile Updated")
              console.log(safeData)
               return axios.post("https://beauty-server-nine.vercel.app/api/users", safeData)
              })
            })
            .then((res)=>{
              if(res && res.data && res.data.insertedId){
                // alert("user added")
              }
              e.target.reset()
              router.push("/")
            })
            .catch((error)=>{
              // console.log(error)
            })

  }

  return (
    <div>
      <h3 className="text-2xl font-semibold text-black mb-4 ms-5">Register</h3>
      <form className=" shadow-lg rounded-2xl p-6 md:p-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition"
            placeholder="Choose a username"
          />
          {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition"
            placeholder="e.g. +1 555 123 4567"
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Present Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition"
            placeholder="Your current address"
          />
          {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition"
            placeholder="Create a password"
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <p className="text-xs text-gray-600">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="underline">privacy policy</span>.</p>

        <button type="submit" className="bg-[#E8D8C0] hover:bg-[#dec5a4] text-gray-900 font-medium px-6 py-2 rounded-full shadow transition">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register


