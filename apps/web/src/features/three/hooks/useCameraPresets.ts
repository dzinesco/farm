'use client'
/**
 * useCameraPresets — Top / Perspective / Walkthrough camera presets
 * Used by Scene.tsx to allow quick camera switching via LEVA controls.
 */
import { useCallback } from 'react'
import type { OrbitControls } from '@react-three/drei'

export type CameraPreset = 'top' | 'perspective' | 'walkthrough'

interface CameraState {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
  orthographic: boolean
}

const PRESETS: Record<CameraPreset, CameraState> = {
  top: {
    position: [0, 0, 50],
    target: [0, 0, 0],
    fov: 50,
    orthographic: true,
  },
  perspective: {
    position: [30, 30, 30],
    target: [0, 0, 0],
    fov: 50,
    orthographic: false,
  },
  walkthrough: {
    position: [0, 5, 10],
    target: [0, 5, 0],
    fov: 75,
    orthographic: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCameraPresets(
  controlsRef: React.MutableRefObject<any>
) {
  const applyPreset = useCallback((preset: CameraPreset) => {
    const controls = controlsRef.current
    if (!controls) return

    const state = PRESETS[preset]
    controls.object.position.set(...state.position)
    controls.target.set(...state.target)
    controls.update()
  }, [controlsRef])

  return { applyPreset, presets: PRESETS }
}