import { cn } from "@/app/lib/utils";
import { OfferTag } from "@prisma/client";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

// Custom hook to calculate split point
function useBreakpoints() {
  const mobile = useMediaQuery({ query: "(max-width: 640px)" });
  const sm = useMediaQuery({ query: "(min-width: 640px)" });
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const lg = useMediaQuery({ query: "(min-width: 1024px)" });
  const xl = useMediaQuery({ query: "(min-width: 1536px)" });

  if (xl) return 7;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  if (mobile) return 2;

  return 1; // Default split point
}

export default function OfferTagsLinks({
  offerTags,
  open,
}: {
  offerTags: OfferTag[];
  open: boolean;
}) {
  const splitPoint = useBreakpoints(); // Use the custom hook here

  return (
    <div className="relative w-fit">
      <div
        className={cn(
          "flex items-center flex-wrap xl:-translate-x-6 transition-all duration-100 ease-in-out",
          {
            "!translate-x-0": open,
          }
        )}
      >
        {offerTags.slice(0, splitPoint).map((tag, i) => (
          <Link
            key={tag.id}
            href={`/home/shop/browse?offer=${tag.url}`}
            className={cn(
              "font-bold text-center text-white px-4 leading-10 rounded-[20px] hover:bg-[#ffffff33]",
              {
                "text-orange-background": i === 0,
              }
            )}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
