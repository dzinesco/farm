// apps/web/src/components/RulerOverlay.tsx
'use client'

import { useEffect, useRef } from 'react'
import type { Viewport } from '@/store'

interface RulerOverlayProps {
  viewport: Viewport
  width: number
  height: number
  visible?: boolean
}

const RULER_SIZE = 28
const FOOT_INCHES = 12 // 12 inches per foot

function formatFootMark(foot: number): string {
  return `${foot}'`
}

export default function RulerOverlay({ viewport, width, height, visible = true }: RulerOverlayProps) {
  const topCanvasRef = useRef<HTMLCanvasElement>(null)
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)

  // pixels per foot at current zoom (3px per foot base * zoom)
  const ppf = 36 * viewport.zoom // 36px/ft = 3px/in * 12in

  useEffect(() => {
    // Top ruler (horizontal)
    const tc = topCanvasRef.current
    if (!tc) return
    const tCtx = tc.getContext('2d')
    if (!tCtx) return
    const tw = tc.width
    const th = tc.height
    tCtx.clearRect(0, 0, tw, th)
    tCtx.fillStyle = '#1a1a1a'
    tCtx.fillRect(0, 0, tw, th)

    const startWorldX = -viewport.panX / ppf * FOOT_INCHES // in inches
    const endWorldX = (tw - viewport.panX) / ppf * FOOT_INCHES
    const startInch = Math.floor(startWorldX)
    const endInch = Math.ceil(endWorldX)
    tCtx.strokeStyle = '#555'
    tCtx.fillStyle = '#aaa'
    tCtx.font = '9px monospace'
    tCtx.textAlign = 'center'

    for (let inch = startInch; inch <= endInch; inch++) {
      const screenX = inch / FOOT_INCHES * ppf + viewport.panX
      if (screenX < 0 || screenX > tw) continue

      const isFoot = inch % 12 === 0
      const isHalf = inch % 6 === 0
      const isQuarter = inch % 3 === 0

      if (isFoot) {
        const foot = inch / 12
        tCtx.strokeStyle = '#888'
        tCtx.lineWidth = 1
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 14)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
        tCtx.fillText(formatFootMark(foot), screenX, th - 16)
      } else if (isHalf) {
        tCtx.strokeStyle = '#444'
        tCtx.lineWidth = 0.5
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 8)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
      } else if (isQuarter) {
        tCtx.strokeStyle = '#333'
        tCtx.lineWidth = 0.5
        tCtx.beginPath()
        tCtx.moveTo(screenX, th - 4)
        tCtx.lineTo(screenX, th)
        tCtx.stroke()
      }
    }

    // Left ruler (vertical)
    const lc = leftCanvasRef.current
    if (!lc) return
    const lCtx = lc.getContext('2d')
    if (!lCtx) return
    const lh = lc.height
    const lw = lc.width
    lCtx.clearRect(0, 0, lw, lh)
    lCtx.fillStyle = '#1a1a1a'
    lCtx.fillRect(0, 0, lw, lh)

    const startWorldY = -viewport.panY / ppf * FOOT_INCHES
    const endWorldY = (lh - viewport.panY) / ppf * FOOT_INCHES
    const startInchY = Math.floor(startWorldY)
    const endInchY = Math.ceil(endWorldY)
    lCtx.strokeStyle = '#555'
    lCtx.fillStyle = '#aaa'
    lCtx.font = '9px monospace'
    lCtx.textAlign = 'right'

    for (let inch = startInchY; inch <= endInchY; inch++) {
      const screenY = inch / FOOT_INCHES * ppf + viewport.panY
      if (screenY < 0 || screenY > lh) continue

      const isFoot = inch % 12 === 0
      const isHalf = inch % 6 === 0
      const isQuarter = inch % 3 === 0

      if (isFoot) {
        const foot = inch / 12
        lCtx.strokeStyle = '#888'
        lCtx.lineWidth = 1
        lCtx.beginPath()
        lCtx.moveTo(lw - 14, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
        lCtx.save()
        lCtx.translate(lw - 16, screenY + 3)
        lCtx.rotate(-Math.PI / 2)
        lCtx.fillText(formatFootMark(foot), 0, 0)
        lCtx.restore()
      } else if (isHalf) {
        lCtx.strokeStyle = '#444'
        lCtx.lineWidth = 0.5
        lCtx.beginPath()
        lCtx.moveTo(lw - 8, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
      } else if (isQuarter) {
        lCtx.strokeStyle = '#333'
        lCtx.lineWidth = 0.5
        lCtx.beginPath()
        lCtx.moveTo(lw - 4, screenY)
        lCtx.lineTo(lw, screenY)
        lCtx.stroke()
      }
    }
  }, [viewport, width, height])

  if (!visible) return null

  return (
    <>
      <canvas
        ref={topCanvasRef}
        width={width}
        height={RULER_SIZE}
        className="absolute top-0 left-0"
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />
      <canvas
        ref={leftCanvasRef}
        width={RULER_SIZE}
        height={height}
        className="absolute top-0 left-0"
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />
      <div
        className="absolute top-0 left-0"
        style={{ width: RULER_SIZE, height: RULER_SIZE, zIndex: 11, backgroundColor: '#1a1a1a', pointerEvents: 'none' }}
      />
    </>
  )
}