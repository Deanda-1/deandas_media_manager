import { Metadata } from 'next'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { getDashboardStats, type DashboardStats } from '@/lib/queries'
import { DeleteButton } from './DeleteButton'
import { ClearActivityButton } from './ClearActivityButton'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Deandas Media Manager',
  description: 'Admin dashboard for managing media content',
}

export const dynamic = 'force-dynamic' // Always fetch fresh data
export const revalidate = 0 // Disable caching

export default async function DashboardPage() {
  let stats: DashboardStats | null = null
  let loadError: string | null = null
  try {
    stats = await getDashboardStats()
  } catch {
    loadError = 'Failed to load dashboard data.'
  }
  const safeStats: DashboardStats = stats ?? {
    totalMedia: 0,
    totalLayouts: 0,
    totalCategories: 0,
    totalTextFiles: 0,
    recentActivity: [],
  }

  // No mock fallback; show empty state when there is no activity

  return (
    <div>
  <h1 className="text-2xl font-semibold text-white mb-6">Dashboard Overview</h1>
      
  {/* Quick Actions with Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Categories Card */}
        <Link
          href="/studio/intent/create/type=category"
          className="bg-white/70 backdrop-blur-sm rounded-lg shadow-[0_2px_0_#d97706] p-6 hover:shadow-[0_4px_0_#d97706] transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div className="text-right">
              <h2 className="text-gray-600 text-sm font-medium">Categories</h2>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalCategories}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Category
            </span>
          </div>
        </Link>

        {/* Media Card */}
        <Link
          href="/studio/intent/create/type=media"
          className="bg-white/70 backdrop-blur-sm rounded-lg shadow-[0_2px_0_#4f46e5] p-6 hover:shadow-[0_4px_0_#4f46e5] transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-right">
              <h2 className="text-gray-600 text-sm font-medium">Total Media</h2>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalMedia}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload New Media
            </span>
          </div>
        </Link>

        {/* Text Files Card */}
        <Link
          href="/studio/intent/create/type=textFile"
          className="bg-white/70 backdrop-blur-sm rounded-lg shadow-[0_2px_0_#0284c7] p-6 hover:shadow-[0_4px_0_#0284c7] transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-sky-100 rounded-full">
              <svg
                className="w-6 h-6 text-sky-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v8a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="text-right">
              <h2 className="text-gray-600 text-sm font-medium">Text Files</h2>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalTextFiles}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Text File
            </span>
          </div>
        </Link>

        {/* Layouts Card */}
        <Link
          href="/studio/intent/create/type=layout"
          className="bg-white/70 backdrop-blur-sm rounded-lg shadow-[0_2px_0_#059669] p-6 hover:shadow-[0_4px_0_#059669] transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                />
              </svg>
            </div>
            <div className="text-right">
              <h2 className="text-gray-600 text-sm font-medium">Active Layouts</h2>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalLayouts}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Layout
            </span>
          </div>
        </Link>
      </div>

      {/* Error banner */}
      {loadError && (
        <div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {loadError}
        </div>
      )}

      {/* Recent Activity */}
      <div className="mt-8">
  <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
  <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg divide-y divide-white/50">
          {safeStats.recentActivity && safeStats.recentActivity.length > 0 ? (
            safeStats.recentActivity.map((item: DashboardStats['recentActivity'][number]) => (
              <div key={item._id} className="p-4 flex items-start justify-between">
                <div className="flex items-start">
                  {/* Action icon - different for created vs updated */}
                  <div
                    className={
                      'mr-3 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ' +
                      (item.type === 'media'
                        ? 'bg-indigo-100 text-indigo-600'
                        : item.type === 'layout'
                        ? 'bg-emerald-100 text-emerald-600'
                        : item.type === 'category'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-sky-100 text-sky-600')
                    }
                    aria-hidden="true"
                  >
                    {item.action === 'created' ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    {/* Type badge + clickable title */}
                    <div className="mb-0.5">
                      <span
                        className={
                          'mr-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ' +
                          (item.type === 'media'
                            ? 'bg-indigo-100 text-indigo-700'
                            : item.type === 'layout'
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.type === 'category'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-sky-100 text-sky-700')
                        }
                      >
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-900">
                        <span className="capitalize">{item.action}</span>{' '}
                        <Link
                          href={`/studio/intent/edit/id=${item._id};type=${item.type}`}
                          className="font-medium text-gray-900 hover:text-indigo-600 hover:underline"
                          prefetch={false}
                        >
                          &ldquo;{item.title}&rdquo;
                        </Link>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="ml-0 sm:ml-4 shrink-0 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <Link
                    className={`inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                      item.type === 'media'
                        ? 'text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 focus:ring-indigo-500'
                        : item.type === 'layout'
                        ? 'text-emerald-600 hover:border-emerald-400 hover:text-emerald-700 focus:ring-emerald-500'
                        : item.type === 'category'
                        ? 'text-amber-600 hover:border-amber-400 hover:text-amber-700 focus:ring-amber-500'
                        : 'text-sky-600 hover:border-sky-400 hover:text-sky-700 focus:ring-sky-500'
                    }`}
                    href={`/studio/intent/edit/id=${item._id};type=${item.type}`}
                    prefetch={false}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View in Studio
                  </Link>
                  <DeleteButton
                    id={item._id}
                    title={item.title}
                    cascade={item.type === 'media' || item.type === 'textFile'}
                  />
                  <ClearActivityButton id={item._id} title={item.title} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-600 text-center">
              No recent activity to display.
              <div className="mt-1 text-xs text-gray-500">
                Tip: Only published documents appear. Publish a doc in Studio, or add a server-only
                SANITY_API_READ_TOKEN to include drafts in the dashboard.
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Public Media Preview removed; see /studio/media for full preview */}
    </div>
  )
}

