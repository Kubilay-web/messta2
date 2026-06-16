import { validateRequest } from "@/app/auth";
import CommentForm from "./CommentForm";
import db from "@/app/lib/db"

export default async function SessionCommentForm({postId}:{postId:string}) {
  const {user} = await validateRequest();
  const profile = await db.profileInstagram.findFirstOrThrow({
    where: {email: user?.email as string},
  });
  return (
    <CommentForm postId={postId} avatar={profile.avatar || ''} />
  );
}