"use client"

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Customer = () => {
    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Customer"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce']} currentpage="Ecommerce AboutUs" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/*<!-- Start:: Section-1 -->*/}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="md:col-span-6 col-span-12">
                            <h3 className="font-semibold mb-3">About Us</h3>
                            <p className="text-textmuted mb-4">At sit voluptua takimata ea magna ipsum sanctus. Labore accusam dolor lorem dolore takimata sanctus voluptua amet. Justo sea sed. Et sadipscing eirmod dolores et voluptua gubergren est ipsum et. Ipsum vero et nonumy lorem lorem. Labore aliquyam eos est.</p>
                            <p className="text-textmuted mb-4">At sit voluptua takimata ea magna ipsum sanctus. Labore accusam dolor lorem dolore takimata sanctus voluptua amet. Justo sea sed. Et sadipscing eirmod dolores et voluptua gubergren est ipsum et. Ipsum vero et nonumy lorem lorem. Labore aliquyam eos est.</p>
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary ti-btn-lg">Get It Now <i className="ti ti-arrow-right ms-1 text-[1.125rem]"></i></Link>
                        </div>
                        <div className="md:col-span-1 col-span-12"></div>
                        <div className="md:col-span-5 col-span-12">
                            <div className="img-box-3 p-4">
                                <Image fill src="../../../assets/images/ecommerce/banner/3.png" alt="img" className="w-full img-fluid rounded-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End:: Section-1 -->*/}

            {/*<!-- Start:: Section-2 -->*/}
            <section className="section bg-light">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 justify-between">
                        <div className="md:col-span-5 col-span-12">
                            <h3 className="font-semibold mb-2">What We Are Providing</h3>
                            <p className="mb-4 text-textmuted">Dolor gubergren et sed stet labore. Tempor accusam ipsum eirmod sed takimata takimata lorem clita ea. Ipsum et sed at.</p>
                            <div className="rounded-sm">
                                <Image fill src="../../../assets/images/ecommerce/banner/6.png" alt="img" className="w-full img-fluid rounded-sm" />
                            </div>
                        </div>
                        <div className="md:col-span-1 col-span-12"></div>
                        <div className="md:col-span-6 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box">
                                        <div className="box-body">
                                            <div className="visible-content">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="min-w-fit">
                                                        <span className="avatar avatar-md !rounded-full bg-primary/[0.15] text-primary border border-primary/[0.25]"><i className="ti ti-truck-delivery text-[1.25rem]"></i></span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="mb-0 text-[1.125rem] font-semibold">Free Delivery</h6>
                                                    </div>
                                                </div>
                                                <p className="mb-3 text-textmuted text-[0.8125rem]">Consetetur et et tempor accusam accusam. Et consetetur dolor et sanctus sit kasd labore vero sanctus.</p>
                                                <Link scroll={false} href="#!" className="text-primary text-[0.8125rem]">Read More  <i className="ti ti-arrow-right text-[0.875rem]"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-body">
                                            <div className="visible-content">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="min-w-fit">
                                                        <span className="avatar avatar-md !rounded-full bg-warning/[0.15] text-warning border border-warning/[0.25]"><i className="ti ti-tags text-[1.25rem]"></i></span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="mb-0 text-[1.125rem] font-semibold">Best Deals</h6>
                                                    </div>
                                                </div>
                                                <p className="mb-3 text-textmuted text-[0.8125rem]">Et lorem gubergren ipsum dolor diam lorem dolor sed, amet voluptua ipsum voluptua stet sit elitr at justo sea.</p>
                                                <Link scroll={false} href="#!" className="text-primary text-[0.8125rem]">Read More  <i className="ti ti-arrow-right text-[0.875rem]"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box mt-5">
                                        <div className="box-body">
                                            <div className="visible-content">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="min-w-fit">
                                                        <span className="avatar avatar-md !rounded-full bg-secondary/[0.15] text-secondary border border-secondary/[0.25]"><i className="ti ti-box-seam text-[1.25rem]"></i></span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="mb-0 text-[1.125rem] font-semibold">Easy Returns</h6>
                                                    </div>
                                                </div>
                                                <p className="mb-3 text-textmuted text-[0.8125rem]">Diam ipsum dolore justo kasd gubergren lorem. Dolor lorem sed stet sadipscing no, et dolores gubergren no.</p>
                                                <Link scroll={false} href="#!" className="text-primary text-[0.8125rem]">Read More  <i className="ti ti-arrow-right text-[0.875rem]"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="box-body">
                                            <div className="visible-content">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="min-w-fit">
                                                        <span className="avatar avatar-md !rounded-full bg-danger/[0.15] text-danger border border-danger/[0.25]"><i className="ti ti-diamond text-[1.25rem]"></i></span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="mb-0 text-[1.125rem] font-semibold">Top Notch Quality</h6>
                                                    </div>
                                                </div>
                                                <p className="mb-3 text-textmuted text-[0.8125rem]">Et lorem sanctus dolores erat lorem at no kasd sea kasd. Gubergren sed ut sadipscing dolor amet, et sanctus magna.</p>
                                                <Link scroll={false} href="#!" className="text-primary text-[0.8125rem]">Read More  <i className="ti ti-arrow-right text-[0.875rem]"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End:: Section-2 -->*/}

            {/*<!-- Start:: Section-3 -->*/}
            <section className="section z-2">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 justify-between mb-[3rem]">
                        <div className="md:col-span-6 col-span-12">
                            <h3 className="font-semibold mb-3">The Values We Live By</h3>
                            <p className="mb-5 text-textmuted">Consetetur sanctus ipsum dolore dolore vero ipsum et sadipscing ipsum lorem, lorem dolor duo tempor diam sit lorem sed ipsum.</p>
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box">
                                        <div className="box-body p-3">
                                            <div className="flex items-center gap-2">
                                                <span className="avatar avatar-sm border border-primary/[0.25] !rounded-full bg-primary/[0.15] text-primary"><i className="ti ti-check text-[0.9375rem]"></i></span>
                                                <span className="font-semibold">Open to new ways</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box">
                                        <div className="box-body p-3">
                                            <div className="flex items-center gap-2">
                                                <span className="avatar avatar-sm border border-secondary/[0.25] !rounded-full bg-secondary/[0.15]"><i className="ti ti-check text-[0.9375rem]"></i></span>
                                                <span className="font-semibold">Selfless</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box">
                                        <div className="box-body p-3">
                                            <div className="flex items-center gap-2">
                                                <span className="avatar avatar-sm border border-danger/[0.25] !rounded-full bg-danger/[0.15]"><i className="ti ti-check text-[0.9375rem]"></i></span>
                                                <span className="font-semibold">Deliver Results</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box">
                                        <div className="box-body p-3">
                                            <div className="flex items-center gap-2">
                                                <span className="avatar avatar-sm border border-warning/[0.25] !rounded-full bg-warning/[0.15]"><i className="ti ti-check text-[0.9375rem]"></i></span>
                                                <span className="font-semibold">Communication</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 col-span-12"></div>
                        <div className="md:col-span-5 col-span-12">
                            <div className="p-3 bg-gray-300 rounded-sm">
                                <Image fill src="../../../assets/images/ecommerce/banner/4.png" alt="img" className="w-full img-fluid rounded-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="md:col-span-4 col-span-12">
                            <div className="box text-center">
                                <div className="box-body">
                                    <span className="avatar avatar-lg !rounded-full bg-primary text-white mb-3"><i className="ti ti-squares-filled text-[1.5rem]"></i></span>
                                    <h6 className="text-[1.125rem] font-semibold mb-3">Transparency</h6>
                                    <p className="mb-0 text-textmuted text-[0.8125rem]">Elitr elitr amet amet diam sanctus consetetur labore ea sit. Lorem ut et amet labore takimata eirmod accusam eirmod ut..</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                            <div className="box text-center">
                                <div className="box-body">
                                    <span className="avatar avatar-lg !rounded-full text-white bg-danger mb-3"><i className="ti ti-comet text-[1.5rem]"></i></span>
                                    <h6 className="text-[1.125rem] font-semibold mb-3">Passion Before Money</h6>
                                    <p className="mb-0 text-textmuted text-[0.8125rem]">Diam ut amet ea sed et et labore, amet magna eos ea et consetetur ipsum. Sadipscing est et sanctus justo. Eos accusam takimata.</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                            <div className="box text-center">
                                <div className="box-body">
                                    <span className="avatar avatar-lg !rounded-full text-white bg-info mb-3"><i className="ti ti-heart-handshake text-[1.5rem]"></i></span>
                                    <h6 className="text-[1.125rem] font-semibold mb-3">Teamwork</h6>
                                    <p className="mb-0 text-textmuted text-[0.8125rem]">Voluptua sit sadipscing amet duo et et et dolor labore, justo at sea ipsum nonumy, et stet ea lorem tempor. Sed nonumy sadipscing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End:: Section-3 -->*/}

            {/*<!-- Start:: Section-4 -->*/}
            <section className="section text-white bg-primary sp-section-1">
                <div className="container">
                    <div className="text-center">
                        <h3 className="font-semibold mb-2 text-white">We've Just Started Our Journey</h3>
                        <p className="mb-5 op-8 text-white">Lorem eos magna tempor et sea ea elitr duo lorem justo, amet ut dolore sed sanctus sanctus dolor dolore. Sit.</p>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="md:col-span-3 col-span-12">
                            <div className="py-4 bg-white/[0.15] backdrop-blur text-center rounded-sm mb-4">
                                <h6 className="text-[1.5rem] font-semibold mb-1 text-white">5+</h6>
                                <span className="op-8 text-[0.9375rem]">Years</span>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <div className="py-4 bg-white/[0.15] backdrop-blur text-center rounded-sm mb-4">
                                <h6 className="text-[1.5rem] font-semibold mb-1 text-white">30+</h6>
                                <span className="op-8 text-[0.9375rem]">Projects</span>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <div className="py-4 bg-white/[0.15] backdrop-blur text-center rounded-sm mb-4">
                                <h6 className="text-[1.5rem] font-semibold mb-1 text-white">500+</h6>
                                <span className="op-8 text-[0.9375rem]">Happy Clients</span>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <div className="py-4 bg-white/[0.15] backdrop-blur text-center rounded-sm mb-4">
                                <h6 className="text-[1.5rem] font-semibold mb-1 text-white">3500+</h6>
                                <span className="op-8">Sales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End:: Section-4 -->*/}

            {/*<!-- Start:: Section-5 -->*/}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3  mb-xl-0">
                                <div className="box-body">
                                    <div className="flex align-items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-info text-white"><i className="ti ti-truck-delivery text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <h6 className="mb-0 font-semibold !text-[1rem] text-info">Free Delivery</h6>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted">Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3  mb-xl-0">
                                <div className="box-body">
                                    <div className="flex align-items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-warning  text-white"><i className="ti ti-tags text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="mb-0 font-semibold text-[1rem] text-warning">Great Deals & Offers</p>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted">Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3  mb-xl-0">
                                <div className="box-body">
                                    <div className="flex align-items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-danger text-white"><i className="ti ti-arrow-back-up text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="mb-0 font-semibold text-[1rem] text-danger">Easy Returns</p>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted">Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End:: Section-5 -->*/}

            {/*<!-- Start:: Section-6 -->*/}
            <section className="section bg-banner">
                <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                    <div className="lg:col-span-6 col-span-10 text-center">
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-white">&#128073; Download our free mobile apps today</h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <Link scroll={false} href="#!" className="ti-btn bg-black app-store relative">
                            <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                            Google Play
                        </Link>
                        <Link scroll={false} href="#!" className="ti-btn bg-black app-store relative">
                            <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                            App Store
                        </Link>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/*<!-- End:: Section-6 -->*/}


        </Fragment>
    );
};

export default Customer;