'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFRMXStore } from '@/store'
import { formatDim } from '@frmx/calculator'

const GRID_SIZE = 12
const MIN_ZOOM = 0.1
const MAX_ZOOM = 10

export default function ElevationView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { project, viewport, setViewport, selectedWallId, selectedPanelId, toolMode, selectWall, selectPanel } = useFRMXStore()
  const isPanningRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const draggingPanelRef = useRef<{ panelId: string; startX: number; origPosition: number } | null>(null)
  const boxSelectRef = useRef<{ startX: number; startY: number; mode: 'window' | 'crossing' } | null>(null)

  const selectedWall = (() => {
    for (const level of project.building.levels) {
      const w = level.walls.find(w => w.id === selectedWallId)
      if (w) return w
    }
    return null
  })()

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
    const gridH = GRID_SIZE * zoom
    const startY = (panY % gridH)

    for (let y = startY; y < height; y += gridH) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Height markers
    ctx.fillStyle = '#999'
    ctx.font = '9px monospace'
    for (let y = startY; y < height; y += gridH * 12) {
      const ft = Math.round((y - panY) / gridH)
      ctx.fillText(`${ft}'`, 4, y - 2)
    }

    if (!selectedWall) {
      ctx.fillStyle = '#666'
      ctx.font = '14px system-ui'
      ctx.fillText('Select a wall to view elevation', width / 2 - 120, height / 2)
      return
    }

    // Draw elevation of selected wall
    drawElevation(ctx, selectedWall, viewport, selectedPanelId, width, height)

    // Draw box selection
    if (boxSelectRef.current) {
      const canvas = canvasRef.current
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const startX = boxSelectRef.current.startX - rect.left
        const startY = boxSelectRef.current.startY - rect.top
        const curX = lastPosRef.current.x
        const curY = lastPosRef.current.y
        ctx.strokeStyle = boxSelectRef.current.mode === 'window' ? '#00d4ff' : '#ffd93d'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.strokeRect(startX, startY, curX - startX, curY - startY)
        ctx.setLineDash([])
      }
    }
  }, [project, viewport, selectedWallId, selectedPanelId])

  function drawElevation(
    ctx: CanvasRenderingContext2D,
    wall: { id: string; name: string; height: number; panels: { id: string; name: string; position: number; width: number; height: number; layerStack: { name: string; thickness: number; role: string }[]; framingModel: { studs: { position: number; type: string }[]; headers: { start: number; end: number; height: number }[] } }[] },
    vp: { panX: number; panY: number; zoom: number },
    selectedPanelId: string | null,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const { panX, panY, zoom } = vp
    const wallH = wall.height
    const wallW = 600 // display width in pixels at zoom 1

    const baseY = canvasHeight / 2 + wallH * zoom / 2
    const leftX = 100

    // Ground line
    ctx.strokeStyle = '#555'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(leftX - 20, baseY)
    ctx.lineTo(leftX + wallW * zoom + 20, baseY)
    ctx.stroke()

    // Wall outline
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2
    ctx.strokeRect(leftX, baseY - wallH * zoom, wallW * zoom, wallH * zoom)

    // Panel rendering
    for (const panel of wall.panels) {
      const px = leftX + panel.position * zoom
      const pw = panel.width * zoom
      const ph = panel.height * zoom

      const isSelected = panel.id === selectedPanelId

      // Panel fill
      ctx.fillStyle = isSelected ? 'rgba(255,217,61,0.15)' : 'rgba(200,200,200,0.1)'
      ctx.fillRect(px, baseY - ph, pw, ph)

      // Layer stack visualization (simplified)
      let layerY = baseY - ph
      for (const layer of panel.layerStack) {
        const layerH = layer.thickness * zoom
        const colors: Record<string, string> = {
          sheathing: '#c4b5a0',
          cladding: '#8b7355',
          insulation: '#fde68a',
          'vapor-barrier': '#93c5fd80',
          drywall: '#ffffff',
        }
        ctx.fillStyle = colors[layer.role] ?? '#ddd'
        ctx.fillRect(px, layerY, pw, Math.max(1, layerH))
        layerY += layerH
      }

      // Panel border
      ctx.strokeStyle = isSelected ? '#ffd93d' : '#999'
      ctx.lineWidth = isSelected ? 2 : 1
      ctx.strokeRect(px, baseY - ph, pw, ph)

      // Studs (simplified as vertical lines)
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 0.5
      for (const stud of panel.framingModel.studs) {
        const sx = px + stud.position * zoom
        if (sx >= px && sx <= px + pw) {
          ctx.beginPath()
          ctx.moveTo(sx, baseY)
          ctx.lineTo(sx, baseY - ph)
          ctx.stroke()
        }
      }

      // Panel label
      ctx.fillStyle = '#333'
      ctx.font = '10px system-ui'
      ctx.fillText(panel.name, px + 2, baseY - 4)
    }

    // Height dimension
    ctx.fillStyle = '#2563eb'
    ctx.font = 'bold 11px monospace'
    ctx.fillText(formatDim(wallH), leftX + wallW * zoom + 8, baseY - wallH * zoom / 2)

    // Wall name
    ctx.fillStyle = '#333'
    ctx.font = 'bold 13px system-ui'
    ctx.fillText(`${wall.name} — Elevation`, leftX, baseY - wallH * zoom - 10)
  }

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (toolMode === 'pan') {
      isPanningRef.current = true
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      return
    }

    if (toolMode === 'select' && selectedWall) {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom

      // Hit test panels
      const leftX = 100
      for (const panel of selectedWall.panels) {
        const panelLeft = leftX + panel.position * viewport.zoom
        const panelRight = panelLeft + panel.width * viewport.zoom
        if (worldX >= panelLeft && worldX <= panelRight) {
          selectPanel(panel.id)
          // Start panel drag
          draggingPanelRef.current = {
            panelId: panel.id,
            startX: e.clientX,
            origPosition: panel.position,
          }
          return
        }
      }
      // No panel hit — start box selection
      selectPanel(null)
      boxSelectRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        mode: e.shiftKey ? 'crossing' : 'window',
      }
    }
  }, [toolMode, selectedWall, viewport, selectPanel])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanningRef.current) {
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      setViewport({ panX: viewport.panX + dx, panY: viewport.panY + dy })
      return
    }

    // Panel dragging
    if (draggingPanelRef.current && selectedWall && selectedWallId) {
      const dx = e.clientX - draggingPanelRef.current.startX
      const movementFeet = dx / viewport.zoom
      const newPosition = Math.max(0, draggingPanelRef.current.origPosition + movementFeet)
      // Update panel position live in store
      const store = useFRMXStore.getState()
      store.updatePanel(selectedWallId, draggingPanelRef.current.panelId, {
        position: newPosition,
      })
    }

    // Box selection rendering (live update of selection box)
    if (boxSelectRef.current) {
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      draw()
    }
  }, [viewport, setViewport, selectedWall, selectedWallId, draw])

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isPanningRef.current = false

    if (draggingPanelRef.current) {
      draggingPanelRef.current = null
    }

    if (boxSelectRef.current) {
      // Perform box selection on panels
      if (selectedWall && selectedWallId) {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const startX = Math.min(boxSelectRef.current.startX, e.clientX)
        const endX = Math.max(boxSelectRef.current.startX, e.clientX)
        const startWorldX = (startX - rect.left - viewport.panX) / viewport.zoom
        const endWorldX = (endX - rect.left - viewport.panX) / viewport.zoom
        const leftX = 100

        for (const panel of selectedWall.panels) {
          const panelLeft = leftX + panel.position * viewport.zoom
          const panelRight = panelLeft + panel.width * viewport.zoom
          let selected = false
          if (boxSelectRef.current!.mode === 'window') {
            // Window select: panel must be fully inside box
            selected = panelLeft >= startWorldX && panelRight <= endWorldX
          } else {
            // Crossing select: any intersection
            selected = panelLeft <= endWorldX && panelRight >= startWorldX
          }
          if (selected) {
            selectPanel(panel.id)
            break
          }
        }
      }
      boxSelectRef.current = null
      draw()
    }
  }, [selectedWall, selectedWallId, viewport, selectPanel, draw])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.zoom * zoomFactor))
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

  useEffect(() => { draw() }, [draw])

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600">
        {Math.round(viewport.zoom * 100)}%
      </div>
    </div>
  )
}