# UI Polish & Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply dramatic depth polish to all UI surfaces — multi-layer shadows, glass-adjacent panels, glowing HUD chips, and elevated component states.

**Architecture:** CSS-first approach. Extend globals.css with a comprehensive shadow system and depth variables. Update FloatingPanel to use glass treatment. Enhance HUDChips with glow effects. All changes are visual/CSS only with no behavioral logic changes.

**Tech Stack:** Tailwind CSS v4 (via @tailwindcss/postcss), CSS custom properties, no new dependencies.

---

## Task 1: Global Shadow System & Background

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Add depth CSS custom properties**

Add after existing `:root` variables (after line 17):

```css
  /* Depth shadow system */
  --shadow-panel-1: 0 8px 32px rgba(0,0,0,0.6);
  --shadow-panel-2: 0 2px 8px rgba(0,0,0,0.4);
  --shadow-panel-3: inset 0 1px 0 rgba(255,255,255,0.05);
  --shadow-panel-hover: 0 12px 40px rgba(0,0,0,0.65);
  --shadow-panel-active: 0 16px 48px rgba(0,0,0,0.7);
  --shadow-chip: 0 2px 12px rgba(0,0,0,0.4);

  /* Glow colors for HUD chips */
  --glow-cyan: rgba(0,212,255,0.3);
  --glow-pink: rgba(255,107,157,0.3);
  --glow-yellow: rgba(255,217,61,0.3);
  --glow-magenta: rgba(199,125,255,0.3);

  /* Glass treatment */
  --glass-bg: rgba(18,18,18,0.85);
  --glass-border: rgba(255,255,255,0.08);
  --glass-highlight: rgba(255,255,255,0.1);
```

- [ ] **Step 2: Update body background to radial gradient**

Replace line 19-22:
```css
body {
  background: var(--background);
  background: radial-gradient(ellipse at center, #0d0d0d 0%, #050505 100%);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
```

- [ ] **Step 3: Update `.floating-panel` class for multi-layer shadows**

Replace lines 26-38:
```css
/* Panel base */
.floating-panel {
  position: absolute;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-panel-1), var(--shadow-panel-2), var(--shadow-panel-3);
  user-select: none;
  z-index: 100;
  transition: box-shadow 0.2s ease;
}

.floating-panel.dragging {
  opacity: 0.9;
  cursor: grabbing;
  box-shadow: var(--shadow-panel-active);
}
```

- [ ] **Step 4: Update `.floating-panel .title-bar` for glass title bar**

Replace lines 40-55:
```css
.floating-panel .title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  cursor: grab;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
}

.floating-panel .title-bar:active {
  cursor: grabbing;
}
```

- [ ] **Step 5: Add hover state for floating panels**

Add after `.floating-panel .close-btn:hover` (after line 76):
```css
.floating-panel:hover:not(.dragging) {
  box-shadow: var(--shadow-panel-hover), var(--shadow-panel-2), var(--shadow-panel-3);
}
```

- [ ] **Step 6: Take screenshot and verify**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/01-after-shadow-system.png --viewport-size 1920,1080 2>&1
```
Expected: Panels have deeper shadows, background has subtle gradient

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "feat(ui): add multi-layer shadow system and glass panel treatment"
```

---

## Task 2: HUD Chips Glow Effects

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Update `.hud-chip` base class with blur and enhanced shadow**

Replace lines 78-88:
```css
/* HUD chips */
.hud-chip {
  position: fixed;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  pointer-events: none;
  z-index: 200;
  border: 1px solid;
  background: rgba(13,13,13,0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--shadow-chip);
  transition: box-shadow 0.15s ease;
}
```

- [ ] **Step 2: Update chip variants with glow shadows**

Replace lines 90-120 with each chip having its accent glow:

```css
.hud-chip.tool {
  top: 12px;
  left: 12px;
  color: var(--panel-cyan);
  border-color: var(--chip-border);
  background: rgba(0, 212, 255, 0.12);
  box-shadow: var(--shadow-chip), 0 0 12px var(--glow-cyan);
}

.hud-chip.snap {
  top: 12px;
  right: 12px;
  color: var(--panel-pink);
  border-color: rgba(255, 107, 157, 0.5);
  background: rgba(255, 107, 157, 0.12);
  box-shadow: var(--shadow-chip), 0 0 12px var(--glow-pink);
}

.hud-chip.dimension {
  bottom: 12px;
  left: 12px;
  color: var(--panel-yellow);
  border-color: rgba(255, 217, 61, 0.5);
  background: rgba(255, 217, 61, 0.12);
  box-shadow: var(--shadow-chip), 0 0 12px var(--glow-yellow);
}

.hud-chip.coords {
  bottom: 12px;
  right: 12px;
  color: var(--panel-magenta);
  border-color: rgba(199, 125, 255, 0.5);
  background: rgba(199, 125, 255, 0.12);
  box-shadow: var(--shadow-chip), 0 0 12px var(--glow-magenta);
}
```

