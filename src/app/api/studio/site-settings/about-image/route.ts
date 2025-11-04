import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../auth'
import { client } from '@/lib/sanity/client'

async function getSettingsId(): Promise<string> {
  const id = await client.fetch<string | null>(`*[_type == "siteSettings"][0]._id`)
  if (id) return id
  // Create if not exists
  const created = await client.create({ _type: 'siteSettings', title: 'Site' })
  return created._id as string
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { mediaId } = await request.json()
    if (!mediaId || typeof mediaId !== 'string') {
      return NextResponse.json({ error: 'mediaId is required' }, { status: 400 })
    }

    const settingsId = await getSettingsId()

    await client.patch(settingsId).set({ aboutImage: { _type: 'reference', _ref: mediaId } }).commit()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Set about image error:', error)
    return NextResponse.json({ error: 'Failed to set about image' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { alt } = await request.json()
    if (typeof alt !== 'string') {
      return NextResponse.json({ error: 'alt must be a string' }, { status: 400 })
    }

    const settingsId = await getSettingsId()

    await client.patch(settingsId).set({ aboutImageAlt: alt }).commit()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Set about image alt error:', error)
    return NextResponse.json({ error: 'Failed to set alt text' }, { status: 500 })
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const settingsId = await getSettingsId()
    await client.patch(settingsId).unset(['aboutImage', 'aboutImageAlt']).commit()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Clear about image error:', error)
    return NextResponse.json({ error: 'Failed to clear about image' }, { status: 500 })
  }
}
