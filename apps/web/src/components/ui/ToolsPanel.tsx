'use client'

import { useFRMXStore } from '@/store'
import {
  MousePointer2, Hand, PenLine, DoorOpen, PanelTop,
} from 'lucide-react'

const TOOLS = [
  { mode: 'select' as const, label: 'Select', icon: MousePointer2, shortcut: 'V' },
  { mode: 'pan' as const, label: 'Pan', icon: Hand, shortcut: 'H' },
  { mode: 'draw-wall' as const, label: 'Draw Wall', icon: PenLine, shortcut: 'W' },
  { mode: 'add-opening' as const, label: 'Add Opening', icon: DoorOpen, shortcut: 'O' },
  { mode: 'edit-panel' as const, label: 'Edit Panel', icon: PanelTop, shortcut: 'E' },
]

export default function ToolsPanel() {
  const toolMode = useFRMXStore(s => s.toolMode)
  const setToolMode = useFRMXStore(s => s.setToolMode)
  const togglePanelVisible = useFRMXStore(s => s.togglePanelVisible)
  const setShowShortcutLegend = useFRMXStore(s => s.setShowShortcutLegend)

  return (
    <div className="flex flex-col gap-1">
      {TOOLS.map(({ mode, label, icon: Icon, shortcut }) => (
        <button
          key={mode}
          onClick={() => setToolMode(mode)}
          className={`tool-btn ${toolMode === mode ? 'active' : ''}`}
        >
          <Icon size={14} />
          <span>{label}</span>
          <span className="shortcut">{shortcut}</span>
        </button>
      ))}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

      {/* Settings toggle */}
      <button
        onClick={() => togglePanelVisible('settings')}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.6 }}
      >
        <span style={{ fontSize: '10px' }}>⚙</span>
        <span>Settings</span>
      </button>

      {/* History toggle */}
      <button
        onClick={() => togglePanelVisible('history')}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.6 }}
      >
        <span style={{ fontSize: '10px' }}>↺</span>
        <span>History</span>
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

      {/* ? shortcut legend */}
      <button
        onClick={() => setShowShortcutLegend(true)}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.5, justifyContent: 'center' }}
      >
        ?
      </button>
    </div>
  )
}