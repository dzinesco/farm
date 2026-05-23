import Toolbar from '@/components/Toolbar'
import Editor from '@/components/Editor'

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Toolbar />
      <Editor />
    </main>
  )
}