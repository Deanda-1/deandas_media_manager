'use client'

import { useTransition } from 'react'

export default function SelectButton({ mediaId }: { mediaId: string }) {
  const [pending, start] = useTransition()

  return (
    <button
      type="button"
      onClick={() =>
        start(async () => {
          try {
            await fetch('/api/studio/site-settings/about-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ mediaId }),
            })
            window.location.reload()
          } catch (e) {
            console.error('Failed to set about image', e)
            alert('Failed to set image')
          }
        })
      }
      disabled={pending}
      className="mt-2 inline-flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Use this image'}
    </button>
  )
}
