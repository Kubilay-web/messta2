"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { ProductInformation, RelatedProductsdata } from "@/shared/data/apps/market-place/details-data";
import { MarketGallerylist } from "@/shared/data/apps/market-place/market-place-gallerydata";
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
            spaceBetween: 30,
        },
    };
    return (
        <Fragment>

            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4 !bg-white dark:!bg-bodybg">
                <div className="container">
                    <Seo title={"Marketplace Details"} />
                    <Pageheader breadcrumbs={['Apps', 'Marketplace']} currentpage="Marketplace Details" Updated={true} />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-8 col-span-12">
                            <h4 className="font-semibold">HTML Modern Template</h4>
                            <div className="flex items-center text-[1rem] mb-4">
                                <div className="min-w-fit">
                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                    <span className="text-warning me-1"><i className="bi bi-star-half"></i></span>
                                    <span className="text-warning"><i className="bi bi-star"></i></span>
                                </div>
                                <p className="mx-1 mb-0 min-w-fit text-textmuted dark:text-textmuted/50">
                                    <span> (142)</span>
                                    <span> Ratings</span>
                                </p>
                                <span className="text-danger">( 150 Sales )</span>
                            </div>
                            <div className="box">
                                <div className="">
                                    <div className="hs-tooltip ti-main-tooltip !absolute top-[0.15rem] end-[0.15rem]">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary !rounded-full top-wishlist-icon hs-tooltip-toggle">
                                            <i className="ri-heart-line"></i>
                                            <span
                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                role="tooltip">
                                                Add to wishlist
                                            </span>
                                        </Link>
                                    </div>
                                    <MarketGallerylist />
                                </div>
                                <div className="box-body text-center">
                                    <div className="btn-list">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-w-lg ti-btn-danger me-2"><i className="ti ti-eye me-1"></i>Preview</Link>
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-w-lg ti-btn-light !border"><i className="ti ti-photo-plus me-1"></i>Screenshots</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-body">
                                    <h5 className="font-semibold mb-3">Description :</h5>
                                    <p className="mb-4">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                    <p className="mb-4">Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis...</p>
                                    <h5 className="font-semibold mb-3">Features</h5>

                                    <ul className="ti-list-group list-unstyled">
                                        <li className="ti-list-group-item">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>W3C</span> Validated
                                        </li>
                                        <li className="ti-list-group-item">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>24/7 </span> Support
                                        </li>
                                        <li className="ti-list-group-item">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Faster</span> Loading Speed
                                        </li>
                                        <li className="ti-list-group-item">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>User Friendly</span> Design
                                        </li>
                                        <li className="ti-list-group-item">
                                            <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>Browsers</span> Compatibility
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="box !border-0 !bg-primary/[0.15] shadow-none">
                                <div className="box-body">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div>
                                            <h5 className="font-semibold mb-0">&#128400; Was this Ad useful to someone?</h5>
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
                                <div className="xl:col-span-12 col-span-12">
                                    <h4 className="font-semibold mb-0">Related Products</h4>
                                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <SpkSwiperJs slides={RelatedProductsdata} spaceBetween={30} slidesPerView={3} navigation={true} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper-navigation swiper swiper-related-jobs" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-header">
                                    <div className="box-title">
                                        Select Licence Type
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group list-group-flush !border-0">
                                        <li className="ti-list-group-item flex">
                                            <div className="form-check !flex gap-x-2 items-center">
                                                <input className="form-check-input" name="list-radio" id="customRadio1" type="radio" />
                                                <label className="cursor-pointer block custom-control-label" htmlFor="customRadio1">Regular Licence
                                                    <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mx-1"> Classic marinara sauce, authentic old-world pepperoni</span>
                                                    <Link scroll={false} href="#!" className="text-[0.75rem] text-primary"> <u>View Details</u></Link>
                                                </label>
                                            </div>
                                            <label className="form-check-label font-semibold text-[1rem] ms-2" htmlFor="customRadio1">$69</label>
                                        </li>
                                        <li className="ti-list-group-item flex">
                                            <div className="form-check !flex gap-x-2 items-center">
                                                <input className="form-check-input" name="list-radio" id="customRadio2" type="radio" defaultChecked />
                                                <label className="cursor-pointer block custom-control-label" htmlFor="customRadio2">Extended Licence
                                                    <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mx-1"> Classic marinara sauce, authentic old-world pepperoni</span>
                                                    <Link scroll={false} href="#!" className="text-[0.75rem] text-primary"> <u>View Details</u></Link>
                                                </label>
                                            </div>
                                            <label className="form-check-label font-semibold text-[1rem] ms-2" htmlFor="customRadio1">$99</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="box-footer">
                                    <div className="grid">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-success" role="button">
                                            <i className="ri-shopping-cart-line me-2"></i>Add to Cart
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-header">
                                    <div className="box-title">
                                        Product Information
                                    </div>
                                </div>
                                <div className="box-body !p-2">
                                    <div className="table-responsive">
                                        <Spktables tableClass="table table-responsive table-borderless">
                                            {ProductInformation.map((idx) => (
                                                <tr key={idx.id}>
                                                    <td className="w-[50%] py-3 px-[1.15rem]">
                                                        <span className="font-semibold"><i className="bi bi-check-circle text-primary me-2"></i>{idx.lable1}</span>
                                                    </td>
                                                    <td className="py-3 px-[1.15rem]">{idx.lable2}</td>
                                                </tr>
                                            ))}
                                        </Spktables>
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
                                                    <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                    <span
                                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                        role="tooltip">
                                                        Verified User
                                                    </span>
                                                </Link>
                                            </div></div>
                                            <p className="mb-0">Member Since 2015</p>
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
                                        <div className="grid">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger" role="button">
                                                <i className="ri-eye-line me-2"></i>View Author Profile
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-6 flex items-center flex-wrap gap-2">
                                        <p className="text-[0.9375rem] mb-0 me-4 font-semibold">Social :</p>
                                        <div className="btn-list mb-0">
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave  xl:mb-0">
                                                <i className="ri-facebook-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave  xl:mb-0">
                                                <i className="ri-twitter-x-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave  xl:mb-0">
                                                <i className="ri-instagram-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave  xl:mb-0">
                                                <i className="ri-github-line"></i>
                                            </button>
                                            <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave  xl:mb-0">
                                                <i className="ri-youtube-line"></i>
                                            </button>
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