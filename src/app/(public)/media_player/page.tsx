import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { MEDIA_BY_ID } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MediaAsset { _id: string; url: string; mimeType: string; originalFilename?: string }
interface Category { _id: string; title: string; slug?: { current: string } }
interface MediaItem {
  _id: string
  title?: string
  description?: string
  file?: { asset: MediaAsset }
  categories?: Category[]
}

async function getMedia(id: string) {
  return sanityFetch<MediaItem | null>({ query: MEDIA_BY_ID, params: { id } })
}

export default async function MediaPlayerPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const params = await searchParams
  const id = params?.id

  if (!id) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-700">No media selected. Go back to the media library to pick something to play.</p>
          <div className="mt-4">
            <Link href="/media" className="text-indigo-600 hover:underline">Browse Media →</Link>
          </div>
        </div>
      </div>
    )
  }

  const media = await getMedia(id)

  if (!media || !media.file?.asset?.url) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-700">We couldnt find that media item.</p>
          <div className="mt-4">
            <Link href="/media" className="text-indigo-600 hover:underline">Back to Media →</Link>
          </div>
        </div>
      </div>
    )
  }

  const { title, description, file: { asset } } = media
  const mime = asset.mimeType || ''

  const isAudio = mime.startsWith('audio/')
  const isVideo = mime.startsWith('video/')
  const isImage = mime.startsWith('image/')
  const isTextLike =
    mime.startsWith('text/') ||
    mime === 'application/json' ||
    (!!asset.originalFilename && /\.(md|markdown|txt|json)$/i.test(asset.originalFilename))

  // Inline text content (text/plain, text/markdown, application/json)
  let inlineText: string | null = null
  let inlineTruncated = false
  if (isTextLike) {
    try {
      const res = await fetch(asset.url, { cache: 'no-store' })
      if (res.ok) {
        const raw = await res.text()
        let rendered = raw
        if (mime === 'application/json' || /\.json$/i.test(asset.originalFilename || '')) {
          try {
            const parsed = JSON.parse(raw)
            rendered = JSON.stringify(parsed, null, 2)
          } catch {
            // If JSON parse fails, just show raw text
          }
        }
        // Cap very large files to keep page responsive
        const MAX_CHARS = 200_000 // ~200 KB of text
        if (rendered.length > MAX_CHARS) {
          inlineTruncated = true
          inlineText = rendered.slice(0, MAX_CHARS)
        } else {
          inlineText = rendered
        }
      }
    } catch {
      // Ignore preview fetch errors; we'll fall back to download-only UI below
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/media" className="text-sm text-indigo-600 hover:underline">← Back to Media</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          {/* Player / Preview */}
          <div className="relative w-full overflow-hidden rounded-md">
            {isAudio && (
              <div className="aspect-video bg-black flex items-center justify-center">
                <audio controls className="w-full">
                  <source src={asset.url} type={mime} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {isVideo && (
              <div className="aspect-video bg-black">
                <video controls className="w-full h-full">
                  <source src={asset.url} type={mime} />
                  Your browser does not support the video element.
                </video>
              </div>
            )}
            {isImage && (
              <div className="aspect-video bg-black">
                <Image src={asset.url} alt={title || 'Media image'} fill className="object-contain" />
              </div>
            )}
            {/* Inline text-like preview */}
            {!isAudio && !isVideo && !isImage && inlineText !== null && (
              <div className="bg-gray-900 text-gray-100 rounded-md p-4 min-h-[50vh] max-h-[70vh] overflow-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-6">{inlineText}</pre>
                {inlineTruncated && (
                  <p className="mt-2 text-xs text-gray-400">Preview truncated. Use download to view the full file.</p>
                )}
              </div>
            )}
            {/* Fallback when no preview available */}
            {!isAudio && !isVideo && !isImage && inlineText === null && (
              <div className="aspect-video bg-black text-gray-300 text-center p-8 flex items-center justify-center">
                <p>Preview not available for this file type.</p>
              </div>
            )}
          </div>

          {/* Download fallback */}
          <div className="mt-4 flex items-center gap-4">
            <a
              href={asset.url}
              download
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Download{asset.originalFilename ? ` (${asset.originalFilename})` : ''}
            </a>
            <span className="text-xs text-gray-500">{mime}</span>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title || 'Untitled'}</h1>
          {description && <p className="text-gray-700 mb-4">{description}</p>}
          {media.categories && media.categories.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {media.categories.map((c) => (
                  <Link key={c._id} href={`/categories/${c.slug?.current || c._id}`} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
