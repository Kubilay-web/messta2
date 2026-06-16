
import { BsPencilSquare } from 'react-icons/bs'


const MessagingSettings = () => {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Messaging privacy settings</h2>
        <p className="mt-1 text-sm text-gray-600">
          As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. 
          In mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of Norland arrived.
        </p>
      </div>

      {/* Card Body - Settings List */}
      <div className="p-6">
        <div className="divide-y divide-gray-100">
          {/* Setting 1 */}
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Enable message request notifications</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {/* Setting 2 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Invitations from your network</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked2" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {/* Setting 3 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Allow connections to add you on group</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked3" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {/* Setting 4 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Reply to comments</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked4" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {/* Setting 5 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Messages from activity on my page or channel</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked5" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>

          {/* Setting 6 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h6 className="text-sm font-semibold text-gray-900">Personalise tips for my page</h6>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" id="msgSwitchCheckChecked6" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
            </label>
          </div>
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

const MessagingExperience = () => {
  const messagingExperiences = [
    'Read receipts and typing indicators',
    'Message suggestions',
    'Message nudges'
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Messaging experience</h2>
        <p className="mt-1 text-sm text-gray-600">
          Arrived off she elderly beloved him affixed noisier yet.
        </p>
      </div>

      {/* Card Body - Experience List */}
      <div className="p-6">
        <div className="divide-y divide-gray-100">
          {messagingExperiences.map((message, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-start justify-between py-3 first:pt-0 sm:flex-row sm:items-center"
            >
              <div className="mb-2 sm:mb-0 sm:mr-4">
                <h6 className="text-sm font-semibold text-gray-900">{message}</h6>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <BsPencilSquare className="mr-2 h-4 w-4" />
                Change
              </button>
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

const Messaging = () => {
  return (
    <div className="space-y-6">
      <MessagingSettings />
      <MessagingExperience />
    </div>
  )
}

export default Messaging