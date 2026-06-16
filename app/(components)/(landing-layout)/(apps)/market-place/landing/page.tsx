"use client"
import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions";
import SpkLandingBlog from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-landing-blog";
import SpkMarketplaceArrival from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-marketplace-arrival";
import SpkMarketplaceProduct from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-marketplace-product";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { blogCards } from "@/shared/data/apps/classifieds/landingdata";
import { RelatedProducts } from "@/shared/data/apps/market-place/details-data";
import MarketSwiperComponent, { MarcketProductsData, RelatedProducts1, RelatedProducts2, cards, deals } from "@/shared/data/apps/market-place/landingdata";
import { Landingaccordion, Landingaccordion1 } from "@/shared/data/apps/real-estate/detailsdata";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Landing = () => {
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

            <Seo title={"Marketplace-Landing"} />

            {/* <!-- Start:: Landing Banner --> */}
            <div className="">
                <section className="section marketplace-banner">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 ">
                            <div className="xl:col-span-2 col-span-12"></div>
                            <div className="xl:col-span-8 col-span-12">
                                <div className="text-white">
                                    <div className="text-center">
                                        <p className="landing-banner-heading mb-4 text-white sm:text-[3rem] text-[1.5rem] font-semibold">Best
                                            Digital Marketplace</p>
                                        <p className="text-[0.9375rem] mb-[3rem] text-white">Sed do eiusmod tempor
                                            incididunt ut labore
                                            et dolore magna aliqua</p>
                                    </div>
                                    <div className="mb-4 custom-form-group">
                                        <input type="text"
                                            className="form-control form-control-lg !py-3 shadow-sm border-0 lh-lg"
                                            placeholder="Search Here.." aria-label="Recipient's username" />
                                        <div className="custom-form-btn">
                                            <button className="ti-btn ti-btn-primary !border-0 !m-0" type="button"><i
                                                className="bi bi-search me-2"></i> Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-2 col-span-12"></div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2">
                                <div className="heading-section !text-start">
                                    <div className="heading-title">Top Categories</div>
                                    <div className="heading-description">Browse Through The Top Categories</div>
                                </div>
                                <div className="min-w-fit">
                                    <Link href="/market-place/search" className="ti-btn btn-wave ti-btn-primary !m-0">
                                        View All Categories <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {cards.map((card, index) => (
                            <div key={index} className="sm:col-span-6 col-span-12 md:col-span-6 lg:col-span-3 xxl:col-span-2">
                                <div className={`link-tag link-tag-${card.cardcolor} !rounded-full`}>
                                    <Link href="/market-place/search" className="stretched-link"></Link>
                                    <div className="flex items-center gap-2">
                                        <div className="min-w-fit">
                                            <span className="avatar avatar-md !rounded-full link-tag-icon">
                                                {card.svg}
                                            </span>
                                        </div>
                                        <div className="flex-grow link-tag-body">
                                            <p className="mb-0 truncate w-[75%]">{card.title}</p>
                                            <span className="text-[0.6875rem] font-normal">93 items</span>
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
            <section className="section bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12 mb-4">
                            <div className="flex justify-between items-baseline">
                                <div className="heading-section !text-start">
                                    <div className="heading-title">Today Deals</div>
                                    <div className="heading-description">Grab the today offers</div>
                                </div>
                                <div className="min-w-fit">
                                    <Link href="/market-place/search"
                                        className="text-primary font-semibold text-[0.875rem]">
                                        <u>More Deals</u><i className="fe fe-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {deals.map((deal) => (
                            <div key={deal.id} className="md:col-span-12 lg:col-span-4 col-span-12">
                                <div className={`box card-style-4 card-style-4-${deal.buttonClass}`}>
                                    <div className="box-body">
                                        <div className="flex items-start mb-3">
                                            <div className="flex-grow">
                                                <span className="badge bg-danger text-white mb-2">{deal.discount}</span>
                                                <h5 className="">Save <span className="font-semibold">{deal.savings}</span></h5>
                                            </div>
                                            <div className="min-w-fit">
                                                <Link href="/market-place/search"
                                                    className={`ti-btn ti-btn-sm ti-btn-${deal.buttonClass} !m-0`}>
                                                    Explore <i className="ti ti-arrow-right ms-1"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="deals-bundle">
                                            <span className="icon">
                                                <Image fill src={deal.logo} alt="" className="img-fluid" />
                                            </span>
                                            <h4 className="font-semibold mb-4 text-white">{deal.title}</h4>
                                            <div className="grid grid-cols-12 sm:gap-x-2 xl:gap-6 text-center gap-y-2">
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">{deal.productsCount}</h5>
                                                        <h6 className="mb-0 text-white">Products</h6>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="bg-white/[0.15] backdrop-blur p-2 rounded-md shadow-sm">
                                                        <h5 className="mb-1 font-semibold text-white">{deal.widgetsCount}</h5>
                                                        <h6 className="mb-0 text-white">Widgets</h6>
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
            {/* <!-- End:: Section-2 --> */}

            {/* <!-- Start:: Section-3 --> */}
            <section className="section">
                <div className="container">
                    <div className="heading-section mb-4">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Templates</span></p>
                        <div className="heading-title">Popular Templates</div>
                        <div className="heading-description">Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                            amet.</div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        {RelatedProducts.slice(0, 8).map((card: any, index: any) => (
                            <div key={index} className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                <SpkMarketplaceProduct card={card} />
                            </div>
                        ))}


                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-3 --> */}

            {/* <!-- Start:: Section-4 --> */}
            <section className="section bg-banner-2 text-white">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-1 col-span-12 text-center"></div>
                        <div className="lg:col-span-10 col-span-12 text-center">
                            <div className="mb-4">
                                <h2 className="font-medium mb-2 text-white">&#128073; Get 20% Off Discount Coupon</h2>
                                <h6 className="text-white">By Subscribe our Newsletter</h6>
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-12 text-center"></div>
                        <div className="lg:col-span-4 col-span-12 text-center"></div>
                        <div className="lg:col-span-4 col-span-12 text-center">
                            <div className="custom-form-group">
                                <input type="text" className="form-control form-control-lg !py-3 !rounded-full"
                                    placeholder="Enter Your Email.." aria-label="Recipient's username" />
                                <button className="ti-btn ti-btn-danger !bg-danger !border-0 custom-form-btn !rounded-full"
                                    type="button">Subscribe</button>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12 text-center"></div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-4 --> */}

            {/* <!-- Start:: Section-5 --> */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12 mb-4">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                                <div className="heading-section !text-start">
                                    <div className="heading-title">Newest Arrivals</div>
                                    <div className="heading-description">View the Newest products</div>
                                </div>
                                <div className="min-w-fit">
                                    <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.875rem]">
                                        <u>View All</u><i className="fe fe-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {MarcketProductsData.map((card: any, index: any) => (
                            <div key={index} className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                <SpkMarketplaceArrival card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-5 --> */}

            {/* <!-- Start:: Section-6 --> */}
            <section className="bg-banner-2 text-white">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 items-center">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-5 lg:block hidden text-center mt-4 relative">
                            <Image fill src="../../assets/images/ecommerce/png/17.png" alt="" />
                        </div>
                        <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-7 col-span-12">
                            <div className="my-6">
                                <h2 className="font-semibold mb-4 text-white">Download 5 Free templates by creating an
                                    account.</h2>
                                <h6 className="mb-6 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit
                                    aspernatur illum vel sunt libero voluptatum repudiandae veniam maxime tenetur. </h6>
                                <Link scroll={false} href="#!" className="ti-btn ti-btn-light ti-btn-lg">Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-6 --> */}

            {/* <!-- Start:: Section-7 --> */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12 mb-4">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                                <div className="heading-section text-start">
                                    <div className="heading-title">All Products</div>
                                    <div className="heading-description">View the Newest products</div>
                                </div>
                                <div className="min-w-fit">
                                    {/* <!-- Nav tabs --> */}
                                    <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse flex-wrap" role="tablist">
                                        <Link scroll={false}
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary active"
                                            href="#!" id="tab-1" data-hs-tab="#tab1"
                                            aria-controls="tab1"> All </Link>
                                        <Link scroll={false}
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                            href="#!" id="tab-2" data-hs-tab="#tab2"
                                            aria-controls="tab2"> Top Selling </Link>
                                        <Link scroll={false}
                                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                            href="#!" id="tab-3" data-hs-tab="#tab3"
                                            aria-controls="tab3"> Trending </Link>
                                        <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                            href="#!" id="tab-4" data-hs-tab="#tab4"
                                            aria-controls="tab4"> Recently Added </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            {/* <!-- Tab panes --> */}
                            <div className="tab-content all-products">
                                <div className="tab-pane active" id="tab1" aria-labelledby="tab-1">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        {RelatedProducts1.map((card: any, index: any) => (
                                            <div key={index} className="lg:col-span-3 col-span-12">
                                                <SpkMarketplaceProduct card={card} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tab-pane hidden" id="tab2" aria-labelledby="tab-2">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        {RelatedProducts.slice(0, 8).map((card: any, index: any) => (
                                            <div key={index} className="lg:col-span-3 col-span-12">
                                                <SpkMarketplaceProduct card={card} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tab-pane hidden" id="tab3" aria-labelledby="tab-3">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        {RelatedProducts2.map((card: any, index: any) => (
                                            <div key={index} className="lg:col-span-3 col-span-12">
                                                <SpkMarketplaceProduct card={card} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tab-pane hidden" id="tab4" aria-labelledby="tab-4">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        {RelatedProducts.slice(0, 8).map((card: any, index: any) => (
                                            <div key={index} className="lg:col-span-3 col-span-12">
                                                <SpkMarketplaceProduct card={card} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-7 --> */}

            {/* <!-- Start:: Section-8 --> */}
            <section className="!py-[3rem] bg-banner">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-1 col-span-12"></div>
                        <div className="lg:col-span-10 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6 text-center gap-y-4">
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-white">45K+</h3>
                                        <h6 className="mb-0 text-white">All Products</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-white">175K+</h3>
                                        <h6 className="mb-0 text-white">Locations</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-white">300K+</h3>
                                        <h6 className="mb-0 text-white">Registered Users</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-white">450M+</h3>
                                        <h6 className="mb-0 text-white">Premium Products</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-12"></div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-8 --> */}

            {/* <!-- Start:: Section-9 --> */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 mb-4 justify-center text-center">
                        <div className="xl:col-span-12 col-span-12">
                            <p className="text-[0.75rem] font-semibold mb-1"><span
                                className="landing-section-heading text-gradient">Our Blog</span></p>
                            <div className="heading-title">Latest News Updates & Blogs</div>
                        </div>
                        <div className="xl:col-span-1 col-span-12"></div>
                        <div className="xl:col-span-10 col-span-12">
                            <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                        <div className="xl:col-span-1 col-span-12"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        {blogCards.map((card: any, index: any) => (
                            <div key={index} className="lg:col-span-4 col-span-12">
                                <SpkLandingBlog card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-9 --> */}

            {/* <!-- Start:: Section-10 --> */}
            <section className="section bg-banner">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                        <div className="lg:col-span-9 col-span-12">
                            <h2 className="font-semibold text-white">Create your free account today!</h2>
                            <p className="mb-0 opacity-90">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit
                                ipsum
                                sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et
                                kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore..
                            </p>
                        </div>
                        <div className="lg:col-span-3 col-span-12 lg:text-end lg:my-auto">
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger">Signup Now</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-10 --> */}

            {/* <!-- Start:: Section-11 --> */}
            <section className="section bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="heading-section mb-4">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">FAQ'S</span></p>
                        <div className="heading-title">Frequently Asked Questions?</div>
                        <div className="heading-description">Browse Through The Most Frequently Asked Questions</div>
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                                id="accordionFAQ1">
                                <SpkAccordions items={Landingaccordion} key={1} Titletext="before" SvgIcon={true} Toggleclass='hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-white dark:text-gray-200 dark:hover:text-white/80' />
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                                id="accordionFAQ2">
                                <SpkAccordions items={Landingaccordion1} key={1} Titletext="before" SvgIcon={true} Toggleclass='hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-white dark:text-gray-200 dark:hover:text-white/80' />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-11 --> */}

            {/* <!-- Start:: Section-12 --> */}
            <section className="section landing-testimonials">
                <div className="container text-center">
                    <p className="text-[0.75rem] font-semibold mb-1"><span
                        className="landing-section-heading text-gradient">Testimonials</span></p>
                    <div className="heading-title">We never failed to reach expectations</div>
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <p className="text-textmuted dark:text-textmuted/50 text-[0.9375rem] mb-5 font-normal">Some of
                                the reviews our clients
                                gave which brings motivation to work.</p>
                        </div>
                    </div>
                    <SpkSwiperJs slides={MarketSwiperComponent} slidesPerView={3} spaceBetween={30} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper pagination-dynamic text-start" />
                </div>
            </section>
            {/* <!-- End:: Section-12 --> */}

            {/* <!-- Start:: Section-2 --> */}
            <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
                <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                    <div className="lg:col-span-6 col-span-10 text-center">
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-white">&#128073; Browse the top template to build the
                                awesome applications
                            </h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                            magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                            sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <div className="btn-list">
                            <Link href="/market-place/search" className="ti-btn ti-btn-lg ti-btn-light me-2"><i
                                className="bi bi-search me-1"></i> Search Products</Link>
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger"><i
                                className="bi bi-send me-1"></i> Signup Now</Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}

        </Fragment>
    );
};

export default Landing;