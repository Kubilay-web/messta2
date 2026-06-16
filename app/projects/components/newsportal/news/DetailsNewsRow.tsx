import React from "react";
import Title from "../Title";
import SimpleDetailsNewCard from "./item/SimpleDetailsNewCard";
import NewsCard from "./item/NewsCard";

const DetailsNewsRow = ({ news, category, type }) => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-md">
      <Title title={category} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SimpleDetailsNewCard news={news[0]} type={type} height={300} />

        <div className="grid grid-cols-1 gap-2">
          {news.map((item, i) => {
            if (i < 4) {
              return <NewsCard item={item} key={i} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsNewsRow;
