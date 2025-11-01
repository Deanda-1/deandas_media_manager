import { groq } from 'next-sanity'
import { client } from './sanity/client'

export interface DashboardStats {
  totalMedia: number
  totalLayouts: number
  totalCategories: number
  totalTextFiles: number
  recentActivity: {
    _id: string
    title: string
    type: 'media' | 'layout' | 'category' | 'textFile'
    action: 'created' | 'updated' | 'deleted'
    date: string
  }[]
}

const statsQuery = groq`{
  "totalMedia": count(*[_type == "media" && !(_id in path("drafts.**"))]),
  "totalLayouts": count(*[_type == "layout" && !(_id in path("drafts.**"))]),
  "totalCategories": count(*[_type == "category" && !(_id in path("drafts.**"))]),
  "totalTextFiles": count(*[_type == "textFile" && !(_id in path("drafts.**"))]),
  "recentActivity": *[_type in ["media", "layout", "category", "textFile"] && !(_id in *[_type == "activityDismissal"].docId)]
    | order(coalesce(_updatedAt, _createdAt) desc)[0...8] {
      _id,
      title,
      "type": _type,
      "date": coalesce(_updatedAt, _createdAt),
      "action": select(_updatedAt > _createdAt => "updated", "created")
    }
}`

export async function getDashboardStats(): Promise<DashboardStats> {
  return await client.fetch(statsQuery)
}

export async function getMediaCount(): Promise<number> {
  return await client.fetch(
    groq`count(*[_type == "media"])`
  )
}

export async function getLayoutCount(): Promise<number> {
  return await client.fetch(
    groq`count(*[_type == "layout"])`
  )
}

export async function getCategoryCount(): Promise<number> {
  return await client.fetch(
    groq`count(*[_type == "category"])`
  )
}
