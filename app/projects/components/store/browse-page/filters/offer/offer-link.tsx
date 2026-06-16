import { CatgegoryWithSubsType } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { OfferTag } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OfferLink({ offer }: { offer: OfferTag }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();

  const { replace } = useRouter();

  // Params
  const offerQuery = searchParams.get("offer");

  const handleOfferChange = (offer: string) => {
    if (offer === offerQuery) return;
    params.delete("offer");
    params.set("offer", offer);
    replaceParams();
  };

  const replaceParams = () => {
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div
      className={cn(
        "border text-sm px-1.5 w-fit py-1 rounded-lg cursor-pointer hover:border-orange-background",
        {
          "bg-[#ffebed] text-orange-background border-orange-background":
            offer.url === offerQuery,
        }
      )}
      onClick={() => handleOfferChange(offer.url)}
    >
      {offer.name}
    </div>
  );
}
