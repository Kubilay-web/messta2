"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { SwiperComponent, similarAds } from "@/shared/data/apps/classifieds/classified-details-data";
import { ClassifiedGallerylist } from "@/shared/data/apps/classifieds/classified-details-gallerydata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const ClassifiedDetails = () => {
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
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4 !bg-white dark:!bg-bodybg">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Classified Details"} />
                    <Pageheader breadcrumbs={['Apps', 'Classifieds']} currentpage="Classified Details" Updated={true} />
                    {/* Page Header Close */}
                </div>
            </div>
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="box">
                                <div className="">
                                    <div className="hs-tooltip ti-main-tooltip !absolute top-[0.1rem] end-[0.1rem]">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon !bg-primary !text-white hover:!bg-danger !rounded-full top-wishlist-icon hs-tooltip-toggle">
                                            <i className="ri-heart-line"></i>
                                            <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                                Add to Wishlist
                                            </span>
                                        </Link>
                                    </div>
                                    <ClassifiedGallerylist />
                                </div>
                                <div className="box-body">
                                    <h4 className="font-medium mb-2">Cadbo Car kb43 (2020)</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="">
                                            <p className="text-[0.875rem] mb-0">
                                                <span
                                                    className="avatar avatar-sm avatar-rounded me-2 bg-light text-default">
                                                    <i className="ri-oil-line text-[0.8125rem]"></i>
                                                </span>
                                                Diesel
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-[0.875rem] mb-0">
                                                <span
                                                    className="avatar avatar-sm avatar-rounded me-2 bg-light text-default">
                                                    <i className="ri-time-line text-[0.8125rem]"></i>
                                                </span>
                                                124500 km
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-[0.875rem] mb-0">
                                                <span
                                                    className="avatar avatar-sm avatar-rounded me-2 bg-light text-default">
                                                    <i className="ri-git-branch-line text-[0.8125rem]"></i>
                                                </span>
                                                Manual
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-[0.875rem] mb-0">
                                                <span
                                                    className="avatar avatar-sm avatar-rounded me-2 bg-light text-default">
                                                    <i className="ri-map-pin-line text-[0.8125rem]"></i>
                                                </span>
                                                USA , 16 Nov 2024
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-body !ps-0">
                                    <h5 className="font-medium mb-3 ps-3">Description</h5>
                                    <p className="mb-4 ps-3">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit
                                        ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum
                                        erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero
                                        sanctus labore.A officiis optio temporibus minima facilis...</p>
                                    <table className="grid grid-cols-12 gap-x-6">
                                        <tbody className="lg:col-span-12  xl:col-span-4 col-span-12 !p-0">
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Posted Date :</span> 25 Dec 2022
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Seller Type :</span> Private Seller
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Model :</span> modelH7
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="lg:col-span-12  xl:col-span-4 col-span-12 !p-0">
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Kilometres :</span> 452000
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Breaks :</span> Front , Rear
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Air Bags  :</span> Available
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="lg:col-span-12  xl:col-span-4 col-span-12 !p-0">
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Colors :</span> Red , pink, Gray
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Engine :</span> F8D
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-[1.3rem] py-3">
                                                    <span className="font-medium"><i className="bi bi-check-circle text-primary me-2"></i>Power  Windows :</span> Available
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="box border !bg-primary/[0.15] shadow-none">
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-x-6 items-center">
                                        <div className="md:col-span-8 lg:col-span-6 col-span-12">
                                            <h5 className="font-medium mb-0">&#128400; Was this Ad useful to someone?</h5>
                                        </div>
                                        <div className="md:col-span-2 lg:col-span-6 col-span-12 md:text-end">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-success" role="button">
                                                <i className="ri-share-line me-2"></i>Share Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mt-[3rem] gap-1">
                                <div className="xl:col-span-12 col-span-12">
                                    <h4 className="font-medium mb-0">Related Ads</h4>
                                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <SpkSwiperJs slides={SwiperComponent} autoplay={true} slidesPerView={3} spaceBetween={30} navigation={true} breakpoint={breakpoints} keyboard={{ enabled: true }} className="mySwiper swiper swiper-related-jobs" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-body !p-6">
                                    <div className="flex-grow main-profile-info">
                                        <h5 className="font-medium text-[1.5rem]">$2,226.00</h5>
                                    </div>
                                    <div className="text-center">
                                        <div className="grid gap-2">
                                            <input type="email" className="form-control" id="inputEmail11"
                                                placeholder="$34,786" />
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg btn-wave ti-btn-primary mt-1">
                                                Bid Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            <div className="font-medium mb-1 h5">Jack Miller
                                                <div
                                                    className="hs-tooltip ti-main-tooltip">
                                                    <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                        <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                                            Verified User
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <p className="mb-0">Member Since 2005</p>
                                        </div>
                                    </div>
                                    <div
                                        className="p-6 border-b border-dashed border-defaultborder dark:border-defaultborder/10 text-center">
                                        <div className="flex flex-wrap gap-2">
                                            <div className="input-group !w-auto flex-grow-1">
                                                <div className="input-group-text">
                                                    <i className="fe fe-phone"></i>
                                                </div>
                                                <input type="email" className="form-control" id="inputEmail1" placeholder="*** *** 7654" defaultValue="*** *** 7654" />
                                            </div>
                                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-primary !m-0">
                                                <i className="ri-eye-line"></i>
                                            </Link>
                                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-icon ti-btn-secondary !m-0">
                                                <i className="ri-message-line"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-6 flex items-center flex-wrap gap-2">
                                        <p className="text-[0.9375rem] mb-0 me-4 font-medium">Social Networks :</p>
                                        <div className="btn-list mb-0">
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave">
                                                <i className="ri-facebook-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave">
                                                <i className="ri-twitter-x-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave">
                                                <i className="ri-instagram-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave">
                                                <i className="ri-github-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave">
                                                <i className="ri-youtube-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="alert alert-primary alert-dismissible fade show custom-alert-icon shadow-sm" role="alert">
                                <div className="flex">
                                    <span className="svg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" height="24px"
                                            viewBox="0 0 24 24" width="24px" fill="#000000">
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
                                        Similar Ads
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group similarads-list !border-0">
                                        {similarAds.map((ad, index) => (
                                            <li key={index} className="ti-list-group-item !p-3">
                                                <div className="flex g-0 items-center flex-wrap">
                                                    <div>
                                                        <Link scroll={false} href="#!">
                                                            <div className="similarads-img relative">
                                                                <Image fill src={ad.imgSrc} className="img-fluid !rounded-md h-full" alt={ad.title} />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="box-body !p-4">
                                                            <h6 className="box-title font-medium">{ad.title}</h6>
                                                            <div className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-2">
                                                                <span>
                                                                    <i className="bi bi-geo-alt me-1"></i>
                                                                    {ad.location}
                                                                </span>
                                                                <span className="mx-1">,</span>
                                                                <span>{ad.date}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <p className="font-medium mb-0 text-textmuted dark:text-textmuted/50">
                                                                    {ad.price}
                                                                </p>
                                                                <Link scroll={false} href="#!" className="text-primary font-medium text-[0.875rem]">
                                                                    View Details <i className="fe fe-arrow-right"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="box-footer">
                                    <Link scroll={false} href="#!" className="text-primary font-medium text-[0.875rem] mt-2">
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

export default ClassifiedDetails;