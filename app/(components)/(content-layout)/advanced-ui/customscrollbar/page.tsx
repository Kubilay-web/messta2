"use client";
import React, { FC, Fragment } from "react";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import { scrollSpyItems } from "@/shared/data/adavanec-ui/offcanvasdata";

interface CustomscrollbarProps { }

const Customscrollbar:FC<CustomscrollbarProps> = () => {

  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Custom scrollbar" />
      <Pageheader Heading="Custom scrollbar" breadcrumbs={['Advanced Ui']} currentpage="Custom scrollbar" />
      {/* <!-- Page Header Close --> */}

      {/*<!-- Start::row-1 -->*/}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Custom Scrollbar</h5>
            </div>
            <div className="box-body">
              <div className="max-h-[400px] space-y-4 pe-8 overflow-y-auto [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100 [&amp;::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&amp;::-webkit-scrollbar-track]:bg-slate-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-slate-500">
                {scrollSpyItems.map(item => (
                  <div key={item.id}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-white/70">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Rounded Custom Scrollbar</h5>
            </div>
            <div className="box-body">
              <div className="max-h-[400px] space-y-4 pe-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
                {scrollSpyItems.map(item => (
                  <div key={item.id}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-white/70">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- End::row-1 -->*/}

    </Fragment>
  );
};

export default Customscrollbar;