import { validateRequest } from "@/app/auth";
import Preloader from "./components/Preloader";
import UserHome from "./components/UserHome";
import { Suspense } from "react";
import { ensureInstagramProfile, getSessionEmailOrThrow } from "./actions";

export default async function Home() {
  const { user } = await validateRequest();

  const email = await getSessionEmailOrThrow();

  await ensureInstagramProfile(email);
  return (
    <div className="">
      {user && (
        <Suspense fallback={<Preloader />}>
          <UserHome />
        </Suspense>
      )}
    </div>
  );
}
