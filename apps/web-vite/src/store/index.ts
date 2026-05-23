import { create } from 'zustand'
import { nanoid } from 'nanoid'

// ─── Core project types ──────────────────────────────────────────────

export interface Point2D { x: number; y: number }

export interface Layer {
  id: string; name: string; thickness: number
  materialRef: string; role: string
}

export interface Stud {
  id: string; position: number; type: 'full' | 'jack' | 'king' | 'cripple'
  height: number
}

export interface Header {
  id: string; start: number; end: number; height: number; width: number
}

export interface FramingModel {
  studs: Stud[]; headers: Header[]
  cripples: { id: string; position: number; start: number; end: number }[]
  plates: { id: string; type: 'top' | 'bottom'; position: number; length: number }[]
  blocking: { id: string; position: number; start: number; end: number }[]
}

export interface PanelOverride {
  type: string; action: string; targetId: string; delta: Record<string, unknown>
}

export interface Panel {
  id: string; name: string; position: number; width: number; height: number
  layerStack: Layer[]; framingModel: FramingModel
  connections: unknown[]; modules: unknown[]; overrides: PanelOverride[]
}

export interface Opening {
  id: string; type: 'window' | 'door' | 'other'
  position: number; width: number; height: number
  roughOpeningWidth: number; roughOpeningHeight: number; sillHeight?: number
}

export interface Wall {
  id: string; name: string; centerline: Point2D[]; height: number
  wallType: string; panels: Panel[]; openings: Opening[]; modules: unknown[]
}

export interface Level {
  id: string; name: string; elevation: number; walls: Wall[]; spaces?: unknown[]
}

export interface Building {
  id: string; name: string; levels: Level[]
}

export interface Standards {
  studSpacingOC: number; maxPanelLength: number
  lumberGrades: { id: string; name: string; species: string }[]
  defaultLayerPresetId: string
}

export interface Project {
  id: string; name: string; version: string
  createdAt: string; updatedAt: string
  standards: Standards
  materialsCatalog: unknown; moduleLibrary: unknown
  building: Building
}

// ─── Viewport / UI state ─────────────────────────────────────────────

export type ViewMode = 'plan' | 'elevation' | '3d'
export type ToolMode = 'select' | 'pan' | 'draw-wall' | 'add-opening' | 'edit-panel'

export interface Viewport {
  panX: number; panY: number; zoom: number
}

// ─── Undo/Redo ───────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string; label: string; timestamp: number
  patch: Project
  inverse: Project
}

// ─── Store ───────────────────────────────────────────────────────────

interface FRMXStore {
  project: Project
  selectedWallId: string | null
  selectedPanelId: string | null
  viewMode: ViewMode
  toolMode: ToolMode
  viewport: Viewport
  history: HistoryEntry[]
  historyIndex: number
  setProject: (project: Project) => void
  updateProject: (fn: (p: Project) => Project) => void
  selectWall: (id: string | null) => void
  selectPanel: (id: string | null) => void
  setViewMode: (mode: ViewMode) => void
  setToolMode: (mode: ToolMode) => void
  setViewport: (vp: Partial<Viewport>) => void
  addWall: (wall: Wall) => void
  updateWall: (id: string, updates: Partial<Wall>) => void
  removeWall: (id: string) => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  pushHistory: (label: string, patch: Project, inverse: Project) => void
}

function createEmptyProject(): Project {
  const now = new Date().toISOString()
  return {
    id: nanoid(8),
    name: 'New Project',
    version: '1.0.0',
    createdAt: now,
    updatedAt: now,
    standards: {
      studSpacingOC: 16,
      maxPanelLength: 96,
      lumberGrades: [{ id: nanoid(8), name: 'No.2', species: 'SPF' }],
      defaultLayerPresetId: '',
    },
    materialsCatalog: {},
    moduleLibrary: {},
    building: {
      id: nanoid(8),
      name: 'Main Building',
      levels: [{
        id: nanoid(8),
        name: 'Level 1',
        elevation: 0,
        walls: [],
      }],
    },
  }
}

export const useFRMXStore = create<FRMXStore>((set, get) => ({
  project: createEmptyProject(),
  selectedWallId: null,
  selectedPanelId: null,
  viewMode: 'plan',
  toolMode: 'select',
  viewport: { panX: 0, panY: 0, zoom: 1 },
  history: [],
  historyIndex: -1,

  setProject: (project) => set({ project }),
  updateProject: (fn) => {
    const { project } = get()
    const updated = fn(project)
    set({ project: { ...updated, updatedAt: new Date().toISOString() } })
  },
  selectWall: (id) => set({ selectedWallId: id, selectedPanelId: null }),
  selectPanel: (id) => set({ selectedPanelId: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setToolMode: (mode) => set({ toolMode: mode }),
  setViewport: (vp) => set(state => ({ viewport: { ...state.viewport, ...vp } })),

  addWall: (wall) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map((lvl, i) =>
          i === 0 ? { ...lvl, walls: [...lvl.walls, wall] } : lvl
        ),
      },
    }))
    const next = get().project
    get().pushHistory(`Add wall ${wall.name}`, next, prev)
  },

  updateWall: (id, updates) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w => w.id === id ? { ...w, ...updates } : w),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Update wall`, next, prev)
  },

  removeWall: (id) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.filter(w => w.id !== id),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Remove wall`, next, prev)
  },

  pushHistory: (label, patch, inverse) => {
    const entry: HistoryEntry = {
      id: nanoid(8),
      label,
      timestamp: Date.now(),
      patch,
      inverse,
    }
    set(state => ({
      history: [...state.history.slice(0, state.historyIndex + 1), entry],
      historyIndex: state.historyIndex + 1,
    }))
  },

  undo: () => {
    const { historyIndex, history } = get()
    if (historyIndex < 0) return
    const entry = history[historyIndex]
    if (!entry) return
    set({ historyIndex: historyIndex - 1, project: entry.inverse })
  },

  redo: () => {
    const { historyIndex, history } = get()
    if (historyIndex >= history.length - 1) return
    const entry = history[historyIndex + 1]
    if (!entry) return
    set({ historyIndex: historyIndex + 1, project: entry.patch })
  },

  canUndo: () => get().historyIndex >= 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}))