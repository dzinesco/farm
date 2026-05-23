import { defineConfig } from 'tsup'

export default defineConfig({
  external: ['@frmx/calculator', '@frmx/core', '@frmx/geometry', '@frmx/layers', '@frmx/framing-engine', '@frmx/panelizer', '@frmx/modules', '@frmx/materials', '@frmx/reports'],
  shims: false,
})