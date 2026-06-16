import { validateRequest } from "@/app/auth";
import { getSessionEmailOrThrow } from "../actions";
import HomePosts from "./HomePosts";
import HomeTopRow from "./HomeTopRow";
import db from "@/app/lib/db";

export default async function UserHome() {

  const {user}=await validateRequest();
  const follows = await db.followerInstagram.findMany({
    where: {
      followingProfileEmail: user?.email || '',
    },
  });
  const profiles = await db.profileInstagram.findMany({
    where: {
      id: {in: follows.map(f => f.followedProfileId)},
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <HomeTopRow follows={follows} profiles={profiles}/>
      <HomePosts follows={follows} profiles={profiles} />
    </div>
  );
}