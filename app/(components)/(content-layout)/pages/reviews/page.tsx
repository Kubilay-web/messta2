"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { breakpoints, breakpoints1, breakpoints2, ReviewsStyle1Swiper, ReviewsStyle2Swiper, ReviewsStyle3Swiper, ReviewsStyle4Swiper, ReviewsStyle5Swiper } from "@/shared/data/pages/reviewsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";

const Reviews = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Reviews" />
            <Pageheader Heading="Reviews" breadcrumbs={['Pages']} currentpage="Reviews" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                REVIEWS STYLE 1
                            </div>
                        </div>
                        <div className="box-body !p-6">
                            <SpkSwiperJs slides={ReviewsStyle1Swiper} loop={true} centeredSlides={true} slidesPerView={3} spaceBetween={30} breakpoint={breakpoints} autoplay={true} className="swiper testimonialSwiper  swiper-pointer-events" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                REVIEWS STYLE 2
                            </div>
                        </div>
                        <div className="box-body reviewstyle-2">
                            <SpkSwiperJs slides={ReviewsStyle2Swiper} spaceBetween={30} breakpoint={breakpoints1} autoplay={true} className="mySwiper swiper testimonialSwiper1" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                REVIEWS STYLE 3
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={ReviewsStyle3Swiper} spaceBetween={30} slidesPerView={3} autoplay={true} breakpoint={breakpoints2} className="mySwiper swiper testimonialSwiper2" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}

            {/* <!-- Start::row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <h6 className="mb-3">REVIEWS STYLE 4</h6>
                    <SpkSwiperJs slides={ReviewsStyle4Swiper} spaceBetween={30} slidesPerView={3} autoplay={true} breakpoint={breakpoints2} className="mySwiper swiper testimonialSwiperService1" />
                </div>
            </div>
            {/* <!-- End::row-4 --> */}

            {/* <!-- Start::row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box card-bg-primary reviews-container">
                        <div className="box-header !border-white/10">
                            <div className="box-title">
                                REVIEWS STYLE 5
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={ReviewsStyle5Swiper} spaceBetween={30} slidesPerView={3} pagination={{ clickable: true, }} breakpoint={breakpoints2} autoplay={true} className="mySwiper swiper pagination-dynamic testimonialSwiperService !pb-[3.375rem]" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-5 --> */}
        </Fragment>
    );
};

export default Reviews;