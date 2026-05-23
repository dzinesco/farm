import { defineConfig } from 'tsup'

export default defineConfig({
  external: ['@frmx/calculator', '@frmx/core', '@frmx/materials'],
  shims: false,
})