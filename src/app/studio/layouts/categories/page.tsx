import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LayoutsCategoriesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories Page Layout</h1>
        <Link href="/studio/dashboard" className="text-sm text-indigo-600 hover:underline">← Back to Dashboard</Link>
      </div>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Display</h2>
        <p className="text-sm text-gray-600 mb-4">Configure how categories are presented on the categories page.</p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700">Coming soon - configure category card styling, descriptions, and thumbnail options.</p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Browsing</h2>
        <p className="text-sm text-gray-600 mb-4">Control the browsing experience when users explore category contents.</p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700">Coming soon - configure inline view options, media grid layout within categories, and navigation patterns.</p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sorting & Organization</h2>
        <p className="text-sm text-gray-600 mb-4">Set default sorting and organization preferences for category listings.</p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700">Coming soon - configure default sorting (alphabetical, by file count, custom order) and pagination settings.</p>
        </div>
      </section>
    </div>
  )
}