import EventCard from '../../../../components/cards/EventCard'
import { getAllEvents } from '../../../../helpers/data'
import CreateEvent from './CreateEvent'

const DiscoverEvents = async () => {
  const allEvents = await getAllEvents()
  const eventsToShow = allEvents.slice(0, 5)

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Card Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Discover Events</h2>
                <CreateEvent />
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {eventsToShow.map((event, idx) => (
                  <div key={idx} className="w-full">
                    <EventCard {...event} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverEvents