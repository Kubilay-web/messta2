'use client'
import Image from 'next/image'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsChatFill,
  BsDownload,
  BsEnvelope,
  BsFileEarmarkX,
  BsFlag,
  BsHandThumbsUpFill,
  BsLink,
  BsPencil,
  BsPencilFill,
  BsPencilSquare,
  BsPerson,
  BsPersonBoundingBox,
  BsPersonX,
  BsReplyFill,
  BsShare,
  BsSlashCircle,
  BsTag,
  BsThreeDots,
  BsTrash,
  BsXCircle,
} from 'react-icons/bs'
import { FaCameraRetro, FaFolderOpen, FaPlus } from 'react-icons/fa'
import ChoicesFormInput from '../../../../../components/form/ChoicesFormInput'
import DropzoneFormInput from '../../../../../components/form/DropzoneFormInput'
import GlightBox from '../../../../../components/GlightBox'
import { getAllMedia } from '../../../../../helpers/data'
import { useFetchData } from '../../../../../hooks/useFetchData'
import useToggle from '../../../../../hooks/useToggle'
import type { MediaType } from '../../../../../types/data'

import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'
import Link from 'next/link'
import { useState } from 'react'

const PhotoCard = ({ photo }: { photo: MediaType }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)

  return (
    <>
      <div className="absolute bottom-0 right-0">
        <div className="relative mb-2 mr-3">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full cursor-pointer"
          >
            <BsPencilFill size={14} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsTag size={16} className="mr-3" />
                  Remove Tag
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsDownload size={16} className="mr-3" />
                  Download
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsPerson size={16} className="mr-3" />
                  Make Profile Picture
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsPersonBoundingBox size={16} className="mr-3" />
                  Make Cover Photo
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsFlag size={16} className="mr-3" />
                  Report photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <GlightBox href={photo.image.src} data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
        <Image className="rounded-lg w-full h-auto" src={photo.image} alt="image" />
      </GlightBox>
      <div className="glightbox-desc custom-desc2 z-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3">
              <Image className="w-10 h-10 rounded-full object-cover" src={avatar4} alt="image" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h6 className="font-semibold text-gray-800 dark:text-white">Lori Ferguson</h6>
                <span className="text-sm text-gray-500 dark:text-gray-400">2hr</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Web Developer at StackBros</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BsThreeDots size={18} />
            </button>
          </div>
        </div>
        <p className="mt-3 mb-0 text-gray-700 dark:text-gray-300">
          I&apos;m so privileged to be involved in the @bootstrap hiring process!{' '}
          <Link href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
            #internship #inclusivebusiness
          </Link>{' '}
          <Link href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
            #internship
          </Link>{' '}
          <Link href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
            #hiring
          </Link>{' '}
          <Link href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400">
            #apply
          </Link>
        </p>
        <div className="flex items-center py-3 text-sm">
          <Link className="flex items-center mr-4 text-blue-500 hover:text-blue-600" href="#">
            <BsHandThumbsUpFill className="mr-1" />
            Liked (56)
          </Link>
          <Link className="flex items-center mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" href="#">
            <BsChatFill className="mr-1" />
            Comments (12)
          </Link>
          <div className="relative ml-auto">
            <button
              onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            >
              <BsReplyFill className="transform rotate-180 mr-1" />
              Share (3)
            </button>
            {isShareDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsEnvelope size={16} className="mr-3" />
                    Send via Direct Message
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsBookmarkCheck size={16} className="mr-3" />
                    Bookmark
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsLink size={16} className="mr-3" />
                    Copy link to post
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsShare size={16} className="mr-3" />
                    Share post via …
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsPencilSquare size={16} className="mr-3" />
                    Share to News Feed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex mb-3">
          <div className="w-8 h-8 mr-2">
            <Image className="w-8 h-8 rounded-full object-cover" src={avatar4} alt="" />
          </div>
          <form className="relative w-full">
            <textarea
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              placeholder="Add a comment..."
              defaultValue={''}
            />
            <div className="absolute top-0 right-0">
              <button className="p-2 text-gray-500 hover:text-gray-700" type="button">
                🙂
              </button>
            </div>
          </form>
        </div>
        <div className="space-y-3">
          <div className="flex">
            <div className="w-8 h-8">
              <Image className="w-8 h-8 rounded-full object-cover" src={avatar5} alt="" />
            </div>
            <div className="ml-2 flex-1">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="font-semibold text-gray-800 dark:text-white mb-1">
                      <Link href="#" className="hover:text-blue-500">Frances Guerrero</Link>
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Removed demands expense account in outward tedious do.</p>
                  </div>
                  <small className="text-xs text-gray-500 dark:text-gray-400">5hr</small>
                </div>
              </div>
              <div className="flex items-center py-2 text-sm text-gray-500 dark:text-gray-400">
                <Link className="mr-4 hover:text-gray-700 dark:hover:text-gray-300" href="#">
                  Like (3)
                </Link>
                <Link className="mr-4 hover:text-gray-700 dark:hover:text-gray-300" href="#">
                  Reply
                </Link>
                <Link className="hover:text-gray-700 dark:hover:text-gray-300" href="#">
                  View 5 replies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AlbumCard = ({ album }: { album: MediaType }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="w-1/2 lg:w-1/4 px-2 mb-4">
      <button className="w-full">
        <Image className="rounded-lg w-full h-auto" src={album.image} alt="image" />
      </button>
      <div className="flex items-center justify-between mt-3">
        <div>
          <h6 className="font-semibold text-gray-800 dark:text-white">
            <Link href="#" className="hover:text-blue-500">Cover Photos</Link>
          </h6>
          <Link className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700" href="#">
            {album.count} Items
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <BsThreeDots size={16} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsPencil size={16} className="mr-3" />
                  Edit
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsDownload size={16} className="mr-3" />
                  Download
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsTrash size={16} className="mr-3" />
                  Delete
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <BsFlag size={16} className="mr-3" />
                  Report album
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const AllPhotos = () => {
  const allPhotos = useFetchData(getAllMedia)
  const { isTrue: isOpen, toggle } = useToggle()
  const [activeTab, setActiveTab] = useState('tab-0')

  const tabs = [
    { id: 'tab-0', label: 'Photos of you' },
    { id: 'tab-1', label: 'Your photos' },
    { id: 'tab-2', label: 'Recently added' },
    { id: 'tab-3', label: 'Family' },
    { id: 'tab-4', label: 'Albums' },
  ]

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Photos</h1>
          <button
            onClick={toggle}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium flex items-center"
          >
            <FaPlus className="mr-2" />
            Create album
          </button>
        </div>
        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-wrap justify-center md:justify-start -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mr-4 py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'tab-0' && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/2 lg:w-1/4 px-2 mb-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 h-full rounded-lg flex items-center justify-center relative min-h-[200px]">
                    <Link className="absolute inset-0 flex flex-col items-center justify-center p-4" href="#">
                      <FaCameraRetro className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                      <h6 className="text-gray-600 dark:text-gray-400 font-medium">Add photo</h6>
                    </Link>
                  </div>
                </div>
                {allPhotos?.map((photo, idx) => (
                  <div className="w-1/2 lg:w-1/4 px-2 mb-4 relative" key={idx}>
                    <PhotoCard photo={photo} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tab-1' && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/2 lg:w-1/4 px-2 mb-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 h-full rounded-lg flex items-center justify-center relative min-h-[200px]">
                    <Link className="absolute inset-0 flex flex-col items-center justify-center p-4" href="#">
                      <FaCameraRetro className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                      <h6 className="text-gray-600 dark:text-gray-400 font-medium">Add photo</h6>
                    </Link>
                  </div>
                </div>
                {allPhotos?.slice(0, 3).map((photo, idx) => (
                  <div className="w-1/2 lg:w-1/4 px-2 mb-4 relative" key={idx}>
                    <PhotoCard photo={photo} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tab-2' && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/2 lg:w-1/4 px-2 mb-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 h-full rounded-lg flex items-center justify-center relative min-h-[200px]">
                    <Link className="absolute inset-0 flex flex-col items-center justify-center p-4" href="#">
                      <FaCameraRetro className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                      <h6 className="text-gray-600 dark:text-gray-400 font-medium">Add photo</h6>
                    </Link>
                  </div>
                </div>
                {allPhotos?.slice(0, 3).map((photo, idx) => (
                  <div className="w-1/2 lg:w-1/4 px-2 mb-4 relative" key={idx}>
                    <PhotoCard photo={photo} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tab-3' && (
              <div className="text-center my-8 py-8">
                <BsFileEarmarkX className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
                <h4 className="mt-4 mb-4 text-gray-600 dark:text-gray-400">No photos or videos</h4>
                <button
                  onClick={toggle}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium"
                >
                  Click here to add
                </button>
              </div>
            )}

            {activeTab === 'tab-4' && (
              <div className="flex flex-wrap -mx-2">
                {allPhotos?.slice(0, 3).map((album, idx) => (
                  <AlbumCard album={album} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Create album</h5>
              <button
                onClick={toggle}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Album name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Add album name here"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select audience</label>
                  <ChoicesFormInput options={{ searchEnabled: false }} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                    <option value="PB">Public</option>
                    <option value="FR">Friends</option>
                    <option value="SF">Specific friends</option>
                    <option value="OM">Only me</option>
                    <option value="CM">Custom</option>
                  </ChoicesFormInput>
                </div>
                <div className="mb-4">
                  <DropzoneFormInput showPreview label="Upload Photos or Videos" icon={FaFolderOpen} text="Drop image here or click to upload." />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={toggle}
                className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium"
              >
                Create now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllPhotos