'use client'
/**
 * Scene — client-only wrapper with mount guard.
 * R3F is imported only after React has fully hydrated.
 */
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// R3F components loaded only in browser after hydration
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-white text-sm">Loading 3D renderer...</div>
    </div>
  ),
})

export default function Scene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-white text-sm">Initializing 3D...</div>
      </div>
    )
  }

  return <Scene3D />
}