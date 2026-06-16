import PostsGrid from "./PostsGrid";
import db from "@/app/lib/db"

export default async function ProfilePosts({email}:{email:string}) {
  const posts = await db.postInstagram.findMany({where:{author:email}});
  return (
    <PostsGrid posts={posts} />
  );
}