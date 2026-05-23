/**
 * @frmx/materials — BOM rollup, waste factors, lumber & sheathing catalogs
 */
import { createId } from '@frmx/core'

export interface LumberItem {
  id: string
  name: string
  nominalSize: string
  actualWidth: number
  actualDepth: number
  grade: string
  pricePerUnit: number
  unit: 'bf' | 'lf'
}

export interface SheathingItem {
  id: string
  name: string
  thickness: number
  material: string
  pricePerSheet: number
  sheetWidth: number
  sheetHeight: number
}

export interface BOMLineItem {
  description: string
  materialId: string
  quantity: number
  unit: string
  wasteFactor: number
  unitCost: number
  totalCost: number
}

export interface BOMSummary {
  category: string
  items: BOMLineItem[]
  subtotal: number
}

export const DEFAULT_LUMBER: LumberItem[] = [
  { id: createId('lum'), name: '2x4 SPF No.2', nominalSize: '2x4', actualWidth: 3.5, actualDepth: 1.5, grade: 'No.2', pricePerUnit: 0.65, unit: 'lf' },
  { id: createId('lum'), name: '2x6 SPF No.2', nominalSize: '2x6', actualWidth: 5.5, actualDepth: 1.5, grade: 'No.2', pricePerUnit: 0.95, unit: 'lf' },
  { id: createId('lum'), name: '2x4 Stud', nominalSize: '2x4', actualWidth: 3.5, actualDepth: 1.5, grade: 'Stud', pricePerUnit: 0.70, unit: 'lf' },
  { id: createId('lum'), name: '2x12 SPF No.2', nominalSize: '2x12', actualWidth: 11.25, actualDepth: 1.5, grade: 'No.2', pricePerUnit: 1.85, unit: 'lf' },
]

export const DEFAULT_SHEATHING: SheathingItem[] = [
  { id: createId('sheath'), name: 'OSB 7/16" 4x8', thickness: 0.4375, material: 'OSB', pricePerSheet: 28.50, sheetWidth: 48, sheetHeight: 96 },
  { id: createId('sheath'), name: 'Plywood 1/2" 4x8', thickness: 0.5, material: 'Plywood', pricePerSheet: 42.00, sheetWidth: 48, sheetHeight: 96 },
  { id: createId('sheath'), name: 'Gypsum 1/2" 4x8', thickness: 0.5, material: 'Gypsum', pricePerSheet: 12.50, sheetWidth: 48, sheetHeight: 96 },
]

export function calculateLumberQty(nominalLength: number, count: number, wasteFactor = 0.10): number {
  return nominalLength * count * (1 + wasteFactor)
}

export function calculateSheathingSheets(area: number, sheetWidth: number, sheetHeight: number, wasteFactor = 0.12): number {
  const sheetArea = (sheetWidth / 12) * (sheetHeight / 12)
  return Math.ceil((area / sheetArea) * (1 + wasteFactor))
}

export function rollupBOM(items: { material: string; area: number; unitCost: number; wasteFactor: number }[]): BOMSummary[] {
  const categories: Record<string, BOMLineItem[]> = {}
  for (const item of items) {
    const cat = item.material
    if (!categories[cat]) categories[cat] = []
    categories[cat].push({
      description: item.material,
      materialId: '',
      quantity: item.area,
      unit: 'sf',
      wasteFactor: item.wasteFactor,
      unitCost: item.unitCost,
      totalCost: item.area * (1 + item.wasteFactor) * item.unitCost,
    })
  }
  return Object.entries(categories).map(([category, items]) => ({
    category,
    items,
    subtotal: items.reduce((sum, i) => sum + i.totalCost, 0),
  }))
}