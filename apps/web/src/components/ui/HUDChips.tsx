'use client'

import { useFRMXStore } from '@/store'
import { formatDim } from '@frmx/calculator'
import { useEffect, useRef, useState } from 'react'

export default function HUDChips() {
  const toolMode = useFRMXStore(s => s.toolMode)
  const snapEnabled = useFRMXStore(s => s.snapEnabled)
  const orthoEnabled = useFRMXStore(s => s.orthoEnabled)
  const cursorWorldPos = useFRMXStore(s => s.cursorWorldPos)
  const [drawDimension, setDrawDimension] = useState<string | null>(null)

  // Track drawing dimension via a ref to avoid re-renders
  const isDrawingRef = useRef(false)
  const drawingPointsRef = useRef<{ x: number; y: number }[]>([])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') {
        isDrawingRef.current = true
        drawingPointsRef.current = []
      }
      if (e.key === 'Escape' || e.key === 'v' || e.key === 'V') {
        isDrawingRef.current = false
        setDrawDimension(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Live dimension chip — shown when draw-wall is active with 2+ points
  const showDimension = toolMode === 'draw-wall' && cursorWorldPos !== null

  return (
    <>
      {/* Tool chip — always visible */}
      <div className="hud-chip tool">
        {toolMode.replace('-', ' ')}
      </div>

      {/* Snap/ortho chip */}
      {(snapEnabled || orthoEnabled) && (
        <div className="hud-chip snap">
          {[snapEnabled ? 'SNAP' : '', orthoEnabled ? 'ORTHO' : ''].filter(Boolean).join(' ')}
        </div>
      )}

      {/* Dimension chip */}
      {showDimension && (
        <div className="hud-chip dimension">
          {drawDimension ?? '...'}
        </div>
      )}

      {/* Coordinate chip — shown on canvas hover */}
      {cursorWorldPos && (
        <div className="hud-chip coords">
          X: {formatDim(cursorWorldPos.x * 12)} Y: {formatDim(cursorWorldPos.y * 12)}
        </div>
      )}
    </>
  )
}