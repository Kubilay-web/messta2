import Followers from './components/Followers'
import Link from 'next/link'
import Celebrations from './components/Celebrations'
import UpcomingCelebrations from './components/UpcomingCelebrations'
import LoadContentButton from '../../../../components/LoadContentButton'


const Celebration = () => {
  return (
    <>
      {/* Main Content Column */}
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 mx-auto">
        <Celebrations />
        <UpcomingCelebrations />
      </div>

      {/* Sidebar Column */}
      <div className="w-full lg:w-1/3 lg:pl-6">
        <div className="flex flex-col gap-4">
          {/* Followers Card - Full width on lg, half on sm */}
          <div className="w-full sm:w-1/2 lg:w-full">
            <Followers />
          </div>

          {/* Today's News Card */}
          <div className="w-full sm:w-1/2 lg:w-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Card Header */}
              <div className="p-6 pb-0 border-b-0">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">Today's news</h2>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blog/details/">Ten questions you should answer truthfully</Link>
                  </h6>
                  <small className="text-xs text-gray-500 dark:text-gray-400">2hr</small>
                </div>

                <div className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blog/details/">Five unbelievable facts about money</Link>
                  </h6>
                  <small className="text-xs text-gray-500 dark:text-gray-400">3hr</small>
                </div>

                <div className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blog/details/">Best Pinterest Boards for learning about business</Link>
                  </h6>
                  <small className="text-xs text-gray-500 dark:text-gray-400">4hr</small>
                </div>

                <div className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <Link href="/blog/details/">Skills that you can learn from business</Link>
                  </h6>
                  <small className="text-xs text-gray-500 dark:text-gray-400">6hr</small>
                </div>

                <LoadContentButton name="View all latest news" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Celebration