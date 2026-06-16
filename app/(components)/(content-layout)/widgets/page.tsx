"use client"
import Spkapexcharts from '@/shared/@spk-reusable-components/spk-packages/apexcharts-component';
import * as widgetsdata from '@/shared/data/widgets/widgetsdata';
import Pageheader from '@/shared/layouts-components/page-header/pageheader';
import Seo from '@/shared/layouts-components/seo/seo';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'

const Widgets = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Widgets" />
            <Pageheader Heading="Widgets" breadcrumbs={['Widgets']} currentpage="Widgets" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                {widgetsdata.widgets.map((idx) => (
                    <div className="xl:col-span-3 col-span-12" key={idx.chartId}>
                        <div className="box overflow-hidden">
                            <div className="box-body">
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <div className="flex-grow text-[0.8125rem] text-textmuted dark:text-textmuted/50">{idx.title}</div>
                                        <div className="text-[1.375rem] font-medium">{idx.count}</div>
                                    </div>
                                    <div className={`avatar avatar-md avatar-rounded bg-${idx.svgIconBg}/[0.15]`}>
                                        {idx.svgIcon}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-x-6">
                                    <div className="xl:col-span-6 col-span-12">
                                        <div className="flex items-center mb-1">
                                            <span className={`badge !rounded-full ${idx.icon === "up" ? "bg-success/[0.15]" : "bg-danger/[0.15] text-danger"} me-2`}><i
                                                className={`ri-arrow-left-${idx.icon}-line text-[0.6875rem]`}></i></span>
                                            <span className="text-[0.875rem]">{idx.text}%</span>
                                        </div>
                                        <p className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 mb-0">This Month</p>
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <div id={idx.chartId}>
                                            <Spkapexcharts chartOptions={idx.chartOptions} chartSeries={idx.chartSeries} type="area" width={120} height={60} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-2 text-[0.9375rem] font-medium">TOTAL EMPLOYEES
                                    </p>
                                    <h4 className="mb-4 font-medium">24,152</h4>
                                </div>
                                <div>
                                    <span className="avatar avatar-md bg-primary/[0.15] text-primary">
                                        <svg className="!fill-primary" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none" />
                                            <circle cx="84" cy="108" r="52" opacity="0.2" />
                                            <path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <circle cx="84" cy="108" r="52" fill="none" stroke="currentColor"
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                            <path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                    <span className="text-success font-semibold me-1 inline-block"><i
                                        className="fe fe-arrow-up"></i>+0.5%</span>
                                    vs Last Month
                                </div>
                                <Link scroll={false} href="#!"> <span
                                    className="float-end text-[0.75rem] font-medium text-primary">View All <i
                                        className="ti ti-arrow-narrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-2 text-[0.9375rem] font-medium">TOTAL REVENUE
                                    </p>
                                    <h4 className="mb-4 font-medium">$55,786</h4>
                                </div>
                                <div>
                                    <span className="avatar avatar-md bg-secondary/[0.15] text-secondary">
                                        <svg className="fill-secondary " xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none" />
                                            <path
                                                d="M40,192a16,16,0,0,0,16,16H216a8,8,0,0,0,8-8V88a8,8,0,0,0-8-8H56A16,16,0,0,1,40,64Z"
                                                opacity="0.2" />
                                            <path
                                                d="M40,64V192a16,16,0,0,0,16,16H216a8,8,0,0,0,8-8V88a8,8,0,0,0-8-8H56A16,16,0,0,1,40,64h0A16,16,0,0,1,56,48H192"
                                                fill="none" stroke="currentColor" strokeLinecap="round"
                                                strokeLinejoin="round" strokeWidth="16" />
                                            <circle cx="180" cy="140" r="12" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                    <span className="text-danger font-semibold me-1 inline-block"><i
                                        className="fe fe-arrow-down"></i>-1.2%</span>
                                    vs Last Month
                                </div>
                                <Link scroll={false} href="#!">
                                    <span className="float-end text-[0.75rem] font-medium text-secondary"> View All  <i
                                        className="ti ti-arrow-narrow-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-2 text-[0.9375rem] font-medium">TOTAL PROFIT
                                    </p>
                                    <h4 className="mb-4 font-medium">$41,633</h4>
                                </div>
                                <div>
                                    <span className="avatar avatar-md bg-success/[0.15]  text-success">
                                        <svg className="fill-success" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none" />
                                            <path
                                                d="M88,216a24,24,0,0,0,24-24c0-10-8-16-8-16H216s8,6,8,16a24,24,0,0,1-24,24Z"
                                                opacity="0.2" />
                                            <path d="M200,176V64a24,24,0,0,0-24-24H40" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <line x1="104" y1="104" x2="168" y2="104" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <line x1="104" y1="136" x2="168" y2="136" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <path
                                                d="M24,80s-8-6-8-16a24,24,0,0,1,48,0V192a24,24,0,0,0,48,0c0-10-8-16-8-16H216s8,6,8,16a24,24,0,0,1-24,24H88"
                                                fill="none" stroke="currentColor" strokeLinecap="round"
                                                strokeLinejoin="round" strokeWidth="16" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                    <span className="text-success font-semibold me-1 inline-block"><i className="fe fe-arrow-up"></i>+1.3%</span> vs Last Month
                                </div>
                                <Link scroll={false} href="#!"> <span className="float-end text-[0.75rem] font-medium text-success">View All <i className="ti ti-arrow-narrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="mb-2 text-[0.9375rem] font-medium">TOTAL BALANCE
                                    </p>
                                    <h4 className="mb-4 font-medium">$67,556</h4>
                                </div>
                                <div>
                                    <span className="avatar avatar-md bg-orangemain/[0.15]  text-orangemain">
                                        <svg className="fill-orangemain" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none" />
                                            <path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" />
                                            <path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" />
                                            <line x1="128" y1="24" x2="128" y2="48" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <line x1="128" y1="208" x2="128" y2="232" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="16" />
                                            <path
                                                d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"
                                                fill="none" stroke="currentColor" strokeLinecap="round"
                                                strokeLinejoin="round" strokeWidth="16" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                    <span className="text-danger font-semibold me-1 inline-block"><i className="fe fe-arrow-down"></i>-0.1%</span> vs Last Month
                                </div>
                                <Link scroll={false} href="#!"> <span className="float-end text-[0.75rem] font-medium text-orangemain">View All <i className="ti ti-arrow-narrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid xxl:grid-cols-5 grid-cols-1 gap-x-6">
                {widgetsdata.widgetsRow3.map((idx) => (
                    <div className="col-span-1" key={idx.title}>
                        <div className="box">
                            <div className="box-body">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div>
                                        <span className={`avatar avatar-sm bg-${idx.svgIconBg}/[0.15] text-${idx.svgIconBg}`}>
                                            <i className={`ri-${idx.svgIcon} text-[1rem]`}></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow text-textmuted dark:text-textmuted/50 text-[0.875rem]">{idx.title}</div>
                                    <div className="ti-dropdown hs-dropdown">
                                        <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown"
                                            aria-expanded="false" className="">
                                            <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                        </Link>
                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="h4 font-medium mb-1 flex items-center flex-wrap gap-2">{idx.price}
                                        <span className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} !text-[0.625rem]`}>
                                            <i className={`ri-arrow-left-${idx.icon}-line`}></i>{idx.badgeText}
                                        </span>
                                    </div>
                                </div>
                                <div id="chart-5">
                                    <Spkapexcharts chartOptions={idx.chartOptions} chartSeries={idx.chatrSeries} type="line" width={200} height={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                {widgetsdata.widgetsRow4.map((idx) => (
                    <div className="xl:col-span-3 col-span-12" key={idx.title}>
                        <div className="box ">
                            <div className="box-body">
                                <div className=" flex items-center justify-between">
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-2">
                                            <span className={`avatar avatar-rounded avatar-md bg-${idx.iconbg}/[0.15] svg-${idx.iconbg} mb-2`}>
                                                {idx.icon}
                                            </span>
                                        </div>
                                        <p className="flex-grow text-textmuted dark:text-textmuted/50 text-[0.875rem] !mb-0">{idx.title}</p>
                                    </div>
                                    <div id="chart-10" className="">
                                        <Spkapexcharts chartOptions={idx.chartOptions} chartSeries={idx.chartSeries} type="bar" width={100} height={100} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[1.375rem] font-medium mb-0 flex items-center">{idx.price}
                                    </div>
                                    <span className="text-success badge bg-success/[0.15] !rounded-full flex items-center text-[0.6875rem] me-0 ms-2 mb-0">
                                        <i className="ri-arrow-left-up-line text-[0.6875rem]"></i>+2.5%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                TOTAL SALES
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="circlechart">
                                <Spkapexcharts chartOptions={widgetsdata.SalesOverviewOptions} chartSeries={widgetsdata.SalesOverviewSeries} type="radialBar" width={'100%'} height={300} />
                            </div>
                        </div>
                        <div className="box-footer !p-0 !border-t-0">
                            <div className="grid grid-cols-12 gap-x-6 border-t border-t-[dashed]  border-defaultborder dark:border-defaultborder/10">
                                <div className="xl:col-span-6 col-span-12 border-e border-e-[dashed] border-defaultborder dark:border-defaultborder/10">
                                    <div className="text-center p-4">
                                        <span className="text-[0.875rem] visit-gender male">Avarage Sales</span>
                                        <div className="mt-1">
                                            <span className="text-[1.25rem] font-medium">1,654</span>
                                        </div>
                                        <span className="badge bg-success/[0.15] text-success mt-1">+12.3%</span>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <div className="text-center p-4">
                                        <span className="text-[0.875rem] visit-gender female">Average Profit</span>
                                        <div className="mt-1">
                                            <span className="text-[1.25rem] font-medium">$12,234</span>
                                        </div>
                                        <span className="badge bg-danger/[0.15] text-danger mt-1">-11.3%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                Total Revenue
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center mb-2">
                                <h3 className="font-semibold mb-0">$4,289</h3>
                                <div className="ms-2">
                                    <span className="badge bg-success/[0.15] text-success">1.02<i className="ti ti-caret-up align-mmiddle ms-1"></i></span>
                                </div>
                            </div>
                            <div className="progress-stacked !h-2 flex">
                                <div className="progress-bar w-[30%]" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div>
                                <div className="progress-bar !bg-secondary !rounded-none w-[20%]" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
                                <div className="progress-bar !bg-success !rounded-none  w-[23%]" role="progressbar" aria-valuenow={23} aria-valuemin={0} aria-valuemax={100}> </div>
                                <div className="progress-bar !bg-orangemain !rounded-s-none !rounded-e-full w-[27%]" role="progressbar" aria-valuenow={27} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>
                        <div className="box-footer !p-0">
                            <ul className="ti-list-group ti-list-group-flush">
                                <li className="ti-list-group-item">
                                    <div className="flex items-center">
                                        <div className="flex-grow items-center pt-1">
                                            <div className="flex items-top justify-between">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 flex items-center">
                                                    <i className="ti ti-point-filled text-[1.25rem] text-primary me-2"></i>Today Revenue
                                                </p>
                                                <h6 className="mb-0 leading-none font-medium">$256</h6>
                                            </div>
                                            <div className="text-danger "><i className="ri-arrow-down-s-fill me-1 align-middle"></i>-1.05% </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item success">
                                    <div className="flex items-center">
                                        <div className="flex-grow items-center pt-1">
                                            <div className="flex items-top justify-between">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.875rem]  flex items-center">
                                                    <i className="ti ti-point-filled text-[1.25rem] text-success me-2"></i>This Week Revenue
                                                </p>
                                                <h6 className="mb-0 leading-none font-medium">$5,532</h6>
                                            </div>
                                            <div className="text-success"><i className="ti ti-caret-up me-1 align-middle"></i>+0.64%</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item warning">
                                    <div className="flex items-center">
                                        <div className="flex-grow items-center pt-1">
                                            <div className="flex items-top justify-between">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.875rem] flex items-center"><i
                                                    className="ti ti-point-filled text-[1.25rem] text-warning me-2"></i>This
                                                    Month Revenue</p>
                                                <h6 className="mb-0 leading-none font-medium">$29,754</h6>
                                            </div>
                                            <div className="text-success "><i className="ti ti-caret-up me-1 align-middle"></i>+0.82%</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item success">
                                    <div className="flex items-center">
                                        <div className="flex-grow items-center pt-1">
                                            <div className="flex items-top justify-between">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.875rem]  flex items-center"><i
                                                    className="ti ti-point-filled text-[1.25rem] text-success me-2"></i>This Year Revenue</p>
                                                <h6 className="mb-0 leading-none font-medium">$2,25,116</h6>
                                            </div>
                                            <div className="text-success"><i className="ti ti-caret-up me-1 align-middle"></i>+0.21%</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SALES REVENUE
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="salerevenue">
                                <Spkapexcharts chartOptions={widgetsdata.SalesRevenueOptions} chartSeries={widgetsdata.SalesRevenueSeries} type="line" width={'100%'} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SALES REVENUE
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="salerevenue1">
                                <Spkapexcharts chartOptions={widgetsdata.SalesRevenueOptions1} chartSeries={widgetsdata.SalesRevenueSeries1} type="line" width={'100%'} height={328} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box overflow-hidden">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"200px"}}  src="../assets/images/media/media-3.jpg" className="card-img-top" 
                            alt="..." />
                        <div className="card-img-overlay-profile">
                            <div className="flex items-start text-white">
                                <div className="flex-grow text-center">
                                    <div className="mt-1 items-center justify-between text-[1.375rem] mb-1">
                                        <span>Today Budget</span>
                                        <span className="min-w-fit !text-[0.625rem] ms-1 "></span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex-grow text-[1.875rem] font-semibold sale-font counter">$59,700
                                            <span> </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-3 px-3">
                                <div className="flex items-start">
                                    <span className="avatar avatar-sm !rounded-full me-3 bg-white/[0.15] mt-2">
                                        <i className="bx bx-up-arrow-alt text-[1.25rem] text-white"></i>
                                    </span>
                                    <div className="flex-grow text-white">
                                        <div className="flex items-center justify-between text-[1.25rem] font-medium">
                                            <span>$35,800</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex-grow text-[0.8125rem] font-semibold">Profit</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex ms-5">
                                    <span className="avatar avatar-sm !rounded-full me-3 bg-white/[0.15] mt-2">
                                        <i className="bx bx-down-arrow-alt text-[1.25rem] text-white"></i>
                                    </span>
                                    <div className="flex-grow text-white">
                                        <div
                                            className="flex items-center justify-between text-[1.25rem] font-medium">
                                            <span>$12,800</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex-grow text-[0.8125rem] font-semibold">Expense</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <span className="avatar avatar-rounded bg-danger/[0.15] text-danger"><i className="ti ti-clock  text-[1.375rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="mb-0 font-medium block">Total-Income</span>
                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">Average Income Per Hour</span>
                                        </div>
                                        <div className="text-end">
                                            <span className="text-danger font-medium text-[1.25rem]">$17.03</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <span className="avatar avatar-rounded bg-info/[0.15] text-info"><i className="ti ti-bolt text-[1.375rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="mb-0 font-medium block">Total-Income</span>
                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">Average Income Per Hour</span>
                                        </div>
                                        <div className="text-end">
                                            <span className="text-info font-medium text-[1.25rem]">$77.93</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <span className="avatar avatar-rounded bg-warning/[0.15]"><i className="ti ti-activity-heartbeat text-warning text-[1.375rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="mb-0 font-medium block">Total-Income</span>
                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">Average Income Per Hour</span>
                                        </div>
                                        <div className="text-end">
                                            <span className="text-warning font-medium text-[1.25rem]">$970.63</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                RECENT ACTIVITY
                            </div>
                        </div>
                        <div className="box-body">
                            <ul className="widgets-task-list mb-0 ps-[2rem]">
                                <li className="">
                                    <div className=""> <i className="task-icon bg-primary"></i>
                                        <h6 className=" mb-0">Task Finished</h6>
                                        <div className="flex-grow flex items-center justify-between">
                                            <div> <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Adam Berry finished
                                                task on <Link scroll={false} href="#!" className="text-primary"> AngularJS Template </Link></span> </div>
                                            <div className="min-w-fit ms-2 text-end">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]"> 09 July 2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className=""> <i className="task-icon bg-primary"></i>
                                        <h6 className=" mb-0">Task Overdue</h6>
                                        <div className="flex-grow flex items-center justify-between">
                                            <div> <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Petey Cruiser
                                                finished</span> <Link scroll={false} href="#!"
                                                    className="text-secondary">
                                                    Integrated management</Link> </div>
                                            <div className="min-w-fit ms-2 text-end">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]">29 June 2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className=""> <i className="task-icon bg-primary"></i>
                                        <h6 className=" mb-0">Task Finished</h6>
                                        <div className="flex-grow flex items-center justify-between">
                                            <div> <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Adam Berry finished
                                                task on</span>
                                                <Link scroll={false} href="#!" className="text-success">  AngularJS Template</Link>
                                            </div>
                                            <div className="min-w-fit ms-2 text-end">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]">09 July 2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className=""> <i className="task-icon bg-primary"></i>
                                        <h6 className=" mb-0">Completed Homework</h6>
                                        <div className="flex-grow flex items-center justify-between">
                                            <div> <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Adam Berry finished
                                                task on</span>
                                            </div>
                                            <div className="min-w-fit ms-2 text-end">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]">09 July 2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className=""> <i className="task-icon bg-primary"></i>
                                        <h6 className=" mb-0">Reached Target</h6>
                                        <div className="flex-grow flex items-center justify-between">
                                            <div> <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Adam Berry finished
                                                task on</span>
                                            </div>
                                            <div className="min-w-fit ms-2 text-end">
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]">09 July 2021</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}

            {/* <!-- Start:: row-7 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                SALES REVENUE
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="salerevenue2">
                                <Spkapexcharts chartOptions={widgetsdata.SalesRevenueOptions2} chartSeries={widgetsdata.SalesRevenueSeries2} type="line" width={'100%'} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                ACTIVE CUSTOMERS
                            </div>
                        </div>
                        <div className="box-body">

                            <div id="activecustomers">
                                <Spkapexcharts chartOptions={widgetsdata.ActiveCustomersOptions} chartSeries={widgetsdata.ActiveCustomersSeries} type="radialBar" width={'100%'} height={280} />
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="grid grid-cols-12 gap-x-6 mt-0">
                                <div className="xl:col-span-6 col-span-12 border-e border-e-[dashed] dark:border-defaultborder/10 text-center">
                                    <p className="text-textmuted dark:text-textmuted/50 mb-1 text-[0.75rem]">Male</p>
                                    <h6 className="text-primary">12.34K</h6>
                                </div>
                                <div className="xl:col-span-6 col-span-12 text-center">
                                    <p className="text-textmuted dark:text-textmuted/50 mb-1 text-[0.75rem]">Female</p>
                                    <h6 className="text-secondary">10.19K</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                TOP SALES
                            </div>
                        </div>
                        <div id="top-sales">
                            <Spkapexcharts chartOptions={widgetsdata.TopSalesOptions} chartSeries={widgetsdata.TopSalesSeries} type="area" width={'100%'} height={330} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-7 --> */}
        </Fragment>
    )
}

export default Widgets;
