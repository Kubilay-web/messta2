"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { DomainOverview, SwiperComponent, MarketInsightsOptions, MarketInsightsSeries, SimilarDomains } from "@/shared/data/apps/domain/domain-details-data";
import { DomainGallerylist } from "@/shared/data/apps/domain/domain-gallerydata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const DomainDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize with -1 for no item expanded

    const toggleDropdown = (index: any) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand the clicked item
        }
    };

    return (
        <Fragment>

            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner ad-search-container !bg-primary">
                <section className="section !py-[3rem] mt-[3rem] lg:!mt-0">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                            <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                                <div className="">
                                    <div className="input-group inline-flex gap-0 group-search xl:flex">
                                        <div className="category-dropdown-wrapper ti-dropdown hs-dropdown">
                                            <Link scroll={false} href="#!" onClick={() => setIsOpen(!isOpen)}
                                                className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0">
                                                <i className="ri-function-line me-2 text-primary"></i>Browse<i
                                                    className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="categories-dropdowns">
                                                <li className="category-dropdown">
                                                    <ul className="main-dropdown active" style={{ display: isOpen ? 'block' : 'none' }} id="dropdown-toggle">
                                                        <li onClick={() => toggleDropdown(0)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 0 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-window-line"></i></span>Websites
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">Ecommerce</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Marketplace</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Services</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Realestate</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(1)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 1 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-android-line"></i></span>
                                                                Apps
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">All Apps</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Android Apps</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">IOS Apps</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(2)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 2 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-server-line"></i></span>
                                                                Domains
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">All Domains</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">.com</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">.org</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">.net</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">.in</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(3)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 3 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-shopping-cart-line"></i></span>
                                                                Ecommerce
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">Land</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Flat</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Houses</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Shops</Link></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="custom-form-group flex-grow">
                                            <input type="text"
                                                className="form-control  lg:!rounded-none shadow-none border-0 !border-s"
                                                id="input-placeholder" placeholder="Search Demain..." />
                                        </div>
                                        <button
                                            className="ti-btn ti-btn-lg ti-btn-secondary !border-0 shadow-sm search-btn !m-0"
                                            type="button"><i className="bi bi-search"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}

            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4 !bg-white dark:!bg-bodybg">
                <div className="container">
                    <Seo title={"Domain Details"} />
                    <Pageheader breadcrumbs={['Apps', 'Domain']} currentpage="Domain Details" Updated={true} />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div>
                                        <span className="badge !rounded-full bg-warning mb-1 text-white">Domain</span>
                                        <div className="font-semibold mb-2 flex h5 items-center">
                                            <Link scroll={false} href="/domain/domain-details">
                                                spotechtechnical.com
                                                <span className="hs-tooltip ti-main-tooltip">
                                                    <span className="p-1 hs-tooltip-toggle">
                                                        <i className="bi bi-check-circle-fill text-success ms-2 !text-[1rem]"></i>
                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                            role="tooltip">
                                                            Verified Domain
                                                        </span>
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="flex items-baseline mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 me-2">
                                                <span className=""><i className="bi bi-geo-alt me-1"></i>Banglore</span>
                                                <span>,</span>
                                                <span className="">20 Dec 2024</span>
                                            </div>
                                            <span className="text-danger">( 30 Views )</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-x-6 mb-4">
                                            <div className="xxl:col-span-12 col-span-12">
                                                <p className="mb-1 lh-1 text-[0.6875rem] text-success font-semibold">Last Bidding Price</p>
                                                <p className="mb-1"><span className="h3 font-semibold">$1,299.00</span><span className="ms-3 badge bg-info/[0.15] text-info">12 Bids</span></p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-[0.9375rem] font-semibold mb-1">Description :</p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                                                accusamus, quaerat nam quo optio reiciendis harum reprehenderit omni.
                                            </p>
                                        </div>
                                        <div className="flex items-stretch gap-2 mb-0">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-primary"><i className="ti ti-phone"></i> Contact Seller</Link>
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-outline-light" data-bs-toggle="tooltip" aria-label="Share"><i className="ti ti-share"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-6 gap-y-4 justify-center mb-4">
                                <div
                                    className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/domains/icons/1.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">Age : 24 Years</p>
                                    </div>
                                </div>
                                <div
                                    className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/domains/icons/2.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">
                                            Industry : Business
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/domains/icons/3.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">
                                            Expires : 27 Days
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        About the domain
                                    </div>
                                </div>
                                <div className="box-body">
                                    <p className="mb-4">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                                        magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est
                                        amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A
                                        officiis optio temporibus minima facilis...</p>
                                    <h6 className="font-semibold mb-3">Features</h6>
                                    <ul className="list-group list-unstyled">
                                        <li className="p-1">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-1"></i></span>
                                            Incorporated Association.
                                        </li>
                                        <li className="p-1">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-1"></i> </span> Separate
                                            Legal Entity.
                                        </li>
                                        <li className="p-1">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-1"></i></span> Limited
                                            Liability.
                                        </li>
                                        <li className="p-1">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-1"></i></span>
                                            Transferability of Shares.
                                        </li>
                                        <li className="p-1">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-1"></i></span> Perpetual
                                            Existence.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Market Insights
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div id="market-analytics" className="p-4">
                                        <Spkapexcharts chartOptions={MarketInsightsOptions} chartSeries={MarketInsightsSeries} type="line" width={"100%"} height={300} />
                                    </div>
                                </div>
                            </div>
                            <div className="box border !bg-primary/10">
                                <div className="box-body">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div>
                                            <h5 className="font-semibold mb-0">&#128400; Was this domain helpful to someone?
                                            </h5>
                                        </div>
                                        <div>
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-success" role="button">
                                                <i className="ri-share-line me-2"></i>Share Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mt-[3rem] g-0">
                                <div className="xl:col-span-12 col-span-12">
                                    <h4 className="font-semibold mb-0">Related Domains</h4>
                                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <SpkSwiperJs slides={SwiperComponent} spaceBetween={30} centeredSlides={true} navigation={true} autoplay={true} className="mySwiper swiper swiper-related-jobs" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="">
                                    {/* <div className="hs-tooltip ti-main-tooltip !absolute top-[0.15rem] right-[0.15rem]"> */}
                                    <div className="hs-tooltip">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary !rounded-full top-wishlist-icon hs-tooltip-toggle">
                                            <i className="ri-heart-line"></i>
                                            <span
                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                role="tooltip">
                                                Add to wishlist
                                            </span>
                                        </Link>
                                    </div>
                                    <DomainGallerylist />

                                </div>
                                <div className="box-body text-center">
                                    <div className="bg-light text-default p-2 border mb-2 border-defaultborder dark:border-defaultborder/10">
                                        <span className="text-textmuted dark:text-textmuted/50">Time Ends In</span>
                                        <p className="text-[1.125rem] font-semibold mb-0">04hrs : 24m : 38s</p>
                                    </div>
                                    <p className="mb-3"><span className="text-textmuted dark:text-textmuted/50">Current Bid</span> : <span
                                        className="font-semibold text-default"> $345.00 </span><span
                                            className="text-textmuted dark:text-textmuted/50"> From </span> <Link scroll={false} href="#!"
                                                className="text-primary font-semibold">Jackmiller</Link></p>
                                    <div className="input-group flex-grow">
                                        <input type="email" className="form-control !border-s" id="inputEmail11"
                                            placeholder="Enter Amount.." />
                                        <button className="input-group-text ti-btn ti-btn-primary !bg-primary !text-white  !border !border-primary !m-0">
                                            Place Bid
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <div className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <div>
                                            <span className="avatar avatar-xl avatar-rounded online me-3">
                                                <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                            </span>
                                        </div>
                                        <div className="flex-grow main-profile-info">
                                            <div className="font-semibold mb-1 h5">Jack Miller <div className="hs-tooltip ti-main-tooltip">
                                                <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                    <i className="bi bi-check-circle-fill text-success !text-[0.875rem]"></i>
                                                    <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                        role="tooltip">
                                                        Verified User
                                                    </span>
                                                </Link>
                                            </div></div>
                                            <p className="mb-0">Member Since 2005</p>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="flex">
                                            <div className="input-group flex-grow">
                                                <div className="input-group-text">
                                                    <i className="fe fe-phone"></i>
                                                </div>
                                                <input type="email" className="form-control custom-domain" id="inputEmail1" placeholder="*** *** 7654" defaultValue="*** *** 7654" />
                                            </div>
                                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-primary !ms-2">
                                                <i className="ri-eye-line"></i>
                                            </Link>
                                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-secondary !ms-2">
                                                <i className="ri-message-line"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-header">
                                    <div className="box-title">
                                        Domain Overview
                                    </div>
                                </div>
                                <div className="box-body !p-2">
                                    <div className="table-responsive">
                                        <Spktables >
                                            {DomainOverview.map((idx) => (
                                                <tr key={idx.id}>
                                                    <td className="w-[50%] py-3 px-[1.15rem]">
                                                        <span className="font-semibold">{idx.label}</span>
                                                    </td>
                                                    <td className="py-3 px-[1.15rem]"> : </td>
                                                    <td className="py-3 px-[1.15rem]">{idx.value}</td>
                                                </tr>
                                            ))}
                                        </Spktables>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="flex items-center flex-wrap gap-3">
                                        <p className="text-[0.9375rem] mb-0 font-semibold">Social :</p>
                                        <div className="btn-list mb-0">
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light mb-xl-0">
                                                <i className="ri-facebook-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light mb-xl-0">
                                                <i className="ri-twitter-x-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light mb-xl-0">
                                                <i className="ri-instagram-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light mb-xl-0">
                                                <i className="ri-github-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light mb-xl-0">
                                                <i className="ri-youtube-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="alert alert-primary alert-dismissible fade show custom-alert-icon shadow-sm" role="alert">
                                <div className="flex">
                                    <span className="svg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" height="24px" viewBox="0 0 24 24"
                                            width="24px" fill="#000000">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                            </path>
                                        </svg>
                                    </span>
                                    <div className="ms-2">
                                        <h6 className="text-dark mb-0">
                                            Security & Safety Tips
                                        </h6>
                                        Check the necessary details before purchase.
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Similar Domains
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group similarads-list !border-0">
                                        {SimilarDomains.map((idx) => (
                                            <li className="ti-list-group-item" key={idx.id}>
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <div>
                                                        <Link scroll={false} href="#!">
                                                            <span className="avatar avatar-xxl">
                                                                <Image fill src={idx.image} className="img-fluid rounded-3 h-100" alt="..." />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="mb-2">
                                                            <span className={`badge bg-${idx.color}/[0.15] text-${idx.color} badge-sm mb-1`}>{idx.type}</span>
                                                            <h6 className="font-semibold mb-1">
                                                                <Link scroll={false} href="/domain/domain-details">{idx.name}</Link></h6>
                                                            <div className="flex items-baseline text-[0.6875rem]">
                                                                <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 me-2">
                                                                    <span className=""><i className="bi bi-geo-alt me-1"></i>{idx.location}</span>
                                                                    <span>,</span>
                                                                    <span className="">{idx.date}</span>
                                                                </div>
                                                                <span className="text-danger">( {idx.bids} Bids )</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <h6 className="font-semibold mb-0">{idx.price}</h6>
                                                            <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.8125rem]">
                                                                View Details <i className="fe fe-arrow-right"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="box-footer">
                                    <Link scroll={false} href="/domain/domain-details" className="text-primary font-semibold text-[0.875rem] mt-2">
                                        View All <i className="fe fe-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-1 --> */}


            {/* <!-- Start:: Section-2 --> */}
            <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
                <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                    <div className="lg:col-span-6 col-span-10 text-center">
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-white">&#128073; Download our free mobile apps today
                            </h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                            magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                            sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <div className="btn-list">
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                App Store
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}
        </Fragment>
    );
};

export default DomainDetails;