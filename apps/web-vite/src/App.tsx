import { useState, useRef, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { useFRMXStore } from './store'

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

  // Offset a point perpendicular to a segment by `dist` feet
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

    const wFt = wallWidth / 12

    // Walls — double-line parallel representation
    for (const level of project.building.levels) {
      for (const wall of level.walls) {
        if (wall.centerline.length < 2) continue
        const isSelected = wall.id === selectedWallId

        // Draw two parallel offset lines (double-wall)
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
          ctx.strokeStyle = isSelected ? '#2563eb' : '#888'
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
        ctx.strokeStyle = isSelected ? '#2563eb' : '#888'
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
        ctx.fillStyle = '#333'
        ctx.font = 'bold 11px system-ui'
        ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4)
        ctx.font = '9px monospace'
        ctx.fillStyle = '#666'
        ctx.fillText(`${Math.round(lenFt * 12)}"`, mid.x * zoom + panX + 4, mid.y * zoom + panY + 10)
      }
    }

    // In-progress wall preview
    if (toolModeRef.current === 'draw-wall' && isDrawingRef.current && drawingPointsRef.current.length > 0) {
      const pts = drawingPointsRef.current
      // Draw centerline dashed
      ctx.beginPath()
      ctx.moveTo(pts[0].x * zoom + panX, pts[0].y * zoom + panY)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x * zoom + panX, pts[i].y * zoom + panY)
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.stroke()
      ctx.setLineDash([])
      // Draw double-wall preview
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
      // Endpoint handle
      const last = pts[pts.length - 1]
      ctx.fillStyle = '#2563eb'
      ctx.beginPath()
      ctx.arc(last.x * zoom + panX, last.y * zoom + panY, 6, 0, Math.PI * 2)
      ctx.fill()
    }

    // ─── Draw-wall: origin + direction UI ───────────────────────────────
    if (toolModeRef.current === 'draw-wall' && originPoint && inputLength) {
      const lenFt = parseFloat(inputLength)
      if (!isNaN(lenFt) && lenFt > 0) {
        const rad = (arrowAngle * Math.PI) / 180
        const endX = originPoint.x + Math.cos(rad) * lenFt
        const endY = originPoint.y + Math.sin(rad) * lenFt

        // Draw guide dashes
        ctx.setLineDash([6, 4])
        ctx.strokeStyle = '#60a5fa'
        ctx.lineWidth = 1.5

        // Guide from origin to end
        ctx.beginPath()
        ctx.moveTo(originPoint.x * zoom + panX, originPoint.y * zoom + panY)
        ctx.lineTo(endX * zoom + panX, endY * zoom + panY)
        ctx.stroke()

        // Perpendicular width guides at start and end
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

        // Origin crosshair
        ctx.strokeStyle = '#2563eb'
        ctx.lineWidth = 2
        const ox = originPoint.x * zoom + panX, oy = originPoint.y * zoom + panY
        ctx.beginPath(); ctx.moveTo(ox - 8, oy); ctx.lineTo(ox + 8, oy); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(ox, oy - 8); ctx.lineTo(ox, oy + 8); ctx.stroke()

        // End point
        ctx.fillStyle = '#2563eb'
        ctx.beginPath()
        ctx.arc(endX * zoom + panX, endY * zoom + panY, 5, 0, Math.PI * 2)
        ctx.fill()

        // Length label
        ctx.fillStyle = '#333'
        ctx.font = 'bold 11px monospace'
        ctx.fillText(`${lenFt}'`, (originPoint.x + (endX - originPoint.x) / 2) * zoom + panX - 8, (originPoint.y + (endY - originPoint.y) / 2) * zoom + panY - 8)
      }
    } else if (toolModeRef.current === 'draw-wall' && originPoint) {
      // Origin crosshair only
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      const ox = originPoint.x * zoom + panX, oy = originPoint.y * zoom + panY
      ctx.beginPath(); ctx.moveTo(ox - 8, oy); ctx.lineTo(ox + 8, oy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(ox, oy - 8); ctx.lineTo(ox, oy + 8); ctx.stroke()

      // Draw arrow indicator from origin in current direction
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
    console.log('[PlanView] mousedown', toolModeRef.current)
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
      // Click sets origin; length+direction determine endpoint
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
    console.log('[PlanView] mouseup', 'isDrawing:', isDrawingRef.current, 'pts:', drawingPointsRef.current.length)
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

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#f0fff0' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: toolMode === 'draw-wall' ? 'crosshair' : toolMode === 'pan' ? 'grab' : 'default' }}
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

// ─── App ─────────────────────────────────────────────────────────────

export default function App() {
  const { viewMode, toolMode, setViewMode, setToolMode, project, undo, redo, canUndo, canRedo, addWall } = useFRMXStore()
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
    { mode: 'add-opening', label: 'Add Opening', icon: '▭' },
    { mode: 'edit-panel', label: 'Edit Panel', icon: '✎' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f3f4f6', borderBottom: '1px solid #d1d5db' }}>
        <span style={{ fontWeight: 'bold', fontSize: 14, marginRight: 16 }}>FRMX</span>

        {/* View modes */}
        <div style={{ display: 'flex', gap: 4, marginRight: 16 }}>
          {VIEW_MODES.map(({ mode, label, icon }) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              style={{ padding: '6px 12px', fontSize: 12, borderRadius: 4, border: '1px solid #d1d5db', cursor: 'pointer', background: viewMode === mode ? '#2563eb' : 'white', color: viewMode === mode ? 'white' : 'black' }}>
              <span style={{ marginRight: 4 }}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', gap: 4, marginRight: 16 }}>
          {TOOLS.map(({ mode, label, icon }) => (
            <button key={mode} onClick={() => setToolMode(mode)}
              style={{ padding: '6px 12px', fontSize: 12, borderRadius: 4, border: '1px solid #d1d5db', cursor: 'pointer', background: toolMode === mode ? '#2563eb' : 'white', color: toolMode === mode ? 'white' : 'black' }}>
              <span style={{ marginRight: 4 }}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* Wall width */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: '#666' }}>Wall:</label>
          <select
            value={wallWidthInches}
            onChange={e => setWallWidthInches(Number(e.target.value))}
            style={{ padding: '4px 8px', fontSize: 12, borderRadius: 4, border: '1px solid #d1d5db' }}
          >
            <option value={3.5}>3.5" 2×4</option>
            <option value={5.5}>5.5" 2×6</option>
          </select>
        </div>

        {/* Wall input panel — only show when origin is set in draw-wall mode */}
        {toolMode === 'draw-wall' && originPoint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 6, padding: '4px 12px' }}>
            {/* Direction arrows */}
            <div style={{ display: 'flex', gap: 2 }}>
              {[{label:'←', angle:180}, {label:'↑', angle:270}, {label:'↓', angle:90}, {label:'→', angle:0}].map(({label, angle}) => (
                <button key={angle} onClick={() => setArrowAngle(angle)}
                  style={{ width: 26, height: 26, fontSize: 13, fontWeight: 'bold', borderRadius: 3, border: '1px solid #93c5fd', cursor: 'pointer', background: arrowAngle === angle ? '#2563eb' : 'white', color: arrowAngle === angle ? 'white' : '#2563eb' }}>
                  {label}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={inputLength}
              onChange={e => setInputLength(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && inputLength && originPoint) {
                  const lenFt = parseFloat(inputLength)
                  if (!isNaN(lenFt) && lenFt > 0) {
                    const rad = (arrowAngle * Math.PI) / 180
                    const endX = originPoint.x + Math.cos(rad) * lenFt
                    const endY = originPoint.y + Math.sin(rad) * lenFt
                    addWall({ id: nanoid(8), name: `Wall ${Date.now().toString(36).slice(-4).toUpperCase()}`, centerline: [{x: originPoint.x, y: originPoint.y}, {x: endX, y: endY}], height: 96, wallType: 'exterior', panels: [], openings: [], modules: [] })
                    setOriginPoint(null)
                    setInputLength('')
                  }
                }
                if (e.key === 'Escape') { setOriginPoint(null); setInputLength('') }
              }}
              placeholder="length (ft)"
              style={{ width: 80, padding: '4px 8px', fontSize: 12, borderRadius: 3, border: '1px solid #93c5fd' }}
            />
            <button onClick={() => {
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
            }} style={{ padding: '4px 10px', fontSize: 12, background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Place Wall</button>
            <button onClick={() => { setOriginPoint(null); setInputLength('') }} style={{ padding: '4px 8px', fontSize: 12, background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 4, cursor: 'pointer' }}>✕</button>
          </div>
        )}

        <div style={{ width: 1, height: 24, background: '#d1d5db', margin: '0 8px' }} />
        <button onClick={undo} disabled={!canUndo()} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 4, border: '1px solid #d1d5db', cursor: canUndo() ? 'pointer' : 'not-allowed', opacity: canUndo() ? 1 : 0.4 }}>↩ Undo</button>
        <button onClick={redo} disabled={!canRedo()} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 4, border: '1px solid #d1d5db', cursor: canRedo() ? 'pointer' : 'not-allowed', opacity: canRedo() ? 1 : 0.4 }}>↪ Redo</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>{project.name}</div>
      </div>

      {/* Editor area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {viewMode === 'plan' && <PlanView wallWidth={wallWidthInches} originPoint={originPoint} arrowAngle={arrowAngle} inputLength={inputLength} onSetOrigin={setOriginPoint} />}
        {viewMode === 'elevation' && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#999' }}>Select a wall to view elevation</div>}
        {viewMode === '3d' && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#999' }}>3D View — coming soon</div>}
      </div>

      {/* Info bar */}
      <div style={{ height: 32, background: '#f3f4f6', borderTop: '1px solid #d1d5db', display: 'flex', alignItems: 'center', paddingLeft: 16, fontSize: 12, color: '#666' }}>
        {viewMode === 'plan' && <span>Plan View — {project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls | {wallWidthInches}" wall</span>}
        {viewMode === 'elevation' && <span>Elevation View</span>}
        {viewMode === '3d' && <span>3D View</span>}
      </div>
    </div>
  )
}