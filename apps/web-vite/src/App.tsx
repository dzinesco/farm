import { useState, useRef, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { useFRMXStore } from './store'
import './styles/design-system.css'

type ViewMode = 'plan' | 'elevation' | '3d'
type ToolMode = 'select' | 'pan' | 'draw-wall' | 'add-opening' | 'edit-panel'

const GRID_SIZE = 3

// ─── Plan View ───────────────────────────────────────────────────────

function PlanView({ wallWidth, originPoint, arrowAngle, inputLength, onSetOrigin }: {
  wallWidth: number
  originPoint: {x:number;y:number} | null
  arrowAngle: number
  inputLength: string
  onSetOrigin: (pt: {x:number;y:number}) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { project, viewport, setViewport, selectedWallId, selectWall, toolMode, addWall } = useFRMXStore()
  const [clickCount, setClickCount] = useState(0)

  const toolModeRef = useRef(toolMode)
  toolModeRef.current = toolMode
  const isDrawingRef = useRef(false)
  const isPanningRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const drawingPointsRef = useRef<{ x: number; y: number }[]>([])

  function offsetPoint(px: number, py: number, dx: number, dy: number, dist: number) {
    const len = Math.hypot(dx, dy) || 1
    return { x: px - (dy / len) * dist, y: py + (dx / len) * dist }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas
    const { panX, panY, zoom } = viewport

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = '#252545'
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
    ctx.fillStyle = '#666688'
    ctx.font = '9px monospace'
    for (let x = startX; x < width; x += gridSpacing * 12) {
      const foot = Math.round((x - panX) / gridSpacing)
      ctx.fillText(`${foot}'`, x + 2, 12)
    }

    const wFt = wallWidth / 12

    // Walls — double-line representation
    for (const level of project.building.levels) {
      for (const wall of level.walls) {
        if (wall.centerline.length < 2) continue
        const isSelected = wall.id === selectedWallId

        for (const side of [-1, 1]) {
          const off = (wFt / 2) * side
          ctx.beginPath()
          let started = false
          for (let i = 0; i < wall.centerline.length; i++) {
            const p = wall.centerline[i]
            const pn = wall.centerline[i + 1] ?? p
            const { x: ox, y: oy } = offsetPoint(p.x, p.y, pn.x - p.x, pn.y - p.y, off)
            const sx = ox * zoom + panX
            const sy = oy * zoom + panY
            if (!started) { ctx.moveTo(sx, sy); started = true }
            else ctx.lineTo(sx, sy)
          }
          ctx.strokeStyle = isSelected ? '#4f8fff' : '#6b7280'
          ctx.lineWidth = isSelected ? 2 : 1.5
          ctx.stroke()
        }

        // End caps
        const p1 = wall.centerline[0]
        const p2 = wall.centerline[wall.centerline.length - 1]
        const pn1 = wall.centerline[1] ?? p1
        const pn2 = wall.centerline[wall.centerline.length - 2] ?? p2
        const o1n = offsetPoint(p1.x, p1.y, pn1.x - p1.x, pn1.y - p1.y, -wFt / 2)
        const o1p = offsetPoint(p1.x, p1.y, pn1.x - p1.x, pn1.y - p1.y, wFt / 2)
        const o2n = offsetPoint(p2.x, p2.y, pn2.x - p2.x, pn2.y - p2.y, -wFt / 2)
        const o2p = offsetPoint(p2.x, p2.y, pn2.x - p2.x, pn2.y - p2.y, wFt / 2)
        ctx.beginPath()
        ctx.moveTo(o1n.x * zoom + panX, o1n.y * zoom + panY)
        ctx.lineTo(o1p.x * zoom + panX, o1p.y * zoom + panY)
        ctx.strokeStyle = isSelected ? '#4f8fff' : '#6b7280'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(o2n.x * zoom + panX, o2n.y * zoom + panY)
        ctx.lineTo(o2p.x * zoom + panX, o2p.y * zoom + panY)
        ctx.stroke()

        // Label
        const midIdx = Math.floor(wall.centerline.length / 2)
        const mid = wall.centerline[midIdx]
        const dx = p2.x - p1.x, dy = p2.y - p1.y
        const lenFt = Math.sqrt(dx * dx + dy * dy)
        ctx.fillStyle = '#e8e8f0'
        ctx.font = 'bold 11px system-ui'
        ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4)
        ctx.font = '9px monospace'
        ctx.fillStyle = '#8888aa'
        ctx.fillText(`${Math.round(lenFt * 12)}"`, mid.x * zoom + panX + 4, mid.y * zoom + panY + 10)
      }
    }

    // In-progress wall preview
    if (toolModeRef.current === 'draw-wall' && isDrawingRef.current && drawingPointsRef.current.length > 0) {
      const pts = drawingPointsRef.current
      ctx.beginPath()
      ctx.moveTo(pts[0].x * zoom + panX, pts[0].y * zoom + panY)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x * zoom + panX, pts[i].y * zoom + panY)
      ctx.strokeStyle = '#4f8fff'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.stroke()
      ctx.setLineDash([])

      for (const side of [-1, 1]) {
        const off = (wFt / 2) * side
        ctx.beginPath()
        let started = false
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]
          const pn = pts[i + 1] ?? p
          const { x: ox, y: oy } = offsetPoint(p.x, p.y, pn.x - p.x, pn.y - p.y, off)
          if (!started) { ctx.moveTo(ox * zoom + panX, oy * zoom + panY); started = true }
          else ctx.lineTo(ox * zoom + panX, oy * zoom + panY)
        }
        ctx.strokeStyle = '#60a5fa'
        ctx.lineWidth = 1.5
        ctx.setLineDash([3, 3])
        ctx.stroke()
        ctx.setLineDash([])
      }
      const last = pts[pts.length - 1]
      ctx.fillStyle = '#4f8fff'
      ctx.beginPath()
      ctx.arc(last.x * zoom + panX, last.y * zoom + panY, 6, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw-wall: origin + direction UI
    if (toolModeRef.current === 'draw-wall' && originPoint && inputLength) {
      const lenFt = parseFloat(inputLength)
      if (!isNaN(lenFt) && lenFt > 0) {
        const rad = (arrowAngle * Math.PI) / 180
        const endX = originPoint.x + Math.cos(rad) * lenFt
        const endY = originPoint.y + Math.sin(rad) * lenFt

        ctx.setLineDash([6, 4])
        ctx.strokeStyle = '#60a5fa'
        ctx.lineWidth = 1.5

        ctx.beginPath()
        ctx.moveTo(originPoint.x * zoom + panX, originPoint.y * zoom + panY)
        ctx.lineTo(endX * zoom + panX, endY * zoom + panY)
        ctx.stroke()

        const px = -(endY - originPoint.y) / (lenFt || 1) * (wFt / 2)
        const py = (endX - originPoint.x) / (lenFt || 1) * (wFt / 2)
        ctx.beginPath()
        ctx.moveTo((originPoint.x + px) * zoom + panX, (originPoint.y + py) * zoom + panY)
        ctx.lineTo((originPoint.x - px) * zoom + panX, (originPoint.y - py) * zoom + panY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo((endX + px) * zoom + panX, (endY + py) * zoom + panY)
        ctx.lineTo((endX - px) * zoom + panX, (endY - py) * zoom + panY)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.strokeStyle = '#4f8fff'
        ctx.lineWidth = 2
        const ox = originPoint.x * zoom + panX, oy = originPoint.y * zoom + panY
        ctx.beginPath(); ctx.moveTo(ox - 8, oy); ctx.lineTo(ox + 8, oy); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(ox, oy - 8); ctx.lineTo(ox, oy + 8); ctx.stroke()

        ctx.fillStyle = '#4f8fff'
        ctx.beginPath()
        ctx.arc(endX * zoom + panX, endY * zoom + panY, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#e8e8f0'
        ctx.font = 'bold 11px monospace'
        ctx.fillText(`${lenFt}'`, (originPoint.x + (endX - originPoint.x) / 2) * zoom + panX - 8, (originPoint.y + (endY - originPoint.y) / 2) * zoom + panY - 8)
      }
    } else if (toolModeRef.current === 'draw-wall' && originPoint) {
      ctx.strokeStyle = '#4f8fff'
      ctx.lineWidth = 2
      const ox = originPoint.x * zoom + panX, oy = originPoint.y * zoom + panY
      ctx.beginPath(); ctx.moveTo(ox - 8, oy); ctx.lineTo(ox + 8, oy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(ox, oy - 8); ctx.lineTo(ox, oy + 8); ctx.stroke()

      const rad = (arrowAngle * Math.PI) / 180
      const arrowLen = 40
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(ox + Math.cos(rad) * arrowLen, oy + Math.sin(rad) * arrowLen)
      ctx.stroke()
    }
  }, [project, viewport, selectedWallId, wallWidth, originPoint, arrowAngle, inputLength])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; draw() }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  useEffect(() => { draw() }, [draw])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); useFRMXStore.getState().undo() }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); useFRMXStore.getState().redo() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setClickCount(c => c + 1)
    isPanningRef.current = false
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
    const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom

    if (toolModeRef.current === 'pan') {
      isPanningRef.current = true
      lastPosRef.current = { x: e.clientX, y: e.clientY }
    } else if (toolModeRef.current === 'draw-wall') {
      onSetOrigin({ x: worldX, y: worldY })
      isDrawingRef.current = false
      drawingPointsRef.current = []
      selectWall(null)
    } else if (toolModeRef.current === 'select') {
      for (const level of project.building.levels) {
        for (const wall of level.walls) {
          for (let i = 1; i < wall.centerline.length; i++) {
            const p1 = wall.centerline[i - 1], p2 = wall.centerline[i]
            const dx = p2.x - p1.x, dy = p2.y - p1.y
            const lenSq = dx * dx + dy * dy
            if (lenSq === 0) continue
            const t = Math.max(0, Math.min(1, ((worldX - p1.x) * dx + (worldY - p1.y) * dy) / lenSq))
            const dist = Math.hypot(worldX - (p1.x + t * dx), worldY - (p1.y + t * dy))
            if (dist < 10 / viewport.zoom) { selectWall(wall.id); return }
          }
        }
      }
      selectWall(null)
    }
  }, [viewport, project, selectWall, onSetOrigin])

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
      let worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
      let worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom
      const pts = drawingPointsRef.current
      if (pts.length > 0) {
        if (e.shiftKey) {
          const dx = worldX - pts[0].x
          const dy = worldY - pts[0].y
          if (Math.abs(dx) > Math.abs(dy)) worldY = pts[0].y
          else worldX = pts[0].x
        }
        const last = pts[pts.length - 1]
        if (Math.hypot(worldX - last.x, worldY - last.y) > 1 / viewport.zoom) {
          drawingPointsRef.current = [...pts, { x: worldX, y: worldY }]
          draw()
        }
      }
    }
  }, [viewport, setViewport, draw])

  const handleMouseUp = useCallback(() => {
    if (isPanningRef.current) { isPanningRef.current = false; return }
    if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
      const pts = drawingPointsRef.current
      if (pts.length >= 2) {
        addWall({ id: nanoid(8), name: `Wall ${Date.now().toString(36).slice(-4).toUpperCase()}`, centerline: pts, height: 96, wallType: 'exterior', panels: [], openings: [], modules: [] })
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
    const mouseX = e.clientX - rect.left, mouseY = e.clientY - rect.top
    const newZoom = Math.max(0.1, Math.min(10, viewport.zoom * (e.deltaY > 0 ? 0.9 : 1.1)))
    setViewport({
      zoom: newZoom,
      panX: mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom),
      panY: mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom),
    })
  }, [viewport, setViewport])

  const cursorClass = toolMode === 'draw-wall' ? 'cursor-crosshair' : toolMode === 'pan' ? 'cursor-grab' : ''

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className={`plan-canvas ${cursorClass}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className="canvas-overlay zoom-indicator">
        {Math.round(viewport.zoom * 100)}%
      </div>
      <div className="canvas-overlay status-indicator">
        pan: {Math.round(viewport.panX)}, {Math.round(viewport.panY)} | clicks: {clickCount}
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────

export default function App() {
  const { viewMode, toolMode, setViewMode, setToolMode, project, undo, redo, canUndo, canRedo, addWall, selectedWallId, updateWall } = useFRMXStore()
  const [wallWidthInches, setWallWidthInches] = useState(6)
  const [originPoint, setOriginPoint] = useState<{x:number;y:number}| null>(null)
  const [arrowAngle, setArrowAngle] = useState(0)
  const [inputLength, setInputLength] = useState('')

  const VIEW_MODES: { mode: ViewMode; label: string; icon: string }[] = [
    { mode: 'plan', label: 'Plan', icon: '▣' },
    { mode: 'elevation', label: 'Elevation', icon: '▤' },
    { mode: '3d', label: '3D', icon: '◇' },
  ]

  const TOOLS: { mode: ToolMode; label: string; icon: string }[] = [
    { mode: 'select', label: 'Select', icon: '↖' },
    { mode: 'pan', label: 'Pan', icon: '✋' },
    { mode: 'draw-wall', label: 'Draw Wall', icon: '╱' },
    { mode: 'add-opening', label: 'Opening', icon: '▭' },
    { mode: 'edit-panel', label: 'Panel', icon: '✎' },
  ]

  const selectedWall = selectedWallId
    ? project.building.levels.flatMap(l => l.walls).find(w => w.id === selectedWallId)
    : null

  const placeWall = useCallback(() => {
    if (!inputLength || !originPoint) return
    const lenFt = parseFloat(inputLength)
    if (!isNaN(lenFt) && lenFt > 0) {
      const rad = (arrowAngle * Math.PI) / 180
      const endX = originPoint.x + Math.cos(rad) * lenFt
      const endY = originPoint.y + Math.sin(rad) * lenFt
      addWall({ id: nanoid(8), name: `Wall ${Date.now().toString(36).slice(-4).toUpperCase()}`, centerline: [{x: originPoint.x, y: originPoint.y}, {x: endX, y: endY}], height: 96, wallType: 'exterior', panels: [], openings: [], modules: [] })
      setOriginPoint(null)
      setInputLength('')
    }
  }, [inputLength, originPoint, arrowAngle, addWall])

  const cancelWall = useCallback(() => {
    setOriginPoint(null)
    setInputLength('')
  }, [])

  return (
    <div className="app-layout">
      {/* Toolbar */}
      <div className="toolbar">
        <span className="toolbar-brand">FRMX</span>

        {/* View modes */}
        <div className="toolbar-group">
          {VIEW_MODES.map(({ mode, label, icon }) => (
            <button
              key={mode}
              className={`btn btn-view ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
            >
              <span className="btn-icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="toolbar-separator" />

        {/* Tools */}
        <div className="toolbar-group">
          {TOOLS.map(({ mode, label, icon }) => (
            <button
              key={mode}
              className={`btn btn-tool ${toolMode === mode ? 'active' : ''}`}
              onClick={() => setToolMode(mode)}
              title={label}
            >
              <span className="btn-icon">{icon}</span>
            </button>
          ))}
        </div>

        <div className="toolbar-separator" />

        {/* Wall width */}
        <div className="toolbar-group">
          <select
            className="select-input"
            value={wallWidthInches}
            onChange={e => setWallWidthInches(Number(e.target.value))}
          >
            <option value={3.5}>3.5" 2x4</option>
            <option value={5.5}>5.5" 2x6</option>
          </select>
        </div>

        {/* Wall input panel */}
        {toolMode === 'draw-wall' && originPoint && (
          <div className="wall-input-panel">
            <div className="direction-buttons">
              {[{label:'←', angle:180}, {label:'↑', angle:270}, {label:'↓', angle:90}, {label:'→', angle:0}].map(({label, angle}) => (
                <button
                  key={angle}
                  className={`direction-btn ${arrowAngle === angle ? 'active' : ''}`}
                  onClick={() => setArrowAngle(angle)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="number"
              className="length-input"
              value={inputLength}
              onChange={e => setInputLength(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') placeWall()
                if (e.key === 'Escape') cancelWall()
              }}
              placeholder="length (ft)"
            />
            <button className="btn btn-primary" onClick={placeWall}>Place</button>
            <button className="btn btn-action" onClick={cancelWall}>✕</button>
          </div>
        )}

        <div className="toolbar-spacer" />

        {/* Undo/Redo */}
        <div className="toolbar-group">
          <button
            className="btn btn-action"
            onClick={undo}
            disabled={!canUndo()}
            title="Undo (Ctrl+Z)"
          >
            ↩
          </button>
          <button
            className="btn btn-action"
            onClick={redo}
            disabled={!canRedo()}
            title="Redo (Ctrl+Y)"
          >
            ↪
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Project</div>
            <div className="sidebar-item">{project.name}</div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Walls ({project.building.levels.reduce((s, l) => s + l.walls.length, 0)})</div>
            {project.building.levels.map(level => (
              level.walls.map(wall => (
                <div
                  key={wall.id}
                  className={`sidebar-item ${selectedWallId === wall.id ? 'selected' : ''}`}
                  onClick={() => useFRMXStore.getState().selectWall(wall.id)}
                >
                  {wall.name}
                </div>
              ))
            ))}
            {project.building.levels.reduce((s, l) => s + l.walls.length, 0) === 0 && (
              <div className="sidebar-item sidebar-item-empty">
                No walls yet
              </div>
            )}
          </div>

          {selectedWall && (
            <div className="sidebar-section">
              <div className="sidebar-title">Wall Properties</div>
              <div className="property-row">
                <span className="property-label">Name</span>
                <span className="property-value">{selectedWall.name}</span>
              </div>
              <div className="property-row">
                <span className="property-label">Height</span>
                <span className="property-value">{selectedWall.height}"</span>
              </div>
              <div className="property-row">
                <span className="property-label">Type</span>
                <span className="property-value">{selectedWall.wallType}</span>
              </div>
            </div>
          )}
        </div>

        {/* Canvas area */}
        <div className="canvas-area">
          {viewMode === 'plan' && (
            <PlanView
              wallWidth={wallWidthInches}
              originPoint={originPoint}
              arrowAngle={arrowAngle}
              inputLength={inputLength}
              onSetOrigin={setOriginPoint}
            />
          )}
          {viewMode === 'elevation' && (
            <div className="elevation-placeholder">
              Select a wall to view elevation
            </div>
          )}
          {viewMode === '3d' && (
            <div className="view-3d-placeholder">
              3D View — coming soon
            </div>
          )}
        </div>
      </div>

      {/* Info bar */}
      <div className="info-bar">
        {viewMode === 'plan' && <span>Plan View — {project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls | {wallWidthInches}" wall</span>}
        {viewMode === 'elevation' && <span>Elevation View</span>}
        {viewMode === '3d' && <span>3D View</span>}
      </div>
    </div>
  )
}