"use client"
import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions";
import SpkLandingBlog from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-landing-blog";
import SpkStepsCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-steps-card";
import SpkBrowserDomain from "@/shared/@spk-reusable-components/apps/spk-browser-domain";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import SwiperComponent, { Landingaccordion, Landingaccordion1 } from "@/shared/data/apps/classifieds/landingdata";
import { AuctionSwiper, DomainLandingData, DomainSwiper, ReviewSwiper, Worldicon, blogCards, steps } from "@/shared/data/apps/domain/landingdata";
import { RelatedDomains } from "@/shared/data/apps/domain/single-landing-data";

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const Landing = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize with -1 for no item expanded

    const toggleDropdown = (index: any) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand the clicked item
        }
    };

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

            <Seo title={"Domain-Landing"} />

            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner ad-search-container !bg-primary !z-[0]">
                <section className="section-sm company-banner">
                    <div className="container main-banner-container !p-0 lg:!mt-0 !mt-[3rem]">
                        <div className="grid grid-cols-12 gap-x-6 justify-between items-center">
                            <div className="xxl:col-span-8 xl:col-span-7 lg:col-span-7 md:col-span-6 col-span-12">
                                <div className="grid grid-cols-12">
                                    <div className="xl:col-span-10 col-span-12">
                                        <div className="text-fixed-white">
                                            <h6
                                                className="landing-banner-heading mb-4 text-white dark:text-white !text-[1.25rem] lg:!text-[2.5rem] !font-medium">
                                                To <span className="best-services">Buy & Sell</span> Domains You Always
                                                Wanted!</h6>
                                            <p className="text-[0.9375rem] mb-6 opacity-80 text-white">You can buy and sell
                                                right domain we have 1000 of domains here. Est amet sit vero sanctus
                                                labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea.</p>
                                            <div className="input-group inline-flex gap-0 group-search xl:flex">
                                                <div className="category-dropdown-wrapper ti-dropdown hs-dropdown">
                                                    <Link scroll={false} href="#!" onClick={() => setIsOpen(!isOpen)}
                                                        className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0">
                                                        <i className="ri-function-line me-2 text-primary"></i>Browse<i
                                                            className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                    </Link>
                                                    <ul className="categories-dropdowns">
                                                        <li className="category-dropdown">
                                                            <ul className="main-dropdown" style={{ display: isOpen ? 'block' : 'none' }} id="dropdown-toggle">
                                                                <li onClick={() => toggleDropdown(0)}>
                                                                    <div className={`categories-dropdowns__item ${expandedIndex === 0 ? 'is-expanded' : ''}`}>
                                                                        <span className="me-2"><i className="ri-window-line"></i></span>Websites
                                                                        <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                                    </div>
                                                                    <ul className="category-menu">
                                                                        <li><Link scroll={false} href="#!" className="category-item">Ecommerce</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Marketplace</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Services</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Realestate</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li onClick={() => toggleDropdown(1)}>
                                                                    <div className={`categories-dropdowns__item ${expandedIndex === 1 ? 'is-expanded' : ''}`}>
                                                                        <span className="me-2"><i className="ri-android-line"></i></span>
                                                                        Apps
                                                                        <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                                    </div>
                                                                    <ul className="category-menu">
                                                                        <li><Link scroll={false} href="#!" className="category-item">All Apps</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Android Apps</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">IOS Apps</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li onClick={() => toggleDropdown(2)}>
                                                                    <div className={`categories-dropdowns__item ${expandedIndex === 2 ? 'is-expanded' : ''}`}>
                                                                        <span className="me-2"><i className="ri-server-line"></i></span>
                                                                        Domains
                                                                        <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                                    </div>
                                                                    <ul className="category-menu">
                                                                        <li><Link scroll={false} href="#!" className="category-item">All Domains</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">.com</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">.org</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">.net</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">.in</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li onClick={() => toggleDropdown(3)}>
                                                                    <div className={`categories-dropdowns__item ${expandedIndex === 3 ? 'is-expanded' : ''}`}>
                                                                        <span className="me-2"><i className="ri-shopping-cart-line"></i></span>
                                                                        Ecommerce
                                                                        <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                                    </div>
                                                                    <ul className="category-menu">
                                                                        <li><Link scroll={false} href="#!" className="category-item">Land</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Flat</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Houses</Link></li>
                                                                        <li><Link scroll={false} href="#!" className="category-item">Shops</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="custom-form-group flex-grow">
                                                    <input type="text"
                                                        className="form-control shadow-none border-0 !border-s lg:rtl:!rounded-tl-md lg:rtl:!rounded-bl-md lg:rtl:!rounded-tr-none lg:rtl:!rounded-br-none lg:!rounded-tl-none lg:!rounded-bl-none"
                                                        id="input-placeholder" placeholder="Search Demain..." />
                                                    <div className="custom-form-btn">
                                                        <button className="ti-btn ti-btn-primary ti-btn-icon"
                                                            type="button"><i className="bi bi-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:col-span-1 col-span-12"></div>
                                </div>
                            </div>
                            <div
                                className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-5 md:block hidden ms-auto relative">
                                <Image fill src="../../assets/images/domains/2.png" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section -z-[1]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2">
                                <div className="heading-section !text-start">
                                    <h6 className="heading-title">Domains For Sale</h6>
                                    <div className="heading-description">Browse the domains here depends on your
                                        requirement.</div>
                                </div>
                                <div className="min-w-fit">
                                    <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-primary">
                                        View All <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title flex-grow">
                                        Websites
                                    </div>
                                    <div className="min-w-fit">
                                        <Link scroll={false} href="#!" className="text-primary font-semibold">View<i className="ti ti-arrow-right ms-1"></i></Link>
                                    </div>
                                </div>
                                <div className="box-body !pb-0">
                                    <SpkSwiperJs slides={ReviewSwiper} direction={'vertical'} loop={true}
                                        autoplay={{
                                            delay: 1000,
                                            disableOnInteraction: false,
                                        }} spaceBetween={0} slidesPerView={4} className="swiper swiper-vertical website-swiper swiper-domains" />
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title flex-grow">
                                        New Domains
                                    </div>
                                    <div className="min-w-fit">
                                        <Link scroll={false} href="#!" className="text-primary font-semibold">View<i className="ti ti-arrow-right ms-1"></i></Link>
                                    </div>
                                </div>
                                <div className="box-body pb-0">
                                    <SpkSwiperJs slides={DomainSwiper} direction={'vertical'} loop={true}
                                        autoplay={{
                                            delay: 1000,
                                            disableOnInteraction: false,
                                        }} spaceBetween={0} slidesPerView={4} className="swiper swiper-vertical domain-swiper swiper-domains" />
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title flex-grow">
                                        Auction Ending Soon
                                    </div>
                                    <div className="min-w-fit">
                                        <Link scroll={false} href="#!" className="text-primary font-semibold">View<i className="ti ti-arrow-right ms-1"></i></Link>
                                    </div>
                                </div>
                                <div className="box-body pb-0">
                                    <SpkSwiperJs slides={AuctionSwiper} direction={'vertical'} loop={true}
                                        autoplay={{
                                            delay: 1000,
                                            disableOnInteraction: false,
                                        }} spaceBetween={0} slidesPerView={4} className="swiper swiper-vertical auction-swiper swiper-domains" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-1 --> */}

            {/* <!-- Start:: Section-2 --> */}
            <section className="section bg-white dark:bg-bodybg">
                <div className="container text-center">
                    <div className="heading-section mb-4">
                        <h6 className="!text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Steps</span></h6>
                        <div className="heading-title">How it works ?</div>
                        <div className="heading-description">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6 text-start">
                        {steps.map((card: any, index: any) => (
                            <div key={index} className="col-span-12 lg:col-span-4">
                                <SpkStepsCard card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}

            {/* <!-- Start:: Section-3 --> */}
            <section className="!py-[3rem] bg-banner">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 justify-center">
                        <div className="lg:col-span-1 col-span-12"></div>
                        <div className="lg:col-span-10 col-span-12">
                            <div className="grid grid-cols-12 gap-6 text-center">
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-fixed-white">45K+</h3>
                                        <h6 className="mb-0 text-fixed-white">Domains Listings</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-fixed-white">175K+</h3>
                                        <h6 className="mb-0 text-fixed-white">Monthly Searches</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-fixed-white">300K+</h3>
                                        <h6 className="mb-0 text-fixed-white">Monthly Advertises</h6>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div>
                                        <h3 className="mb-1 font-semibold text-fixed-white">450M+</h3>
                                        <h6 className="mb-0 text-fixed-white">Sellers Contacted</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-12"></div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-3 --> */}

            {/* <!-- Start:: Section-4 --> */}
            <section className="section">
                <div className="container">
                    <div className="col-xl-12">
                        <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                            <div className="heading-section !text-start">
                                <h6 className="heading-title">Browse Domains</h6>
                                <div className="heading-description">View the all Domains</div>
                            </div>
                            <div className="min-w-fit">
                                {/* <!-- Nav tabs --> */}
                                <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse" role="tablist">
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary active"
                                        href="#!" id="tab-1" data-hs-tab="#tab1" aria-controls="tab1">
                                        All
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                        href="#!" id="tab-2" data-hs-tab="#tab2" aria-controls="tab2">
                                        Websites
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                        href="#!" id="tab-3" data-hs-tab="#tab3" aria-controls="tab3">
                                        Domains
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane !border-0 !p-0 show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
                            <div className="grid grid-cols-12 gap-x-6">
                                {DomainLandingData.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-6 col-span-12">
                                        <SpkBrowserDomain card={card} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane !border-0 !p-0 hidden" id="tab2" role="tabpanel" aria-labelledby="tab-2">
                            <div className="grid grid-cols-12 gap-x-6">
                                {DomainLandingData.filter(item => item.badge === 'Website').map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-6 col-span-12">
                                        <SpkBrowserDomain card={card} />
                                    </div>
                                ))}
                                <div className="lg:col-span-6 col-span-12">
                                    <SpkBrowserDomain card={{ image: "../../assets/images/realestate/properties/3.png", badge: "Website", title: "spotechtechnical.com", loction: " Kondapur, Hyderabad", days: "25", profit: "$56.00", industry: "Business", age: "10", bids: "9" }} />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !border-0 !p-0 hidden" id="tab3" role="tabpanel" aria-labelledby="tab-3">
                            <div className="grid grid-cols-12 gap-x-6">
                                {DomainLandingData.filter(item => item.badge === 'Domain').map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-6 col-span-12">
                                        <SpkBrowserDomain card={card} />
                                    </div>
                                ))}
                                <div className="lg:col-span-6 col-span-12">
                                    <SpkBrowserDomain card={{ icon: <Worldicon color="warning" />, bgColor: "danger", badge: "Domain", title: "dwaynestel.net", loction: "Spoesh, Pune", days: "13 ", profit: "NA", industry: " Corporate", age: "07", bids: "32" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-4 --> */}

            {/* <!-- Start:: Section-5 --> */}
            <section className="section bg-banner-2 text-white">
                <div className="container">
                    <div className="grid grid-cols-12 justify-content-center">
                        <div className="lg:col-span-1 col-span-12 text-center"></div>
                        <div className="lg:col-span-10 col-span-12 text-center">
                            <div className="mb-4">
                                <h2 className="font-semibold mb-2 text-fixed-white">&#128073; Get 20% Off Discount Coupon
                                </h2>
                                <h6 className="text-fixed-white">By Subscribe our Newsletter</h6>
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-12 text-center"></div>
                        <div className="lg:col-span-4 col-span-12 text-center"></div>
                        <div className="lg:col-span-4 col-span-12 text-center">
                            <div className="custom-form-group">
                                <input type="text" className="form-control form-control-lg !rounded-full shadow-sm" placeholder="Enter Your Email.." aria-label="Recipient's username" />
                                <button className="ti-btn ti-btn-danger !py-1 !bg-danger !border-0 custom-form-btn !rounded-full" type="button">Subscribe</button>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12 text-center"></div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-5 --> */}

            {/* <!-- Start:: Section-6 --> */}
            <section className="section bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12 mb-4">
                            <div className="flex justify-between items-baseline">
                                <div className="heading-section !text-start">
                                    <h6 className="heading-title">Newest Arrivals</h6>
                                    <div className="heading-description">View the Newest domains</div>
                                </div>
                                <div className="min-w-fit">
                                    <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.875rem]">
                                        <u>View All</u><i className="fe fe-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {RelatedDomains.map((idx) => (
                            <div className="xl:col-span-4 col-span-12" key={idx.id}>
                                <div className="box">
                                    <div className="box-body p-3">
                                        <div className="flex gap-3">
                                            <div className={`avatar avatar-lg bg-${idx.bgColor}/[0.15] svg-${idx.bgColor}`}>
                                                {idx.src ? (
                                                    <Image fill src={idx.src} alt="img" className="img-fluid w-full rounded-sm" />
                                                ) : (
                                                    idx.icon
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="mb-3">
                                                    <h6 className="font-semibold mb-1 text-[1.125rem]">{idx.title}</h6>
                                                    <div className="flex items-baseline text-[0.6875rem]">
                                                        <div className="text-[0.6875rem] text-muted me-2">
                                                            <span className=""><i className="bi bi-geo-alt me-1"></i> USA</span>
                                                            <span> ,</span>
                                                            <span className=""> 25 Feb 2024</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <h6 className="font-semibold mb-0 flex items-center gap-2">$31.00 <span
                                                        className="badge bg-danger/[0.15] text-danger">28 Bids</span></h6>
                                                    <div className="min-w-fit">
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-primary border-0">Bid
                                                            Now</Link>
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
            {/* <!-- End:: Section-6 --> */}

            {/* <!-- Start:: Section-7 --> */}
            <section className="section bg-light">
                <div className="container">
                    <div className="heading-section mb-4">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Our
                            Blog</span></p>
                        <div className="heading-title">Latest News Updates & Blogs</div>
                        <div className="heading-description">Sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua</div>
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        {blogCards.map((card: any, index: any) => (
                            <div key={index} className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 col-span-12">
                                <SpkLandingBlog card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-7 --> */}

            {/* <!-- Start:: Section-8 --> */}
            <section className="bg-banner">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 items-center">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-5 lg:block hidden text-center mt-4">
                            <Image fill src="../../assets/images/ecommerce/png/17.png" alt="" />
                        </div>
                        <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-7 col-span-12">
                            <div className="my-6">
                                <h2 className="font-semibold mb-3 text-white">Buy or Sell your domain in a few seconds
                                    <Link scroll={false} href="#!" className="text-secondary text-decoration-line"> <u> Signup</u>
                                    </Link> now..
                                </h2>
                                <p className="mb-4">Est amet sit vero sanctus labore no sed nonumy. Sit ipsum sanctus ea
                                    magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum.Est amet sit vero
                                    sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.. </p>
                                <div className="btn-list">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-light ti-btn-lg"><i
                                        className="ti ti-search"></i> Browse Domains</Link>
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-danger ti-btn-lg"><i
                                        className="ti ti-upload"></i> Sell Domains</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-8 --> */}

            {/* <!-- Start:: Section-9 --> */}
            <section className="section bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="heading-section mb-4">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">FAQ'S</span></p>
                        <h6 className="heading-title">Frequently Asked Questions?</h6>
                        <div className="heading-description">Browse Through The Most Frequently Asked Questions</div>
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                                id="accordionFAQ1">
                                <SpkAccordions items={Landingaccordion} key={1} Titletext="before" SvgIcon={true} Toggleclass='hs-accordion-active:!text-white hs-accordion-active:!border-primary hs-accordion-active:!rounded-tl-sm hs-accordion-active:!rounded-tr-sm hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-white dark:text-gray-200 dark:hover:text-white/80' />


                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                                id="accordionFAQ2">
                                <SpkAccordions items={Landingaccordion1} key={1} Titletext="before" SvgIcon={true} Toggleclass='hs-accordion-active:!text-white hs-accordion-active:!border-primary hs-accordion-active:!rounded-tl-sm hs-accordion-active:!rounded-tr-sm hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-white dark:text-gray-200 dark:hover:text-white/80' />


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-9 --> */}

            {/* <!-- Start:: Section-10 --> */}
            <section className="section landing-testimonials">
                <div className="container text-center">
                    <div className="heading-section mb-4">
                        <h6 className="!text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Testimonials</span></h6>
                        <div className="heading-title">We never failed to reach expectations</div>
                        <div className="heading-description">Some of the reviews our clients gave which brings motivation to
                            work for future projects</div>
                    </div>
                    <SpkSwiperJs slides={SwiperComponent} pagination={{ clickable: true, }} slidesPerView={3} spaceBetween={30} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper pagination-dynamic swiper-pointer-events  text-start" />
                </div>
            </section>
            {/* <!-- End:: Section-10 --> */}

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

export default Landing;