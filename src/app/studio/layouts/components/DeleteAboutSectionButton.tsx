'use client'

import { useTransition } from 'react'

export default function DeleteAboutSectionButton({ sectionKey }: { sectionKey: string }) {
  const [pending, start] = useTransition()

  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm('Delete this section?')) return
        start(async () => {
          try {
            const res = await fetch('/api/studio/site-settings/text', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ deleteExtraSectionKey: sectionKey }),
            })
            if (!res.ok) throw new Error('Failed to delete')
            window.location.reload()
          } catch (err) {
            console.error(err)
            alert('Failed to delete section')
          }
        })
      }}
      className="text-sm text-red-600 hover:text-red-700"
      disabled={pending}
      title="Delete section"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}