- [ ] **Step 3: Add hover intensifier for chips (optional glow increase)**

Add after the coords chip style:
```css
.hud-chip:hover {
  box-shadow: var(--shadow-chip), 0 0 20px var(--glow-cyan);
}
```
Note: Since chips have pointer-events: none, this is mainly for potential future interactive variants.

- [ ] **Step 4: Take screenshot and verify**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/02-after-hud-glow.png --viewport-size 1920,1080 2>&1
```
Expected: Each HUD chip has its colored glow, chips appear to float above canvas

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "feat(ui): add glow effects to HUD chips"
```

---

## Task 3: Tool Button Hover/Active States

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Enhance `.tool-btn` with lift effect on hover**

Replace lines 122-145:
```css
/* Tool button */
.tool-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  color: rgba(255,255,255,0.6);
  background: transparent;
}

.tool-btn:hover {
  background: rgba(255,255,255,0.08);
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 8px var(--glow-cyan);
  border-color: rgba(0,212,255,0.2);
}

.tool-btn.active {
  color: var(--panel-cyan);
  border-color: rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 0 12px var(--glow-cyan);
}
```

- [ ] **Step 2: Take screenshot and verify**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/03-after-tool-buttons.png --viewport-size 1920,1080 2>&1
```
Expected: Tool buttons glow on hover, pressed state has inner shadow

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "feat(ui): enhance tool button hover/active states with glow"
```

---

## Task 4: FloatingPanel Component Glass Treatment

**Files:**
- Modify: `apps/web/src/components/ui/FloatingPanel.tsx:70-102`

- [ ] **Step 1: Update inline styles to use CSS class instead of hardcoded values**

Update the outer div (lines 70-82) to rely on CSS class instead of inline background/border:

```tsx
  return (
    <div
      className={`floating-panel ${isDragging ? 'dragging' : ''}`}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        zIndex: isDragging ? 150 : 100,
        borderColor: accentColor,  // Keep accent color per-instance
      }}
    >
      <div
        className="title-bar"
        style={{ borderColor: `${accentColor}40`, color: accentColor }}
        onMouseDown={onMouseDown}
      >
```

Note: The `background: '#0d0d0d'` and `borderRadius: '6px'` are now handled by `.floating-panel` CSS class, so remove those from inline style.

- [ ] **Step 2: Take screenshot and verify**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/04-after-panel-glass.png --viewport-size 1920,1080 2>&1
```
Expected: Glass panel treatment working, accent color border preserved

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ui/FloatingPanel.tsx
git commit -m "feat(ui): FloatingPanel uses glass CSS class treatment"
```

---

## Task 5: Shortcut Legend Overlay Polish

**Files:**
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Update `.shortcut-legend .legend-panel` with glass treatment**

Replace lines 164-180:
```css
.shortcut-legend .legend-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 20px 24px;
  min-width: 380px;
  max-width: 480px;
  box-shadow: var(--shadow-panel-1), var(--shadow-panel-2);
}
```

- [ ] **Step 2: Take screenshot and verify**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/05-after-legend.png --viewport-size 1920,1080 2>&1
```
Expected: Legend modal has glass treatment matching panels

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/globals.css
git commit -m "feat(ui): glass treatment for shortcut legend overlay"
```

---

## Task 6: Final Verification Screenshot

- [ ] **Step 1: Take final screenshot**

```bash
npx playwright screenshot --browser chromium http://localhost:3000 docs/superpowers/plans/06-final-polish.png --viewport-size 1920,1080 2>&1
```

- [ ] **Step 2: Review all screenshots in sequence**

Verify:
1. Shadow system: Panels float with layered shadows
2. HUD chips: Each has colored glow halo
3. Tool buttons: Hover lift + glow, active pressed state
4. Glass panels: Blur + transparency visible
5. Legend overlay: Matches glass treatment

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "feat(ui): complete UI polish pass - dramatic depth and glass treatment

- Multi-layer shadow system for floating panels
- Glass-adjacent panel treatment with blur and borders
- Glowing HUD chips per accent color
- Enhanced tool button hover/active states
- Unified depth across all UI surfaces"
```

---

## Spec Coverage

| Spec Section | Tasks |
|--------------|-------|
| Shadow System (multi-layer) | Task 1 |
| Elevation Tiers | Tasks 1, 2 |
| Panel Surface Treatment (glass) | Tasks 1, 4 |
| HUD Chip Redesign (glow) | Task 2 |
| Canvas/Background (gradient) | Task 1 |
| Component States (hover/active) | Tasks 3, 4, 5 |

**Gaps:** None — all spec sections covered.