'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'

export function ClearActivityButton({id, title}: {id: string; title: string}) {
  const [isClearing, setIsClearing] = useState(false)
  const router = useRouter()

  const handleClear = async () => {
    setIsClearing(true)
    try {
      const res = await fetch('/api/studio/activity/clear', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id}),
      })
      if (!res.ok) throw new Error('Failed to clear activity')
      router.refresh()
    } catch (err) {
      console.error('Clear activity failed', err)
      alert('Failed to clear activity entry. Please try again.')
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <button
      onClick={handleClear}
      disabled={isClearing}
      className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50"
      title={`Clear \"${title}\" from recent activity`}
    >
      {isClearing ? (
        <>
          <svg
            className="h-3.5 w-3.5 animate-spin text-indigo-600"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Clearing…
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </>
      )}
    </button>
  )
}
