import { getSessionEmailOrThrow } from "../actions";
import BookmarkButton from "./BookmarkButton";
import LikesInfo from "./LikesInfo";
import db from "@/app/lib/db";
import { FollowerInstagram, ProfileInstagram } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

interface HomePostsProps {
  follows: FollowerInstagram[];
  profiles: ProfileInstagram[];
}

export default async function HomePosts({ follows, profiles }: HomePostsProps) {
  const sessionEmail = await getSessionEmailOrThrow();

  // Kendi profilimizi çekelim
  const myProfile = await db.profileInstagram.findUnique({
    where: { email: sessionEmail },
  });

  // Takip edilen profiller + kendi profilimizi ekleyelim
  const allProfiles = myProfile
    ? [...profiles, myProfile]
    : [...profiles];

  // Email listesi
  const profileEmails = allProfiles.map((p) => p.email);

  if (profileEmails.length === 0)
    return <div>You haven't followed any profile yet.</div>;

  // Postları çek
  const posts = await db.postInstagram.findMany({
    where: { author: { in: profileEmails } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  if (posts.length === 0) return <div>No posts.</div>;

  // Like ve Bookmark bilgilerini tek seferde çek
  const [likes, bookmarks] = await Promise.all([
    db.likeInstagram.findMany({
      where: { author: sessionEmail, postId: { in: posts.map((p) => p.id) } },
    }),
    db.bookmarkInstagram.findMany({
      where: { author: sessionEmail, postId: { in: posts.map((p) => p.id) } },
    }),
  ]);

  return (
    <div className="max-w-md mx-auto flex flex-col gap-12">
      {posts.map((post) => {
        const profile = allProfiles.find((p) => p.email === post.author);

        return (
          <div key={post.id}>
            <Link href={`/home/instagram/posts/${post.id}`}>
              <img
                className="block rounded-lg shadow-md shadow-black/50"
                src={post.image}
                alt={post.description || ""}
              />
            </Link>

            <div className="flex items-center gap-2 mt-4 justify-between">
              <div className="flex gap-2 items-center">
                <Avatar
                  radius="full"
                  src={profile?.avatar || ""}
                  size="2"
                  fallback="avatar"
                />
                <Link
                  className="font-bold text-gray-700 dark:text-gray-300 ml-4"
                  href={`/home/instagram/users/${profile?.username}`}
                >
                  {profile?.name || profile?.username || "Unknown"}
                </Link>
              </div>

              <div className="flex gap-2 items-center">
                <LikesInfo
                  post={post}
                  showText={false}
                  sessionLike={
                    likes.find((like) => like.postId === post.id) || null
                  }
                />
                <BookmarkButton
                  post={post}
                  sessionBookmark={
                    bookmarks.find((b) => b.postId === post.id) || null
                  }
                />
              </div>
            </div>

            <p className="mt-2 text-slate-600 dark:text-gray-400">
              {post.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
