'use client'

import { useFRMXStore } from '@/store'

export default function ThreeDView() {
  const { project, selectedWallId } = useFRMXStore()
  const wallCount = project.building.levels.reduce((s, l) => s + l.walls.length, 0)

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-900">
      {/* Placeholder — 3D will be fully implemented in a later iteration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-2xl font-bold mb-2">3D View</p>
          <p className="text-gray-400 text-sm">{wallCount} walls in project</p>
          <p className="text-gray-600 text-xs mt-4">
            react-three-fiber requires additional configuration for React 19
          </p>
        </div>
      </div>
    </div>
  )
}