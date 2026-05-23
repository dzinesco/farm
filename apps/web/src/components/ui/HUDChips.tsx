'use client'

import { useFRMXStore } from '@/store'

export default function HUDChips() {
  const toolMode = useFRMXStore(s => s.toolMode)
  const snapEnabled = useFRMXStore(s => s.snapEnabled)
  const orthoEnabled = useFRMXStore(s => s.orthoEnabled)

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