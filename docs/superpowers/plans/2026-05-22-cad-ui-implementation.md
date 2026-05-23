# CAD-like UI Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the top toolbar with floating draggable panels (Tools, View, Settings, History), floating HUD chips, and a shortcut legend. Make elevation view fully interactive.

**Architecture:** Single-page app shell. Floating panels are positioned absolutely in viewport coordinates. HUD chips are fixed to viewport edges. Keyboard shortcuts handled globally. Zustand store holds panel visibility state.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Zustand, Canvas 2D

---

## Phase 1 — Floating Panels + HUD

### Task 1: Add CSS variables and global styles

**Files:**
- Modify: `apps/web/src/app/globals.css:1-12`

- [ ] **Step 1: Add CSS variables**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #000000;

  /* Panel colors */
  --panel-bg: #0d0d0d;
  --panel-cyan: #00d4ff;
  --panel-pink: #ff6b9d;
  --panel-yellow: #ffd93d;
  --panel-magenta: #c77dff;

  /* HUD chip base */
  --chip-bg: rgba(0, 212, 255, 0.15);
  --chip-border: rgba(0, 212, 255, 0.5);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}

/* Panel base */
.floating-panel {
  position: absolute;
  background: var(--panel-bg);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  user-select: none;
  z-index: 100;
}

.floating-panel.dragging {
  opacity: 0.9;
  cursor: grabbing;
}

.floating-panel .title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid;
  cursor: grab;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.floating-panel .title-bar:active {
  cursor: grabbing;
}

.floating-panel .panel-body {
  padding: 8px;
}

.floating-panel .close-btn {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 12px;
  opacity: 0.6;
  cursor: pointer;
}

.floating-panel .close-btn:hover {
  opacity: 1;
  background: rgba(255,255,255,0.1);
}

/* HUD chips */
.hud-chip {
  position: fixed;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  pointer-events: none;
  z-index: 200;
  border: 1px solid;
}

.hud-chip.tool {
  top: 12px;
  left: 12px;
  color: var(--panel-cyan);
  border-color: rgba(0, 212, 255, 0.5);
  background: rgba(0, 212, 255, 0.15);
}

.hud-chip.snap {
  top: 12px;
  right: 12px;
  color: var(--panel-pink);
  border-color: rgba(255, 107, 157, 0.5);
  background: rgba(255, 107, 157, 0.15);
}

.hud-chip.dimension {
  bottom: 12px;
  left: 12px;
  color: var(--panel-yellow);
  border-color: rgba(255, 217, 61, 0.5);
  background: rgba(255, 217, 61, 0.15);
}

.hud-chip.coords {
  bottom: 12px;
  right: 12px;
  color: var(--panel-magenta);
  border-color: rgba(199, 125, 255, 0.5);
  background: rgba(199, 125, 255, 0.15);
}

/* Tool button */
.tool-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
  border: 1px solid transparent;
  color: rgba(255,255,255,0.6);
}

.tool-btn:hover {
  background: rgba(255,255,255,0.08);
  color: white;
}

.tool-btn.active {
  color: var(--panel-cyan);
  border-color: rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.1);
}

.tool-btn .shortcut {
  font-size: 10px;
  opacity: 0.5;
  margin-left: auto;
}

/* Shortcut legend overlay */
.shortcut-legend {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
}

.shortcut-legend .legend-panel {
  background: var(--panel-bg);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 20px 24px;
  min-width: 380px;
  max-width: 480px;
}

.shortcut-legend .legend-panel h2 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.shortcut-legend .shortcut-group {
  margin-bottom: 14px;
}

.shortcut-legend .shortcut-group h3 {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.4);
  margin-bottom: 6px;
}

.shortcut-legend .shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  font-size: 12px;
}

.shortcut-legend .shortcut-row .keys {
  font-family: monospace;
  font-size: 11px;
  padding: 2px 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  color: rgba(255,255,255,0.7);
}

.shortcut-legend .shortcut-row .desc {
  color: rgba(255,255,255,0.6);
}
```

- [ ] **Step 2: Run build to verify no errors**

Run: `cd apps/web && npx turbo build 2>&1 | head -40`
Expected: build completes without errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "feat(ui): add CSS variables and panel/chip base styles"
```

---

### Task 2: Add panel visibility to Zustand store

**Files:**
- Modify: `apps/web/src/store/index.ts:108-172`

