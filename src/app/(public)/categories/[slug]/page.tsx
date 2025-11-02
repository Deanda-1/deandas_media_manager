import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	redirect(`/categories?slug=${encodeURIComponent(slug)}`)
}

