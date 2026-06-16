import { validateRequest } from "@/app/auth";
import PostsGrid from "../../components/PostsGrid";
import ProfileNav from "../../components/ProfileNav";
import ProfilePageInfo from "../../components/ProfilePageInfo";
import db from "@/app/lib/db";
import {redirect} from "next/navigation";
import { ensureInstagramProfile, getSessionEmailOrThrow } from "../../actions";

export default async function BookmarkedPage() {
  const {user} = await validateRequest();
  const profile = await db.profileInstagram
    .findFirst({where:{email:user?.email as string}});
  if (!profile) {
    return redirect('/home/instagram/settings');
  }
  const bookmarks = await db.bookmarkInstagram.findMany({
    where: {author:user?.email as string},
  });
  const posts = await db.postInstagram.findMany({
    where: {id: {in: bookmarks.map(b => b.postId)}},
  })

    const email = await getSessionEmailOrThrow();
  
    await ensureInstagramProfile(email);
  return (
    <div>
      <ProfilePageInfo
        profile={profile}
        isOurProfile={true}
        ourFollow={null} />
      <ProfileNav
        username={profile.username || ''}
        isOurProfile={true} />
      <div className="mt-4">
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}