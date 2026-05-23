// @ts-nocheck
'use client'
/**
 * SceneContent — the actual R3F scene, isolated so R3F never loads on server.
 * Wrapped in dynamic() import so it only runs in the browser.
 */
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { useMemo, useRef, useEffect } from 'react'
import { useFRMXStore } from '@/store'
import { useWalls3D } from '../hooks/useWalls3D'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { useCameraPresets, type CameraPreset } from '../hooks/useCameraPresets'
import { buildWallMesh, type BuildResult } from './Wall3D'
import { buildCeilingMesh } from './Ceiling3D'

export default function SceneContent() {
  useKeyboardShortcuts()
  const wallSegments = useWalls3D()
  const selectedWallId = useFRMXStore((s) => s.selectedWallId)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)
  const { applyPreset } = useCameraPresets(controlsRef)

  // Clean up OrbitControls when unmounting to prevent global event listener leak
  useEffect(() => {
    return () => {
      const controls = controlsRef.current
      if (controls) {
        controls.enabled = false
        // Remove all event listeners from controls
        if (controls.dispose) {
          controls.dispose()
        }
      }
    }
  }, [])

  const {
    showFloor,
    showCeiling,
    showGrid,
    shadows,
    cameraPreset,
  } = useControls('3D Controls', {
    showFloor: { value: true, label: 'Show Floor' },
    showCeiling: { value: false, label: 'Show Ceiling' },
    showGrid: { value: true, label: 'Show Grid' },
    shadows: { value: true, label: 'Shadows' },
    cameraPreset: {
      value: 'perspective' as CameraPreset,
      options: ['top', 'perspective', 'walkthrough'],
      label: 'Camera',
    },
  })

  useEffect(() => {
    applyPreset(cameraPreset)
  }, [cameraPreset, applyPreset])

  const wallGroups = useMemo(() => {
    const results: { id: string; buildResult: BuildResult }[] = []
    for (const seg of wallSegments) {
      const buildResult = buildWallMesh({
        segment: seg,
        isSelected: seg.id === selectedWallId,
      })
      results.push({ id: seg.id, buildResult })
    }
    return results
  }, [wallSegments, selectedWallId])

  const ceilingMesh = useMemo(() => {
    if (!showCeiling) return null
    const maxHeight = wallSegments.reduce((max, w) => Math.max(max, w.height), 0)
    return buildCeilingMesh(wallSegments, maxHeight + 10)
  }, [wallSegments, showCeiling])

  useEffect(() => {
    return () => {
      wallGroups.forEach(({ buildResult }) => {
        buildResult.dispose()
      })
    }
  }, [wallGroups])

  return (
    <>
      <Leva collapsed={false} titleBar={{ title: '3D Controls' }} />

      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#1a1a1a')
        }}
        onUnmount={() => {
          // Force cleanup of R3F internal state
        }}
      >
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[50, 50, 50]}
          intensity={1.2}
          castShadow={shadows}
          shadow-mapSize={[2048, 2048]}
        />

        <Environment preset="city" />

        {showGrid && (
          <Grid
            position={[0, 0, 0]}
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#3a3a3a"
            sectionSize={10}
            sectionThickness={1}
            sectionColor="#5a5a5a"
            fadeDistance={100}
            fadeStrength={1}
            infiniteGrid
          />
        )}

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.4}
          scale={100}
          blur={2}
          far={50}
        />

        {showFloor && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#2a2a2a" roughness={1} />
          </mesh>
        )}

        {ceilingMesh && <primitive object={ceilingMesh} />}

        {wallGroups.map(({ id, buildResult }) => (
          <primitive key={id} object={buildResult.group} />
        ))}
      </Canvas>
    </>
  )
}