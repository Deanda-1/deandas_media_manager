import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SiteSettings {
  title?: string;
  description?: string;
  aboutIntroText?: string;
  aboutImage?: { file?: { asset?: { url?: string; mimeType?: string } } };
  aboutImageAlt?: string;
}

async function getData() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS })
  return { settings }
}

export default async function AboutContent() {
  const { settings } = await getData()
  return (
    <section className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About{settings?.title ? ` ${settings.title}` : ''}</h1>
      {settings?.description ? (
        <p className="text-lg text-gray-600">{settings.description}</p>
      ) : (
        <p className="text-lg text-gray-600">
          {settings?.aboutIntroText || 'We built this site to organize and share our media in a simple, beautiful way. Check back as we continue to grow the collection.'}
        </p>
      )}
      {settings?.aboutImage?.file?.asset?.url && settings?.aboutImage?.file?.asset?.mimeType?.startsWith('image/') && (
        <div className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.aboutImage.file.asset.url}
            alt={settings.aboutImageAlt || 'About image'}
            className="mx-auto rounded-xl shadow max-h-[420px] w-auto"
          />
        </div>
      )}
    </section>
  )
}
