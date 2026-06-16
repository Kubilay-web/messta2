"use client";

import { useSession } from "@/app/SessionProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const {user} = useSession();

  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <span className="font-semibold">
            {user?.email}
          </span>
          <button
            // onClick={async () => {
            //   await signOut();
            //   router.push("/");
            // }}
            className="underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
