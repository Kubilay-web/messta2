"use client"
import SpkBrowserLanding from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-browser-landing";
import SpkFeatureCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-feature-card";
import SpkStepsCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-steps-card";
import { Landingaccordion, Landingaccordion1, adsCards, blogCards, browsecards, featureCards, steps } from "@/shared/data/apps/classifieds/landingdata";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import SwiperComponent from "@/shared/data/apps/classifieds/landingdata";
import SpkLandingAds from "@/shared/@spk-reusable-components/apps/spk-landing-ads";
import SpkLandingBlog from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-landing-blog";
import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions";

import Image from "next/image";


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
            <Seo title={"Classified-Landing"} />
            {/* <!-- Start::app-content --> */}
            <div className="main-content landing-main ecommerce-main">
                {/* <!-- Start:: Landing Banner --> */}
                <div className="landing-banner !z-0 ad-search-container !bg-primary">
                    <section className="section">
                        <div className="container main-banner-container !p-0">
                            <div className="grid grid-cols-12 gap-x-6 justify-center">
                                <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                                <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                                    <div className="">
                                        <div className="text-center">
                                            <p className="landing-banner-heading mb-3 !text-[2.5rem] !font-medium text-white dark:!text-white">
                                                Buy, Sell, Rent &
                                                Exchange in one click</p>
                                            <p className="text-[0.9375rem] mb-[3rem] opacity-70 text-white">Search from over
                                                12,00,000
                                                classifieds & Post unlimited classifieds free!</p>
                                        </div>
                                        <div className="input-group inline-flex gap-0 group-search xl:flex">
                                            <div className="category-dropdown-wrapper">
                                                <Link scroll={false} href="#!"
                                                    className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-[0.65rem]  !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] lg:rtl:!rounded-tr-md lg:rtl:!rounded-br-md lg:rtl:!rounded-tl-none lg:rtl:!rounded-bl-none lg:!rounded-tr-none lg:!rounded-br-none categorydropdown !border-0 !m-0"
                                                    onClick={() => setIsOpen(!isOpen)}>
                                                    <i className="ri-function-line me-2 text-primary"></i>All Categories<i
                                                        className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                </Link>
                                                <ul className="categories-dropdowns">
                                                    <li className="category-dropdown">
                                                        <ul className="main-dropdown active" style={{ display: isOpen ? 'block' : 'none' }} id="dropdown-toggle">
                                                            <li onClick={() => toggleDropdown(0)}>
                                                                <div className={`categories-dropdowns__item ${expandedIndex === 0 ? 'is-expanded' : ''}`}>
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 256 256">
                                                                            <rect width="256" height="256" fill="none" />
                                                                            <path
                                                                                d="M88,184v24a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V184Z"
                                                                                opacity="0.2" />
                                                                            <path
                                                                                d="M208,184v24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V184Z"
                                                                                opacity="0.2" />
                                                                            <rect x="48" y="72" width="160" height="40"
                                                                                opacity="0.2" />
                                                                            <line x1="48" y1="72" x2="208" y2="72"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="48" y1="112" x2="208" y2="112"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M208,184H48V64A24,24,0,0,1,72,40H184a24,24,0,0,1,24,24Z"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M208,184v24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V184"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M88,184v24a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V184"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <circle cx="92" cy="148" r="12" />
                                                                            <circle cx="164" cy="148" r="12" />
                                                                            <line x1="240" y1="80" x2="240" y2="104"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="16" y1="80" x2="16" y2="104"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                        </svg>
                                                                    </span>Vehicles
                                                                    <span className="float-end"><i
                                                                        className="bi bi-chevron-right"></i></span>
                                                                </div>
                                                                <ul className="category-menu">
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Cars</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Bikes</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Motor Cycles</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Buses</Link></li>
                                                                </ul>
                                                            </li>
                                                            <li onClick={() => toggleDropdown(1)}>
                                                                <div className={`categories-dropdowns__item ${expandedIndex === 1 ? 'is-expanded' : ''}`}>
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 256 256">
                                                                            <rect width="256" height="256" fill="none" />
                                                                            <path
                                                                                d="M200,48H176v56a8,8,0,0,1-13.12,6.15L128,80,93.12,110.13A8,8,0,0,1,80,104V48H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48Z"
                                                                                opacity="0.2" />
                                                                            <polygon points="96 32 160 32 128 80 96 32"
                                                                                opacity="0.2" />
                                                                            <path
                                                                                d="M128,80l32-48,16,16v56a8,8,0,0,1-13.12,6.15Z"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M93.12,110.13A8,8,0,0,1,80,104V48L96,32l32,48Z"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="128" y1="80" x2="128" y2="216"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M176,48h24a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H80"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="96" y1="32" x2="160" y2="32"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                        </svg>
                                                                    </span>
                                                                    Clothing & Jewellery
                                                                    <span className="float-end"><i
                                                                        className="bi bi-chevron-right"></i></span>
                                                                </div>
                                                                <ul className="category-menu">
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Accessories</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Men Clothing</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Women Clothing</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Men Shoes</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Women Shoes</Link></li>
                                                                </ul>
                                                            </li>
                                                            <li onClick={() => toggleDropdown(2)}>
                                                                <div className={`categories-dropdowns__item ${expandedIndex === 2 ? 'is-expanded' : ''}`}>
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 256 256">
                                                                            <rect width="256" height="256" fill="none" />
                                                                            <circle cx="212" cy="108" r="20"
                                                                                opacity="0.2" />
                                                                            <circle cx="44" cy="108" r="20" opacity="0.2" />
                                                                            <circle cx="92" cy="60" r="20" opacity="0.2" />
                                                                            <circle cx="164" cy="60" r="20" opacity="0.2" />
                                                                            <path
                                                                                d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"
                                                                                opacity="0.2" />
                                                                            <circle cx="212" cy="108" r="20" fill="none"
                                                                                stroke="currentColor" strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <circle cx="44" cy="108" r="20" fill="none"
                                                                                stroke="currentColor" strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <circle cx="92" cy="60" r="20" fill="none"
                                                                                stroke="currentColor" strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <circle cx="164" cy="60" r="20" fill="none"
                                                                                stroke="currentColor" strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                        </svg>
                                                                    </span>
                                                                    Pets
                                                                    <span className="float-end"><i
                                                                        className="bi bi-chevron-right"></i></span>
                                                                </div>
                                                                <ul className="category-menu">
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Birds</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Cats</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Fish</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Rabbit</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Dogs</Link></li>
                                                                </ul>
                                                            </li>
                                                            <li onClick={() => toggleDropdown(3)}>
                                                                <div className={`categories-dropdowns__item ${expandedIndex === 3 ? 'is-expanded' : ''}`}>
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 256 256">
                                                                            <rect width="256" height="256" fill="none" />
                                                                            <path
                                                                                d="M136,216V32a8,8,0,0,0-12.44-6.65l-80,53.33A8,8,0,0,0,40,85.35V216Z"
                                                                                opacity="0.2" />
                                                                            <path
                                                                                d="M136,216V32a8,8,0,0,0-12.44-6.65l-80,53.33A8,8,0,0,0,40,85.35V216"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path d="M136,88h72a8,8,0,0,1,8,8V216"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="16" y1="216" x2="240" y2="216"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="104" y1="112" x2="104" y2="128"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="72" y1="112" x2="72" y2="128"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="72" y1="168" x2="72" y2="184"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="104" y1="168" x2="104" y2="184"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                        </svg>
                                                                    </span>
                                                                    Real Estate
                                                                    <span className="float-end"><i
                                                                        className="bi bi-chevron-right"></i></span>
                                                                </div>
                                                                <ul className="category-menu">
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Land</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Flat</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Houses</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Shops</Link></li>
                                                                </ul>
                                                            </li>
                                                            <li onClick={() => toggleDropdown(4)}>
                                                                <div className={`categories-dropdowns__item ${expandedIndex === 4 ? 'is-expanded' : ''}`}>
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 256 256">
                                                                            <rect width="256" height="256" fill="none" />
                                                                            <path
                                                                                d="M60.06,195.91a96,96,0,0,1-.12-135.65h0a95.7,95.7,0,0,1,28,67.76,95.74,95.74,0,0,1-28,67.77Z"
                                                                                opacity="0.2" />
                                                                            <path
                                                                                d="M196.06,195.91a96,96,0,0,1-.12-135.65h0a96,96,0,0,1,0,135.53Z"
                                                                                opacity="0.2" />
                                                                            <circle cx="128" cy="128" r="96" fill="none"
                                                                                stroke="currentColor" strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path
                                                                                d="M60,60.24A95.7,95.7,0,0,1,88,128a95.7,95.7,0,0,1-28,67.76"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <path d="M196,60.24a96,96,0,0,0,0,135.52"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="32" y1="128" x2="224" y2="128"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                            <line x1="128" y1="32" x2="128" y2="224"
                                                                                fill="none" stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round" strokeWidth="16" />
                                                                        </svg>
                                                                    </span>
                                                                    Sports
                                                                    <span className="float-end"><i
                                                                        className="bi bi-chevron-right"></i></span>
                                                                </div>
                                                                <ul className="category-menu">
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Bicycle</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Fishing</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Golf</Link></li>
                                                                    <li><Link scroll={false} href="#!"
                                                                        className="category-item">Gym & Fitness</Link></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="custom-form-group flex-grow">
                                                <input type="text"
                                                    className="form-control  shadow-none lg:!rounded-none !border-0 border-e !border-s"
                                                    placeholder="Enter Your Keyword Here.."
                                                    aria-label="Recipient's username" />
                                            </div>
                                            <div className="custom-form-group flex-grow">
                                                <input type="text"
                                                    className="form-control  lg:!rounded-none shadow-none border-0 !border-s"
                                                    id="input-placeholder" placeholder="Search by Location..." />
                                                <div className="custom-form-btn border-0">
                                                    <Link scroll={false} href="#!" className="gps-location"><i className="ti ti-current-location"></i></Link>
                                                    <div className="ti-dropdown hs-dropdown ad-dropdown !border-s dark:border-defaultborder/10">
                                                        <Link scroll={false} href="#!" className="ti-btn text-default btn-wave" data-bs-toggle="dropdown" aria-expanded="false">
                                                            5km<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                        </Link>
                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden !z-[1000]" role="menu">
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">0km</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">2km</Link> </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item active" href="#!">5km</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">10km</Link></li>
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">20km</Link> </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">50km</Link> </li>
                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">100km</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="ti-btn ti-btn-lg ti-btn-secondary !border-0 shadow-sm search-btn !m-0" type="button"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* <!-- End:: Landing Banner --> */}

                {/* <!-- Start:: Section-1 --> */}
                <section className="section !z-[-1] relative bg-white dark:bg-bodybg">
                    <div className="container">
                        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                            <div className="flex-grow">
                                <p className="text-[0.75rem] font-semibold mb-1 text-gradient">Find Ads by Categories</p>
                                <h3 className="font-semibold mb-0">Browse Ads by Top Categories</h3>
                                <p className="text-textmuted dark:text-textmuted/50 mb-0">Sed do eiusmod tempor incididunt ut
                                    labore et dolore magna
                                    aliqua
                                </p>
                            </div>
                            <div>
                                <Link scroll={false} href="#!" className="ti-btn ti-btn-wave ti-btn-primary">
                                    View All Categories <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6 text-start">
                            {browsecards.map((card: any, index: any) => (
                                <div key={index} className="col-span-12 md:col-span-4 xl:col-span-2">
                                    <SpkBrowserLanding card={card} />
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-1 --> */}

                {/* <!-- Start:: Section-2 --> */}
                <section className="section bg-light">
                    <div className="container text-center">
                        <p className="text-[0.75rem] font-semibold mb-1"><span
                            className="landing-section-heading text-gradient">Steps</span>
                        </p>
                        <h3 className="font-semibold mb-2">How it works ?</h3>
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-textmuted dark:text-textmuted/50 text-[0.9375rem] mb-5 font-normal">Sed do
                                    eiusmod tempor incididunt
                                    ut labore et
                                    dolore magna aliqua</p>
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
                {/* <!-- End:: Section-2 --> */}

                {/* <!-- Start:: Section-3 --> */}
                <section className="bg-banner-2 text-white">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 items-center">
                            <div
                                className="xl:col-span-4 lg:col-span-5 md:col-span-6 col-span-12 text-center mt-6 md:block relative hidden">
                                <Image fill src="../../assets/images/ecommerce/png/17.png" alt="" />
                            </div>
                            <div className="xl:col-span-8 lg:col-span-7 md:col-span-6 col-span-12">
                                <div className="my-6">
                                    <h2 className="font-semibold mb-3 text-white">Do you have something to advertise?</h2>
                                    <h6 className="mb-4 text-white">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit aspernatur illum vel sunt libero voluptatum repudiandae veniam maxime tenetur.
                                    </h6>
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-light ti-btn-lg">Post Your Ad</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-3 --> */}

                {/* <!-- Start:: Section-4 --> */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 justify-center text-center mb-[3rem]">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-[0.75rem] font-semibold mb-1"><span
                                    className="landing-section-heading text-gradient">Find
                                    Ads</span></p>
                                <h3 className="font-semibold mb-2">Featured Ads</h3>
                                <p className="">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6">
                            {featureCards.map((card: any, index: any) => (
                                <div key={index} className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
                                    <SpkFeatureCard card={card} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-primary">
                                View All Ads <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                            </Link>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-4 --> */}

                {/* <!-- Start:: Section-5 --> */}
                <section className="section bg-white dark:bg-bodybg">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 justify-center text-center mb-5">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-[0.75rem] font-semibold mb-1"><span className="landing-section-heading text-gradient">Latest</span></p>
                                <h3 className="font-semibold mb-2">Latest Ads</h3>
                                <p className="">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-6">
                            {adsCards.map((card: any, index: any) => (
                                <div key={index} className="lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12">
                                    <SpkLandingAds card={card} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-primary">
                                View All Ads <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                            </Link>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-5 --> */}

                {/* <!-- Start:: Section-6 --> */}
                <section className="py-[3rem] bg-banner">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="lg:col-span-1 col-span-12"></div>
                            <div className="lg:col-span-10 col-span-12">
                                <div className="grid grid-cols-12 gap-x-6 gap-y-4 text-center">
                                    <div className="md:col-span-3 col-span-12">
                                        <div>
                                            <h3 className="mb-1 font-semibold text-white">45K+</h3>
                                            <h6 className="mb-0 text-white">Published Ads</h6>
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
                                            <h6 className="mb-0 text-white">Premium Ads</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 col-span-12"></div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-6 --> */}

                {/* <!-- Start:: Section-7 --> */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6 mb-4 justify-center text-center">
                            <div className="xl:col-span-12 col-span-12">
                                <p className="text-[0.75rem] font-semibold mb-1"><span
                                    className="landing-section-heading text-gradient">Our
                                    Blog</span> </p>
                                <h3 className="font-semibold mb-2">Latest News Updates & Blogs</h3>
                                <div className="grid grid-cols-12 gap-x-6">
                                    <div className="xl:col-span-2 col-span-12"></div>
                                    <div className="xl:col-span-8 col-span-12">
                                        <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </p>
                                    </div>
                                    <div className="xl:col-span-2 col-span-12"></div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            {blogCards.map((card: any, index: any) => (
                                <div key={index} className="md:col-span-4 col-span-12">
                                    <SpkLandingBlog card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-7 --> */}

                {/* <!-- Start:: Section-8 --> */}
                <section className="section bg-banner">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="lg:col-span-9 col-span-12">
                                <h2 className="font-semibold text-white mb-4">Create your free account today!</h2>
                                <p className="mb-0 opacity-90">Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit
                                    ipsum
                                    sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et
                                    kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore..
                                </p>
                            </div>
                            <div className="lg:col-span-3 col-span-12 text-end my-auto">
                                <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger">Signup Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- End:: Section-8 --> */}

                {/* <!-- Start:: Section-9 --> */}
                <section className="section bg-white dark:bg-bodybg">
                    <div className="container">
                        <div className="heading-section mb-5">
                            <p className="text-[0.75rem] font-semibold mb-1"><span
                                className="landing-section-heading text-gradient">FAQ'S</span> </p>
                            <h3 className="font-semibold mb-2">Frequently Asked Questions?</h3>
                            <div className="heading-description">Browse Through The Most Frequently Asked Questions</div>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="xl:col-span-6 col-span-12">
                                <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate" id="accordionFAQ1">
                                    <SpkAccordions items={Landingaccordion} key={1} Titletext="before" SvgIcon={true} Toggleclass='hs-accordion-active:!text-white hs-accordion-active:!border-primary hs-accordion-active:!rounded-tl-sm hs-accordion-active:!rounded-tr-sm hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-white dark:text-gray-200 dark:hover:text-white/80' />
                                </div>
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                                <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate" id="accordionFAQ2">
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
                        <p className="text-[0.75rem] font-semibold mb-1"><span className="landing-section-heading text-gradient">Testimonials</span></p>
                        <h3 className="font-semibold mb-2">We never failed to reach expectations</h3>
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xl:col-span-3 col-span-12"></div>
                            <div className="xl:col-span-6 col-span-12">
                                <p className="text-textmuted dark:text-textmuted/50 text-[0.9375rem] mb-5 font-normal">Some of
                                    the reviews our clients
                                    gave which brings
                                    motivation to work for future projects.</p>
                            </div>
                            <div className="xl:col-span-3 col-span-12"></div>
                        </div>
                        <SpkSwiperJs slides={SwiperComponent} pagination={{ clickable: true, }} slidesPerView={3} spaceBetween={20} autoplay={true} breakpoint={breakpoints} className="mySwiper swiper pagination-dynamic text-start" />
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

            </div>
            {/* <!-- End::app-content --> */}

        </Fragment>
    );
};

export default Landing;