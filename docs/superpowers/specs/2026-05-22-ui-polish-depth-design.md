# UI Polish & Depth Design

**Date:** 2026-05-22
**Status:** Approved for Implementation

## Overview

Comprehensive depth pass across all UI surfaces with dramatic intensity — bold shadows, pronounced elevation, and layered depth that fully realizes the dark neon CAD aesthetic.

---

## Shadow System

### Multi-Layer Floating Shadows

All floating panels use a three-layer shadow stack:

```
Layer 1 (ambient):  0 8px 32px rgba(0,0,0,0.6)
Layer 2 (contact):  0 2px 8px rgba(0,0,0,0.4)
Layer 3 (edge):     inset 0 1px 0 rgba(255,255,255,0.05)
```

### Elevation Tiers

| Element | Shadow | Notes |
|---------|--------|-------|
| Canvas background | none | Flat, no shadow |
| HUD chips | `0 2px 8px rgba(0,0,0,0.5)` | + subtle accent glow |
| Floating panels | Full multi-layer | 3-layer stack above |
| Active/dragged panel | `0 16px 48px rgba(0,0,0,0.7)` | Max elevation |

---

## Panel Surface Treatment

### Glass-Adjacent Panels

```css
background: rgba(18,18,18,0.85);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.08);
```

### Title Bar

```css
background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
border-bottom: 1px solid rgba(0,0,0,0.3);
```

### Inner Edge Highlight

```css
/* On panel body */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
```

### Noise Texture (Optional Enhancement)

SVG noise filter at 2% opacity for surface break-up.

---

## HUD Chip Redesign

### Base Style

```css
background: rgba(13,13,13,0.9);
backdrop-filter: blur(8px);
border: 1px solid var(--accent-color);
box-shadow: 0 2px 12px rgba(0,0,0,0.4), 0 0 8px var(--accent-glow);
```

### Chip Variants (Accent Colors)

| Variant | Accent Color | Glow |
|---------|-------------|------|
| Tool | `#00d4ff` (cyan) | `rgba(0,212,255,0.3)` |
| Snap | `#ff6b9d` (pink) | `rgba(255,107,157,0.3)` |
| Dimension | `#ffd93d` (yellow) | `rgba(255,217,61,0.3)` |
| Coordinates | `#c77dff` (magenta) | `rgba(199,125,255,0.3)` |

---

## Canvas/Background

```css
background: radial-gradient(ellipse at center, #0d0d0d 0%, #050505 100%);
```

Optional faint grid pattern at 3% opacity.

---

## Component States

### Floating Panel

| State | Change |
|-------|--------|
| Default | Full 3-layer shadow |
| Hover | Shadow spreads slightly, opacity bump |
| Active/dragged | Max elevation, `0 16px 48px` shadow |

### Tool Button

| State | Change |
|-------|--------|
| Default | Flat |
| Hover | Lift + accent glow |
| Active | Pressed, inner shadow |

---

## Implementation Files

- `apps/web/src/app/globals.css` — CSS variables, base styles, shadow system
- `apps/web/src/components/ui/FloatingPanel.tsx` — panel shell with glass treatment
- `apps/web/src/components/ui/HUDChips.tsx` — chip components with glow effects
- `apps/web/src/components/Editor.tsx` — layout, panel positions, background

---

## Scope

All UI surfaces: floating panels, HUD chips, canvas background, tool buttons, and all interactive states.