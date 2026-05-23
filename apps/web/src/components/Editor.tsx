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
import { useEffect } from 'react'

export default function Editor() {
  const { viewMode, panelsVisible } = useFRMXStore()
  const togglePanelVisible = useFRMXStore(s => s.togglePanelVisible)

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