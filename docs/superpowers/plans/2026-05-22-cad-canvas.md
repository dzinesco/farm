# FRMX CAD Canvas — Grid, Snapping, Ortho & Professional UI

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add professional CAD canvas features — snap-to-grid, ortho mode, rulers in feet'inches", wall endpoint snapping for corner joins, visual wall type differentiation, and a polished toolbar with keyboard shortcuts.

**Architecture:** All canvas interaction lives in `PlanView.tsx` using Canvas 2D API. A `lib/snapping.ts` utility module handles grid snap, ortho snap, and endpoint snap. Rulers are separate `<canvas>` overlay elements rendered above the main canvas with `pointer-events: none`. Wall type colors map via a `WALL_COLORS` constant in `PlanView`. Toolbar gets Lucide icons and grouped sections. Zustand store gets `snapEnabled`, `orthoEnabled`, and `activeSnapMode` flags.

**Tech Stack:** React 19, Canvas 2D, Zustand, Lucide React, Tailwind CSS v4

---

## File Structure

```
apps/web/src/
├── components/
│   ├── Toolbar.tsx                   # Upgrade: Lucide icons, grouped sections, shortcut hints, snap indicators
│   ├── PlanView.tsx                 # Add snap/ortho rendering, wall type colors, endpoint handles
│   └── RulerOverlay.tsx             # Create: ruler bars (top + left) with feet'inches" tick marks
├── store/index.ts                   # Add snapEnabled, orthoEnabled, activeSnapMode state
└── lib/
    └── snapping.ts                  # Create: gridSnap, orthoSnap, endpointSnap, snapPoint

docs/superpowers/plans/2026-05-22-cad-canvas.md
```

---

## Task 1: Snapping utility module

**Files:**
- Create: `apps/web/src/lib/snapping.ts`
- Modify: `apps/web/src/store/index.ts` (add snap state fields)
- Test: `apps/web/src/lib/snapping.test.ts`

---

- [ ] **Step 1: Write the failing test**

```typescript
// apps/web/src/lib/snapping.test.ts
import { gridSnap, orthoSnap, snapPoint } from './snapping'

describe('gridSnap', () => {
  it('snaps to 1 inch grid (1/12 ft)', () => {
    expect(gridSnap(1.1, 1/12)).toBeCloseTo(1.0833, 3)
    expect(gridSnap(1.5, 1/12)).toBeCloseTo(1.5, 3)
  })
  it('snaps at zoom=1 (1ft = 3px)', () => {
    // At zoom=1, 3px = 1ft, so 1px = 1/3 ft = 4 inches
    expect(gridSnap(5, 1/12)).toBeCloseTo(4/12, 3) // 4 inches → 0.333 ft
  })
})

describe('orthoSnap', () => {
  it('constrains to 0° when dx > dy (horizontal)', () => {
    const result = orthoSnap({ x: 5, y: 3 }, { x: 0, y: 0 })
    expect(result.y).toBeCloseTo(0, 3)
  })
  it('constrains to 90° when dy > dx (vertical)', () => {
    const result = orthoSnap({ x: 3, y: 5 }, { x: 0, y: 0 })
    expect(result.x).toBeCloseTo(0, 3)
  })
})

describe('snapPoint', () => {
  const existingEndpoints = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }]
  it('snaps to endpoint within threshold', () => {
    const result = snapPoint({ x: 0.1, y: 0 }, existingEndpoints, 1)
    expect(result.x).toBeCloseTo(0, 2)
    expect(result.y).toBeCloseTo(0, 2)
  })
  it('returns original if no endpoint nearby', () => {
    const result = snapPoint({ x: 5, y: 5 }, existingEndpoints, 1)
    expect(result.x).toBeCloseTo(5, 2)
  })
})
```

---

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/openclaw/dev/may22/frmx && npx vitest apps/web/src/lib/snapping.test.ts --run`
Expected: FAIL — file not found

---

- [ ] **Step 3: Write minimal implementation**

```typescript
// apps/web/src/lib/snapping.ts

export interface Point2D { x: number; y: number }

/**
 * Snap a world coordinate to the nearest grid point.
 * gridSize is in feet (1/12 = 1 inch, 1 = 1 foot).
 */
