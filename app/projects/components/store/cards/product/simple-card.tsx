import { SimpleProduct } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardSimple({
  product,
}: {
  product: SimpleProduct;
}) {
  return (
    <Link href={`/home/shop/product/${product.slug}?variant=${product.variantSlug}`}>
      <div className="relative flex h-[170px] w-[120px] flex-col items-center justify-between rounded-md p-2">
        <Image
          src={product.image}
          alt=""
          width={200}
          height={200}
          className="max-h-[125px] min-h-[125px] rounded-md object-cover align-middle shadow-lg"
        />
        <div className="absolute bottom-6 mt-2 space-y-2">
          <div className="rounded-lg bg-[#ff4747] px-2 py-1.5 text-sm font-bold text-white">
            ${product.price?.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
}
