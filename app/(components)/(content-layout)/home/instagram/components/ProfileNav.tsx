'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav({
  isOurProfile = false,
  username,
}: {
  isOurProfile: boolean;
  username: string;
}) {
  const path = usePathname() || "";

  const bookmarkedActive = path === '/home/instagram/profile/bookmarked';
  const highlightsActive = path === '/home/instagram/highlights';
  const postsActive = !bookmarkedActive && !highlightsActive;

  const linkClass = (active: boolean) =>
    active
      ? 'text-gray-800 dark:text-gray-300 font-bold'
      : 'text-gray-400 dark:text-gray-600';

  return (
    <section className="mt-4">
      <div className="flex justify-center gap-4">
        <Link
          className={linkClass(postsActive)}
          href={isOurProfile ? '/home/instagram/profile' : `/home/instagram/${username}`}
        >
          Posts
        </Link>

        {/* Highlights link is commented out */}
        {/*
        <Link
          className={linkClass(highlightsActive)}
          href={'/home/instagram/highlights'}
        >
          Highlights
        </Link>
        */}

        {isOurProfile && (
          <Link
            className={linkClass(bookmarkedActive)}
            href={'/home/instagram/profile/bookmarked'}
          >
            Bookmarked
          </Link>
        )}
      </div>
    </section>
  );
}