- [ ] **Step 1: Add panel visibility state**

After line 127 (after `orthoEnabled: boolean`), add:

```typescript
  // Panel visibility
  panelsVisible: {
    tools: boolean
    view: boolean
    settings: boolean
    history: boolean
  }

  // HUD visibility
  showShortcutLegend: boolean

  // Space-to-pan
  previousToolMode: ToolMode | null
```

After line 171 (before the closing of the interface), add:

```typescript
  // Panel visibility
  setPanelVisible: (panel: keyof FRMXStore['panelsVisible'], v: boolean) => void
  togglePanelVisible: (panel: keyof FRMXStore['panelsVisible']) => void

  // Shortcut legend
  setShowShortcutLegend: (v: boolean) => void

  // Space-to-pan
  setPreviousToolMode: (mode: ToolMode | null) => void
```

In the store implementation (after `orthoEnabled: false,`), add:

```typescript
  panelsVisible: {
    tools: true,
    view: true,
    settings: false,
    history: false,
  },

  showShortcutLegend: false,
  previousToolMode: null,
```

After `setOrthoEnabled: (v) => set({ orthoEnabled: v }),` add:

```typescript
  setPanelVisible: (panel, v) => set(state => ({
    panelsVisible: { ...state.panelsVisible, [panel]: v }
  })),
  togglePanelVisible: (panel) => set(state => ({
    panelsVisible: { ...state.panelsVisible, [panel]: !state.panelsVisible[panel] }
  })),
  setShowShortcutLegend: (v) => set({ showShortcutLegend: v }),
  setPreviousToolMode: (mode) => set({ previousToolMode: mode }),
```

- [ ] **Step 2: Run build to verify**

Run: `cd apps/web && npx turbo build 2>&1 | tail -20`
Expected: no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/store/index.ts
git commit -m "feat(store): add panel visibility and shortcut legend state"
```

---

### Task 3: Create FloatingPanel shell component

**Files:**
- Create: `apps/web/src/components/ui/FloatingPanel.tsx`

- [ ] **Step 1: Write FloatingPanel component**

```tsx
'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'

interface FloatingPanelProps {
  title: string
  accentColor: string
  defaultX?: number
  defaultY?: number
  width?: number
  children: ReactNode
  onClose?: () => void
}

export default function FloatingPanel({
  title,
  accentColor,
  defaultX = 20,
  defaultY = 80,
  width = 180,
  children,
  onClose,
}: FloatingPanelProps) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.close-btn')) return
    e.preventDefault()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    }
    const onMouseMove = (me: MouseEvent) => {
      if (!dragRef.current) return
      const dx = me.clientX - dragRef.current.startX
      const dy = me.clientY - dragRef.current.startY
      setPos({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
      })
    }
    const onMouseUp = () => {
      setIsDragging(false)
      dragRef.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [pos])

  return (
    <div
      className={`floating-panel ${isDragging ? 'dragging' : ''}`}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        border: `1px solid ${accentColor}`,
        zIndex: isDragging ? 150 : 100,
      }}
    >
      <div
        className="title-bar"
        style={{ borderColor: `${accentColor}40`, color: accentColor }}
        onMouseDown={onMouseDown}
      >
        <span>{title}</span>
        {onClose && (
          <div
            className="close-btn"
            onClick={onClose}
            style={{ color: accentColor }}
          >
            ×
          </div>
        )}
      </div>
      <div className="panel-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify component renders**

Run: `cd apps/web && npx tsc --noEmit 2>&1 | grep -i "floatingpanel" || echo "no errors"`
Expected: "no errors"

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ui/FloatingPanel.tsx
git commit -m "feat(ui): add FloatingPanel draggable shell component"
```

---

### Task 4: Create HUD chips component

**Files:**
- Create: `apps/web/src/components/ui/HUDChips.tsx`

- [ ] **Step 1: Write HUDChips component**

```tsx
'use client'

import { useFRMXStore } from '@/store'

