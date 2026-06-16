import { validateRequest } from "@/app/auth";
import { Eye, Heart, Puzzle, Rss, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProfileOverview() {
  const { user } = await validateRequest();
  if (!user) return;
  return (
    <div className="w-full">
      <div className="border bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Image
            src={user.avatarUrl}
            alt={user.username!}
            width={200}
            height={200}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="ml-4 flex-1 text-xl font-bold capitalize text-main-primary">
            {user.username?.toLowerCase()}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-5">
          {menu.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="relative flex w-36 cursor-pointer flex-col items-center justify-center"
            >
              <div className="text-3xl">
                <span>{item.icon}</span>
              </div>
              <div className="mt-2">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const menu = [
  {
    title: "Wishlist",
    icon: <Heart />,
    link: "/home/shop/profile/wishlist",
  },
  {
    title: "Following",
    icon: <Rss />,
    link: "/home/shop/profile/following/1",
  },
  {
    title: "Viewed",
    icon: <Eye />,
    link: "/home/shop/profile/history/1",
  },
  {
    title: "Coupons",
    icon: <Puzzle />,
    link: "/home/shop/profile/coupons",
  },
  {
    title: "Shopping credit",
    icon: <WalletCards />,
    link: "/home/shop/profile/credit",
  },
];
