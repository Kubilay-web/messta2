import type { SocialPostType } from '../types/data'
import CommentItem from './cards/components/CommentItem'
import { BsBookmarkCheck, BsChatFill, BsEnvelope, BsHandThumbsUpFill, BsLink, BsPencilSquare, BsReplyFill, BsShare } from 'react-icons/bs'
import { useState } from 'react'
import LoadContentButton from './LoadContentButton'
import Link from 'next/link'

type CommentProps = {
  comment: SocialPostType
  showStats?: boolean
}

const UserComments = ({ comment, showStats }: CommentProps) => {
  const { comments, commentsCount, likesCount } = comment
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <>
      {showStats && (
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center space-x-4">
            <Link
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              href="#"
            >
              <BsHandThumbsUpFill size={18} className="mr-1" />({likesCount})
            </Link>
            <Link 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors" 
              href="#"
            >
              <BsChatFill size={18} className="mr-1" />({commentsCount})
            </Link>
          </div>

          <div className="relative">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <BsReplyFill size={16} className="mr-1 transform -scale-x-100" />
              (3)
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsEnvelope size={22} className="mr-2" />
                    Send via Direct Message
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsBookmarkCheck size={22} className="mr-2" />
                    Bookmark
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsLink size={22} className="mr-2" />
                    Copy link to post
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsShare size={22} className="mr-2" />
                    Share post via …
                  </Link>
                  <div className="border-t my-1"></div>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsPencilSquare size={22} className="mr-2" />
                    Share to News Feed
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {comments && (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentItem {...comment} key={comment.id} />
          ))}
        </ul>
      )}
      
      <div className="border-0 pb-0 pt-4">
        {comments && <LoadContentButton name="Load more comments" />}
      </div>
    </>
  )
}

export default UserComments