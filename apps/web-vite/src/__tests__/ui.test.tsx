import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

// Track mock functions
const mockSetViewMode = vi.fn()
const mockSetToolMode = vi.fn()
const mockSelectWall = vi.fn()
const mockAddWall = vi.fn()
const mockUndo = vi.fn()
const mockRedo = vi.fn()
const mockSetViewport = vi.fn()

// Mock the store - hoisted to top
vi.mock('../store', () => ({
  useFRMXStore: vi.fn(() => ({
    project: {
      name: 'Test Project',
      building: {
        levels: [{
          id: '1',
          name: 'Level 1',
          walls: []
        }]
      }
    },
    selectedWallId: null,
    viewMode: 'plan',
    toolMode: 'select',
    viewport: { panX: 0, panY: 0, zoom: 1 },
    setViewMode: mockSetViewMode,
    setToolMode: mockSetToolMode,
    setViewport: mockSetViewport,
    selectWall: mockSelectWall,
    addWall: mockAddWall,
    undo: mockUndo,
    redo: mockRedo,
    canUndo: () => false,
    canRedo: () => false,
  }))
}))

describe('App UI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders toolbar with view mode buttons', () => {
    render(<App />)
    expect(screen.getByText('Plan')).toBeDefined()
    expect(screen.getByText('Elevation')).toBeDefined()
    expect(screen.getByText('3D')).toBeDefined()
  })

  it('renders toolbar with tool buttons', () => {
    render(<App />)
    const toolButtons = document.querySelectorAll('.btn-tool')
    expect(toolButtons.length).toBe(5)
  })

  it('renders sidebar with project name', () => {
    render(<App />)
    expect(screen.getByText('Test Project')).toBeDefined()
  })

  it('calls setViewMode when elevation button clicked', () => {
    render(<App />)
    const elevationBtn = screen.getByText('Elevation')
    fireEvent.click(elevationBtn)
    expect(mockSetViewMode).toHaveBeenCalledWith('elevation')
  })

  it('calls setToolMode when tool button clicked', () => {
    render(<App />)
    // Get tool buttons (5 total: select, pan, draw-wall, add-opening, edit-panel)
    const toolButtons = document.querySelectorAll('.btn-tool')
    // Click the pan tool (index 1)
    fireEvent.click(toolButtons[1])
    expect(mockSetToolMode).toHaveBeenCalledWith('pan')
  })
})