"use client"
import { CouponsData, CouponsData1 } from "@/shared/data/apps/ecommers/customer/couponsdata";
import Link from "next/link";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";

import Image from "next/image";

const Coupons = () => {
    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Coupons"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Coupons" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-3">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        {CouponsData.map((idx) => (
                            <div className="md:col-span-6 col-span-12" key={idx.id}>
                                <div className={`box !border-0 card-style-7 ${idx.cardclass} !rounded-none`}>
                                    <div className="box-body !p-0">
                                        <div className="p-4 card-content-1">
                                            <div className="grid grid-cols-12 gap-x-6 items-center">
                                                <div className="md:col-span-3 col-span-12">
                                                    <div className="bg-gray-300 dark:bg-light rounded-sm relative">
                                                        <Image fill priority src={idx.image} alt="img" className="w-full img-fluid" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-9 col-span-12">
                                                    <Link href="#!" className="inline-block mb-1 text-[0.8125rem] text-primary">{idx.brand}</Link>
                                                    <h6 className="mb-0 text-[1.0625rem] font-semibold">{idx.title}</h6>
                                                    <div className="flex items-baseline mt-3">
                                                        <h6 className="text-[1.25rem] text-success font-semibold mb-0">${idx.price}</h6>
                                                        <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 text-decoration-line-through">${idx.originalPrice}</span>
                                                        <span className="text-primary ms-auto fst-italic">{idx.discount}% Off</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 card-content-2 text-center flex items-center justify-between">
                                            <span className="tx-style-1">{idx.code}</span>
                                            <p className="mb-0 mt-1 text-[0.8125rem] text-"> {idx.expiryDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        {CouponsData1.map((idx) => (
                            <div className="md:col-span-6 col-span-12" key={idx.id}>
                                <div className={`box !border-0 card-style-7 ${idx.cardclass} shadow-none !rounded-none`}>
                                    <div className="box-body !p-0">
                                        <div className="grid grid-cols-12">
                                            <div className="xl:col-span-4 col-span-4">
                                                <div className="p-4 card-content-3 h-full flex flex-col items-center justify-center text-center">
                                                    <span className={`avatar avatar-lg !rounded-full bg-${idx.logoClass} text-white mb-2`} title="brand-logo"><i className={`ti ti-${idx.icon} text-[1.5rem]`}></i></span>
                                                    <Link href="#!" className="inline-block text-[0.8125rem] text-primary mb-1">{idx.brand}</Link>
                                                    <h6 className="mb-0 text-[1.0625rem] font-semibold">{idx.category}</h6>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-8 col-span-8">
                                                <div className="p-4 card-content-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="min-w-fit">
                                                            <span className="text-[1.5rem] text-primary">{idx.discountPercentage}%</span>
                                                            <span className="text-[0.8125rem] text-textmuted dark:text-textmuted/50"> off</span>
                                                        </div>
                                                        <div className="flex-grow text-end">
                                                            <span className="text-[0.8125rem] text-textmuted dark:text-textmuted/50">Max ${idx.maxDiscount}</span>
                                                        </div>
                                                    </div>
                                                    <p className="mb-2 text-[0.8125rem] text-textmuted dark:text-textmuted/50 font-normal me-2">Use Code</p>
                                                    <div className={`flex items-center flex-wrap justify-between gap-2 ${idx.customGap}`}>
                                                        <span className="tx-style-1">{idx.useCode}</span>
                                                        <span className="text-[0.8125rem] text-danger">{idx.expiryDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                            <Link href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
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

export default Coupons;