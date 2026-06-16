import CartImg from "@/public/assets/images/cart.avif";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
export default function EmptyCart() {
  return (
    <div className="mx-auto w-full bg-[#f5f5f5] px-4 text-center">
      <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center pb-14">
        <Image
          src={CartImg}
          alt="Cart image"
          width={300}
          height={300}
          className="h-64 w-64"
        />
        <span className="my-3 py-4 font-bold">
          No items yet? Continue shopping to explore more.
        </span>
        <Link href="/browse">
          <Button variant="pink" className="w-56">
            Explore items
          </Button>
        </Link>
      </div>
    </div>
  );
}
