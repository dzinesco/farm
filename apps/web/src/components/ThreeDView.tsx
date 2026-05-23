'use client'
/**
 * ThreeDView — 3D viewport using react-three-fiber + leva controls
 * React 19 compatible via dynamic import of R3F components.
 */
import { useFRMXStore } from '@/store'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/features/three/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading 3D scene...</div>
    </div>
  ),
})

export default function ThreeDView() {
  const { project, selectedWallId } = useFRMXStore()
  const wallCount = project.building.levels.reduce((s, l) => s + l.walls.length, 0)

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-900">
      {/* Pass selectedWallId to Scene for camera focus */}
      <Scene />

      {/* Wall count overlay */}
      <div className="absolute top-3 left-3 text-white text-xs opacity-60 pointer-events-none">
        {wallCount} wall{wallCount !== 1 ? 's' : ''} in project
        {selectedWallId && ` · wall selected`}
      </div>
    </div>
  )
}