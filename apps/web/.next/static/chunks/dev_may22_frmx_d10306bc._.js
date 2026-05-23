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
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$13_$40$types$2b$react$40$19$2e$2$2e$15_react$40$19$2e$2$2e$6_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$6_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/zustand@5.0.13_@types+react@19.2.15_react@19.2.6_use-sync-external-store@1.6.0_react@19.2.6_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
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
const useFRMXStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$13_$40$types$2b$react$40$19$2e$2$2e$15_react$40$19$2e$2$2e$6_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$6_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
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
                historyIndex: -1
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const VIEW_MODES = [
    {
        mode: 'plan',
        label: 'Plan',
        icon: '▣'
    },
    {
        mode: 'elevation',
        label: 'Elevation',
        icon: '▤'
    },
    {
        mode: '3d',
        label: '3D',
        icon: '◇'
    }
];
const TOOLS = [
    {
        mode: 'select',
        label: 'Select',
        icon: '↖'
    },
    {
        mode: 'pan',
        label: 'Pan',
        icon: '✋'
    },
    {
        mode: 'draw-wall',
        label: 'Draw Wall',
        icon: '╱'
    },
    {
        mode: 'add-opening',
        label: 'Add Opening',
        icon: '▭'
    },
    {
        mode: 'edit-panel',
        label: 'Edit Panel',
        icon: '✎'
    }
];
function Toolbar() {
    _s();
    const { viewMode, toolMode, setViewMode, setToolMode, project, undo, redo, canUndo, canRedo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-bold text-sm mr-4",
                children: "FRMX"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mr-4",
                children: VIEW_MODES.map((param)=>{
                    let { mode, label, icon } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setViewMode(mode),
                        className: "px-3 py-1.5 text-xs rounded ".concat(viewMode === mode ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-1",
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            label
                        ]
                    }, mode, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mr-4",
                children: TOOLS.map((param)=>{
                    let { mode, label, icon } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setToolMode(mode),
                        className: "px-3 py-1.5 text-xs rounded ".concat(toolMode === mode ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-1",
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            label
                        ]
                    }, mode, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-6 bg-gray-300 mx-2"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: undo,
                disabled: !canUndo(),
                className: "px-3 py-1.5 text-xs rounded bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40",
                children: "↩ Undo"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: redo,
                disabled: !canRedo(),
                className: "px-3 py-1.5 text-xs rounded bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40",
                children: "↪ Redo"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto text-xs text-gray-600",
                children: project.name
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Toolbar.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(Toolbar, "IdSRpkui0F8UUWDg3DhrJ5jqfGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = Toolbar;
var _c;
__turbopack_context__.k.register(_c, "Toolbar");
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
"[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/geometry/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
console.log('[PlanView] module loaded');
const GRID_SIZE = 3 // 3px per foot = 1/4" = 1' architectural scale
;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;
function PlanView() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { project, viewport, setViewport, selectedWallId, selectWall, viewMode, toolMode, addWall } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const isPanningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    // Wall drawing state
    const isDrawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const drawingPointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Use refs for values that come from store to avoid stale closure issues
    const toolModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(toolMode);
    toolModeRef.current = toolMode;
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
                    drawWall(ctx, wall, viewport, isSelected);
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
            // Draw dimension labels
            ctx.fillStyle = '#333';
            ctx.font = '10px system-ui';
            for (const level of project.building.levels){
                for (const wall of level.walls){
                    drawWallDimensions(ctx, wall, viewport);
                }
            }
        }
    }["PlanView.useCallback[draw]"], [
        project,
        viewport,
        selectedWallId
    ]);
    function drawWall(ctx, wall, vp, isSelected) {
        if (wall.centerline.length < 2) return;
        const { panX, panY, zoom } = vp;
        // Wall centerline path
        ctx.beginPath();
        ctx.moveTo(wall.centerline[0].x * zoom + panX, wall.centerline[0].y * zoom + panY);
        for(let i = 1; i < wall.centerline.length; i++){
            ctx.lineTo(wall.centerline[i].x * zoom + panX, wall.centerline[i].y * zoom + panY);
        }
        ctx.strokeStyle = isSelected ? '#2563eb' : '#666';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();
        // Wall outline (offset from centerline)
        const offset = 0.5 * zoom // 6 inches = 0.5ft
        ;
        // Draw parallel lines offset from centerline
        ctx.strokeStyle = isSelected ? '#93c5fd' : '#aaa';
        ctx.lineWidth = 1;
        ctx.setLineDash([
            4,
            4
        ]);
        ctx.stroke();
        ctx.setLineDash([]);
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
    function drawWallDimensions(ctx, wall, vp) {
    // Already drawn in main draw function
    }
    // Canvas mouse handlers
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanView.useCallback[handleMouseMove]": (e)=>{
            if (!isPanningRef.current && !(toolModeRef.current === 'draw-wall' && isDrawingRef.current)) return;
            const canvas = canvasRef.current;
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
            } else if (toolModeRef.current === 'draw-wall' && isDrawingRef.current) {
                const worldX = (x - viewport.panX) / viewport.zoom;
                const worldY = (y - viewport.panY) / viewport.zoom;
                const pts = drawingPointsRef.current;
                if (pts.length > 0) {
                    const last = pts[pts.length - 1];
                    const dx = worldX - last.x;
                    const dy = worldY - last.y;
                    if (Math.hypot(dx, dy) > 1 / viewport.zoom) {
                        drawingPointsRef.current = [
                            ...pts,
                            {
                                x: worldX,
                                y: worldY
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
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanView.useEffect": ()=>{
            draw();
        }
    }["PlanView.useEffect"], [
        draw
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "PlanView.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["PlanView.useEffect"];
        }
    }["PlanView.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative overflow-hidden",
        style: {
            backgroundColor: '#fffbe6'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "planview-test-btn",
                onClick: ()=>console.log('[PlanView] test button clicked!'),
                style: {
                    position: 'absolute',
                    top: 4,
                    right: 160,
                    zIndex: 999,
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                },
                children: "CLICK ME TEST"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#f0fff0',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#2563eb',
                    pointerEvents: 'none'
                },
                children: "CANVAS AREA"
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 w-full h-full cursor-crosshair",
                style: {
                    backgroundColor: 'transparent',
                    zIndex: 2
                },
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onWheel: handleWheel
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600",
                children: [
                    Math.round(viewport.zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs font-mono text-gray-600",
                children: [
                    "pan: ",
                    Math.round(viewport.panX),
                    ", ",
                    Math.round(viewport.panY)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_s(PlanView, "7y2QSk8RRfJU4EpbM48uNlGalTQ=", false, function() {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { project, viewport, setViewport, selectedWallId, selectedPanelId, toolMode, selectWall, selectPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const isPanningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const selectedWall = (()=>{
        for (const level of project.building.levels){
            const w = level.walls.find((w)=>w.id === selectedWallId);
            if (w) return w;
        }
        return null;
    })();
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
            ctx.fillStyle = isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(200,200,200,0.1)';
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
            ctx.strokeStyle = isSelected ? '#6366f1' : '#999';
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
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseDown]": (e)=>{
            if (toolMode === 'pan') {
                isPanningRef.current = true;
                lastPosRef.current = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        }
    }["ElevationView.useCallback[handleMouseDown]"], []);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseMove]": (e)=>{
            if (!isPanningRef.current) return;
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
        }
    }["ElevationView.useCallback[handleMouseMove]"], [
        viewport,
        setViewport
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ElevationView.useCallback[handleMouseUp]": ()=>{
            isPanningRef.current = false;
        }
    }["ElevationView.useCallback[handleMouseUp]"], []);
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ElevationView.useEffect": ()=>{
            draw();
        }
    }["ElevationView.useEffect"], [
        draw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative overflow-hidden bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 w-full h-full",
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onWheel: handleWheel
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600",
                children: [
                    Math.round(viewport.zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(ElevationView, "q1jtZZIUUE8CXT6VWYdWlKYA+kE=", false, function() {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ThreeDView() {
    _s();
    const { project, selectedWallId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const wallCount = project.building.levels.reduce((s, l)=>s + l.walls.length, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative overflow-hidden bg-gray-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold mb-2",
                        children: "3D View"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm",
                        children: [
                            wallCount,
                            " walls in project"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-xs mt-4",
                        children: "react-three-fiber requires additional configuration for React 19"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(ThreeDView, "eAtnfYLwaHC9YKXD8N7OAV5tFb4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = ThreeDView;
var _c;
__turbopack_context__.k.register(_c, "ThreeDView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/DimensionInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DimensionInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DimensionInput(param) {
    let { value, onChange, label, placeholder = "10'-6\"", className = '', allowNegative = false } = param;
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [focused, setFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Show formatted dim when not focused
    const displayValue = focused ? text : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(value);
    const handleFocus = ()=>{
        setFocused(true);
        setText((0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(value));
    };
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DimensionInput.useCallback[handleBlur]": ()=>{
            setFocused(false);
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLengthString"])(text);
            if (!isNaN(parsed) && parsed >= 0) {
                onChange(parsed);
            }
            setText('');
        }
    }["DimensionInput.useCallback[handleBlur]"], [
        text,
        onChange
    ]);
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            var _inputRef_current;
            (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.blur();
        }
        if (e.key === 'Escape') {
            setFocused(false);
            setText('');
        }
    };
    // Sync when external value changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DimensionInput.useEffect": ()=>{
            if (!focused) {
                setText((0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(value));
            }
        }
    }["DimensionInput.useEffect"], [
        value,
        focused
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-0.5 ".concat(className),
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-xs text-gray-500 font-medium",
                children: label
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/DimensionInput.tsx",
                lineNumber: 67,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "text",
                value: displayValue,
                onChange: (e)=>setText(e.target.value),
                onFocus: handleFocus,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                placeholder: placeholder,
                className: "w-full px-2 py-1 text-xs font-mono border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white",
                style: {
                    minWidth: 80
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/components/DimensionInput.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/DimensionInput.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(DimensionInput, "xdVi902BGeKH8cepRbRVb5A8fOU=");
_c = DimensionInput;
var _c;
__turbopack_context__.k.register(_c, "DimensionInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PropertiesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$DimensionInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/DimensionInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/calculator/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PropertiesPanel() {
    _s();
    const { project, selectedWallId, selectedPanelId, updateWall, updatePanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const selectedWall = (()=>{
        if (!selectedWallId) return null;
        for (const level of project.building.levels){
            const w = level.walls.find((w)=>w.id === selectedWallId);
            if (w) return w;
        }
        return null;
    })();
    const selectedPanel = (()=>{
        if (!selectedWall || !selectedPanelId) return null;
        var _selectedWall_panels_find;
        return (_selectedWall_panels_find = selectedWall.panels.find((p)=>p.id === selectedPanelId)) !== null && _selectedWall_panels_find !== void 0 ? _selectedWall_panels_find : null;
    })();
    if (!selectedWall) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-64 border-l border-gray-300 bg-gray-50 p-4 flex items-center justify-center text-xs text-gray-500",
            children: "Select a wall or panel to view properties"
        }, void 0, false, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-64 border-l border-gray-300 bg-gray-50 overflow-y-auto",
        style: {
            maxHeight: 'calc(100vh - 40px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xs font-bold text-gray-700 uppercase tracking-wide mb-3",
                    children: [
                        selectedPanel ? 'Panel' : 'Wall',
                        " Properties"
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-xs text-gray-600 font-medium",
                            children: "Name"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: selectedWall.name,
                            onChange: (e)=>updateWall(selectedWall.id, {
                                    name: e.target.value
                                }),
                            className: "w-full px-2 py-1 text-xs border border-gray-300 rounded mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-xs text-gray-600 font-medium",
                            children: "Height"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$DimensionInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            value: selectedWall.height,
                            onChange: (v)=>updateWall(selectedWall.id, {
                                    height: v
                                })
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-xs text-gray-600 font-medium",
                            children: "Wall Type"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: selectedWall.wallType,
                            onChange: (e)=>updateWall(selectedWall.id, {
                                    wallType: e.target.value
                                }),
                            className: "w-full px-2 py-1 text-xs border border-gray-300 rounded mt-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "exterior",
                                    children: "Exterior"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "interior",
                                    children: "Interior Partition"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "demising",
                                    children: "Demising"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 text-xs text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: "Openings:"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        " ",
                        selectedWall.openings.length,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: "Panels:"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        " ",
                        selectedWall.panels.length
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                selectedPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-gray-300 pt-3 mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-xs font-bold text-gray-700 mb-2",
                            children: selectedPanel.name
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs text-gray-600 font-medium",
                                    children: "Width"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$DimensionInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: selectedPanel.width,
                                    onChange: (v)=>updatePanel(selectedWall.id, selectedPanel.id, {
                                            width: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs text-gray-600 font-medium",
                                    children: "Height"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$DimensionInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: selectedPanel.height,
                                    onChange: (v)=>updatePanel(selectedWall.id, selectedPanel.id, {
                                            height: v
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                    className: "text-xs font-medium text-gray-600 mb-1",
                                    children: "Layer Stack"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-0.5",
                                    children: selectedPanel.layerStack.map((layer, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-xs py-0.5 px-1 bg-white rounded border border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full flex-shrink-0",
                                                    style: {
                                                        backgroundColor: layer.role === 'sheathing' ? '#c4b5a0' : layer.role === 'cladding' ? '#8b7355' : layer.role === 'insulation' ? '#fde68a' : layer.role === 'vapor-barrier' ? '#93c5fd' : layer.role === 'drywall' ? '#ffffff' : '#ddd'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex-1 truncate text-gray-700",
                                                    children: layer.name
                                                }, void 0, false, {
                                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-400 text-[10px]",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(layer.thickness)
                                                }, void 0, false, {
                                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, layer.id, true, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                    className: "text-xs font-medium text-gray-600 mb-1",
                                    children: "Framing"
                                }, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 space-y-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Studs: ",
                                                selectedPanel.framingModel.studs.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Headers: ",
                                                selectedPanel.framingModel.headers.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Cripples: ",
                                                selectedPanel.framingModel.cripples.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this),
                selectedWall.openings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-gray-300 pt-3 mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-xs font-bold text-gray-700 mb-2",
                            children: "Openings"
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: selectedWall.openings.map((opening)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white border border-gray-200 rounded p-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium capitalize",
                                            children: opening.type
                                        }, void 0, false, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(opening.roughOpeningWidth),
                                                " × ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$calculator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDim"])(opening.roughOpeningHeight)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, opening.id, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                                    lineNumber: 138,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(PropertiesPanel, "BTC/fOslCcjuivYtXoVh3gG/y94=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
_c = PropertiesPanel;
var _c;
__turbopack_context__.k.register(_c, "PropertiesPanel");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PlanView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/PlanView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ElevationView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ElevationView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ThreeDView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/ThreeDView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/components/PropertiesPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Editor() {
    _s();
    const { viewMode, selectedWallId, selectedPanelId, project } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    const selectedWall = (()=>{
        if (!selectedWallId) return null;
        for (const level of project.building.levels){
            const w = level.walls.find((w)=>w.id === selectedWallId);
            if (w) return w;
        }
        return null;
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col flex-1 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col flex-1 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 relative",
                            children: [
                                viewMode === 'plan' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PlanView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 27,
                                    columnNumber: 37
                                }, this),
                                viewMode === 'elevation' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ElevationView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 28,
                                    columnNumber: 42
                                }, this),
                                viewMode === '3d' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$ThreeDView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 29,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 bg-gray-100 border-t border-gray-300 flex items-center px-4 text-xs text-gray-600",
                            children: [
                                viewMode === 'plan' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Plan View — ",
                                        project.building.levels.reduce((s, l)=>s + l.walls.length, 0),
                                        " walls"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                viewMode === 'elevation' && selectedWall && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Elevation: ",
                                        selectedWall.name,
                                        " — ",
                                        selectedWall.panels.length,
                                        " panels"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                viewMode === '3d' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "3D View — ",
                                        project.building.levels.reduce((s, l)=>s + l.walls.length, 0),
                                        " walls rendered"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                (selectedWallId || selectedPanelId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
                    lineNumber: 47,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/components/Editor.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Editor, "iIfrwcxMBYFmtNiQeqsEj75Grfg=", false, function() {
    return [
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

//# sourceMappingURL=dev_may22_frmx_d10306bc._.js.map