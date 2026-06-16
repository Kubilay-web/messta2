
import { validateRequest } from "@/app/auth";
import ProfilePageContent from "../components/ProfilePageContent";
import db from "@/app/lib/db"
import {redirect} from "next/navigation";
import { ensureInstagramProfile, getSessionEmailOrThrow } from "../actions";

export default async function ProfilePage() {
  const {user} = await validateRequest();
  const profile = await db.profileInstagram
    .findFirst({where:{email:user?.email as string}});
  if (!profile) {
    return redirect('/home/instagram/settings');
  }

      const email = await getSessionEmailOrThrow();
    
      await ensureInstagramProfile(email);
  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true} />
  );
}