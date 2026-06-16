import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsCard = ({ item }) => {
  return (
    <div className="flex rounded-md bg-[#e5effe] p-4 shadow-md transition-shadow duration-300 hover:shadow-md">
      <div className="group relative flex-shrink-0 overflow-hidden rounded-md">
        <div className="relative h-[93px] w-[100px] transform transition-transform duration-700 group-hover:scale-110 md:w-[160px] lg:w-[100px]">
          <Image
            layout="fill"
            className="rounded-md object-cover"
            src={item?.image}
            alt="Image"
          />

          <div className="absolute inset-0 rounded-md bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-between pl-4">
        <Link
          href={`/news/category/${item?.category}`}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          {item?.category}
        </Link>

        <Link
          href={`/news/${item?.slug}`}
          className="text-base font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600"
        >
          {item?.title}
        </Link>
        <div className="flex gap-x-3 text-xs text-gray-500">
          <span className="font-semibold"> {item?.date}</span>
          <span className="font-semibold">By {item?.writerName}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
