(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Scene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Scene — client-only wrapper with mount guard.
 * R3F is imported only after React has fully hydrated.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dev/may22/frmx/node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// R3F components loaded only in browser after hydration
const Scene3D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene3D.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-sm",
                children: "Loading 3D renderer..."
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = Scene3D;
function Scene() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Scene.useEffect": ()=>{
            setMounted(true);
        }
    }["Scene.useEffect"], []);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center bg-gray-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-sm",
                children: "Initializing 3D..."
            }, void 0, false, {
                fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dev$2f$may22$2f$frmx$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene3D, {}, void 0, false, {
        fileName: "[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_s(Scene, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c1 = Scene;
var _c, _c1;
__turbopack_context__.k.register(_c, "Scene3D");
__turbopack_context__.k.register(_c1, "Scene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/dev/may22/frmx/apps/web/src/features/three/components/Scene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=dev_may22_frmx_apps_web_src_features_three_components_Scene_tsx_67449a0c._.js.map