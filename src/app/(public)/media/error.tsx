'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Error in /media page:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
  <p className="text-gray-600 mb-6">We couldn&apos;t load the media library. Please try again.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
        {error?.digest && (
          <p className="mt-4 text-xs text-gray-400">Error digest: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
