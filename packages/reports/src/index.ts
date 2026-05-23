/**
 * @frmx/reports — panel schedule, BOM, cut list queries
 */
import { createId } from '@frmx/core'

// ─── Local type definitions (avoid circular dependency) ───────────────

export interface Stud {
  id: string
  position: number
  type: 'full' | 'jack' | 'king' | 'cripple'
  height: number
}

export interface Header {
  id: string
  start: number
  end: number
  height: number
  width: number
}

export interface Plate {
  id: string
  type: 'top' | 'bottom'
  position: number
  length: number
}

export interface FramingModel {
  studs: Stud[]
  headers: Header[]
  cripples: { id: string; position: number; start: number; end: number }[]
  plates: Plate[]
  blocking: { id: string; position: number; start: number; end: number }[]
}

export interface Layer {
  id: string
  name: string
  thickness: number
  materialRef: string
  role: string
}

export interface Panel {
  id: string
  name: string
  position: number
  width: number
  height: number
  layerStack: Layer[]
  framingModel: FramingModel
  connections: unknown[]
  modules: unknown[]
  overrides: unknown[]
}

// ─── Report types ─────────────────────────────────────────────────────

export interface PanelScheduleRow {
  panelId: string
  panelName: string
  width: number
  height: number
  layerStackSummary: string
  studCount: number
  framingNotes: string
}

export interface CutListItem {
  description: string
  material: string
  nominalSize: string
  count: number
  length: number
  angle?: number
}

// ─── Report generators ────────────────────────────────────────────────

export function generatePanelSchedule(panels: Panel[]): PanelScheduleRow[] {
  return panels.map(panel => ({
    panelId: panel.id,
    panelName: panel.name,
    width: panel.width,
    height: panel.height,
    layerStackSummary: panel.layerStack.map(l => l.name).join(' + '),
    studCount: panel.framingModel.studs.length,
    framingNotes: '',
  }))
}

export function generateCutList(panels: Panel[]): CutListItem[] {
  const cuts: Map<string, CutListItem> = new Map()

  for (const panel of panels) {
    const studSize = '2x6'
    for (const stud of panel.framingModel.studs) {
      const key = `${studSize}-${Math.round(stud.height)}`
      const existing = cuts.get(key)
      if (existing) {
        existing.count += 1
      } else {
        cuts.set(key, { description: 'Stud', material: 'SPF', nominalSize: studSize, count: 1, length: stud.height })
      }
    }

    for (const header of panel.framingModel.headers) {
      const key = `header-${Math.round(header.width)}x${Math.round(header.height)}`
      const existing = cuts.get(key)
      if (existing) {
        existing.count += 1
      } else {
        cuts.set(key, { description: 'Header', material: 'SPF', nominalSize: `${Math.round(header.width / header.height)}x${Math.round(header.height)}`, count: 1, length: header.end - header.start })
      }
    }
  }

  return [...cuts.values()]
}

export function generateLumberSummary(panels: Panel[]): { size: string; quantity: number; linearFeet: number }[] {
  const summary: Map<string, number> = new Map()

  for (const panel of panels) {
    for (const _ of panel.framingModel.studs) {
      const key = '2x6 Stud'
      summary.set(key, (summary.get(key) ?? 0) + 1)
    }
    for (const plate of panel.framingModel.plates) {
      const key = '2x4 Plate'
      summary.set(key, (summary.get(key) ?? 0) + 1)
    }
  }

  return [...summary.entries()].map(([size, qty]) => ({
    size,
    quantity: qty,
    linearFeet: qty * 8,
  }))
}

export function generateSheathingSummary(panels: Panel[]): { type: string; sheets: number; area: number }[] {
  const osbArea = panels.reduce((sum, p) => sum + (p.width / 12) * (p.height / 12), 0)
  return [{
    type: 'OSB 7/16" 4x8',
    sheets: Math.ceil(osbArea / 32 * 1.12),
    area: Math.ceil(osbArea * 1.12),
  }]
}