export default function HUDChips() {
  const toolMode = useFRMXStore(s => s.toolMode)
  const snapEnabled = useFRMXStore(s => s.snapEnabled)
  const orthoEnabled = useFRMXStore(s => s.orthoEnabled)

  // Dimension chip — shown during draw-wall with at least 2 points
  // Coordinate chip — always visible when mouse is over canvas
  // These are passed as props or via a shared ref; for now show minimal
  return (
    <>
      {/* Tool chip — always visible */}
      <div className="hud-chip tool">
        {toolMode.replace('-', ' ')}
      </div>

      {/* Snap/ortho chip — shown when snap or ortho is on */}
      {(snapEnabled || orthoEnabled) && (
        <div className="hud-chip snap">
          {[snapEnabled ? 'SNAP' : '', orthoEnabled ? 'ORTHO' : ''].filter(Boolean).join(' ')}
        </div>
      )}
    </>
  )
}
```

**Note:** The dimension chip and coordinate chip require canvas mouse position. For now, the basic HUDChips shows tool name and snap state. These will be enhanced in later tasks.

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/HUDChips.tsx
git commit -m "feat(ui): add HUD chips component"
```

---

### Task 5: Create ToolsPanel

**Files:**
- Create: `apps/web/src/components/ui/ToolsPanel.tsx`

- [ ] **Step 1: Write ToolsPanel component**

```tsx
'use client'

import { useFRMXStore } from '@/store'
import {
  MousePointer2, Hand, PenLine, DoorOpen, PanelTop,
} from 'lucide-react'

const TOOLS = [
  { mode: 'select' as const, label: 'Select', icon: MousePointer2, shortcut: 'V' },
  { mode: 'pan' as const, label: 'Pan', icon: Hand, shortcut: 'H' },
  { mode: 'draw-wall' as const, label: 'Draw Wall', icon: PenLine, shortcut: 'W' },
  { mode: 'add-opening' as const, label: 'Add Opening', icon: DoorOpen, shortcut: 'O' },
  { mode: 'edit-panel' as const, label: 'Edit Panel', icon: PanelTop, shortcut: 'E' },
]

export default function ToolsPanel() {
  const toolMode = useFRMXStore(s => s.toolMode)
  const setToolMode = useFRMXStore(s => s.setToolMode)
  const togglePanelVisible = useFRMXStore(s => s.togglePanelVisible)
  const setShowShortcutLegend = useFRMXStore(s => s.setShowShortcutLegend)

  return (
    <div className="flex flex-col gap-1">
      {TOOLS.map(({ mode, label, icon: Icon, shortcut }) => (
        <button
          key={mode}
          onClick={() => setToolMode(mode)}
          className={`tool-btn ${toolMode === mode ? 'active' : ''}`}
        >
          <Icon size={14} />
          <span>{label}</span>
          <span className="shortcut">{shortcut}</span>
        </button>
      ))}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

      {/* Settings toggle */}
      <button
        onClick={() => togglePanelVisible('settings')}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.6 }}
      >
        <span style={{ fontSize: '10px' }}>⚙</span>
        <span>Settings</span>
      </button>

      {/* History toggle */}
      <button
        onClick={() => togglePanelVisible('history')}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.6 }}
      >
        <span style={{ fontSize: '10px' }}>↺</span>
        <span>History</span>
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

      {/* ? shortcut legend */}
      <button
        onClick={() => setShowShortcutLegend(true)}
        className="tool-btn"
        style={{ fontSize: '11px', opacity: 0.5, justifyContent: 'center' }}
      >
        ?
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/ToolsPanel.tsx
git commit -m "feat(ui): add ToolsPanel with shortcut labels on buttons"
```

---

### Task 6: Create ViewPanel

**Files:**
- Create: `apps/web/src/components/ui/ViewPanel.tsx`

- [ ] **Step 1: Write ViewPanel component**

```tsx
'use client'

import { useFRMXStore } from '@/store'
import { Map, Eye, Box } from 'lucide-react'

const VIEWS = [
  { mode: 'plan' as const, label: 'Plan', icon: Map, key: '1' },
  { mode: 'elevation' as const, label: 'Elevation', icon: Eye, key: '2' },
  { mode: '3d' as const, label: '3D', icon: Box, key: '3' },
]

export default function ViewPanel() {
  const viewMode = useFRMXStore(s => s.viewMode)
  const setViewMode = useFRMXStore(s => s.setViewMode)

  return (
    <div className="flex flex-col gap-1">
      {VIEWS.map(({ mode, label, icon: Icon, key }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`tool-btn ${viewMode === mode ? 'active' : ''}`}
        >
          <Icon size={14} />
          <span>{label}</span>
          <span className="shortcut" style={{ opacity: 0.35 }}>{key}</span>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/ViewPanel.tsx
git commit -m "feat(ui): add ViewPanel with view mode toggle"
```

