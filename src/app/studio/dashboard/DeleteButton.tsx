'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  title: string
  cascade?: boolean
}

export function DeleteButton({ id, title, cascade = false }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/studio/delete?id=${id}&cascade=${cascade ? 'true' : 'false'}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      // Refresh the page to update the dashboard
      router.refresh()
      setShowConfirm(false)
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete item. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">Delete &ldquo;{title}&rdquo;?</span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50 hover:border-red-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete
    </button>
  )
}
