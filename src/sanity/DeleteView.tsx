'use client'

import {useState} from 'react'
import {useClient} from 'sanity'
import {Button, Card, Stack, Text} from '@sanity/ui'
import {apiVersion} from './env'

type DeleteViewProps = {
  documentId?: string
  schemaType?: string
}

export default function DeleteView(props: DeleteViewProps) {
  const client = useClient({apiVersion})
  const {documentId, schemaType} = props
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!documentId) return
    const confirm = window.confirm(
      `Delete this ${schemaType ?? 'document'} permanently? This cannot be undone.`
    )
    if (!confirm) return

    setIsDeleting(true)
    const baseId = documentId.replace(/^drafts\./, '')
    try {
      // Try deleting both published and draft (ignore failures if not present)
      await Promise.allSettled([
        client.delete(baseId),
        client.delete(`drafts.${baseId}`),
      ])
      // Automatically return to the previous list after successful delete
      window.history.back()
    } catch (err) {
      console.error('Delete failed', err)
      alert('Failed to delete document')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card padding={4} radius={2} shadow={1} tone="critical">
      <Stack space={3}>
        <Text weight="semibold">Danger zone</Text>
        <Text size={1} muted>
          Delete this document from the dataset. This action cannot be undone.
        </Text>
        <Button
          tone="critical"
          onClick={handleDelete}
          disabled={!documentId || isDeleting}
          loading={isDeleting}
          text={isDeleting ? 'Deleting…' : 'Delete document'}
        />
      </Stack>
    </Card>
  )
}