---

### Task 7: Create SettingsPanel

**Files:**
- Create: `apps/web/src/components/ui/SettingsPanel.tsx`

- [ ] **Step 1: Write SettingsPanel component**

```tsx
'use client'

import { useFRMXStore } from '@/store'
import { Grid3x3, Move, LayoutGrid } from 'lucide-react'

export default function SettingsPanel() {
  const snapEnabled = useFRMXStore(s => s.snapEnabled)
  const orthoEnabled = useFRMXStore(s => s.orthoEnabled)
  const toggleSnap = useFRMXStore(s => s.toggleSnap)
  const toggleOrtho = useFRMXStore(s => s.toggleOrtho)

  return (
    <div className="flex flex-col gap-2">
      {/* Snap toggle */}
      <button
        onClick={toggleSnap}
        className={`tool-btn ${snapEnabled ? 'active' : ''}`}
        style={{ '--active-color': 'var(--panel-pink)' } as React.CSSProperties}
      >
        <Grid3x3 size={13} />
        <span>Snap</span>
        <span className="shortcut">G</span>
      </button>

      {/* Ortho toggle */}
      <button
        onClick={toggleOrtho}
        className={`tool-btn ${orthoEnabled ? 'active' : ''}`}
      >
        <Move size={13} />
        <span>Ortho</span>
        <span className="shortcut">R</span>
      </button>

      {/* Grid toggle (placeholder) */}
      <button
        className="tool-btn"
        style={{ opacity: 0.5 }}
        onClick={() => {}}
      >
        <LayoutGrid size={13} />
        <span>Grid</span>
        <span className="shortcut" style={{ opacity: 0.35 }}>-</span>
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/SettingsPanel.tsx
git commit -m "feat(ui): add SettingsPanel with snap/ortho toggles"
```

---

### Task 8: Create HistoryPanel

**Files:**
- Create: `apps/web/src/components/ui/HistoryPanel.tsx`

- [ ] **Step 1: Write HistoryPanel component**

```tsx
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
  const setProject = useFRMXStore(s => s.setProject)

  const handleRestore = (index: number) => {
    // Restore to this history entry's inverse (the state before this action)
    if (index < 0) return
    const entry = history[index]
    if (!entry) return
    // Going back to historyIndex means we restore the inverse state
    // The current implementation: undo moves historyIndex back and sets project to entry.inverse
    // To jump to a specific history entry, we undo until we reach it
    if (index === historyIndex) return
    // If jumping back: undo until historyIndex === index
    while (historyIndex > index) {
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/HistoryPanel.tsx
git commit -m "feat(ui): add HistoryPanel with undo/redo and clickable history"
```

---

### Task 9: Create ShortcutLegend overlay component

**Files:**
- Create: `apps/web/src/components/ui/ShortcutLegend.tsx`

- [ ] **Step 1: Write ShortcutLegend component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/ui/ShortcutLegend.tsx
git commit -m "feat(ui): add shortcut legend overlay with Escape to dismiss"
```

---

### Task 10: Wire floating panels into page.tsx, remove Toolbar and Editor info bar

**Files:**
- Modify: `apps/web/src/app/page.tsx:1-11`
- Modify: `apps/web/src/components/Editor.tsx:33-43` (remove info bar)
- Modify: `apps/web/src/components/Editor.tsx:46-47` (remove PropertiesPanel)

- [ ] **Step 1: Simplify page.tsx — no more Toolbar**

```tsx
import Editor from '@/components/Editor'

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden bg-[#0d0d0d]">
      <Editor />
    </main>
  )
}
```

- [ ] **Step 2: Remove Toolbar import and usage from page.tsx**

Replace the content above with the simplified version (already shown in Step 1).

- [ ] **Step 3: Remove info bar from Editor.tsx**

Remove lines 33-43 (the info bar div). Remove `PropertiesPanel` import and usage (line 7 and line 47).

After changes, Editor.tsx should look like:

```tsx
'use client'

import { useFRMXStore } from '@/store'
import PlanView from './PlanView'
import ElevationView from './ElevationView'
import ThreeDView from './ThreeDView'
import FloatingPanel from './ui/FloatingPanel'
import ToolsPanel from './ui/ToolsPanel'
import ViewPanel from './ui/ViewPanel'
import SettingsPanel from './ui/SettingsPanel'
import HistoryPanel from './ui/HistoryPanel'
import HUDChips from './ui/HUDChips'
import ShortcutLegend from './ui/ShortcutLegend'

