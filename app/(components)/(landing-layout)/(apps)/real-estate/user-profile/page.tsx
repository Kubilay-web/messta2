"use client"
import SpkFollowerCard from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-follower-card";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { FollowersTabdata, Followingbdata } from "@/shared/data/apps/market-place/userdata";
import { RealPropertiesData } from "@/shared/data/apps/real-estate/detailsdata";
import { breakpoints, PropertiesTabdata } from "@/shared/data/apps/real-estate/user-profile-data";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const UserProfile = () => {

    return (
        <Fragment>
            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4">
                <div className="container">
                    <Seo title={"User Profile"} />
                    <Pageheader breadcrumbs={['Apps', 'Real Estate']} currentpage="User Public Profile" Updated={true} />
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
                                        <h4 className="font-bold mb-0 flex items-center"><Link scroll={false} href="#!">Ridh Constructions</Link></h4>
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
                                        <span className="badge badge-md bg-info/[0.15] text-info me-1"><i className="bi bi-briefcase-fill me-2"></i>156 Properties</span>
                                        <span className="badge badge-md bg-danger/[0.15] text-danger"><i className="bi bi-bar-chart-fill me-2"></i>100 Sales</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-4 lg:col-span-3 col-span-12 md:my-auto md:text-end">
                                <div className="btn-list">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg ti-btn-primary me-1"> View Portfolio</Link>
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-lg ti-btn-soft-secondary btn-wave">
                                        <i className="ri-user-follow-line"></i>
                                    </Link>
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-lg ti-btn-soft-success btn-wave">
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
                        <Link scroll={false}
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary active"
                            href="#!" id="tab-1" data-hs-tab="#tab1"
                            aria-controls="tab1"> My Profile
                        </Link>
                        <Link scroll={false}
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-2" data-hs-tab="#tab2"
                            aria-controls="tab2">Properties
                        </Link>
                        <Link scroll={false}
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-3" data-hs-tab="#tab3"
                            aria-controls="tab3">Followers
                        </Link>
                        <Link scroll={false}
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-4" data-hs-tab="#tab4"
                            aria-controls="tab4"> Following
                        </Link>
                    </nav>
                </div>
            </div>
            {/* <!-- End:: Nav Tabs--> */}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6 bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane border-0 p-0 show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="lg:col-span-8 col-span-12">
                                    <div className="mb-3">
                                        <div className="deals-bundle">
                                            <span className="icon">
                                                <Image fill src="../../assets/images/company-logos/1.png" alt="" className="img-fluid" />
                                            </span>
                                            <h4 className="font-semibold mb-4 text-white">Ridh Constructions    </h4>
                                            <div className="grid grid-cols-12 gap-x-6 gap-y-2 text-center justify-center">
                                                <div className="md:col-span-2 col-span-12"></div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">234+</h5>
                                                        <h6 className="mb-0 text-white">Properties</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">342+</h5>
                                                        <h6 className="mb-0 text-white">Customers</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                About Ridh Constructions
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <p className="mb-4">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                            <p className="mb-4">Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>

                                            <h6 className="font-semibold mb-2">Deals In Localities :</h6>
                                            <p className="mb-4">Hyderabad - Adarsh Nagar, Addagutta, Adibatla, Adikmet, Adithya Nagar, Alwal, Amangal, Ankireddypalli</p>
                                            <h6 className="font-semibold mb-2">Propery Type :</h6>
                                            <p className="mb-4">Flats/Apartments, Houses/Villas, Builder Floor, Farm House, Residential Plot, Agricultural/Farm Land</p>

                                            <h6 className="font-semibold mb-2">Services Offered :</h6>
                                            <p className="mb-0">Builders, Real Estate Agents</p>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Properties Overview
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <p className="font-semibold text-[0.875rem] mb-4">Properties for Sale :</p>
                                            <div className="grid grid-cols-12 gap-x-6 justify-content-center">
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <div className="product-spec mb-2">
                                                        <i className="ri-building-4-line text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">24+ Flats</p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <i className="ri-landscape-line text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            23 Residential Plots
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <i className="ri-compass-line text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            10 Farm Land
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <i className="ri-building-line text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            6 Farm House
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-[0.875rem] my-4">Properties for Rent :</p>
                                            <div className="grid grid-cols-12 gap-x-6 justify-content-center">
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <div className="product-spec">
                                                        <i className="bi bi-shop text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">2 Commercial Shops</p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec">
                                                        <i className="bi bi-buildings text-[1rem] text-primary"></i>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            2 Duplex Houses for rent
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Amenities
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="grid grid-cols-12 gap-x-6 justify-center">
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities-24Hr.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">24Hr Backup</p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities-RainWater.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            Rain Water Harvesting
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities-Communities.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            Community Hall
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities Play.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            Play Area
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities-Swimming.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            Swimming Pool
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                                    <div className="product-spec mb-2">
                                                        <p className="mb-0">
                                                            <Image fill src="../../assets/images/realestate/icons/Amenities Gymnasium.png" alt="" />
                                                        </p>
                                                        <p className="text-[0.875rem] font-semibold mb-0">
                                                            Gymnasium
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box border-0 !bg-primary/[0.15] shadow-none">
                                        <div className="box-body">
                                            <div className="flex justify-between gap-2 flex-wrap items-center">
                                                <div>
                                                    <h5 className="font-semibold mb-0">&#128400; Was this profile useful to someone?</h5>
                                                </div>
                                                <div>
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-success" role="button">
                                                        <i className="ri-share-line me-2"></i>Share Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mt-[3rem]">
                                        <div className="xl:col-span-12 col-span-12 gap-x-6">
                                            <h4 className="font-semibold mb-0">Top Products</h4>
                                            <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                            <SpkSwiperJs slides={RealPropertiesData} spaceBetween={30} slidesPerView={3} navigation={true} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper-navigation swiper swiper-related-jobs" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 col-span-12">
                                    <div className="box overflow-hidden">
                                        <div className="box-body !p-0">
                                            <div className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                                <div>
                                                    <span className="avatar avatar-xl avatar-rounded online me-3">
                                                        <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow main-profile-info">
                                                    <h5 className="font-semibold mb-1">Jack Miller <i className="bi bi-check-circle-fill text-success text-[0.875rem]" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Verified User"></i></h5>
                                                    <p className="mb-0">Member Since <span className="font-semibold">2015</span></p>
                                                </div>
                                            </div>
                                            <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                                <div className="flex mb-0 justify-center">
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">113</h6>
                                                        <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">Projects</p>
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
                                            <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 text-center">
                                                <div className="flex">
                                                    <div className="input-group flex-grow">
                                                        <div className="input-group-text">
                                                            <i className="fe fe-phone"></i>
                                                        </div>
                                                        <input type="email" className="form-control" id="inputEmail3" placeholder="*** *** 7654" defaultValue="*** *** 7654" />
                                                    </div>
                                                    <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-primary !ms-2 !m-0">
                                                        <i className="ri-eye-line"></i>
                                                    </Link>
                                                    <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-secondary !ms-2 !m-0">
                                                        <i className="ri-message-line"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center flex-wrap gap-4">
                                                <p className="text-[0.9375rem] mb-0 font-semibold">Social :</p>
                                                <div className="btn-list mb-0">
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-facebook-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-twitter-x-fill"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-instagram-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-github-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light xl:mb-0">
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
                                                    <label htmlFor="vendor-username1" className="ti-form-label font-semibold">Username</label>
                                                    <input type="text" className="form-control" id="vendor-username1" placeholder="Vendor username" defaultValue="sprukotechnologies" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="email-address1" className="ti-form-label font-semibold">Email Address</label>
                                                    <input type="text" className="form-control" id="email-address1" placeholder="xyz@gmail.com" defaultValue="json@gmail.com" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="phone-number5" className="ti-form-label font-semibold">Mobile Number</label>
                                                    <input type="text" className="form-control" id="phone-number5" placeholder="*** *** ****" defaultValue="65432 76765" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <div className="grid">
                                                <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger">Get Contact Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab2" role="tabpanel" aria-labelledby="tab-2">
                            <div className="grid grid-cols-12 gap-x-6 gap-4">
                                <div className="lg:col-span-8 col-span-12">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        <div className="custom-form-group flex-grow">
                                            <input type="text" className="form-control form-control-lg !py-3" placeholder="Search Here.." aria-label="Recipient's username" />
                                            <div className="custom-form-btn">
                                                <button className="ti-btn ti-btn-primary !border-0 !m-0" type="button"><i className="bi bi-search me-2"></i> Search</button>
                                            </div>
                                        </div>
                                        <div className="btn-group ti-dropdown hs-dropdown custom-user">
                                            <button className="ti-btn ti-btn-outline-light !text-defaulttextcolor dark:!text-defaulttextcolor/80 !border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort By <i className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                            </button>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Date Published</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Luxury Houses</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Land</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Flat</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {PropertiesTabdata.map((idx) => (
                                        <div className="box" key={idx.id}>
                                            <div className="box-body !p-4">
                                                <div className="grid grid-cols-12 gap-x-6 items-start gap-y-2">
                                                    <div className="sm:col-span-3 col-span-12">
                                                        <div className="featured-img p-0">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill
                                                                    src={idx.image}
                                                                    alt="img"
                                                                    className="img-fluid w-full rounded-sm"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-9 col-span-12">
                                                        <div className="flex justify-between">
                                                            <div className="flex-grow mb-3">
                                                                <span className={`badge ${idx.status === "For Rent" ? "bg-warning/[0.15] text-warning" : "bg-danger/[0.15] text-danger"} mb-2`} >
                                                                    {idx.status}
                                                                </span>
                                                                <h5 className="font-semibold mb-1">
                                                                    <Link scroll={false} href="#!">{idx.title}</Link>
                                                                </h5>
                                                                <div className="flex align-items-baseline mb-2">
                                                                    <div className="me-2">
                                                                        <span className="">
                                                                            <i className="bi bi-geo-alt me-1"></i>
                                                                            {idx.location}
                                                                        </span>
                                                                        <span>,</span>
                                                                        <span className="">{idx.date}</span>
                                                                    </div>
                                                                    <span className="text-danger">({idx.bedrooms})</span>
                                                                </div>
                                                                {idx.badge ? (
                                                                    <div className="popular-tags">
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default me-1">10 Beds</Link>
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default me-1">14 Baths</Link>
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default me-1">9,987sqft</Link>
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default me-1">Lift</Link>
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default me-1">CCTV</Link>
                                                                        <Link scroll={false} href="#!" className="badge !rounded-full bg-light text-default">Gym</Link>
                                                                    </div>
                                                                ) : (
                                                                    <p className="mb-0">Aliquyam sed amet. Kasd sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.</p>
                                                                )}
                                                            </div>
                                                            <div className="min-w-fit">
                                                                <div className="">
                                                                    <Link scroll={false} href="#!" className="btn btn-wishlist btn-icon rounded-circle" data-bs-toggle="tooltip" aria-label="wishlist" data-bs-original-title="Add to wishlist">
                                                                        <i className="ti ti-heart fs-16"></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-primary mb-0">{idx.price}</h4>
                                                            <div className="min-w-fit">
                                                                <Link href="/real-estate/details" className="ti-btn ti-btn-primary">
                                                                    <i className="ti ti-phone me-1 inline-block"></i>Contact
                                                                </Link>
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
                                            <li className="page-item"><Link scroll={false} className="page-link active" href="#!">1</Link></li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                            <li className="page-item">
                                                <Link scroll={false} className="page-link" href="#!">
                                                    <i className="bi bi-three-dots"></i>
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">16</Link></li>
                                            <li className="page-item"><Link scroll={false} className="page-link" href="#!">17</Link></li>
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
                                            <div className="sm:flex items-center p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                                <div>
                                                    <span className="avatar avatar-xl avatar-rounded online me-3">
                                                        <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow main-profile-info">
                                                    <h5 className="font-semibold mb-1">Jack Miller <i className="bi bi-check-circle-fill text-success text-[0.875rem]" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Verified User"></i></h5>
                                                    <p className="mb-0">Member Since <span className="font-semibold">2015</span></p>
                                                </div>
                                            </div>
                                            <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                                <div className="flex mb-0 justify-center">
                                                    <div className="me-4">
                                                        <h6 className="font-semibold mb-0">113</h6>
                                                        <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50">Projects</p>
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
                                            <div className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 text-center">
                                                <div className="flex">
                                                    <div className="input-group flex-grow">
                                                        <div className="input-group-text">
                                                            <i className="fe fe-phone"></i>
                                                        </div>
                                                        <input type="email" className="form-control" id="inputEmail1" placeholder="*** *** 7654" defaultValue="*** *** 7654" />
                                                    </div>
                                                    <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-primary !ms-2 !m-0">
                                                        <i className="ri-eye-line"></i>
                                                    </Link>
                                                    <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-secondary !ms-2 !m-0">
                                                        <i className="ri-message-line"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center flex-wrap gap-4">
                                                <p className="text-[0.9375rem] mb-0 font-semibold">Social :</p>
                                                <div className="btn-list mb-0">
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-facebook-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-twitter-x-fill"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-instagram-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light xl:mb-0">
                                                        <i className="ri-github-line"></i>
                                                    </button>
                                                    <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light xl:mb-0">
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
                                                    <label htmlFor="vendor-username" className="ti-form-label font-semibold">Username</label>
                                                    <input type="text" className="form-control" id="vendor-username" placeholder="Vendor username" defaultValue="sprukotechnologies" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="email-address" className="ti-form-label font-semibold">Email Address</label>
                                                    <input type="text" className="form-control" id="email-address" placeholder="xyz@gmail.com" defaultValue="json@gmail.com" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="phone-number2" className="ti-form-label font-semibold">Mobile Number</label>
                                                    <input type="text" className="form-control" id="phone-number2" placeholder="*** *** ****" defaultValue="65432 76765" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <div className="grid">
                                                <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger">Get Contact Details</Link>
                                            </div>
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

export default UserProfile;