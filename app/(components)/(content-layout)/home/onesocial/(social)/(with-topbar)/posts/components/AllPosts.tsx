'use client'
import TinySlider from '../../../../components/TinySlider'
import type { PostType } from '../../../../types/data'
import Image from 'next/image'
import type { TinySliderSettings } from 'tiny-slider'
import VideoPlayer from './VideoPlayer'
import Link from 'next/link'
import {
  BsBookmarkCheck,
  BsCardText,
  BsChatFill,
  BsEnvelope,
  BsHandThumbsUpFill,
  BsLink,
  BsPencilSquare,
  BsPlayFill,
  BsReplyFill,
  BsShare,
} from 'react-icons/bs'
import GlightBox from '../../../../components/GlightBox'
import { postData } from '../../../../assets/data/social'
import { Fragment, useState } from 'react'

const postSliderSettings: TinySliderSettings = {
  arrowKeys: false,
  gutter: 0,
  autoplayButton: false,
  autoplayButtonOutput: false,
  nested: 'inner',
  mouseDrag: true,
  autoplay: true,
  controls: false,
  items: 1,
  nav: true,
  responsive: {
    1: {
      items: 1,
    },
  },
}

const PostCard = ({ post }: { post: PostType }) => {
  const { comments, likeCount, share, title, iframe, image, isPlyer, isVideo, photos } = post
  const [showShareMenu, setShowShareMenu] = useState(false)

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${isVideo ? 'p-0' : 'h-full'}`}>
      {isVideo && image && (
        <div className="relative">
          <div className="relative w-full h-48">
            <Image
              src={image}
              alt="video"
              fill
              className="object-cover rounded-t-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="absolute top-0 right-0 p-3">
            <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
              <BsPlayFill size={20} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 p-3 flex justify-between w-full">
            <span className="bg-black/50 px-2 py-1 rounded text-white text-sm">10:20</span>
            <span className="bg-black/50 px-2 py-1 rounded text-white text-sm">1 min ago</span>
          </div>
        </div>
      )}

      {image && !isVideo && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt="Post"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      {photos && (
        <div className="relative">
          <TinySlider 
            settings={postSliderSettings}
            className="overflow-hidden rounded-t-xl"
          >
            {photos.map((photo, idx) => (
              <div key={idx} className="relative h-48">
                <Image
                  src={photo}
                  alt={`Post ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </TinySlider>
        </div>
      )}
      
      {isPlyer && <VideoPlayer />}
      
      {iframe && (
        <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
          <iframe 
            src={iframe} 
            title="YouTube video" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}

      <div className="p-4">
        <Link 
          href="/feed/post-details" 
          className="text-gray-900 hover:text-blue-600 font-medium line-clamp-2"
        >
          {title}
        </Link>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
          {/* Like Button */}
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <BsHandThumbsUpFill size={16} />
            <span>({likeCount})</span>
          </button>

          {/* Comment Button */}
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <BsChatFill size={16} />
            <span>({comments})</span>
          </button>

          {/* Share Dropdown */}
          <div className="relative ml-auto">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <BsReplyFill size={16} className="transform rotate-180" />
              <span>({share})</span>
            </button>

            {showShareMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                <div className="py-1">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <BsEnvelope className="mr-3" size={18} />
                    Send via Direct Message
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <BsBookmarkCheck className="mr-3" size={18} />
                    Bookmark
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <BsLink className="mr-3" size={18} />
                    Copy link to post
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <BsShare className="mr-3" size={18} />
                    Share post via …
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <BsPencilSquare className="mr-3" size={18} />
                    Share to News Feed
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const AllPosts = () => {
  const postCategories = ['for-you', 'covid', 'trending', 'news', 'sports', 'entertainment']
  const [activeTab, setActiveTab] = useState('for-you')
  const [posts, setPosts] = useState(postData)
  const [isLoading, setIsLoading] = useState(false)

  const filterPosts = (category: string) => {
    setActiveTab(category)
    setIsLoading(true)
    
    setTimeout(() => {
      const filtered = postData.filter((post) => post.category?.includes(category))
      setPosts(filtered)
      setIsLoading(false)
    }, 300)
  }

  const getTabLabel = (key: string) => {
    const labels: Record<string, string> = {
      'for-you': 'For you',
      'covid': 'COVID-19',
      'trending': 'Trending',
      'news': 'News',
      'sports': 'Sports',
      'entertainment': 'Entertainment'
    }
    return labels[key] || key
  }

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {postCategories.map((category) => (
            <button
              key={category}
              onClick={() => filterPosts(category)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              {getTabLabel(category)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-300">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 11).map((post, idx) => (
                <PostCard key={idx} post={post} />
              ))}
              
              {/* Load More Button */}
              <div className="col-span-full text-center mt-8">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BsCardText className="w-24 h-24 text-blue-200 mx-auto" />
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Nothing to see here</h4>
              <p className="text-gray-600 mt-2 mb-4">No posts found for this category</p>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                View recent posts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllPosts