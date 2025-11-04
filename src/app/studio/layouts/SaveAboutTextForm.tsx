'use client'

import { useState, useTransition } from 'react'

export default function SaveAboutTextForm({ currentTitle, currentDescription }: { currentTitle?: string; currentDescription?: string }) {
  const [title, setTitle] = useState(currentTitle || '')
  const [description, setDescription] = useState(currentDescription || '')
  const [pending, start] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        start(async () => {
          try {
            await fetch('/api/studio/site-settings/text', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, description }),
            })
            window.location.reload()
          } catch (e) {
            console.error('Failed to save text', e)
            alert('Failed to save')
          }
        })
      }}
      className="space-y-3"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full max-w-xl rounded border border-gray-300 px-3 py-2 text-sm"
          placeholder="Site title (used after 'About')"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full max-w-2xl rounded border border-gray-300 px-3 py-2 text-sm min-h-[120px]"
          placeholder="About page description"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save Text'}
        </button>
      </div>
    </form>
  )
}
