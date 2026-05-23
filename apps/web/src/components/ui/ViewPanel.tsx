'use client'

import { useFRMXStore } from '@/store'
import { Map, Eye, Box } from 'lucide-react'

const VIEWS = [
  { mode: 'plan' as const, label: 'Plan', icon: Map, key: '1' },
  { mode: 'elevation' as const, label: 'Elevation', icon: Eye, key: '2' },
  { mode: '3d' as const, label: '3D', icon: Box, key: '3' },
]

export default function ViewPanel() {
  const viewMode = useFRMXStore(s => s.viewMode)
  const setViewMode = useFRMXStore(s => s.setViewMode)

  return (
    <div className="flex flex-col gap-1">
      {VIEWS.map(({ mode, label, icon: Icon, key }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`tool-btn ${viewMode === mode ? 'active' : ''}`}
        >
          <Icon size={14} />
          <span>{label}</span>
          <span className="shortcut" style={{ opacity: 0.35 }}>{key}</span>
        </button>
      ))}
    </div>
  )
}