import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@frmx/calculator', '@frmx/core', '@frmx/geometry', '@frmx/framing-engine', '@frmx/panelizer', '@frmx/layers', '@frmx/modules', '@frmx/materials', '@frmx/reports', '@frmx/project-io'],
}

export default nextConfig