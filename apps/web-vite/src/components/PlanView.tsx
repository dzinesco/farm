import { useRef, useEffect, useCallback, useState } from 'react'
import { nanoid } from 'nanoid'
import { useFRMXStore } from '../store'

const GRID_SIZE = 3 // 3px per foot = 1/4" architectural scale

export default function PlanView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { project, viewport, setViewport, selectedWallId, selectWall, toolMode, addWall } = useFRMXStore()

  const [clickCount, setClickCount] = useState(0)

  // Refs for event handlers to avoid stale closures
  const toolModeRef = useRef(toolMode)
  toolModeRef.current = toolMode
  const isDrawingRef = useRef(false)
  const isPanningRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const drawingPointsRef = useRef<{ x: number; y: number }[]>([])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const { panX, panY, zoom } = viewport

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 0.5
    const gridSpacing = GRID_SIZE * zoom
    const startX = panX % gridSpacing
    const startY = panY % gridSpacing

    for (let x = startX; x < width; x += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
    }
    for (let y = startY; y < height; y += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
    }

    // Foot markers
    ctx.fillStyle = '#999'
    ctx.font = '9px monospace'
    for (let x = startX; x < width; x += gridSpacing * 12) {
      const foot = Math.round((x - panX) / gridSpacing)
      ctx.fillText(`${foot}'`, x + 2, 12)
    }

    // Draw walls
    for (const level of project.building.levels) {
      for (const wall of level.walls) {
        if (wall.centerline.length < 2) continue
        const isSelected = wall.id === selectedWallId

        ctx.beginPath()
        ctx.moveTo(wall.centerline[0].x * zoom + panX, wall.centerline[0].y * zoom + panY)
        for (let i = 1; i < wall.centerline.length; i++) {
          ctx.lineTo(wall.centerline[i].x * zoom + panX, wall.centerline[i].y * zoom + panY)
        }
        ctx.strokeStyle = isSelected ? '#2563eb' : '#666'
        ctx.lineWidth = isSelected ? 3 : 2
        ctx.stroke()

        // Wall outline offset
        ctx.strokeStyle = isSelected ? '#93c5fd' : '#aaa'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // Label
        const midIdx = Math.floor(wall.centerline.length / 2)
        const mid = wall.centerline[midIdx]
        const startPt = wall.centerline[0]
        const endPt = wall.centerline[wall.centerline.length - 1]
        const dx = endPt.x - startPt.x
        const dy = endPt.y - startPt.y
        const lenFt = Math.sqrt(dx * dx + dy * dy)
        ctx.fillStyle = '#333'
        ctx.font = 'bold 11px system-ui'
        ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4)
        ctx.font = '9px monospace'
        ctx.fillStyle = '#666'
        ctx.fillText(`${Math.round(lenFt * 12)}"`, mid.x * zoom + panX + 4, mid.y * zoom + panY + 10)
      }
    }

    // Draw in-progress wall
    if (toolModeRef.current === 'draw-wall' && isDrawingRef.current && drawingPointsRef.current.length > 0) {
      const pts = drawingPointsRef.current
      ctx.beginPath()
      ctx.moveTo(pts[0].x * zoom + panX, pts[0].y * zoom + panY)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x * zoom + panX, pts[i].y * zoom + panY)
      }
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Endpoint circle
      const last = pts[pts.length - 1]
      ctx.fillStyle = '#2563eb'
      ctx.beginPath()
      ctx.arc(last.x * zoom + panX, last.y * zoom + panY, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [project, viewport, selectedWallId])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        useFRMXStore.getState().undo()
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        useFRMXStore.getState().redo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; draw() }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  useEffect(() => { draw() }, [draw])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('[PlanView] mouseDown', toolModeRef.current, clickCount)
    setClickCount(c => c + 1)
    isPanningRef.current = false
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const worldX = (x - viewport.panX) / viewport.zoom
    const worldY = (y - viewport.panY) / viewport.zoom

    if (toolModeRef.current === 'pan') {
      isPanningRef.current = true
      lastPosRef.current = { x: e.clientX, y: e.clientY }
    } else if (toolModeRef.current === 'draw-wall') {
      isDrawingRef.current = true
      drawingPointsRef.current = [{ x: worldX, y: worldY }]
      selectWall(null)
    } else if (toolModeRef.current === 'select') {
      for (const level of project.building.levels) {
        for (const wall of level.walls) {
          for (let i = 1; i < wall.centerline.length; i++) {
            const p1 = wall.centerline[i - 1]
            const p2 = wall.centerline[i]
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const lenSq = dx * dx + dy * dy
            if (lenSq === 0) continue
            const t = Math.max(0, Math.min(1, ((worldX - p1.x) * dx + (worldY - p1.y) * dy) / lenSq))
            const nearest = { x: p1.x + t * dx, y: p1.y + t * dy }
            const dist = Math.hypot(worldX - nearest.x, worldY - nearest.y)
            if (dist < 10 / viewport.zoom) {
              selectWall(wall.id)
              return
            }
          }
        }
      }
      selectWall(null)
    }
  }, [viewport, project, selectWall])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanningRef.current) {
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      setViewport({ panX: viewport.panX + dx, panY: viewport.panY + dy })
    } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const worldX = (x - viewport.panX) / viewport.zoom
      const worldY = (y - viewport.panY) / viewport.zoom
      const pts = drawingPointsRef.current
      if (pts.length > 0) {
        const last = pts[pts.length - 1]
        const dx = worldX - last.x
        const dy = worldY - last.y
        if (Math.hypot(dx, dy) > 1 / viewport.zoom) {
          drawingPointsRef.current = [...pts, { x: worldX, y: worldY }]
          draw()
        }
      }
    }
  }, [viewport, setViewport, draw])

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('[PlanView] mouseUp', toolModeRef.current, isDrawingRef.current, drawingPointsRef.current.length)
    if (isPanningRef.current) {
      isPanningRef.current = false
    } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
      const pts = drawingPointsRef.current
      if (pts.length >= 2) {
        addWall({
          id: nanoid(8),
          name: `Wall ${Date.now().toString(36).slice(-4).toUpperCase()}`,
          centerline: pts,
          height: 96,
          wallType: 'exterior',
          panels: [],
          openings: [],
          modules: [],
        })
      }
      isDrawingRef.current = false
      drawingPointsRef.current = []
      draw()
    }
  }, [addWall, draw])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(0.1, Math.min(10, viewport.zoom * zoomFactor))
    const newPanX = mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom)
    const newPanY = mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom)
    setViewport({ zoom: newZoom, panX: newPanX, panY: newPanY })
  }, [viewport, setViewport])

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#f0fff0' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'white', border: '1px solid #ccc', borderRadius: 4, padding: '6px 12px', fontSize: 12, color: '#666' }}>
        {Math.round(viewport.zoom * 100)}%
      </div>
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'white', border: '1px solid #ccc', borderRadius: 4, padding: '6px 12px', fontSize: 12, fontFamily: 'monospace', color: '#666' }}>
        pan: {Math.round(viewport.panX)}, {Math.round(viewport.panY)} | clicks: {clickCount}
      </div>
    </div>
  )
}