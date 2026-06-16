import LoadContentButton from '../../LoadContentButton'
import type { CommentType } from '../../../types/data'
import { timeSince } from '../../../utils/date'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const CommentItem = ({ comment, likesCount, children, socialUser, createdAt, image }: CommentType) => {
  return (
    <li className="comment-item">
      {socialUser && (
        <>
          <div className="relative flex">
            <div className={clsx('relative w-8 h-8', { 'avatar-story': socialUser.isStory })}>
              <span role="button" className="cursor-pointer">
                <Image 
                  className="rounded-full object-cover w-full h-full" 
                  src={socialUser.avatar} 
                  alt={socialUser.name + '-avatar'}
                  width={32}
                  height={32}
                />
              </span>
            </div>
            <div className="ml-2 flex-1">
              <div className="bg-gray-50 rounded-tl-none p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <h6 className="font-semibold text-base mb-1">
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      {socialUser.name}
                    </Link>
                  </h6>
                  <small className="ml-2 text-gray-500 text-sm whitespace-nowrap">{timeSince(createdAt)}</small>
                </div>
                <p className="text-sm mb-0 text-gray-700">{comment}</p>
                {image && (
                  <div className="p-2 border-2 border-gray-200 rounded-md mt-2 shadow-none">
                    <Image 
                      width={172} 
                      height={277} 
                      src={image} 
                      alt=""
                      className="rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center py-2 text-sm text-gray-600 space-x-4">
                <span 
                  className="cursor-pointer hover:text-blue-600 transition-colors" 
                  role="button"
                >
                  Like ({likesCount})
                </span>
                <span 
                  className="cursor-pointer hover:text-blue-600 transition-colors" 
                  role="button"
                >
                  Reply
                </span>
                {children?.length && children?.length > 0 && (
                  <span 
                    className="cursor-pointer hover:text-blue-600 transition-colors" 
                    role="button"
                  >
                    View {children?.length} replies
                  </span>
                )}
              </div>
            </div>
          </div>

          <ul className="comment-item-nested list-none ml-12 mt-4">
            {children?.map((childComment) => (
              <CommentItem key={childComment.id} {...childComment} />
            ))}
          </ul>
          {children?.length === 2 && (
            <LoadContentButton 
              name="Load more replies" 
              className="mb-3 ml-12" 
            />
          )}
        </>
      )}
    </li>
  )
}

export default CommentItem