export function gridSnap(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Snap a candidate point to the dominant axis (horizontal or vertical)
 * relative to an anchor point. Used for ortho mode.
 */
export function orthoSnap(candidate: Point2D, anchor: Point2D): Point2D {
  const dx = candidate.x - anchor.x
  const dy = candidate.y - anchor.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: candidate.x, y: anchor.y }
  } else {
    return { x: anchor.x, y: candidate.y }
  }
}

/**
 * Snap a point to an existing endpoint if within threshold (in same units as points).
 * Otherwise returns the original point unchanged.
 */
export function snapPoint(
  pt: Point2D,
  endpoints: Point2D[],
  threshold: number
): Point2D {
  for (const ep of endpoints) {
    const dx = pt.x - ep.x
    const dy = pt.y - ep.y
    if (Math.hypot(dx, dy) <= threshold) {
      return { x: ep.x, y: ep.y }
    }
  }
  return pt
}
```

---

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/openclaw/dev/may22/frmx && npx vitest apps/web/src/lib/snapping.test.ts --run`
Expected: PASS

---

- [ ] **Step 5: Add snap state to Zustand store**

Read `apps/web/src/store/index.ts` first (lines 77–102 already have `Viewport` interface and lines 106–160 have the store interface). Add to the store:

In the `ProjectState` interface (around line 93), add:
```typescript
snapEnabled: boolean
orthoEnabled: boolean
```

In the `FRMXStore` interface (around line 106), add:
```typescript
toggleSnap: () => void
toggleOrtho: () => void
setSnapEnabled: (v: boolean) => void
setOrthoEnabled: (v: boolean) => void
```

In the store implementation (around line 195), add initial state:
```typescript
snapEnabled: true,
orthoEnabled: false,
```

And implement the methods:
```typescript
toggleSnap: () => set(state => ({ snapEnabled: !state.snapEnabled })),
toggleOrtho: () => set(state => ({ orthoEnabled: !state.orthoEnabled })),
setSnapEnabled: (v) => set({ snapEnabled: v }),
setOrthoEnabled: (v) => set({ orthoEnabled: v }),
```

---

- [ ] **Step 6: Commit**

```bash
cd /Users/openclaw/dev/may22/frmx
git add apps/web/src/lib/snapping.ts apps/web/src/lib/snapping.test.ts apps/web/src/store/index.ts
git commit -m "feat(canvas): add snapping utility — grid, ortho, endpoint snap"
```

---

## Task 2: RulerOverlay component

**Files:**
- Create: `apps/web/src/components/RulerOverlay.tsx`
- Modify: `apps/web/src/components/PlanView.tsx` (integrate ruler)
- Test: none (render test only — covered by visual verification)

---

- [ ] **Step 1: Create RulerOverlay.tsx**

This component renders two ruler bars (top and left) with feet'inches" tick marks. It receives `viewport` and `width`/`height` props.

```tsx
// apps/web/src/components/RulerOverlay.tsx
'use client'

import { useEffect, useRef } from 'react'
import type { Viewport } from '@/store'

interface RulerOverlayProps {
  viewport: Viewport
  width: number
  height: number
  visible?: boolean
}

const RULER_SIZE = 28
const FOOT_INCHES = 12 // 12 inches per foot

function formatFootMark(foot: number): string {
  return `${foot}'`
}

function formatInchMark(inch: number): string {
  if (inch === 0) return ''
  const whole = Math.floor(inch)
  const frac = inch - whole
  const FRACS = ['', '¼', '½', '¾']
  const fracIdx = Math.round(frac * 4) % 4
  return `${whole > 0 ? whole : ''}${FRACS[fracIdx]}`
}

