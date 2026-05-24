'use client'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFRMXStore } from '@/store'
import type { Layer } from '@frmx/core'
import { DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION } from '@frmx/layers'

const ROLE_COLORS: Record<string, string> = {
  sheathing: '#c4b5a0',
  cladding: '#8b7355',
  insulation: '#fde68a',
  'vapor-barrier': '#93c5fd',
  drywall: '#ffffff',
  'air-gap': '#e0e7ff',
  other: '#f0f0f0',
  core: '#d4d4d4',
}

function formatDim(value: number): string {
  if (value >= 12) {
    const feet = Math.floor(value / 12)
    const inches = value % 12
    return inches === 0 ? `${feet}'` : `${feet}'-${inches}`
  }
  const fractions: [number, string][] = [
    [0.0625, '1/16'], [0.125, '1/8'], [0.1875, '3/16'],
    [0.25, '1/4'], [0.3125, '5/16'], [0.375, '3/8'],
    [0.4375, '7/16'], [0.5, '1/2'], [0.5625, '9/16'],
    [0.625, '5/8'], [0.6875, '11/16'], [0.75, '3/4'],
    [0.8125, '13/16'], [0.875, '7/8'], [0.9375, '15/16'],
  ]
  const whole = Math.floor(value)
  const frac = value - whole
  for (const [f, label] of fractions) {
    if (Math.abs(frac - f) < 0.03) {
      return whole > 0 ? `${whole} ${label}"` : `${label}"`
    }
  }
  return `${value.toFixed(2)}"`
}

interface SortableLayerRowProps {
  layer: { id: string; name: string; thickness: number; role: string }
  index: number
}

function SortableLayerRow({ layer, index }: SortableLayerRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: layer.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 text-xs py-1 px-2 bg-white rounded border border-gray-200 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <span className="text-gray-400 text-[10px] w-4">{index + 1}</span>
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: ROLE_COLORS[layer.role] ?? '#ccc' }}
      />
      <span className="flex-1 truncate text-gray-700">{layer.name}</span>
      <span className="text-gray-400 text-[10px] tabular-nums">
        {formatDim(layer.thickness)}
      </span>
    </div>
  )
}

interface LayerEditorProps {
  wallId: string
  panelId: string
  layers: { id: string; name: string; thickness: number; role: string; materialRef: string }[]
}

export function LayerEditor({ wallId, panelId, layers }: LayerEditorProps) {
  const updatePanelLayers = useFRMXStore(s => s.updatePanelLayers)
  const applyPresetToPanel = useFRMXStore(s => s.applyPresetToPanel)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = layers.findIndex(l => l.id === active.id)
      const newIndex = layers.findIndex(l => l.id === over.id)
      const reordered = arrayMove(layers, oldIndex, newIndex) as Layer[]
      updatePanelLayers(wallId, panelId, reordered)
    }
  }

  function handleAddLayer() {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      name: 'New Layer',
      thickness: 0.5,
      materialRef: 'unknown',
      role: 'other',
    }
    updatePanelLayers(wallId, panelId, [...layers, newLayer] as Layer[])
  }

  function handleRemoveLayer(layerId: string) {
    updatePanelLayers(wallId, panelId, layers.filter(l => l.id !== layerId) as Layer[])
  }

  const presets = [DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION]

  return (
    <div className="space-y-2">
      {/* Preset quick-actions */}
      <div className="flex gap-1 flex-wrap">
        {presets.map(preset => (
          <button
            key={preset.id}
            onClick={() => applyPresetToPanel(wallId, panelId, preset.id)}
            className="text-[10px] px-2 py-0.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            title={preset.description}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Draggable layer list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={layers.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {layers.map((layer, i) => (
              <div key={layer.id} className="flex items-center gap-1 group">
                <div className="flex-1">
                  <SortableLayerRow layer={layer} index={i} />
                </div>
                <button
                  onClick={() => handleRemoveLayer(layer.id)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-1"
                  title="Remove layer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add layer button */}
      <button
        onClick={handleAddLayer}
        className="w-full text-xs py-1 rounded border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        + Add Layer
      </button>
    </div>
  )
}