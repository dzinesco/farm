import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@frmx/calculator', '@frmx/core', '@frmx/geometry', '@frmx/framing-engine', '@frmx/panelizer', '@frmx/layers', '@frmx/modules', '@frmx/materials', '@frmx/reports', '@frmx/project-io'],
  eslint: {
    // ESLint is disabled per CLAUDE.md — re-enable with proper ESLint 9 flat config when needed
    ignoreDuringBuilds: true,
  },
}

export default nextConfig