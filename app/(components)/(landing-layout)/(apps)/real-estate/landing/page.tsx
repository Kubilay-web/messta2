"use client"
import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions";
import SpkLandingBlog from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-landing-blog";
import SpkStepsCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-steps-card";
import SpkPropertyCard from "@/shared/@spk-reusable-components/apps/reusable-realestate/spk-property-card";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import MarketSwiperComponent from "@/shared/data/apps/market-place/landingdata";
import { ForRentProperties, ForSaleProperties, Landingaccordion, Landingaccordion1, RealProperties, SimilarProperties, blogCards, deals, services, steps } from "@/shared/data/apps/real-estate/detailsdata";
import { TopCategories } from "@/shared/data/apps/real-estate/landingdata";
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
            spaceBetween: 40,
        },
    };

    return (
        <Fragment>
            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner ad-search-container !p-0">
                <section className="section realestate-banner">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xxl:col-span-1 xl:col-span-12 col-span-12"></div>
                            <div className="xxl:col-span-10 xl:col-span-12 col-span-12">
                                <div className="">
                                    <div className="text-center">
                                        <p className="landing-banner-heading mb-3 text-white !text-[2.5rem] !font-medium">
                                            Find Your Dream Property</p>
                                        <p className="text-[0.9375rem] mb-[3rem] text-white">A great platform to buy, sell
                                            and rent your properties without any agent or commissions.</p>
                                    </div>
                                    <div className="">
                                        <div className="input-group inline-flex group-search xl:flex mb-4 gap-4">
                                            <div className="category-dropdown-wrapper ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!"
                                                    className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0">
                                                    <i className="ri-function-line me-2 text-primary"></i>All Property
                                                    Type<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                </Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden !z-[1000]"
                                                    role="menu">
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Deluxe
                                                        Houses</Link>
                                                    </li>
                                                    <li><Link scroll={false} className="ti-dropdown-item"
                                                        href="#!">Apartments</Link>
                                                    </li>
                                                    <li><Link scroll={false} className="ti-dropdown-item active"
                                                        href="#!">Family House</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Modern
                                                        Villa</Link>
                                                    </li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Tiny
                                                        House</Link>
                                                    </li>
                                                    <li><Link scroll={false} className="ti-dropdown-item"
                                                        href="#!">Residential</Link>
                                                    </li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Flats</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="custom-form-group flex-grow">
                                                <input type="text"
                                                    className="form-control rounded-md  shadow-none  !border-0 border-e !border-s"
                                                    placeholder="Enter Your Keyword Here.."
                                                    aria-label="Recipient's username" />
                                            </div>
                                            <div className="custom-form-group flex-grow">
                                                <input type="text"
                                                    className="form-control rounded-md shadow-none border-0 !border-e !border-s"
                                                    id="input-placeholder" placeholder="Search by Location..." />
                                                <div className="custom-form-btn border-0">
                                                    <Link scroll={false} href="#!" className="gps-location"><i
                                                        className="ti ti-current-location"></i></Link>
                                                    <div className="ti-dropdown hs-dropdown ad-dropdown !border-s dark:border-defaultborder/10">
                                                        <Link scroll={false} href="#!"
                                                            className="ti-btn text-default btn-wave !py-3"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                            5km<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                        </Link>
                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden !z-[1000]"
                                                            role="menu">
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">0km</Link>
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">2km</Link>
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item active"
                                                                href="#!">5km</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">10km</Link>
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">20km</Link>
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">50km</Link>
                                                            </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item"
                                                                href="#!">100km</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="ti-btn ti-btn-lg ti-btn-secondary !border-0 shadow-sm search-btn !m-0"
                                                type="button"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xxl:col-span-1 xl:col-span-12 col-span-12"></div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}

            <Seo title={"Realestate-Landing"} />

            {/* <!-- Start::app-content --> */}
            <div className="main-content landing-main !px-0">
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
                                        <Link scroll={false} href="/real-estate/search" className="btn btn-wave btn-primary">
                                            View All Categories <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex ms-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {TopCategories.map((idx) => (
                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-4 sm:col-span-4 col-span-6" key={idx.id}>
                                    <Link scroll={false} href="#!">
                                        <div className="box overlay-card text-white">
                                            <Image fill src={idx.image} className="card-img" alt="..." />
                                            <div className="card-img-overlay flex flex-column p-0 over-content-bottom !top-auto">
                                                <div className="box-footer !border-t-0 !p-0">
                                                    <h6 className="font-semibold mb-0 text-white">{idx.title}</h6>
                                                    <span className="text-white">{idx.count} Properties</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
                            <div className="xl:col-span-12 col-span-12 mb-6">
                                <div className="flex justify-between items-baseline flex-wrap gap-2">
                                    <div className="heading-section !text-start">
                                        <div className="heading-title !mb-0">Today Deals</div>
                                        <div className="heading-description">Grab the today deals</div>
                                    </div>
                                    <div className="min-w-fit">
                                        <Link scroll={false} href="/real-estate/search" className="text-primary font-semibold text-[0.875rem]">
                                            <u>More Deals</u><i className="fe fe-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {deals.map((deal) => (
                                <div key={deal.id} className="md:col-span-12 lg:col-span-4 col-span-12">
                                    <div className={`box card-style-4 card-style-4-${deal.buttonClass}`}>
                                        <div className="box-body">
                                            <div className="flex items-start mb-4">
                                                <div className="flex-grow">
                                                    <span className="badge bg-danger text-white mb-2">{deal.discount}</span>
                                                    <h5 className="">Save <span className="font-semibold">{deal.savings}</span></h5>
                                                </div>
                                                <div className="min-w-fit">
                                                    <Link href="/real-estate/search"
                                                        className={`ti-btn ti-btn-sm ti-btn-${deal.buttonClass} !m-0`}>
                                                        Explore <i className="ti ti-arrow-right ms-1"></i>
                                                    </Link>

                                                </div>
                                            </div>
                                            <div className="deals-bundle deals-bundle1">
                                                <span className="icon">
                                                    <Image fill src={deal.logo} alt="" className="img-fluid" />
                                                </span>
                                                <h4 className="font-semibold mb-4 text-white">{deal.title}</h4>
                                                <div className="grid grid-cols-12 gap-x-6 text-center justify-center">
                                                    <div className="md:col-span-1 col-span-12"></div>
                                                    <div className="md:col-span-10 col-span-12">
                                                        <div className="bg-white/[0.15] backdrop-blur p-2 rounded-sm shadow-sm">

                                                            <h6 className="mb-0 font-semibold text-white">{deal.propertiesCount} Properties</h6>
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-1 col-span-12"></div>
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
                                className="landing-section-heading text-gradient">Properties</span></p>
                            <div className="heading-title">Popular Properties</div>
                            <div className="heading-description mb-4">Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                amet.</div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6">
                            {RealProperties.slice(0, 8).map((card: any, index: any) => (
                                <div key={index} className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                    <SpkPropertyCard card={card} />
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
                                    <input type="text" className="form-control !rounded-full !py-3 form-control-lg"
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
                <section className="section bg-white dark:bg-bodybg">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12 mb-4">
                                <div className="flex justify-between items-baseline flex-wrap">
                                    <div className="heading-section text-start">
                                        <div className="heading-title">Newest Arrivals</div>
                                        <div className="heading-description">View the Newest Properties</div>
                                    </div>
                                    <div className="min-w-fit">
                                        <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.875rem]">
                                            <u>View All</u><i className="fe fe-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {SimilarProperties.map((idx) => (
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12" key={idx.id}>
                                    <div className="box">
                                        <div className="box-body !p-4">
                                            <div className="grid grid-cols-12 xl:gap-x-6">
                                                <div className="xl:col-span-4 col-span-12">
                                                    <div className="img-box-1 custom-img bg-light border border-defaultborder dark:border-defaultborder/10 rounded-md">
                                                        <Link className="relative" scroll={false} href="#!">
                                                            <Image fill src={idx.image} alt="img" className="img-fluid w-full rounded-md" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-8 col-span-12 my-auto">
                                                    <div className="mb-3">
                                                        <h6 className="font-semibold mb-1"><Link scroll={false} href="#!">{idx.title}</Link></h6>
                                                        <div className="flex items-baseline text-[0.6875rem] flex-wrap gap-2">
                                                            <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50">
                                                                <span className=""><i className="bi bi-geo-alt me-1"></i>{idx.location}</span>
                                                                <span>,</span>
                                                                <span className="">{idx.date}</span>
                                                            </div>
                                                            <span className="text-danger">( {idx.type} )</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <h5 className="font-semibold mb-0">{idx.price}</h5>
                                                        <div className="min-w-fit">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary border-0"><i className="ti ti-phone me-1 inline-block"></i>Contact</Link>
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
                {/* <!-- End:: Section-5 --> */}

                {/* <!-- Start:: Section-6 --> */}
                <section className="section bg-light">
                    <div className="container text-center">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Steps</span></p>
                        <div className="heading-title">How it works ?</div>
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-textmuted dark:text-textmuted/50 text-[0.9375rem] mb-[3rem] font-normal">Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua</p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6 text-start">
                            {steps.map((card: any, index: any) => (
                                <div key={index} className="col-span-12 md:col-span-4">
                                    <SpkStepsCard card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-6 --> */}

                {/* <!-- Start:: Section-7 --> */}
                <section className="section bg-primary">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 justify-center text-center mb-4 text-white">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <h3 className="font-semibold mb-2 text-white">Explore our services</h3>
                                <p className="text-white mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6">
                            {services.map((idx) => (
                                <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12" key={idx.id}>
                                    <div className="box feature-style">
                                        <div className="box-body">
                                            <Link scroll={false} href="#!" className="open-link"></Link>
                                            <div className="feature-style-icon bg-primary/[0.15]">
                                                <span className="svg-primary">
                                                    {idx.SvgIcon}
                                                </span>
                                            </div>
                                            <h5 className="mb-1 font-semibold"> {idx.title}</h5>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-4">Neque porro quisquam est, qui dolorem ipsum.</p>
                                            <Link scroll={false} className="text-primary font-semibold" href="#!">Explore Now<i
                                                className="ri-arrow-right-s-line align-middle rtl-rotate"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-7 --> */}

                {/* <!-- Start:: Section-8 --> */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12 mb-4">
                                <div className="flex justify-between items-baseline flex-wrap gap-2">
                                    <div className="heading-section !text-start">
                                        <div className="heading-title">All Properties</div>
                                        <div className="heading-description">View the all Properties</div>
                                    </div>
                                    <div className="min-w-fit">
                                        {/* <!-- Nav tabs --> */}
                                        <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse" role="tablist">
                                            <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary active"
                                                href="#!" id="tab-1" data-hs-tab="#tab1"
                                                aria-controls="tab1"> All
                                            </Link>
                                            <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                                href="#!" id="tab-2" data-hs-tab="#tab2"
                                                aria-controls="tab2"> For Sale
                                            </Link>
                                            <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                                                href="#!" id="tab-3" data-hs-tab="#tab3"
                                                aria-controls="tab3"> For Rent
                                            </Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                {/* <!-- Tab panes --> */}
                                <div className="tab-content all-products">
                                    <div className="tab-pane active" id="tab1" aria-labelledby="tab-1">
                                        <div className="grid grid-cols-12 gap-x-6">
                                            {RealProperties.slice(0, 8).map((card: any, index: any) => (
                                                <div key={index} className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <SpkPropertyCard card={card} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tab-pane hidden" id="tab2" aria-labelledby="tab-2">
                                        <div className="grid grid-cols-12 gap-x-6">
                                            {ForSaleProperties.map((card: any, index: any) => (
                                                <div key={index} className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <SpkPropertyCard card={card} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tab-pane hidden" id="tab3" aria-labelledby="tab-3">
                                        <div className="grid grid-cols-12 gap-x-6">
                                            {ForRentProperties.map((card: any, index: any) => (
                                                <div key={index} className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                                    <SpkPropertyCard card={card} />
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-8 --> */}

                {/* <!-- Start:: Section-9 --> */}
                <section className="!py-[3rem] bg-banner">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="lg:col-span-1 col-span-12"></div>
                            <div className="lg:col-span-10 col-span-12">
                                <div className="grid grid-cols-12 gap-x-6 text-center gap-y-3">
                                    <div className="md:col-span-3 col-span-12">
                                        <div>
                                            <h3 className="mb-1 font-semibold text-white">45K+</h3>
                                            <h6 className="mb-0 text-white">Property Listings</h6>
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 col-span-12">
                                        <div>
                                            <h3 className="mb-1 font-semibold text-white">175K+</h3>
                                            <h6 className="mb-0 text-white">Monthly Searches</h6>
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 col-span-12">
                                        <div>
                                            <h3 className="mb-1 font-semibold text-white">300K+</h3>
                                            <h6 className="mb-0 text-white">Monthly Advertises</h6>
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 col-span-12">
                                        <div>
                                            <h3 className="mb-1 font-semibold text-white">450M+</h3>
                                            <h6 className="mb-0 text-white">Sellers Contacted</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-12"></div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-9 --> */}

                {/* <!-- Start:: Section-10 --> */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 mb-4 justify-center text-center">
                            <div className="xl:col-span-12 col-span-12">
                                <p className="text-[0.75rem] font-semibold mb-1"><span
                                    className="landing-section-heading text-gradient">Our Blog</span> </p>
                                <div className="heading-title">Latest News Updates & Blogs</div>
                                <div className="xl:col-span-1 col-span-12"></div>
                                <div className="xl:col-span-10 col-span-12">
                                    <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                </div>
                                <div className="xl:col-span-1 col-span-12"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6">
                            {blogCards.map((card: any, index: any) => (
                                <div key={index} className="xl:col-span-4 col-span-12">
                                    <SpkLandingBlog card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-10 --> */}

                {/* <!-- Start:: Section-11 --> */}
                <section className="bg-banner">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 items-center">
                            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-5 col-span-12 lg:block hidden text-center mt-4">
                                <Image fill src="../../assets/images/ecommerce/png/Buy Sell.png"  alt="" />
                            </div>
                            <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-7 col-span-12">
                                <div className="my-4">
                                    <h2 className="font-semibold mb-3 text-white">Buy or Sell your property in a few seconds <a
                                        href="#!" className="text-secondary text-decoration-underline">
                                        Signup </a> now..</h2>
                                    <p className="mb-4">Est amet sit vero sanctus labore no sed nonumy. Sit ipsum sanctus ea
                                        magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum.Est amet sit vero
                                        sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.. </p>
                                    <div className="btn-list">
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-light ti-btn-lg me-2"><i
                                            className="ti ti-search"></i> Browse Property</Link>
                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-danger ti-btn-lg"><i
                                            className="ti ti-upload"></i> Post Property</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-11 --> */}

                {/* <!-- Start:: Section-12 --> */}
                <section className="section bg-white dark:bg-bodybg">
                    <div className="container">
                        <div className="heading-section mb-4">
                            <p className="text-[0.75rem] font-semibold mb-1"><span
                                className="landing-section-heading text-gradient">FAQ'S</span> </p>
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
                {/* <!-- End:: Section-12 --> */}

                {/* <!-- Start:: Section-13 --> */}
                <section className="section landing-testimonials">
                    <div className="container text-center">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Testimonials</span></p>
                        <div className="heading-title">We never failed to reach expectations</div>
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-textmuted dark:text-textmuted/50 text-[0.9375rem] mb-5 font-normal">Some of the reviews our clients
                                    gave which brings motivation to work.</p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <SpkSwiperJs slides={MarketSwiperComponent} slidesPerView={3} spaceBetween={30} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper pagination-dynamic text-start" />
                    </div>
                </section>
                {/* <!-- End:: Section-13 --> */}

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

            </div>
            {/* <!-- End::app-content --> */}

        </Fragment>
    );
};

export default Landing;