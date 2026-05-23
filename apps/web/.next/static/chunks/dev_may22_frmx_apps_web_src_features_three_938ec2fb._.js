(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/dev/may22/frmx/apps/web/src/features/three/utils/wallToGeometry.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @frmx/three utils — wall geometry conversion helpers
 * Re-exports and extends @frmx/geometry for 3D rendering needs.
 */ __turbopack_context__.s([
    "buildSegmentFrame",
    ()=>buildSegmentFrame,
    "centerlineToSegments",
    ()=>centerlineToSegments,
    "wallToWorldCoords",
    ()=>wallToWorldCoords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/packages/geometry/dist/index.mjs [app-client] (ecmascript) <locals>");
;
;
;
function centerlineToSegments(centerline) {
    if (centerline.length < 2) return [];
    const segments = [];
    for(let i = 0; i < centerline.length - 1; i++){
        const start = centerline[i];
        const end = centerline[i + 1];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["vec2Distance"])(start, end);
        const direction = length > 0 ? {
            x: dx / length,
            y: dy / length
        } : {
            x: 0,
            y: 0
        };
        const normal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$packages$2f$geometry$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["vec2PerpCW"])(direction);
        segments.push({
            start,
            end,
            length,
            direction,
            normal
        });
    }
    return segments;
}
function buildSegmentFrame(segment) {
    return {
        origin: {
            x: segment.start.x,
            y: segment.start.y,
            z: 0
        },
        direction: {
            x: segment.direction.x,
            y: segment.direction.y,
            z: 0
        },
        normal: {
            x: segment.normal.x,
            y: segment.normal.y,
            z: 0
        }
    };
}
function wallToWorldCoords(frame, distAlong, offset, height) {
    return [
        frame.origin.x + frame.direction.x * distAlong + frame.normal.x * offset,
        frame.origin.y + frame.direction.y * distAlong + frame.normal.y * offset,
        height
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useWalls3D.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useWalls3D — transform FRMX wall data into 3D-ready render props
 */ __turbopack_context__.s([
    "useWalls3D",
    ()=>useWalls3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/utils/wallToGeometry.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
;
function useWalls3D() {
    _s();
    const project = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "useWalls3D.useFRMXStore[project]": (s)=>s.project
    }["useWalls3D.useFRMXStore[project]"]);
    const walls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWalls3D.useMemo[walls]": ()=>{
            const result = [];
            for (const level of project.building.levels){
                for (const wall of level.walls){
                    var _firstPanel_framingModel;
                    const segments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["centerlineToSegments"])(wall.centerline);
                    const wallHeight = wall.height / 12 // inches → feet
                    ;
                    // Get stud positions from framing model
                    const studPositions = [];
                    const firstPanel = wall.panels[0];
                    if (firstPanel === null || firstPanel === void 0 ? void 0 : (_firstPanel_framingModel = firstPanel.framingModel) === null || _firstPanel_framingModel === void 0 ? void 0 : _firstPanel_framingModel.studs) {
                        for (const stud of firstPanel.framingModel.studs){
                            if (stud.type === 'full') {
                                // position is in inches along wall — convert to feet
                                studPositions.push(stud.position / 12);
                            }
                        }
                    } else {
                        // Fallback: generate studs at 16" intervals
                        for (const seg of segments){
                            const spacing = 16 / 12 // feet
                            ;
                            const count = Math.floor(seg.length / spacing);
                            for(let i = 0; i <= count; i++){
                                const t = i / Math.max(count, 1);
                                const distAlong = seg.length * t;
                                // Accumulate distance for multi-segment walls
                                const existing = studPositions[studPositions.length - 1];
                                const lastDist = existing !== null && existing !== void 0 ? existing : 0;
                                studPositions.push(lastDist + distAlong);
                            }
                        }
                    }
                    // Get openings for this wall
                    const wallOpenings = wall.openings.map({
                        "useWalls3D.useMemo[walls].wallOpenings": (op)=>({
                                id: op.id,
                                type: op.type,
                                position: op.position / 12,
                                width: op.roughOpeningWidth / 12,
                                height: op.roughOpeningHeight / 12
                            })
                    }["useWalls3D.useMemo[walls].wallOpenings"]);
                    for (const seg of segments){
                        const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildSegmentFrame"])(seg);
                        var _firstPanel_layerStack_map;
                        // Build layer offsets with color coding
                        const layerOffsets = (_firstPanel_layerStack_map = firstPanel === null || firstPanel === void 0 ? void 0 : firstPanel.layerStack.map({
                            "useWalls3D.useMemo[walls]": (layer)=>({
                                    id: layer.id,
                                    offsetFromFace: 0,
                                    thickness: layer.thickness / 12,
                                    color: roleToColor(layer.role)
                                })
                        }["useWalls3D.useMemo[walls]"])) !== null && _firstPanel_layerStack_map !== void 0 ? _firstPanel_layerStack_map : [];
                        // Filter openings that fall within this segment
                        const segStart = 0 // simplified — segment start distance
                        ;
                        const segEnd = seg.length;
                        const segmentOpenings = wallOpenings.filter({
                            "useWalls3D.useMemo[walls].segmentOpenings": (op)=>{
                                // Rough check: opening center within segment
                                return op.position >= segStart - 0.5 && op.position <= segEnd + 0.5;
                            }
                        }["useWalls3D.useMemo[walls].segmentOpenings"]);
                        result.push({
                            id: wall.id,
                            start: [
                                seg.start.x,
                                seg.start.y,
                                0
                            ],
                            end: [
                                seg.end.x,
                                seg.end.y,
                                0
                            ],
                            direction: [
                                seg.direction.x,
                                seg.direction.y,
                                0
                            ],
                            normal: [
                                seg.normal.x,
                                seg.normal.y,
                                0
                            ],
                            length: seg.length,
                            height: wallHeight,
                            layerOffsets,
                            studPositions,
                            openingPositions: segmentOpenings
                        });
                    }
                }
            }
            return result;
        }
    }["useWalls3D.useMemo[walls]"], [
        project.building.levels
    ]);
    return walls;
}
_s(useWalls3D, "ZcJJc8+Hs24coWjTBL/mgzuPL9I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
function roleToColor(role) {
    switch(role){
        case 'sheathing':
            return '#c8b89a';
        case 'cladding':
            return '#8b7355';
        case 'drywall':
            return '#faf5f0';
        case 'insulation':
            return '#e8d4a8';
        case 'vapor-barrier':
            return '#c8e8f8';
        case 'air-gap':
            return 'transparent';
        default:
            return '#d4c4a8';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useKeyboardShortcuts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useKeyboardShortcuts — global keyboard shortcuts for 3D viewport
 * Manages camera view presets and escape-to-reset selection.
 */ __turbopack_context__.s([
    "useKeyboardShortcuts",
    ()=>useKeyboardShortcuts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useKeyboardShortcuts() {
    _s();
    const { setViewMode, selectWall, selectedWallId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useKeyboardShortcuts.useEffect": ()=>{
            const handleKeyDown = {
                "useKeyboardShortcuts.useEffect.handleKeyDown": (e)=>{
                    // Only handle when no input is focused
                    const target = e.target;
                    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
                    switch(e.key){
                        case 'Escape':
                            // Deselect wall in 3D
                            if (selectedWallId) {
                                selectWall(null);
                            }
                            break;
                        case '1':
                            // Top-down view
                            setViewMode('plan');
                            break;
                        case '2':
                            // Elevation view
                            setViewMode('elevation');
                            break;
                        case '3':
                            // 3D view
                            setViewMode('3d');
                            break;
                        case 'g':
                        case 'G':
                            break;
                        case 'r':
                        case 'R':
                            break;
                    }
                }
            }["useKeyboardShortcuts.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "useKeyboardShortcuts.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["useKeyboardShortcuts.useEffect"];
        }
    }["useKeyboardShortcuts.useEffect"], [
        setViewMode,
        selectWall,
        selectedWallId
    ]);
}
_s(useKeyboardShortcuts, "lOnkqnL+zQIdsJvAE/KUCAzfeOM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useCameraPresets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCameraPresets",
    ()=>useCameraPresets
]);
/**
 * useCameraPresets — Top / Perspective / Walkthrough camera presets
 * Used by Scene.tsx to allow quick camera switching via LEVA controls.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const PRESETS = {
    top: {
        position: [
            0,
            0,
            50
        ],
        target: [
            0,
            0,
            0
        ],
        fov: 50,
        orthographic: true
    },
    perspective: {
        position: [
            30,
            30,
            30
        ],
        target: [
            0,
            0,
            0
        ],
        fov: 50,
        orthographic: false
    },
    walkthrough: {
        position: [
            0,
            5,
            10
        ],
        target: [
            0,
            5,
            0
        ],
        fov: 75,
        orthographic: false
    }
};
function useCameraPresets(controlsRef) {
    _s();
    const applyPreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCameraPresets.useCallback[applyPreset]": (preset)=>{
            const controls = controlsRef.current;
            if (!controls) return;
            const state = PRESETS[preset];
            controls.object.position.set(...state.position);
            controls.target.set(...state.target);
            controls.update();
        }
    }["useCameraPresets.useCallback[applyPreset]"], [
        controlsRef
    ]);
    return {
        applyPreset,
        presets: PRESETS
    };
}
_s(useCameraPresets, "vyPEWMsx2+gX76BHEedS65GWINc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/utils/materials.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * materials — THREE.js material definitions for 3D rendering
 * All materials are shared (useMemo) to avoid per-instance duplication.
 */ __turbopack_context__.s([
    "CONCRETE_MATERIAL",
    ()=>CONCRETE_MATERIAL,
    "DRYWALL_MATERIAL",
    ()=>DRYWALL_MATERIAL,
    "EXTERIOR_SHEATHING_MATERIAL",
    ()=>EXTERIOR_SHEATHING_MATERIAL,
    "FLOOR_MATERIAL",
    ()=>FLOOR_MATERIAL,
    "GLASS_MATERIAL",
    ()=>GLASS_MATERIAL,
    "HEADER_MATERIAL",
    ()=>HEADER_MATERIAL,
    "STUD_MATERIAL",
    ()=>STUD_MATERIAL,
    "disposeMaterial",
    ()=>disposeMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const DRYWALL_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0xfaf5f0,
    roughness: 0.9,
    metalness: 0
});
const EXTERIOR_SHEATHING_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0xc8b89a,
    roughness: 0.85,
    metalness: 0
});
const STUD_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0xdeb887,
    roughness: 0.8,
    metalness: 0
});
const HEADER_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0xb8860b,
    roughness: 0.75,
    metalness: 0
});
const GLASS_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0x88c8e8,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.4
});
const FLOOR_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0x8b7355,
    roughness: 0.7,
    metalness: 0
});
const CONCRETE_MATERIAL = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
    color: 0x808080,
    roughness: 0.95,
    metalness: 0
});
function disposeMaterial(mat) {
    if (Array.isArray(mat)) {
        mat.forEach((m)=>m.dispose());
    } else {
        mat.dispose();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Wall3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildWallMesh",
    ()=>buildWallMesh,
    "default",
    ()=>Wall3D
]);
/**
 * Wall3D — render a single wall segment with layer stack visualization
 * Uses THREE.js directly with instanced studs and proper disposal.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/utils/wallToGeometry.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/utils/materials.ts [app-client] (ecmascript)");
'use client';
;
;
;
// Convert color string to THREE.Color
const colorCache = new Map();
function getColor(hex) {
    if (!colorCache.has(hex)) {
        colorCache.set(hex, new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](hex));
    }
    return colorCache.get(hex);
}
/**
 * Build a box mesh for a wall layer.
 */ function buildLayerMesh(origin, direction, normal, length, offset, height, thickness, color) {
    const position = origin.clone().add(direction.clone().multiplyScalar(length / 2)).add(normal.clone().multiplyScalar(offset + thickness / 2));
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](length, thickness, height);
    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: getColor(color),
        roughness: 0.85,
        metalness: 0
    });
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
    mesh.position.copy(position);
    return mesh;
}
/**
 * Build studs using InstancedMesh for performance.
 * Returns the InstancedMesh and a dispose function.
 */ function buildStudsInstanced(origin, direction, normal, wallLength, wallHeight, studPositions) {
    const studW = 1.5 / 12 // 1.5 inches in feet
    ;
    const studD = 3.5 / 12 // 3.5 inches in feet
    ;
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](studW, wallHeight, studD);
    const mat = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUD_MATERIAL"].clone();
    const count = studPositions.length;
    const instancedMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geo, mat, count);
    const matrix = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    for(let i = 0; i < count; i++){
        const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["wallToWorldCoords"])({
            origin: {
                x: origin.x,
                y: origin.y,
                z: 0
            },
            direction: {
                x: direction.x,
                y: direction.y,
                z: 0
            },
            normal: {
                x: normal.x,
                y: normal.y,
                z: 0
            }
        }, studPositions[i], wallLength / 2, wallHeight / 2);
        matrix.setPosition(pos[0], pos[1], pos[2]);
        instancedMesh.setMatrixAt(i, matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    const dispose = ()=>{
        geo.dispose();
        mat.dispose();
    };
    return {
        mesh: instancedMesh,
        dispose
    };
}
/**
 * Build selection outline mesh for a wall.
 */ function buildSelectionOutline(start, end, height) {
    const points = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](start[0], start[1], 0),
        new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](end[0], end[1], 0),
        new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](end[0], end[1], height),
        new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](start[0], start[1], height),
        new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](start[0], start[1], 0)
    ];
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
        color: 0x00aaff,
        linewidth: 2
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geo, mat);
}
function buildWallMesh(props) {
    const { segment, isSelected = false } = props;
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const disposables = [];
    // Origin at start of segment
    const origin = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](segment.start[0], segment.start[1], 0);
    const direction = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](segment.direction[0], segment.direction[1], 0);
    const normal = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](segment.normal[0], segment.normal[1], 0);
    // Build layer meshes
    let runningOffset = 0;
    for (const layer of segment.layerOffsets){
        const mesh = buildLayerMesh(origin, direction, normal, segment.length, runningOffset, segment.height, layer.thickness, layer.color);
        group.add(mesh);
        disposables.push({
            dispose: ()=>{
                mesh.geometry.dispose();
                mesh.material.dispose();
            }
        });
        runningOffset += layer.thickness;
    }
    // Build studs with InstancedMesh
    if (segment.studPositions && segment.studPositions.length > 0) {
        const { mesh: studMesh, dispose: disposeStuds } = buildStudsInstanced(origin, direction, normal, runningOffset, segment.height, segment.studPositions);
        group.add(studMesh);
        disposables.push({
            dispose: disposeStuds
        });
    }
    var _segment_openingPositions;
    // Build openings (windows as glass, doors as openings)
    for (const opening of (_segment_openingPositions = segment.openingPositions) !== null && _segment_openingPositions !== void 0 ? _segment_openingPositions : []){
        const windowGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](opening.width, 0.5, opening.height);
        const windowMat = __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$materials$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLASS_MATERIAL"].clone();
        const windowMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](windowGeo, windowMat);
        const windowPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$utils$2f$wallToGeometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["wallToWorldCoords"])({
            origin: {
                x: origin.x,
                y: origin.y,
                z: 0
            },
            direction: {
                x: direction.x,
                y: direction.y,
                z: 0
            },
            normal: {
                x: normal.x,
                y: normal.y,
                z: 0
            }
        }, opening.position, runningOffset / 2, segment.height - opening.height / 2);
        windowMesh.position.set(windowPos[0], windowPos[1], windowPos[2]);
        group.add(windowMesh);
        disposables.push({
            dispose: ()=>{
                windowGeo.dispose();
                windowMat.dispose();
            }
        });
    }
    // Build selection outline
    if (isSelected) {
        const outline = buildSelectionOutline(segment.start, segment.end, segment.height);
        group.add(outline);
        disposables.push({
            dispose: ()=>{
                outline.geometry.dispose();
                outline.material.dispose();
            }
        });
    }
    const dispose = ()=>{
        disposables.forEach((d)=>d.dispose());
    };
    return {
        group,
        dispose
    };
}
function Wall3D(_props) {
    // Placeholder — rendering happens in Scene via buildWallMesh
    return null;
}
_c = Wall3D;
var _c;
__turbopack_context__.k.register(_c, "Wall3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Ceiling3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCeilingMesh",
    ()=>buildCeilingMesh,
    "default",
    ()=>Ceiling3D
]);
/**
 * Ceiling3D — auto-generated ceiling plane from wall outlines
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
'use client';
;
function buildCeilingMesh(walls, height) {
    if (walls.length === 0) return null;
    const points = [];
    for (const wall of walls){
        points.push({
            x: wall.start[0],
            y: wall.start[1]
        });
        points.push({
            x: wall.end[0],
            y: wall.end[1]
        });
    }
    if (points.length < 3) return null;
    const xs = points.map((p)=>p.x);
    const ys = points.map((p)=>p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](maxX - minX, maxY - minY);
    geo.translate((minX + maxX) / 2, (minY + maxY) / 2, height);
    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xffffff,
        roughness: 0.9,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
    });
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
}
function Ceiling3D(_props) {
    // Placeholder — ceiling is built in Scene.tsx via buildCeilingMesh
    return null;
}
_c = Ceiling3D;
var _c;
__turbopack_context__.k.register(_c, "Ceiling3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @ts-nocheck
__turbopack_context__.s([
    "default",
    ()=>SceneContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * SceneContent — the actual R3F scene, isolated so R3F never loads on server.
 * Wrapped in dynamic() import so it only runs in the browser.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/@react-three+fiber@8.15.0_@types+react@19.2.15_react-dom@18.3.1_react@18.3.1__react@18.3.1_three@0.172.0/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/@react-three+drei@9.122.0_@react-three+fiber@8.15.0_@types+react@19.2.15_react-dom@18.3.1_rea_qiuvmy73gmnwydfvltksynjoci/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/@react-three+drei@9.122.0_@react-three+fiber@8.15.0_@types+react@19.2.15_react-dom@18.3.1_rea_qiuvmy73gmnwydfvltksynjoci/node_modules/@react-three/drei/core/Grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/@react-three+drei@9.122.0_@react-three+fiber@8.15.0_@types+react@19.2.15_react-dom@18.3.1_rea_qiuvmy73gmnwydfvltksynjoci/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/@react-three+drei@9.122.0_@react-three+fiber@8.15.0_@types+react@19.2.15_react-dom@18.3.1_rea_qiuvmy73gmnwydfvltksynjoci/node_modules/@react-three/drei/core/ContactShadows.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$leva$40$0$2e$10$2e$1_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$15_$5f40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3_owdyeahytyj6f35cqvkg5gkgue$2f$node_modules$2f$leva$2f$dist$2f$leva$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/leva@0.10.1_@types+react-dom@19.2.3_@types+react@19.2.15__@types+react@19.2.15_react-dom@18.3_owdyeahytyj6f35cqvkg5gkgue/node_modules/leva/dist/leva.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useWalls3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useWalls3D.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useKeyboardShortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useKeyboardShortcuts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useCameraPresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/hooks/useCameraPresets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$components$2f$Wall3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/components/Wall3D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$components$2f$Ceiling3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/components/Ceiling3D.tsx [app-client] (ecmascript)");
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
function SceneContent() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useKeyboardShortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardShortcuts"])();
    const wallSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useWalls3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalls3D"])();
    const selectedWallId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"])({
        "SceneContent.useFRMXStore[selectedWallId]": (s)=>s.selectedWallId
    }["SceneContent.useFRMXStore[selectedWallId]"]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { applyPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useCameraPresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCameraPresets"])(controlsRef);
    // Clean up OrbitControls when unmounting to prevent global event listener leak
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            return ({
                "SceneContent.useEffect": ()=>{
                    const controls = controlsRef.current;
                    if (controls) {
                        controls.enabled = false;
                        // Remove all event listeners from controls
                        if (controls.dispose) {
                            controls.dispose();
                        }
                    }
                }
            })["SceneContent.useEffect"];
        }
    }["SceneContent.useEffect"], []);
    const { showFloor, showCeiling, showGrid, shadows, cameraPreset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$leva$40$0$2e$10$2e$1_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$15_$5f40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3_owdyeahytyj6f35cqvkg5gkgue$2f$node_modules$2f$leva$2f$dist$2f$leva$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useControls"])('3D Controls', {
        showFloor: {
            value: true,
            label: 'Show Floor'
        },
        showCeiling: {
            value: false,
            label: 'Show Ceiling'
        },
        showGrid: {
            value: true,
            label: 'Show Grid'
        },
        shadows: {
            value: true,
            label: 'Shadows'
        },
        cameraPreset: {
            value: 'perspective',
            options: [
                'top',
                'perspective',
                'walkthrough'
            ],
            label: 'Camera'
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            applyPreset(cameraPreset);
        }
    }["SceneContent.useEffect"], [
        cameraPreset,
        applyPreset
    ]);
    const wallGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SceneContent.useMemo[wallGroups]": ()=>{
            const results = [];
            for (const seg of wallSegments){
                const buildResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$components$2f$Wall3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildWallMesh"])({
                    segment: seg,
                    isSelected: seg.id === selectedWallId
                });
                results.push({
                    id: seg.id,
                    buildResult
                });
            }
            return results;
        }
    }["SceneContent.useMemo[wallGroups]"], [
        wallSegments,
        selectedWallId
    ]);
    const ceilingMesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SceneContent.useMemo[ceilingMesh]": ()=>{
            if (!showCeiling) return null;
            const maxHeight = wallSegments.reduce({
                "SceneContent.useMemo[ceilingMesh].maxHeight": (max, w)=>Math.max(max, w.height)
            }["SceneContent.useMemo[ceilingMesh].maxHeight"], 0);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$components$2f$Ceiling3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCeilingMesh"])(wallSegments, maxHeight + 10);
        }
    }["SceneContent.useMemo[ceilingMesh]"], [
        wallSegments,
        showCeiling
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            return ({
                "SceneContent.useEffect": ()=>{
                    wallGroups.forEach({
                        "SceneContent.useEffect": (param)=>{
                            let { buildResult } = param;
                            buildResult.dispose();
                        }
                    }["SceneContent.useEffect"]);
                }
            })["SceneContent.useEffect"];
        }
    }["SceneContent.useEffect"], [
        wallGroups
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$leva$40$0$2e$10$2e$1_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$15_$5f40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3_owdyeahytyj6f35cqvkg5gkgue$2f$node_modules$2f$leva$2f$dist$2f$leva$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Leva"], {
                collapsed: false,
                titleBar: {
                    title: '3D Controls'
                }
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    position: [
                        20,
                        20,
                        20
                    ],
                    fov: 50
                },
                style: {
                    width: '100%',
                    height: '100%'
                },
                gl: {
                    antialias: true,
                    alpha: false
                },
                onCreated: (param)=>{
                    let { gl } = param;
                    gl.setClearColor('#1a1a1a');
                },
                onUnmount: ()=>{
                // Force cleanup of R3F internal state
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                        ref: controlsRef,
                        makeDefault: true,
                        enableDamping: true,
                        dampingFactor: 0.05,
                        minPolarAngle: 0,
                        maxPolarAngle: Math.PI / 2 + 0.1
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.6
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            50,
                            50,
                            50
                        ],
                        intensity: 1.2,
                        castShadow: shadows,
                        "shadow-mapSize": [
                            2048,
                            2048
                        ]
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Environment"], {
                        preset: "city"
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    showGrid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Grid"], {
                        position: [
                            0,
                            0,
                            0
                        ],
                        args: [
                            100,
                            100
                        ],
                        cellSize: 1,
                        cellThickness: 0.5,
                        cellColor: "#3a3a3a",
                        sectionSize: 10,
                        sectionThickness: 1,
                        sectionColor: "#5a5a5a",
                        fadeDistance: 100,
                        fadeStrength: 1,
                        infiniteGrid: true
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f40$react$2d$three$2b$drei$40$9$2e$122$2e$0_$40$react$2d$three$2b$fiber$40$8$2e$15$2e$0_$40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3$2e$1_rea_qiuvmy73gmnwydfvltksynjoci$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContactShadows"], {
                        position: [
                            0,
                            0,
                            0
                        ],
                        opacity: 0.4,
                        scale: 100,
                        blur: 2,
                        far: 50
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    showFloor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        rotation: [
                            -Math.PI / 2,
                            0,
                            0
                        ],
                        position: [
                            0,
                            0,
                            -0.01
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                                args: [
                                    200,
                                    200
                                ]
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#2a2a2a",
                                roughness: 1
                            }, void 0, false, {
                                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    ceilingMesh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                        object: ceilingMesh
                    }, void 0, false, {
                        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                        lineNumber: 153,
                        columnNumber: 25
                    }, this),
                    wallGroups.map((param)=>{
                        let { id, buildResult } = param;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                            object: buildResult.group
                        }, id, false, {
                            fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(SceneContent, "sRqS906XeKjtmLMzYNdEGs5Mcso=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useKeyboardShortcuts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardShortcuts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useWalls3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalls3D"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFRMXStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$apps$2f$web$2f$src$2f$features$2f$three$2f$hooks$2f$useCameraPresets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCameraPresets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$leva$40$0$2e$10$2e$1_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$15_$5f40$types$2b$react$40$19$2e$2$2e$15_react$2d$dom$40$18$2e$3_owdyeahytyj6f35cqvkg5gkgue$2f$node_modules$2f$leva$2f$dist$2f$leva$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useControls"]
    ];
});
_c = SceneContent;
var _c;
__turbopack_context__.k.register(_c, "SceneContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=dev_may22_frmx_apps_web_src_features_three_938ec2fb._.js.map