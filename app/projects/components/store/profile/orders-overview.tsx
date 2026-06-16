import Link from "next/link";
import { AppealIcon, ArrowIcon, DollarIcon } from "@/app/projects/components/store/icons";
import UnpaidImg from "@/public/assets/images/unpaid.avif";
import ToBeShippedImg from "@/public/assets/images/to-be-shipped.avif";
import ShippedImg from "@/public/assets/images/shipped.avif";
import ToBeReviewedImg from "@/public/assets/images/to-de-reviewed.webp";
import Image from "next/image";
export default function OrdersOverview() {
  return (
    <div className="mt-4 border bg-white p-4 shadow-sm">
      <div className="flex items-center border-b">
        <div className="inline-block flex-1 py-3 text-xl font-bold">
          My Orders
        </div>
        <Link href="/home/shop/profile/orders">
          <div className="flex cursor-pointer items-center text-sm text-main-primary">
            View All
            <span className="ml-2 inline-block text-lg">
              <ArrowIcon />
            </span>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
        {menu.map((item) => (
          <Link key={item.link} href={item.link}>
            <div className="relative flex w-full cursor-pointer flex-col items-center justify-center">
              <Image
                src={item.img}
                alt={item.title}
                width={100}
                height={100}
                className="h-14 w-14 object-cover"
              />
              <div className="text-main-primary">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="relative flex cursor-pointer items-center border-t py-4">
        <span className="inline-block text-2xl">
          <AppealIcon />
        </span>
        <div className="ml-1.5 text-main-primary">My appeal</div>
        <span className="absolute right-0 text-lg text-main-secondary">
          <ArrowIcon />
        </span>
      </div>
      <div className="relative flex cursor-pointer items-center border-t py-4">
        <span className="inline-block text-2xl">
          <DollarIcon />
        </span>
        <div className="ml-1.5 text-main-primary">In dispute</div>
        <span className="absolute right-0 text-lg text-main-secondary">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
}
const menu = [
  {
    title: "Unpaid",
    img: UnpaidImg,
    link: "/home/shop/profile/orders/unpaid",
  },
  {
    title: "To be shipped",
    img: ToBeShippedImg,
    link: "/home/shop/profile/orders/toShip",
  },
  {
    title: "Shipped",
    img: ShippedImg,
    link: "/home/shop/profile/orders/shipped",
  },
  {
    title: "Delivered",
    img: ToBeReviewedImg,
    link: "/home/shop/profile/orders/delivered",
  },
];
