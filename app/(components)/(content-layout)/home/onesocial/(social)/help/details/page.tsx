"use client"


import Link from 'next/link'
import { BsHouse, BsInfoCircle } from 'react-icons/bs'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { useState } from 'react'


const HelpDetails = () => {
  const [selectedReaction, setSelectedReaction] = useState<'yes' | 'no' | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav aria-label="breadcrumb">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-2">
              <div className="flex items-center">
                <Link href="#" className="flex items-center hover:text-blue-500 dark:hover:text-blue-400">
                  <BsHouse className="mr-1.5" size={14} />
                  Home
                </Link>
                <span className="mx-2">›</span>
              </div>
              <div className="flex items-center">
                <Link href="#" className="flex items-center hover:text-blue-500 dark:hover:text-blue-400">
                  <BsInfoCircle className="mr-1.5" size={14} />
                  Help
                </Link>
                <span className="mx-2">›</span>
              </div>
              <span className="text-gray-800 dark:text-white font-medium">
                Get started with node.js
              </span>
            </div>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Get started with node.js
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Last updated: 7 months ago</span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            <span>by Sam Lanson</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Started several mistake joy say painful removed reached end. State burst think end are its. Arrived off she elderly beloved him affixed
            noisier yet. Course regard to up he hardly. View four has said do men saw find dear shy. <strong>Talent men wicket add garden.</strong>
          </p>
          
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mb-6">
            Download Node JS
          </button>

          <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Table of Contents</h5>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Age she way earnestly the fulfilled extremely.
          </p>

          {/* Note Alert */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <strong className="text-yellow-800 dark:text-yellow-300">Note: </strong>
            <span className="text-yellow-700 dark:text-yellow-400">
              She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward.{' '}
              <Link href="#" className="text-yellow-800 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-200 font-medium underline">
                View more
              </Link>
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy
            alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.
          </p>

          <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished outlaw. Far advanced settling say finished raillery.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Insipidity the sufficient discretion imprudence resolution sir him decisively.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>
                Offered chiefly farther of my no colonel shyness. <strong>Such on help ye some door if in.</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>First am plate jokes to began to cause a scale. Subjects he prospect elegance followed</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Laughter proposal laughing any son law consider. Needed except up piqued an.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>
                <em>To occasional dissimilar impossible sentiments. Do fortune account written prepare invited no passage.</em>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Post no so what deal evil rent by real in. But her ready least set lived spite solid.</span>
            </li>
          </ul>

          <p className="text-gray-600 dark:text-gray-300">
            Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage
            Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in.{' '}
            <u>Off melancholy alteration principles old.</u> Is do speedily kindness properly oh. Respect article painted cottage he is offices
            parlors.
          </p>
        </div>

        {/* Feedback Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-4">
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-white mb-0">Was this article helpful?</h5>
                <small className="text-gray-600 dark:text-gray-400 block mt-1">
                  20 out of 45 found this helpful
                </small>
              </div>
              
              {/* Feedback Buttons */}
              <div className="flex justify-center sm:justify-end">
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedReaction(selectedReaction === 'yes' ? null : 'yes')}
                    className={`flex items-center px-4 py-2 text-sm transition-colors ${
                      selectedReaction === 'yes'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FaThumbsUp className="mr-1.5" size={14} />
                    Yes
                  </button>
                  <button
                    onClick={() => setSelectedReaction(selectedReaction === 'no' ? null : 'no')}
                    className={`flex items-center px-4 py-2 text-sm transition-colors border-l border-gray-200 dark:border-gray-700 ${
                      selectedReaction === 'no'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    No
                    <FaThumbsDown className="ml-1.5" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpDetails