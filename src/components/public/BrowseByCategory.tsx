import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Category { _id: string; title: string; slug?: { current: string }; description?: string }

async function getCategories() {
  return sanityFetch<Category[]>({
    query: `*[_type == "category" && !(_id in path("drafts.**"))] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`,
  })
}

export default async function BrowseByCategory() {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    return <div className="bg-white rounded-xl shadow p-6 text-gray-600">No categories yet.</div>
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug?.current || category._id}`}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
              {category.title}
            </h3>
            {category.description && (
              <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
