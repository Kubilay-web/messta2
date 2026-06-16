import Preloader from "./Preloader";
import ProfileNav from "./ProfileNav";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfilePosts from "./ProfilePosts";
import {FollowerInstagram, ProfileInstagram} from "@prisma/client";
import {Suspense} from "react";

export default function ProfilePageContent({
  profile,
  isOurProfile=false,
  ourFollow=null,
}:{
  profile:ProfileInstagram;
  isOurProfile?:boolean;
  ourFollow:FollowerInstagram|null;
}) {
  return (
    <main>
      <ProfilePageInfo
        profile={profile}
        isOurProfile={isOurProfile}
        ourFollow={ourFollow} />
      <ProfileNav
        username={profile.username || ''}
        isOurProfile={isOurProfile} />
      <section className="mt-4">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile.email}/>
        </Suspense>
      </section>
    </main>
  );
}