'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { parseLengthString, formatDim } from '@frmx/calculator'

interface DimensionInputProps {
  value: number           // total inches
  onChange: (inches: number) => void
  label?: string
  placeholder?: string
  className?: string
  allowNegative?: boolean
}

/**
 * Imperial dimension input — parses feet-inches strings like "10'-6", "10' 6 3/4", "126"
 * and displays formatted value in the input after blur.
 */
export default function DimensionInput({
  value,
  onChange,
  label,
  placeholder = "10'-6\"",
  className = '',
  allowNegative = false,
}: DimensionInputProps) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show formatted dim when not focused
  const displayValue = focused ? text : formatDim(value)

  const handleFocus = () => {
    setFocused(true)
    setText(formatDim(value))
  }

  const handleBlur = useCallback(() => {
    setFocused(false)
    const parsed = parseLengthString(text)
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed)
    }
    setText('')
  }, [text, onChange])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
    if (e.key === 'Escape') {
      setFocused(false)
      setText('')
    }
  }

  // Sync when external value changes
  useEffect(() => {
    if (!focused) {
      setText(formatDim(value))
    }
  }, [value, focused])

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && <label className="text-xs text-gray-500 font-medium">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={e => setText(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-2 py-1 text-xs font-mono border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        style={{ minWidth: 80 }}
      />
    </div>
  )
}