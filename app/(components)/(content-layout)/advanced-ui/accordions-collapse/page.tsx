"use client";
import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions";
import * as accordionsData from "@/shared/data/adavanec-ui/accordionsdata";
import * as advanceUiPrism from "@/shared/data/prism/advanced-ui-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment } from "react";

interface AccordionsCollapseProps { }

const AccordionsCollapse: FC<AccordionsCollapseProps> = () => {
  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Accordions" />
      <Pageheader Heading="Accordions" breadcrumbs={['Advanced Ui']} currentpage="Accordions" />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Basic Accordion" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion1} reusableCode={advanceUiPrism.reuseaccordion1} dataCode={advanceUiPrism.data1}>
            <SpkAccordions items={accordionsData.Basicaccordion} key={1} Titletext="after" SvgIcon={true} Toggleclass='hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400' />

          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Always Open" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion2} reusableCode={advanceUiPrism.reuseaccordion2} dataCode={advanceUiPrism.data2}>
            <SpkAccordions Alwaysopen={true} items={accordionsData.Alwaysopendata} SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Nested" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion3} reusableCode={advanceUiPrism.reuseaccordion3} dataCode={advanceUiPrism.data3}>
            <SpkAccordions items={accordionsData.Nestingarrow} SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="No arrow" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion4} reusableCode={advanceUiPrism.reuseaccordion4} dataCode={advanceUiPrism.data4}>
            <SpkAccordions items={accordionsData.NoArrowdata} Titletext="after" Toggleclass="hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="With arrow" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion5} reusableCode={advanceUiPrism.reuseaccordion5} dataCode={advanceUiPrism.data5} >
            <SpkAccordions items={accordionsData.Witharrow} SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="With title and arrow stretched" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion6} reusableCode={advanceUiPrism.reuseaccordion6} dataCode={advanceUiPrism.data6}>
            <SpkAccordions items={accordionsData.Arrowstretched} SvgIcon={true} Titletext="before" Toggleclass="hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Bordered" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion7} reusableCode={advanceUiPrism.reuseaccordion7} dataCode={advanceUiPrism.data7}>
            <SpkAccordions items={accordionsData.Borderedaccordion} SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-toggle dark:bg-bodybg dark:border-white/10 rounded-md hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Active Content Bordered" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion8} reusableCode={advanceUiPrism.reuseaccordion8} dataCode={advanceUiPrism.data8}>
            <SpkAccordions items={accordionsData.Activebordered} SvgIcon={true} Titletext="before" Toggleclass="hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-1 --> */}

      {/* <!-- Start:: row-2 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Basic Custom Accordion" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion9} reusableCode={advanceUiPrism.reuseaccordion9} dataCode={advanceUiPrism.data9}>
            <SpkAccordions items={accordionsData.Basiccustomaccordion} Titletext="before" Toggleclass="accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Basic Accordion With Icon" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion10} reusableCode={advanceUiPrism.reuseaccordion10} dataCode={advanceUiPrism.data10}>
            <SpkAccordions items={accordionsData.Basicwithiconaccordion} Titletext="after" SvgIcon={true} Toggleclass="accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-2 --> */}

      {/* <!-- Start:: row-3 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Accordion Arrow Streched" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion11} reusableCode={advanceUiPrism.reuseaccordion11} dataCode={advanceUiPrism.data11}>
            <SpkAccordions items={accordionsData.Arrowbasicstretched} Titletext="before" SvgIcon={true} Toggleclass="accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-3 --> */}

      {/* <!-- Start:: row-4 --> */}
      <h6 className="mb-3 !text-defaulttextcolor">Light Colors:</h6>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Primary Soft Color" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion12} reusableCode={advanceUiPrism.reuseaccordion12} dataCode={advanceUiPrism.data12}>
            <SpkAccordions items={accordionsData.Primarysoftcolor} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Secondary Soft Color" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion13} reusableCode={advanceUiPrism.reuseaccordion13} dataCode={advanceUiPrism.data13}>
            <SpkAccordions items={accordionsData.Secondarysoftcolor} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-4 --> */}

      {/* <!-- Start:: row-5 --> */}
      <h6 className="mb-3 !text-defaulttextcolor">Solid Colors:</h6>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Primary" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion14} reusableCode={advanceUiPrism.reuseaccordion14} dataCode={advanceUiPrism.data14}>
            <SpkAccordions items={accordionsData.Solidprimary} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Secondary" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion15} reusableCode={advanceUiPrism.reuseaccordion15} dataCode={advanceUiPrism.data15}>
            <SpkAccordions items={accordionsData.Solidsecondary} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80" />
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-5 --> */}

      {/* <!-- Start:: row-6 --> */}
      <h6 className="mb-3 !text-defaulttextcolor">Colored Borders:</h6>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Primary" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion16} reusableCode={advanceUiPrism.reuseaccordion16} dataCode={advanceUiPrism.data16}>
            <div className="accordion accordion-border-primary accordions-items-seperate" id="accordionprimaryborderExample">
              <SpkAccordions items={accordionsData.colored} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between  gap-x-3 w-full font-semibold text-start  transition" />
            </div>
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Success" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion17} reusableCode={advanceUiPrism.reuseaccordion17} dataCode={advanceUiPrism.data17}>
            <div className="accordion accordion-border-success accordions-items-seperate" id="accordionsuccessborderExample">
              <SpkAccordions items={accordionsData.Successcolored} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition" />
            </div>
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-6 --> */}

      {/* <!-- Start:: row-7 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Left Aligned Icons" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion18} reusableCode={advanceUiPrism.reuseaccordion18} dataCode={advanceUiPrism.data18}>
            <div className="accordion accordionicon-left accordions-items-seperate" id="accordioniconLeftExample">
              <SpkAccordions items={accordionsData.Leftalignedicons} Titletext="after" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full  text-start  transition" />
            </div>
          </Showcode>
        </div>
        <div className="xl:col-span-12 col-span-12">
          <Showcode title="Custom Accordion" customCardClass="custom-box" reactCode={advanceUiPrism.reactaccordion19} reusableCode={advanceUiPrism.reuseaccordion19} dataCode={advanceUiPrism.data19}>
            <div className="accordion customized-accordion accordions-items-seperate" id="customizedAccordion">
              <SpkAccordions items={accordionsData.Customaccaordion} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full  text-start  transition" />
            </div>
          </Showcode>
        </div>
      </div>
      {/* <!-- End:: row-7 --> */}
    </Fragment>
  );
};

export default AccordionsCollapse;
