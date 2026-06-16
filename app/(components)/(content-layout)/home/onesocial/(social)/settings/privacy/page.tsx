import { privacyData } from './data'
import { BsPencilSquare } from 'react-icons/bs'
import ActivityViewButton from './components/ActivityViewButton'


const PrivacyAndSafety = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Privacy and safety</h2>
        <p className="mt-1 text-sm text-gray-600">
          See information about your account, download an archive of your data, or learn about your account deactivation options
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="divide-y divide-gray-100">
          {privacyData.map((privacy, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-start justify-between py-4 first:pt-0 md:flex-row md:items-center"
            >
              {/* Privacy Info */}
              <div className="mb-3 flex-1 md:mb-0 md:mr-4">
                <h6 className="text-sm font-semibold text-gray-900">{privacy.title}</h6>
                <p className="mt-1 text-sm text-gray-600">{privacy.description}</p>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto">
                {privacy.isView ? (
                  <ActivityViewButton />
                ) : (
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-auto md:mt-0"
                  >
                    <BsPencilSquare className="mr-2 h-4 w-4" />
                    Change
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-100 px-6 py-4">
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyAndSafety