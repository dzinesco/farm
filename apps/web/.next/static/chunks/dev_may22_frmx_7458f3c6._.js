(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FRMX Project Store — Zustand + undo/redo middleware
 * Central state management with full command-stack history.
 */ __turbopack_context__.s([
    "useFRMXStore",
    ()=>useFRMXStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$13_$40$types$2b$react$40$19$2e$2$2e$15_react$40$18$2e$3$2e$1_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$18$2e$3$2e$1_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/zustand@5.0.13_@types+react@19.2.15_react@18.3.1_use-sync-external-store@1.6.0_react@18.3.1_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/nanoid@5.1.11/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
;
;
// ─── Default project factory ─────────────────────────────────────────
function createEmptyProject() {
    const now = new Date().toISOString();
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
        name: 'New Project',
        version: '1.0.0',
        createdAt: now,
        updatedAt: now,
        standards: {
            studSpacingOC: 16,
            maxPanelLength: 96,
            lumberGrades: [
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
                    name: 'No.2',
                    species: 'SPF'
                }
            ],
            defaultLayerPresetId: ''
        },
        materialsCatalog: {},
        moduleLibrary: {},
        building: {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
            name: 'Main Building',
            levels: [
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
                    name: 'Level 1',
                    elevation: 0,
                    walls: []
                }
            ]
        }
    };
}
const useFRMXStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$13_$40$types$2b$react$40$19$2e$2$2e$15_react$40$18$2e$3$2e$1_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$18$2e$3$2e$1_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        project: createEmptyProject(),
        selectedWallId: null,
        selectedPanelId: null,
        viewMode: 'plan',
        toolMode: 'select',
        viewport: {
            panX: 0,
            panY: 0,
            zoom: 1
        },
        history: [],
        historyIndex: -1,
        snapEnabled: true,
        orthoEnabled: false,
        panelsVisible: {
            tools: true,
            view: true,
            settings: false,
            history: false
        },
        showShortcutLegend: false,
        previousToolMode: null,
        cursorWorldPos: null,
        setProject: (project)=>set({
                project
            }),
        updateProject: (fn)=>{
            const { project } = get();
            const updated = fn(project);
            set({
                project: {
                    ...updated,
                    updatedAt: new Date().toISOString()
                }
            });
        },
        selectWall: (id)=>set({
                selectedWallId: id,
                selectedPanelId: null
            }),
        selectPanel: (id)=>set({
                selectedPanelId: id
            }),
        setViewMode: (mode)=>set({
                viewMode: mode
            }),
        setToolMode: (mode)=>set({
                toolMode: mode
            }),
        setViewport: (vp)=>set((state)=>({
                    viewport: {
                        ...state.viewport,
                        ...vp
                    }
                })),
        addWall: (wall)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl, i)=>i === 0 ? {
                                ...lvl,
                                walls: [
                                    ...lvl.walls,
                                    wall
                                ]
                            } : lvl)
                    }
                }));
            const next = get().project;
            get().pushHistory("Add wall ".concat(wall.name), next, prev);
        },
        updateWall: (id, updates)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === id ? {
                                        ...w,
                                        ...updates
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Update wall", next, prev);
        },
        removeWall: (id)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.filter((w)=>w.id !== id)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Remove wall", next, prev);
        },
        addPanel: (wallId, panel)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        panels: [
                                            ...w.panels,
                                            panel
                                        ]
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Add panel ".concat(panel.name), next, prev);
        },
        updatePanel: (wallId, panelId, updates)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        panels: w.panels.map((pan)=>pan.id === panelId ? {
                                                ...pan,
                                                ...updates
                                            } : pan)
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Update panel", next, prev);
        },
        removePanel: (wallId, panelId)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        panels: w.panels.filter((p)=>p.id !== panelId)
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Remove panel", next, prev);
        },
        addOpening: (wallId, opening)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        openings: [
                                            ...w.openings,
                                            opening
                                        ]
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Add opening", next, prev);
        },
        updateOpening: (wallId, openingId, updates)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        openings: w.openings.map((o)=>o.id === openingId ? {
                                                ...o,
                                                ...updates
                                            } : o)
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Update opening", next, prev);
        },
        removeOpening: (wallId, openingId)=>{
            const prev = get().project;
            get().updateProject((p)=>({
                    ...p,
                    building: {
                        ...p.building,
                        levels: p.building.levels.map((lvl)=>({
                                ...lvl,
                                walls: lvl.walls.map((w)=>w.id === wallId ? {
                                        ...w,
                                        openings: w.openings.filter((o)=>o.id !== openingId)
                                    } : w)
                            }))
                    }
                }));
            const next = get().project;
            get().pushHistory("Remove opening", next, prev);
        },
        pushHistory: (label, patch, inverse)=>{
            const entry = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$nanoid$40$5$2e$1$2e$11$2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
                label,
                timestamp: Date.now(),
                patch,
                inverse
            };
            set((state)=>({
                    history: [
                        ...state.history.slice(0, state.historyIndex + 1),
                        entry
                    ],
                    historyIndex: state.historyIndex + 1
                }));
        },
        undo: ()=>{
            const { historyIndex, history } = get();
            if (historyIndex < 0) return;
            const entry = history[historyIndex];
            if (!entry) return;
            set({
                historyIndex: historyIndex - 1,
                project: entry.inverse
            });
        },
        redo: ()=>{
            const { historyIndex, history } = get();
            if (historyIndex >= history.length - 1) return;
            const entry = history[historyIndex + 1];
            if (!entry) return;
            set({
                historyIndex: historyIndex + 1,
                project: entry.patch
            });
        },
        canUndo: ()=>get().historyIndex >= 0,
        canRedo: ()=>get().historyIndex < get().history.length - 1,
        toggleSnap: ()=>set((state)=>({
                    snapEnabled: !state.snapEnabled
                })),
        toggleOrtho: ()=>set((state)=>({
                    orthoEnabled: !state.orthoEnabled
                })),
        setSnapEnabled: (v)=>set({
                snapEnabled: v
            }),
        setOrthoEnabled: (v)=>set({
                orthoEnabled: v
            }),
        setPanelVisible: (panel, v)=>set((state)=>({
                    panelsVisible: {
                        ...state.panelsVisible,
                        [panel]: v
                    }
                })),
        togglePanelVisible: (panel)=>set((state)=>({
                    panelsVisible: {
                        ...state.panelsVisible,
                        [panel]: !state.panelsVisible[panel]
                    }
                })),
        setShowShortcutLegend: (v)=>set({
                showShortcutLegend: v
            }),
        setPreviousToolMode: (mode)=>set({
                previousToolMode: mode
            }),
        setCursorWorldPos: (pos)=>set({
                cursorWorldPos: pos
            }),
        reset: ()=>{
            set({
                project: createEmptyProject(),
                selectedWallId: null,
                selectedPanelId: null,
                viewMode: 'plan',
                toolMode: 'select',
                viewport: {
                    panX: 0,
                    panY: 0,
                    zoom: 1
                },
                history: [],
                historyIndex: -1,
                snapEnabled: true,
                orthoEnabled: false,
                panelsVisible: {
                    tools: true,
                    view: true,
                    settings: false,
                    history: false
                },
                showShortcutLegend: false,
                previousToolMode: null,
                cursorWorldPos: null
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/index.ts
__turbopack_context__.s([
    "FEET_PER_METER",
    ()=>FEET_PER_METER,
    "FRACTION_DENOM",
    ()=>FRACTION_DENOM,
    "INCHES_PER_FOOT",
    ()=>INCHES_PER_FOOT,
    "INCHES_PER_METER",
    ()=>INCHES_PER_METER,
    "addLengths",
    ()=>addLengths,
    "ceilToFraction",
    ()=>ceilToFraction,
    "degreesToPitch",
    ()=>degreesToPitch,
    "divideLength",
    ()=>divideLength,
    "feetToInches",
    ()=>feetToInches,
    "floorToFraction",
    ()=>floorToFraction,
    "formatDim",
    ()=>formatDim,
    "formatPitch",
    ()=>formatPitch,
    "inchesToFeet",
    ()=>inchesToFeet,
    "inchesToMeters",
    ()=>inchesToMeters,
    "lengthsEqual",
    ()=>lengthsEqual,
    "maxLength",
    ()=>maxLength,
    "metersToInches",
    ()=>metersToInches,
    "minLength",
    ()=>minLength,
    "multiplyLength",
    ()=>multiplyLength,
    "parseFraction",
    ()=>parseFraction,
    "parseLengthString",
    ()=>parseLengthString,
    "parsePitchString",
    ()=>parsePitchString,
    "pitchToDegrees",
    ()=>pitchToDegrees,
    "roundToFraction",
    ()=>roundToFraction,
    "subtractLengths",
    ()=>subtractLengths
]);
var FRACTION_DENOM = 16;
var INCHES_PER_FOOT = 12;
var FEET_PER_METER = 3.28084;
var INCHES_PER_METER = INCHES_PER_FOOT * FEET_PER_METER;
function parseLengthString(input) {
    const s = input.trim();
    if (!s) return 0;
    if (/^\d+\.?\d*$/.test(s)) {
        return parseFloat(s);
    }
    let totalInches = 0;
    let remaining = s;
    const feetMatch = remaining.match(/^(\d+)'(?:\s+|-)?/);
    if (feetMatch) {
        totalInches += parseInt(feetMatch[1], 10) * INCHES_PER_FOOT;
        remaining = remaining.slice(feetMatch[0].length);
    }
    const inchMatch = remaining.match(/^(\d+)(?:\s*-\s*(\d+\/\d+)|(?:\s+(\d+\/\d+)))?\s*"?\s*$/);
    if (inchMatch) {
        totalInches += parseInt(inchMatch[1], 10);
        if (inchMatch[2]) {
            totalInches += parseFraction(inchMatch[2]);
        } else if (inchMatch[3]) {
            totalInches += parseFraction(inchMatch[3]);
        }
    } else if (remaining.includes("/")) {
        totalInches += parseFraction(remaining);
    } else {
        const loneNum = remaining.match(/^(\d+)\s*$/);
        if (loneNum) {
            totalInches += parseInt(loneNum[1], 10);
        }
    }
    return totalInches;
}
function parseFraction(frac) {
    const clean = frac.trim().replace(/\s+/g, "");
    const match = clean.match(/^(\d+)\/(\d+)$/);
    if (!match) return 0;
    return parseInt(match[1], 10) / parseInt(match[2], 10);
}
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
function formatDim(totalInches) {
    const neg = totalInches < 0 ? "-" : "";
    const abs = Math.abs(totalInches);
    if (abs < 1 / FRACTION_DENOM) return "0";
    const inches = Math.floor(abs);
    const frac = abs - inches;
    const wholeFrac = Math.round(frac * FRACTION_DENOM);
    if (wholeFrac === 0) {
        const feet2 = Math.floor(inches / INCHES_PER_FOOT);
        const rem2 = inches % INCHES_PER_FOOT;
        if (feet2 > 0) return "".concat(neg).concat(feet2, "'-").concat(rem2, '"');
        if (rem2 > 0) return "".concat(neg).concat(rem2, '"');
        return "0";
    }
    const divisor = gcd(wholeFrac, FRACTION_DENOM);
    const num = wholeFrac / divisor;
    const den = FRACTION_DENOM / divisor;
    const feet = Math.floor(inches / INCHES_PER_FOOT);
    const rem = inches % INCHES_PER_FOOT;
    let result = neg;
    if (feet > 0) result += "".concat(feet, "'-");
    result += "".concat(rem);
    if (num >= den) {} else if (num > 0) {
        result += " ".concat(num, "/").concat(den);
    }
    result += '"';
    return result;
}
function addLengths(a, b) {
    return a + b;
}
function subtractLengths(a, b) {
    return a - b;
}
function multiplyLength(length, scalar) {
    return length * scalar;
}
function divideLength(length, scalar) {
    return length / scalar;
}
function roundToFraction(length) {
    let denom = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FRACTION_DENOM;
    return Math.round(length * denom) / denom;
}
function lengthsEqual(a, b) {
    let tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1 / 128;
    return Math.abs(a - b) < tolerance;
}
function inchesToFeet(inches) {
    return inches / INCHES_PER_FOOT;
}
function feetToInches(feet) {
    return feet * INCHES_PER_FOOT;
}
function metersToInches(meters) {
    return meters * INCHES_PER_METER;
}
function inchesToMeters(inches) {
    return inches / INCHES_PER_METER;
}
function parsePitchString(pitch) {
    const match = pitch.match(/^(\d+)[:/](\d+)$/);
    if (!match) throw new Error("Invalid pitch: ".concat(pitch));
    const rise = parseInt(match[1], 10);
    const run = parseInt(match[2], 10);
    const ratio = rise / run;
    return {
        rise,
        run,
        degrees: Math.atan2(rise, run) * (180 / Math.PI),
        percent: ratio * 100
    };
}
function pitchToDegrees(rise, run) {
    return Math.atan2(rise, run) * (180 / Math.PI);
}
function degreesToPitch(degrees) {
    const radians = degrees * (Math.PI / 180);
    const rise = Math.tan(radians) * 12;
    return {
        rise: Math.round(rise * 16) / 16,
        run: 12
    };
}
function formatPitch(pitch) {
    return "".concat(pitch.rise, ":").concat(pitch.run);
}
function minLength() {
    for(var _len = arguments.length, lengths = new Array(_len), _key = 0; _key < _len; _key++){
        lengths[_key] = arguments[_key];
    }
    return Math.min(...lengths);
}
function maxLength() {
    for(var _len = arguments.length, lengths = new Array(_len), _key = 0; _key < _len; _key++){
        lengths[_key] = arguments[_key];
    }
    return Math.max(...lengths);
}
function floorToFraction(length) {
    let denom = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FRACTION_DENOM;
    return Math.floor(length * denom) / denom;
}
function ceilToFraction(length) {
    let denom = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : FRACTION_DENOM;
    return Math.ceil(length * denom) / denom;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/packages/geometry/dist/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// src/index.ts
__turbopack_context__.s([
    "buildWallFrame",
    ()=>buildWallFrame,
    "computeBoundingBox",
    ()=>computeBoundingBox,
    "lineLineIntersection",
    ()=>lineLineIntersection,
    "pointAtDistance",
    ()=>pointAtDistance,
    "pointOnLineSegment",
    ()=>pointOnLineSegment,
    "polylineCumulativeDistances",
    ()=>polylineCumulativeDistances,
    "polylineTotalLength",
    ()=>polylineTotalLength,
    "rectContainsPoint",
    ()=>rectContainsPoint,
    "rectIntersection",
    ()=>rectIntersection,
    "rectUnion",
    ()=>rectUnion,
    "vec2Add",
    ()=>vec2Add,
    "vec2Angle",
    ()=>vec2Angle,
    "vec2Distance",
    ()=>vec2Distance,
    "vec2Dot",
    ()=>vec2Dot,
    "vec2FromAngle",
    ()=>vec2FromAngle,
    "vec2Length",
    ()=>vec2Length,
    "vec2Normalize",
    ()=>vec2Normalize,
    "vec2PerpCCW",
    ()=>vec2PerpCCW,
    "vec2PerpCW",
    ()=>vec2PerpCW,
    "vec2Scale",
    ()=>vec2Scale,
    "vec2Sub",
    ()=>vec2Sub,
    "vec3Add",
    ()=>vec3Add,
    "vec3Cross",
    ()=>vec3Cross,
    "vec3Dot",
    ()=>vec3Dot,
    "vec3Length",
    ()=>vec3Length,
    "vec3Normalize",
    ()=>vec3Normalize,
    "vec3Scale",
    ()=>vec3Scale,
    "vec3Sub",
    ()=>vec3Sub,
    "wallToWorld",
    ()=>wallToWorld,
    "worldToWall",
    ()=>worldToWall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
;
function vec2Add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}
function vec2Sub(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}
function vec2Scale(v, s) {
    return {
        x: v.x * s,
        y: v.y * s
    };
}
function vec2Dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
function vec2Length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
function vec2Normalize(v) {
    const len = vec2Length(v);
    if (len === 0) return {
        x: 0,
        y: 0
    };
    return {
        x: v.x / len,
        y: v.y / len
    };
}
function vec2PerpCW(v) {
    return {
        x: -v.y,
        y: v.x
    };
}
function vec2PerpCCW(v) {
    return {
        x: v.y,
        y: -v.x
    };
}
function vec2Angle(v) {
    return Math.atan2(v.y, v.x);
}
function vec2FromAngle(angle) {
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}
function vec2Distance(a, b) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
function vec3Add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
function vec3Sub(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    };
}
function vec3Scale(v, s) {
    return {
        x: v.x * s,
        y: v.y * s,
        z: v.z * s
    };
}
function vec3Dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
function vec3Cross(a, b) {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}
function vec3Length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
function vec3Normalize(v) {
    const len = vec3Length(v);
    if (len === 0) return {
        x: 0,
        y: 0,
        z: 0
    };
    return {
        x: v.x / len,
        y: v.y / len,
        z: v.z / len
    };
}
function buildWallFrame(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const xAxis = {
        x: dx / len,
        y: dy / len,
        z: 0
    };
    const yAxis = {
        x: dy / len,
        y: -dx / len,
        z: 0
    };
    const zAxis = {
        x: 0,
        y: 0,
        z: 1
    };
    return {
        origin: {
            x: p1.x,
            y: p1.y,
            z: 0
        },
        xAxis,
        yAxis,
        zAxis
    };
}
function wallToWorld(frame, distAlong, offset) {
    let height = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    return {
        x: frame.origin.x + frame.xAxis.x * distAlong + frame.yAxis.x * offset,
        y: frame.origin.y + frame.xAxis.y * distAlong + frame.yAxis.y * offset,
        z: height
    };
}
function worldToWall(frame, world) {
    const rel = {
        x: world.x - frame.origin.x,
        y: world.y - frame.origin.y,
        z: world.z - frame.origin.z
    };
    return {
        distAlong: vec3Dot(rel, frame.xAxis),
        offset: vec3Dot(rel, frame.yAxis),
        height: vec3Dot(rel, frame.zAxis)
    };
}
function lineLineIntersection(l1, l2) {
    const { start: p1, end: p2 } = l1;
    const { start: p3, end: p4 } = l2;
    const denom = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    if (Math.abs(denom) < 1e-10) return null;
    const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denom;
    return {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
    };
}
function pointOnLineSegment(pt, line) {
    let tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.01;
    const { start, end } = line;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(pt.x - start.x, pt.y - start.y) < tolerance;
    const t = Math.max(0, Math.min(1, ((pt.x - start.x) * dx + (pt.y - start.y) * dy) / lenSq));
    const nearest = {
        x: start.x + t * dx,
        y: start.y + t * dy
    };
    return Math.hypot(pt.x - nearest.x, pt.y - nearest.y) < tolerance;
}
function polylineCumulativeDistances(points) {
    const dists = [
        0
    ];
    for(let i = 1; i < points.length; i++){
        const d = vec2Distance(points[i - 1], points[i]);
        dists.push(dists[i - 1] + d);
    }
    return dists;
}
function polylineTotalLength(points) {
    const dists = polylineCumulativeDistances(points);
    return dists.length > 0 ? dists[dists.length - 1] : 0;
}
function pointAtDistance(points, dist) {
    const dists = polylineCumulativeDistances(points);
    if (points.length === 0) return null;
    if (dist <= 0) return points[0];
    const total = dists[dists.length - 1];
    if (dist >= total) return points[points.length - 1];
    for(let i = 1; i < dists.length; i++){
        if (dist <= dists[i]) {
            const segLen = dists[i] - dists[i - 1];
            const t = segLen > 0 ? (dist - dists[i - 1]) / segLen : 0;
            return {
                x: points[i - 1].x + t * (points[i].x - points[i - 1].x),
                y: points[i - 1].y + t * (points[i].y - points[i - 1].y)
            };
        }
    }
    return null;
}
function rectContainsPoint(rect, pt) {
    return pt.x >= rect.x && pt.x <= rect.x + rect.width && pt.y >= rect.y && pt.y <= rect.y + rect.height;
}
function rectUnion(a, b) {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const right = Math.max(a.x + a.width, b.x + b.width);
    const bottom = Math.max(a.y + a.height, b.y + b.height);
    return {
        x,
        y,
        width: right - x,
        height: bottom - y
    };
}
function rectIntersection(a, b) {
    const x = Math.max(a.x, b.x);
    const y = Math.max(a.y, b.y);
    const right = Math.min(a.x + a.width, b.x + b.width);
    const bottom = Math.min(a.y + a.height, b.y + b.height);
    if (right <= x || bottom <= y) return null;
    return {
        x,
        y,
        width: right - x,
        height: bottom - y
    };
}
function computeBoundingBox(points) {
    if (points.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points){
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
    }
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/lib/snapping.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// apps/web/src/lib/snapping.ts
__turbopack_context__.s([
    "gridSnap",
    ()=>gridSnap,
    "orthoSnap",
    ()=>orthoSnap,
    "snapPoint",
    ()=>snapPoint
]);
function gridSnap(value, gridSize) {
    return Math.round(value / gridSize) * gridSize;
}
function orthoSnap(candidate, anchor) {
    const dx = candidate.x - anchor.x;
    const dy = candidate.y - anchor.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
        return {
            x: candidate.x,
            y: anchor.y
        };
    } else {
        return {
            x: anchor.x,
            y: candidate.y
        };
    }
}
function snapPoint(pt, endpoints, threshold) {
    for (const ep of endpoints){
        const dx = pt.x - ep.x;
        const dy = pt.y - ep.y;
        if (Math.hypot(dx, dy) <= threshold) {
            return {
                x: ep.x,
                y: ep.y
            };
        }
    }
    return pt;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/RulerOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// apps/web/src/components/RulerOverlay.tsx
__turbopack_context__.s([
    "default",
    ()=>RulerOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const RULER_SIZE = 28;
const FOOT_INCHES = 12 // 12 inches per foot
;
function formatFootMark(foot) {
    return "".concat(foot, "'");
}
function RulerOverlay(param) {
    let { viewport, width, height, visible = true } = param;
    _s();
    const topCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // pixels per foot at current zoom (3px per foot base * zoom)
    const ppf = 36 * viewport.zoom // 36px/ft = 3px/in * 12in
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RulerOverlay.useEffect": ()=>{
            // Top ruler (horizontal)
            const tc = topCanvasRef.current;
            if (!tc) return;
            const tCtx = tc.getContext('2d');
            if (!tCtx) return;
            const tw = tc.width;
            const th = tc.height;
            tCtx.clearRect(0, 0, tw, th);
            tCtx.fillStyle = '#1a1a1a';
            tCtx.fillRect(0, 0, tw, th);
            const startWorldX = -viewport.panX / ppf * FOOT_INCHES // in inches
            ;
            const endWorldX = (tw - viewport.panX) / ppf * FOOT_INCHES;
            const startInch = Math.floor(startWorldX);
            const endInch = Math.ceil(endWorldX);
            tCtx.strokeStyle = '#555';
            tCtx.fillStyle = '#aaa';
            tCtx.font = '9px monospace';
            tCtx.textAlign = 'center';
            for(let inch = startInch; inch <= endInch; inch++){
                const screenX = inch / FOOT_INCHES * ppf + viewport.panX;
                if (screenX < 0 || screenX > tw) continue;
                const isFoot = inch % 12 === 0;
                const isHalf = inch % 6 === 0;
                const isQuarter = inch % 3 === 0;
                if (isFoot) {
                    const foot = inch / 12;
                    tCtx.strokeStyle = '#888';
                    tCtx.lineWidth = 1;
                    tCtx.beginPath();
                    tCtx.moveTo(screenX, th - 14);
                    tCtx.lineTo(screenX, th);
                    tCtx.stroke();
                    tCtx.fillText(formatFootMark(foot), screenX, th - 16);
                } else if (isHalf) {
                    tCtx.strokeStyle = '#444';
                    tCtx.lineWidth = 0.5;
                    tCtx.beginPath();
                    tCtx.moveTo(screenX, th - 8);
                    tCtx.lineTo(screenX, th);
                    tCtx.stroke();
                } else if (isQuarter) {
                    tCtx.strokeStyle = '#333';
                    tCtx.lineWidth = 0.5;
                    tCtx.beginPath();
                    tCtx.moveTo(screenX, th - 4);
                    tCtx.lineTo(screenX, th);
                    tCtx.stroke();
                }
            }
            // Left ruler (vertical)
            const lc = leftCanvasRef.current;
            if (!lc) return;
            const lCtx = lc.getContext('2d');
            if (!lCtx) return;
            const lh = lc.height;
            const lw = lc.width;
            lCtx.clearRect(0, 0, lw, lh);
            lCtx.fillStyle = '#1a1a1a';
            lCtx.fillRect(0, 0, lw, lh);
            const startWorldY = -viewport.panY / ppf * FOOT_INCHES;
            const endWorldY = (lh - viewport.panY) / ppf * FOOT_INCHES;
            const startInchY = Math.floor(startWorldY);
            const endInchY = Math.ceil(endWorldY);
            lCtx.strokeStyle = '#555';
            lCtx.fillStyle = '#aaa';
            lCtx.font = '9px monospace';
            lCtx.textAlign = 'right';
            for(let inch = startInchY; inch <= endInchY; inch++){
                const screenY = inch / FOOT_INCHES * ppf + viewport.panY;
                if (screenY < 0 || screenY > lh) continue;
                const isFoot = inch % 12 === 0;
                const isHalf = inch % 6 === 0;
                const isQuarter = inch % 3 === 0;
                if (isFoot) {
                    const foot = inch / 12;
                    lCtx.strokeStyle = '#888';
                    lCtx.lineWidth = 1;
                    lCtx.beginPath();
                    lCtx.moveTo(lw - 14, screenY);
                    lCtx.lineTo(lw, screenY);
                    lCtx.stroke();
                    lCtx.save();
                    lCtx.translate(lw - 16, screenY + 3);
                    lCtx.rotate(-Math.PI / 2);
                    lCtx.fillText(formatFootMark(foot), 0, 0);
                    lCtx.restore();
                } else if (isHalf) {
                    lCtx.strokeStyle = '#444';
                    lCtx.lineWidth = 0.5;
                    lCtx.beginPath();
                    lCtx.moveTo(lw - 8, screenY);
                    lCtx.lineTo(lw, screenY);
                    lCtx.stroke();
                } else if (isQuarter) {
                    lCtx.strokeStyle = '#333';
                    lCtx.lineWidth = 0.5;
                    lCtx.beginPath();
                    lCtx.moveTo(lw - 4, screenY);
                    lCtx.lineTo(lw, screenY);
                    lCtx.stroke();
                }
            }
        }
    }["RulerOverlay.useEffect"], [
        viewport,
        width,
        height
    ]);
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: topCanvasRef,
                width: width,
                height: RULER_SIZE,
                className: "absolute top-0 left-0",
                style: {
                    zIndex: 10,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/RulerOverlay.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: leftCanvasRef,
                width: RULER_SIZE,
                height: height,
                className: "absolute top-0 left-0",
                style: {
                    zIndex: 10,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/RulerOverlay.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0",
                style: {
                    width: RULER_SIZE,
                    height: RULER_SIZE,
                    zIndex: 11,
                    backgroundColor: '#1a1a1a',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/RulerOverlay.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(RulerOverlay, "nN+eByjHs5WU4WLCPD2nS5X/1Js=");
_c = RulerOverlay;
var _c;
__turbopack_context__.k.register(_c, "RulerOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/geometry/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/lib/snapping.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$RulerOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/RulerOverlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
console.log('[PlanView] module loaded');
const GRID_SIZE = 3 // 3px per foot = 1/4" = 1' architectural scale
;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;
const WALL_COLORS = {
    exterior: {
        stroke: '#1e40af',
        fill: '#93c5fd',
        dash: []
    },
    'exterior-sheathed': {
        stroke: '#1e40af',
        fill: '#bfdbfe',
        dash: []
    },
    interior: {
        stroke: '#6b7280',
        fill: '#d1d5db',
        dash: []
    },
    partition: {
        stroke: '#9ca3af',
        fill: '#e5e7eb',
        dash: [
            6,
            3
        ]
    },
    retaining: {
        stroke: '#b45309',
        fill: '#fde68a',
        dash: [
            4,
            4
        ]
    },
    default: {
        stroke: '#374151',
        fill: '#9ca3af',
        dash: []
    }
};
function PlanView() {
    var _containerRef_current, _containerRef_current1;
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rulerSize = 28;
    const { project, viewport, setViewport, selectedWallId, selectWall, viewMode, toolMode, addWall, snapEnabled, orthoEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const isPanningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    // Wall drawing state
    const isDrawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const drawingPointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Use refs for values that come from store to avoid stale closure issues
    const toolModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(toolMode);
    toolModeRef.current = toolMode;
    const projectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(project);
    projectRef.current = project;
    const orthoEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(orthoEnabled);
    orthoEnabledRef.current = orthoEnabled;
    const snapEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(snapEnabled);
    snapEnabledRef.current = snapEnabled;
    const shiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Status bar helpers
    const wallCount = project.building.levels.reduce((sum, lvl)=>sum + lvl.walls.length, 0);
    const selectedWall = selectedWallId ? project.building.levels.flatMap((l)=>l.walls).find((w)=>w.id === selectedWallId) : null;
    // Hover state
    const [hoveredWallId, setHoveredWallId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function calculateWallLengthInches(wall) {
        if (!wall || wall.centerline.length < 2) return 0;
        let total = 0;
        for(let i = 1; i < wall.centerline.length; i++){
            const dx = wall.centerline[i].x - wall.centerline[i - 1].x;
            const dy = wall.centerline[i].y - wall.centerline[i - 1].y;
            total += Math.hypot(dx, dy);
        }
        return total * 12 // convert feet to inches
        ;
    }
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[draw]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const { width, height } = canvas;
            const { panX, panY, zoom } = viewport;
            ctx.clearRect(0, 0, width, height);
            // Background
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0, 0, width, height);
            // Grid
            ctx.strokeStyle = '#e5e5e5';
            ctx.lineWidth = 0.5;
            const gridSpacing = GRID_SIZE * zoom;
            const startX = panX % gridSpacing;
            const startY = panY % gridSpacing;
            for(let x = startX; x < width; x += gridSpacing){
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for(let y = startY; y < height; y += gridSpacing){
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            // Foot markers
            ctx.fillStyle = '#999';
            ctx.font = '9px monospace';
            for(let x = startX; x < width; x += gridSpacing * 12){
                const foot = Math.round((x - panX) / gridSpacing);
                ctx.fillText("".concat(foot, "'"), x + 2, 12);
            }
            // Draw all levels' walls
            for (const level of project.building.levels){
                for (const wall of level.walls){
                    const isSelected = wall.id === selectedWallId;
                    drawWall(ctx, wall, viewport, isSelected, wall.id === hoveredWallId);
                }
            }
            // Draw endpoint handles for selected wall
            if (selectedWall) {
                ctx.fillStyle = '#2563eb';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                for (const pt of selectedWall.centerline){
                    ctx.beginPath();
                    ctx.arc(pt.x * zoom + panX, pt.y * zoom + panY, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
            // Draw in-progress wall
            if (toolModeRef.current === 'draw-wall' && isDrawingRef.current && drawingPointsRef.current.length > 0) {
                const pts = drawingPointsRef.current;
                ctx.beginPath();
                ctx.moveTo(pts[0].x * zoom + panX, pts[0].y * zoom + panY);
                for(let i = 1; i < pts.length; i++){
                    ctx.lineTo(pts[i].x * zoom + panX, pts[i].y * zoom + panY);
                }
                ctx.strokeStyle = '#2563eb';
                ctx.lineWidth = 2;
                ctx.setLineDash([
                    6,
                    4
                ]);
                ctx.stroke();
                ctx.setLineDash([]);
                // Draw endpoint handle
                const last = pts[pts.length - 1];
                ctx.fillStyle = '#2563eb';
                ctx.beginPath();
                ctx.arc(last.x * zoom + panX, last.y * zoom + panY, 6, 0, Math.PI * 2);
                ctx.fill();
            }
        // Draw wall lengths are already rendered inside drawWall
        }
    }["PlanView.useCallback[draw]"], [
        project,
        viewport,
        selectedWallId,
        hoveredWallId
    ]);
    function drawWall(ctx, wall, vp, isSelected) {
        let isHovered = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
        if (wall.centerline.length < 2) return;
        const { panX, panY, zoom } = vp;
        var _wall_wallType, _WALL_COLORS_;
        const wallStyle = (_WALL_COLORS_ = WALL_COLORS[(_wall_wallType = wall.wallType) !== null && _wall_wallType !== void 0 ? _wall_wallType : '']) !== null && _WALL_COLORS_ !== void 0 ? _WALL_COLORS_ : WALL_COLORS.default;
        // Wall centerline path
        ctx.beginPath();
        ctx.moveTo(wall.centerline[0].x * zoom + panX, wall.centerline[0].y * zoom + panY);
        for(let i = 1; i < wall.centerline.length; i++){
            ctx.lineTo(wall.centerline[i].x * zoom + panX, wall.centerline[i].y * zoom + panY);
        }
        ctx.strokeStyle = isSelected ? '#2563eb' : wallStyle.stroke;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();
        // Wall outline (offset parallel lines — dashed for some types)
        ctx.strokeStyle = isSelected ? '#93c5fd' : wallStyle.fill;
        ctx.lineWidth = 1;
        var _wallStyle_dash;
        ctx.setLineDash((_wallStyle_dash = wallStyle.dash) !== null && _wallStyle_dash !== void 0 ? _wallStyle_dash : []);
        ctx.stroke();
        ctx.setLineDash([]);
        // Hover highlight for non-selected walls
        if (isHovered && !isSelected) {
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(wall.centerline[0].x * zoom + panX, wall.centerline[0].y * zoom + panY);
            for(let i = 1; i < wall.centerline.length; i++){
                ctx.lineTo(wall.centerline[i].x * zoom + panX, wall.centerline[i].y * zoom + panY);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        // Panel markers
        const dists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["polylineCumulativeDistances"])(wall.centerline);
        var _dists_;
        const wallLength = (_dists_ = dists[dists.length - 1]) !== null && _dists_ !== void 0 ? _dists_ : 0;
        // Draw panel boundaries
        if (wall.panels.length > 0) {
            for (const panel of wall.panels){
                const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["pointAtDistance"])(wall.centerline, panel.position);
                const end = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["pointAtDistance"])(wall.centerline, panel.position + panel.width);
                if (start && end) {
                    // Small marker at panel start
                    ctx.fillStyle = '#6366f1';
                    ctx.beginPath();
                    ctx.arc(start.x * zoom + panX, start.y * zoom + panY, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        // Wall label
        const midIdx = Math.floor(wall.centerline.length / 2);
        const mid = wall.centerline[midIdx];
        ctx.fillStyle = '#333';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText(wall.name, mid.x * zoom + panX + 4, mid.y * zoom + panY - 4);
        // Wall length
        const startPt = wall.centerline[0];
        const endPt = wall.centerline[wall.centerline.length - 1];
        const dx = endPt.x - startPt.x;
        const dy = endPt.y - startPt.y;
        const lenFt = Math.sqrt(dx * dx + dy * dy);
        ctx.fillStyle = '#666';
        ctx.font = '9px monospace';
        const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(lenFt * 12);
        ctx.fillText(label, mid.x * zoom + panX + 4, mid.y * zoom + panY + 10);
    }
    // Canvas mouse handlers
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[handleMouseDown]": (e)=>{
            console.log('[PlanView] mouseDown', {
                toolMode: toolModeRef.current,
                clientX: e.clientX,
                clientY: e.clientY
            });
            isPanningRef.current = false;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const worldX = (x - viewport.panX) / viewport.zoom;
            const worldY = (y - viewport.panY) / viewport.zoom;
            if (toolModeRef.current === 'pan') {
                isPanningRef.current = true;
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
            } else if (toolModeRef.current === 'draw-wall') {
                isDrawingRef.current = true;
                drawingPointsRef.current = [
                    {
                        x: worldX,
                        y: worldY
                    }
                ];
                selectWall(null);
            } else if (toolModeRef.current === 'select') {
                // Hit test walls
                for (const level of project.building.levels){
                    for (const wall of level.walls){
                        for(let i = 1; i < wall.centerline.length; i++){
                            const p1 = wall.centerline[i - 1];
                            const p2 = wall.centerline[i];
                            const dx = p2.x - p1.x;
                            const dy = p2.y - p1.y;
                            const lenSq = dx * dx + dy * dy;
                            if (lenSq === 0) continue;
                            const t = Math.max(0, Math.min(1, ((worldX - p1.x) * dx + (worldY - p1.y) * dy) / lenSq));
                            const nearest = {
                                x: p1.x + t * dx,
                                y: p1.y + t * dy
                            };
                            const dist = Math.hypot(worldX - nearest.x, worldY - nearest.y);
                            if (dist < 10 / viewport.zoom) {
                                selectWall(wall.id);
                                return;
                            }
                        }
                    }
                }
                selectWall(null);
            }
        }
    }["PlanView.useCallback[handleMouseDown]"], [
        toolMode,
        viewport,
        project,
        selectWall
    ]);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[handleMouseMove]": (e)=>{
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom;
                const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom;
                __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setCursorWorldPos({
                    x: worldX,
                    y: worldY
                });
            }
            if (!isPanningRef.current && !(toolModeRef.current === 'draw-wall' && isDrawingRef.current) && !(toolModeRef.current === 'select')) return;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (isPanningRef.current) {
                const dx = e.clientX - lastPosRef.current.x;
                const dy = e.clientY - lastPosRef.current.y;
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                setViewport({
                    panX: viewport.panX + dx,
                    panY: viewport.panY + dy
                });
            } else if (toolModeRef.current === 'select') {
                // Hover detection — find wall under cursor
                const rect = canvas.getBoundingClientRect();
                const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom;
                const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom;
                let found = null;
                for (const level of projectRef.current.building.levels){
                    for (const wall of level.walls){
                        for(let i = 1; i < wall.centerline.length; i++){
                            const p1 = wall.centerline[i - 1];
                            const p2 = wall.centerline[i];
                            const dx = p2.x - p1.x;
                            const dy = p2.y - p1.y;
                            const lenSq = dx * dx + dy * dy;
                            if (lenSq === 0) continue;
                            const t = Math.max(0, Math.min(1, ((worldX - p1.x) * dx + (worldY - p1.y) * dy) / lenSq));
                            const nearest = {
                                x: p1.x + t * dx,
                                y: p1.y + t * dy
                            };
                            const dist = Math.hypot(worldX - nearest.x, worldY - nearest.y);
                            if (dist < 10 / viewport.zoom) {
                                found = wall.id;
                                break;
                            }
                        }
                        if (found) break;
                    }
                    if (found) break;
                }
                if (found !== hoveredWallId) {
                    setHoveredWallId(found);
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = found ? 'pointer' : 'default';
                    }
                }
            } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
                const rect = canvas.getBoundingClientRect();
                const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom;
                const worldY = (e.clientY - rect.top - viewport.panY) / viewport.zoom;
                // Collect all existing wall endpoints for snapping
                const existingEndpoints = [];
                for (const level of projectRef.current.building.levels){
                    for (const wall of level.walls){
                        if (wall.centerline.length > 0) {
                            existingEndpoints.push(wall.centerline[0]);
                            existingEndpoints.push(wall.centerline[wall.centerline.length - 1]);
                        }
                    }
                }
                let snappedX = worldX;
                let snappedY = worldY;
                // 1. Snap to existing endpoints first (corner join)
                const endpointSnapResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapPoint"])({
                    x: snappedX,
                    y: snappedY
                }, existingEndpoints, 15 / viewport.zoom);
                if (endpointSnapResult.x !== snappedX || endpointSnapResult.y !== snappedY) {
                    snappedX = endpointSnapResult.x;
                    snappedY = endpointSnapResult.y;
                } else {
                    // 2. Ortho snap from last point
                    if (orthoEnabledRef.current && drawingPointsRef.current.length > 0) {
                        const last = drawingPointsRef.current[drawingPointsRef.current.length - 1];
                        const ortho = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orthoSnap"])({
                            x: snappedX,
                            y: snappedY
                        }, last);
                        snappedX = ortho.x;
                        snappedY = ortho.y;
                    }
                }
                // 3. Grid snap always runs last if enabled (independent of ortho)
                if (snapEnabledRef.current) {
                    const gridSize = 1 / 12 // 1 inch in feet
                    ;
                    snappedX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gridSnap"])(snappedX, gridSize);
                    snappedY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gridSnap"])(snappedY, gridSize);
                }
                // Apply shift lock to ortho if shift is held
                if (shiftHeldRef.current && orthoEnabledRef.current) {
                    const last = drawingPointsRef.current[drawingPointsRef.current.length - 1];
                    if (last) {
                        const ortho = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$lib$2f$snapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orthoSnap"])({
                            x: snappedX,
                            y: snappedY
                        }, last);
                        snappedX = ortho.x;
                        snappedY = ortho.y;
                    }
                }
                const pts = drawingPointsRef.current;
                if (pts.length > 0) {
                    const last = pts[pts.length - 1];
                    const dx = snappedX - last.x;
                    const dy = snappedY - last.y;
                    if (Math.hypot(dx, dy) > 1 / viewport.zoom) {
                        drawingPointsRef.current = [
                            ...pts,
                            {
                                x: snappedX,
                                y: snappedY
                            }
                        ];
                        draw();
                    }
                }
            }
        }
    }["PlanView.useCallback[handleMouseMove]"], [
        toolMode,
        viewport,
        setViewport,
        draw
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[handleMouseUp]": (e)=>{
            console.log('[PlanView] mouseUp', {
                toolMode: toolModeRef.current,
                isDrawing: isDrawingRef.current,
                pts: drawingPointsRef.current.length
            });
            if (isPanningRef.current) {
                isPanningRef.current = false;
            } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
                const pts = drawingPointsRef.current;
                if (pts.length >= 2) {
                    var _nanoid, _this;
                    var _nanoid1;
                    const wallId = (_nanoid1 = (_nanoid = (_this = Math).nanoid) === null || _nanoid === void 0 ? void 0 : _nanoid.call(_this)) !== null && _nanoid1 !== void 0 ? _nanoid1 : "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 9));
                    addWall({
                        id: wallId,
                        name: "Wall ".concat(Date.now().toString(36).slice(-4).toUpperCase()),
                        centerline: pts,
                        height: 96,
                        wallType: 'exterior',
                        panels: [],
                        openings: [],
                        modules: []
                    });
                }
                isDrawingRef.current = false;
                drawingPointsRef.current = [];
                draw();
            }
        }
    }["PlanView.useCallback[handleMouseUp]"], [
        toolMode,
        addWall,
        draw
    ]);
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[handleWheel]": (e)=>{
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.zoom * zoomFactor));
            // Zoom toward mouse position
            const newPanX = mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom);
            const newPanY = mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom);
            setViewport({
                zoom: newZoom,
                panX: newPanX,
                panY: newPanY
            });
        }
    }["PlanView.useCallback[handleWheel]"], [
        viewport,
        setViewport
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanView.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const resize = {
                "PlanView.useEffect.resize": ()=>{
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;
                    draw();
                }
            }["PlanView.useEffect.resize"];
            resize();
            window.addEventListener('resize', resize);
            return ({
                "PlanView.useEffect": ()=>window.removeEventListener('resize', resize)
            })["PlanView.useEffect"];
        }
    }["PlanView.useEffect"], [
        draw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanView.useEffect": ()=>{
            draw();
        }
    }["PlanView.useEffect"], [
        draw
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanView.useEffect": ()=>{
            const handleKeyDown = {
                "PlanView.useEffect.handleKeyDown": (e)=>{
                    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().undo();
                    }
                    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'z' && e.shiftKey)) {
                        e.preventDefault();
                        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().redo();
                    }
                }
            }["PlanView.useEffect.handleKeyDown"];
            const handleShiftKey = {
                "PlanView.useEffect.handleShiftKey": (e)=>{
                    shiftHeldRef.current = e.key === 'Shift';
                }
            }["PlanView.useEffect.handleShiftKey"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleShiftKey);
            window.addEventListener('keydown', handleShiftKey);
            return ({
                "PlanView.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleShiftKey);
                    window.removeEventListener('keydown', handleShiftKey);
                }
            })["PlanView.useEffect"];
        }
    }["PlanView.useEffect"], []);
    // Keyboard shortcuts for tools
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanView.useEffect": ()=>{
            const handleToolKey = {
                "PlanView.useEffect.handleToolKey": (e)=>{
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                    switch(e.key.toLowerCase()){
                        case 'v':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setToolMode('select');
                            break;
                        case 'h':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setToolMode('pan');
                            break;
                        case 'w':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setToolMode('draw-wall');
                            break;
                        case 'o':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setToolMode('add-opening');
                            break;
                        case 'e':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setToolMode('edit-panel');
                            break;
                        case 'g':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().toggleSnap();
                            break;
                        case 'r':
                            __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().toggleOrtho();
                            break;
                    }
                }
            }["PlanView.useEffect.handleToolKey"];
            window.addEventListener('keydown', handleToolKey);
            return ({
                "PlanView.useEffect": ()=>window.removeEventListener('keydown', handleToolKey)
            })["PlanView.useEffect"];
        }
    }["PlanView.useEffect"], []);
    var _containerRef_current_offsetWidth, _containerRef_current_offsetHeight;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "flex-1 relative overflow-hidden",
        style: {
            backgroundColor: '#fafafa'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute cursor-crosshair",
                style: {
                    backgroundColor: 'transparent',
                    zIndex: 2,
                    left: rulerSize,
                    top: rulerSize
                },
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().setCursorWorldPos(null),
                onWheel: handleWheel
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 496,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$RulerOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                viewport: viewport,
                width: (_containerRef_current_offsetWidth = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.offsetWidth) !== null && _containerRef_current_offsetWidth !== void 0 ? _containerRef_current_offsetWidth : 800,
                height: (_containerRef_current_offsetHeight = (_containerRef_current1 = containerRef.current) === null || _containerRef_current1 === void 0 ? void 0 : _containerRef_current1.offsetHeight) !== null && _containerRef_current_offsetHeight !== void 0 ? _containerRef_current_offsetHeight : 600
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 508,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600",
                children: [
                    Math.round(viewport.zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 515,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
        lineNumber: 495,
        columnNumber: 5
    }, this);
}
_s(PlanView, "JwLHw2dxvzTIvwyZYFa5HpQsSCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = PlanView;
var _c;
__turbopack_context__.k.register(_c, "PlanView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ElevationView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const GRID_SIZE = 12;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;
function ElevationView() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { project, viewport, setViewport, selectedWallId, selectedPanelId, toolMode, selectWall, selectPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const isPanningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const draggingPanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boxSelectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedWall = (()=>{
        for (const level of project.building.levels){
            const w = level.walls.find((w)=>w.id === selectedWallId);
            if (w) return w;
        }
        return null;
    })();
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[draw]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const { width, height } = canvas;
            const { panX, panY, zoom } = viewport;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0, 0, width, height);
            // Grid
            ctx.strokeStyle = '#e5e5e5';
            ctx.lineWidth = 0.5;
            const gridH = GRID_SIZE * zoom;
            const startY = panY % gridH;
            for(let y = startY; y < height; y += gridH){
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            // Height markers
            ctx.fillStyle = '#999';
            ctx.font = '9px monospace';
            for(let y = startY; y < height; y += gridH * 12){
                const ft = Math.round((y - panY) / gridH);
                ctx.fillText("".concat(ft, "'"), 4, y - 2);
            }
            if (!selectedWall) {
                ctx.fillStyle = '#666';
                ctx.font = '14px system-ui';
                ctx.fillText('Select a wall to view elevation', width / 2 - 120, height / 2);
                return;
            }
            // Draw elevation of selected wall
            drawElevation(ctx, selectedWall, viewport, selectedPanelId, width, height);
            // Draw box selection
            if (boxSelectRef.current) {
                const canvas = canvasRef.current;
                if (canvas) {
                    const rect = canvas.getBoundingClientRect();
                    const startX = boxSelectRef.current.startX - rect.left;
                    const startY = boxSelectRef.current.startY - rect.top;
                    const curX = lastPosRef.current.x;
                    const curY = lastPosRef.current.y;
                    ctx.strokeStyle = boxSelectRef.current.mode === 'window' ? '#00d4ff' : '#ffd93d';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([
                        4,
                        4
                    ]);
                    ctx.strokeRect(startX, startY, curX - startX, curY - startY);
                    ctx.setLineDash([]);
                }
            }
        }
    }["ElevationView.useCallback[draw]"], [
        project,
        viewport,
        selectedWallId,
        selectedPanelId
    ]);
    function drawElevation(ctx, wall, vp, selectedPanelId, canvasWidth, canvasHeight) {
        const { panX, panY, zoom } = vp;
        const wallH = wall.height;
        const wallW = 600 // display width in pixels at zoom 1
        ;
        const baseY = canvasHeight / 2 + wallH * zoom / 2;
        const leftX = 100;
        // Ground line
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(leftX - 20, baseY);
        ctx.lineTo(leftX + wallW * zoom + 20, baseY);
        ctx.stroke();
        // Wall outline
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(leftX, baseY - wallH * zoom, wallW * zoom, wallH * zoom);
        // Panel rendering
        for (const panel of wall.panels){
            const px = leftX + panel.position * zoom;
            const pw = panel.width * zoom;
            const ph = panel.height * zoom;
            const isSelected = panel.id === selectedPanelId;
            // Panel fill
            ctx.fillStyle = isSelected ? 'rgba(255,217,61,0.15)' : 'rgba(200,200,200,0.1)';
            ctx.fillRect(px, baseY - ph, pw, ph);
            // Layer stack visualization (simplified)
            let layerY = baseY - ph;
            for (const layer of panel.layerStack){
                const layerH = layer.thickness * zoom;
                const colors = {
                    sheathing: '#c4b5a0',
                    cladding: '#8b7355',
                    insulation: '#fde68a',
                    'vapor-barrier': '#93c5fd80',
                    drywall: '#ffffff'
                };
                var _colors_layer_role;
                ctx.fillStyle = (_colors_layer_role = colors[layer.role]) !== null && _colors_layer_role !== void 0 ? _colors_layer_role : '#ddd';
                ctx.fillRect(px, layerY, pw, Math.max(1, layerH));
                layerY += layerH;
            }
            // Panel border
            ctx.strokeStyle = isSelected ? '#ffd93d' : '#999';
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.strokeRect(px, baseY - ph, pw, ph);
            // Studs (simplified as vertical lines)
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 0.5;
            for (const stud of panel.framingModel.studs){
                const sx = px + stud.position * zoom;
                if (sx >= px && sx <= px + pw) {
                    ctx.beginPath();
                    ctx.moveTo(sx, baseY);
                    ctx.lineTo(sx, baseY - ph);
                    ctx.stroke();
                }
            }
            // Panel label
            ctx.fillStyle = '#333';
            ctx.font = '10px system-ui';
            ctx.fillText(panel.name, px + 2, baseY - 4);
        }
        // Height dimension
        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 11px monospace';
        ctx.fillText((0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(wallH), leftX + wallW * zoom + 8, baseY - wallH * zoom / 2);
        // Wall name
        ctx.fillStyle = '#333';
        ctx.font = 'bold 13px system-ui';
        ctx.fillText("".concat(wall.name, " — Elevation"), leftX, baseY - wallH * zoom - 10);
    }
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseDown]": (e)=>{
            if (toolMode === 'pan') {
                isPanningRef.current = true;
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                return;
            }
            if (toolMode === 'select' && selectedWall) {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const rect = canvas.getBoundingClientRect();
                const worldX = (e.clientX - rect.left - viewport.panX) / viewport.zoom;
                // Hit test panels
                const leftX = 100;
                for (const panel of selectedWall.panels){
                    const panelLeft = leftX + panel.position * viewport.zoom;
                    const panelRight = panelLeft + panel.width * viewport.zoom;
                    if (worldX >= panelLeft && worldX <= panelRight) {
                        selectPanel(panel.id);
                        // Start panel drag
                        draggingPanelRef.current = {
                            panelId: panel.id,
                            startX: e.clientX,
                            origPosition: panel.position
                        };
                        return;
                    }
                }
                // No panel hit — start box selection
                selectPanel(null);
                boxSelectRef.current = {
                    startX: e.clientX,
                    startY: e.clientY,
                    mode: e.shiftKey ? 'crossing' : 'window'
                };
            }
        }
    }["ElevationView.useCallback[handleMouseDown]"], [
        toolMode,
        selectedWall,
        viewport,
        selectPanel
    ]);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseMove]": (e)=>{
            if (isPanningRef.current) {
                const dx = e.clientX - lastPosRef.current.x;
                const dy = e.clientY - lastPosRef.current.y;
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                setViewport({
                    panX: viewport.panX + dx,
                    panY: viewport.panY + dy
                });
                return;
            }
            // Panel dragging
            if (draggingPanelRef.current && selectedWall && selectedWallId) {
                const dx = e.clientX - draggingPanelRef.current.startX;
                const movementFeet = dx / viewport.zoom;
                const newPosition = Math.max(0, draggingPanelRef.current.origPosition + movementFeet);
                // Update panel position live in store
                const store = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState();
                store.updatePanel(selectedWallId, draggingPanelRef.current.panelId, {
                    position: newPosition
                });
            }
            // Box selection rendering (live update of selection box)
            if (boxSelectRef.current) {
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                draw();
            }
        }
    }["ElevationView.useCallback[handleMouseMove]"], [
        viewport,
        setViewport,
        selectedWall,
        selectedWallId,
        draw
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseUp]": (e)=>{
            isPanningRef.current = false;
            if (draggingPanelRef.current) {
                draggingPanelRef.current = null;
            }
            if (boxSelectRef.current) {
                // Perform box selection on panels
                if (selectedWall && selectedWallId) {
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const rect = canvas.getBoundingClientRect();
                    const startX = Math.min(boxSelectRef.current.startX, e.clientX);
                    const endX = Math.max(boxSelectRef.current.startX, e.clientX);
                    const startWorldX = (startX - rect.left - viewport.panX) / viewport.zoom;
                    const endWorldX = (endX - rect.left - viewport.panX) / viewport.zoom;
                    const leftX = 100;
                    for (const panel of selectedWall.panels){
                        const panelLeft = leftX + panel.position * viewport.zoom;
                        const panelRight = panelLeft + panel.width * viewport.zoom;
                        let selected = false;
                        if (boxSelectRef.current.mode === 'window') {
                            // Window select: panel must be fully inside box
                            selected = panelLeft >= startWorldX && panelRight <= endWorldX;
                        } else {
                            // Crossing select: any intersection
                            selected = panelLeft <= endWorldX && panelRight >= startWorldX;
                        }
                        if (selected) {
                            selectPanel(panel.id);
                            break;
                        }
                    }
                }
                boxSelectRef.current = null;
                draw();
            }
        }
    }["ElevationView.useCallback[handleMouseUp]"], [
        selectedWall,
        selectedWallId,
        viewport,
        selectPanel,
        draw
    ]);
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleWheel]": (e)=>{
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.zoom * zoomFactor));
            const newPanX = mouseX - (mouseX - viewport.panX) * (newZoom / viewport.zoom);
            const newPanY = mouseY - (mouseY - viewport.panY) * (newZoom / viewport.zoom);
            setViewport({
                zoom: newZoom,
                panX: newPanX,
                panY: newPanY
            });
        }
    }["ElevationView.useCallback[handleWheel]"], [
        viewport,
        setViewport
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ElevationView.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const resize = {
                "ElevationView.useEffect.resize": ()=>{
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;
                    draw();
                }
            }["ElevationView.useEffect.resize"];
            resize();
            window.addEventListener('resize', resize);
            return ({
                "ElevationView.useEffect": ()=>window.removeEventListener('resize', resize)
            })["ElevationView.useEffect"];
        }
    }["ElevationView.useEffect"], [
        draw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ElevationView.useEffect": ()=>{
            draw();
        }
    }["ElevationView.useEffect"], [
        draw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative overflow-hidden bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 w-full h-full",
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onWheel: handleWheel
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600",
                children: [
                    Math.round(viewport.zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s(ElevationView, "yRxdo/w610Iqll6XiTuD12KvfFE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = ElevationView;
var _c;
__turbopack_context__.k.register(_c, "ElevationView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreeDView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * ThreeDView — 3D viewport using react-three-fiber + leva controls
 * React 19 compatible via dynamic import of R3F components.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Dynamic import to avoid SSR issues with Three.js
const Scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-400 text-sm",
                children: "Loading 3D scene..."
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = Scene;
function ThreeDView() {
    _s();
    const { project, selectedWallId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const wallCount = project.building.levels.reduce((s, l)=>s + l.walls.length, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative overflow-hidden bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {}, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 left-3 text-white text-xs opacity-60 pointer-events-none",
                children: [
                    wallCount,
                    " wall",
                    wallCount !== 1 ? 's' : '',
                    " in project",
                    selectedWallId && " · wall selected"
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(ThreeDView, "eAtnfYLwaHC9YKXD8N7OAV5tFb4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c1 = ThreeDView;
var _c, _c1;
__turbopack_context__.k.register(_c, "Scene");
__turbopack_context__.k.register(_c1, "ThreeDView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FloatingPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function FloatingPanel(param) {
    let { title, accentColor, defaultX = 20, defaultY = 80, width = 180, children, onClose } = param;
    _s();
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: defaultX,
        y: defaultY
    });
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeDragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FloatingPanel.useCallback[onMouseDown]": (e)=>{
            if (e.target.closest('.close-btn')) return;
            e.preventDefault();
            setIsDragging(true);
            dragRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                origX: pos.x,
                origY: pos.y
            };
            const onMouseMove = {
                "FloatingPanel.useCallback[onMouseDown].onMouseMove": (me)=>{
                    if (!dragRef.current) return;
                    const dx = me.clientX - dragRef.current.startX;
                    const dy = me.clientY - dragRef.current.startY;
                    setPos({
                        x: dragRef.current.origX + dx,
                        y: dragRef.current.origY + dy
                    });
                }
            }["FloatingPanel.useCallback[onMouseDown].onMouseMove"];
            const onMouseUp = {
                "FloatingPanel.useCallback[onMouseDown].onMouseUp": ()=>{
                    setIsDragging(false);
                    dragRef.current = null;
                    activeDragRef.current = null;
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                }
            }["FloatingPanel.useCallback[onMouseDown].onMouseUp"];
            activeDragRef.current = {
                onMouseMove,
                onMouseUp
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    }["FloatingPanel.useCallback[onMouseDown]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingPanel.useEffect": ()=>{
            return ({
                "FloatingPanel.useEffect": ()=>{
                    if (activeDragRef.current) {
                        window.removeEventListener('mousemove', activeDragRef.current.onMouseMove);
                        window.removeEventListener('mouseup', activeDragRef.current.onMouseUp);
                        activeDragRef.current = null;
                    }
                }
            })["FloatingPanel.useEffect"];
        }
    }["FloatingPanel.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "floating-panel ".concat(isDragging ? 'dragging' : ''),
        style: {
            left: pos.x,
            top: pos.y,
            width,
            '--accent-color': accentColor,
            zIndex: isDragging ? 150 : 100
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "title-bar",
                onMouseDown: onMouseDown,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "close-btn",
                        onClick: onClose,
                        style: {
                            color: accentColor
                        },
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-body",
                style: {
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(FloatingPanel, "PadiC03iZJg3aNTE4/DXbo3bPvc=");
_c = FloatingPanel;
var _c;
__turbopack_context__.k.register(_c, "FloatingPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as PenLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/door-open.js [app-client] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$top$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelTop$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/panel-top.js [app-client] (ecmascript) <export default as PanelTop>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TOOLS = [
    {
        mode: 'select',
        label: 'Select',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"],
        shortcut: 'V'
    },
    {
        mode: 'pan',
        label: 'Pan',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"],
        shortcut: 'H'
    },
    {
        mode: 'draw-wall',
        label: 'Draw Wall',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__["PenLine"],
        shortcut: 'W'
    },
    {
        mode: 'add-opening',
        label: 'Add Opening',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"],
        shortcut: 'O'
    },
    {
        mode: 'edit-panel',
        label: 'Edit Panel',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$top$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelTop$3e$__["PanelTop"],
        shortcut: 'E'
    }
];
function ToolsPanel() {
    _s();
    const toolMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ToolsPanel.useFRMXStore[toolMode]": (s)=>s.toolMode
    }["ToolsPanel.useFRMXStore[toolMode]"]);
    const setToolMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ToolsPanel.useFRMXStore[setToolMode]": (s)=>s.setToolMode
    }["ToolsPanel.useFRMXStore[setToolMode]"]);
    const togglePanelVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ToolsPanel.useFRMXStore[togglePanelVisible]": (s)=>s.togglePanelVisible
    }["ToolsPanel.useFRMXStore[togglePanelVisible]"]);
    const setShowShortcutLegend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ToolsPanel.useFRMXStore[setShowShortcutLegend]": (s)=>s.setShowShortcutLegend
    }["ToolsPanel.useFRMXStore[setShowShortcutLegend]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1",
        children: [
            TOOLS.map((param)=>{
                let { mode, label, icon: Icon, shortcut } = param;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setToolMode(mode),
                    className: "tool-btn ".concat(toolMode === mode ? 'active' : ''),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "shortcut",
                            children: shortcut
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, mode, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 1,
                    background: 'rgba(255,255,255,0.1)',
                    margin: '4px 0'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>togglePanelVisible('settings'),
                className: "tool-btn",
                style: {
                    fontSize: '11px',
                    opacity: 0.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '10px'
                        },
                        children: "⚙"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Settings"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>togglePanelVisible('history'),
                className: "tool-btn",
                style: {
                    fontSize: '11px',
                    opacity: 0.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '10px'
                        },
                        children: "↺"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "History"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 1,
                    background: 'rgba(255,255,255,0.1)',
                    margin: '4px 0'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowShortcutLegend(true),
                className: "tool-btn",
                style: {
                    fontSize: '11px',
                    opacity: 0.5,
                    justifyContent: 'center'
                },
                children: "?"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(ToolsPanel, "yO93L0Ph6nctgP0e9m2IHG7H0tI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = ToolsPanel;
var _c;
__turbopack_context__.k.register(_c, "ToolsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ViewPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const VIEWS = [
    {
        mode: 'plan',
        label: 'Plan',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        key: '1'
    },
    {
        mode: 'elevation',
        label: 'Elevation',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
        key: '2'
    },
    {
        mode: '3d',
        label: '3D',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"],
        key: '3'
    }
];
function ViewPanel() {
    _s();
    const viewMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ViewPanel.useFRMXStore[viewMode]": (s)=>s.viewMode
    }["ViewPanel.useFRMXStore[viewMode]"]);
    const setViewMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ViewPanel.useFRMXStore[setViewMode]": (s)=>s.setViewMode
    }["ViewPanel.useFRMXStore[setViewMode]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1",
        children: VIEWS.map((param)=>{
            let { mode, label, icon: Icon, key } = param;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setViewMode(mode),
                className: "tool-btn ".concat(viewMode === mode ? 'active' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shortcut",
                        style: {
                            opacity: 0.35
                        },
                        children: key
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                ]
            }, mode, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(ViewPanel, "Zqdp75P28mXB7Z4tMWTdYYe7XI0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = ViewPanel;
var _c;
__turbopack_context__.k.register(_c, "ViewPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/move.js [app-client] (ecmascript) <export default as Move>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SettingsPanel() {
    _s();
    const snapEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "SettingsPanel.useFRMXStore[snapEnabled]": (s)=>s.snapEnabled
    }["SettingsPanel.useFRMXStore[snapEnabled]"]);
    const orthoEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "SettingsPanel.useFRMXStore[orthoEnabled]": (s)=>s.orthoEnabled
    }["SettingsPanel.useFRMXStore[orthoEnabled]"]);
    const toggleSnap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "SettingsPanel.useFRMXStore[toggleSnap]": (s)=>s.toggleSnap
    }["SettingsPanel.useFRMXStore[toggleSnap]"]);
    const toggleOrtho = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "SettingsPanel.useFRMXStore[toggleOrtho]": (s)=>s.toggleOrtho
    }["SettingsPanel.useFRMXStore[toggleOrtho]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleSnap,
                className: "tool-btn ".concat(snapEnabled ? 'active' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"], {
                        size: 13
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Snap"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shortcut",
                        children: "G"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleOrtho,
                className: "tool-btn ".concat(orthoEnabled ? 'active' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__["Move"], {
                        size: 13
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Ortho"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shortcut",
                        children: "R"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "tool-btn",
                style: {
                    opacity: 0.5
                },
                onClick: ()=>{},
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                        size: 13
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Grid"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shortcut",
                        style: {
                            opacity: 0.35
                        },
                        children: "-"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "dN5rw2kULcQFlohJ0klJE9QHNOc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = SettingsPanel;
var _c;
__turbopack_context__.k.register(_c, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function HistoryPanel() {
    _s();
    const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[history]": (s)=>s.history
    }["HistoryPanel.useFRMXStore[history]"]);
    const historyIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[historyIndex]": (s)=>s.historyIndex
    }["HistoryPanel.useFRMXStore[historyIndex]"]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[undo]": (s)=>s.undo
    }["HistoryPanel.useFRMXStore[undo]"]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[redo]": (s)=>s.redo
    }["HistoryPanel.useFRMXStore[redo]"]);
    const canUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[canUndo]": (s)=>s.canUndo
    }["HistoryPanel.useFRMXStore[canUndo]"]);
    const canRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HistoryPanel.useFRMXStore[canRedo]": (s)=>s.canRedo
    }["HistoryPanel.useFRMXStore[canRedo]"]);
    const handleRestore = (index)=>{
        if (index < 0 || index >= history.length) return;
        const currentIdx = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().historyIndex;
        if (index === currentIdx) return;
        // If jumping back: undo until we reach the target index
        while(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState().historyIndex > index){
            undo();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: undo,
                        disabled: !canUndo(),
                        className: "tool-btn",
                        style: {
                            flex: 1,
                            justifyContent: 'center',
                            opacity: canUndo() ? 1 : 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '11px'
                                },
                                children: "Undo"
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shortcut",
                                children: "⌃Z"
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: redo,
                        disabled: !canRedo(),
                        className: "tool-btn",
                        style: {
                            flex: 1,
                            justifyContent: 'center',
                            opacity: canRedo() ? 1 : 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$525$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '11px'
                                },
                                children: "Redo"
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shortcut",
                                children: "⌃Y"
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxHeight: 200,
                    overflowY: 'auto',
                    fontSize: '11px'
                },
                children: [
                    history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: 'rgba(255,255,255,0.3)',
                            textAlign: 'center',
                            padding: '12px 0'
                        },
                        children: "No history yet"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    history.map((entry, i)=>{
                        const isCurrent = i === historyIndex;
                        const isFuture = i > historyIndex;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleRestore(i),
                            className: "tool-btn",
                            style: {
                                width: '100%',
                                justifyContent: 'flex-start',
                                opacity: isFuture ? 0.3 : 1,
                                borderColor: isCurrent ? 'rgba(199,125,255,0.4)' : 'transparent',
                                background: isCurrent ? 'rgba(199,125,255,0.08)' : 'transparent',
                                border: '1px solid'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '10px',
                                        color: isFuture ? 'rgba(255,255,255,0.2)' : isCurrent ? '#c77dff' : 'rgba(255,255,255,0.4)',
                                        minWidth: 16
                                    },
                                    children: i + 1
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '11px',
                                        flex: 1,
                                        textAlign: 'left'
                                    },
                                    children: entry.label
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, entry.id, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(HistoryPanel, "jCKhDrn2sOKPGFJyJL/R3ERu47g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = HistoryPanel;
var _c;
__turbopack_context__.k.register(_c, "HistoryPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HUDChips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function HUDChips() {
    _s();
    const toolMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HUDChips.useFRMXStore[toolMode]": (s)=>s.toolMode
    }["HUDChips.useFRMXStore[toolMode]"]);
    const snapEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HUDChips.useFRMXStore[snapEnabled]": (s)=>s.snapEnabled
    }["HUDChips.useFRMXStore[snapEnabled]"]);
    const orthoEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HUDChips.useFRMXStore[orthoEnabled]": (s)=>s.orthoEnabled
    }["HUDChips.useFRMXStore[orthoEnabled]"]);
    const cursorWorldPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "HUDChips.useFRMXStore[cursorWorldPos]": (s)=>s.cursorWorldPos
    }["HUDChips.useFRMXStore[cursorWorldPos]"]);
    const [drawDimension, setDrawDimension] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track drawing dimension via a ref to avoid re-renders
    const isDrawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const drawingPointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HUDChips.useEffect": ()=>{
            const handleKey = {
                "HUDChips.useEffect.handleKey": (e)=>{
                    if (e.key === 'w' || e.key === 'W') {
                        isDrawingRef.current = true;
                        drawingPointsRef.current = [];
                    }
                    if (e.key === 'Escape' || e.key === 'v' || e.key === 'V') {
                        isDrawingRef.current = false;
                        setDrawDimension(null);
                    }
                }
            }["HUDChips.useEffect.handleKey"];
            window.addEventListener('keydown', handleKey);
            return ({
                "HUDChips.useEffect": ()=>window.removeEventListener('keydown', handleKey)
            })["HUDChips.useEffect"];
        }
    }["HUDChips.useEffect"], []);
    // Live dimension chip — shown when draw-wall is active with 2+ points
    const showDimension = toolMode === 'draw-wall' && cursorWorldPos !== null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hud-chip tool",
                children: toolMode.replace('-', ' ')
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            (snapEnabled || orthoEnabled) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hud-chip snap",
                children: [
                    snapEnabled ? 'SNAP' : '',
                    orthoEnabled ? 'ORTHO' : ''
                ].filter(Boolean).join(' ')
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this),
            showDimension && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hud-chip dimension",
                children: drawDimension !== null && drawDimension !== void 0 ? drawDimension : '...'
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            cursorWorldPos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hud-chip coords",
                children: [
                    "X: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(cursorWorldPos.x * 12),
                    " Y: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(cursorWorldPos.y * 12)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(HUDChips, "Ue2swmaggfYASFu0UsoV8pNI+fo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = HUDChips;
var _c;
__turbopack_context__.k.register(_c, "HUDChips");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShortcutLegend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const SHORTCUTS = [
    {
        group: 'Tools',
        items: [
            {
                keys: 'V',
                desc: 'Select'
            },
            {
                keys: 'H',
                desc: 'Pan'
            },
            {
                keys: 'W',
                desc: 'Draw Wall'
            },
            {
                keys: 'O',
                desc: 'Add Opening'
            },
            {
                keys: 'E',
                desc: 'Edit Panel'
            }
        ]
    },
    {
        group: 'View',
        items: [
            {
                keys: '1',
                desc: 'Plan View'
            },
            {
                keys: '2',
                desc: 'Elevation View'
            },
            {
                keys: '3',
                desc: '3D View'
            }
        ]
    },
    {
        group: 'Snapping',
        items: [
            {
                keys: 'G',
                desc: 'Toggle Snap'
            },
            {
                keys: 'R',
                desc: 'Toggle Ortho'
            },
            {
                keys: 'Space (hold)',
                desc: 'Temporary Pan'
            },
            {
                keys: 'Shift (draw)',
                desc: 'Lock to Ortho'
            }
        ]
    },
    {
        group: 'Selection',
        items: [
            {
                keys: 'Esc',
                desc: 'Cancel / Deselect'
            },
            {
                keys: 'Delete',
                desc: 'Delete Selected'
            },
            {
                keys: '⌃Z',
                desc: 'Undo'
            },
            {
                keys: '⌃Y',
                desc: 'Redo'
            }
        ]
    },
    {
        group: 'Help',
        items: [
            {
                keys: '?',
                desc: 'This legend'
            }
        ]
    }
];
function ShortcutLegend() {
    _s();
    const showShortcutLegend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ShortcutLegend.useFRMXStore[showShortcutLegend]": (s)=>s.showShortcutLegend
    }["ShortcutLegend.useFRMXStore[showShortcutLegend]"]);
    const setShowShortcutLegend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "ShortcutLegend.useFRMXStore[setShowShortcutLegend]": (s)=>s.setShowShortcutLegend
    }["ShortcutLegend.useFRMXStore[setShowShortcutLegend]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShortcutLegend.useEffect": ()=>{
            const handleKey = {
                "ShortcutLegend.useEffect.handleKey": (e)=>{
                    if (e.key === 'Escape') {
                        setShowShortcutLegend(false);
                    }
                }
            }["ShortcutLegend.useEffect.handleKey"];
            window.addEventListener('keydown', handleKey);
            return ({
                "ShortcutLegend.useEffect": ()=>window.removeEventListener('keydown', handleKey)
            })["ShortcutLegend.useEffect"];
        }
    }["ShortcutLegend.useEffect"], [
        setShowShortcutLegend
    ]);
    if (!showShortcutLegend) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shortcut-legend",
        onClick: (e)=>{
            if (e.target === e.currentTarget) setShowShortcutLegend(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "legend-panel",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Keyboard Shortcuts"
                }, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                SHORTCUTS.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shortcut-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: group.group
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            group.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shortcut-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "desc",
                                            children: item.desc
                                        }, void 0, false, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "keys",
                                            children: item.keys
                                        }, void 0, false, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.keys, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, group.group, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(ShortcutLegend, "1hM4RhH5HrloQnXwFJ9yR6+QiPM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = ShortcutLegend;
var _c;
__turbopack_context__.k.register(_c, "ShortcutLegend");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Editor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PlanView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ElevationView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ThreeDView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$FloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/FloatingPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ToolsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/ToolsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ViewPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/ViewPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/SettingsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$HistoryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/HistoryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$HUDChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/HUDChips.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ShortcutLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ui/ShortcutLegend.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function Editor() {
    _s();
    const { viewMode, panelsVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const togglePanelVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "Editor.useFRMXStore[togglePanelVisible]": (s)=>s.togglePanelVisible
    }["Editor.useFRMXStore[togglePanelVisible]"]);
    // Global keyboard handlers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            const handleKeyDown = {
                "Editor.useEffect.handleKeyDown": (e)=>{
                    const store = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState();
                    // Escape — cancel draw or deselect
                    if (e.key === 'Escape') {
                        if (store.showShortcutLegend) {
                            store.setShowShortcutLegend(false);
                            return;
                        }
                        if (store.toolMode === 'draw-wall') {
                            store.setToolMode('select');
                            return;
                        }
                        store.selectWall(null);
                        store.selectPanel(null);
                    }
                    // Delete — delete selected wall
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                        if (store.selectedWallId) {
                            store.removeWall(store.selectedWallId);
                            store.selectWall(null);
                        }
                    }
                    // Space-to-pan
                    if (e.key === ' ' && !e.repeat) {
                        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                        store.setPreviousToolMode(store.toolMode);
                        store.setToolMode('pan');
                    }
                    // ? shortcut legend
                    if (e.key === '?') {
                        store.setShowShortcutLegend(true);
                    }
                    // 1/2/3 view switching
                    if (e.key === '1') {
                        store.setViewMode('plan');
                        return;
                    }
                    if (e.key === '2') {
                        store.setViewMode('elevation');
                        return;
                    }
                    if (e.key === '3') {
                        store.setViewMode('3d');
                        return;
                    }
                    // Tool shortcuts (V/H/W/O/E/G/R)
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                    switch(e.key.toLowerCase()){
                        case 'v':
                            store.setToolMode('select');
                            break;
                        case 'h':
                            store.setToolMode('pan');
                            break;
                        case 'w':
                            store.setToolMode('draw-wall');
                            break;
                        case 'o':
                            store.setToolMode('add-opening');
                            break;
                        case 'e':
                            store.setToolMode('edit-panel');
                            break;
                        case 'g':
                            store.toggleSnap();
                            break;
                        case 'r':
                            store.toggleOrtho();
                            break;
                    }
                    // Ctrl+Z / Ctrl+Y
                    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        store.undo();
                    }
                    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'z' && e.shiftKey)) {
                        e.preventDefault();
                        store.redo();
                    }
                }
            }["Editor.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "Editor.useEffect.handleKeyUp": (e)=>{
                    if (e.key === ' ') {
                        const store = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"].getState();
                        if (store.toolMode === 'pan' && store.previousToolMode !== null) {
                            store.setToolMode(store.previousToolMode);
                            store.setPreviousToolMode(null);
                        }
                    }
                }
            }["Editor.useEffect.handleKeyUp"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            return ({
                "Editor.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                }
            })["Editor.useEffect"];
        }
    }["Editor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col flex-1 overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col flex-1 relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative",
                        children: [
                            viewMode === 'plan' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PlanView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                lineNumber: 112,
                                columnNumber: 37
                            }, this),
                            viewMode === 'elevation' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ElevationView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                lineNumber: 113,
                                columnNumber: 42
                            }, this),
                            viewMode === '3d' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ThreeDView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                lineNumber: 114,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            panelsVisible.tools && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$FloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "TOOLS",
                accentColor: "var(--panel-cyan)",
                defaultX: 16,
                defaultY: 80,
                width: 170,
                onClose: ()=>togglePanelVisible('tools'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ToolsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this),
            panelsVisible.view && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$FloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "VIEW",
                accentColor: "var(--panel-pink)",
                defaultX: 16,
                defaultY: 300,
                width: 160,
                onClose: ()=>togglePanelVisible('view'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ViewPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            panelsVisible.settings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$FloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "SETTINGS",
                accentColor: "var(--panel-yellow)",
                defaultX: 200,
                defaultY: 80,
                width: 170,
                onClose: ()=>togglePanelVisible('settings'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            panelsVisible.history && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$FloatingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "HISTORY",
                accentColor: "var(--panel-magenta)",
                defaultX: 200,
                defaultY: 300,
                width: 200,
                onClose: ()=>togglePanelVisible('history'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$HistoryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$HUDChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$ShortcutLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(Editor, "5h513FJWkXwppBMtVDfMBfUm62g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = Editor;
var _c;
__turbopack_context__.k.register(_c, "Editor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=dev_may22_frmx_7458f3c6._.js.map