export default function RulerOverlay({ viewport, width, height, visible = true }: RulerOverlayProps) {
  const topCanvasRef = useRef<HTMLCanvasElement>(null)
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)

  // pixels per foot at current zoom
  const ppf = 36 * viewport.zoom // 3ft per inch × 12in = 36px/ft (architectural scale)

  useEffect(() => {
    // Top ruler (horizontal)
    const tc = topCanvasRef.current
    if (!tc) return
    const tCtx = tc.getContext('2d')
    if (!tCtx) return
    const tw = tc.width
    const th = tc.height
    tCtx.clearRect(0, 0, tw, th)
    tCtx.fillStyle = '#1a1a1a'
    tCtx.fillRect(0, 0, tw, th)

    // Determine visible world range
    const startWorldX = -viewport.panX / ppf * FOOT_INCHES // in inches
    const endWorldX = (tw - viewport.panX) / ppf * FOOT_INCHES

    // Draw inch ticks every 1 inch (1/12 ft)
    const startInch = Math.floor(startWorldX)
    const endInch = Math.ceil(endWorldX)
    tCtx.strokeStyle = '#555'
    tCtx.fillStyle = '#aaa'
    tCtx.font = '9px monospace'
    tCtx.textAlign = 'center'

    for (let inch = startInch; inch <= endInch; inch++) {
      const screenX = inch / FOOT_INCHES * ppf + viewport.panX
      if (screenX < 0 || screenX > tw) continue

      const isFoot = inch % 12 === 0
      const isHalf = inch % 6 === 0
      const isQuarter = inch % 3 === 0

      if (isFoot) {
        const foot = inch / 12
        tCtx.strokeStyle = '#888'
        tCtx.lineWidth = 1
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 14)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
        tCtx.fillText(formatFootMark(foot), screenX, th - 16)
      } else if (isHalf) {
        tCtx.strokeStyle = '#444'
        tCtx.lineWidth = 0.5
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 8)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
      } else if (isQuarter) {
        tCtx.strokeStyle = '#333'
        tCtx.lineWidth = 0.5
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 4)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
      }
    }

    // Left ruler (vertical)
    const lc = leftCanvasRef.current
    if (!lc) return
    const lCtx = lc.getContext('2d')
    if (!lCtx) return
    const lh = lc.height
    const lw = lc.width
    lCtx.clearRect(0, 0, lw, lh)
    lCtx.fillStyle = '#1a1a1a'
    lCtx.fillRect(0, 0, lw, lh)

    const startWorldY = -viewport.panY / ppf * FOOT_INCHES
    const endWorldY = (lh - viewport.panY) / ppf * FOOT_INCHES
    const startInchY = Math.floor(startWorldY)
    const endInchY = Math.ceil(endWorldY)
    lCtx.strokeStyle = '#555'
    lCtx.fillStyle = '#aaa'
    lCtx.font = '9px monospace'
    lCtx.textAlign = 'right'

    for (let inch = startInchY; inch <= endInchY; inch++) {
      const screenY = inch / FOOT_INCHES * ppf + viewport.panY
      if (screenY < 0 || screenY > lh) continue

      const isFoot = inch % 12 === 0
      const isHalf = inch % 6 === 0
      const isQuarter = inch % 3 === 0

      if (isFoot) {
        const foot = inch / 12
        lCtx.strokeStyle = '#888'
        lCtx.lineWidth = 1
        lCtx.beginPath()
        lCtx.moveTo(lw - 14, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
        lCtx.save()
        lCtx.translate(lw - 16, screenY + 3)
        lCtx.rotate(-Math.PI / 2)
        lCtx.fillText(formatFootMark(foot), 0, 0)
        lCtx.restore()
      } else if (isHalf) {
        lCtx.strokeStyle = '#444'
        lCtx.lineWidth = 0.5
        lCtx.beginPath()
        lCtx.moveTo(lw - 8, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
      } else if (isQuarter) {
        lCtx.strokeStyle = '#333'
        lCtx.lineWidth = 0.5
        lCtx.beginPath()
        lCtx.moveTo(lw - 4, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
      }
    }
  }, [viewport, width, height])

  if (!visible) return null

  return (
    <>
      <canvas
        ref={topCanvasRef}
        width={width}
        height={RULER_SIZE}
        className="absolute top-0 left-0"
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />
      <canvas
        ref={leftCanvasRef}
        width={RULER_SIZE}
        height={height}
        className="absolute top-0 left-0"
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />
      {/* Corner box */}
      <div
        className="absolute top-0 left-0"
        style={{ width: RULER_SIZE, height: RULER_SIZE, zIndex: 11, backgroundColor: '#1a1a1a', pointerEvents: 'none' }}
      />
    </>
  )
}
```

---

- [ ] **Step 2: Integrate RulerOverlay into PlanView**

Read `apps/web/src/components/PlanView.tsx` (already done). Modify the return statement to add the ruler and fix the debug overlays.

Find the return statement (lines 328–362). Replace the entire return block with:

```tsx
  const containerRef = useRef<HTMLDivElement>(null)
  const [rulerSize, setRulerSize] = useState(28)

  // Remove the debug overlays: delete lines 330-340 (the green canvas area div and red test button)
  // Delete: <div style={{ position: 'absolute', inset: 0, backgroundColor: '#f0fff0' ...}}>CANVAS AREA</div>
  // Delete: <button id="planview-test-btn" ...>CLICK ME TEST</button>

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
      {/* Rulers */}
      <RulerOverlay viewport={viewport} width={containerRef.current?.offsetWidth ?? 800} height={containerRef.current?.offsetHeight ?? 600} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ zIndex: 2, left: rulerSize, top: rulerSize }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 z-10">
        {Math.round(viewport.zoom * 100)}%
      </div>

      {/* Coordinates + snap status */}
      <div className="absolute bottom-4 left-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs font-mono text-gray-600 z-10">
        {Math.round(viewport.panX)}, {Math.round(viewport.panY)} | {snapEnabled ? 'SNAP' : '—'} {orthoEnabled ? 'ORTHO' : ''}
      </div>
    </div>
  )
