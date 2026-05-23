'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { useFRMXStore } from '@/store'
import { polylineCumulativeDistances, pointAtDistance } from '@frmx/geometry'
import { formatDim } from '@frmx/calculator'
import { gridSnap, orthoSnap, snapPoint } from '@/lib/snapping'
import RulerOverlay from './RulerOverlay'

console.log('[PlanView] module loaded')
const GRID_SIZE = 3 // 3px per foot = 1/4" = 1' architectural scale
const MIN_ZOOM = 0.1
const MAX_ZOOM = 10

const WALL_COLORS: Record<string, { stroke: string; fill: string; dash?: number[] }> = {
  exterior: { stroke: '#1e40af', fill: '#93c5fd', dash: [] },
  'exterior-sheathed': { stroke: '#1e40af', fill: '#bfdbfe', dash: [] },
  interior: { stroke: '#6b7280', fill: '#d1d5db', dash: [] },
  partition: { stroke: '#9ca3af', fill: '#e5e7eb', dash: [6, 3] },
  retaining: { stroke: '#b45309', fill: '#fde68a', dash: [4, 4] },
  default: { stroke: '#374151', fill: '#9ca3af', dash: [] },
}

export default function PlanView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rulerSize = 28
  const { project, viewport, setViewport, selectedWallId, selectWall, viewMode, toolMode, addWall, snapEnabled, orthoEnabled } = useFRMXStore()
  const isPanningRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })

  // Wall drawing state
  const isDrawingRef = useRef(false)
  const drawingPointsRef = useRef<{ x: number; y: number }[]>([])

  // Use refs for values that come from store to avoid stale closure issues
  const toolModeRef = useRef(toolMode)
  toolModeRef.current = toolMode
  const projectRef = useRef(project)
  projectRef.current = project
  const orthoEnabledRef = useRef(orthoEnabled)
  orthoEnabledRef.current = orthoEnabled
  const snapEnabledRef = useRef(snapEnabled)
  snapEnabledRef.current = snapEnabled
  const shiftHeldRef = useRef(false)

  // Status bar helpers
  const wallCount = project.building.levels.reduce((sum, lvl) => sum + lvl.walls.length, 0)
  const selectedWall = selectedWallId ? project.building.levels.flatMap(l => l.walls).find(w => w.id === selectedWallId) : null

  // Hover state
  const [hoveredWallId, setHoveredWallId] = useState<string | null>(null)

  function calculateWallLengthInches(wall: typeof selectedWall): number {
    if (!wall || wall.centerline.length < 2) return 0
    let total = 0
    for (let i = 1; i < wall.centerline.length; i++) {
      const dx = wall.centerline[i]!.x - wall.centerline[i - 1]!.x
      const dy = wall.centerline[i]!.y - wall.centerline[i - 1]!.y
      total += Math.hypot(dx, dy)
    }
    return total * 12 // convert feet to inches
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const { panX, panY, zoom } = viewport

    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 0.5
    const gridSpacing = GRID_SIZE * zoom
    const startX = (panX % gridSpacing)
    const startY = (panY % gridSpacing)

    for (let x = startX; x < width; x += gridSpacing) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = startY; y < height; y += gridSpacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Foot markers
    ctx.fillStyle = '#999'
    ctx.font = '9px monospace'
    for (let x = startX; x < width; x += gridSpacing * 12) {
      const foot = Math.round((x - panX) / gridSpacing)
      ctx.fillText(`${foot}'`, x + 2, 12)
    }

    // Draw all levels' walls
    for (const level of project.building.levels) {
      for (const wall of level.walls) {
        const isSelected = wall.id === selectedWallId
        drawWall(ctx, wall, viewport, isSelected, wall.id === hoveredWallId)
      }
    }

    // Draw endpoint handles for selected wall
    if (selectedWall) {
      ctx.fillStyle = '#2563eb'
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5
      for (const pt of selectedWall.centerline) {
        ctx.beginPath()
        ctx.arc(pt.x * zoom + panX, pt.y * zoom + panY, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }
    }

    // Draw in-progress wall
    if (toolModeRef.current === 'draw-wall' && isDrawingRef.current && drawingPointsRef.current.length > 0) {
      const pts = drawingPointsRef.current
      ctx.beginPath()
      ctx.moveTo(pts[0]!.x * zoom + panX, pts[0]!.y * zoom + panY)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i]!.x * zoom + panX, pts[i]!.y * zoom + panY)
      }
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Draw endpoint handle
      const last = pts[pts.length - 1]!
      ctx.fillStyle = '#2563eb'
      ctx.beginPath()
      ctx.arc(last.x * zoom + panX, last.y * zoom + panY, 6, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw wall lengths are already rendered inside drawWall
  }, [project, viewport, selectedWallId, hoveredWallId])

  function drawWall(ctx: CanvasRenderingContext2D, wall: { id: string; name: string; wallType?: string; centerline: { x: number; y: number }[]; height: number; panels: unknown[]; openings: unknown[] }, vp: { panX: number; panY: number; zoom: number }, isSelected: boolean, isHovered = false) {
    if (wall.centerline.length < 2) return

    const { panX, panY, zoom } = vp
    const wallStyle = (WALL_COLORS[wall.wallType ?? ''] ?? WALL_COLORS.default)!

    // Wall centerline path
    ctx.beginPath()
    ctx.moveTo(wall.centerline[0]!.x * zoom + panX, wall.centerline[0]!.y * zoom + panY)
    for (let i = 1; i < wall.centerline.length; i++) {
      ctx.lineTo(wall.centerline[i]!.x * zoom + panX, wall.centerline[i]!.y * zoom + panY)
    }
    ctx.strokeStyle = isSelected ? '#2563eb' : wallStyle.stroke
    ctx.lineWidth = isSelected ? 3 : 2
    ctx.stroke()

    // Wall outline (offset parallel lines — dashed for some types)
    ctx.strokeStyle = isSelected ? '#93c5fd' : wallStyle.fill
    ctx.lineWidth = 1
    ctx.setLineDash(wallStyle.dash ?? [])
    ctx.stroke()
    ctx.setLineDash([])

    // Hover highlight for non-selected walls
    if (isHovered && !isSelected) {
      ctx.globalAlpha = 0.5
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(wall.centerline[0]!.x * zoom + panX, wall.centerline[0]!.y * zoom + panY)
      for (let i = 1; i < wall.centerline.length; i++) {
        ctx.lineTo(wall.centerline[i]!.x * zoom + panX, wall.centerline[i]!.y * zoom + panY)
      }
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Panel markers
    const dists = polylineCumulativeDistances(wall.centerline)
    const wallLength = dists[dists.length - 1] ?? 0

    // Draw panel boundaries
    if (wall.panels.length > 0) {
      for (const panel of wall.panels as { position: number; width: number }[]) {
        const start = pointAtDistance(wall.centerline, panel.position)
        const end = pointAtDistance(wall.centerline, panel.position + panel.width)
        if (start && end) {
          // Small marker at panel start
          ctx.fillStyle = '#6366f1'
          ctx.beginPath()
          ctx.arc(start.x * zoom + panX, start.y * zoom + panY, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Wall label
    const midIdx = Math.floor(wall.centerline.length / 2)
    const mid = wall.centerline[midIdx]!
    ctx.fillStyle = '#333'
    ctx.font = 'bold 11px system-ui'
    ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4)

    // Wall length
    const startPt = wall.centerline[0]!
    const endPt = wall.centerline[wall.centerline.length - 1]!
    const dx = endPt.x - startPt.x
    const dy = endPt.y - startPt.y
    const lenFt = Math.sqrt(dx * dx + dy * dy)
    ctx.fillStyle = '#666'
    ctx.font = '9px monospace'
    const label = formatDim(lenFt * 12)
    ctx.fillText(label, mid.x * zoom + panX + 4, mid.y * zoom + panY + 10)
  }

  // Canvas mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('[PlanView] mouseDown', { toolMode: toolModeRef.current, clientX: e.clientX, clientY: e.clientY })
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
      // Hit test walls
      for (const level of project.building.levels) {
        for (const wall of level.walls) {
          for (let i = 1; i < wall.centerline.length; i++) {
            const p1 = wall.centerline[i - 1]!
            const p2 = wall.centerline[i]!
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
  }, [toolMode, viewport, project, selectWall])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
      const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom
      useFRMXStore.getState().setCursorWorldPos({ x: worldX, y: worldY })
    }

    if (!isPanningRef.current && !(toolModeRef.current === 'draw-wall' && isDrawingRef.current) && !(toolModeRef.current === 'select')) return
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isPanningRef.current) {
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      setViewport({ panX: viewport.panX + dx, panY: viewport.panY + dy })
    } else if (toolModeRef.current === 'select') {
      // Hover detection — find wall under cursor
      const rect = canvas.getBoundingClientRect()
      const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
      const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom
      let found: string | null = null
      for (const level of projectRef.current.building.levels) {
        for (const wall of level.walls) {
          for (let i = 1; i < wall.centerline.length; i++) {
            const p1 = wall.centerline[i - 1]!
            const p2 = wall.centerline[i]!
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const lenSq = dx * dx + dy * dy
            if (lenSq === 0) continue
            const t = Math.max(0, Math.min(1, ((worldX - p1.x) * dx + (worldY - p1.y) * dy) / lenSq))
            const nearest = { x: p1.x + t * dx, y: p1.y + t * dy }
            const dist = Math.hypot(worldX - nearest.x, worldY - nearest.y)
            if (dist < 10 / viewport.zoom) {
              found = wall.id
              break
            }
          }
          if (found) break
        }
        if (found) break
      }
      if (found !== hoveredWallId) {
        setHoveredWallId(found)
        if (canvasRef.current) {
          canvasRef.current.style.cursor = found ? 'pointer' : 'default'
        }
      }
    } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
      const rect = canvas.getBoundingClientRect()
      const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
      const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom

      // Collect all existing wall endpoints for snapping
      const existingEndpoints: { x: number; y: number }[] = []
      for (const level of projectRef.current.building.levels) {
        for (const wall of level.walls) {
          if (wall.centerline.length > 0) {
            existingEndpoints.push(wall.centerline[0]!)
            existingEndpoints.push(wall.centerline[wall.centerline.length - 1]!)
          }
        }
      }

      let snappedX = worldX
      let snappedY = worldY

      // 1. Snap to existing endpoints first (corner join)
      const endpointSnapResult = snapPoint({ x: snappedX, y: snappedY }, existingEndpoints, 15 / viewport.zoom)
      if (endpointSnapResult.x !== snappedX || endpointSnapResult.y !== snappedY) {
        snappedX = endpointSnapResult.x
        snappedY = endpointSnapResult.y
      } else {
        // 2. Ortho snap from last point
        if (orthoEnabledRef.current && drawingPointsRef.current.length > 0) {
          const last = drawingPointsRef.current[drawingPointsRef.current.length - 1]!
          const ortho = orthoSnap({ x: snappedX, y: snappedY }, last)
          snappedX = ortho.x
          snappedY = ortho.y
        }
      }
      // 3. Grid snap always runs last if enabled (independent of ortho)
      if (snapEnabledRef.current) {
        const gridSize = 1 / 12 // 1 inch in feet
        snappedX = gridSnap(snappedX, gridSize)
        snappedY = gridSnap(snappedY, gridSize)
      }
      // Apply shift lock to ortho if shift is held
      if (shiftHeldRef.current && orthoEnabledRef.current) {
        const last = drawingPointsRef.current[drawingPointsRef.current.length - 1]
        if (last) {
          const ortho = orthoSnap({ x: snappedX, y: snappedY }, last)
          snappedX = ortho.x
          snappedY = ortho.y
        }
      }

      const pts = drawingPointsRef.current
      if (pts.length > 0) {
        const last = pts[pts.length - 1]!
        const dx = snappedX - last.x
        const dy = snappedY - last.y
        if (Math.hypot(dx, dy) > 1 / viewport.zoom) {
          drawingPointsRef.current = [...pts, { x: snappedX, y: snappedY }]
          draw()
        }
      }
    }
  }, [toolMode, viewport, setViewport, draw])

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('[PlanView] mouseUp', { toolMode: toolModeRef.current, isDrawing: isDrawingRef.current, pts: drawingPointsRef.current.length })
    if (isPanningRef.current) {
      isPanningRef.current = false
    } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
      const pts = drawingPointsRef.current
      if (pts.length >= 2) {
        const wallId = (Math as any).nanoid?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        addWall({
          id: wallId,
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
  }, [toolMode, addWall, draw])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.zoom * zoomFactor))

    // Zoom toward mouse position
    const newPanX = mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom)
    const newPanY = mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom)

    setViewport({ zoom: newZoom, panX: newPanX, panY: newPanY })
  }, [viewport, setViewport])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      draw()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  useEffect(() => {
    draw()
  }, [draw])

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
    const handleShiftKey = (e: KeyboardEvent) => {
      shiftHeldRef.current = e.key === 'Shift'
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleShiftKey)
    window.addEventListener('keydown', handleShiftKey)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleShiftKey)
      window.removeEventListener('keydown', handleShiftKey)
    }
  }, [])

  // Keyboard shortcuts for tools
  useEffect(() => {
    const handleToolKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.key.toLowerCase()) {
        case 'v': useFRMXStore.getState().setToolMode('select'); break
        case 'h': useFRMXStore.getState().setToolMode('pan'); break
        case 'w': useFRMXStore.getState().setToolMode('draw-wall'); break
        case 'o': useFRMXStore.getState().setToolMode('add-opening'); break
        case 'e': useFRMXStore.getState().setToolMode('edit-panel'); break
        case 'g': useFRMXStore.getState().toggleSnap(); break
        case 'r': useFRMXStore.getState().toggleOrtho(); break
      }
    }
    window.addEventListener('keydown', handleToolKey)
    return () => window.removeEventListener('keydown', handleToolKey)
  }, [])

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
      <canvas
        ref={canvasRef}
        className="absolute cursor-crosshair"
        style={{ backgroundColor: 'transparent', zIndex: 2, left: rulerSize, top: rulerSize }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => useFRMXStore.getState().setCursorWorldPos(null)}
        onWheel={handleWheel}
      />

      {/* Ruler overlay */}
      <RulerOverlay
        viewport={viewport}
        width={containerRef.current?.offsetWidth ?? 800}
        height={containerRef.current?.offsetHeight ?? 600}
      />

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600">
        {Math.round(viewport.zoom * 100)}%
      </div>
    </div>
  )
}