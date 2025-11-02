import Link from 'next/link'
import MediaLibrary from '@/components/media/MediaLibrary'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MediaPage() {

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Media</h1>
        <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">← Back to Home</Link>
      </div>
      <MediaLibrary />
    </div>
  )
}