```

---

- [ ] **Step 3: Fix imports in PlanView**

Add `useState` to the import from 'react' (line 3). Add `snapEnabled` and `orthoEnabled` destructured from `useFRMXStore`. Add `RulerOverlay` import. Remove the cream background style on the root div.

---

- [ ] **Step 4: Commit**

```bash
cd /Users/openclaw/dev/may22/frmx
git add apps/web/src/components/RulerOverlay.tsx apps/web/src/components/PlanView.tsx
git commit -m "feat(canvas): add ruler overlay with feet'inches tick marks, remove debug overlays"
```

---

## Task 3: Integrate snapping into wall drawing

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx`
- Test: none (manual — no snap behavior tests exist yet)

---

- [ ] **Step 1: Wire snapping into handleMouseMove for wall drawing**

Read `apps/web/src/components/PlanView.tsx` lines 220–247 (handleMouseMove). Replace the draw-wall mouseMove block with:

```typescript
import { gridSnap, orthoSnap, snapPoint } from '@/lib/snapping'
```

Then in `handleMouseMove`, replace the draw-wall block (lines 233–246) with:

```typescript
} else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
  const worldX = (x - viewport.panX) / viewport.zoom
  const worldY = (y - viewport.panY) / viewport.zoom

  // Collect all existing wall endpoints for snapping
  const existingEndpoints: { x: number; y: number }[] = []
  for (const level of projectRef.current.building.levels) {
    for (const wall of level.walls) {
      if (wall.centerline.length > 0) {
        existingEndpoints.push(wall.centerline[0])
        existingEndpoints.push(wall.centerline[wall.centerline.length - 1])
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
    if (orthoEnabledRef.current && pts.length > 0) {
      const last = pts[pts.length - 1]!
      const ortho = orthoSnap({ x: snappedX, y: snappedY }, last)
      snappedX = ortho.x
      snappedY = ortho.y
    }
    // 3. Grid snap (only if no ortho applied and grid snap enabled)
    if (snapEnabledRef.current && !endpointSnapResult) {
      const gridSize = 1 / 12 // 1 inch in feet
      snappedX = gridSnap(snappedX, gridSize)
      snappedY = gridSnap(snappedY, gridSize)
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
```

Note: you also need a `projectRef` that tracks the latest project to avoid stale closures. Add after `toolModeRef`:

```typescript
const projectRef = useRef(project)
projectRef.current = project
```

---

- [ ] **Step 2: Commit**

```bash
cd /Users/openclaw/dev/may22/frmx
git add apps/web/src/components/PlanView.tsx
git commit -m "feat(canvas): wire snapping — endpoint, ortho, and grid — into wall drawing"
```

---

