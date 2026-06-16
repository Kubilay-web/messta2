"use client"
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { productDetailsData, ProductSwiperComponent, SimilarProducts, TestimonialsSwiperComponent } from "@/shared/data/apps/ecommers/customer/product-details-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import { useSelector } from "react-redux";
import Image from "next/image";
const ProductDetails = () => {
    const selectedItem = useSelector((state: any) => state.reducer.selectedItem);
    const [open, setOpen] = useState(false);
    const localshopdetails = [{ id: 30, preview: "../../../assets/images/ecommerce/png/1.png", title: "Revolutionary Radiance: Introducing Radiant Rainbow Runners" }]
    const Slides = [
        { src: "../../../assets/images/ecommerce/png/1.png" },
        { src: "../../../assets/images/ecommerce/png/2.png" },
        { src: "../../../assets/images/ecommerce/png/3.png" },
        { src: "../../../assets/images/ecommerce/png/4.png" },
        { src: "../../../assets/images/ecommerce/png/5.png" },
    ]

    const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    };

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Product Details"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Product Details" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body !p-2">
                                    <div className="hs-tooltip ti-main-tooltip !absolute top-2 end-2 z-[1]">
                                        <Link scroll={false} href="#!"
                                            className="hs-tooltip-toggle ti-btn ti-btn-icon !rounded-full !bg-white dark:!bg-bodybg top-wishlist-icon">
                                            <i className="ri-heart-fill text-danger"></i>
                                            <span
                                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                                role="tooltip">
                                                Add to Wishlist
                                            </span>
                                        </Link>
                                    </div>
                                    <Link href="#!" className="glightbox box !border-0 !mb-0" data-gallery="gallery1" data-title="Radiant Rainbow Runners (1/5)" data-type="image" data-draggable="true">
                                        <div className="ecommerce-gallery relative">
                                            <span className="badge bg-warning tag-badge text-white">Featured</span>
                                            <span className="ti-btn ti-btn-soft-primary classifyimage-btn !rounded-full" onClick={() => setOpen(true)}>
                                                <i className="ri-image-line me-2 bg-primary !text-white feature-icons !border-0"></i>5
                                                Images
                                            </span>
                                            {selectedItem ? (
                                                <Image priority fill alt='Selected Product' src={selectedItem.preview} className="" />
                                            ) : (
                                                <Image fill className="" alt='Default Product' src={localshopdetails[0].preview} />
                                            )}



                                        </div>
                                    </Link>
                                    {selectedItem ? (
                                        <Lightboxcomponent
                                            close={() => setOpen(false)} // Close function
                                            zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                                            open={open}
                                            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                                            slides={selectedItem.Slides} index={0} />

                                    ) : (
                                        <Lightboxcomponent
                                            close={() => setOpen(false)} // Close function
                                            zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                                            open={open}
                                            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                                            slides={Slides} index={0} />
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div>
                                        <p className="text-[1.125rem] font-semibold mb-0">
                                            {selectedItem ? selectedItem.title : localshopdetails[0].title}

                                        </p>
                                        <p className="text-[1.125rem] mb-5">
                                            <i className="ri-star-s-fill text-warning align-middle me-2"></i>
                                            <i className="ri-star-s-fill text-warning align-middle me-2"></i>
                                            <i className="ri-star-s-fill text-warning align-middle me-2"></i>
                                            <i className="ri-star-s-fill text-warning align-middle me-2"></i>
                                            <i className="ri-star-half-s-fill text-warning align-middle"></i>
                                            <span className="font-semibold ms-1">4.3<Link scroll={false} className="text-info ms-2"
                                                href="#!">(2.4k Reviews)</Link></span>
                                        </p>
                                        <div className="grid grid-cols-12 gap-x-6 mb-4">
                                            <div className="xxl:col-span-5 xl:col-span-12 col-span-12">
                                                <p
                                                    className="mb-1 leading-none text-[0.6875rem] text-success font-semibold">
                                                    Special Offer</p>
                                                <p className="mb-2"><span className="h3 font-semibold"><sup
                                                    className="text-[0.875rem]">$</sup>1,299<sup
                                                        className="text-[0.875rem]">.00</sup></span><span
                                                            className="ms-3 badge bg-danger/[0.15] text-danger">50% Off</span>
                                                </p>
                                                <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                                                    M.R.P-<s>$2,599.00</s></p>
                                            </div>
                                            <div
                                                className="xxl:col-span-6 xl:col-span-7 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 xxl:mt-0 mt-3">
                                                <p className="mb-2 text-[0.9375rem] font-semibold">Shoe Material</p>
                                                <div className="btn-group inline-flex gap-0" role="group"
                                                    aria-label="Basic radio toggle button group">
                                                    <input type="radio" className="btn-check absolute opacity-0"
                                                        name="shoe-material" id="shoe1" defaultChecked />
                                                    <label
                                                        className="ti-btn bg-light dark:bg-black/20 ti-btn-outline-light text-dark !m-0 rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none"
                                                        htmlFor="shoe1">Leather</label>
                                                    <input type="radio" className="btn-check  absolute opacity-0"
                                                        name="shoe-material" id="shoe2" />
                                                    <label
                                                        className="ti-btn ti-btn-outline-light text-dark !m-0 !border-e-0 !border-s-0 !rounded-none"
                                                        htmlFor="shoe2">Mesh Fabric</label>
                                                    <input type="radio" className="btn-check  absolute opacity-0"
                                                        name="shoe-material" id="shoe3" />
                                                    <label
                                                        className="ti-btn ti-btn-outline-light text-dark !m-0 rtl:!rounded-tl-md rtl:!rounded-bl-md rtl:!rounded-tr-none rtl:!rounded-br-none !rounded-tl-none !rounded-bl-none"
                                                        htmlFor="shoe3">Synthetic</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-[0.9375rem] font-semibold mb-1">Description :</p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-0 text-[0.8125rem]">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                                                accusamus,<Link scroll={false} href="#!"
                                                    className="text-decoration-underline text-textmuted dark:text-textmuted/50">Read
                                                    More ?</Link>
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div
                                                    className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                    <p className="text-[0.9375rem] font-semibold mb-2">Colors :</p>
                                                    <p className="mb-0 flex">
                                                        <Link scroll={false} className="color-1 product-colors selected me-2"
                                                            href="#!">
                                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                                        </Link>
                                                        <Link scroll={false} className="color-2 product-colors me-2"
                                                            href="#!">
                                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-colors me-2"
                                                            href="#!">
                                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                                        </Link>
                                                        <Link scroll={false} className="color-4 product-colors me-2"
                                                            href="#!">
                                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                                        </Link>
                                                        <Link scroll={false} className="color-5 product-colors me-2"
                                                            href="#!">
                                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                                        </Link>
                                                    </p>
                                                </div>
                                                <div
                                                    className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 md:mt-0 mt-3">
                                                    <p className="text-[0.9375rem] font-semibold mb-2">Available Size(UK) :
                                                    </p>
                                                    <p className="mb-0 flex">
                                                        <Link scroll={false} className="color-1 product-sizes selected me-2"
                                                            href="#!">
                                                            6
                                                        </Link>
                                                        <Link scroll={false} className="color-2 product-sizes me-2" href="#!">
                                                            7
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-sizes me-2" href="#!">
                                                            8
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-sizes me-2" href="#!">
                                                            9
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-sizes me-2" href="#!">
                                                            10
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-sizes me-2" href="#!">
                                                            11
                                                        </Link>
                                                        <Link scroll={false} className="color-3 product-sizes me-2" href="#!">
                                                            12
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-stretch gap-2 mb-0">
                                            <Link href="/ecommerce/customer/cart/"
                                                className="ti-btn ti-btn-lg ti-btn-soft-primary" data-bs-toggle="tooltip"
                                                aria-label="Add to cart"><i className="ti ti-shopping-cart-plus"></i></Link>
                                            <Link href="/ecommerce/customer/checkout"
                                                className="ti-btn ti-btn-lg ti-btn-primary">Buy Now</Link>
                                            <Link href="/ecommerce/customer/compare-products"
                                                className="ti-btn ti-btn-lg ti-btn-soft-primary" data-bs-toggle="tooltip"
                                                aria-label="Compare"><i className="ti ti-circle-half-2"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Product Details
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full">
                                            {productDetailsData.map((detail, index) => (
                                                <tr key={index}>
                                                    <th scope="row" className="font-semibold">
                                                        {detail.label}
                                                    </th>
                                                    <td>{detail.value}</td>
                                                </tr>
                                            ))}
                                        </Spktables>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">Description</div>
                                </div>
                                <div className="box-body">

                                    <p className="mb-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus,
                                        quaerat nam quo optio reiciendis harum reprehenderit omnis tempora adipisci in
                                        iste aperiam unde, repellendus possimus explicabo veritatis? Dignissimos, id.
                                    </p>
                                    <p className="mb-3">
                                        Obcaecati accusamus, quaerat nam quo optio reiciendis harum reprehenderit omnis
                                        tempora adipisci in iste aperiam unde, repellendus possimus explicabo veritatis?
                                        Dignissimos, id.
                                    </p>
                                    <p className="mb-0">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est.
                                        kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus
                                        labore..</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Reviews & Ratings
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        <div
                                            className="xxl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-spn-12 sm:col-span-12 col-span-12">
                                            <div className="flex items-top mb-3">
                                                <div className="me-2 leading-none">
                                                    <i className="ri-star-fill text-[1.5625rem] text-warning"></i>
                                                </div>
                                                <div className="leading-none">
                                                    <p className="mb-1 font-semibold">4.2 out of 5</p>
                                                    <p
                                                        className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.6875rem]">
                                                        Based on (23,435) ratings</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <div className="text-[0.75rem] me-2 font-semibold flex gap-1 items-center">5
                                                    <i className="ri-star-fill text-[0.625rem]"></i></div>
                                                <div className="progress progress-xs flex-grow">
                                                    <div className="progress-bar !bg-success" role="progressbar"
                                                        style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0}
                                                        aria-valuemax={100}>
                                                    </div>
                                                </div>
                                                <div className="text-textmuted dark:text-textmuted/50 ms-2 text-[0.75rem]">
                                                    (10,893)</div>
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <div className="text-[0.75rem] me-2 font-semibold flex gap-1 items-center">4
                                                    <i className="ri-star-fill text-[0.625rem]"></i></div>
                                                <div className="progress progress-xs flex-grow">
                                                    <div className="progress-bar !bg-success" role="progressbar"
                                                        style={{ width: '22%' }} aria-valuenow={22} aria-valuemin={0}
                                                        aria-valuemax={100}>
                                                    </div>
                                                </div>
                                                <div className="text-textmuted dark:text-textmuted/50 ms-2 text-[0.75rem]">
                                                    (6,534)</div>
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <div className="text-[0.75rem] me-2 font-semibold flex gap-1 items-center">3
                                                    <i className="ri-star-fill text-[0.625rem]"></i></div>
                                                <div className="progress progress-xs flex-grow">
                                                    <div className="progress-bar !bg-success" role="progressbar"
                                                        style={{ width: '8%' }} aria-valuenow={8} aria-valuemin={0}
                                                        aria-valuemax={100}>
                                                    </div>
                                                </div>
                                                <div className="text-textmuted dark:text-textmuted/50 ms-2 text-[0.75rem]">
                                                    (4,342)</div>
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <div className="text-[0.75rem] me-2 font-semibold flex gap-1 items-center">2
                                                    <i className="ri-star-fill text-[0.625rem]"></i></div>
                                                <div className="progress progress-xs flex-grow">
                                                    <div className="progress-bar !bg-warning" role="progressbar"
                                                        style={{ width: '9%' }} aria-valuenow={9} aria-valuemin={0}
                                                        aria-valuemax={100}>
                                                    </div>
                                                </div>
                                                <div className="text-textmuted dark:text-textmuted/50 ms-2 text-[0.75rem]">
                                                    (1,432)</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-[0.75rem] me-2 font-semibold flex gap-1 items-center">1
                                                    <i className="ri-star-fill text-[0.625rem]"></i></div>
                                                <div className="progress progress-xs flex-grow">
                                                    <div className="progress-bar !bg-danger" role="progressbar"
                                                        style={{ width: '6%' }} aria-valuenow={6} aria-valuemin={0}
                                                        aria-valuemax={100}>
                                                    </div>
                                                </div>
                                                <div className="text-textmuted dark:text-textmuted/50 ms-2 text-[0.75rem]">
                                                    (1,453)</div>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-8 xl:col-span-12 lg:col-span-12 md:col-spn-12 sm:col-span-12 col-span-12 xxl:mt-0 mt-3">
                                            <SpkSwiperJs slides={ProductSwiperComponent} spaceBetween={30} centeredSlides={true} autoplay={true} className="mySwiper swiper swiper-reviews" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="flex items-center flex-wrap gap-2">
                                        <p className="text-[0.9375rem] mb-0 me-4 font-semibold">Share :</p>
                                        <div className="btn-list mb-0">
                                            <button
                                                className="ti-btn ti-btn-sm ti-btn-icon me-2 ti-btn-soft-success btn-wave md:mb-0">
                                                <i className="ri-whatsapp-line"></i>
                                            </button>
                                            <button
                                                className="ti-btn ti-btn-sm ti-btn-icon me-2 ti-btn-soft-warning btn-wave md:mb-0">
                                                <i className="ri-instagram-line"></i>
                                            </button>
                                            <button
                                                className="ti-btn ti-btn-sm ti-btn-icon me-2 ti-btn-soft-secondary btn-wave md:mb-0">
                                                <i className="ri-twitter-x-line"></i>
                                            </button>
                                            <button
                                                className="ti-btn ti-btn-sm ti-btn-icon me-2 ti-btn-soft-danger btn-wave md:mb-0">
                                                <i className="ri-youtube-line"></i>
                                            </button>
                                            <button
                                                className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-info btn-wave md:mb-0">
                                                <i className="ri-facebook-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-header">
                                    <div className="box-title">
                                        Similar Products
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full">
                                            {SimilarProducts.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Link scroll={false} href="#!">
                                                            <div className="flex items-top">
                                                                <div className="similar-products-image me-2 relative">
                                                                    <Image fill src={product.image} alt={product.name} />
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <p className="mb-1 text-[0.875rem] font-semibold similar-product-name text-truncate">
                                                                        {product.name}
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <span className="badge bg-success text-white">
                                                                            {product.rating}
                                                                            <i className="ri-star-s-fill ms-1"></i>
                                                                        </span>
                                                                        <span className="text-textmuted dark:text-textmuted/50 ms-1">
                                                                            ({product.reviews})
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="mb-0 text-[1rem] font-semibold">
                                                                        ${product.price}
                                                                    </p>
                                                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">
                                                                        <s>${product.originalPrice}</s>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="grid border-b-0">
                                                    <button className="ti-btn ti-btn-soft-primary">
                                                        View All Products
                                                    </button>
                                                </td>
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
            <section className="section-sm">
                <div className="container">
                    <h5 className="heading-title">Related Products</h5>
                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    <SpkSwiperJs slides={TestimonialsSwiperComponent} slidesPerView={4} spaceBetween={30} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper swiper-related-products" />
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}

            {/* <!-- Start:: Section-3 --> */}
            <section className="section-sm">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3 custom-card">
                                <div className="box-body">
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-info text-white"><i
                                                className="ti ti-truck-delivery text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="mb-0 font-semibold text-[1rem] text-info">Free Delivery</p>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                                                Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3 custom-card">
                                <div className="box-body">
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-warning text-white"><i
                                                className="ti ti-tags text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="mb-0 font-semibold text-[1rem] text-warning">Great Deals & Offers
                                            </p>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                                                Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <div className="box card-style-3 custom-card ">
                                <div className="box-body">
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-fit">
                                            <span className="avatar bg-danger text-white"><i
                                                className="ti ti-arrow-back-up text-[1.25rem]"></i></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="mb-0 font-semibold text-[1rem] text-danger">Easy Returns</p>
                                            <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                                                Consetetur eirmod dolor stet justo gubergren ea et lorem sadipscing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-3 --> */}

            {/* <!-- Start:: Section-4 --> */}
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
                                <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                App Store
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-4 --></div> */}
        </Fragment>
    );
};

export default ProductDetails;