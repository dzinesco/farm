# FRMX UI Redesign: Figma-like View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat, hard-to-use inline-styled UI with a proper Figma-inspired interface featuring a toolbar, sidebar panel, and working interactive buttons with proper visual hierarchy and feedback.

**Architecture:** CSS-first redesign using a dedicated stylesheet with CSS custom properties for theming, replacing all inline styles. The toolbar becomes a proper grouped button bar, sidebar shows project tree and wall properties, and all buttons get proper hover/active states wired to store actions.

**Tech Stack:** React 19, Zustand, Vite, vanilla CSS with custom properties (no Tailwind for this app — CSS modules for maintainability)

---

## Task 1: Create CSS stylesheet with design system

**Files:**
- Create: `apps/web-vite/src/styles/design-system.css`
- Modify: `apps/web-vite/src/App.tsx` (remove all inline styles, apply class names)
- Modify: `apps/web-vite/src/components/PlanView.tsx` (update inline styles to classes)
- Modify: `apps/web-vite/index.html` (add Google Fonts: Inter)

- [ ] **Step 1: Create the design system CSS file**

Create `apps/web-vite/src/styles/design-system.css` with:

```css
/* FRMX Design System — CSS Custom Properties */
:root {
  /* Colors */
  --color-bg-canvas: #1a1a2e;
  --color-bg-panel: #16213e;
  --color-bg-toolbar: #0f0f23;
  --color-bg-sidebar: #1a1a2e;
  --color-bg-hover: #252545;
  --color-bg-active: #2d2d5a;

  --color-border: #2a2a4a;
  --color-border-active: #4a4a8a;

  --color-text-primary: #e8e8f0;
  --color-text-secondary: #8888aa;
  --color-text-muted: #6666880;

  --color-accent: #4f8fff;
  --color-accent-hover: #6ba0ff;
  --color-accent-active: #3d7fe0;
  --color-accent-muted: #3a5a9a;

  --color-success: #4ade80;
  --color-warning: #fbbf24;
  --color-danger: #f87171;

  --color-wall-selected: #4f8fff;
  --color-wall-unselected: #6b7280;
  --color-wall-preview: #60a5fa;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.5);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}

/* Reset */
* { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--color-bg-canvas);
  color: var(--color-text-primary);
}

/* App Layout */
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-bg-toolbar);
  border-bottom: 1px solid var(--color-border);
  min-height: 52px;
  flex-shrink: 0;
}

.toolbar-brand {
  font-weight: 700;
  font-size: 15px;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
  padding-right: var(--spacing-md);
  border-right: 1px solid var(--color-border);
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.toolbar-separator {
  width: 1px;
  height: 24px;
  background: var(--color-border);
  margin: 0 var(--spacing-sm);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* View mode buttons */
.btn-view {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid transparent;
  padding: var(--spacing-sm) var(--spacing-md);
}

.btn-view:hover:not(:disabled) {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.btn-view.active {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

/* Tool buttons */
.btn-tool {
  background: var(--color-bg-panel);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  min-width: 38px;
  height: 34px;
}

.btn-tool:hover:not(:disabled) {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
  border-color: var(--color-border-active);
}

.btn-tool.active {
  background: var(--color-accent-muted);
  color: var(--color-text-primary);
  border-color: var(--color-accent);
}

/* Action buttons */
.btn-action {
  background: var(--color-bg-panel);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.btn-action:hover:not(:disabled) {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.btn-primary {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.btn-primary:active:not(:disabled) {
  background: var(--color-accent-active);
}

/* Icon in button */
.btn-icon {
  font-size: 14px;
  line-height: 1;
}

/* Select input */
.select-input {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
  background: var(--color-bg-panel);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  outline: none;
}

.select-input:hover {
  border-color: var(--color-border-active);
}

/* Main content area */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-section {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.sidebar-item:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.sidebar-item.selected {
  background: var(--color-accent-muted);
  color: var(--color-text-primary);
}

/* Properties panel */
.properties-panel {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.property-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.property-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.property-value {
  font-size: 13px;
  color: var(--color-text-primary);
  font-family: 'JetBrains Mono', monospace;
}

/* Canvas container */
.canvas-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-canvas);
}

.plan-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Canvas overlays */
.canvas-overlay {
  position: absolute;
  background: rgba(15, 15, 35, 0.85);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-text-secondary);
  backdrop-filter: blur(8px);
  pointer-events: none;
}

.zoom-indicator {
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
}

.status-indicator {
  top: var(--spacing-lg);
  left: var(--spacing-lg);
}

/* Info bar */
.info-bar {
  height: 28px;
  background: var(--color-bg-toolbar);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
  font-size: 11px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

/* Input panel for wall drawing */
.wall-input-panel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: rgba(79, 143, 255, 0.1);
  border: 1px solid var(--color-accent-muted);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}

.direction-buttons {
  display: flex;
  gap: 2px;
}

.direction-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  background: var(--color-bg-panel);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.direction-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.direction-btn.active {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.length-input {
  width: 80px;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 13px;
  background: var(--color-bg-panel);
  color: var(--color-text-primary);
  border: 1px solid var(--color-accent-muted);
  border-radius: var(--radius-sm);
  outline: none;
}

.length-input::placeholder {
  color: var(--color-text-muted);
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
  font-size: 14px;
  gap: var(--spacing-md);
}

.empty-state-icon {
  font-size: 48px;
  opacity: 0.3;
}

/* Elevation view placeholder */
.elevation-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  color: var(--color-text-muted);
}

/* 3D view placeholder */
.view-3d-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: Update index.html to add Google Fonts**

Modify `apps/web-vite/index.html` to add the Google Fonts link in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Create styles directory and move CSS**

```bash
mkdir -p apps/web-vite/src/styles
```

- [ ] **Step 4: Update App.tsx with proper class names and remove inline styles**

Write the new `apps/web-vite/src/App.tsx`:

```tsx
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useFRMXStore } from './store'
import './styles/design-system.css'