export default function Editor() {
  const { viewMode, panelsVisible } = useFRMXStore()
  const togglePanelVisible = useFRMXStore(s => s.togglePanelVisible)

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      {/* Main view area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 relative">
          <div className="flex-1 relative">
            {viewMode === 'plan' && <PlanView />}
            {viewMode === 'elevation' && <ElevationView />}
            {viewMode === '3d' && <ThreeDView />}
          </div>
        </div>
      </div>

      {/* Floating Panels */}
      {panelsVisible.tools && (
        <FloatingPanel
          title="TOOLS"
          accentColor="var(--panel-cyan)"
          defaultX={16}
          defaultY={80}
          width={170}
          onClose={() => togglePanelVisible('tools')}
        >
          <ToolsPanel />
        </FloatingPanel>
      )}

      {panelsVisible.view && (
        <FloatingPanel
          title="VIEW"
          accentColor="var(--panel-pink)"
          defaultX={16}
          defaultY={300}
          width={160}
          onClose={() => togglePanelVisible('view')}
        >
          <ViewPanel />
        </FloatingPanel>
      )}

      {panelsVisible.settings && (
        <FloatingPanel
          title="SETTINGS"
          accentColor="var(--panel-yellow)"
          defaultX={200}
          defaultY={80}
          width={170}
          onClose={() => togglePanelVisible('settings')}
        >
          <SettingsPanel />
        </FloatingPanel>
      )}

      {panelsVisible.history && (
        <FloatingPanel
          title="HISTORY"
          accentColor="var(--panel-magenta)"
          defaultX={200}
          defaultY={300}
          width={200}
          onClose={() => togglePanelVisible('history')}
        >
          <HistoryPanel />
        </FloatingPanel>
      )}

      {/* HUD chips */}
      <HUDChips />

      {/* Shortcut legend overlay */}
      <ShortcutLegend />
    </div>
  )
}
```

- [ ] **Step 4: Remove status bar from PlanView.tsx**

Remove the coordinate display div (lines ~494-496) and the status bar div (lines ~499-515). Keep the zoom indicator.

Remove:
- The `pan: X, Y | SNAP | ORTHO` coordinate display div
- The bottom status bar (`h-6 bg-neutral-900...`)

The `zoom` indicator bottom-right can stay (it's useful).

- [ ] **Step 5: Build and verify**

Run: `cd apps/web && pnpm build 2>&1 | tail -30`
Expected: build succeeds

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/app/page.tsx apps/web/src/components/Editor.tsx apps/web/src/components/PlanView.tsx
git commit -m "feat(ui): wire floating panels into Editor, remove Toolbar and status bars"
```

---

### Task 11: Add Escape, Delete, and Space-to-pan keyboard handlers

**Files:**
- Modify: `apps/web/src/app/page.tsx` — add keyboard handlers

- [ ] **Step 1: Add global keyboard handler to Editor**

Add a `useEffect` in `Editor.tsx` that registers the following global handlers:

```tsx
import { useEffect } from 'react'

// Global keyboard handlers
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const store = useFRMXStore.getState()

    // Escape — cancel draw or deselect
    if (e.key === 'Escape') {
      if (store.showShortcutLegend) {
        store.setShowShortcutLegend(false)
        return
      }
      if (store.toolMode === 'draw-wall') {
        store.setToolMode('select')
        return
      }
      store.selectWall(null)
      store.selectPanel(null)
    }

    // Delete — delete selected wall
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (store.selectedWallId) {
        store.removeWall(store.selectedWallId)
        store.selectWall(null)
      }
    }

    // Space-to-pan
    if (e.key === ' ' && !e.repeat) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      store.setPreviousToolMode(store.toolMode)
      store.setToolMode('pan')
    }

    // ? shortcut legend
    if (e.key === '?') {
      store.setShowShortcutLegend(true)
    }

    // 1/2/3 view switching
    if (e.key === '1') { store.setViewMode('plan'); return }
    if (e.key === '2') { store.setViewMode('elevation'); return }
    if (e.key === '3') { store.setViewMode('3d'); return }

    // Tool shortcuts (V/H/W/O/E/G/R)
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    switch (e.key.toLowerCase()) {
      case 'v': store.setToolMode('select'); break
      case 'h': store.setToolMode('pan'); break
      case 'w': store.setToolMode('draw-wall'); break
      case 'o': store.setToolMode('add-opening'); break
      case 'e': store.setToolMode('edit-panel'); break
      case 'g': store.toggleSnap(); break
      case 'r': store.toggleOrtho(); break
    }

    // Ctrl+Z / Ctrl+Y
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      store.undo()
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault()
      store.redo()
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    // Space released — return to previous tool
    if (e.key === ' ') {
      const store = useFRMXStore.getState()
      if (store.toolMode === 'pan' && store.previousToolMode !== null) {
        store.setToolMode(store.previousToolMode)
        store.setPreviousToolMode(null)
      }
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }
}, [])
```

