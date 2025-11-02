import type { Metadata } from 'next'
import MediaLibrary from '@/components/media/MediaLibrary'
import WelcomeHero from '@/components/public/WelcomeHero'
import BrowseByCategory from '@/components/public/BrowseByCategory'

export const metadata: Metadata = {
  title: 'Media Preview | Admin',
  description: 'Preview the public Media page content inside the admin.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function StudioMediaPreviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Public Media Preview</h1>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 mb-6">
        {/* Include the public welcome hero component */}
        <WelcomeHero />
      </div>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 mb-6">
        {/* Include the Browse by Category component */}
        <BrowseByCategory />
      </div>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
        {/* Shared public content without public layout shell */}
        <MediaLibrary showCategories={false} />
      </div>
    </div>
  )
}
