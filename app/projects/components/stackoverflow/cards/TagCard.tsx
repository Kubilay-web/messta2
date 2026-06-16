import ROUTES from "@/app/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { cn, getDeviconClassName, getTechDescription } from "@/app/lib/utils";
import Image from "next/image";

interface Props {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compack?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  id,
  name,
  questions,
  showCount,
  compack,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="subtle-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex items-center space-x-2">
          <i className={`${iconClass} text-sm`} />
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/assets/stackoverflow/icons/close.svg"
            width={12}
            height={12}
            alt="close"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="text-gray-700 dark:text-gray-300 mt-1">{questions}</p>
      )}
    </>
  );

  if (compack) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(id)} className="w-full sm:w-[250px] bg-slate-300 hover:bg-white">
      <article
        className="border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col
      transition-all duration-200 hover:bg-gray-300 "
      >
        <div className="flex items-center justify-between gap-3">
          <div className="bg-gray-100  px-3 py-1.5 rounded-sm transition-colors duration-200 hover:bg-gray-300">
            <p className="font-semibold text-gray-300 dark:text-gray-100">
              {name}
            </p>
          </div>
          <i
            className={cn(
              iconClass,
                  
              "text-2xl  dark:text-gray-300"
            )}


            aria-hidden="true"
          />
        </div>

        <p className=" dark:text-gray-300 mt-5 line-clamp-3 text-sm">
          {iconDescription}
        </p>

        <p className="mt-4  dark:text-gray-200 text-sm">
          <span className="font-semibold text-blue-500 dark:text-blue-400 mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
