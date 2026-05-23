import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FRMX — Prefab Wall Panel Design',
  description: 'Browser-based design tool for residential prefab wall panels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}