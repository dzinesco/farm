# FRMX CAD-like UI Redesign

**Date:** 2026-05-22
**Status:** Approved

---

## 1. Layout — Floating Panel System

No horizontal toolbar. Four floating, draggable, toggleable panels:

| Panel | Border Color | Contents |
|---|---|---|
| `Tools` | Cyan `#00d4ff` | Select, Pan, Draw Wall, Add Opening, Edit Panel |
| `View` | Pink `#ff6b9d` | Plan / Elevation / 3D toggle |
| `Settings` | Yellow `#ffd93d` | Snap, Ortho, Grid toggles; snap threshold |
| `History` | Magenta `#c77dff` | Undo / Redo list; click any state to restore |

Panels float over the canvas. User can drag and position them anywhere. Each panel has a title bar (colored border + panel name), content area, and a close button. Panels are hidden by default except Tools and View — user shows Settings and History via toolbar buttons.

**No top bar, no bottom status bar.** Canvas gets the full viewport at all times.

---

## 2. Color Theme — Dark + Multi-accent, State-based

**Panel styling:**
- Background: `#0d0d0d`
- Border: 1px solid (per-panel accent color)
- Border-radius: 6px
- Box-shadow: `0 4px 16px rgba(0,0,0,0.4)`

**Interactive state colors:**
- **Cyan** `#00d4ff` — active tool, active selection, focused input
- **Pink** `#ff6b9d` — hover state, snap indicators
- **Yellow** `#ffd93d` — selected object highlight (wall, panel, stud)
- **Magenta** `#c77dff` — warning, error, conflict, delete confirmation

**Usage rule:** Within each panel, the panel's accent color marks the panel identity. Interactive states within any panel use the state-based colors above (cyan=active, pink=hover, yellow=selected, magenta=warning).

---

## 3. Floating HUD Chips

No status bar. Four floating chips appear/disappear contextually:

| Chip | Position | Content | Color | Appears |
|---|---|---|---|---|
| Tool chip | Top-left | e.g., `Select` | Cyan | Always when a tool is active |
| Snap chip | Top-right | `SNAP` / `ORTHO` / `SNAP ORTHO` | Pink | When snap or ortho is on |
| Dimension chip | Bottom-left | Live draw dimension e.g., `10'-6 3/4"` | Yellow | During draw-wall operation |
| Coordinate chip | Bottom-right | `X: 24' Y: 18'` | Magenta | On canvas hover |

Chips are semi-transparent (`rgba(accent, 0.15)` background, 50% opacity border). Font: monospace. Small (11px). The chips float at the screen edges, not the canvas — they track the viewport, not the pan/zoom.

---

## 4. Tool Buttons — Keyboard Shortcut Labels

Each tool button shows its keyboard shortcut inline:

```
[Select V] [Pan H] [Draw Wall W] [Add Opening O] [Edit Panel E]
```

No tooltip required — the shortcut is always visible on the button.

A `?` button lives in the Tools panel, bottom-right. Clicking it opens the **Shortcut Legend Overlay** — a semi-transparent floating panel (centered, ~400px wide) listing all shortcuts grouped by category. Dismiss with `Escape` or clicking outside.

---

## 5. Settings Panel

Contains:
- Snap toggle (shows `ON/OFF`, pink when on)
- Ortho toggle (shows `ON/OFF`, pink when on)
- Grid toggle (shows `ON/OFF`, pink when on)
- Snap threshold slider (pixels, default 8px)

All toggles show their keyboard shortcut beside the label: `Snap (G)`, `Ortho (R)`, `Grid`.

---

## 6. History Panel

Lists all undoable states (stored as full project snapshots in the Zustand store). Each entry shows:
- Timestamp or action description
- Click to restore that state

Undo/Redo buttons at top of panel:
- `Undo (Ctrl+Z)` — restores previous state
- `Redo (Ctrl+Y)` — restores forward state

History entries are clickable — going back to a previous state and making a new change branches the timeline (standard undo tree behavior).

---

## 7. Elevation View — Fully Interactive

Elevation view is an equal editor alongside Plan view, not a read-only diagram.

**Capabilities:**
- Click panel → select (yellow highlight outline)
- Drag panel → reposition along wall (shows live dimension)
- Double-click stud → edit position via inline input
- Click framing element → select for editing
- Delete key → delete selected panel or framing element

**Elevation rendering:** Canvas 2D, vertical orientation. Shows layer stack as colored strips (one per layer), stud positions as tick marks, panels as horizontal blocks with names.

**Elevation / Plan parity:** Both views are fully interactive editors. Selection in one view reflects in the other (selected wall/panel is selected in both).

---

## 8. Keyboard Shortcuts

| Key | Action |
|---|---|
| `V` | Select tool |
| `H` | Pan tool |
| `W` | Draw wall |
| `O` | Add opening |
| `E` | Edit panel |
| `G` | Toggle snap |
| `R` | Toggle ortho |
| `Escape` | Cancel current operation / deselect |
| `Delete` / `Backspace` | Delete selected wall or panel |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Space` (hold) | Temporary pan — release returns to previous tool |
| `Shift` (during draw) | Lock angle to ortho increment |
| `1` | Switch to Plan view |
| `2` | Switch to Elevation view |
| `3` | Switch to 3D view |
| `?` | Open shortcut legend overlay |

**Space-to-pan:** When holding Space, cursor changes to grab hand. Works in any tool mode. Releasing Space returns to the previous tool.

**Shift+draw:** When in draw-wall mode, holding Shift locks the next segment to the ortho angle (0°, 45°, 90°, 135°, etc.).

---

## 9. 3D View Notes

3D view is unaffected by this redesign — it continues to use react-three-fiber with leva controls and OrbitControls. The floating panels do not appear in 3D view (or appear minimized). View switching via `1/2/3` or the View panel works as before.

The HUD chips (tool, snap, dimension, coordinates) also appear in 3D view since the canvas overlay layer is view-mode-agnostic.

---

## 10. Implementation Priorities

**Phase 1 (immediate):**
1. Remove top toolbar from `Toolbar.tsx` and `page.tsx`
2. Implement floating panel shell (draggable, toggleable, styled)
3. Build Tools panel with shortcut labels on buttons
4. Build View panel
5. Implement floating HUD chips
6. Add `?` shortcut legend overlay

**Phase 2:**
1. Build Settings panel (snap/ortho/grid toggles)
2. Build History panel
3. Implement Space-to-pan, Shift-to-lock-ortho
4. Add Escape handler for cancel/deselect

**Phase 3:**
1. Make elevation view fully interactive (select, drag panels, edit studs)
2. Add Delete key handler for wall/panel deletion
3. Implement elevation/plan selection sync

---

## 11. Out of Scope

- Command palette (`Cmd+K`) — not included per design choice
- Panel resizing — panels have fixed widths, user only repositions them
- Multi-wall selection (Shift+click) — single selection only in v1
- Touch/tablet support