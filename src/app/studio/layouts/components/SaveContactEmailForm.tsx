'use client'

import { useState, useTransition } from 'react'

export default function SaveContactEmailForm({
  currentEmail,
}: {
  currentEmail?: string | null
}) {
  const [email, setEmail] = useState(currentEmail || '')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const response = await fetch('/api/studio/site-settings/text', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactEmail: email,
        }),
      })

      if (response.ok) {
        alert('Contact email updated successfully!')
        window.location.reload()
      } else {
        alert('Failed to update contact email')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email Address
        </label>
        <input
          id="contactEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">This email will receive messages from the contact form on the About page.</p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Save Contact Email'}
      </button>
    </form>
  )
}
