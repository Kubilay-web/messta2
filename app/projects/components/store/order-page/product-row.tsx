import ProductStatusTag from "@/app/projects/components/shared/product-status";
import { ProductStatus } from "@/app/lib/types";
import { OrderItem } from "@prisma/client";
import Image from "next/image";

export default function ProductRow({ product }: { product: OrderItem }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 border-b py-6">
      <div className="w-full">
        <Image
          src={product.image}
          alt=""
          width={200}
          height={200}
          className="aspect-square h-56 w-[300px] rounded-xl object-cover"
        />
      </div>
      <div className="flex w-full items-center">
        <div className="w-full">
          <div className="flex items-center">
            <div>
              <h2 className="mb-1 line-clamp-2 pr-2 text-xl font-semibold leading-8 text-black">
                {product.name.split("·")[0]}
              </h2>
              <p className="mb-1 text-lg font-normal leading-8 text-gray-500">
                {product.name.split("·")[1]}
              </p>
              <p className="mb-1 text-sm font-normal leading-8 text-gray-500">
                #{product.sku}
              </p>
              <div className="flex w-full flex-col">
                <p className="mr-4 border-r pr-4 text-base font-medium leading-7 text-black">
                  Size: <span className="text-gray-500">{product.size}</span>
                </p>
                <p className="text-base font-medium leading-7 text-black">
                  Qty: <span className="text-gray-500">{product.quantity}</span>
                </p>
                <p className="text-base font-medium leading-7 text-black">
                  Price:&nbsp;
                  <span className="text-blue-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </p>
                <p className="text-base font-medium leading-7 text-black">
                  Status:&nbsp;
                  <div className="inline-block">
                    <ProductStatusTag
                      status={product.status as ProductStatus}
                    />
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
