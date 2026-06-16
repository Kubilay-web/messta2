import Breadcrumb from "@/app/projects/components/newsportal/Breadcrumb";
import Category from "@/app/projects/components/newsportal/Category";
import PopularNews from "@/app/projects/components/newsportal/news/PopularNews";
import RecentNews from "@/app/projects/components/newsportal/news/RecentNews";
import Search from "@/app/projects/components/newsportal/news/Search";
import SearchNews from "@/app/projects/components/newsportal/news/SearchNews";
import React from "react";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div>
      <div className="bg-white py-4 shadow-sm">
        <div className="w-full px-4 md:px-8">
          <Breadcrumb one="search" />
        </div>
      </div>

      <div className="w-full bg-slate-200">
        <div className="w-full px-4 py-8 md:px-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <SearchNews />
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
            <PopularNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
