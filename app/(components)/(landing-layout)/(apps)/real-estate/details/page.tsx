"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { RealPropertiesData, SimilarProperties } from "@/shared/data/apps/real-estate/detailsdata";
import { RealGallerylist } from "@/shared/data/apps/real-estate/real-estate-gallerydata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Details = () => {

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
            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner ad-search-container !bg-primary !p-0">
                <section className="section !py-[3rem] lg:mt-0 mt-[3rem]">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                            <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                                <div className="">
                                    <div className="input-group inline-flex group-search xl:flex gap-4">
                                        <div className="category-dropdown-wrapper ti-dropdown hs-dropdown">
                                            <Link scroll={false} href="#!"
                                                className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0"
                                            >
                                                <i className="ri-function-line me-2 text-primary"></i>All Property Type<i
                                                    className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden !z-[1000] !-mt-[0.6rem]"
                                                role="menu">
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Deluxe Houses</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Apartments</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item active"
                                                    href="#!">Family House</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Modern Villa</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Tiny House</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Residential</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item"
                                                    href="#!">Flats</Link></li>
                                            </ul>
                                        </div>
                                        <div className="custom-form-group flex-grow">
                                            <input type="text"
                                                className="form-control rounded-md shadow-none !border-0 border-e !border-s"
                                                placeholder="Enter Your Keyword Here.."
                                                aria-label="Recipient's username" />
                                        </div>
                                        <div className="custom-form-group flex-grow">
                                            <input type="text"
                                                className="form-control rounded-md shadow-none border-0 !border-e !border-s"
                                                id="input-placeholder" placeholder="Search by Location..." />
                                            <div className="custom-form-btn border-0">
                                                <Link scroll={false} href="#!" className="gps-location"><i
                                                    className="ti ti-current-location"></i></Link>
                                                <div className="ti-dropdown hs-dropdown ad-dropdown !border-s dark:border-defaultborder/10">
                                                    <Link scroll={false} href="#!" className="ti-btn text-default btn-wave"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        5km<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden !z-[1000]"
                                                        role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">0km</Link>
                                                        </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">2km</Link>
                                                        </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item active"
                                                            href="#!">5km</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">10km</Link>
                                                        </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">20km</Link>
                                                        </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">50km</Link>
                                                        </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item"
                                                            href="#!">100km</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="ti-btn  ti-btn-secondary !border-0 shadow-sm search-btn !m-0"
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
                    <Seo title={"RealEstate Details"} />
                    <Pageheader breadcrumbs={['Apps', 'Real Estate']} currentpage="RealEstate Details" Updated={true} />
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="box">
                                <div className="">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-danger !rounded-full top-wishlist-icon" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Add to wishlist" data-bs-original-title="Add to wishlist"><i className="ri-heart-line"></i></Link>
                                    <RealGallerylist />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-6 justify-center mb-4">
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/realestate/icons/Bedrooms.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">4+ Bedrooms</p>
                                    </div>
                                </div>
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/realestate/icons/Bathrooms.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">
                                            4 Bathrooms
                                        </p>
                                    </div>
                                </div>
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                    <div className="product-spec bg-white dark:!bg-bodybg">
                                        <p className="mb-0 relative">
                                            <Image fill src="../../assets/images/realestate/icons/Buildup.png" alt="" />
                                        </p>
                                        <p className="text-[0.875rem] font-semibold mb-0">
                                            3500 Sq.ft Built Up
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Description
                                    </div>
                                </div>
                                <div className="box-body">
                                    <p className="mb-4">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                    <p className="mb-0">Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Features
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="table-responsive">
                                        <table className="grid grid-cols-12 gap-x-6 w-full text-nowrap">
                                            <tbody className="lg:col-span-12 xl:col-span-6 col-span-12 !p-0">
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Age of Building :</span> &gt; 5 Years</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Maintenance Charges :</span> ₹2.1 Per Sq.Ft/M</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Builtup Area :</span> 560 Sq.Ft</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Furnishing Status :</span> Unfurnished</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Breaks :</span> Front , Rear</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Floor :</span> 4/5</td>
                                                </tr>
                                            </tbody>
                                            <tbody className="lg:col-span-12 xl:col-span-6 col-span-12 !p-0">
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Gated Security :</span> Yes</td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Ownership Type :</span> Self Owned </td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Flooring :</span> Musaic </td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Carpet Area :</span> 520 Sq.Ft </td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Facing :</span> East </td>
                                                </tr>
                                                <tr>
                                                    <td className="!py-3 !px-[1.15rem]"><span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Parking :</span> Bike </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                    <div className="grid grid-cols-12 gap-x-6">
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
                                                    <Image fill src="../../assets/images/realestate/icons/Amenities-24Hr.png" alt="" />
                                                </p>
                                                <p className="text-[0.875rem] font-semibold mb-0">24Hr Backup</p>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
                                                    <Image fill src="../../assets/images/realestate/icons/Amenities-RainWater.png" alt="" />
                                                </p>
                                                <p className="text-[0.875rem] font-semibold mb-0">
                                                    Rain Water Harvesting
                                                </p>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
                                                    <Image fill src="../../assets/images/realestate/icons/Amenities-Communities.png" alt="" />
                                                </p>
                                                <p className="text-[0.875rem] font-semibold mb-0">
                                                    Community Hall
                                                </p>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
                                                    <Image fill src="../../assets/images/realestate/icons/Amenities Play.png" alt="" />
                                                </p>
                                                <p className="text-[0.875rem] font-semibold mb-0">
                                                    Play Area
                                                </p>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
                                                    <Image fill src="../../assets/images/realestate/icons/Amenities-Swimming.png" alt="" />
                                                </p>
                                                <p className="text-[0.875rem] font-semibold mb-0">
                                                    Swimming Pool
                                                </p>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12 sm:mt-0 mt-4">
                                            <div className="product-spec mb-2">
                                                <p className="mb-0 relative">
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
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Floor Plan
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <nav className="-mb-0.5 flex gap-x-6 !border-b border-defaultborder dark:border-defaultborder/10 flex-wrap" role="tablist">
                                        <a
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary active"
                                            href="#!" id="tab-1" data-hs-tab="#tab1"
                                            aria-controls="tab1">2BHK Apartment
                                        </a>
                                        <a
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                                            href="#!" id="tab-2" data-hs-tab="#tab2"
                                            aria-controls="tab2"> 3BHK Apartment
                                        </a>
                                        <a
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                                            href="#!" id="tab-3" data-hs-tab="#tab3"
                                            aria-controls="tab3"> 4BHK Apartment
                                        </a>
                                        <a
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                                            href="#!" id="tab-4" data-hs-tab="#tab4"
                                            aria-controls="tab4"> 5BHK Apartment
                                        </a>
                                    </nav>
                                    <div className="row p-2">
                                        <div className="tab-content">
                                            <div className="tab-pane p-4 border-0 show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
                                                <div className="flex mb-4 flex-wrap">
                                                    <div className="flex-grow">
                                                        <h6 className="font-semibold mb-0">2BHK</h6>
                                                        <p>Builtup Area : <span className="font-semibold">1367.00 sq.ft at ₹7.7K per sq.ft</span></p>
                                                    </div>
                                                    <h5 className="font-semibold mb-0">$5,643 Cr</h5>
                                                </div>
                                                <div className="flex justify-center items-center gap-[3rem] flex-wrap">
                                                    <Image fill src="../../assets/images/realestate/FloorPlan.png" className="img-fluid invert-1" alt="" />
                                                    <div>
                                                        <h6>Floor Plan Unavailable</h6>
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Request a demo</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane p-4 border-0 hidden" id="tab2" role="tabpanel" aria-labelledby="tab-2">
                                                <div className="flex mb-4 flex-wrap">
                                                    <div className="flex-grow">
                                                        <h6 className="font-semibold mb-0">3BHK</h6>
                                                        <p>Builtup Area : <span className="font-semibold">1921.00 sq.ft at ₹7.7K per sq.ft</span></p>
                                                    </div>
                                                    <h5 className="font-semibold mb-0">$7,643 Cr</h5>
                                                </div>
                                                <div className="flex justify-center items-center gap-[3rem] flex-wrap">
                                                    <Image fill src="../../assets/images/realestate/FloorPlan.png" className="img-fluid" alt="" />
                                                    <div>
                                                        <h6>Floor Plan Unavailable</h6>
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Request a demo</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane p-4 border-0 hidden" id="tab3" role="tabpanel" aria-labelledby="tab-3">
                                                <div className="flex mb-4 flex-wrap">
                                                    <div className="flex-grow">
                                                        <h6 className="font-semibold mb-0">4BHK</h6>
                                                        <p>Builtup Area : <span className="font-semibold">2234.00 sq.ft at ₹8.7K per sq.ft</span></p>
                                                    </div>
                                                    <h5 className="font-semibold mb-0">$8,643 Cr</h5>
                                                </div>
                                                <div className="flex justify-center items-center gap-[3rem] flex-wrap">
                                                    <Image fill src="../../assets/images/realestate/FloorPlan.png" className="img-fluid" alt="" />
                                                    <div>
                                                        <h6>Floor Plan Unavailable</h6>
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Request a demo</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane p-4 border-0 hidden" id="tab4" role="tabpanel" aria-labelledby="tab-4">
                                                <div className="flex mb-4 flex-wrap">
                                                    <div className="flex-grow">
                                                        <h6 className="font-semibold mb-0">5BHK</h6>
                                                        <p>Builtup Area : <span className="font-semibold">2876.00 sq.ft at ₹9.7K per sq.ft</span></p>
                                                    </div>
                                                    <h5 className="font-semibold mb-0">$9,643 Cr</h5>
                                                </div>
                                                <div className="flex justify-center items-center gap-[3rem] flex-wrap">
                                                    <Image fill src="../../assets/images/realestate/FloorPlan.png" className="img-fluid" alt="" />
                                                    <div>
                                                        <h6>Floor Plan Unavailable</h6>
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Request a demo</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="box !bg-primary/[0.15] !border-0 !shadow-none">
                                <div className="box-body">
                                    <div className="flex justify-between gap-4 items-center flex-wrap">
                                        <div>
                                            <h5 className="font-semibold mb-0">&#128400; Was this Property helpful to someone?</h5>
                                        </div>
                                        <div>
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-success" role="button">
                                                <i className="ri-share-line me-2"></i>Share Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="xl:col-span-12 col-span-12">
                                    <h4 className="font-semibold mb-0">Related Properties</h4>
                                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                    <SpkSwiperJs slides={RealPropertiesData} spaceBetween={30} slidesPerView={3} navigation={true} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper-navigation swiper swiper-related-jobs" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="box-body !p-6">
                                    <div>
                                        <h5 className="font-semibold mb-2">Affordable 2 BHK Flats Available in Gated Community</h5>
                                        <div className="flex items-baseline mb-4">
                                            <div className="text-textmuted dark:text-textmuted/50 me-2">
                                                <span className=""><i className="bi bi-geo-alt me-1"></i>Banglore</span>
                                                <span>,</span>
                                                <span className=""> 20 Dec 2024</span>
                                            </div>
                                            <span className="text-danger">( 30 Views )</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-x-6 mb-6">
                                            <div className="xxl:col-span-12 col-span-12">
                                                <p className="mb-1 leading-none text-[0.6875rem] text-success font-semibold">Special Offer</p>
                                                <div className="mb-1 flex items-center"><h5 className="text-[1.5rem] mb-0">$1,299.00</h5><span className="ms-3 badge bg-danger/[0.15] text-danger">50% Off</span></div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-[fs-15] font-semibold mb-1">Description :</p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus, quaerat nam quo optio reiciendis harum reprehenderit omni.
                                            </p>
                                        </div>
                                        <div className="flex align-items-stretch gap-2 mb-0">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-primary"><i className="ti ti-phone"></i> Contact Owner</Link>
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-outline-light" data-bs-toggle="tooltip" aria-label="Share"><i className="ti ti-share"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <div className="sm:flex items-center p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <div>
                                            <span className="avatar avatar-xl avatar-rounded online me-3">
                                                <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                            </span>
                                        </div>
                                        <div className="flex-grow main-profile-info">
                                            <h5 className="font-semibold mb-1">Jack Miller <i className="bi bi-check-circle-fill text-success text-[0.875rem]" data-bs-toggle="tooltip"
                                                data-bs-placement="top" title="Verified Agent"></i></h5>
                                            <p className="mb-0">Member Since 2005</p>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
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
                                </div>
                            </div>
                            <div className="alert alert-primary alert-dismissible fade show custom-alert-icon shadow-sm" role="alert">
                                <div className="flex">
                                    <span className="svg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                                    </span>
                                    <div className="ms-2">
                                        <h6 className="text-default mb-0">
                                            Security & Safety Tips
                                        </h6>
                                        Check the necessary details before purchase.
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Similar Properties
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group similarads-list !border-0">
                                        {SimilarProperties.slice(0, 4).map((idx) => (
                                            <li className="ti-list-group-item" key={idx.id}>
                                                <div className="grid grid-cols-12 gap-4 items-start">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <Link scroll={false} href="#!">
                                                            <div className="similarads-img relative">
                                                                <Image fill src={idx.image} className="img-fluid rounded-md h-full w-full" alt="..." />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="xl:col-span-9 col-span-12">
                                                        <div className="mb-2">
                                                            <span className={`badge bg-${idx.statusColor}/[0.15] text-${idx.statusColor} badge-sm mb-1`}>{idx.status}</span>
                                                            <h6 className="font-semibold mb-1"><Link scroll={false} href="#!">{idx.title}</Link></h6>
                                                            <div className="flex items-baseline text-[0.6875rem] flex-wrap gap-2">
                                                                <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50">
                                                                    <span className=""><i className="bi bi-geo-alt me-1"></i>{idx.location}</span>
                                                                    <span>,</span>
                                                                    <span className="">{idx.date}</span>
                                                                </div>
                                                                <span className="text-danger">( {idx.type} )</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-semibold mb-0">{idx.price}</h5>
                                                            <Link scroll={false} href="#!" className="text-primary font-medium text-[0.875rem]">
                                                                View Details <i className="fe fe-arrow-right ms-1"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="box-footer">
                                    <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.875rem] mt-2">
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

export default Details;