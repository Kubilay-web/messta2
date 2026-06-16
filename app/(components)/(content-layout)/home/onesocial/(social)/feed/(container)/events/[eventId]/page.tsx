import Image from 'next/image'
import clsx from 'clsx'
import { FaStarHalfStroke } from 'react-icons/fa6'
import { FaRegStar, FaStar, FaThumbsUp } from 'react-icons/fa'
import { counterData, relatableEvents } from './data'

import { notFound } from 'next/navigation'
import { getEventById } from '../../../../../helpers/data'
import { BsGeoAlt, BsHandThumbsUpFill } from 'react-icons/bs'

import event6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/events/06.jpg'
import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg'
import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'
import avatar6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/06.jpg'

const RelatedEvents = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Related events</h2>
      </div>
      <div className="p-6 pt-0">
        {relatableEvents.map((event, idx) => (
          <div 
            className={clsx(
              'flex flex-col sm:flex-row sm:flex-wrap items-center', 
              { 'mb-3': relatableEvents.length - 1 !== idx }
            )} 
            key={idx}
          >
            <div className="w-12 h-12">
              <Image 
                className="w-full h-full rounded-full border-2 border-white object-cover" 
                src={event.image} 
                alt={event.title} 
              />
            </div>
            <div className="mt-2 mb-2 sm:mt-0 sm:mb-0 sm:ml-2 flex-1">
              <h6 className="font-semibold text-gray-800 dark:text-white mb-0">{event.title}</h6>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <BsGeoAlt className="inline mr-1" size={12} />
                {event.location}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-auto">
              <input type="checkbox" className="hidden" id={`Interested${idx}`} />
              <label 
                className="inline-flex items-center px-3 py-1.5 text-sm border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md cursor-pointer transition-colors"
                htmlFor={`Interested${idx}`}
              >
                <FaThumbsUp className="mr-1.5" size={14} />
                Interested
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<Metadata> => {
  const eventId = (await params).eventId;
  
  const event = await getEventById(eventId);
  return { title: event?.id ?? "Event Details" };
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const eventId = (await params).eventId;

  const event = await getEventById(eventId);
  if (!event) notFound();
  const attendees = [avatar1, avatar3, avatar4, avatar5, avatar6];
  
  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-4 mx-auto">
      {/* Hero Banner Card */}
      <div 
        className="relative rounded-xl overflow-hidden border-0 min-h-[300px]"
        style={{
          backgroundImage: `url(${event6.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        <div className="relative p-6 z-10">
          {/* Date Badge */}
          <div className="flex justify-between items-start mb-20">
            <div className="bg-white dark:bg-gray-800 text-center rounded-lg overflow-hidden inline-block">
              <div className="bg-blue-600 px-3 py-1 text-white rounded-t-lg text-xs font-medium">
                Wednesday
              </div>
              <h5 className="px-3 py-2 text-gray-800 dark:text-white font-bold text-lg leading-none">Dec 08</h5>
            </div>
          </div>

          {/* Event Title and Button */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-12">
            <div className="lg:w-3/4 mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-white mb-2">The learning conference</h1>
              <a
                className="text-white/90 hover:text-white text-sm"
                href="https://1.envato.market/stackbros-portfolio"
                target="_blank"
              >
                https://1.envato.market/stackbros-portfolio
              </a>
            </div>
            <div className="lg:w-1/4 lg:text-right">
              <button className="w-full lg:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Buy ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Description */}
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              He moonlights difficult engrossed it, sportsmen. Interested has
              all Devonshire difficulty gay assistance joy. Unaffected at ye of
              compliment alteration to. Place voice no arises along to. Parlors
              waiting so against me no.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Timings */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Timings</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">09:00 AM - 05:00 PM (Business)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">09:00 AM - 03:00 PM (Business)</p>
            </div>

            {/* Entry fees */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Entry fees</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="text-blue-500 hover:text-blue-600">Free Ticket</a> For photography professionals check official website
              </p>
            </div>

            {/* Category & type */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Category & type</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trade Show</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Photography & Prewedding</p>
            </div>

            {/* Estimated turnout */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Estimated turnout</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">140000 Visitors</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1800 Exhibitors</p>
              <span className="inline-block px-2 py-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
                Estimated Count
              </span>
            </div>

            {/* Ratings */}
            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2 text-gray-800 dark:text-white">4.5</span>
                <div className="flex">
                  {Array(Math.floor(4.5))
                    .fill(0)
                    .map((_star, idx) => (
                      <FaStar key={idx} size={16} className="text-yellow-500 mr-0.5" />
                    ))}
                  {!Number.isInteger(4.5) && (
                    <FaStarHalfStroke size={16} className="text-yellow-500 mr-0.5" />
                  )}
                  {4.5 < 5 &&
                    Array(5 - Math.ceil(4.5))
                      .fill(0)
                      .map((_star, idx) => (
                        <FaRegStar key={idx} size={16} className="text-yellow-500 mr-0.5" />
                      ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">132 Ratings</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>#2 of 3506</strong> Events in Photography & Prewedding
              </p>
            </div>

            {/* Interest */}
            <div>
              <div className="flex items-start mb-3">
                <BsHandThumbsUpFill className="text-green-500 mt-0.5 mr-2" size={18} />
                <div>
                  <h6 className="font-semibold text-gray-800 dark:text-white">50</h6>
                  <p className="text-sm text-gray-600 dark:text-gray-400">People have shown interest recently</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md text-sm font-medium">
                Interested?
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Attendees and Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Attendees */}
            <div className="lg:w-1/2">
              <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Attendees</h5>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {attendees.map((avatar, idx) => (
                    <div className="w-8 h-8" key={idx}>
                      <Image
                        className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                        src={avatar}
                        alt="attendee"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">148.9K people responded</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {counterData.map(({ icon: Icon, count, title }, idx) => (
                  <div className="flex items-start" key={idx}>
                    <Icon className="w-5 h-5 mt-1 text-gray-700 dark:text-gray-300" />
                    <div className="ml-3">
                      <h5 className="font-semibold text-gray-800 dark:text-white">{count}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Related Events */}
        <RelatedEvents />

        {/* Event Location */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Event location</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <BsGeoAlt className="mr-1.5" size={12} />
              750 Sing Sing Rd, Horseheads, NY, 14845
            </p>
          </div>
          <div className="p-0">
            <iframe
              className="w-full h-56 rounded-b-xl grayscale"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin"
              style={{ border: 0 }}
              aria-hidden="false"
              tabIndex={0}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails