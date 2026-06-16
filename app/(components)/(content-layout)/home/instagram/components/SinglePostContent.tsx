

import { Suspense } from "react";
import BookmarkButton from "./BookmarkButton";
import Comment from "./Comment";
import LikesInfo from "./LikesInfo";
import Preloader from "./Preloader";
import SessionCommentForm from "./SessionCommentForm";

import { 
  PostInstagram, 
  ProfileInstagram, 
  CommentInstagram as CommentModel, 
  LikeInstagram, 
  BookmarkInstagram 
} from "@prisma/client";

interface SinglePostContentProps {
  post?: PostInstagram | null;
  authorProfile?: ProfileInstagram | null;
  comments: CommentModel[];
  commentsAuthors: ProfileInstagram[];
  myLike?: LikeInstagram | null;
  myBookmark?: BookmarkInstagram | null;
}

export default function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookmark,
}: SinglePostContentProps) {

  // Eğer post yoksa bir mesaj göster
  if (!post) {
    return <div className="text-center text-gray-500">No post.</div>;
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Post Görseli */}
        <div>
          <img
            className="rounded-md"
            src={post.image || ""}
            alt={post.description || ""}
          />
        </div>

        {/* Post Açıklaması ve Yorumlar */}
        <div>
          {authorProfile && (
            <Comment
              createdAt={post.createdAt}
              text={post.description}
              authorProfile={authorProfile}
            />
          )}

          <div className="pt-4 flex flex-col gap-4">
            {comments.map(comment => {
              const commentAuthor = commentsAuthors.find(a => a.email === comment.author);
              return (
                <div key={comment.id}>
                  <Comment
                    createdAt={comment.createdAt}
                    text={comment.text}
                    authorProfile={commentAuthor || undefined}
                  />
                </div>
              );
            })}
          </div>

          {/* Likes ve Bookmark */}
          <div className="flex text-gray-700 dark:text-gray-400 items-center gap-2 justify-between py-4 mt-4 border-t border-gray-300 dark:border-gray-700">
            <LikesInfo post={post} sessionLike={myLike || null} />
            <div className="flex items-center">
              <BookmarkButton post={post} sessionBookmark={myBookmark || null} />
            </div>
          </div>

          {/* Yorum Formu */}
          <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
            <Suspense fallback={<Preloader />}>
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
