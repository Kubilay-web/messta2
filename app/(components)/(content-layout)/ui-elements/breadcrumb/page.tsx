"use client"
import SpkBreadcrumb from "@/shared/@spk-reusable-components/uielements/spk-breadcrumb";
import { reusebreadcrumb1, reusebreadcrumb2, reusebreadcrumb3, reusebreadcrumb4, reusebreadcrumb5 } from "@/shared/data/prism/ui-elements-prism";
import { reactbreadcrumb1, reactbreadcrumb2, reactbreadcrumb3, reactbreadcrumb4, reactbreadcrumb5 } from "@/shared/data/prism/utilities-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment } from "react";

interface BreadcrumbProps { }

const Breadcrumb: FC<BreadcrumbProps> = () => {
  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Breadcrumb" />
      <Pageheader Heading="Breadcrumb" breadcrumbs={['Ui Elements']} currentpage="Breadcrumb" />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <Showcode title="Basic Breadcrumb" reactCode={reactbreadcrumb1} reusableCode={reusebreadcrumb1}>
            <SpkBreadcrumb
              items={[
                { label: "Home", to: "#", isActive: true, },
                { label: "App Center", to: "#", isActive: true, },
                { label: "Application", },
              ]}
              SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
              SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              Svgstrokewidth="2"
            />
          </Showcode>
        </div>
        <div className="col-span-12">
          <Showcode title="Breadcrumb Style-1" reactCode={reactbreadcrumb2} reusableCode={reusebreadcrumb2}>
            <SpkBreadcrumb
              items={[
                { label: "Home", to: "#", isActive: true, },
                { label: "App Center", to: "#", isActive: true, },
                { label: "Application" },
              ]}
              separator={<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>}
            />
          </Showcode>
        </div>
        <div className="col-span-12">
          <Showcode title="Basic Breadcrumb-style-2" reactCode={reactbreadcrumb3} reusableCode={reusebreadcrumb3}>
            <SpkBreadcrumb
              items={[
                { label: "Home", to: "#", isActive: true, },
                { label: "App Center", to: "#", isActive: true, },
                { label: "Application" },
              ]}
              SvgIcon="M6 13L10 3"
              SvgClass="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-white/10 mx-2"
            />
          </Showcode>
        </div>
        <div className="col-span-12">
          <Showcode title="Breadcrumb With Icons" reactCode={reactbreadcrumb4} reusableCode={reusebreadcrumb4}>
            <SpkBreadcrumb
              items={[
                {
                  label: "Home",
                  to: "#",
                  isActive: true,
                  icon: (
                    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
                      fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                  ),
                },
                {
                  label: "App Center",
                  isActive: true,
                  to: "#",
                },
                {
                  label: "Application",
                },
              ]}
              SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
              SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              Svgstrokewidth="2"
            />
          </Showcode>
        </div>
        <div className="col-span-12">
          <Showcode title="Breadcrumb-style-3" reactCode={reactbreadcrumb5} reusableCode={reusebreadcrumb5}>
            <SpkBreadcrumb
              items={[
                {
                  label: "Home",
                  isActive: true,
                  to: "#",
                  icon: (
                    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
                      fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                  ),
                },

              ]}
              SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
              SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              Svgstrokewidth="2"
              Customerclass="pb-2"
            />
            <SpkBreadcrumb
              items={[
                {
                  label: "Home",
                  isActive: true,
                  to: "#",
                  icon: (
                    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
                      fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                  ),
                },
                {
                  label: "Library",
                  to: "#",
                },
              ]}
              SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
              SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              Svgstrokewidth="2"
              Customerclass="pb-2"
            />
            <SpkBreadcrumb
              items={[
                {
                  label: "Home",
                  isActive: true,
                  to: "#",
                  icon: (
                    <svg className="flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary" width="16" height="16"
                      fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                  ),
                },
                {
                  label: "Library",
                  isActive: true,
                  to: "#",
                },
                {
                  label: "Data",
                  to: "#",
                },
              ]}
              SvgClass='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180'
              SvgIcon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              Svgstrokewidth="2"
            />
          </Showcode>
        </div>
      </div>
      {/* <!-- End::row-1 --> */}
    </Fragment>
  );
};

export default Breadcrumb;