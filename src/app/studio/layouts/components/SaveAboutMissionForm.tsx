'use client'

import { useState, useTransition } from 'react'

export default function SaveAboutMissionForm({
  currentHeading,
  currentText,
}: {
  currentHeading?: string | null
  currentText?: string | null
}) {
  const [heading, setHeading] = useState(currentHeading || '')
  const [text, setText] = useState(currentText || '')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const response = await fetch('/api/studio/site-settings/text', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aboutMissionHeading: heading,
          aboutMissionText: text,
        }),
      })

      if (response.ok) {
        alert('Mission section updated successfully!')
        window.location.reload()
      } else {
        alert('Failed to update mission section')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
          Mission Heading
        </label>
        <input
          id="heading"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="e.g., Our Mission"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Mission Text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the mission statement..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Save Mission Section'}
      </button>
    </form>
  )
}
