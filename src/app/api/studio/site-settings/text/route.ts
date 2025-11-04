import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../auth'
import { client } from '@/lib/sanity/client'

async function getSettingsId(): Promise<string> {
  const id = await client.fetch<string | null>(`*[_type == "siteSettings"][0]._id`)
  if (id) return id
  const created = await client.create({ _type: 'siteSettings', title: 'Site' })
  return created._id as string
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { title, description, aboutIntroText, aboutMissionHeading, aboutMissionText, contactEmail, addExtraSection, deleteExtraSectionKey } = await request.json()
    if (title !== undefined && typeof title !== 'string') {
      return NextResponse.json({ error: 'title must be a string' }, { status: 400 })
    }
    if (description !== undefined && typeof description !== 'string') {
      return NextResponse.json({ error: 'description must be a string' }, { status: 400 })
    }
    if (aboutIntroText !== undefined && typeof aboutIntroText !== 'string') {
      return NextResponse.json({ error: 'aboutIntroText must be a string' }, { status: 400 })
    }
    if (aboutMissionHeading !== undefined && typeof aboutMissionHeading !== 'string') {
      return NextResponse.json({ error: 'aboutMissionHeading must be a string' }, { status: 400 })
    }
    if (aboutMissionText !== undefined && typeof aboutMissionText !== 'string') {
      return NextResponse.json({ error: 'aboutMissionText must be a string' }, { status: 400 })
    }
    if (contactEmail !== undefined && typeof contactEmail !== 'string') {
      return NextResponse.json({ error: 'contactEmail must be a string' }, { status: 400 })
    }

    const settingsId = await getSettingsId()

    // Handle adding or deleting extra sections
    if (addExtraSection || deleteExtraSectionKey) {
      // Validate addExtraSection payload
      if (addExtraSection) {
        const { heading, text } = addExtraSection as { heading?: unknown; text?: unknown }
        if (heading !== undefined && typeof heading !== 'string') {
          return NextResponse.json({ error: 'addExtraSection.heading must be a string' }, { status: 400 })
        }
        if (typeof text !== 'string' || text.trim().length === 0) {
          return NextResponse.json({ error: 'addExtraSection.text must be a non-empty string' }, { status: 400 })
        }
      }

      if (deleteExtraSectionKey !== undefined && typeof deleteExtraSectionKey !== 'string') {
        return NextResponse.json({ error: 'deleteExtraSectionKey must be a string' }, { status: 400 })
      }

      const existing = await client.fetch<Array<{ _key: string; heading?: string; text?: string }> | null>(
        `*[_type == "siteSettings" && _id == $id][0].aboutExtraSections`,
        { id: settingsId }
      )

      let nextArr = Array.isArray(existing) ? existing.slice() : []

      if (deleteExtraSectionKey) {
        nextArr = nextArr.filter((s) => s && s._key !== deleteExtraSectionKey)
      }

      if (addExtraSection) {
        // generate a key
        const key = typeof globalThis.crypto !== 'undefined' && 'randomUUID' in globalThis.crypto
          ? (globalThis.crypto as { randomUUID: () => string }).randomUUID()
          : Math.random().toString(36).slice(2)
        nextArr.push({ _key: key, heading: addExtraSection.heading, text: addExtraSection.text })
      }

      await client.patch(settingsId)
        .set({ aboutExtraSections: nextArr })
        .commit()

      return NextResponse.json({ success: true })
    }

    // Default: simple text field updates
    const patch: Record<string, unknown> = {}
    if (title !== undefined) patch.title = title
    if (description !== undefined) patch.description = description
    if (aboutIntroText !== undefined) patch.aboutIntroText = aboutIntroText
    if (aboutMissionHeading !== undefined) patch.aboutMissionHeading = aboutMissionHeading
    if (aboutMissionText !== undefined) patch.aboutMissionText = aboutMissionText
    if (contactEmail !== undefined) patch.contactEmail = contactEmail

    await client.patch(settingsId).set(patch).commit()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Set about text error:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}
