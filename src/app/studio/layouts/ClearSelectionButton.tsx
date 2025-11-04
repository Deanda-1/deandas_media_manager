'use client'

import { useTransition } from 'react'

export default function ClearSelectionButton() {
  const [pending, start] = useTransition()

  return (
    <button
      type="button"
      onClick={() =>
        start(async () => {
          try {
            await fetch('/api/studio/site-settings/about-image', { method: 'DELETE' })
            window.location.reload()
          } catch (e) {
            console.error('Failed to clear about image', e)
            alert('Failed to clear selection')
          }
        })
      }
      disabled={pending}
      className="inline-flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {pending ? 'Clearing…' : 'Clear Selection'}
    </button>
  )
}
