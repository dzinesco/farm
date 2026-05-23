'use client'

import { useFRMXStore } from '@/store'
import { useEffect } from 'react'

const SHORTCUTS = [
  {
    group: 'Tools',
    items: [
      { keys: 'V', desc: 'Select' },
      { keys: 'H', desc: 'Pan' },
      { keys: 'W', desc: 'Draw Wall' },
      { keys: 'O', desc: 'Add Opening' },
      { keys: 'E', desc: 'Edit Panel' },
    ],
  },
  {
    group: 'View',
    items: [
      { keys: '1', desc: 'Plan View' },
      { keys: '2', desc: 'Elevation View' },
      { keys: '3', desc: '3D View' },
    ],
  },
  {
    group: 'Snapping',
    items: [
      { keys: 'G', desc: 'Toggle Snap' },
      { keys: 'R', desc: 'Toggle Ortho' },
      { keys: 'Space (hold)', desc: 'Temporary Pan' },
      { keys: 'Shift (draw)', desc: 'Lock to Ortho' },
    ],
  },
  {
    group: 'Selection',
    items: [
      { keys: 'Esc', desc: 'Cancel / Deselect' },
      { keys: 'Delete', desc: 'Delete Selected' },
      { keys: '⌃Z', desc: 'Undo' },
      { keys: '⌃Y', desc: 'Redo' },
    ],
  },
  {
    group: 'Help',
    items: [
      { keys: '?', desc: 'This legend' },
    ],
  },
]

export default function ShortcutLegend() {
  const showShortcutLegend = useFRMXStore(s => s.showShortcutLegend)
  const setShowShortcutLegend = useFRMXStore(s => s.setShowShortcutLegend)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowShortcutLegend(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [setShowShortcutLegend])

  if (!showShortcutLegend) return null

  return (
    <div
      className="shortcut-legend"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowShortcutLegend(false)
      }}
    >
      <div className="legend-panel">
        <h2>Keyboard Shortcuts</h2>
        {SHORTCUTS.map(group => (
          <div key={group.group} className="shortcut-group">
            <h3>{group.group}</h3>
            {group.items.map(item => (
              <div key={item.keys} className="shortcut-row">
                <span className="desc">{item.desc}</span>
                <span className="keys">{item.keys}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
