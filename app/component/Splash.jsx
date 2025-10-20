"use client"
import React, { useEffect, useState } from 'react'

const Splash = () => {
  const [shouldRender, setShouldRender] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('splashShown') === '1') {
      setShouldRender(false)
      return
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem('splashShown', '1')
      setShouldRender(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (!shouldRender) return null

  return (
    <div className="splash-overlay">
      <div className="splash-text">BEAUTY</div>
    </div>
  )
}

export default Splash


