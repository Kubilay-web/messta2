import Breadcrumb from "@/app/projects/components/newsportal/Breadcrumb";
import Category from "@/app/projects/components/newsportal/Category";
import SimpleDetailsNewCard from "@/app/projects/components/newsportal/news/item/SimpleDetailsNewCard";
import RecentNews from "@/app/projects/components/newsportal/news/RecentNews";
import Search from "@/app/projects/components/newsportal/news/Search";
import HtmlParser from "react-html-parser";
import React from "react";
import RelatedNews from "@/app/projects/components/newsportal/news/RelatedNews";

const Details = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/details/${slug}`,
    {
      next: {
        revalidate: 1,
      },
    },
  );

  const { news, relatedNews } = await res.json();

  return (
    <div>
      <div className="bg-white py-4 shadow-sm">
        <div className="w-full px-4 md:px-8">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      <div className="w-full bg-slate-200">
        <div className="w-full px-4 py-8 md:px-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white">
                  <img src={news?.image} alt="" />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-xl font-medium uppercase text-red-700">
                      {news?.category}
                    </h3>
                    <h2 className="text-3xl font-bold text-gray-700">
                      {news?.title}
                    </h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span className="font-bold">{news?.date}</span>
                      <span className="font-bold">By {news?.writerName}</span>
                    </div>
                    <p>{HtmlParser(news?.description)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="bg-white p-4">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <RelatedNews news={relatedNews} type="Related News" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
