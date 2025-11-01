import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../auth'
import { client } from '@/lib/sanity/client'

export async function DELETE(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const cascade = searchParams.get('cascade') === 'true'

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
    }

    const baseId = id.replace(/^drafts\./, '')

    // Optionally find attached file asset reference
    let fileRef: string | null = null
    if (cascade) {
      const doc = await client.fetch(
        `*[_id == $id || _id == $draftId][0]{_id, _type, "fileRef": file.asset._ref}`,
        { id: baseId, draftId: `drafts.${baseId}` }
      )
      fileRef = doc?.fileRef ?? null
    }

    // Delete published and draft versions
    await client.transaction().delete(baseId).delete(`drafts.${baseId}`).commit({visibility: 'async'})

    // If cascade requested and asset is now unreferenced, delete it too
    if (cascade && fileRef) {
      const refCount = await client.fetch<number>(
        'count(*[references($assetId)])',
        { assetId: fileRef }
      )
      if (refCount === 0) {
        try {
          await client.delete(fileRef)
        } catch (e) {
          // Ignore asset delete failures; document is already deleted
          console.warn('Asset delete skipped/failed for', fileRef, e)
        }
      }
    }

    return NextResponse.json({ success: true, id: baseId, cascade, fileDeleted: Boolean(fileRef) })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}
