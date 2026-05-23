'use client'

import { useFRMXStore } from '@/store'
import PlanView from './PlanView'
import ElevationView from './ElevationView'
import ThreeDView from './ThreeDView'
import PropertiesPanel from './PropertiesPanel'

export default function Editor() {
  const { viewMode, selectedWallId, selectedPanelId, project } = useFRMXStore()

  const selectedWall = (() => {
    if (!selectedWallId) return null
    for (const level of project.building.levels) {
      const w = level.walls.find(w => w.id === selectedWallId)
      if (w) return w
    }
    return null
  })()

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Main view area */}
        <div className="flex flex-col flex-1 relative">
          <div className="flex-1 relative">
            {viewMode === 'plan' && <PlanView />}
            {viewMode === 'elevation' && <ElevationView />}
            {viewMode === '3d' && <ThreeDView />}
          </div>

          {/* Info bar */}
          <div className="h-8 bg-gray-100 border-t border-gray-300 flex items-center px-4 text-xs text-gray-600">
            {viewMode === 'plan' && (
              <span>Plan View — {project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls</span>
            )}
            {viewMode === 'elevation' && selectedWall && (
              <span>Elevation: {selectedWall.name} — {selectedWall.panels.length} panels</span>
            )}
            {viewMode === '3d' && (
              <span>3D View — {project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls rendered</span>
            )}
          </div>
        </div>

        {/* Properties panel — shows when wall or panel selected */}
        {(selectedWallId || selectedPanelId) && <PropertiesPanel />}
      </div>
    </div>
  )
}