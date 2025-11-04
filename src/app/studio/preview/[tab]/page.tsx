import type { Metadata } from 'next'
import WelcomeHero from '@/components/public/WelcomeHero'
import RecentMedia from '@/components/public/RecentMedia'
import BrowseByCategory from '@/components/public/BrowseByCategory'
import MediaLibrary from '@/components/media/MediaLibrary'
import AboutPreview from '@/components/public/AboutPreview'

export const metadata: Metadata = {
  title: 'Site Preview | Admin',
  description: 'Preview public pages inside the admin without shell components.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviewPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params
  const key = (tab || '').toLowerCase()

  switch (key) {
    case 'home':
      return (
        <div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 mb-6">
            <WelcomeHero />
          </div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 mb-6">
            <RecentMedia />
          </div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <BrowseByCategory />
          </div>
        </div>
      )
    case 'media':
      return (
        <div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <MediaLibrary />
          </div>
        </div>
      )
    case 'categories':
      return (
        <div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <BrowseByCategory />
          </div>
        </div>
      )
    case 'about':
      return <AboutPreview />
    default:
      return (
        <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-6 text-gray-700">
          Unknown preview &quot;{tab}&quot;. Try one of: home, media, categories, about.
        </div>
      )
  }
}
