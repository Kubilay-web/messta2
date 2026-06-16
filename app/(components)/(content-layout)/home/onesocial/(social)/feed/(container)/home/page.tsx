import Stories from './components/Stories'
import Feeds from './components/Feeds'
import Followers from './components/Followers'
import CreatePostCard from '../../../../components/cards/CreatePostCard'
import Link from 'next/link'
import LoadContentButton from '../../../../components/LoadContentButton'

export const dynamic = "force-dynamic";

// Blog'ları çeken asenkron fonksiyon
async function getLatestBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onesocial/news?limit=4`, {
      // SSG veya ISR için cache opsiyonu
      next: { revalidate: 60 } // 60 saniyede bir yenile
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch blogs')
    }
    
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

const Home = async () => {
  // Blog'ları sunucu tarafta çek
  const latestBlogs = await getLatestBlogs()

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Content */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <Stories />
        <CreatePostCard />
        <Feeds />
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        {/* Followers - Grid layout for responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <Followers />
        </div>

        {/* Today's News Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Card Header */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Today's news</h5>
          </div>

          {/* News Items */}
          <div className="space-y-4">
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog) => (
                <div key={blog.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/home/onesocial/blogs">
                      {blog.title}
                    </Link>
                  </h6>
                  <small className="text-sm text-gray-500 dark:text-gray-400">{blog.timeAgo}</small>
                </div>
              ))
            ) : (
              // Fallback veriler (API çalışmazsa)
              <>
                <div className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blogs/details">
                      Ten questions you should answer truthfully
                    </Link>
                  </h6>
                  <small className="text-sm text-gray-500 dark:text-gray-400">2hr</small>
                </div>
                <div className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blogs/details">
                      Five unbelievable facts about money
                    </Link>
                  </h6>
                  <small className="text-sm text-gray-500 dark:text-gray-400">3hr</small>
                </div>
              </>
            )}

            {/* Load More Button */}
            <div className="pt-2">
              <Link href="/home/onesocial/blogs">
                <LoadContentButton name="View all latest news" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home