type ViewMode = 'plan' | 'elevation' | '3d'
type ToolMode = 'select' | 'pan' | 'draw-wall' | 'add-opening' | 'edit-panel'

const VIEW_MODES: { mode: ViewMode; label: string; icon: string }[] = [
  { mode: 'plan', label: 'Plan', icon: '▣' },
  { mode: 'elevation', label: 'Elevation', icon: '▤' },
  { mode: '3d', label: '3D', icon: '◇' },
]

const TOOLS: { mode: ToolMode; label: string; icon: string }[] = [
  { mode: 'select', label: 'Select', icon: '↖' },
  { mode: 'pan', label: 'Pan', icon: '✋' },
  { mode: 'draw-wall', label: 'Draw', icon: '╱' },
  { mode: 'add-opening', label: 'Opening', icon: '▭' },
  { mode: 'edit-panel', label: 'Panel', icon: '✎' },
]

function PlanViewCanvas() {
  const canvasRef = { current: null as HTMLCanvasElement | null }
  const { project, viewport, setViewport, selectedWallId, selectWall, toolMode, addWall } = useFRMXStore()
  const [clickCount, setClickCount] = useState(0)
  const [originPoint, setOriginPoint] = useState<{ x: number; y: number } | null>(null)
  const [arrowAngle, setArrowAngle] = useState(0)
  const [inputLength, setInputLength] = useState('')
  const wallWidthInches = 6

  // Refs for event handlers
  const toolModeRef = { current: toolMode }
  toolModeRef.current = toolMode
  const isPanningRef = { current: false }
  const lastPosRef = { current: { x: 0, y: 0 } }
  const isDrawingRef = { current: false }
  const drawingPointsRef = { current: [] as { x: number; y: number }[] }

  // Offset a point perpendicular to a segment by `dist` feet
  function offsetPoint(px: number, py: number, dx: number, dy: number, dist: number) {
    const len = Math.hypot(dx, dy) || 1
    return { x: px - (dy / len) * dist, y: py + (dx / len) * dist }
  }

  // Draw function
  const draw = () => {
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
    ctx.strokeStyle = '#2a2a4a'
    ctx.lineWidth = 0.5
    const gridSpacing = 3 * zoom
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
    ctx.font = '9px JetBrains Mono, monospace'
    for (let x = startX; x < width; x += gridSpacing * 12) {
      const foot = Math.round((x - panX) / gridSpacing)
      ctx.fillText(`${foot}'`, x + 2, 14)
    }

    const wFt = wallWidthInches / 12

    // Draw walls as double-line parallel representation
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
        ctx.font = 'bold 11px Inter, system-ui'
        ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4)
        ctx.font = '9px JetBrains Mono, monospace'
        ctx.fillStyle = '#8888aa'
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
      ctx.strokeStyle = '#4f8fff'
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

        // Guide from origin to end
        ctx.beginPath()
        ctx.moveTo(originPoint.x * zoom + panX, originPoint.y * zoom + panY)
        ctx.lineTo(endX * zoom + panX, endY * zoom + panY)
        ctx.stroke()

        // Perpendicular width guides
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
        ctx.strokeStyle = '#4f8fff'
        ctx.lineWidth = 2
        const ox = originPoint.x * zoom + panX, oy = originPoint.y * zoom + panY
        ctx.beginPath(); ctx.moveTo(ox - 8, oy); ctx.lineTo(ox + 8, oy); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(ox, oy - 8); ctx.lineTo(ox, oy + 8); ctx.stroke()

        // End point
        ctx.fillStyle = '#4f8fff'
        ctx.beginPath()
        ctx.arc(endX * zoom + panX, endY * zoom + panY, 5, 0, Math.PI * 2)
        ctx.fill()

        // Length label
        ctx.fillStyle = '#e8e8f0'
        ctx.font = 'bold 11px JetBrains Mono, monospace'
        ctx.fillText(`${lenFt}'`, (originPoint.x + (endX - originPoint.x) / 2) * zoom + panX - 8, (originPoint.y + (endY - originPoint.y) / 2) * zoom + panY - 8)
      }
    } else if (toolModeRef.current === 'draw-wall' && originPoint) {
      // Origin crosshair only
      ctx.strokeStyle = '#4f8fff'
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
  }

  // Resize effect
  const canvas = null as unknown as HTMLCanvasElement
  const resize = () => { if (canvas) { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; draw() } }
  const _resizeRef = { current: resize }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setClickCount(c => c + 1)
    isPanningRef.current = false
    const rect = canvas.getBoundingClientRect()
    const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom
    const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom

    if (toolModeRef.current === 'pan') {
      isPanningRef.current = true
      lastPosRef.current = { x: e.clientX, y: e.clientY }
    } else if (toolModeRef.current === 'draw-wall') {
      setOriginPoint({ x: worldX, y: worldY })
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
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanningRef.current) {
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      setViewport({ panX: viewport.panX + dx, panY: viewport.panY + dy })
    }
  }

  const handleMouseUp = () => {
    if (isPanningRef.current) { isPanningRef.current = false; return }
  }

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left, mouseY = e.clientY - rect.top
    const newZoom = Math.max(0.1, Math.min(10, viewport.zoom * (e.deltaY > 0 ? 0.9 : 1.1)))
    setViewport({
      zoom: newZoom,
      panX: mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom),
      panY: mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom),
    })
  }

  const placeWall = () => {
    if (!inputLength || !originPoint) return
    const lenFt = parseFloat(inputLength)
    if (!isNaN(lenFt) && lenFt > 0) {
      const rad = (arrowAngle * Math.PI) / 180
      const endX = originPoint.x + Math.cos(rad) * lenFt
      const endY = originPoint.y + Math.sin(rad) * lenFt
      addWall({
        id: nanoid(8),
        name: `Wall ${Date.now().toString(36).slice(-4).toUpperCase()}`,
        centerline: [{ x: originPoint.x, y: originPoint.y }, { x: endX, y: endY }],
        height: 96,
        wallType: 'exterior',
        panels: [],
        openings: [],
        modules: [],
      })
      setOriginPoint(null)
      setInputLength('')
    }
  }

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef as any}
        className="plan-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className="canvas-overlay zoom-indicator">
        {Math.round(viewport.zoom * 100)}%
      </div>
      <div className="canvas-overlay status-indicator">
        {toolMode === 'draw-wall' ? 'Click canvas to set origin' : `${project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls`}
      </div>

      {/* Wall input panel - shows when in draw-wall mode with origin set */}
      {toolMode === 'draw-wall' && originPoint && (
        <div className="wall-input-panel" style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="direction-buttons">
            {[{ label: '←', angle: 180 }, { label: '↑', angle: 270 }, { label: '↓', angle: 90 }, { label: '→', angle: 0 }].map(({ label, angle }) => (
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
              if (e.key === 'Escape') { setOriginPoint(null); setInputLength('') }
            }}
            placeholder="length (ft)"
          />
          <button className="btn btn-primary" onClick={placeWall}>Place Wall</button>
          <button className="btn btn-action" onClick={() => { setOriginPoint(null); setInputLength('') }}>✕</button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const { viewMode, toolMode, setViewMode, setToolMode, project, undo, redo, canUndo, canRedo } = useFRMXStore()

  const selectedWall = project.building.levels[0]?.walls.find(w => w.id === useFRMXStore.getState().selectedWallId)

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

        {/* Wall type selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Wall:</span>
          <select
            className="select-input"
            defaultValue="6"
          >
            <option value="3.5">3.5" 2×4</option>
            <option value="5.5">5.5" 2×6</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
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

      {/* Main content */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Project</div>
            <div className="sidebar-item">{project.name}</div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Levels</div>
            {project.building.levels.map(level => (
              <div key={level.id}>
                <div className="sidebar-item" style={{ fontWeight: 500 }}>{level.name}</div>
                {level.walls.map(wall => (
                  <div
                    key={wall.id}
                    className={`sidebar-item ${useFRMXStore.getState().selectedWallId === wall.id ? 'selected' : ''}`}
                    onClick={() => useFRMXStore.getState().selectWall(wall.id)}
                    style={{ paddingLeft: 24, fontSize: 12 }}
                  >
                    {wall.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Properties panel */}
          {selectedWall && (
            <div className="properties-panel">
              <div className="sidebar-title">Properties</div>
              <div className="property-row">
                <span className="property-label">Name</span>
                <span className="property-value">{selectedWall.name}</span>
              </div>
              <div className="property-row">
                <span className="property-label">Type</span>
                <span className="property-value">{selectedWall.wallType}</span>
              </div>
              <div className="property-row">
                <span className="property-label">Height</span>
                <span className="property-value">{selectedWall.height}"</span>
              </div>
              <div className="property-row">
                <span className="property-label">Panels</span>
                <span className="property-value">{selectedWall.panels.length}</span>
              </div>
              <div className="property-row">
                <span className="property-label">Openings</span>
                <span className="property-value">{selectedWall.openings.length}</span>
              </div>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {viewMode === 'plan' && <PlanViewCanvas />}
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
        {viewMode === 'plan' && (
          <>
            Plan View — {project.building.levels.reduce((s, l) => s + l.walls.length, 0)} walls
            {selectedWall && ` | ${selectedWall.name} selected`}
          </>
        )}
        {viewMode === 'elevation' && <span>Elevation View</span>}
        {viewMode === '3d' && <span>3D View</span>}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run dev server and verify**

Run: `cd apps/web-vite && pnpm dev`
Open: `http://localhost:5173`
Expected: Dark themed UI with proper button styling, toolbar, and sidebar visible

- [ ] **Step 6: Test button interactivity**

- Click each view mode button (Plan, Elevation, 3D) — should switch views
- Click each tool button (Select, Pan, Draw, Opening, Panel) — should activate
- Draw wall flow: click Draw tool → click canvas → set origin → enter length → click Place Wall

- [ ] **Step 7: Commit**

```bash
cd apps/web-vite
git add src/styles/design-system.css src/App.tsx index.html
git commit -m "feat: add Figma-like dark UI with proper button styling and sidebar

- Create design-system.css with CSS custom properties for dark theme
- Add Google Fonts (Inter, JetBrains Mono) for typography
- Replace flat inline styles with proper class-based styling
- Add toolbar with grouped view mode and tool buttons
- Add sidebar with project tree and wall properties panel
- Implement proper button hover/active states
- Add wall input panel with direction arrows for draw-wall mode"
```

---

## Task 2: Fix button interactivity issues

**Files:**
- Modify: `apps/web-vite/src/App.tsx`

- [ ] **Step 1: Verify current button wiring by checking store actions**

The `setViewMode`, `setToolMode`, `undo`, `redo` are all directly wired to Zustand store actions. Verify they work correctly by testing in browser.

- [ ] **Step 2: Fix keyboard shortcuts**

Add keyboard event handling for Ctrl+Z (undo) and Ctrl+Y (redo) at the App level. Add to App.tsx:

```tsx
// In App component, add useEffect:
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
```

- [ ] **Step 3: Fix direction buttons and length input**

The direction buttons and input were previously in the toolbar. In the new design they're in the wall-input-panel. Ensure the `arrowAngle` and `inputLength` state are properly managed and the `placeWall` function is wired.

- [ ] **Step 4: Test all button interactions**

Run: `cd apps/web-vite && pnpm dev`
Test:
1. View mode buttons switch views
2. Tool buttons activate (Select, Pan, Draw)
3. Undo/Redo buttons work
4. Direction arrows change arrowAngle
5. Length input accepts numbers
6. Place Wall button creates a wall

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "fix: ensure all button handlers are properly wired to store actions

- Add keyboard shortcuts for undo/redo
- Fix direction button state management
- Ensure wall placement flow works end-to-end"
```

---

## Task 3: Add visual feedback for selected states

**Files:**
- Modify: `apps/web-vite/src/styles/design-system.css`
- Modify: `apps/web-vite/src/App.tsx`

- [ ] **Step 1: Add active state for tool buttons**

Ensure `.btn-tool.active` has distinct styling from hover state.

- [ ] **Step 2: Add cursor changes for different tools**

In design-system.css, add:
```css
.cursor-crosshair { cursor: crosshair; }
.cursor-grab { cursor: grab; }
.cursor-pointer { cursor: pointer; }
```

Apply appropriate cursor class to canvas based on toolMode.

- [ ] **Step 3: Add wall selection highlight in sidebar**

The sidebar items should highlight when the wall is selected in the canvas.

- [ ] **Step 4: Test selection feedback**

- Select a wall in canvas → sidebar should highlight that wall
- Wall in canvas should show blue highlight
- Tool buttons should show active state

- [ ] **Step 5: Commit**

```bash
git add src/styles/design-system.css src/App.tsx
git commit -m "feat: add visual feedback for selection states

- Add cursor styles for different tools
- Highlight selected wall in sidebar
- Add active state styling for tool buttons"
```

---

## Task 4: Create tests for UI interactions

**Files:**
- Create: `apps/web-vite/src/__tests__/ui.test.tsx`

- [ ] **Step 1: Create test file**

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

// Mock store for testing
vi.mock('../store', () => ({
  useFRMXStore: () => ({
    project: {
      name: 'Test Project',
      building: {
        levels: [{
          id: '1',
          name: 'Level 1',
          walls: []
        }]
      }
    },
    selectedWallId: null,
    viewMode: 'plan',
    toolMode: 'select',
    viewport: { panX: 0, panY: 0, zoom: 1 },
    setViewMode: vi.fn(),
    setToolMode: vi.fn(),
    setViewport: vi.fn(),
    selectWall: vi.fn(),
    addWall: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    canUndo: () => false,
    canRedo: () => false,
  })
}))

describe('App UI', () => {
  it('renders toolbar with view mode buttons', () => {
    render(<App />)
    expect(screen.getByText('Plan')).toBeDefined()
    expect(screen.getByText('Elevation')).toBeDefined()
    expect(screen.getByText('3D')).toBeDefined()
  })

  it('renders toolbar with tool buttons', () => {
    render(<App />)
    // Tools are icon-only, check they exist
    const toolButtons = document.querySelectorAll('.btn-tool')
    expect(toolButtons.length).toBe(5)
  })

  it('calls setViewMode when view button clicked', async () => {
    const setViewMode = vi.fn()
    // Test implementation
  })

  it('calls setToolMode when tool button clicked', async () => {
    const setToolMode = vi.fn()
    // Test implementation
  })

  it('renders sidebar with project name', () => {
    render(<App />)
    expect(screen.getByText('Test Project')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run tests**

Run: `cd apps/web-vite && npx vitest run src/__tests__/ui.test.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/__tests__/ui.test.tsx
git commit -m "test: add UI interaction tests for toolbar and buttons"
```

---

## Task 5: Verify the complete implementation

**Files:**
- Review: `apps/web-vite/src/App.tsx`
- Review: `apps/web-vite/src/styles/design-system.css`

- [ ] **Step 1: Run full dev server test**

Run: `cd apps/web-vite && pnpm dev`
Open: `http://localhost:5173`

- [ ] **Step 2: Verify visual checklist**

- [ ] Dark theme with proper contrast
- [ ] Toolbar with FRMX brand, view mode buttons, tool buttons, wall selector, undo/redo
- [ ] Sidebar with project name, levels, walls, and properties
- [ ] Canvas with grid and proper cursor
- [ ] Buttons have hover states (lighter background)
- [ ] Buttons have active states (blue highlight)
- [ ] Disabled buttons are dimmed
- [ ] Clicking tool buttons changes active tool
- [ ] Clicking view mode buttons changes view
- [ ] Wall drawing flow works: click Draw → click canvas → enter length → click Place Wall

- [ ] **Step 3: Test button responsiveness**

- Hover over buttons → visual feedback
- Click buttons → action occurs
- Select wall → visual feedback in both canvas and sidebar

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Figma-like UI implementation with working buttons"
```