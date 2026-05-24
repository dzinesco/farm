/**
 * @frmx/core — shared types, IDs, validation schemas
 */
import { z } from 'zod'
import { nanoid } from 'nanoid'

// ─── ID generation ───────────────────────────────────────────────────

export function createId(prefix: string = ''): string {
  return prefix ? `${prefix}_${nanoid(8)}` : nanoid(8)
}

// ─── Core entity schemas ─────────────────────────────────────────────

export const LengthSchema = z.number().positive()
export type Length = z.infer<typeof LengthSchema>

export const Point2DSchema = z.object({ x: z.number(), y: z.number() })
export type Point2D = z.infer<typeof Point2DSchema>

export const Point3DSchema = z.object({ x: z.number(), y: z.number(), z: z.number() })
export type Point3D = z.infer<typeof Point3DSchema>

export const Vector2DSchema = z.object({ x: z.number(), y: z.number() })
export type Vector2D = z.infer<typeof Vector2DSchema>

export const Vector3DSchema = z.object({ x: z.number(), y: z.number(), z: z.number() })
export type Vector3D = z.infer<typeof Vector3DSchema>

// ─── Project ─────────────────────────────────────────────────────────

export interface Project {
  id: string
  name: string
  version: string
  createdAt: string
  updatedAt: string
  standards: Standards
  materialsCatalog: MaterialsCatalog
  moduleLibrary: ModuleLibrary
  building: Building
}

export interface Standards {
  studSpacingOC: Length // 16 or 24 inches
  maxPanelLength: Length
  lumberGrades: LumberGrade[]
  defaultLayerPresetId: string
}

export interface LumberGrade {
  id: string
  name: string // "No.2", "Stud", "Grade 1"
  species: string // "SPF", "HDSP", etc.
}

export interface MaterialsCatalog {
  lumber: LumberItem[]
  sheathing: SheathingItem[]
  insulation: InsulationItem[]
  cladding: CladdingItem[]
}

export interface LumberItem {
  id: string
  name: string
  nominalSize: string // "2x4", "2x6"
  actualWidth: Length
  actualDepth: Length
  grade: string
  pricePerUnit: number
  unit: 'bf' | 'lf'
}

export interface SheathingItem {
  id: string
  name: string
  thickness: Length
  material: string // "OSB", "Plywood", "Gypsum"
  pricePerSheet: number
  sheetSize: { width: Length; height: Length }
}

export interface InsulationItem {
  id: string
  name: string
  rValue: number
  thickness: Length
  pricePerUnit: number
}

export interface CladdingItem {
  id: string
  name: string
  thickness: Length
  material: string
  pricePerUnit: number
}

// ─── Module library ──────────────────────────────────────────────────

export interface ModuleLibrary {
  openingPresets: OpeningPreset[]
  cornerPresets: CornerPreset[]
  intersectionPresets: IntersectionPreset[]
  components: Component[]
}

export interface OpeningPreset {
  id: string
  name: string // "Window Bay 36x48", "Door Jamb 32x80"
  roughOpeningWidth: Length
  roughOpeningHeight: Length
  // Actual framing dimensions
  headerSize: string // "2x6", "2x12"
  jambDepth: Length
  sillHeight?: Length
}

export interface CornerPreset {
  id: string
  name: string // "L-Wrap 3.5\"", "Two-Panel + Corner Stud Pack"
  type: 'l-wrap' | 'two-panel' | 'stud-pack'
  sheathingOffset: Length
  studPackCount: number
}

export interface IntersectionPreset {
  id: string
  name: string // "L-Intersection", "T-Intersection", "Cross"
  type: 'l' | 't' | 'cross'
  connectionConfig: string
}

export interface Component {
  id: string
  name: string // "Electrical Pack", "Chase", "Hold-Down"
  type: 'electrical' | 'chase' | 'hold-down' | 'other'
  description: string
  defaultDimensions?: { width?: Length; height?: Length; depth?: Length }
}

// ─── Building / Level / Wall / Panel ────────────────────────────────

export interface Building {
  id: string
  name: string
  levels: Level[]
}

export interface Level {
  id: string
  name: string
  elevation: Length // floor-to-floor height
  walls: Wall[]
  spaces?: Space[]
}

export interface Wall {
  id: string
  name: string
  centerline: Point2D[] // chain of points
  height: Length
  wallType: string // "exterior", "interior partition"
  panels: Panel[]
  openings: Opening[]
  modules: ModuleInstance[]
}

export interface Opening {
  id: string
  type: 'window' | 'door' | 'other'
  position: Length // distance along wall centerline
  width: Length
  height: Length
  roughOpeningWidth: Length
  roughOpeningHeight: Length
  sillHeight?: Length
}

