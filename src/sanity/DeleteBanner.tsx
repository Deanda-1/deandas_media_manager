'use client'

import {useState} from 'react'
import {useClient, useFormValue} from 'sanity'
import {Button, Card, Stack, Text} from '@sanity/ui'
import {apiVersion} from './env'

export default function DeleteBanner() {
  const client = useClient({apiVersion})
  const idValue = useFormValue(['_id']) as string | undefined
  const typeValue = useFormValue(['_type']) as string | undefined
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!idValue) return
    const baseId = idValue.replace(/^drafts\./, '')
    const ok = window.confirm(
      `Delete this ${typeValue ?? 'document'} permanently? This cannot be undone.`
    )
    if (!ok) return
    setIsDeleting(true)
    try {
      await Promise.allSettled([
        client.delete(baseId),
        client.delete(`drafts.${baseId}`),
      ])
      // Go back to the list
      window.history.back()
    } catch (err) {
      console.error('Delete failed', err)
      alert('Failed to delete document')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card padding={4} radius={2} tone="critical" shadow={1}>
      <Stack space={3}>
        <Text weight="semibold">Danger zone</Text>
        <Text size={1} muted>
          Delete this document from the dataset. This action cannot be undone.
        </Text>
        <Button
          tone="critical"
          onClick={handleDelete}
          disabled={!idValue || isDeleting}
          loading={isDeleting}
          text={isDeleting ? 'Deleting…' : 'Delete document'}
        />
      </Stack>
    </Card>
  )
}
