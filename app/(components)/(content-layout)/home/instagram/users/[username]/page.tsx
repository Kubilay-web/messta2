import { ensureInstagramProfile, getSessionEmail, getSessionEmailOrThrow } from "../../actions";
import ProfilePageContent from "../../components/ProfilePageContent";
import db from "@/app/lib/db"

export default async function UserProfilePage({
  params:{username},
}:{
  params:{username:string};
}) {
  const sessionEmail = await getSessionEmail() || '';
  const profile = await db.profileInstagram.findFirstOrThrow({
    where:{username:username}
  });
  const ourFollow = await db.followerInstagram.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });

    const email = await getSessionEmailOrThrow();
    
       await ensureInstagramProfile(email);
  return (
    <ProfilePageContent
      isOurProfile={profile.email === sessionEmail}
      ourFollow={ourFollow}
      profile={profile} />
  );
}