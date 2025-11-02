import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SiteSettings { title?: string; description?: string }

async function getData() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS })
  return { settings }
}

export default async function AboutContent() {
  const { settings } = await getData()
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About{settings?.title ? ` ${settings.title}` : ''}</h1>
      {settings?.description ? (
        <p className="text-lg text-gray-600">{settings.description}</p>
      ) : (
        <p className="text-lg text-gray-600">
          We built this site to organize and share our media in a simple, beautiful way. Check back as we continue to grow the collection.
        </p>
      )}
    </section>
  )
}
