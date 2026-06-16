import { cn } from "@/app/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface Props {
  link: string;
  image: StaticImageData;
  children?: ReactNode;
  className?: string;
  arrowClassName?: string;
  w_fit?: boolean;
}

const SidelineItem: FC<Props> = ({
  image,
  link,
  arrowClassName,
  children,
  className,
  w_fit,
}) => {
  return (
    <Link href={link}>
      <div className="group relative mt-4 flex h-10 w-10 items-center justify-center hover:bg-[#ff4747]">
        <Image src={image} width={35} height={35} alt="" />
        <div
          className={cn(
            "absolute -left-28 hidden group-hover:flex",
            className,
            {
              "-left-20": w_fit,
            },
          )}
        >
          <span
            className={cn(
              "w-24 rounded-sm bg-[#373737] px-4 py-[0.8rem] text-white transition-all duration-500 ease-in",
              {
                "!w-fit": w_fit,
              },
            )}
          >
            {children}
          </span>
          <div
            className={cn(
              "mt-[11px] h-0 w-0 border-[12px] border-r-0 border-transparent border-l-[#373737] transition-all duration-500 ease-in-out",
              arrowClassName,
            )}
          />
        </div>
      </div>
    </Link>
  );
};

export default SidelineItem;
