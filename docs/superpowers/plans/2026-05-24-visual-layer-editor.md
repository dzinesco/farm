# Visual Layer Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the read-only layer stack display in PropertiesPanel with an interactive layer editor featuring drag-to-reorder and quick preset buttons.

**Architecture:** Layer CRUD lives in the Zustand store via `updatePanelLayers` (add/remove/reorder). A `LayerEditor` component renders layers as a draggable vertical list using `@dnd-kit/sortable` for DOM drag-and-drop. Preset quick-actions apply a named preset's layer stack to the selected panel. 3D visualization reads from the same `Layer[]` array so no additional sync is needed.

**Tech Stack:** `@dnd-kit/sortable` (DOM drag-and-drop), Tailwind CSS v4, Zustand store, existing `FloatingPanel` infrastructure, `@frmx/layers` presets.

---

## File Structure

```
apps/web/src/
├── components/
│   ├── LayerEditor.tsx          # NEW — draggable layer list + preset buttons
│   └── PropertiesPanel.tsx     # MODIFY — swap read-only display for LayerEditor
├── store/
│   └── index.ts                 # MODIFY — add updatePanelLayers action
└── features/three/utils/
    └── layerStackToOffsets.ts  # NO CHANGE — pure transform, reads Layer[]
```

**No new package dependencies.** `@dnd-kit/sortable` is already in the web app's package.json.

---

## Task 1: Store Layer CRUD Actions

**Files:**
- Modify: `apps/web/src/store/index.ts`

- [ ] **Step 1: Find `updatePanel` implementation**

In `apps/web/src/store/index.ts`, locate the `updatePanel` action and the `Panel` type's `layerStack` field. Confirm the action signature and how `pushHistory` is used for undo/redo.

- [ ] **Step 2: Add `updatePanelLayers` action**

Add this action after `updatePanel`:

```ts
updatePanelLayers(
  wallId: string,
  panelId: string,
  layers: Layer[],
  presetName?: string
) {
  const wall = get().walls.get(wallId)
  if (!wall) return
  const panel = wall.panels.find(p => p.id === panelId)
  if (!panel) return
  pushHistory()
  const newPanel = { ...panel, layerStack: layers }
  const newPanels = wall.panels.map(p => p.id === panelId ? newPanel : p)
  set(state => ({
    walls: new Map(state.walls).set(wallId, { ...wall, panels: newPanels })
  }))
}
```

- [ ] **Step 3: Add `applyPresetToPanel` helper**

Add this above or below `updatePanelLayers`:

```ts
applyPresetToPanel(wallId: string, panelId: string, presetId: string) {
  const preset = getPresetById(presetId)
  if (!preset) return
  const newLayers: Layer[] = preset.layers.map((pl, i) => ({
    id: `layer-${Date.now()}-${i}`,
    name: pl.name,
    thickness: { value: pl.thickness, unit: 'in' as const },
    materialRef: pl.material,
    role: pl.role as Layer['role'],
  }))
  get().updatePanelLayers(wallId, panelId, newLayers, preset.name)
}
```

- [ ] **Step 4: Run tests**

Run: `cd apps/web && npx vitest run src/store --reporter=verbose`
Expected: PASS (existing tests still pass; no new tests yet)

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/store/index.ts
git commit -m "feat(store): add updatePanelLayers and applyPresetToPanel actions"
```

---

## Task 2: LayerEditor Component

**Files:**
- Create: `apps/web/src/components/LayerEditor.tsx`
- Modify: `apps/web/src/store/index.ts` (add import for `useStore` selector)

- [ ] **Step 1: Install @dnd-kit dependencies**

Run: `cd apps/web && pnpm add @dnd-kit/sortable @dnd-kit/core @dnd-kit/utilities`
Expected: package added to dependencies

- [ ] **Step 2: Write LayerEditor skeleton**

```tsx
'use client'
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '@/store'
import { Layer } from '@frmx/core'
import { formatDim } from '@/lib/format-dim'
import { DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION, getPresetById } from '@frmx/layers'

const ROLE_COLORS: Record<string, string> = {
  sheathing: '#c4b5a0',
  cladding: '#8b7355',
  insulation: '#fde68a',
  'vapor-barrier': '#93c5fd',
  drywall: '#ffffff',
  'air-gap': '#e0e7ff',
  other: '#f0f0f0',
  core: '#d4d4d4',
}

interface SortableLayerRowProps {
  layer: Layer
  index: number
}

