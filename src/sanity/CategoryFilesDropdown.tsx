"use client"

import {useEffect, useMemo, useState} from 'react'
import {useClient, useFormValue} from 'sanity'
import {Card, Stack, Text, Button, Flex, Box} from '@sanity/ui'
import {groq} from 'next-sanity'
import {apiVersion} from './env'

type Item = {
  _id: string
  _type: 'media' | 'textFile'
  title: string
  filename?: string | null
}

export default function CategoryFilesDropdown() {
  const client = useClient({apiVersion})
  const idValue = useFormValue(['_id']) as string | undefined
  const [items, setItems] = useState<Item[]>([])
  const [selected, setSelected] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchItems() {
      if (!idValue) return
      setLoading(true)
      setError(null)
      try {
        const query = groq`*[_type in ["media", "textFile"] && references($id)]
          | order(coalesce(_updatedAt, _createdAt) desc) {
            _id,
            _type,
            title,
            "filename": file.asset->originalFilename
          }`
        const res = await client.fetch<Item[]>(query, {id: idValue.replace(/^drafts\./, '')})
        if (!cancelled) setItems(res)
      } catch (e) {
        console.error(e)
        if (!cancelled) setError('Failed to load files for this category')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchItems()
    return () => {
      cancelled = true
    }
  }, [client, idValue])

  const selectedItem = useMemo(() => items.find((i) => i._id === selected), [items, selected])

  const openInStudio = () => {
    if (!selectedItem) return
    const url = `/studio/intent/edit/id=${selectedItem._id};type=${selectedItem._type}`
    window.location.href = url
  }

  return (
    <Card padding={3} tone="transparent" radius={2}>
      <Stack space={2}>
        <Text weight="semibold">Files in this Category</Text>
        {loading ? (
          <Text size={1}>Loading…</Text>
        ) : error ? (
          <Card padding={2} tone="critical" radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        ) : (
          <>
            <Box>
              <select
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                aria-label="Files in this category"
              >
                <option value="" disabled>
                  {items.length > 0 ? 'Select a file…' : 'No files in this category'}
                </option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item._type}: {item.title || '(Untitled)'}{item.filename ? ` — ${item.filename}` : ''}
                  </option>
                ))}
              </select>
            </Box>
            <Flex gap={2}>
              <Button
                text="Open in Studio"
                mode="ghost"
                tone="primary"
                onClick={openInStudio}
                disabled={!selectedItem}
              />
            </Flex>
          </>
        )}
      </Stack>
    </Card>
  )
}
