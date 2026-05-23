/**
 * useKeyboardShortcuts — global keyboard shortcuts for 3D viewport
 * Manages camera view presets and escape-to-reset selection.
 */
import { useEffect } from 'react'
import { useFRMXStore } from '@/store'

export function useKeyboardShortcuts() {
  const { setViewMode, selectWall, selectedWallId } = useFRMXStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle when no input is focused
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      switch (e.key) {
        case 'Escape':
          // Deselect wall in 3D
          if (selectedWallId) {
            selectWall(null)
          }
          break

        case '1':
          // Top-down view
          setViewMode('plan')
          break

        case '2':
          // Elevation view
          setViewMode('elevation')
          break

        case '3':
          // 3D view
          setViewMode('3d')
          break

        case 'g':
        case 'G':
          // Toggle grid (handled by PlanView/ElevationView)
          break

        case 'r':
        case 'R':
          // Reset camera in 3D view (orbit controls reset)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setViewMode, selectWall, selectedWallId])
}