import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS } from '@/lib/sanity/queries'
import ContactForm from '@/components/public/ContactForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SiteSettings {
  title?: string
  description?: string
  aboutIntroText?: string
  aboutImage?: { file?: { asset?: { url?: string; mimeType?: string } } }
  aboutImageAlt?: string
  aboutMissionHeading?: string
  aboutMissionText?: string
  aboutExtraSections?: Array<{ _key: string; heading?: string; text?: string }>
}

async function getData() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS })
  return { settings }
}

export default async function AboutPage() {
  const { settings } = await getData()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About{settings?.title ? ` ${settings.title}` : ''}</h1>
        {settings?.description && (
          <p className="text-lg text-gray-600 mb-4">{settings.description}</p>
        )}
        <p className="text-lg text-gray-600">
          {settings?.aboutIntroText || 'We built this site to organize and share our media in a simple, beautiful way. Check back as we continue to grow the collection.'}
        </p>
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

      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {settings?.aboutMissionHeading || 'Our Mission'}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {settings?.aboutMissionText || 'Our goal is to make it effortless to find and enjoy the content you care about. Categories help you explore themes, while the media player makes listening and watching smooth on any device.'}
        </p>
      </section>

      {Array.isArray(settings?.aboutExtraSections) && settings!.aboutExtraSections.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 space-y-8">
          {settings!.aboutExtraSections.map((sec) => (
            <section key={sec._key} className="bg-white rounded-xl shadow p-8">
              {sec.heading && (
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{sec.heading}</h3>
              )}
              {sec.text && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{sec.text}</p>
              )}
            </section>
          ))}
        </div>
      )}

      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  )
}
