"use client"

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useClient} from 'sanity'
import {Card, Stack, Text, Box, Flex, Badge} from '@sanity/ui'
import {groq} from 'next-sanity'
import {apiVersion} from './env'

type Item = {
  _id: string
  _type: 'media' | 'textFile'
  title: string
  filename?: string | null
  _updatedAt?: string
}

// Props shape provided by Sanity Desk for custom document views
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryFilesView(props: any) {
  const client = useClient({apiVersion})
  const documentId: string | undefined = props?.documentId
  const [items, setItems] = useState<Item[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!documentId) return
      setLoading(true)
      setError(null)
      try {
        const query = groq`*[_type in ["media", "textFile"] && references($id)]
          | order(coalesce(_updatedAt, _createdAt) desc) {
            _id,
            _type,
            title,
            "filename": file.asset->originalFilename,
            _updatedAt
          }`
        const res = await client.fetch<Item[]>(query, {id: documentId.replace(/^drafts\./, '')})
        if (!cancelled) setItems(res)
      } catch (e) {
        console.error(e)
        if (!cancelled) setError('Failed to load linked files')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [client, documentId])

  return (
    <Card padding={4} tone="transparent">
      <Stack space={4}>
        <Text size={2} weight="semibold">Files in this Category</Text>
        {loading && <Text size={1}>Loading…</Text>}
        {error && (
          <Card padding={3} tone="critical" radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        )}
        {!loading && !error && (
          <Stack space={3}>
            {items && items.length > 0 ? (
              items.map((item) => (
                <Card key={item._id} padding={3} radius={2} shadow={1} tone="transparent">
                  <Flex align="center" justify="space-between" gap={3}>
                    <Box>
                      <Flex align="center" gap={2}>
                        <Badge
                          mode="outline"
                          tone={item._type === 'media' ? 'primary' : 'positive'}
                        >
                          {item._type}
                        </Badge>
                        <Text weight="medium">{item.title || '(Untitled)'}</Text>
                      </Flex>
                      {item.filename && (
                        <Text size={1} muted>
                          {item.filename}
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <Link
                        href={`/studio/intent/edit/id=${item._id};type=${item._type}`}
                        className="text-sm text-blue-600 hover:underline"
                        prefetch={false}
                      >
                        Open
                      </Link>
                    </Box>
                  </Flex>
                </Card>
              ))
            ) : (
              <Text size={1} muted>No files found for this category.</Text>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
