/**
 * @frmx/project-io — serialize/deserialize, migrations, IndexedDB + .frmx.json
 */
import { createId } from '@frmx/core'
import { createDefaultProject } from '@frmx/core'

export interface SerializedProject {
  version: string
  data: unknown
}

export function serializeProject(project: unknown): SerializedProject {
  return {
    version: '1.0.0',
    data: project,
  }
}

export function deserializeProject(json: SerializedProject): unknown {
  if (json.version !== '1.0.0') {
    console.warn(`[project-io] Project version mismatch: expected 1.0.0, got ${json.version}. Migration not implemented.`)
  }
  return json.data
}

export async function saveToIndexedDB(key: string, project: unknown): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('frmx', 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore('projects', { keyPath: 'id' })
    }
    req.onsuccess = () => {
      const tx = req.result.transaction('projects', 'readwrite')
      tx.objectStore('projects').put({ id: key, project, updatedAt: Date.now() })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function loadFromIndexedDB(key: string): Promise<unknown | null> {
  if (typeof indexedDB === 'undefined') return null
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('frmx', 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore('projects', { keyPath: 'id' })
    }
    req.onsuccess = () => {
      const tx = req.result.transaction('projects', 'readonly')
      const getReq = tx.objectStore('projects').get(key)
      getReq.onsuccess = () => resolve(getReq.result?.project ?? null)
      getReq.onerror = () => reject(getReq.error)
    }
    req.onerror = () => reject(req.error)
  })
}

export function exportToJsonFile(project: unknown): string {
  return JSON.stringify(serializeProject(project), null, 2)
}

export function importFromJsonFile(json: string): unknown {
  return deserializeProject(JSON.parse(json) as SerializedProject)
}

export function createNewProject(name: string) {
  return createDefaultProject(name)
}