'use client'

import { useFRMXStore } from '@/store'
import DimensionInput from './DimensionInput'
import { formatDim } from '@frmx/calculator'
import { LayerEditor } from './LayerEditor'

export default function PropertiesPanel() {
  const { project, selectedWallId, selectedPanelId, updateWall, updatePanel } = useFRMXStore()

  const selectedWall = (() => {
    if (!selectedWallId) return null
    for (const level of project.building.levels) {
      const w = level.walls.find(w => w.id === selectedWallId)
      if (w) return w
    }
    return null
  })()

  const selectedPanel = (() => {
    if (!selectedWall || !selectedPanelId) return null
    return selectedWall.panels.find(p => p.id === selectedPanelId) ?? null
  })()

  if (!selectedWall) {
    return (
      <div className="w-64 border-l border-gray-300 bg-gray-50 p-4 flex items-center justify-center text-xs text-gray-500">
        Select a wall or panel to view properties
      </div>
    )
  }

  return (
    <div className="w-64 border-l border-gray-300 bg-gray-50 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
      <div className="p-3">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          {selectedPanel ? 'Panel' : 'Wall'} Properties
        </h3>

        {/* Wall section */}
        <div className="mb-4">
          <label className="text-xs text-gray-600 font-medium">Name</label>
          <input
            type="text"
            value={selectedWall.name}
            onChange={e => updateWall(selectedWall.id, { name: e.target.value })}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded mt-0.5"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-600 font-medium">Height</label>
          <DimensionInput
            value={selectedWall.height}
            onChange={v => updateWall(selectedWall.id, { height: v })}
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-600 font-medium">Wall Type</label>
          <select
            value={selectedWall.wallType}
            onChange={e => updateWall(selectedWall.id, { wallType: e.target.value })}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded mt-0.5"
          >
            <option value="exterior">Exterior</option>
            <option value="interior">Interior Partition</option>
            <option value="demising">Demising</option>
          </select>
        </div>

        <div className="mb-4 text-xs text-gray-600">
          <span className="font-medium">Openings:</span> {selectedWall.openings.length}
          <br />
          <span className="font-medium">Panels:</span> {selectedWall.panels.length}
        </div>

        {/* Panel section */}
        {selectedPanel && (
          <div className="border-t border-gray-300 pt-3 mt-3">
            <h4 className="text-xs font-bold text-gray-700 mb-2">{selectedPanel.name}</h4>
            <div className="mb-3">
              <label className="text-xs text-gray-600 font-medium">Width</label>
              <DimensionInput
                value={selectedPanel.width}
                onChange={v => updatePanel(selectedWall.id, selectedPanel.id, { width: v })}
              />
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-600 font-medium">Height</label>
              <DimensionInput
                value={selectedPanel.height}
                onChange={v => updatePanel(selectedWall.id, selectedPanel.id, { height: v })}
              />
            </div>

            {/* Layer stack */}
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-600 mb-1">Layer Stack</h5>
              <LayerEditor
                wallId={selectedWall.id}
                panelId={selectedPanel.id}
                layers={selectedPanel.layerStack}
              />
            </div>

            {/* Framing summary */}
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-600 mb-1">Framing</h5>
              <div className="text-xs text-gray-600 space-y-0.5">
                <div>Studs: {selectedPanel.framingModel.studs.length}</div>
                <div>Headers: {selectedPanel.framingModel.headers.length}</div>
                <div>Cripples: {selectedPanel.framingModel.cripples.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Openings list */}
        {selectedWall.openings.length > 0 && (
          <div className="border-t border-gray-300 pt-3 mt-3">
            <h4 className="text-xs font-bold text-gray-700 mb-2">Openings</h4>
            <div className="space-y-2">
              {selectedWall.openings.map(opening => (
                <div key={opening.id} className="bg-white border border-gray-200 rounded p-2 text-xs">
                  <div className="font-medium capitalize">{opening.type}</div>
                  <div className="text-gray-500">
                    {formatDim(opening.roughOpeningWidth)} × {formatDim(opening.roughOpeningHeight)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}