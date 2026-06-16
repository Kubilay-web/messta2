
import Link from 'next/link'


const AccountClose = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-red-100 px-6 py-4">
        <h5 className="text-lg font-semibold text-red-700">Delete account</h5>
        <p className="mt-1 text-sm text-gray-600">
          He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. 
          Unaffected at ye of compliment alteration to.
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h6 className="mb-3 text-sm font-semibold text-gray-900">Before you go...</h6>
        
        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="mr-2 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
            <span>
              Take a backup of your data <Link href="#" className="font-medium text-blue-600 hover:underline">Here</Link>
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
            <span>If you delete your account, you will lose your all data.</span>
          </li>
        </ul>

        {/* Confirmation Checkbox */}
        <div className="my-6 flex items-start">
          <input
            className="mt-0.5 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
            type="checkbox"
            id="deleteaccountCheck"
          />
          <label className="ml-2 text-sm text-gray-700" htmlFor="deleteaccountCheck">
            Yes, I&apos;d like to delete my account
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Keep my account
          </button>
          <button
            type="button"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete my account
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountClose