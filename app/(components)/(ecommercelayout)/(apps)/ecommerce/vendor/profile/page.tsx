"use client"
import SpkFollowerCard from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-follower-card";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { LandingPageProducts } from "@/shared/data/apps/ecommers/customer/landing-page-data";
import { TestimonialsSwiperComponent, FollowersTabdata, Followingbdata } from "@/shared/data/apps/ecommers/customer/product-details-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Profile = () => {
    const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    };
    return (
        <Fragment>
            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Public Profile"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Vendor']} currentpage="Public Profile" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <div className="landing-banner">
                <section className="!py-[3rem]">
                    <div className="container main-banner-container !py-0">
                        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                            <div className="lg:col-span-9 col-span-12">
                                <div className="flex items-center flex-wrap gap-3">
                                    <div>
                                        <span className="vendor-company-icon !bg-white dark:bg-bodbg">
                                            <Image fill src="../../../assets/images/company-logos/7.png" alt="" />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-0 flex items-center"><Link scroll={false} href="#!">
                                            Andrew Retail PVT LTD</Link></h4>
                                        <p className="mb-2">Member Since <span className="font-semibold">2005</span></p>
                                        <div className="flex items-center text-[0.875rem] mb-2">
                                            <p className="text-[0.9375rem] font-semibold mb-0">Customer Ratings : </p>
                                            <div className="min-w-fit ms-3">
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning"><i className="bi bi-star-half"></i></span>
                                            </div>
                                            <p className="mb-0 mx-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                <span> (142)</span>
                                                <span> Ratings</span>
                                            </p>
                                        </div>
                                        <span className="badge badge-md bg-info/[0.15] text-info me-1"><i
                                            className="bi bi-briefcase-fill me-2"></i>156 Products</span>
                                        <span className="badge badge-md bg-danger/[0.15] text-danger"><i
                                            className="bi bi-bar-chart-fill me-2"></i>100 Sales</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-3 col-span-12">
                                <div className="ti-btn-list">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-primary"><i
                                        className="ri-user-follow-line me-2"></i> Follow</Link>
                                    <Link scroll={false} href="#!"
                                        className="ti-btn ti-btn-icon ti-btn-soft-primary btn-wave">
                                        <i className="ri-share-line"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Section-1 --> */}

            {/* <!-- Start:: Nav Tabs--> */}
            <div className="border-b bg-white border-defaultborder dark:border-defaultborder/10 dark:!bg-bodybg">
                <div className="container">
                    <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse flex-wrap" role="tablist">
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary p-3 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary active"
                            href="#!" id="tab1" data-hs-tab="#tab-1" aria-controls="tab-1"> Profile
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary p-3 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                            href="#!" id="tab2" data-hs-tab="#tab-2" aria-controls="tab-2"> All
                            Products
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary p-3 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                            href="#!" id="tab3" data-hs-tab="#tab-3" aria-controls="tab-3"> Top Deals
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary p-3 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                            href="#!" id="tab4" data-hs-tab="#tab-4" aria-controls="tab-4"> Followers
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary p-3 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                            href="#!" id="tab5" data-hs-tab="#tab-5" aria-controls="tab-5"> Following
                        </Link>
                    </nav>
                </div>
            </div>
            {/* <!-- End:: Nav Tabs--> */}

            {/* <!-- Start:: Section-2 --> */}
            <section className="section !py-6 bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane border-0 p-0 show active" id="tab-1" role="tabpanel" aria-labelledby="tab1">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="lg:col-span-8 col-span-12">
                                    <div className="mb-4">
                                        <div className="deals-bundle deals-bundle1">
                                            <span className="icon">
                                                <Image fill src="../../../assets/images/company-logos/1.png" alt=""
                                                    className="img-fluid" />
                                            </span>
                                            <h4 className="font-semibold mb-4 text-fixed-white">Andrew Retail PVT LTD</h4>
                                            <div className="grid grid-cols-12 gap-x-6 text-center gap-y-4 justify-center">
                                                <div className="md:col-span-2 col-span-12"></div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="p-2 !rounded-sm bg-white/[0.15]">
                                                        <h5 className="mb-1 font-semibold text-fixed-white">234+</h5>
                                                        <h6 className="mb-0 text-fixed-white">Products</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="p-2 !rounded-sm bg-white/[0.15]">
                                                        <h5 className="mb-1 font-semibold text-fixed-white">342+</h5>
                                                        <h6 className="mb-0 text-fixed-white">Customers</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                About Andrew Retail PVT LTD
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <p>Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum
                                                sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum
                                                erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy
                                                vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                            <p>Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit
                                                ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum
                                                ipsum nonumy vero sanctus labore.A officiis optio temporibus minima
                                                facilis...</p>

                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Return and Refund Policies
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <p className="mb-0">Please refer to the <Link scroll={false} href="#!"
                                                className="text-primary me-1"><u> Andrew Retail Policies</u></Link></p>
                                        </div>
                                    </div>
                                    <div className="box border !bg-primary/[0.15] shadow-none">
                                        <div className="box-body">
                                            <div className="grid grid-cols-12 gap-x-6 items-center">
                                                <div className="lg:col-span-8 col-span-12">
                                                    <h5 className="font-semibold mb-0">&#128400; Was this profile useful to
                                                        someone?</h5>
                                                </div>
                                                <div className="lg:col-span-4 col-span-12 text-end">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-success"
                                                        role="button">
                                                        <i className="ri-share-line me-2"></i>Share Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mt-[3rem]">
                                        <div className="xl:col-span-12 col-span-12">
                                            <h4 className="font-semibold mb-0">Top Products</h4>
                                            <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua
                                            </p>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <SpkSwiperJs navigation={true} slides={TestimonialsSwiperComponent} slidesPerView={3} spaceBetween={30} breakpoint={breakpoints} autoplay={true} className="mySwiper swiper swiper-related-jobs" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 col-span-12">
                                    <div className="box overflow-hidden">
                                        <div className="box-body !p-0">
                                            <div className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                                <div>
                                                    <span className="avatar avatar-xl avatar-rounded online me-3">
                                                        <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow main-profile-info">
                                                    <div className="font-semibold mb-1 h5">Jack Miller <div className="hs-tooltip ti-main-tooltip">
                                                        <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                            <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                            <span
                                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                                role="tooltip">
                                                                Verified User
                                                            </span>
                                                        </Link>
                                                    </div></div>
                                                    <p className="mb-0">Member Since <span className="font-semibold">2005</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                                <div className="flex mb-0 justify-center">
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">113</h6>
                                                        <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">Products</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">12.2k</h6>
                                                        <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">Followers</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">128</h6>
                                                        <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">Following</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 flex items-center">
                                                <p className="text-[0.9375rem] mb-0 me-4 font-semibold">Social :</p>
                                                <div className="ti-btn-list mb-0">
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave mb-xl-0">
                                                        <i className="ri-facebook-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave mb-xl-0">
                                                        <i className="ri-twitter-x-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave mb-xl-0">
                                                        <i className="ri-instagram-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave mb-xl-0">
                                                        <i className="ri-github-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave mb-xl-0">
                                                        <i className="ri-youtube-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box overflow-hidden">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Get in touch with Seller
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="Vendorusername"
                                                        className="ti-form-label font-semibold">Username</label>
                                                    <input type="text" className="form-control" id="Vendorusername"
                                                        placeholder="Vendor username" defaultValue="Andrew Retail" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="email-address" className="ti-form-label font-semibold">Email
                                                        Address</label>
                                                    <input type="text" className="form-control" id="email-address"
                                                        placeholder="xyz@gmail.com" defaultValue="json@gmail.com" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="phone-number" className="ti-form-label font-semibold">Mobile
                                                        Number</label>
                                                    <input type="text" className="form-control" id="phone-number"
                                                        placeholder="*** *** ****" defaultValue="65432 76765" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <div className="grid">
                                                <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Submit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab-2" role="tabpanel" aria-labelledby="tab2">
                            <div className="box shadow-none">
                                <div className="box-body !p-2">
                                    <nav className="navbar navbar-expand-xxl bg-white dark:bg-bodybg">
                                        <div className="container-fluid">
                                            <div className="xxl:flex flex-wrap gap-x-5 gap-y-2 mt-5 sm:mt-0">
                                                <ul
                                                    className="navbar-nav me-auto lg:mb-0 xxl:items-center xxl:flex flex-grow mt-2 xxl:mt-0 items-center flex-wrap">
                                                    <li className="nav-item mb-2 xxl:mb-0"> <a
                                                        className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 active hover:!text-primary"
                                                        aria-current="page" href="#!">Men</a> </li>
                                                    <li className="nav-item mb-2 xxl:mb-0"> <a
                                                        className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 hover:!text-primary"
                                                        href="#!">Women</a> </li>
                                                    <li
                                                        className="nav-item mb-2 xxl:mb-0 hs-dropdown ti-dropdown rtl:[--placement:bottom-right]">
                                                        <Link scroll={false} className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 dropdown-toggle"
                                                            href="#!" id="navbarDropdown"
                                                            aria-expanded="false"> Kids<i
                                                                className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                                        </Link>
                                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden"
                                                            aria-labelledby="navbarDropdown">
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Action</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Another action</Link> </li>
                                                            <li>
                                                                <hr className="dropdown-divider" />
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Something else here</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="nav-item mb-2 xxl:mb-0"> <Link scroll={false} href="#!"
                                                        className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 hover:!text-primary">Today
                                                        Deals</Link> </li>
                                                    <li className="nav-item mb-2 xxl:mb-0"> <Link scroll={false} href="#!"
                                                        className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 hover:!text-primary">Electronics</Link>
                                                    </li>
                                                    <li className="nav-item mb-2 xxl:mb-0"> <Link scroll={false} href="#!"
                                                        className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80 hover:!text-primary">Fashion</Link>
                                                    </li>
                                                </ul>
                                                <div className="flex flex-wrap gap-2" role="search"> <input
                                                    className="form-control !w-full !rounded-sm me-2" type="search"
                                                    placeholder="Search" aria-label="Search" /> <button
                                                        className="ti-btn ti-btn-light !font-medium"
                                                        type="submit">Search</button>
                                                    <div
                                                        className="ti-dropdown hs-dropdown p-1">
                                                        <button className="ti-btn  !text-[0.75rem] ti-btn-primary !m-0"
                                                            type="button" aria-expanded="false"> SortBy<i
                                                                className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                                        </button>
                                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Featured</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Price: High to
                                                                Low</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item active !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Price: Low to
                                                                High</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Newest</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                                href="#!">Ratings</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-6">
                                {LandingPageProducts.slice(0, 8).map((idx) => (
                                    <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12" key={idx.id}>
                                        <div className="box card-style-2">
                                            <div className="box-body !p-0">
                                                <span className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}>{idx.badge}</span>
                                                <div className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}>
                                                    <div className="badge-icon"><i className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}></i></div>
                                                    <div className="badge-text">{idx.text}</div>
                                                </div>
                                                <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                                                    <Link scroll={false} href="/ecommerce/customer/product-details" className="stretched-link"></Link>
                                                    <div className="btns-container-1 items-center gap-1">
                                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                                            <i className="ti ti-eye text-[0.875rem]"></i>
                                                        </Link>
                                                        <div className="hs-tooltip ti-main-tooltip">
                                                            <Link scroll={false} href="/ecommerce/customer/compare-products" className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                                                <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                                                <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">
                                                                    Compare
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="hs-tooltip ti-main-tooltip">
                                                            <Link scroll={false} href="/ecommerce/customer/cart" className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                                                <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                                                <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                                                    role="tooltip">
                                                                    Add to cart
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="img-box-2 p-2 relative">
                                                        <Image fill src={idx.image} alt="img" className="scale-img img-fluid w-full bg-light rounded" />
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-grow">
                                                            <Link scroll={false} href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{idx.brand}</Link>
                                                            <h6 className="mb-1 font-semibold text-[1rem]"><a
                                                                href="/ecommerce/customer/product-details">{idx.title}</a></h6>
                                                            <div className="flex items-baseline text-[0.6875rem]">
                                                                <div className="min-w-fit">
                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning"><i className="bi bi-star-half"></i></span>
                                                                </div>
                                                                <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                                    <span> (142)</span>
                                                                    <span> Ratings</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="min-w-fit">
                                                            <div className="hs-tooltip ti-main-tooltip">
                                                                <Link scroll={false} href="/ecommerce/customer/wishlist" className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}>
                                                                    <i className="bi bi-heart outline1"></i>
                                                                    <i className="bi bi-heart-fill filled"></i>
                                                                    <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                                                        role="tooltip">
                                                                        Wishlist
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-baseline mt-4">
                                                        <h5 className="font-semibold text-primary mb-0">{idx.price}</h5>
                                                        <span
                                                            className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">{idx.oldPrice}</span>
                                                    </div>
                                                </div>
                                                <Link scroll={false} href="/ecommerce/customer/cart" className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-tl-md  rtl:!rounded-tr-md rtl:!rounded-tl-none">
                                                    <i className="ti ti-shopping-cart-plus me-1"></i>Add
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="xl:col-span-12 col-span-12">
                                    <nav aria-label="Page navigation" className="pagination-style-4 float-end">
                                        <ul className="ti-pagination mb-0">
                                            <li className="page-item">
                                                <Link scroll={false} className="page-link disabled" href="#!">
                                                    Prev
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link active"
                                                href="#!">1</Link></li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link scroll={false} className="page-link" href="#!">
                                                    <i className="bi bi-three-dots"></i>
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">16</Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">17</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link scroll={false} className="page-link text-primary" href="#!">
                                                    next
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab-3" role="tabpanel" aria-labelledby="tab3">
                            <div className="grid grid-cols-12 gap-x-6 mb-4">
                                <div className="xl:col-span-12 col-span-12">
                                    <h5 className="mb-4 font-semibold">Limited Time Deals</h5>
                                </div>
                                {LandingPageProducts.filter(item => item.Deals === 'Deals').map((idx) => (
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-12 col-span-12" key={idx.id}>
                                        <div className="box card-style-1 custom-card mb-[3rem]">
                                            <div className="box-body !p-4">
                                                <div className="card-content">
                                                    <div className="grid grid-cols-12 sm:gap-x-6">
                                                        <div className="md:col-span-4 col-span-12">
                                                            <div className="img-box-1 bg-light rounded">
                                                                <Link className="relative" scroll={false} href="/ecommerce/customer/product-details">
                                                                    <Image fill src={idx.image} alt="img" className="scale-img img-fluid w-full" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-8 col-span-12">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex-grow">
                                                                    <Link scroll={false} href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{idx.dealsBrand}</Link>
                                                                    <h6 className="mb-1 font-semibold"><Link scroll={false} href="/ecommerce/customer/product-details">{idx.title}</Link>
                                                                    </h6>
                                                                    <div className="flex items-baseline text-[0.6875rem]">
                                                                        <div className="min-w-fit">
                                                                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                            <span className="text-warning"><i className="bi bi-star-half"></i></span>
                                                                        </div>
                                                                        <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                                            <span> (45)</span>
                                                                            <span> Ratings</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-fit">
                                                                    <div className="hs-tooltip ti-main-tooltip">
                                                                        <Link scroll={false} href="/ecommerce/customer/wishlist"
                                                                            className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}>
                                                                            <i className="bi bi-heart outline1"></i>
                                                                            <i className="bi bi-heart-fill filled"></i>
                                                                            <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">
                                                                                Wishlist
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-grow flex items-baseline">
                                                                    <h5 className="font-semibold text-primary mb-0">{idx.price}</h5>
                                                                    <span
                                                                        className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">{idx.oldPrice}</span>
                                                                </div>
                                                                <div className="min-w-fit">
                                                                    <Link scroll={false} href="/ecommerce/customer/cart" className="ti-btn ti-btn-primary !border-0">
                                                                        <i className="ti ti-shopping-cart-plus me-1"></i>Add
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-custom-bottom p-4">
                                                    <div className="flex items-center gap-2 text-center flex-wrap">
                                                        <div className="counter-box">
                                                            <p className="mb-0 text-[0.9375rem] text-primary">01</p>
                                                            <span
                                                                className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">Days</span>
                                                        </div>
                                                        <div className="counter-box">
                                                            <p className="mb-0 text-[0.9375rem] text-primary">18</p>
                                                            <span
                                                                className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">Hours</span>
                                                        </div>
                                                        <div className="counter-box">
                                                            <p className="mb-0 text-[0.9375rem] text-primary">45</p>
                                                            <span
                                                                className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">Min</span>
                                                        </div>
                                                        <div className="counter-box">
                                                            <p className="mb-0 text-[0.9375rem] text-primary">16</p>
                                                            <span
                                                                className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">Sec</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab-4" role="tabpanel" aria-labelledby="tab4">
                            <div className="grid grid-cols-12 gap-x-6">
                                {FollowersTabdata.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkFollowerCard card={card} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab-5" role="tabpanel" aria-labelledby="tab5">
                            <div className="grid grid-cols-12 gap-x-6">
                                {Followingbdata.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkFollowerCard card={card} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}

            {/* <!-- Start:: Section-3 --> */}
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
                        <div className="ti-btn-list">
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                App Store
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-3 --> */}
        </Fragment>
    );
};

export default Profile;