Add `useEffect` import at the top of Editor.tsx if not already there.

- [ ] **Step 2: Build and verify**

Run: `cd apps/web && pnpm build 2>&1 | tail -20`
Expected: build succeeds

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/Editor.tsx
git commit -m "feat(ui): add global keyboard handlers for Escape, Delete, Space-to-pan, 1/2/3"
```

---

### Task 12: Add Shift-to-lock-ortho during draw-wall

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx` — add Shift key state during draw

- [ ] **Step 1: Add shiftHeldRef to PlanView and apply during draw**

Add a ref near line 32:
```tsx
const shiftHeldRef = useRef(false)
```

Add a key listener in `useEffect` (around line 436):
```tsx
const handleShiftKey = (e: KeyboardEvent) => {
  shiftHeldRef.current = e.key === 'Shift'
}
window.addEventListener('keydown', handleShiftKey)
window.addEventListener('keyup', handleShiftKey)
```

In `handleMouseMove` (around line 318), when in draw-wall mode, after the ortho snap block, add:
```tsx
// Apply shift lock to ortho if shift is held
if (shiftHeldRef.current && orthoEnabledRef.current) {
  const last = drawingPointsRef.current[drawingPointsRef.current.length - 1]
  if (last) {
    const ortho = orthoSnap({ x: snappedX, y: snappedY }, last)
    snappedX = ortho.x
    snappedY = ortho.y
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/src/components/PlanView.tsx
git commit -m "feat(ui): add Shift-to-lock-ortho during draw-wall"
```

---

## Phase 2 — Interactive Elevation View

### Task 13: Make elevation view fully interactive + drag selection semantics

**Files:**
- Modify: `apps/web/src/components/ElevationView.tsx`
- Modify: `apps/web/src/components/PlanView.tsx`

**Drag selection rule (CAD-style):**
- **Left-to-right drag** (window): select objects whose bounds are entirely inside the selection box
- **Right-to-left drag** (crossing): select any object that the selection box touches or contains

For elevation view, this applies to panel drag — dragging left-to-right on empty space creates a selection box. Panel drag (click and move) is separate from box selection.

Add state for box selection: `boxSelectRef = useRef<{ startX: number; startY: number; mode: 'window' | 'crossing' } | null>(null)`

- [ ] **Step 1: Add panel selection and drag to ElevationView**

Add state for dragging:
```tsx
const draggingPanelRef = useRef<{ panelId: string; startX: number; origPosition: number } | null>(null)
```

Update `handleMouseDown` to add hit testing for panels:

```tsx
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
    // Hit test panels along the wall
    for (const panel of selectedWall.panels) {
      const panelLeft = panel.position
      const panelRight = panel.position + panel.width
      const wallCenterX = selectedWall.centerline[0]?.x ?? 0
      // Elevation view: horizontal panel layout
      // panel position is measured along the wall centerline in feet
      // For elevation, we display panels horizontally
      const canvasX = (panel.position * zoom) + 100 // left offset
      const panelW = panel.width * zoom
      if (worldX >= canvasX && worldX <= canvasX + panelW) {
        selectPanel(panel.id)
        // Start drag
        draggingPanelRef.current = {
          panelId: panel.id,
          startX: e.clientX,
          origPosition: panel.position,
        }
        return
      }
    }
    selectPanel(null)
  }
}, [toolMode, selectedWall])
```

Update `handleMouseMove` to support panel dragging:

