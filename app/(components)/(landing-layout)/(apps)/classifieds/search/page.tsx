"use client"
import SpkFeatureCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-feature-card";
import { items } from "@/shared/data/apps/classifieds/classified-details-data";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import Image from "next/image";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize with -1 for no item expanded

    const toggleDropdown = (index: any) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand the clicked item
        }
    };
    const AirbnbSlider = styled(Slider)(({ theme }) => ({
        color: '#546dfe',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            height: 27,
            width: 27,
            backgroundColor: '#fff',
            border: '1px solid currentColor',
            '&:hover': {
                boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
            },
            '& .airbnb-bar': {
                height: 9,
                width: 1,
                backgroundColor: 'currentColor',
                marginLeft: 1,
                marginRight: 1,
            },
        },
        '& .MuiSlider-track': {
            height: 3,
        },
        '& .MuiSlider-rail': {
            color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
            opacity: theme.palette.mode === 'dark' ? undefined : 1,
            height: 3,
        },
    }));

    function AirbnbThumbComponent(props: any) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
            </SliderThumb>
        );
    }
    return (
        <Fragment>
            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner ad-search-container !bg-primary">
                <section className="section lg:mt-0 mt-[3rem]">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 justify-center">
                            <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                            <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                                <div className="">
                                    <div className="input-group inline-flex gap-0 group-search xl:flex">
                                        <div className="category-dropdown-wrapper ti-dropdown hs-dropdown">
                                            <Link scroll={false} href="#!" onClick={() => setIsOpen(!isOpen)}
                                                className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0" >
                                                <i className="ri-function-line me-2 text-primary"></i>All Categories<i
                                                    className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="categories-dropdowns">
                                                <li className="category-dropdown">
                                                    <ul className="main-dropdown" style={{ display: isOpen ? 'block' : 'none' }} id="dropdown-toggle">
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
                                                className="form-control  shadow-none lg:!rounded-none !border-0 !border-e !border-s"
                                                placeholder="Enter Your Keyword Here.."
                                                aria-label="Recipient's username" />
                                        </div>
                                        <div className="custom-form-group flex-grow">
                                            <input type="text"
                                                className="form-control  lg:!rounded-none shadow-none border-0"
                                                id="input-placeholder" placeholder="Search by Location..." />
                                            <div className="custom-form-btn border-0">
                                                <Link scroll={false} href="#!" className="gps-location"><i
                                                    className="ti ti-current-location"></i></Link>
                                                <div className="ti-dropdown hs-dropdown ad-dropdown custom-locaton">
                                                    <Link scroll={false} href="#!" className="ti-btn text-default btn-wave"
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
                                            className="ti-btn ti-btn-lg ti-btn-secondary !border-0 shadow-sm search-btn !m-0 lg:rtl:!rounded-tr-none lg:rtl:!rounded-br-none lg:rtl:!rounded-tl-md lg:rtl:!rounded-bl-md lg:!rounded-tl-none lg:!rounded-bl-none !rounded-md"
                                            type="button"><i className="bi bi-search"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="xxl:col-span-2 xl:col-span-12 col-span-12"></div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}


            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4">
                <div className="container">
                    <Seo title={"Search"} />
                    <Pageheader breadcrumbs={['Apps', 'Classifieds']} currentpage="Search" Updated={true} />
                </div>
            </div>

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body !p-4">
                                    <div className="grid grid-cols-12 gap-x-6 items-center">
                                        <div className="lg:col-span-8 col-span-12">
                                            <div className="flex">
                                                <h5 className="font-semibold mb-0"><span className="font-normal">Showing</span> 3456 Ads</h5>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-4 col-span-12 text-end">
                                            <div className="btn-group ti-dropdown hs-dropdown">
                                                <button className="ti-btn ti-btn-outline-light !text-dark !border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Sort By <i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                                </button>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Date Published</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most Relevant</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price Low to High</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price High to Low</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Distance</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-3 col-span-12">
                            <div className="box products-navigation-card">
                                <div className="box-body !p-0">
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Categories</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="c-1" defaultChecked />
                                                <label className="form-check-label" htmlFor="c-1">
                                                    Electronics
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,712</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="c-2" />
                                                <label className="form-check-label" htmlFor="c-2">
                                                    Real Estate
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">536</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="c-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="c-3">
                                                    Sports
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">18,289</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="c-4"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="c-4">
                                                    Shopping
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">3,453</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="c-5" />
                                                <label className="form-check-label" htmlFor="c-5">
                                                    Jobs
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">7,165</span>
                                            </div>
                                            <div className="hs-collapse w-full overflow-hidden transition-[height] duration-300 hidden"
                                                id="hs-show-hide-categories-heading"
                                                aria-labelledby="hs-show-hide-categories">
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox"
                                                        id="c-6" />
                                                    <label className="form-check-label" htmlFor="c-6">
                                                        Vehicles
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">5,964</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox"
                                                        id="c-7" />
                                                    <label className="form-check-label" htmlFor="c-7">
                                                        Pets
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,123</span>
                                                </div>
                                            </div>
                                            <Link scroll={false} className="ecommerce-more-link hs-collapse-toggle"
                                                id="hs-show-hide-categories"
                                                data-hs-collapse="#hs-show-hide-categories-heading"
                                                href="#category-more" role="button">MORE</Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Type</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-1" />
                                                <label className="form-check-label" htmlFor="ty-1">
                                                    Sell
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="ty-2">
                                                    Buy
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-3" />
                                                <label className="form-check-label" htmlFor="ty-3">
                                                    Exchange
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-4" defaultChecked />
                                                <label className="form-check-label" htmlFor="ty-4">
                                                    Job
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">4,531</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-5" />
                                                <label className="form-check-label" htmlFor="ty-5">
                                                    To-Let
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" id="ty-6" />
                                                <label className="form-check-label" htmlFor="ty-6">
                                                    Rent
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Location</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="j-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-1">
                                                    India
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">512</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="j-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-2">
                                                    Germany
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,186</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="j-3"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-3">
                                                    London
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">734</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="j-4" />
                                                <label className="form-check-label" htmlFor="j-4">
                                                    USA
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="j-5" />
                                                <label className="form-check-label" htmlFor="j-5" >
                                                    Australia
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">1,432</span>
                                            </div>
                                            <div className="hs-collapse w-full overflow-hidden transition-[height] duration-300 hidden"
                                                id="hs-show-hide-location-heading"
                                                aria-labelledby="hs-show-hide-location">
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox"
                                                        id="s-5" />
                                                    <label className="form-check-label" htmlFor="s-5">
                                                        Spain
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">5,946</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox"
                                                        id="s-6" />
                                                    <label className="form-check-label" htmlFor="s-6">
                                                        Gujarat
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">3,267</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox"
                                                        id="s-7" />
                                                    <label className="form-check-label" htmlFor="s-7">
                                                        Chicago
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">578</span>
                                                </div>
                                            </div>
                                            <Link scroll={false} className="ecommerce-more-link hs-collapse-toggle" id="hs-show-hide-location" data-hs-collapse="#hs-show-hide-location-heading" href="#sizes-more" role="button">MORE</Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Price Range</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div id="nonlinear">
                                                <AirbnbSlider
                                                    slots={{ thumb: AirbnbThumbComponent }}
                                                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                                    defaultValue={[10, 90]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="font-semibold mb-0">Featured Ads</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="q-1" />
                                                <label className="form-check-label" htmlFor="q-1">
                                                    Premium
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="q-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="q-2">
                                                    Featured
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="q-3" />
                                                <label className="form-check-label" htmlFor="q-3">
                                                    Top Ads
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" id="q-4"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="q-4">
                                                    Highlighted
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">4,531</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" id="q-5" />
                                                <label className="form-check-label" htmlFor="q-5">
                                                    Urgent
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" id="q-6" />
                                                <label className="form-check-label" htmlFor="q-6">
                                                    Price Drop
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-body">
                                    <div className="">
                                        <h5 className="font-semibold mb-4">Get Latest Ad Alerts</h5>
                                        <p className="mb-4">Latest Ads updates on the go to recieved direct to your email.
                                            Stay updated with your latest new Ads.</p>
                                        <div className="input-group mb-4">
                                            <input type="text" className="form-control !border-s" placeholder="Email Here"
                                                aria-label="blog-email" aria-describedby="blog-subscribe" />
                                            <button className="ti-btn ti-btn-primary !m-0" type="button"
                                                id="blog-subscribe">Subscribe</button>
                                        </div>
                                        <label className="form-check-label">
                                            By Subscribing you accept to <Link scroll={false} href="#!" className="text-success"><u>privacy policy</u></Link>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-9 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {items.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <SpkFeatureCard card={card} />
                                    </div>
                                ))}

                            </div>
                            <nav aria-label="Page navigation" className="pagination-style-1 float-end">
                                <ul className="ti-pagination mb-0">
                                    <li className="page-item">
                                        <Link scroll={false} className="page-link disabled" href="#!">
                                            Prev
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link scroll={false} className="page-link active" href="#!">1</Link>
                                    </li>
                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                    <li className="page-item">
                                        <Link scroll={false} className="page-link" href="#!">
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">16</Link></li>
                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">17</Link></li>
                                    <li className="page-item">
                                        <Link scroll={false} className="page-link text-primary" href="#!">
                                            next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
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

export default Search;