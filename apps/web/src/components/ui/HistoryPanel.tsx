'use client'

import { useFRMXStore } from '@/store'
import { Undo2, Redo2 } from 'lucide-react'

export default function HistoryPanel() {
  const history = useFRMXStore(s => s.history)
  const historyIndex = useFRMXStore(s => s.historyIndex)
  const undo = useFRMXStore(s => s.undo)
  const redo = useFRMXStore(s => s.redo)
  const canUndo = useFRMXStore(s => s.canUndo)
  const canRedo = useFRMXStore(s => s.canRedo)

  const handleRestore = (index: number) => {
    if (index < 0 || index >= history.length) return
    const currentIdx = useFRMXStore.getState().historyIndex
    if (index === currentIdx) return
    // If jumping back: undo until we reach the target index
    while (useFRMXStore.getState().historyIndex > index) {
      undo()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Undo/Redo buttons */}
      <div className="flex gap-1">
        <button
          onClick={undo}
          disabled={!canUndo()}
          className="tool-btn"
          style={{ flex: 1, justifyContent: 'center', opacity: canUndo() ? 1 : 0.3 }}
        >
          <Undo2 size={13} />
          <span style={{ fontSize: '11px' }}>Undo</span>
          <span className="shortcut">⌃Z</span>
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          className="tool-btn"
          style={{ flex: 1, justifyContent: 'center', opacity: canRedo() ? 1 : 0.3 }}
        >
          <Redo2 size={13} />
          <span style={{ fontSize: '11px' }}>Redo</span>
          <span className="shortcut">⌃Y</span>
        </button>
      </div>

      {/* History list */}
      <div style={{ maxHeight: 200, overflowY: 'auto', fontSize: '11px' }}>
        {history.length === 0 && (
          <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '12px 0' }}>
            No history yet
          </div>
        )}
        {history.map((entry, i) => {
          const isCurrent = i === historyIndex
          const isFuture = i > historyIndex
          return (
            <button
              key={entry.id}
              onClick={() => handleRestore(i)}
              className="tool-btn"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                opacity: isFuture ? 0.3 : 1,
                borderColor: isCurrent ? 'rgba(199,125,255,0.4)' : 'transparent',
                background: isCurrent ? 'rgba(199,125,255,0.08)' : 'transparent',
                border: '1px solid',
              }}
            >
              <span style={{
                fontSize: '10px',
                color: isFuture ? 'rgba(255,255,255,0.2)' : isCurrent ? '#c77dff' : 'rgba(255,255,255,0.4)',
                minWidth: 16,
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: '11px', flex: 1, textAlign: 'left' }}>{entry.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}