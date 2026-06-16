"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as uiElementsPrism from "@/shared/data/prism/ui-elements-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment } from "react";

interface ButtonGroupProps { }

const ButtonGroup: FC<ButtonGroupProps> = () => {
    const Buttonsdata = [
        { id: '1', color: 'primary' },
        { id: '2', color: 'secondary' },
        { id: '3', color: 'warning' },
        { id: '4', color: 'danger' },
        { id: '5', color: 'info' },
        { id: '6', color: 'success' }
    ]
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Buttongroup" />
            <Pageheader Heading="Buttongroup" breadcrumbs={['Ui Elements']} currentpage="Buttongroup" />
            {/* <!-- Page Header Close --> */}

            {/* <!--ROW-START--> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Basic Example" reactCode={uiElementsPrism.reactgroup1} reusableCode={uiElementsPrism.reusegroup1}>
                        <div className="inline-flex rounded-md shadow-sm me-5">
                            <SpkButton buttontype="button"
                                customClass="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Year
                            </SpkButton>
                            <SpkButton buttontype="button"
                                customClass="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Month
                            </SpkButton>
                            <SpkButton buttontype="button"
                                customClass="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Date
                            </SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Mixed Style" reactCode={uiElementsPrism.reactgroup2} reusableCode={uiElementsPrism.reusegroup2}>
                        <div className="ti-btn-group !gap-0 !p-0" role="group" aria-label="Basic mixed styles example">
                            <SpkButton buttontype="button" variant="danger" customClass="ti-btn-group py-3 px-4 border !border-danger btn-wave">Year</SpkButton>
                            <SpkButton buttontype="button" variant="warning" customClass="ti-btn-group py-3 px-4 border !border-warning btn-wave">Month</SpkButton>
                            <SpkButton buttontype="button" variant="success" customClass="ti-btn-group py-3 px-4 border !border-success btn-wave">Date</SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Button Group Break" reactCode={uiElementsPrism.reactgroup3} reusableCode={uiElementsPrism.reusegroup3}>
                        <div className="flex flex-col md:inline-flex md:flex-row rounded-sm shadow-sm">
                            <SpkButton buttontype="button" customClass="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Item 1
                            </SpkButton>
                            <SpkButton buttontype="button" customClass="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Item 2
                            </SpkButton>
                            <SpkButton buttontype="button" customClass="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                Item 3
                            </SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <Showcode title="Sizing" reactCode={uiElementsPrism.reactgroup4} reusableCode={uiElementsPrism.reusegroup4} customCardBodyClass="space-y-2">
                                <div className="inline-flex rounded-md shadow-sm me-6">
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Small
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Small
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Small
                                    </SpkButton>
                                </div>

                                <div className="inline-flex rounded-md shadow-sm me-6">
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                                        Default
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                                        Default
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                                        Default
                                    </SpkButton>
                                </div>

                                <div className="inline-flex rounded-md shadow-sm">
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  !p-[1.3125rem]">
                                        Large
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  !p-[1.3125rem]">
                                        Large
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  !p-[1.3125rem]">
                                        Large
                                    </SpkButton>
                                </div>
                            </Showcode>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <Showcode title="Vertical Variation" reactCode={uiElementsPrism.reactgroup5} reusableCode={uiElementsPrism.reusegroup5}>
                                <div className="max-w-xs flex flex-col rounded-sm shadow-sm">
                                    <SpkButton buttontype="button"
                                        customClass="focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-t-md border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Item 1
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Item 2
                                    </SpkButton>
                                    <SpkButton buttontype="button"
                                        customClass="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                        Item 3
                                    </SpkButton>
                                </div>
                            </Showcode>
                        </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                        <Showcode title="Basic Button Group" reactCode={uiElementsPrism.reactgroup6} reusableCode={uiElementsPrism.reusegroup6} dataCode={uiElementsPrism.Buttongroupdata}>
                            <div className="inline-flex rounded-md shadow-sm mb-5 me-5">
                                <SpkButton buttontype="button" customClass="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                    Year
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                    Month
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                                    Date
                                </SpkButton>
                            </div>
                            {Buttonsdata.map((idx) => (
                                <div className="inline-flex rounded-md shadow-sm mb-5 me-5" key={idx.id}>
                                    <SpkButton buttontype="button" customClass={`ti-btn-group py-3 px-4 border ti-btn-${idx.color} !border-white/10 dark:border-white/10`}>
                                        Year
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass={`ti-btn-group py-3 px-4 border ti-btn-${idx.color} !border-white/10 dark:border-white/10`}>
                                        Month
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass={`ti-btn-group py-3 px-4 border ti-btn-${idx.color} !border-white/10 dark:border-white/10`}>
                                        Date
                                    </SpkButton>
                                </div>
                            ))}
                        </Showcode>
                    </div>
                </div>
            </div>
            {/* <!--ROW-END--> */}
        </Fragment>
    );
};

export default ButtonGroup;