import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./item/SimpleDetailsNewCard";

const PopularNews = async ({ type }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/popular`,
    {
      next: {
        revalidate: 1,
      },
    },
  );

  const { popularNews } = await res.json();

  return (
    <div className="mt-5 w-full pb-8">
      <div className="flex w-full flex-col gap-y-[14px]">
        <Title title="Popular News" />
        <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-x-3">
          {popularNews.length > 0 &&
            popularNews.map((item, i) => (
              <SimpleDetailsNewCard
                type={type}
                news={item}
                key={i}
                height={230}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
