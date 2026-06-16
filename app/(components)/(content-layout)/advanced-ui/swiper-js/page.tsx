"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import * as swiperjsData from "@/shared/data/adavanec-ui/swiperjsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { FC, Fragment, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SwiperJsProps { }

const SwiperJs: FC<SwiperJsProps> = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return "<span class=\"" + className + "\">" + (index + 1) + "</span>";
        },
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Swiper" />
            <Pageheader Heading="Swiper" breadcrumbs={['Advanced Ui']} currentpage="Swiper" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Swiper
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Basicdata} spaceBetween={30} centeredSlides={true} autoplay={true} className="mySwiper swiper-basic" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Swiper With Navigation
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Navigationdata} spaceBetween={30} centeredSlides={true} navigation={true} autoplay={true} className="mySwiper swiper-navigation" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Swiper with Pagination
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Paginationdata} spaceBetween={30} centeredSlides={true} pagination={{ clickable: true, }} autoplay={true} className="mySwiper" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Dynamic Pagination
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Dynamicdata} spaceBetween={30} centeredSlides={true} pagination={{ clickable: true, }} autoplay={true} className="mySwiper" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Pagination With Progress
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Progressdata} pagination={{ type: 'progressbar' }} navigation={true} autoplay={true} className="mySwiper" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Pagination Fraction
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Fractiondata} pagination={{ type: 'fraction' }} navigation={true} autoplay={true} className="mySwiper pagination-fraction" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Custom Paginatioin
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Customdata} pagination={pagination} autoplay={true} className="mySwiper swiper custom-pagination" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Scrollbar Swiper
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Scrollbardata} scrollbar={{ hide: true, }} autoplay={true} className="mySwiper swiper scrollbar-swiper" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Keyboard Control
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Keyboarddata} pagination={{ clickable: true, }} autoplay={true} slidesPerView={1} spaceBetween={30} navigation={true} keyboard={{ enabled: true }} className="mySwiper" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Vertical Swiper
                            </div>
                        </div>
                        <div className="box-body custom-swiper">
                            <SpkSwiperJs slides={swiperjsData.Verticaldata} direction={"vertical"} pagination={{ clickable: true, }} autoplay={false} className=" mySwiper swiper-vertical !h-[352px]  swiper-pointer-events " />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Mouse Wheel Control
                            </div>
                        </div>
                        <div className="box-body custom-swiper">
                        <SpkSwiperJs slides={swiperjsData.Mousewheeldata} mousewheel={true} direction={"vertical"} pagination={{ clickable: true, }} autoplay={false} className="mySwiper vertical swiper-vertical !h-[352px]" />
                        </div>
                    </div>
                </div>
                
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Nested Swiper</div>
                        </div>
                        <div className="box-body custom-swiper">
                            <Swiper className="mySwiper swiper-h swiper swiper-horizontal1" spaceBetween={50} pagination={{ clickable: true, }} modules={[Pagination]}>
                                <SwiperSlide><Image fill src="../../assets/images/media/media-30.jpg" className="!rounded-md" alt="" /></SwiperSlide>
                                <SwiperSlide>
                                    <Swiper className="mySwiper2 " direction={"vertical"} spaceBetween={50} pagination={{ clickable: true, }}
                                        modules={[Pagination]}>
                                        <SwiperSlide><Image fill src="../../assets/images/media/media-25.jpg"  className="!rounded-md !h-[352px]" alt="" /></SwiperSlide>
                                        <SwiperSlide><Image fill src="../../assets/images/media/media-30.jpg"  className="!rounded-md !h-[352px]" alt="" /></SwiperSlide>
                                        <SwiperSlide><Image fill src="../../assets/images/media/media-32.jpg"  className="!rounded-md !h-[352px]" alt="" /></SwiperSlide>
                                    </Swiper>
                                </SwiperSlide>
                                <SwiperSlide><Image fill priority src="../../assets/images/media/media-28.jpg" alt="" className="!rounded-md" /></SwiperSlide>
                                <SwiperSlide><Image fill src="../../assets/images/media/media-29.jpg" alt="" className="!rounded-md" /></SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Effect Cube
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Effectcubedata} spaceBetween={30}  effect={"cube"} navigation={true} pagination={{ clickable: true, }} autoplay={true} className="mySwiper swiper swiper-fade cube-custom" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Effect Fade
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Effectfadedata} effect={"fade"} pagination={{ clickable: true, }} navigation={true} autoplay={true} className="mySwiper swiper-fade" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Effect Flip
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Effectflipdata} effect={"flip"} grabCursor={true} pagination={{ clickable: true, }} navigation={true} autoplay={true} className="mySwiper" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Effect Coverflow
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Effectcovberflowdata} effect={"coverflow"} grabCursor={true} centeredSlides={false} slidesPerView={4} pagination={{ clickable: true, }} autoplay={true} coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }} className="mySwiper" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Thumbs Gallery
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSwiperJs slides={swiperjsData.Thumbdata} navigation={true} autoplay={true} thumb={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} className="mySwiper bd-gray-100 product-details-page" />
                            <SpkSwiperJs slides={swiperjsData.Thumbdata} onswiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freemode={true} autoplay={true} watchslide={true} className="swiper-view-details mt-2" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}
        </Fragment>
    );
};

export default SwiperJs;