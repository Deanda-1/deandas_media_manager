import Link from 'next/link'

export default function WelcomeHero() {
  return (
    <section className="mb-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Welcome to Deandas Media
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore our curated collection of media, organized beautifully for your browsing pleasure.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/media"
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Browse All Media
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Explore Categories
        </Link>
      </div>
    </section>
  )
}
