"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { CompareProductsData } from "@/shared/data/apps/ecommers/customer/compare-products-data";
import Link from "next/link";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";

import Image from "next/image";

const CompareProducts = () => {
    return (
        <Fragment>
            {/* <!-- Start::app-content --> */}
            <div className="main-content landing-main ecommerce-main">

                {/* Start:: Breadcrumb*/}
                <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                    <div className="container">
                        {/* Page Header */}
                        <Seo title={"Compare Products"} />
                        <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Compare Products" />
                        {/* Page Header Close */}
                    </div>
                </div>
                {/* End:: Breadcrumb*/}


                {/* <!-- Start:: Section-1 --> */}
                <section className="section !py-3">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="md:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            Compare Products
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="table-responsive">
                                            <Spktables tableClass="ti-custom-table ti-custom-table-head table-bordered !border w-full mb-0" >
                                                <tr>
                                                    <td><span className="font-semibold">Products</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}>
                                                            <div className="flex items-start gap-3">
                                                                <div>
                                                                    <span className="avatar avatar-xxl bg-light border dark:border-defaultborder/10">
                                                                        <Image fill src={product.image} alt="img" />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <h6 className="text-[1rem] mb-1 font-medium">{product.name}</h6>
                                                                    <div className="flex items-end justify-between">
                                                                        <div>
                                                                            <p className="mb-0 text-textmuted dark:text-textmuted/50">SKU {product.sku}</p>
                                                                            <h5 className="mb-0 mt-3 font-medium">{product.price}</h5>
                                                                        </div>
                                                                        <div className="btn-list">
                                                                            <div className="hs-tooltip ti-main-tooltip">
                                                                                <Link scroll={false} href="#!" className="hs-tooltip-toggle ti-btn ti-btn-soft-primary ti-btn-icon">
                                                                                    <i className="ti ti-repeat text-[1rem]"></i>
                                                                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">Replace</span>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="hs-tooltip ti-main-tooltip">
                                                                                <Link scroll={false} href="#!" className="hs-tooltip-toggle ti-btn ti-btn-soft-secondary ti-btn-icon me-0">
                                                                                    <i className="ti ti-trash text-[1rem]"></i>
                                                                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">Remove</span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Rating</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}>
                                                            <span><i className="fe fe-star !text-warning me-1"></i> ({product.rating})</span>
                                                            <span className="vr mx-1"></span>
                                                            <span>{product.ratingsCount} Ratings</span>
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Brand</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}><span>{product.brand}</span></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Model</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}><span>{product.model}</span></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Date</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}><span>{product.date}</span></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Weight</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}><span>{product.weight}</span></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td><span className="font-semibold">Color</span></td>
                                                    {CompareProductsData.map((product, index) => (
                                                        <td key={index}><span>{product.color}</span></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    {CompareProductsData.map((_, index) => (
                                                        <td key={index}>
                                                            <Link href="/ecommerce/customer/cart" className="ti-btn ti-btn-w-lg ti-btn-primary">
                                                                <i className="ti ti-shopping-cart-plus text-[1rem] me-1"></i> Add To Cart
                                                            </Link>
                                                        </td>
                                                    ))}
                                                </tr>
                                            </Spktables>
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

            </div>
            {/* <!-- End::app-content --> */}
        </Fragment>
    );
};

export default CompareProducts;