import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./item/SimpleDetailsNewCard";

const DetailsNews = ({ news, category }) => {
  return (
    <div className="flex w-full flex-col gap-[14px] py-8 pr-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:gap-x-3">
        <SimpleDetailsNewCard news={news[0]} type="details_news" height={300} />
        <SimpleDetailsNewCard news={news[1]} type="details_news" height={300} />
      </div>
    </div>
  );
};

export default DetailsNews;
