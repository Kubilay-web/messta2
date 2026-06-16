"use client";

import { useState, useEffect } from "react"; // useEffect'i ekleyin
import Image from "next/image";
import Link from "next/link";
import { timeSince } from "../../utils/date";
import {
  BsHandThumbsUpFill,
  BsChatFill,
  BsReplyFill,
  BsThreeDots,
  BsBookmark,
  BsPersonX,
  BsXCircle,
  BsSlashCircle,
  BsFlag,
  BsHandThumbsUp,
  BsTrash, // Like için boş ikon
} from "react-icons/bs";
import GlightBox from "../GlightBox";
import CommentItem from "./components/CommentItem";
import VideoPlayer from "./components/VideoPlayer";
import { useSession } from "@/app/SessionProvider";
import usePostStore from "@/app/social-store/post";

const ActionMenu = ({
  name,
  postId,
  currentUserId,
}: {
  name?: string;
  postId: string;
  currentUserId: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSavePost = usePostStore((state) => state.toggleSavePost);
  const deletePost = usePostStore((state) => state.deletePost);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const post = usePostStore((state) =>
    state.posts.find((p) => p.id === postId)
  );

  const { user } = useSession();

  const isOwnPost = user.id === currentUserId;

  if (!post) return null;

  const handleSave = async () => {
    try {
      await toggleSavePost(postId); // async state güncelle
    } catch (err) {
      console.error(err);
    } finally {
      setDropdownOpen(false); // menüyü kapat
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(postId);
    } catch (err) {
      console.error(err);
    } finally {
      setDropdownOpen(false);
    }
  };

  const handleFollowToggle = async () => {
  if (!name) return;

  try {
    const endpoint = isFollowing
      ? `/api/onesocial/follow/unfollow/${name}`
      : `/api/onesocial/follow/${name}`;

    const method = isFollowing ? "DELETE" : "POST";

    const res = await fetch(endpoint, {
      method,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // local toggle
    setIsFollowing(!isFollowing);
  } catch (err) {
    console.error(err);
  } finally {
    setDropdownOpen(false);
  }
};

  useEffect(() => {


    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/onesocial/follow/status/${name}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setIsFollowing(data.isFollowing);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
  }, [name]);

  return (
    <div className="relative">
      <button
        className="text-gray-600 hover:bg-gray-100 py-1 px-2 rounded transition-colors"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <BsThreeDots />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border">
          <div className="py-1">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            >
              {post.isSaved ? (
                <BsBookmark size={22} className="mr-2 text-blue-600" />
              ) : (
                <BsBookmark size={22} className="mr-2" />
              )}
              {post.isSaved ? "Saved" : "Save post"}
            </button>

            {/* Delete Post — sadece kendi post'larında */}
            {user.id === currentUserId && (
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 w-full text-sm text-red-600 hover:bg-gray-100"
              >
                <BsTrash size={22} className="mr-2" />
                Delete post
              </button>
            )}
            {!isOwnPost && (
              <button
                onClick={handleFollowToggle}
                className="flex items-center px-4 py-2 w-full text-sm hover:bg-gray-100"
              >
                <BsPersonX size={22} className="mr-2" />
                {isFollowing ? `Unfollow ${name}` : `Follow ${name}`}
              </button>
            )}
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BsXCircle size={22} className="mr-2" />
              Hide post
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BsSlashCircle size={22} className="mr-2" />
              Block
            </Link>
            <div className="border-t my-1"></div>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BsFlag size={22} className="mr-2" />
              Report post
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const PostCard = ({
  id, // Post ID'sini props olarak alın
  createdAt,
  caption,
  image,
  photos,
  videos,
  socialUser,
  likesCount: initialLikesCount,
  isVideo,
  isLiked: initialIsLiked = false, // Başlangıçta beğenilme durumu
}) => {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useSession();

  //Comment

  const post = usePostStore((state) => state.posts.find((p) => p.id === id));

  const comments = post?.comments ?? [];
  const commentsCount = post?.commentsCount ?? 0;

  // Like/Unlike fonksiyonu
  const handleLike = async () => {
    if (!id) {
      console.error("Post ID bulunamadı");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/onesocial/post/${id}/react`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reactType: "like", // 'like' olarak gönderiyoruz
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // State'leri güncelle
        setIsLiked(data.react !== null); // react null ise beğeni kaldırılmış
        setLikesCount(data.likesCount || 0);

        console.log(data.message);
      } else {
        console.error("Like işlemi başarısız:", data.error);
      }
    } catch (error) {
      console.error("Like işlemi hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCommentToPost = usePostStore((state) => state.addCommentToPost);

  // Kullanıcının bu post'u beğenip beğenmediğini kontrol et
  useEffect(() => {
    const checkIfLiked = async () => {
      if (!id || !user?.id) return;

      try {
        const response = await fetch(`/api/onesocial/post/${id}/react`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.reacts) {
            // Kullanıcının bu post'u beğenip beğenmediğini kontrol et
            const userReact = data.reacts.find(
              (react: any) => react.userId === user.id
            );
            setIsLiked(!!userReact && userReact.type === "like");
          }
        }
      } catch (error) {
        console.error("Beğeni kontrol hatası:", error);
      }
    };

    checkIfLiked();
  }, [id, user?.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/onesocial/post/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          comment: newComment.trim(),
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      // ✅ BİREBİR BACKEND SHAPE
      addCommentToPost(id, data.comment);

      setNewComment("");
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative w-12 h-12 mr-3">
            <Image
              className="rounded-full object-cover w-full h-full"
              src={socialUser?.avatar || "/default-avatar.png"}
              alt={socialUser?.name}
              width={48}
              height={48}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h6 className="font-semibold cursor-pointer hover:text-blue-600">
                {socialUser?.name}
              </h6>
              <span className="text-sm text-gray-500">
                {timeSince(createdAt)}
              </span>
            </div>
          </div>
        </div>
        <ActionMenu
          name={socialUser.name}
          postId={id}
          currentUserId={socialUser.id}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {caption && <p className="mb-4 text-gray-800">{caption}</p>}
        {image && (
          <div className="relative w-full h-96 mb-4">
            <Image
              className="rounded-lg object-cover"
              src={image}
              alt="Post"
              fill
            />
          </div>
        )}
        {photos && photos.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, idx) => (
              <GlightBox key={idx} href={photo} data-gallery="image-popup">
                <div className="relative h-48 w-full">
                  <Image
                    className="rounded-lg object-cover"
                    src={photo}
                    alt="Photo"
                    fill
                  />
                </div>
              </GlightBox>
            ))}
          </div>
        )}
        {/* {!isVideo && <VideoPlayer />} */}
      </div>

      {/* Actions */}
      <div className="flex justify-around items-center py-3 border-t border-b border-gray-200 text-sm">
        <button
          className={`flex items-center ${isLiked ? "text-blue-600" : "text-gray-600"} hover:text-blue-800 transition-colors disabled:opacity-50`}
          onClick={handleLike}
          disabled={isLoading}
        >
          {isLiked ? (
            <BsHandThumbsUpFill size={18} className="mr-1" />
          ) : (
            <BsHandThumbsUp size={18} className="mr-1" />
          )}
          {isLiked ? "Liked" : "Like"} ({likesCount})
        </button>

        <button
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => setCommentsOpen(!commentsOpen)}
        >
          <BsChatFill size={18} className="mr-1" /> Comments ({commentsCount})
        </button>

        <div className="relative">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
          >
            <BsReplyFill size={16} className="mr-1 transform -scale-x-100" />{" "}
            Share (3)
          </button>
          {shareDropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <Link
                  href="#"
                  className="px-4 py-2 text-sm block hover:bg-gray-100"
                >
                  Send via Direct Message
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm block hover:bg-gray-100"
                >
                  Bookmark
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm block hover:bg-gray-100"
                >
                  Copy link to post
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm block hover:bg-gray-100"
                >
                  Share post via …
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {commentsOpen && (
        <>
          <div className="p-4">
            <div className="flex mb-3">
              <div className="avatar avatar-xs mr-2">
                <span role="button">
                  <Image
                    className="avatar-img rounded-full"
                    src={user.avatarUrl}
                    alt="Your Avatar"
                    width={32}
                    height={32}
                  />
                </span>
              </div>

              <form onSubmit={handleAddComment} className="w-full relative">
                <textarea
                  className="w-full py-2 pl-4 pr-12 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={1}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent border-0 px-3"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* Display Comments Directly */}
            {comments.length === 0 ? (
              <p className="text-center text-gray-500">No comments yet.</p>
            ) : (
              <ul className="list-none pl-0">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-gray-100 rounded-t-lg p-3 rounded mb"
                  >
                    <div className="flex items-center">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-300">
                        {comment.commentBy.avatarUrl ? (
                          <Image
                            className="rounded-full"
                            src={comment.commentBy.avatarUrl}
                            alt={comment.commentBy.username}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 rounded-full"></div>
                        )}
                      </div>

                      {/* Yorum İçeriği */}
                      <div className="ml-3">
                        <p className="font-semibold">
                          {comment.commentBy.username}
                        </p>
                        <p>{comment.comment}</p>
                        <span className="text-sm text-gray-500">
                          {timeSince(comment.commentAt)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