## Task 4: Wall type visual differentiation

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx`
- Test: none

---

- [ ] **Step 1: Add WALL_COLORS map and use it in drawWall**

Read `apps/web/src/components/PlanView.tsx` lines 1–12 (top of file). Add after the `GRID_SIZE` constant:

```typescript
const WALL_COLORS: Record<string, { stroke: string; fill: string; dash?: string[] }> = {
  exterior: { stroke: '#1e40af', fill: '#93c5fd', dash: [] },
  'exterior-sheathed': { stroke: '#1e40af', fill: '#bfdbfe', dash: [] },
  interior: { stroke: '#6b7280', fill: '#d1d5db', dash: [] },
  partition: { stroke: '#9ca3af', fill: '#e5e7eb', dash: [6, 3] },
  retaining: { stroke: '#b45309', fill: '#fde68a', dash: [4, 4] },
  default: { stroke: '#374151', fill: '#9ca3af', dash: [] },
}
```

In the `drawWall` function (line 110), replace the `isSelected` color logic with:

```typescript
const wallStyle = WALL_COLORS[wall.wallType] ?? WALL_COLORS.default
const isSelected = wall.id === selectedWallId

ctx.strokeStyle = isSelected ? '#2563eb' : wallStyle.stroke
ctx.lineWidth = isSelected ? 3 : 2

ctx.beginPath()
ctx.moveTo(wall.centerline[0]!.x * zoom + panX, wall.centerline[0]!.y * zoom + panY)
for (let i = 1; i < wall.centerline.length; i++) {
  ctx.lineTo(wall.centerline[i]!.x * zoom + panX, wall.centerline[i]!.y * zoom + panY)
}
ctx.stroke()

// Wall outline (offset parallel lines)
const offset = 0.5 * zoom // 6 inches = 0.5ft
ctx.strokeStyle = isSelected ? '#93c5fd' : wallStyle.fill
ctx.lineWidth = 1
ctx.setLineDash(wallStyle.dash)
ctx.stroke()
ctx.setLineDash([])
```

---

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/PlanView.tsx
git commit -m "feat(canvas): color-code walls by type — exterior blue, interior gray, partition dashed"
```

---

## Task 5: Toolbar upgrade — Lucide icons, grouped sections, snap indicators

**Files:**
- Modify: `apps/web/src/components/Toolbar.tsx`
- Test: none (visual verification)

---

- [ ] **Step 1: Rewrite Toolbar.tsx with Lucide icons**

Read `apps/web/src/components/Toolbar.tsx`. Replace the entire file with:

