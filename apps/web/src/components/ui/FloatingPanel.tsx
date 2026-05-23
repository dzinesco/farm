'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'

interface FloatingPanelProps {
  title: string
  accentColor: string
  defaultX?: number
  defaultY?: number
  width?: number
  children: ReactNode
  onClose?: () => void
}

export default function FloatingPanel({
  title,
  accentColor,
  defaultX = 20,
  defaultY = 80,
  width = 180,
  children,
  onClose,
}: FloatingPanelProps) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.close-btn')) return
    e.preventDefault()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    }
    const onMouseMove = (me: MouseEvent) => {
      if (!dragRef.current) return
      const dx = me.clientX - dragRef.current.startX
      const dy = me.clientY - dragRef.current.startY
      setPos({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
      })
    }
    const onMouseUp = () => {
      setIsDragging(false)
      dragRef.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [pos])

  return (
    <div
      className={`floating-panel ${isDragging ? 'dragging' : ''}`}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        background: '#0d0d0d',
        borderRadius: '6px',
        border: `1px solid ${accentColor}`,
        zIndex: isDragging ? 150 : 100,
      }}
    >
      <div
        className="title-bar"
        style={{ borderColor: `${accentColor}40`, color: accentColor }}
        onMouseDown={onMouseDown}
      >
        <span>{title}</span>
        {onClose && (
          <div
            className="close-btn"
            onClick={onClose}
            style={{ color: accentColor }}
          >
            ×
          </div>
        )}
      </div>
      <div className="panel-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
        {children}
      </div>
    </div>
  )
}