function SortableLayerRow({ layer, index }: SortableLayerRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: layer.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 text-xs py-1 px-2 bg-white rounded border border-gray-200 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <span className="text-gray-400 text-[10px] w-4">{index + 1}</span>
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: ROLE_COLORS[layer.role] ?? '#ccc' }}
      />
      <span className="flex-1 truncate text-gray-700">{layer.name}</span>
      <span className="text-gray-400 text-[10px] tabular-nums">
        {formatDim(layer.thickness)}
      </span>
    </div>
  )
}

interface LayerEditorProps {
  wallId: string
  panelId: string
  layers: Layer[]
}

export function LayerEditor({ wallId, panelId, layers }: LayerEditorProps) {
  const updatePanelLayers = useStore(s => s.updatePanelLayers)
  const applyPresetToPanel = useStore(s => s.applyPresetToPanel)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = layers.findIndex(l => l.id === active.id)
      const newIndex = layers.findIndex(l => l.id === over.id)
      const reordered = arrayMove(layers, oldIndex, newIndex)
      updatePanelLayers(wallId, panelId, reordered)
    }
  }

  function handleAddLayer() {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      name: 'New Layer',
      thickness: { value: 0.5, unit: 'in' },
      materialRef: 'unknown',
      role: 'other',
    }
    updatePanelLayers(wallId, panelId, [...layers, newLayer])
  }

  function handleRemoveLayer(layerId: string) {
    updatePanelLayers(wallId, panelId, layers.filter(l => l.id !== layerId))
  }

  const presets = [DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION]

  return (
    <div className="space-y-2">
      {/* Preset quick-actions */}
      <div className="flex gap-1 flex-wrap">
        {presets.map(preset => (
          <button
            key={preset.id}
            onClick={() => applyPresetToPanel(wallId, panelId, preset.id)}
            className="text-[10px] px-2 py-0.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            title={preset.description}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Draggable layer list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={layers.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {layers.map((layer, i) => (
              <div key={layer.id} className="flex items-center gap-1 group">
                <div className="flex-1">
                  <SortableLayerRow layer={layer} index={i} />
                </div>
                <button
                  onClick={() => handleRemoveLayer(layer.id)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-1"
                  title="Remove layer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add layer button */}
      <button
        onClick={handleAddLayer}
        className="w-full text-xs py-1 rounded border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        + Add Layer
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Run TypeScript check**

Run: `cd apps/web && npx tsc --noEmit`
Expected: No errors (type-check passes)

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/LayerEditor.tsx apps/web/package.json pnpm-lock.yaml
git commit -m "feat(layers): add LayerEditor with drag-to-reorder and presets"
```

---

## Task 3: Integrate LayerEditor into PropertiesPanel

**Files:**
- Modify: `apps/web/src/components/PropertiesPanel.tsx`

- [ ] **Step 1: Read PropertiesPanel.tsx**

Read the full file to understand the existing structure, especially the read-only layer stack section (lines 97-118).

- [ ] **Step 2: Replace read-only layer stack with LayerEditor**

Add import:
```tsx
import { LayerEditor } from './LayerEditor'
```

Find the read-only layer stack section and replace it with:
```tsx
<LayerEditor
  wallId={selectedWallId}
  panelId={selectedPanel.id}
  layers={selectedPanel.layerStack}
/>
```

The rest of PropertiesPanel (wall name, panel dimensions, position) stays the same.

- [ ] **Step 3: Verify in browser**

Run dev server: `cd apps/web && pnpm dev`
Open browser, select a wall and panel, verify LayerEditor renders with drag handles, preset buttons, add/remove controls.

- [ ] **Step 4: Run tests**

Run: `cd apps/web && npx vitest run src/components/PropertiesPanel --reporter=verbose`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/PropertiesPanel.tsx
git commit -m "feat(ui): replace read-only layer display with interactive LayerEditor"
```

---

## Self-Review Checklist

**1. Spec coverage:** Does the plan cover drag-to-reorder and preset quick-actions?
- Drag-to-reorder: ✅ Task 2 (DndContext + SortableContext + handleDragEnd)
- Preset quick-actions: ✅ Task 2 (applyPresetToPanel buttons)
- Common residential assemblies: ✅ DEFAULT_EXTERIOR_2X6 and DEFAULT_INTERIOR_PARTITION are the two existing presets

**2. Placeholder scan:** No placeholders. Every step has complete code.

**3. Type consistency:**
- `updatePanelLayers(wallId, panelId, layers)` — `layers` is `Layer[]`
- `applyPresetToPanel(wallId, panelId, presetId)` — uses `getPresetById` from `@frmx/layers`
- `LayerEditor` receives `wallId`, `panelId`, `layers` props
- All match ✅

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-24-visual-layer-editor.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**