```tsx
const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
  if (isPanningRef.current) {
    const dx = e.clientX - lastPosRef.current.x
    const dy = e.clientY - lastPosRef.current.y
    lastPosRef.current = { x: e.clientX, y: e.clientY }
    setViewport({ panX: viewport.panX + dx, panY: viewport.panY + dy })
    return
  }

  if (draggingPanelRef.current && selectedWall) {
    const dx = e.clientX - draggingPanelRef.current.startX
    const movementFeet = dx / viewport.zoom
    const newPosition = Math.max(0, draggingPanelRef.current.origPosition + movementFeet)
    // Update panel position live (no history push until mouse up)
    // For now, just update visually — we need to push to store on mouseUp
  }
}, [viewport, setViewport, selectedWall])
```

Update `handleMouseUp` to commit the panel move to the store:

```tsx
const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
  isPanningRef.current = false
  if (draggingPanelRef.current && selectedWall && selectedWallId) {
    const dx = e.clientX - draggingPanelRef.current.startX
    const movementFeet = dx / viewport.zoom
    const newPosition = Math.max(0, draggingPanelRef.current.origPosition + movementFeet)
    if (Math.abs(movementFeet) > 0.01) {
      // Commit to store
      const store = useFRMXStore.getState()
      store.updatePanel(selectedWallId, draggingPanelRef.current.panelId, {
        position: newPosition,
      })
    }
    draggingPanelRef.current = null
  }
}, [selectedWall, selectedWallId, viewport.zoom])
```

- [ ] **Step 2: Draw selection highlight with state-based color**

In the `drawElevation` function, change the selected panel highlight from blue to yellow (`#ffd93d`):

```tsx
// In drawElevation, update panel selection rendering:
const isSelected = panel.id === selectedPanelId
ctx.fillStyle = isSelected ? 'rgba(255,217,61,0.15)' : 'rgba(200,200,200,0.1)'
// ...
ctx.strokeStyle = isSelected ? '#ffd93d' : '#999'
ctx.lineWidth = isSelected ? 2 : 1
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ElevationView.tsx
git commit -m "feat(elevation): make elevation view fully interactive with panel selection and drag"
```

---

## Phase 3 — Polish and Integration

### Task 14: Enhance HUD chips with live dimension and coordinates

**Files:**
- Modify: `apps/web/src/components/ui/HUDChips.tsx`
- Modify: `apps/web/src/components/PlanView.tsx` — pass cursor position via store or context

- [ ] **Step 1: Add cursor position to store**

In `store/index.ts`, add `cursorWorldPos: { x: number; y: number } | null` to `ProjectState`. Add `setCursorWorldPos` action. Update cursor pos in PlanView's `handleMouseMove`.

- [ ] **Step 2: Update HUDChips to show dimension during draw and coordinates on hover**

- [ ] **Step 3: Commit**

---

### Task 15: Sync elevation/plan selection

**Files:**
- Modify: `apps/web/src/components/PlanView.tsx` and `apps/web/src/components/ElevationView.tsx`

- [ ] **Step 1: When selecting a panel in elevation, sync to store's selectedPanelId**

Already done via `selectPanel` from store.

- [ ] **Step 2: When clicking a panel in plan view, also select in elevation**

Plan view doesn't render panels directly — panels are along walls. Selection is per-wall. The `selectedPanelId` is shared between all views via the store, so this is already handled.

- [ ] **Step 3: Commit**

---

### Task 16: Final build and test

- [ ] **Step 1: Run full build**

Run: `cd apps/web && pnpm build 2>&1 | tail -30`
Expected: build succeeds with no errors

- [ ] **Step 2: Run dev server and verify**

Run: `cd apps/web && pnpm dev &` (background), then check `http://localhost:3000`

- [ ] **Step 3: Commit all remaining changes**

---

## Spec Coverage Check

| Spec Section | Task |
|---|---|
| Floating panels (Tools/View/Settings/History) | Tasks 3-10 |
| Dark + cyan/pink/yellow/magenta state coloring | Tasks 1, 3, 5-8 |
| HUD chips (tool/snap/dimension/coords) | Tasks 4, 14 |
| Keyboard shortcut labels on buttons | Tasks 5, 6 |
| ? shortcut legend overlay | Tasks 9, 11 |
| Settings panel (snap/ortho/grid) | Tasks 7, 8 |
| History panel | Task 8 |
| Fully interactive elevation | Task 13 |
| Escape/Delete/Undo/Redo | Task 11 |
| Space-to-pan | Task 11 |
| Shift-to-lock-ortho | Task 12 |
| 1/2/3 view switching | Task 11 |
| No command palette | Per spec |
| No top toolbar / no status bar | Task 10 |