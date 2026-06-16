"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";
import * as uiElementsPrism from "@/shared/data/prism/ui-elements-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface PaginationProps { }

const Pagination: FC<PaginationProps> = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Pagination" />
            <Pageheader Heading="Pagination" breadcrumbs={['Ui Elements']} currentpage="Pagination" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <Showcode title="Basic Pagination" customCardclassName="" reactCode={uiElementsPrism.page1}>
                        <nav className="overflow-auto">
                            <ul className="ti-pagination">
                                <li><Link scroll={false} className="page-link disabled" href="#!"> Previous </Link></li>
                                <li><Link scroll={false} className="page-link" href="#!" aria-current="page">1</Link>
                                </li>
                                <li><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                <li><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                <li><Link scroll={false} className="page-link" href="#!"> Next </Link></li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <Showcode title=" Pagination With Icons" customCardclassName="!flex" reactCode={uiElementsPrism.page2}>
                        <nav aria-label="Page navigation">
                            <ul className="ti-pagination mb-0">
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem]" href="#!"
                                        aria-label="Previous">
                                        <span aria-hidden="true"><i
                                            className="rtl:rotate-180 bx bx-chevron-left"></i></span>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link  px-3 py-[0.375rem]" href="#!"
                                        aria-label="Next">
                                        <span aria-hidden="true"><i
                                            className="rtl:rotate-180 bx bx-chevron-right"></i></span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                    <Showcode title=" Pagination Sizing " customCardclassName="" customCardBodyClass="!flex flex-wrap justify-between gap-2"
                        reactCode={uiElementsPrism.page3}>
                        <nav aria-label="...">
                            <ul className="ti-pagination pagination-sm mb-0">
                                <li className="page-item " aria-current="page">
                                    <span className="page-link  active px-3 py-[0.375rem]">1</span>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                            </ul>
                        </nav>
                        <nav aria-label="...">
                            <ul className="ti-pagination mb-0">
                                <li className="page-item " aria-current="page">
                                    <span className="page-link  active px-3 py-[0.375rem]">1</span>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                            </ul>
                        </nav>
                        <nav aria-label="...">
                            <ul className="ti-pagination pagination-lg mb-0">
                                <li className="page-item " aria-current="page">
                                    <span className="page-link active px-3 py-[0.375rem]">1</span>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2  --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Center &amp; Right Aligned Pagination" customCardclassName="" customCardBodyClass="" reactCode={uiElementsPrism.page4}>
                        <nav aria-label="Page navigation" className="mb-4">
                            <ul className="ti-pagination justify-center">
                                <li className="page-item disabled">
                                    <Link href="#!" scroll={false} className="page-link px-3 py-[0.375rem]">Previous</Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem]" href="#!">Next</Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="Page navigation">
                            <ul className="ti-pagination sm:justify-end justify-center mb-0">
                                <li className="page-item disabled">
                                    <Link href="#!" scroll={false} className="page-link px-3 py-[0.375rem]">Previous</Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">2</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">3</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem]" href="#!">Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Active and disabled states" customCardclassName="" customCardBodyClass="!flex flex-wrap" reactCode={uiElementsPrism.page5}>
                        <nav aria-label="..." className="me-4 sm:mb-0 mb-2">
                            <ul className="ti-pagination">
                                <li className="page-item disabled">
                                    <Link href="#!" scroll={false} className="page-link px-3 py-[0.375rem]">Previous</Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">1</Link></li>
                                <li className="page-item " aria-current="page">
                                    <Link scroll={false} className="page-link active px-3 py-[0.375rem]"
                                        href="#!">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem]" href="#!">Next</Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="...">
                            <ul className="ti-pagination">
                                <li className="page-item disabled">
                                    <span className="page-link px-3 py-[0.375rem]">Previous</span>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem]"
                                    href="#!">1</Link></li>
                                <li className="page-item " aria-current="page">
                                    <span className="page-link px-3 active py-[0.375rem]">2</span>
                                </li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem]" href="#!">Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2  --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Pagination Style-1" customCardclassName="" customCardBodyClass="" reactCode={uiElementsPrism.page6}>
                        <nav aria-label="Page navigation" className="pagination-style-1">
                            <ul className="ti-pagination mb-0">
                                <li className="page-item disabled rtl:rotate-180">
                                    <Link scroll={false} aria-label="anchor" className="page-link" href="#!">
                                        <i className="ri-arrow-left-s-line align-middle"></i>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">1</Link></li>
                                <li className="page-item "><Link scroll={false} className="page-link active"
                                    href="#!">2</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} aria-label="anchor" className="page-link" href="#!">
                                        <i className="bi bi-three-dots"></i>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">21</Link>
                                </li>
                                <li className="page-item rtl:rotate-180">
                                    <Link scroll={false} aria-label="anchor" className="page-link" href="#!">
                                        <i className="ri-arrow-right-s-line align-middle"></i>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Pagination Style-2" customCardclassName="" customCardBodyClass="" reactCode={uiElementsPrism.page7}>
                        <nav aria-label="Page navigation" className="pagination-style-2">
                            <ul className="ti-pagination mb-0 flex-wrap">
                                <li className="page-item disabled">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem] !border-0"
                                        href="#!">
                                        Prev
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link active px-3 py-[0.375rem] !border-0"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem] !border-0"
                                    href="#!">2</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} aria-label="anchor" className="page-link px-3 py-[0.375rem] !border-0"
                                        href="#!">
                                        <i className="bi bi-three-dots"></i>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem] !border-0"
                                    href="#!">17</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link px-3 py-[0.375rem] !text-primary !border-0"
                                        href="#!">
                                        next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Pagination Style-3" customCardclassName="" customCardBodyClass="" reactCode={uiElementsPrism.page8}>
                        <nav aria-label="Page navigation" className="pagination-style-3">
                            <ul className="ti-pagination mb-0 flex-wrap">
                                <li className="page-item disabled">
                                    <Link scroll={false} className="page-link" href="#!">
                                        Prev
                                    </Link>
                                </li>
                                <li className="page-item "><Link scroll={false} className="page-link active"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} aria-label="anchor" className="page-link" href="#!">
                                        <i className="bi bi-three-dots"></i>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">16</Link>
                                </li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link !text-primary" href="#!">
                                        next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Pagination Style-4" customCardclassName="" customCardBodyClass="" reactCode={uiElementsPrism.page9}>
                        <nav aria-label="Page navigation" className="pagination-style-4">
                            <ul className="ti-pagination mb-0 flex-nowrap">
                                <li className="page-item disabled">
                                    <Link scroll={false} className="page-link" href="#!">
                                        Prev
                                    </Link>
                                </li>
                                <li className="page-item "><Link scroll={false} className="page-link active"
                                    href="#!">1</Link></li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                <li className="page-item">
                                    <Link scroll={false} aria-label="anchor" className="page-link" href="#!">
                                        <i className="bi bi-three-dots"></i>
                                    </Link>
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">16</Link>
                                </li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link !text-primary" href="#!">
                                        next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:!col-span-6 md:col-span-12 col-span-12">
                    {/* <!-- Pagination --> */}
                    <Showcode title="Pagination Style 5" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page10}>
                        <nav className="flex items-center gap-x-1">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="sr-only">Previous</span>
                            </SpkButton>
                            <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                            </div>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="sr-only">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}

                        {/* <!-- Pagination --> */}
                        <nav className="flex items-center gap-x-1">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="sr-only">Previous</span>
                            </SpkButton>
                            <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                            </div>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="sr-only">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}

                        {/* <!-- Pagination --> */}
                        <nav className="flex items-center -space-x-px">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="sr-only">Previous</span>
                            </SpkButton>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                Currentpage="page">1</SpkButton>
                            <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                <SpkButton buttontype="button"
                                    customClass="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                    <span className="group-hover:hidden text-xs">•••</span>
                                    <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 17 5-5-5-5" />
                                        <path d="m13 17 5-5-5-5" />
                                    </svg>
                                    <span
                                        className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                        role="tooltip">
                                        Next 4 pages
                                    </span>
                                </SpkButton>
                            </SpkOverlay>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="sr-only">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 md:col-span-12 col-span-12">
                    <Showcode title="Pagination Style 6" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page11}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Go To Page --> */}
                            <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    Go to
                                </span>
                                <input type="number"
                                    className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    page
                                </span>
                            </div>
                            {/* <!-- End Go To Page --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Go To Page --> */}
                            <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    Go to
                                </span>
                                <input type="number"
                                    className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    page
                                </span>
                            </div>
                            {/* <!-- End Go To Page --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Go To Page --> */}
                            <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    Go to
                                </span>
                                <input type="number"
                                    className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                    page
                                </span>
                            </div>
                            {/* <!-- End Go To Page --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 md:col-span-12 col-span-12">
                    <Showcode title="Pagination Style 7" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page12}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Dropdown --> */}
                            <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                    5 page
                                    <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    8 page
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    10 page
                                </SpkButton>
                            </SpkDropdown>
                            {/* <!-- End Dropdown --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Dropdown --> */}
                            <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                    5 page
                                    <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    8 page
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    10 page
                                </SpkButton>
                            </SpkDropdown>
                            {/* <!-- End Dropdown --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
                            {/* <!-- Pagination --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            {/* <!-- Dropdown --> */}
                            <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                    5 page
                                    <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    8 page
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                    10 page
                                </SpkButton>
                            </SpkDropdown>
                            {/* <!-- End Dropdown --> */}
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 md:col-span-12 col-span-12">
                    <Showcode title="Pagination Style 8" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page13}>
                        {/* <!-- Pagination --> */}
                        <nav className="flex justify-between items-center gap-x-1">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="hidden sm:block">Previous</span>
                            </SpkButton>
                            <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</SpkButton>
                            </div>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="hidden sm:block">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}

                        {/* <!-- Pagination --> */}
                        <nav className="flex justify-between items-center gap-x-1">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="hidden sm:block">Previous</span>
                            </SpkButton>
                            <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                                    Currentpage="page">1</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</SpkButton>
                            </div>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="hidden sm:block">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}

                        {/* <!-- Pagination --> */}
                        <nav className="flex justify-between items-center gap-x-1">
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                <span aria-hidden="true" className="hidden sm:block">Previous</span>
                            </SpkButton>
                            <div className="flex items-center gap-x-1">
                                <span
                                    className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10">1</span>
                                <span
                                    className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-white">of</span>
                                <span
                                    className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-white">3</span>
                            </div>
                            <SpkButton buttontype="button"
                                customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                <span aria-hidden="true" className="hidden sm:block">Next</span>
                                <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                            </SpkButton>
                        </nav>
                        {/* <!-- End Pagination --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 9" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page14}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center !bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center !bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center !bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>

                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 10" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page15}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}

                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 11" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page16}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    className="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center border !border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center !border-primary items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 12" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page17}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    className="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center gap-x-1">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <div className="flex items-center gap-x-1">
                                    <SpkButton buttontype="button"
                                        customClass="min-h-[46px] min-w-[46px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                                        Currentpage="page">1</SpkButton>
                                    <SpkOverlay>
                                        <SpkButton buttontype="button"
                                            customClass="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                            <span className="group-hover:hidden text-xs">•••</span>
                                            <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 17 5-5-5-5" />
                                                <path d="m13 17 5-5-5-5" />
                                            </svg>
                                            <span
                                                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                                role="tooltip">
                                                Next 4 pages
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                    <SpkButton buttontype="button"
                                        className="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                </div>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 13" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page18}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-1 px-2 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white border border-gray-200 py-1 px-2.5 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[30px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary py-1 px-2.5 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-1 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <button type="button" className="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5"></path>
                                            <path d="m13 17 5-5-5-5"></path>
                                        </svg>
                                        <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg hidden" role="tooltip" style={{ position: "fixed", inset: "auto auto 0px 0px", margin: " 0px", transform: "translate(478px, -184px)" }} data-popper-placement="top">
                                            Next 4 pages
                                        </span>
                                    </button>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                    Currentpage="page">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass=" border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[44px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px]py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
                <div className="xxl:!col-span-6 col-span-12">
                    <Showcode title="Pagination Style 14" customCardclassName="" customCardBodyClass="space-y-5" reactCode={uiElementsPrism.page19}>
                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-1 px-2 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white border border-gray-200 py-1 px-2.5 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[30px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary py-1 px-2.5 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[32px] min-w-8 py-1 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass=" border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[32px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>

                        </div>
                        {/* <!-- End Pagination Wrapper --> */}

                        {/* <!-- Pagination Wrapper --> */}
                        <div
                            className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
                            {/* <!-- Pagination Wrapper --> */}
                            <nav className="flex items-center -space-x-px">
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <i className="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
                                    <span aria-hidden="true" className="sr-only">Previous</span>
                                </SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
                                    Currentpage="page">1</SpkButton>
                                <SpkOverlay customClass="border border-gray-200 dark:border-white/10">
                                    <SpkButton buttontype="button"
                                        customClass="hs-tooltip-toggle group min-h-[44px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                                        <span className="group-hover:hidden text-xs">•••</span>
                                        <svg className="group-hover:block hidden flex-shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                                            role="tooltip">
                                            Next 4 pages
                                        </span>
                                    </SpkButton>
                                </SpkOverlay>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</SpkButton>
                                <SpkButton buttontype="button"
                                    customClass="min-h-[46px] min-w-[46px]py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                                    <span aria-hidden="true" className="sr-only">Next</span>
                                    <i className="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
                                </SpkButton>
                            </nav>
                            {/* <!-- End Pagination --> */}
                            <div className="flex justify-center items-center gap-x-5">
                                {/* <!-- Dropdown --> */}
                                <SpkDropdown Linktag={true} Toggletext="5 page" Customclass="[--placement:top-left]" Svg={true} SvgClass="flex-shrink-0 size-4" buttonid="hs-pagination-dropdown"
                                    Svgicon="m6 9 6 6 6-6" Linkclass="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle" Menulabel="hs-pagination-dropdown" Svvgviewbox="0 0 24 24"
                                    Svgwidth="24" Svgheight="24" SvgStroke="currentColor" Strokewidth="2">
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full justify-between">
                                        5 page
                                        <i className="ri-check-line text-primary flex-shrink-0 size-4"></i>
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        8 page
                                    </SpkButton>
                                    <SpkButton buttontype="button" customClass="ti-dropdown-item w-full">
                                        10 page
                                    </SpkButton>
                                </SpkDropdown>
                                {/* <!-- End Dropdown --> */}

                                {/* <!-- Go To Page --> */}
                                <div className="flex justify-center sm:justify-start items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Go to
                                    </span>
                                    <input type="number"
                                        className="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        page
                                    </span>
                                </div>
                                {/* <!-- End Go To Page --> */}
                            </div>
                        </div>
                        {/* <!-- End Pagination Wrapper --> */}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}
        </Fragment>
    );
};

export default Pagination;