/**
 * FRMX Project Store — Zustand + undo/redo middleware
 * Central state management with full command-stack history.
 */
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

export interface ProjectState {
  project: Project
  selectedWallId: string | null
  selectedPanelId: string | null
  viewMode: ViewMode
  toolMode: ToolMode
  viewport: Viewport
  history: HistoryEntry[]
  historyIndex: number
  snapEnabled: boolean
  orthoEnabled: boolean

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

  // Cursor world position
  cursorWorldPos: { x: number; y: number } | null
}

// ─── Store ───────────────────────────────────────────────────────────

interface FRMXStore {
  // Project data
  project: Project

  // Selection
  selectedWallId: string | null
  selectedPanelId: string | null

  // View
  viewMode: ViewMode
  toolMode: ToolMode
  viewport: Viewport

  // History
  history: HistoryEntry[]
  historyIndex: number

  // Snapping
  snapEnabled: boolean
  orthoEnabled: boolean

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

  // Cursor world position
  cursorWorldPos: { x: number; y: number } | null

  // Actions
  setProject: (project: Project) => void
  updateProject: (fn: (p: Project) => Project) => void

  // Selection
  selectWall: (id: string | null) => void
  selectPanel: (id: string | null) => void

  // View
  setViewMode: (mode: ViewMode) => void
  setToolMode: (mode: ToolMode) => void
  setViewport: (vp: Partial<Viewport>) => void

  // Wall operations
  addWall: (wall: Wall) => void
  updateWall: (id: string, updates: Partial<Wall>) => void
  removeWall: (id: string) => void

  // Panel operations
  addPanel: (wallId: string, panel: Panel) => void
  updatePanel: (wallId: string, panelId: string, updates: Partial<Panel>) => void
  removePanel: (wallId: string, panelId: string) => void

  // Opening operations
  addOpening: (wallId: string, opening: Opening) => void
  updateOpening: (wallId: string, openingId: string, updates: Partial<Opening>) => void
  removeOpening: (wallId: string, openingId: string) => void

  // Undo/Redo
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // History management
  pushHistory: (label: string, patch: Project, inverse: Project) => void
  reset: () => void

  // Snapping
  toggleSnap: () => void
  toggleOrtho: () => void
  setSnapEnabled: (v: boolean) => void
  setOrthoEnabled: (v: boolean) => void

  // Panel visibility
  setPanelVisible: (panel: keyof FRMXStore['panelsVisible'], v: boolean) => void
  togglePanelVisible: (panel: keyof FRMXStore['panelsVisible']) => void

  // Shortcut legend
  setShowShortcutLegend: (v: boolean) => void

  // Space-to-pan
  setPreviousToolMode: (mode: ToolMode | null) => void

  // Cursor world position
  setCursorWorldPos: (pos: { x: number; y: number } | null) => void
}

// ─── Default project factory ─────────────────────────────────────────

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

// ─── Store implementation ─────────────────────────────────────────────

export const useFRMXStore = create<FRMXStore>((set, get) => ({
  project: createEmptyProject(),

  selectedWallId: null,
  selectedPanelId: null,

  viewMode: 'plan',
  toolMode: 'select',
  viewport: { panX: 0, panY: 0, zoom: 1 },

  history: [],
  historyIndex: -1,

  snapEnabled: true,
  orthoEnabled: false,

  panelsVisible: {
    tools: true,
    view: true,
    settings: false,
    history: false,
  },

  showShortcutLegend: false,
  previousToolMode: null,

  cursorWorldPos: null,

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

  addPanel: (wallId, panel) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId ? { ...w, panels: [...w.panels, panel] } : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Add panel ${panel.name}`, next, prev)
  },

  updatePanel: (wallId, panelId, updates) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId
              ? { ...w, panels: w.panels.map(pan => pan.id === panelId ? { ...pan, ...updates } : pan) }
              : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Update panel`, next, prev)
  },

  removePanel: (wallId, panelId) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId ? { ...w, panels: w.panels.filter(p => p.id !== panelId) } : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Remove panel`, next, prev)
  },

  addOpening: (wallId, opening) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId ? { ...w, openings: [...w.openings, opening] } : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Add opening`, next, prev)
  },

  updateOpening: (wallId, openingId, updates) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId
              ? { ...w, openings: w.openings.map(o => o.id === openingId ? { ...o, ...updates } : o) }
              : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Update opening`, next, prev)
  },

  removeOpening: (wallId, openingId) => {
    const prev = get().project
    get().updateProject(p => ({
      ...p,
      building: {
        ...p.building,
        levels: p.building.levels.map(lvl => ({
          ...lvl,
          walls: lvl.walls.map(w =>
            w.id === wallId ? { ...w, openings: w.openings.filter(o => o.id !== openingId) } : w
          ),
        })),
      },
    }))
    const next = get().project
    get().pushHistory(`Remove opening`, next, prev)
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
    set({
      historyIndex: historyIndex - 1,
      project: entry.inverse,
    })
  },

  redo: () => {
    const { historyIndex, history } = get()
    if (historyIndex >= history.length - 1) return
    const entry = history[historyIndex + 1]
    if (!entry) return
    set({
      historyIndex: historyIndex + 1,
      project: entry.patch,
    })
  },

  canUndo: () => get().historyIndex >= 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  toggleSnap: () => set(state => ({ snapEnabled: !state.snapEnabled })),
  toggleOrtho: () => set(state => ({ orthoEnabled: !state.orthoEnabled })),
  setSnapEnabled: (v) => set({ snapEnabled: v }),
  setOrthoEnabled: (v) => set({ orthoEnabled: v }),

  setPanelVisible: (panel, v) => set(state => ({
    panelsVisible: { ...state.panelsVisible, [panel]: v }
  })),
  togglePanelVisible: (panel) => set(state => ({
    panelsVisible: { ...state.panelsVisible, [panel]: !state.panelsVisible[panel] }
  })),
  setShowShortcutLegend: (v) => set({ showShortcutLegend: v }),
  setPreviousToolMode: (mode) => set({ previousToolMode: mode }),

  setCursorWorldPos: (pos) => set({ cursorWorldPos: pos }),

  reset: () => {
    set({
      project: createEmptyProject(),
      selectedWallId: null,
      selectedPanelId: null,
      viewMode: 'plan',
      toolMode: 'select',
      viewport: { panX: 0, panY: 0, zoom: 1 },
      history: [],
      historyIndex: -1,
      snapEnabled: true,
      orthoEnabled: false,
      panelsVisible: {
        tools: true,
        view: true,
        settings: false,
        history: false,
      },
      showShortcutLegend: false,
      previousToolMode: null,

      cursorWorldPos: null,
    })
  },
}))