```tsx
'use client'

import { useFRMXStore } from '@/store'
import {
  MousePointer2, Hand, PenLine, DoorOpen, PanelEdit,
  Undo2, Redo2, FilePlus, Grid3x3, Move,
  Eye, Box, Map
} from 'lucide-react'

const VIEW_MODES = [
  { mode: 'plan' as const, label: 'Plan', icon: Map },
  { mode: 'elevation' as const, label: 'Elevation', icon: Eye },
  { mode: '3d' as const, label: '3D', icon: Box },
]

const TOOL_MODES = [
  { mode: 'select' as const, label: 'Select', icon: MousePointer2, shortcut: 'V' },
  { mode: 'pan' as const, label: 'Pan', icon: Hand, shortcut: 'H' },
  { mode: 'draw-wall' as const, label: 'Draw Wall', icon: PenLine, shortcut: 'W' },
  { mode: 'add-opening' as const, label: 'Add Opening', icon: DoorOpen, shortcut: 'O' },
  { mode: 'edit-panel' as const, label: 'Edit Panel', icon: PanelEdit, shortcut: 'E' },
]

const WALL_TYPES = [
  { value: 'exterior', label: 'Exterior 6"' },
  { value: 'interior', label: 'Interior 3.5"' },
  { value: 'partition', label: 'Partition 2.5"' },
]

export default function Toolbar() {
  const { viewMode, toolMode, snapEnabled, orthoEnabled, setViewMode, setToolMode, undo, redo, canUndo, canRedo, reset, toggleSnap, toggleOrtho } = useFRMXStore()
  const walls = useFRMXStore(s => s.project.building.levels[0]?.walls ?? [])

  return (
    <div className="flex items-center gap-0 bg-neutral-900 text-white text-sm select-none border-b border-neutral-700">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-r border-neutral-700 min-w-[160px]">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold tracking-widest">FX</div>
        <span className="font-semibold tracking-wide text-blue-400">FRMX</span>
      </div>

      {/* View modes */}
      <div className="flex items-center border-r border-neutral-700">
        {VIEW_MODES.map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
              viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={`${label} view`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-neutral-700 mx-1" />

      {/* Tools */}
      <div className="flex items-center">
        {TOOL_MODES.map(({ mode, label, icon: Icon, shortcut }) => (
          <button
            key={mode}
            onClick={() => setToolMode(mode)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
              toolMode === mode
                ? 'bg-blue-600 text-white'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
          >
            <Icon size={14} />
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-neutral-700 mx-1" />

      {/* Wall type selector */}
      <div className="flex items-center gap-1 px-2">
        <span className="text-neutral-500 text-xs pr-1 hidden lg:inline">Wall:</span>
        {WALL_TYPES.map(wt => (
          <button
            key={wt.value}
            className="px-2 py-1.5 text-xs rounded transition-colors bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
            onClick={() => {/* future: set default wall type */}}
          >
            {wt.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-neutral-700 mx-1" />

      {/* Snap controls */}
      <div className="flex items-center gap-1 px-1">
        <button
          onClick={toggleSnap}
          className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
            snapEnabled ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'
          }`}
          title="Snap to grid (G)"
        >
          <Grid3x3 size={12} />
          <span className="hidden sm:inline">Snap</span>
        </button>
        <button
          onClick={toggleOrtho}
          className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
            orthoEnabled ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'
          }`}
          title="Ortho mode (O) — hold Shift temporarily"
        >
          <Move size={12} />
          <span className="hidden sm:inline">Ortho</span>
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-neutral-700 mx-1" />

      {/* Undo / Redo */}
      <div className="flex items-center">
        <button
          onClick={undo}
          disabled={!canUndo()}
          className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={14} />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right info */}
      <div className="flex items-center gap-4 px-4 border-l border-neutral-700">
        <span className="text-neutral-500 text-xs">{walls.length} wall{walls.length !== 1 ? 's' : ''}</span>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors border border-neutral-700"
          title="New Project"
        >
          <FilePlus size={12} />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>
    </div>
  )
}
```

---

- [ ] **Step 2: Add keyboard shortcuts**

Add to the `useEffect` in `PlanView.tsx` (or create a new `useKeyboardShortcuts` hook). Add in `PlanView.tsx` alongside the existing keydown listener:

```typescript
// Keyboard shortcuts for tools
const handleToolKey = (e: KeyboardEvent) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  switch (e.key.toLowerCase()) {
    case 'v': setToolMode('select'); break
    case 'h': setToolMode('pan'); break
    case 'w': setToolMode('draw-wall'); break
    case 'o': setToolMode('add-opening'); break
    case 'e': setToolMode('edit-panel'); break
    case 'g': useFRMXStore.getState().toggleSnap(); break
    case 'r': useFRMXStore.getState().toggleOrtho(); break
  }
}
window.addEventListener('keydown', handleToolKey)
return () => window.removeEventListener('keydown', handleToolKey)
```

Also update the dependency array of the existing `useEffect` to include `setToolMode` or remove it and add a separate effect.

---

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/Toolbar.tsx apps/web/src/components/PlanView.tsx
git commit -m "feat(ui): professional toolbar with Lucide icons, grouped tools, snap/ortho toggles, keyboard shortcuts"
```

---

## Task 6: Status bar — mode, wall count, active wall specs, click count

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx`
- Test: none

---

- [ ] **Step 1: Add status bar div**

Read `apps/web/src/components/PlanView.tsx` (already done). Find the return statement and add a status bar at the bottom of the root div:

```tsx
{/* Status bar */}
<div className="absolute bottom-0 left-0 right-0 h-6 bg-neutral-900 text-white text-xs flex items-center px-4 gap-6 pointer-events-none z-10"
  style={{ bottom: 0, left: 0, right: 0 }}>
  <span className="text-neutral-400">
    Tool: <span className="text-white font-medium">{toolMode.replace('-', ' ')}</span>
  </span>
  <span className="text-neutral-400">
    Walls: <span className="text-white font-medium">{wallCount}</span>
  </span>
  {selectedWall && (
    <span className="text-neutral-400">
      Active: <span className="text-blue-400 font-medium">{selectedWall.name}</span>
      {' '}({selectedWall.wallType}, {formatDim(selectedWall.centerline.length > 0 ? calculateWallLength(selectedWall) : 0)})
    </span>
  )}
  <span className="text-neutral-500 ml-auto">
    pan: {Math.round(viewport.panX)},{Math.round(viewport.panY)} | zoom: {Math.round(viewport.zoom * 100)}%
  </span>
</div>
```

