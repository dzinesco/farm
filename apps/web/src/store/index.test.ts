import { describe, it, expect, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
// @ts-ignore
import { useFRMXStore } from './index'
import { nanoid } from 'nanoid'

function makeProject() {
  const now = new Date().toISOString()
  return {
    id: nanoid(8),
    name: 'New Project',
    version: '1.0.0',
    createdAt: now,
    updatedAt: now,
    standards: {
      studSpacingOC: 16,
      maxPanelLength: 96,
      lumberGrades: [{ id: nanoid(8), name: 'No.2', species: 'SPF' }],
      defaultLayerPresetId: '',
    },
    materialsCatalog: {},
    moduleLibrary: {},
    building: {
      id: nanoid(8),
      name: 'Main Building',
      levels: [{ id: nanoid(8), name: 'Level 1', elevation: 0, walls: [] }],
    },
  }
}

function resetStore() {
  useFRMXStore.setState({
    project: makeProject() as any,
    selectedWallId: null,
    selectedPanelId: null,
    viewMode: 'plan',
    toolMode: 'select',
    viewport: { panX: 0, panY: 0, zoom: 1 },
    history: [],
    historyIndex: -1,
  })
}

const getStore = () => useFRMXStore.getState()

function addTestWall(id = 'w1', name = 'Test Wall') {
  getStore().addWall({ id, name, centerline: [], height: 96, wallType: 'exterior', panels: [], openings: [], modules: [] })
}

describe('undo/redo', () => {
  beforeEach(() => { resetStore() })

  it('addWall adds wall and canUndo becomes true', () => {
    addTestWall()
    expect(getStore().project.building.levels[0].walls.length).toBe(1)
    expect(getStore().canUndo()).toBe(true)
  })

  it('undo removes the wall', () => {
    addTestWall()
    getStore().undo()
    expect(getStore().project.building.levels[0].walls.length).toBe(0)
  })

  it('redo restores what undo removed', () => {
    addTestWall()
    getStore().undo()
    getStore().redo()
    expect(getStore().project.building.levels[0].walls.length).toBe(1)
  })

  it('multiple undos step back correctly', () => {
    addTestWall('w1', 'W1')
    addTestWall('w2', 'W2')
    getStore().undo()
    const s = getStore()
    expect(s.project.building.levels[0].walls.find(w => w.id === 'w2')).toBeUndefined()
    expect(s.project.building.levels[0].walls.find(w => w.id === 'w1')).toBeDefined()
    getStore().undo()
    expect(getStore().project.building.levels[0].walls.length).toBe(0)
  })

  it('undo when history is empty is no-op', () => {
    getStore().undo()
    expect(getStore().project.building.levels[0].walls.length).toBe(0)
    expect(getStore().canUndo()).toBe(false)
  })

  it('redo at head of history is no-op', () => {
    addTestWall()
    getStore().undo()
    getStore().redo()
    getStore().redo()
    expect(getStore().project.building.levels[0].walls.length).toBe(1)
    expect(getStore().canRedo()).toBe(false)
  })

  it('canUndo/canRedo return correct booleans', () => {
    const store = getStore()
    expect(store.canUndo()).toBe(false)
    expect(store.canRedo()).toBe(false)
    addTestWall()
    expect(store.canUndo()).toBe(true)
    expect(store.canRedo()).toBe(false)
    store.undo()
    expect(store.canUndo()).toBe(false)
    expect(store.canRedo()).toBe(true)
    store.redo()
    expect(store.canUndo()).toBe(true)
    expect(store.canRedo()).toBe(false)
  })
})

describe('AddWall bug fix', () => {
  beforeEach(() => { resetStore() })

  it('walls are added to the first level', () => {
    addTestWall('w1', 'W1')
    addTestWall('w2', 'W2')
    const levels = getStore().project.building.levels
    expect(levels.length).toBe(1)
    expect(levels[0].walls.length).toBe(2)
    expect(levels[0].walls[0].id).toBe('w1')
    expect(levels[0].walls[1].id).toBe('w2')
  })
})

describe('updateWall', () => {
  beforeEach(() => { resetStore() })

  it('updateWall captures inverse for undo', () => {
    addTestWall()
    getStore().updateWall('w1', { name: 'Renamed Wall' })
    expect(getStore().project.building.levels[0].walls[0].name).toBe('Renamed Wall')
    getStore().undo()
    expect(getStore().project.building.levels[0].walls[0].name).toBe('Test Wall')
  })
})

describe('removeWall', () => {
  beforeEach(() => { resetStore() })

  it('removeWall captures inverse for undo', () => {
    addTestWall()
    expect(getStore().project.building.levels[0].walls.length).toBe(1)
    getStore().removeWall('w1')
    expect(getStore().project.building.levels[0].walls.length).toBe(0)
    getStore().undo()
    expect(getStore().project.building.levels[0].walls.length).toBe(1)
  })
})