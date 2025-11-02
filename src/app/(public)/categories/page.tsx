import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { CATEGORIES_WITH_COUNTS } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Category { _id: string; title: string; slug?: { current: string }; description?: string; count?: number }
interface MediaAsset { _id: string; url: string; mimeType: string; originalFilename?: string }
interface MediaItem {
	_id: string
	title?: string
	description?: string
	file?: { asset: MediaAsset }
	categories?: Category[]
}

async function getCategories() {
	return sanityFetch<Category[]>({ query: CATEGORIES_WITH_COUNTS })
}

async function getMediaForCategory(slug: string) {
	return sanityFetch<MediaItem[]>({
		query: `[
			*[_type == "media" && !(_id in path("drafts.**")) && references(*[_type=='category' && slug.current==$slug]._id)],
			*[_type == "textFile" && !(_id in path("drafts.**")) && references(*[_type=='category' && slug.current==$slug]._id)]
		] | order(_createdAt desc) {
			_id,
			title,
			description,
			file { asset-> { _id, url, mimeType, originalFilename } },
			categories[]-> { _id, title, slug }
		}`,
		params: { slug },
	})
}

export default async function CategoriesPage({
	searchParams,
}: {
	searchParams: Promise<{ slug?: string }>
}) {
	const { slug } = await searchParams
	const [categories, media] = await Promise.all([
		getCategories(),
		slug ? getMediaForCategory(slug) : Promise.resolve<MediaItem[] | null>(null),
	])

	const safeCategories = (categories ?? []).filter((c): c is Category => !!c && typeof c._id === 'string')
	const safeMedia = (media ?? []).filter((m): m is MediaItem => !!m && typeof m._id === 'string')

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h1>

			{/* Category selector list (same-page filter) */}
			<section className="mb-10">
				{safeCategories.length > 0 ? (
					<div className="bg-white rounded-xl shadow p-6">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{safeCategories.map((cat) => {
								const catSlug = cat.slug?.current || cat._id
								const active = slug === catSlug
								return (
									<Link
										key={cat._id}
										href={`/categories?slug=${encodeURIComponent(catSlug)}`}
										className={`group border rounded-lg p-4 transition ${
											active
												? 'border-indigo-400 bg-indigo-50'
												: 'border-gray-200 hover:border-indigo-300 hover:shadow'
										}`}
									>
										<div className="flex items-center justify-between">
											<span className={`font-medium ${active ? 'text-indigo-700' : 'text-gray-900 group-hover:text-indigo-600'}`}>{cat.title}</span>
											{typeof cat.count === 'number' && (
												<span className={`text-xs px-2 py-1 rounded-full ${active ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-100 text-indigo-700'}`}>
													{cat.count}
												</span>
											)}
										</div>
									</Link>
								)
							})}
						</div>
					</div>
				) : (
					<div className="bg-white rounded-xl shadow p-6 text-gray-600">No categories yet.</div>
				)}
			</section>

			{/* Results section */}
			<section>
				{!slug ? (
					<div className="bg-white rounded-xl shadow p-12 text-center text-gray-600">
						Select a category above to see its media.
					</div>
				) : safeMedia.length > 0 ? (
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Results</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{safeMedia.map((item) => (
								<Link key={item._id} href={`/media_player?id=${encodeURIComponent(item._id)}`} className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
									<div className="relative aspect-video bg-gray-100">
										{item.file?.asset?.mimeType?.startsWith('image/') && !!item.file?.asset?.url ? (
											<Image
												src={item.file.asset.url}
												alt={item.title || 'Media item'}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										) : (
											<div className="absolute inset-0 flex items-center justify-center text-gray-400">
												<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
												</svg>
											</div>
										)}
									</div>
									<div className="p-4">
										<h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 mb-1">{item.title || 'Untitled'}</h3>
										{item.description && <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>}
										{item.categories && item.categories.length > 0 && (
											<div className="mt-3 flex flex-wrap gap-2">
												{item.categories.slice(0, 2).filter(Boolean).map((cat) => (
													<span key={cat._id} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">{cat.title}</span>
												))}
											</div>
										)}
									</div>
								</Link>
							))}
						</div>
					</div>
				) : (
					<div className="bg-white rounded-xl shadow p-8 text-gray-600">No media items in this category yet.</div>
				)}
			</section>
		</div>
	)
}