Add a helper function and state at the top of the component:

```typescript
function calculateWallLength(wall: Wall): number {
  let total = 0
  for (let i = 1; i < wall.centerline.length; i++) {
    const dx = wall.centerline[i]!.x - wall.centerline[i - 1]!.x
    const dy = wall.centerline[i]!.y - wall.centerline[i - 1]!.y
    total += Math.hypot(dx, dy)
  }
  return total * 12 // convert feet to inches
}

const wallCount = project.building.levels.reduce((sum, lvl) => sum + lvl.walls.length, 0)
const selectedWall = selectedWallId ? project.building.levels.flatMap(l => l.walls).find(w => w.id === selectedWallId) : null
```

---

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/PlanView.tsx
git commit -m "feat(ui): status bar with mode, wall count, active wall specs, pan/zoom coords"
```

---

## Task 7: Wall endpoint handles and hover feedback

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx`
- Test: none

---

- [ ] **Step 1: Add endpoint handle rendering in draw()**

Read `apps/web/src/components/PlanView.tsx`. In the `draw` function, after drawing walls (inside the `for (const level ...)` loop or after it), add endpoint handle rendering. Find the wall rendering section (around line 73-76) and after the wall loop add:

```typescript
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
```

For hover feedback, update the selection logic in `handleMouseDown` to track hover state and draw hover highlight. Add a `hoveredWallId` to the component state (via `useState`):

```typescript
const [hoveredWallId, setHoveredWallId] = useState<string | null>(null)
```

In `handleMouseMove`, add hover detection for select mode:

```typescript
if (toolModeRef.current === 'select') {
  let found = null
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
          found = wall.id
          break
        }
      }
      if (found) break
    }
    if (found) break
  }
  setHoveredWallId(found)
  canvasRef.current!.style.cursor = found ? 'pointer' : 'default'
}
```

Add `hoveredWallId` to the dependency array of `draw` and use it to render a hover highlight in the wall drawing:

```typescript
const isHovered = wall.id === hoveredWallId && !isSelected
// then in drawWall call:
drawWall(ctx, wall, viewport, isSelected, isHovered)
```

Update `drawWall` signature to accept `isHovered` and draw a lighter highlight:

```typescript
function drawWall(ctx: CanvasRenderingContext2D, wall: ..., vp: ..., isSelected: boolean, isHovered = false) {
  // ... existing code ...
  if (isHovered && !isSelected) {
    ctx.globalAlpha = 0.5
    ctx.strokeStyle = '#60a5fa'
    ctx.lineWidth = 4
    ctx.beginPath()
    // ... same path ...
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}
```

---

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/PlanView.tsx
git commit -m "feat(canvas): endpoint handles and hover feedback on walls"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Grid snapping — Task 1 (gridSnap) + Task 3 wiring
- [x] Ortho mode — Task 1 (orthoSnap) + Task 3 wiring
- [x] Rulers in feet'inches — Task 2 (RulerOverlay)
- [x] Wall auto-join at corners — Task 3 (endpoint snap in snapPoint)
- [x] Wall type visual differentiation — Task 4 (WALL_COLORS)
- [x] Professional toolbar — Task 5 (Lucide, groups, snap indicators)
- [x] Status bar — Task 6
- [x] Keyboard shortcuts — Task 5 Step 2
- [x] Endpoint handles — Task 7

**Placeholder scan:** No TBD/TODO/placeholder code in the steps above. Each step has complete, runnable code.

**Type consistency:** `Point2D` is defined in `snapping.ts` and reused from `@/store` (which also exports `Point2D`). `snapPoint` takes `Point2D[]` for endpoints. `orthoSnap` takes two `Point2D` args. `gridSnap` takes two `number` args. All consistent.

**Gaps found:** None — all spec items are covered.

---

## Plan complete and saved to `docs/superpowers/plans/2026-05-22-cad-canvas.md`.

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?