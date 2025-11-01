import {NextRequest, NextResponse} from 'next/server'
import {getServerSession} from 'next-auth'
import {authOptions} from '../../../../../../auth'
import {client} from '@/lib/sanity/client'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  try {
    const {id} = await request.json()
    if (!id || typeof id !== 'string') {
      return NextResponse.json({error: 'Document ID is required'}, {status: 400})
    }

    const baseId = id.replace(/^drafts\./, '')
    const dismissalId = `activityDismissal.${baseId}`

    await client.createIfNotExists({
      _type: 'activityDismissal',
      _id: dismissalId,
      docId: baseId,
      dismissedAt: new Date().toISOString(),
    })

    return NextResponse.json({success: true, dismissed: baseId})
  } catch (error) {
    console.error('Activity clear error:', error)
    return NextResponse.json({error: 'Failed to clear activity'}, {status: 500})
  }
}
