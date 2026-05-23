'use client'

import { useFRMXStore } from '@/store'
import { Grid3x3, Move, LayoutGrid } from 'lucide-react'

export default function SettingsPanel() {
  const snapEnabled = useFRMXStore(s => s.snapEnabled)
  const orthoEnabled = useFRMXStore(s => s.orthoEnabled)
  const toggleSnap = useFRMXStore(s => s.toggleSnap)
  const toggleOrtho = useFRMXStore(s => s.toggleOrtho)

  return (
    <div className="flex flex-col gap-2">
      {/* Snap toggle */}
      <button
        onClick={toggleSnap}
        className={`tool-btn ${snapEnabled ? 'active' : ''}`}
      >
        <Grid3x3 size={13} />
        <span>Snap</span>
        <span className="shortcut">G</span>
      </button>

      {/* Ortho toggle */}
      <button
        onClick={toggleOrtho}
        className={`tool-btn ${orthoEnabled ? 'active' : ''}`}
      >
        <Move size={13} />
        <span>Ortho</span>
        <span className="shortcut">R</span>
      </button>

      {/* Grid toggle (placeholder) */}
      <button
        className="tool-btn"
        style={{ opacity: 0.5 }}
        onClick={() => {}}
      >
        <LayoutGrid size={13} />
        <span>Grid</span>
        <span className="shortcut" style={{ opacity: 0.35 }}>-</span>
      </button>
    </div>
  )
}