export interface Panel {
  id: string
  name: string
  position: Length // start distance along wall
  width: Length
  height: Length
  layerStack: Layer[]
  framingModel: FramingModel
  connections: Connection[]
  modules: ModuleInstance[]
  // Manual overrides stored as deltas
  overrides: PanelOverride[]
}

export interface Layer {
  id: string
  name: string
  thickness: Length
  materialRef: string // ID into MaterialsCatalog
  role: 'sheathing' | 'cladding' | 'insulation' | 'air-gap' | 'vapor-barrier' | 'drywall' | 'core' | 'other'
}

export interface FramingModel {
  studs: Stud[]
  headers: Header[]
  cripples: Cripple[]
  plates: Plate[]
  blocking: Blocking[]
}

export interface Stud {
  id: string
  position: Length // distance from panel start
  width: Length
  height: Length
  isJack: boolean // True if supports a header (king/jack/cripple)
  isCripple: boolean
}

export interface Header {
  id: string
  start: Length
  end: Length
  height: Length
  width: Length // typically 2x4, 2x6, 2x12
}

export interface Cripple {
  id: string
  position: Length
  start: Length
  end: Length
}

export interface Plate {
  id: string
  type: 'top' | 'bottom'
  position: Length
  width: Length
  height: Length
}

export interface Blocking {
  id: string
  position: Length
  start: Length
  end: Length
}

export interface Connection {
  id: string
  type: 'butt' | 'lap' | 'scarf'
  panelRef: string // adjacent panel ID
  edge: 'left' | 'right'
}

export interface ModuleInstance {
  id: string
  moduleRef: string // ID of opening preset, corner preset, etc.
  position: Length
}

export interface PanelOverride {
  type: 'stud' | 'header' | 'blocking' | 'module' | 'layer'
  action: 'add' | 'remove' | 'move' | 'replace'
  targetId: string
  delta: Record<string, unknown>
}

export interface Space {
  id: string
  name: string
  boundary: Point2D[]
}

// ─── Validation helpers ──────────────────────────────────────────────

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  version: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  standards: z.object({
    studSpacingOC: LengthSchema,
    maxPanelLength: LengthSchema,
    lumberGrades: z.array(z.object({ id: z.string(), name: z.string(), species: z.string() })),
    defaultLayerPresetId: z.string(),
  }),
  materialsCatalog: z.object({
    lumber: z.array(z.any()),
    sheathing: z.array(z.any()),
    insulation: z.array(z.any()),
    cladding: z.array(z.any()),
  }),
  moduleLibrary: z.object({
    openingPresets: z.array(z.any()),
    cornerPresets: z.array(z.any()),
    intersectionPresets: z.array(z.any()),
    components: z.array(z.any()),
  }),
  building: z.object({
    id: z.string(),
    name: z.string(),
    levels: z.array(z.any()),
  }),
})

// ─── Factory helpers ────────────────────────────────────────────────

export function createDefaultStandards(): Standards {
  return {
    studSpacingOC: 16,
    maxPanelLength: 96, // 8 feet
    lumberGrades: [
      { id: createId('grade'), name: 'No.2', species: 'SPF' },
      { id: createId('grade'), name: 'Stud', species: 'SPF' },
    ],
    defaultLayerPresetId: '',
  }
}

export function createDefaultProject(name: string = 'Untitled Project'): Project {
  const now = new Date().toISOString()
  return {
    id: createId('proj'),
    name,
    version: '1.0.0',
    createdAt: now,
    updatedAt: now,
    standards: createDefaultStandards(),
    materialsCatalog: { lumber: [], sheathing: [], insulation: [], cladding: [] },
    moduleLibrary: { openingPresets: [], cornerPresets: [], intersectionPresets: [], components: [] },
    building: {
      id: createId('bldg'),
      name: 'Main Building',
      levels: [],
    },
  }
}

export function createEmptyWall(name: string, centerline: Point2D[], height: Length): Wall {
  return {
    id: createId('wall'),
    name,
    centerline,
    height,
    wallType: 'exterior',
    panels: [],
    openings: [],
    modules: [],
  }
}

export function createEmptyPanel(position: Length, width: Length, height: Length): Panel {
  return {
    id: createId('panel'),
    name: `Panel`,
    position,
    width,
    height,
    layerStack: [],
    framingModel: { studs: [], headers: [], cripples: [], plates: [], blocking: [] },
    connections: [],
    modules: [],
    overrides: [],
  }
}

// ─── Utility types ──────────────────────────────────────────────────

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}