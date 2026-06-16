"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() => import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'), { ssr: false });
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import SwiperComponentDomain from "@/shared/data/apps/domain/single-landing-data";
import { Offerdata, SinglepageTimer } from "@/shared/data/apps/domain/singlelandingpage";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, } from "react";

const SingleLanding = () => {
    return (
        <Fragment>

            <Seo title={"Singlelanding"} />

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 authentication g-0">
                <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 justify-center items-center h-full py-[3rem]">
                        <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1"></div>
                        <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-8 md:col-span-8 sm:col-span-8 col-span-10">
                            <div className="box p-4 overflow-hidden ribbon-card">
                                <div className="box-body">
                                    <div className="ribbon ribbon-danger ribbon-top-left"><span>10% Off</span></div>
                                    <div className="flex gap-4 flex-wrap">
                                        <div>
                                            <span className="avatar avatar-lg bg-primary avatar-rounded svg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 1024 1024"><path d="M919.2 404.8H104.8l6.2-19.5c12-37.9 29.2-73.8 51.4-106.9 17.8-26.6 38.6-51.2 62-73.1C302.5 131.9 404.7 91.5 512 91.5c107.3 0 209.5 40.4 287.7 113.8 23.4 21.9 44.2 46.5 62 73.1 22.2 33.1 39.4 69 51.4 106.9l6.1 19.5zm-772.9-30h731.4c-10.5-28-24.2-54.7-41-79.7-16.5-24.7-35.9-47.5-57.6-67.9C706.5 159 611.6 121.5 512 121.5c-99.6 0-194.5 37.5-267.1 105.7-21.7 20.4-41.1 43.2-57.6 67.9-16.8 24.9-30.5 51.7-41 79.7zM512 932.5c-107.3 0-209.5-40.4-287.7-113.8-23.4-22-44.2-46.5-62-73.1-22.1-33.1-39.4-69-51.4-106.9l-6.2-19.5h814.4l-6.2 19.5c-11.9 37.8-29.2 73.8-51.4 106.9-17.8 26.5-38.6 51.1-62 73.1-78.1 73.4-180.2 113.8-287.5 113.8zM146.3 649.2c10.5 28 24.3 54.8 41 79.7 16.5 24.7 35.9 47.5 57.6 67.9C317.5 865 412.4 902.5 512 902.5c99.6 0 194.5-37.5 267.1-105.7 21.7-20.4 41.1-43.2 57.6-67.9 16.7-25 30.5-51.7 41-79.7H146.3z"></path><path d="M512 932.5c-39.6 0-78.5-18.5-112.3-53.6-31.5-32.6-58.6-79.5-78.4-135.5-11.7-33.1-20.8-69-27-106.7l-2.9-17.4h441.2l-2.9 17.4c-6.2 37.8-15.3 73.7-27 106.7-19.8 56-46.9 102.9-78.4 135.5-33.8 35.1-72.7 53.6-112.3 53.6zM327 649.2c5.7 29.6 13.3 57.9 22.6 84.2 18.4 52 43.2 95.1 71.7 124.7 28.5 29.5 59 44.5 90.7 44.5s62.3-15 90.7-44.5c28.5-29.5 53.3-72.7 71.7-124.7 9.3-26.3 16.9-54.6 22.6-84.2H327zm405.6-244.4H291.4l2.9-17.4c6.2-37.8 15.3-73.7 27-106.7 19.8-56 46.9-102.9 78.4-135.5C433.5 110 472.4 91.5 512 91.5c39.6 0 78.5 18.5 112.3 53.6 31.5 32.6 58.6 79.5 78.4 135.5 11.7 33.1 20.8 69 27 106.7l2.9 17.5zm-405.6-30h370c-5.7-29.6-13.3-57.9-22.6-84.2-18.4-52-43.2-95.1-71.7-124.7-28.5-29.5-59-44.5-90.7-44.5s-62.3 15-90.7 44.5c-28.5 29.5-53.3 72.7-71.7 124.7-9.3 26.3-16.9 54.6-22.6 84.2z"></path><path d="M497 634.2h30v283.3h-30zM497 106.5h30v283.3h-30z"></path><path d="M512 341c-64.2 0-125.8-14.1-183.1-41.9-38.3-18.6-73.5-42.8-104.6-71.9l-11.7-10.9 11.7-10.9C302.5 131.9 404.7 91.5 512 91.5c107.3 0 209.5 40.4 287.6 113.8l11.7 10.9-11.7 10.9c-31.1 29.2-66.3 53.4-104.6 71.9-57.2 27.9-118.8 42-183 42zM257 216.2c25.8 22.3 54.3 41 85 55.9 53.2 25.8 110.4 38.8 170 38.8 59.6 0 116.8-13.1 170-38.9 30.7-14.8 59.2-33.6 85-55.9-70.9-61.2-160.8-94.7-255-94.7-94.2.1-184.1 33.6-255 94.8zm255 716.3c-107.3 0-209.5-40.4-287.7-113.8l-11.7-10.9 11.7-10.9c31.1-29.2 66.3-53.4 104.6-72C386.2 697.1 447.8 683 512 683c64.2 0 125.8 14.1 183.1 41.9 38.3 18.5 73.4 42.7 104.6 71.9l11.7 10.9-11.7 10.9C721.5 892.1 619.3 932.5 512 932.5zM257 807.8c70.9 61.2 160.8 94.7 255 94.7 94.2 0 184.1-33.5 255-94.7-25.8-22.3-54.3-41-85-55.9-53.2-25.8-110.4-38.9-170-38.9-59.6 0-116.8 13.1-170 38.8-30.7 14.9-59.2 33.7-85 56zm684.2-158.6H82.8c-10.8 0-19.6-8.8-19.6-19.6V394.4c0-10.8 8.8-19.6 19.6-19.6h858.5c10.8 0 19.6 8.8 19.6 19.6v235.3c-.1 10.7-8.9 19.5-19.7 19.5zm-848-30h837.6V404.8H93.2v214.4z"></path><path d="M314.1 588H282l-39-88.4-39.1 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM804.7 588h-32.1l-39.1-88.4-39 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM559.4 588h-32.1l-39-88.4-39.1 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM843.2 558h29.4v30h-29.4z"></path></svg>
                                            </span>
                                        </div>
                                        <div className="w-full">
                                            <p className="mb-0 text-textmuted dark:text-textmuted/50">This domain is for sale</p>
                                            <h4 className="font-semibold mb-3 truncate">spotecktechnical.com</h4>
                                        </div>
                                    </div>
                                    <p className="text-textmuted dark:text-textmuted/50 mb-4">This domain is rare domain it can be used or converted into any business. If you are looking for easy to remember domain name for your business then have it now.</p>
                                    <h6 className="mb-4">
                                        <span className="">Today Offer Price : </span>
                                        <span className="badge badge-md font-semibold bg-danger/[0.15] text-danger"> $324.00 </span>
                                    </h6>
                                    <p className="mb-4">Auction Ends In</p>
                                    <SinglepageTimer />
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control form-control-lg !border-s" placeholder="info@gmail.com" aria-label="info@gmail.com" aria-describedby="button-addon2" />
                                        <button className="ti-btn ti-btn-primary !m-0" type="button" id="button-addon2">Place Bid</button>
                                    </div>
                                    <div className="flex gap-2 items-center flex-wrap mt-2">
                                        <div className="mb-2">
                                            <span className="avatar avatar-md avatar-rounded bg-warning/[0.15] svg-warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="!fill-warning" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z" /></g></svg>
                                            </span>
                                        </div>
                                        <h6 className="mb-0">
                                            <span className="text-textmuted dark:text-textmuted/50">Current Bid : </span>
                                            <span className="font-medium text-[1.25rem]"> $345.00 </span>
                                            <span className="text-textmuted dark:text-textmuted/50"> From </span>
                                            <Link scroll={false} href="#!" className="text-primary font-semibold"><u>Jackmiller</u></Link>
                                            <span className="text-info ms-2"> (10 Bids)</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-6 mt-[0.3rem]">
                                <div className="xl:col-span-12 col-span-12">
                                    <h5 className="font-semibold mb-0">Related Domains</h5>
                                    <p className="text-textmuted dark:text-textmuted/50 mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                    <SpkSwiperJs slides={SwiperComponentDomain} spaceBetween={30} centeredSlides={true} navigation={true} autoplay={true} className="mySwiper swiper swiper-related-jobs related-domains" />
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1"></div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 col-span-12">
                    <div className="authentication-cover py-[3rem]">
                        <div className="grid grid-cols-12 justify-center">
                            <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-3 col-span-1"></div>
                            <div className="xxl:col-span-8 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-10">
                                <div className="box make-offer-card mb-0 !bg-white/10 !border-white/20 backdrop-blur-[40px]">
                                    <div className="box-header !border-white/20">
                                        <div className="box-title text-white">Make Offer Now</div>
                                    </div>
                                    <div className="box-body !p-6">
                                        <div className="grid grid-cols-12 gap-y-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="Username" className="ti-form-label font-medium text-white">Username</label>
                                                <input type="text" className="form-control !bg-white/10 focus:!bg-white/10 dark:focus:!bg-white/10 !border-white/10 !text-white !placeholder-white" id="Username" placeholder="Username" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="email-address" className="ti-form-label font-medium text-white">Email Address</label>
                                                <input type="text" className="form-control !bg-white/10 focus:!bg-white/10 dark:focus:!bg-white/10 !border-white/10 !text-white !placeholder-white" id="email-address" placeholder="xyz@gmail.com" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="phone-number" className="ti-form-label font-medium text-white">Mobile Number</label>
                                                <input type="text" className="form-control !bg-white/10 focus:!bg-white/10 dark:focus:!bg-white/10 !border-white/10 !text-white !placeholder-white" id="phone-number" placeholder="*** *** 5678" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="message" className="ti-form-label font-medium text-white">Subject</label>
                                                <textarea className="form-control !bg-white/10 focus:!bg-white/10 dark:focus:!bg-white/10 !border-white/10 !text-white !placeholder-white" placeholder="Message..." id="message"></textarea>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="phone-number" className="ti-form-label font-medium text-white col-9">Offer Price</label>
                                                <div className="input-group flex-nowrap offer-praposal">
                                                    <input type="text" className="form-control crypto-buy-sell-input !bg-white/10 focus:!bg-white/10 dark:focus:!bg-white/10 !border-s !border-white/10 !text-white !placeholder-white" aria-label="crypto buy select" placeholder="36,335.00" />
                                                    <SpkSelect name="colors" option={Offerdata} mainClass="" id="choices-single-default1"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Offerdata[0]]} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer !border-white/20">
                                        <div className="grid">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-danger">Make Offer</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-3 col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

        </Fragment>
    );
};

export default SingleLanding;