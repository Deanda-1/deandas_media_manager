import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env'

const token = process.env.SANITY_API_READ_TOKEN

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
  // If a token is present, include drafts in queries for a more complete admin view
  perspective: token ? 'previewDrafts' : 'published',
  stega: { enabled: false },
})
