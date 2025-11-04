'use client'

import { useState, useTransition } from 'react'

export default function SaveAltForm({ currentAlt }: { currentAlt?: string }) {
  const [alt, setAlt] = useState(currentAlt || '')
  const [pending, start] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        start(async () => {
          try {
            await fetch('/api/studio/site-settings/about-image', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ alt }),
            })
            window.location.reload()
          } catch (e) {
            console.error('Failed to set alt text', e)
            alert('Failed to save alt text')
          }
        })
      }}
      className="mt-4 flex items-center gap-2"
    >
      <input
        name="alt"
        placeholder="Alt text (optional)"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        className="w-full max-w-md rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save Alt'}
      </button>
    </form>
  )
}
