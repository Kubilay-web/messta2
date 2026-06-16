"use client"
import SpkFollowerCard from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-follower-card";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { RelatedProductsdata } from "@/shared/data/apps/market-place/details-data";
import { MarcketProductsData } from "@/shared/data/apps/market-place/landingdata";
import { FollowersTabdata, Followingbdata } from "@/shared/data/apps/market-place/userdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const UserProfile = () => {

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
            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4">
                <div className="container">
                    <Seo title={"User Public Profile"} />
                    <Pageheader breadcrumbs={['Apps', 'Marketplace']} currentpage="User Public Profile" Updated={true} />
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}
            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner !py-0 !z-[0]">
                <section className="!py-[3rem]">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                            <div className="md:col-span-8 lg:col-span-9 col-span-12">
                                <div className="flex items-center flex-wrap gap-x-4">
                                    <span className="marketplace-company-icon relative">
                                        <Image fill src="../../assets/images/company-logos/1.png" alt="" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold mb-0 flex items-center"><Link scroll={false} href="#!">
                                            sprukotechnologies</Link></h4>
                                        <p className="mb-2">Member Since <span className="font-semibold">2005</span></p>
                                        <div className="flex items-center text-[0.875rem] mb-2 flex-wrap">
                                            <p className="text-[0.9375rem] font-semibold mb-0">Author Ratings : </p>
                                            <div className="min-w-fit ms-3">
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
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
                                        <span className="badge badge-md bg-info/[0.15] text-info"><i
                                            className="bi bi-bar-chart-fill me-2"></i>156 Sales</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-4 lg:col-span-3 col-span-12 md:my-auto md:text-end">
                                <div className="btn-list">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg ti-btn-primary me-2">
                                        View Portfolio</Link>
                                    <Link scroll={false} href="#!"
                                        className="ti-btn ti-btn-icon ti-btn-lg ti-btn-soft-secondary btn-wave me-2">
                                        <i className="ri-user-follow-line"></i>
                                    </Link>
                                    <Link scroll={false} href="#!"
                                        className="ti-btn ti-btn-icon ti-btn-lg ti-btn-soft-success btn-wave me-2">
                                        <i className="ri-share-line"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}

            {/* <!-- Start:: Nav Tabs--> */}
            <div className="border-bottom">
                <div className="container">
                    <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse !py-[2px] flex-wrap" role="tablist">
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary active"
                            href="#!" id="tab-1" data-hs-tab="#tab1" aria-controls="tab1"> My Profile
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-2" data-hs-tab="#tab2" aria-controls="tab2">Portfolio
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-3" data-hs-tab="#tab3" aria-controls="tab3">Followers
                        </Link>
                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-4" data-hs-tab="#tab4" aria-controls="tab4"> Following
                        </Link>
                    </nav>
                </div>
            </div>
            {/* <!-- End:: Nav Tabs--> */}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6 bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane border-0 p-0 show active" id="tab1" role="tabpanel"
                            aria-labelledby="tab-1">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="lg:col-span-8 col-span-12">
                                    <div className="mb-3">
                                        <div className="deals-bundle">
                                            <span className="icon">
                                                <Image fill src="../../assets/images/company-logos/1.png" alt=""
                                                    className="img-fluid" />
                                            </span>
                                            <h4 className="font-semibold mb-4 text-white">Spruko Technologies PRIVATE
                                                LIMITED</h4>
                                            <div className="grid grid-cols-12 gap-x-6 gap-y-2 text-center justify-center">
                                                <div className="md:col-span-2 col-span-12"></div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">234+</h5>
                                                        <h6 className="mb-0 text-white">Products</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">342+</h5>
                                                        <h6 className="mb-0 text-white">Widgets</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-body">
                                            <h5 className="font-semibold mb-4">About the company :</h5>
                                            <p className="mb-4">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy.
                                                Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit
                                                ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum
                                                ipsum nonumy vero sanctus labore.A officiis optio temporibus minima
                                                facilis...</p>
                                            <p className="mb-4">Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam
                                                rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                                                sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus
                                                minima facilis...</p>
                                            <h5 className="font-semibold mb-3">Features</h5>
                                            <ul className="ti-list-group ti-list-unstyled">
                                                <li className="ti-list-group-item">
                                                    <span className="font-semibold"><i
                                                        className="bi bi-check-circle text-primary me-2"></i> W3C</span> Validated
                                                </li>
                                                <li className="ti-list-group-item">
                                                    <span className="font-semibold"><i
                                                        className="bi bi-check-circle text-primary me-2"></i> 24/7
                                                    </span> Support
                                                </li>
                                                <li className="ti-list-group-item">
                                                    <span className="font-semibold"><i
                                                        className="bi bi-check-circle text-primary me-2"></i> Faster</span> Loading Speed
                                                </li>
                                                <li className="ti-list-group-item">
                                                    <span className="font-semibold"><i
                                                        className="bi bi-check-circle text-primary me-2"></i> User Friendly</span> Design
                                                </li>
                                                <li className="ti-list-group-item">
                                                    <span className="font-semibold"><i
                                                        className="bi bi-check-circle text-primary me-2"></i> Browsers</span> Compatibility
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="box border-0 !bg-primary/[0.15] shadow-none">
                                        <div className="box-body">
                                            <div className="flex justify-between gap-2 flex-wrap items-center">
                                                <div>
                                                    <h5 className="font-semibold mb-0">&#128400; Was this profile useful to
                                                        someone?</h5>
                                                </div>
                                                <div>
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-success"
                                                        role="button">
                                                        <i className="ri-share-line me-2"></i>Share Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mt-[3rem]">
                                        <div className="xl:col-span-12 col-span-12 gap-x-6">
                                            <h4 className="font-semibold mb-0">Top Products</h4>
                                            <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua</p>
                                            <SpkSwiperJs slides={RelatedProductsdata} spaceBetween={30} slidesPerView={3} navigation={true} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper-navigation swiper swiper-related-jobs" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 col-span-12">
                                    <div className="box overflow-hidden">
                                        <div className="box-body !p-0">
                                            <div
                                                className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                                <div>
                                                    <span className="avatar avatar-xl avatar-rounded online me-3">
                                                        <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow main-profile-info">
                                                    <div className="font-semibold h5 mb-1 !me-2">Jack Miller
                                                        <div className="hs-tooltip ti-main-tooltip !ms-2">
                                                            <span className="hs-tooltip-toggle">
                                                                <i
                                                                    className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                                <span
                                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm "
                                                                    role="tooltip">
                                                                    Verified User
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="mb-0">Member Since <span className="font-semibold">2015</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                                <div className="flex mb-0 justify-center">
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">113</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Projects</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">12.2k</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Followers</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">128</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Following</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 text-center">
                                                <div className="grid">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger"
                                                        role="button">
                                                        <i className="ri-eye-line me-2"></i>View Author Profile
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center flex-wrap gap-4">
                                                <p className="text-[0.9375rem] mb-0 font-semibold">Social :</p>
                                                <div className="btn-list mb-0">
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-facebook-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-twitter-x-fill"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-instagram-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-github-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-youtube-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box overflow-hidden">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Achievements
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/1.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/2.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/3.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/4.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/5.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/6.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="box overflow-hidden">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Featured Item
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="grid grid-cols-12 gap-x-6 items-center">
                                                <div className="md:col-span-4 col-span-4">
                                                    <div className="img-box-1 bg-gray-300 dark:bg-light">
                                                        <Link scroll={false} href="#!">
                                                            <Image fill src="../../assets/images/marketplace/new-arrivals/1.png"
                                                                alt="img" className="img-fluid !rounded-sm" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-8 col-span-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-grow">
                                                            <h5 className="font-semibold mb-1"><Link scroll={false}
                                                                href="#!">HTML Template</Link></h5>
                                                            <div className="flex items-baseline text-[0.8125rem]">
                                                                <div className="min-w-fit">
                                                                    <span className="text-warning me-1"><i
                                                                        className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning me-1"><i
                                                                        className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning me-1"><i
                                                                        className="bi bi-star-fill"></i></span>
                                                                    <span className="text-warning"><i
                                                                        className="bi bi-star-half"></i></span>
                                                                </div>
                                                                <p
                                                                    className="mb-2 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                                    <span> (4)</span>
                                                                    <span> Ratings</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="mb-0 flex-grow text-[0.9375rem]"><span
                                                                    className="font-semibold"><i
                                                                        className="bi bi-bar-chart-fill text-info"></i> 1300</span> Sales
                                                                </p>
                                                                <Link scroll={false} href="#!"
                                                                    className="text-primary font-semibold"><u>View
                                                                        Details</u></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab2" role="tabpanel" aria-labelledby="tab-2">
                            <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                                <div className="lg:col-span-8 col-span-12">
                                    <div className="flex gap-2 mb-4">
                                        <div className="custom-form-group flex-grow">
                                            <input type="text" className="form-control" placeholder="Search Here.."
                                                aria-label="Recipient's username" />
                                            <div className="custom-form-btn">
                                                <button className="ti-btn ti-btn-primary ti-btn-sm !border-0 !m-0"
                                                    type="button"><i className="bi bi-search me-2"></i> Search</button>
                                            </div>
                                        </div>
                                        <div className="btn-group ti-dropdown hs-dropdown">
                                            <button
                                                className="ti-btn ti-btn-outline-light !text-dark !border dropdown-toggle"
                                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort By <i
                                                    className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                            </button>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Date
                                                    Published</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Best Match</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Category</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Sales</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Ratings</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {MarcketProductsData.slice(0, 4).map((idx) => (
                                        <div className="box" key={idx.id}>
                                            <div className="box-body !p-4">
                                                <div className="grid grid-cols-12 gap-x-6 items-start">
                                                    <div className="sm:col-span-3 col-span-4">
                                                        <div className="custom-img">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src={idx.src} alt="img" className="img-fluid w-full rounded-sm" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-9 col-span-8">
                                                        <div className="flex justify-between flex-wrap">
                                                            <div className="flex-grow w-[75%]">
                                                                <Link scroll={false} href="javascript:;"
                                                                    className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{idx.subTitle}</Link>
                                                                <h5 className="font-semibold mb-1"><Link scroll={false} href="#!">{idx.title}</Link></h5>
                                                                <div className="flex items-baseline text-[0.8125rem]">
                                                                    <div className="min-w-fit">
                                                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                        <span className="text-warning me-1"><i className="bi bi-star-half"></i></span>
                                                                    </div>
                                                                    <p className="mb-2 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                                        <span>({idx.ratings})</span>
                                                                        <span className="ms-1">Ratings</span>
                                                                    </p>
                                                                </div>
                                                                <p>Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit
                                                                    vero sanctus labore no sed ipsum ipsum nonumy vero
                                                                    sanctus labore..</p>
                                                            </div>
                                                            <div className="min-w-fit">
                                                                <div className="">
                                                                    <div className="hs-tooltip ti-main-tooltip me-1">
                                                                        <span
                                                                            className="hs-tooltip-toggle btn btn-wishlist btn-icon !rounded-full">
                                                                            <i
                                                                                className="ti ti-heart text-[1rem]"></i>
                                                                            <span
                                                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm "
                                                                                role="tooltip">
                                                                                Add to wishlist
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="hs-tooltip ti-main-tooltip">
                                                                        <span
                                                                            className="hs-tooltip-toggle btn btn-wishlist btn-icon !rounded-full">
                                                                            <i
                                                                                className="ti ti-shopping-cart-plus text-[1rem]"></i>
                                                                            <span
                                                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm "
                                                                                role="tooltip">
                                                                                Add to cart
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-primary mb-0">{idx.price}</h4>
                                                            <div className="min-w-fit">
                                                                <h6 className="mb-0"><i
                                                                    className="bi bi-bar-chart-fill text-warning me-1"></i><span
                                                                        className="font-semibold">436</span> Sales</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                <div className="lg:col-span-4 col-span-12">
                                    <div className="box overflow-hidden">
                                        <div className="box-body !p-0">
                                            <div
                                                className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                                <div>
                                                    <span className="avatar avatar-xl avatar-rounded online me-3">
                                                        <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow main-profile-info">
                                                    <h5 className="font-semibold mb-1">Jack Miller <i
                                                        className="bi bi-check-circle-fill text-success text-[0.875rem]"
                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                        title="Verified User"></i></h5>
                                                    <p className="mb-0">Member Since <span className="font-semibold">2005</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                                <div className="flex mb-0 justify-center">
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">113</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Projects</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">12.2k</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Followers</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">128</h6>
                                                        <p
                                                            className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">
                                                            Following</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 text-center">
                                                <div className="grid">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-danger !m-0"
                                                        role="button">
                                                        <i className="ri-eye-line me-2"></i>View Author Profile
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center flex-wrap gap-3">
                                                <p className="text-[0.9375rem] mb-0 font-semibold">Social :</p>
                                                <div className="btn-list mb-0">
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-facebook-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-twitter-x-fill"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-instagram-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-github-line"></i>
                                                    </button>
                                                    <button
                                                        className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-youtube-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box overflow-hidden">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Achievements
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/1.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/2.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/3.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/4.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar m-1 avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/5.png" alt="" />
                                            </span>
                                            <span
                                                className="avatar avatar-rounded bg-white dark:bg-bodybg shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                                                <Image fill src="../../assets/images/company-logos/6.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab3" role="tabpanel" aria-labelledby="tab-3">
                            <div className="grid grid-cols-12 gap-x-6">
                                {FollowersTabdata.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkFollowerCard card={card} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab4" role="tabpanel" aria-labelledby="tab-4">
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
            {/* <!-- End:: Section-1 --> */}

            {/* <!-- Start:: Section-2 --> */}
            <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
                <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                    <div className="lg:col-span-6 col-span-10 text-center">
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-white">&#128073; Browse the top template to build the
                                awesome applications
                            </h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                            magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                            sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <div className="btn-list">
                            <Link href="/market-place/search/" className="ti-btn ti-btn-lg ti-btn-light"><i
                                className="bi bi-search me-1"></i> Search Products</Link>
                            <Link href="#!" className="ti-btn ti-btn-lg ti-btn-danger"><i
                                className="bi bi-send me-1"></i> Signup Now</Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}

        </Fragment>
    );
};

export default UserProfile;