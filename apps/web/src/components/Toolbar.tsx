'use client'

import { useFRMXStore } from '@/store'
import {
  MousePointer2, Hand, PenLine, DoorOpen, PanelTop,
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
  { mode: 'edit-panel' as const, label: 'Edit Panel', icon: PanelTop, shortcut: 'E' },
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
          title="Ortho mode (R)"
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