'use client'

import { useState, useTransition } from 'react'

export default function AddAboutSectionForm() {
  const [heading, setHeading] = useState('')
  const [text, setText] = useState('')
  const [pending, start] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!text.trim()) {
          alert('Please enter some text for the section')
          return
        }
        start(async () => {
          try {
            const res = await fetch('/api/studio/site-settings/text', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ addExtraSection: { heading: heading || undefined, text } }),
            })
            if (!res.ok) throw new Error('Failed to add section')
            window.location.reload()
          } catch (err) {
            console.error(err)
            alert('Failed to add section')
          }
        })
      }}
      className="space-y-3"
    >
      <div className="text-sm font-medium text-gray-900">Add New Section</div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heading (optional)</label>
        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-1 w-full max-w-xl rounded border border-gray-300 px-3 py-2 text-sm"
          placeholder="Section heading"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 w-full max-w-2xl rounded border border-gray-300 px-3 py-2 text-sm min-h-[120px]"
          placeholder="Section text"
          required
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? 'Adding…' : 'Add Section'}
      </button>
    </form>
  )
}
