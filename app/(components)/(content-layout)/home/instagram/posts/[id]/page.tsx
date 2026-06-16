import db from "@/app/lib/db";
import SinglePostContent from "../../components/SinglePostContent";
import { ensureInstagramProfile, getSessionEmailOrThrow } from "../../actions"; // Eğer oturum bilgisini alacaksan
import {
  PostInstagram,
  ProfileInstagram,
  CommentInstagram,
  LikeInstagram,
  BookmarkInstagram,
} from "@prisma/client";

interface SinglePostData {
  post: PostInstagram | null;
  authorProfile: ProfileInstagram | null;
  comments: CommentInstagram[];
  commentsAuthors: ProfileInstagram[];
  myLike: LikeInstagram | null;
  myBookmark: BookmarkInstagram | null;
}

async function getSinglePostDataServer(
  postId: string,
  sessionEmail: string | null
): Promise<SinglePostData> {
  const post = await db.postInstagram.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return {
      post: null,
      authorProfile: null,
      comments: [],
      commentsAuthors: [],
      myLike: null,
      myBookmark: null,
    };
  }

  const authorProfile = await db.profileInstagram.findUnique({
    where: { email: post.author },
  });

  const comments = await db.commentInstagram.findMany({
    where: { postId: post.id },
    orderBy: { createdAt: "asc" },
  });

  const commentsAuthorsEmails = comments.map((c) => c.author);
  const commentsAuthors = await db.profileInstagram.findMany({
    where: { email: { in: commentsAuthorsEmails } },
  });

  let myLike: LikeInstagram | null = null;
  let myBookmark: BookmarkInstagram | null = null;

  if (sessionEmail) {
    myLike = await db.likeInstagram.findFirst({
      where: { postId: post.id, author: sessionEmail },
    });

    myBookmark = await db.bookmarkInstagram.findFirst({
      where: { postId: post.id, author: sessionEmail },
    });
  }

  return { post, authorProfile, comments, commentsAuthors, myLike, myBookmark };
}

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  let sessionEmail: string | null = null;

  try {
    sessionEmail = await getSessionEmailOrThrow(); // Oturum varsa e-posta
  } catch (err) {
    sessionEmail = null;
  }

  const { post, authorProfile, comments, commentsAuthors, myLike, myBookmark } =
    await getSinglePostDataServer(params.id, sessionEmail);

  const email = await getSessionEmailOrThrow();

  await ensureInstagramProfile(email);

  return (
    <SinglePostContent
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
      myBookmark={myBookmark}
    />
  );
}
