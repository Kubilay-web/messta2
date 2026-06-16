"use client"
import nextConfig from '@/next.config'
import { ThemeChanger } from '@/shared/redux/action'
import store from '@/shared/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, } from 'react'
import { connect } from 'react-redux'

const Ecommerceheader = ({ ThemeChanger }: any) => {
    let { basePath } = nextConfig;
    //Togglesidebar
    function toggleNavigation() {
        if (window.innerWidth <= 992) {
            const theme = store.getState().reducer;
            ThemeChanger({ ...theme, "toggled": "open", "dataNavLayout": "horizontal" });

        }
    }

    //Switcher
    const SelectorAll = (selector: any) => document.querySelectorAll(selector);

    return (
        <Fragment>
            <div className="top-header py-[3px] px-0 border-b border-defaultborder dark:border-defaultborder/10 bg-white dark:bg-bodybg">
                <div className="container top-header-container">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="flex-grow">
                            <ul className="nav list-unstyled flex flex-wrap items-center">
                                <li><Link scroll={false} href="#!" className="nav-link !py-2 !pe-4 !font-medium !ps-0">About
                                    Us</Link></li>
                                <li><Link scroll={false} href="#!" className="nav-link !py-2 !px-4 !font-medium">Contact Us</Link>
                                </li>
                                <li><Link scroll={false} href="#!" className="nav-link !py-2 !px-4 !font-medium">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="min-w-fit">
                            <ul className="nav list-unstyled flex flex-wrap items-center">
                                <li className="ti-dropdown hs-dropdown">
                                    <Link scroll={false} href="#!" className="nav-link !py-2 !px-4 !font-medium"
                                        data-bs-toggle="dropdown">USD <i className="ti ti-chevron-down"></i></Link>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">INR</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">MBP</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">EU</Link></li>
                                    </ul>
                                </li>
                                <li className="ti-dropdown hs-dropdown">
                                    <Link scroll={false} href="#!" className="nav-link !py-2 !px-4 !font-medium"
                                        data-bs-toggle="dropdown">English <i className="ti ti-chevron-down"></i></Link>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">French</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">Spanish</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item">Arabic</Link></li>
                                    </ul>
                                </li>
                                <li className="ti-dropdown hs-dropdown">
                                    <Link scroll={false} href="#!"
                                        className="nav-link !py-2 !ps-4 !font-medium main-menu__item-link !pe-0 inline-flex items-center"
                                        data-bs-toggle="dropdown"><i
                                            className="ti ti-map-pin me-1 text-[1rem]inline-block"></i>California, USA <i
                                                className="ti ti-chevron-down mx-1"></i></Link>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden max-w-[15rem]">
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate"
                                            title="Venizula, 212, MS">Venizula, 212, MS</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate"
                                            title="Vicecity, GTX">Vicecity, GTX</Link></li>
                                        <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate"
                                            title="Paradox, 12, LN">Paradox, 12, LN</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ecommerce-brand-header sticky bg-white dark:bg-bodybg border-b border-defaultborder dark:border-defaultborder/10"
                id="header">
                <div className="container brand-header-container lg:gap-[3rem] gap-4 flex-wrap lg:py-0 py-4">

                    <div className="flex-grow flex items-center lg:gap-6 gap-2 flex-wrap">
                        {/* <!-- End::header-element --> */}
                        <div className="landing-logo-container">
                            <div className="horizontal-logo">
                                <Link scroll={false} href="/dashboards/sales" className="header-logo relative">
                                    <Image fill priority src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} alt="logo" className="desktop-logo !block dark:!hidden" />
                                    <Image fill priority src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} alt="logo" className="desktop-dark !hidden dark:!block" />
                                </Link>
                            </div>
                        </div>
                        {/* <!-- Start::header-element --> */}
                        <div className="header-element lg:mx-0 mx-2 lg:hidden block mt-5">
                            <Link onClick={() => toggleNavigation()} scroll={false} aria-label="Hide Sidebar"
                                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                                data-bs-toggle="sidebar" href="#!"><span></span></Link>
                        </div>
                        {/* <!-- End::header-element --> */}
                        <div className="allcategory-input-group flex-grow">
                            <div className="ti-dropdown hs-dropdown allcategory-addon start-0">
                                <Link scroll={false} href="#!" className="" data-bs-toggle="dropdown">All Categories <i
                                    className="ti ti-chevron-down ms-1"></i></Link>
                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Vegetables & Fruits</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Egg & Meat</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Snacks</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Beverages</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Household</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Baby Care</Link></li>
                                </ul>
                            </div>
                            <input type="text"
                                className="form-control form-control-lg addon-end-input addon-start-input pe-[3rem] !py-2 !text-[1rem]"
                                placeholder="Search..." />
                            <Link scroll={false} href="#!" className="text-textmuted dark:text-textmuted/50 allcategory-addon end-0"><i
                                className="ti ti-search"></i></Link>
                        </div>
                    </div>

                    <div className="min-w-fit">
                        <ul className="nav list-unstyled items-center flex gap-4 mb-0">
                            <li>
                                <Link scroll={false} href="/ecommerce/customer/shop" className="categories-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                        <rect width="256" height="256" fill="none" />
                                        <path d="M54,40H202a8,8,0,0,1,7.69,5.8L224,96H32L46.34,45.8A8,8,0,0,1,54,40Z"
                                            opacity="0.2" />
                                        <path d="M96,96v16a32,32,0,0,1-64,0V96Z" opacity="0.2" />
                                        <path d="M224,96v16a32,32,0,0,1-64,0V96Z" opacity="0.2" />
                                        <polyline points="48 139.59 48 216 208 216 208 139.59" fill="none"
                                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="16" />
                                        <path d="M54,40H202a8,8,0,0,1,7.69,5.8L224,96H32L46.34,45.8A8,8,0,0,1,54,40Z"
                                            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="16" />
                                        <path d="M96,96v16a32,32,0,0,1-64,0V96" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                        <path d="M160,96v16a32,32,0,0,1-64,0V96" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                        <path d="M224,96v16a32,32,0,0,1-64,0V96" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link scroll={false} href="/ecommerce/customer/compare-products" className="categories-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                        <rect width="256" height="256" fill="none" />
                                        <circle cx="56" cy="64" r="24" opacity="0.2" />
                                        <circle cx="200" cy="192" r="24" opacity="0.2" />
                                        <path d="M200,168V110.63a16,16,0,0,0-4.69-11.32L144,48" fill="none"
                                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="16" />
                                        <polyline points="144 96 144 48 192 48" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                        <path d="M56,88v57.37a16,16,0,0,0,4.69,11.32L112,208" fill="none"
                                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="16" />
                                        <polyline points="112 160 112 208 64 208" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                        <circle cx="56" cy="64" r="24" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                        <circle cx="200" cy="192" r="24" fill="none" stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link scroll={false} href="#viewOffCanvas3" className="categories-icon" data-hs-overlay="#hs-overlay-notification">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z" opacity="0.2" /><path d="M96,192a32,32,0,0,0,64,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>

                                </Link>

                            </li>
                            <li>
                                <div className="ti-dropdown hs-dropdown main-header-dropdown">
                                    <Link scroll={false} href="#!"
                                        className="categories-icon avatar avatar-sm avatar-rounded p-0"
                                        data-bs-toggle="dropdown">
                                        <Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/11.jpg`} alt="img" className="min-w-fit rounded-circle h-full mt-3 w-full" />
                                    </Link>
                                    <ul className="ti-dropdown-menu !mt-0 hs-dropdown-menu hidden dropdown-width-1">
                                        <li><Link scroll={false} href="/ecommerce/customer/customer" className="ti-dropdown-item"><i
                                            className="ti ti-user text-[1rem] me-2 inline-block"></i>My Account</Link></li>
                                        <li><Link scroll={false} href="/ecommerce/customer/customer" className="ti-dropdown-item"><i
                                            className="ti ti-box text-[1rem] me-2 inline-block"></i>My Orders</Link></li>
                                        <li><Link scroll={false} href="/ecommerce/customer/wishlist" className="ti-dropdown-item"><i
                                            className="ti ti-heart text-[1rem] me-2 inline-block"></i>Wishlist</Link></li>
                                        <li><Link scroll={false} href="/ecommerce/customer/order-tracking" className="ti-dropdown-item"><i
                                            className="ti ti-route text-[1rem] me-2 inline-block"></i>Order Tracking</Link>
                                        </li>
                                        <li><Link scroll={false} href="/ecommerce/customer/coupons" className="ti-dropdown-item"><i
                                            className="ti ti-discount text-[1rem] me-2 inline-block"></i>Coupons</Link></li>
                                        <li><Link scroll={false} href="/ecommerce/customer/settings" className="ti-dropdown-item"><i
                                            className="ti ti-settings text-[1rem] me-2 inline-block"></i>Settings</Link>
                                        </li>
                                        <li><Link scroll={false} href="/authentication/sign-in/cover" className="ti-dropdown-item"><i
                                            className="ti ti-logout text-[1rem] me-2 inline-block"></i>Sign Out</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li>

                                <Link scroll={false} href="#viewOffCanvas2" className="categories-icon" data-hs-overlay="#hs-overlay-cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56Z" opacity="0.2" /><path d="M188,184H91.17a16,16,0,0,1-15.74-13.14L48.73,24H24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="92" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="188" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>

                                </Link>

                            </li>
                            <li>
                                <Link scroll={false} href="#!" aria-label="button" type="button" className="categories-icon switcher-icon" data-hs-overlay="#hs-overlay-switcher">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" /><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* <!-- Start::Notifications-offcanvas --> */}
            <div className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1} id="hs-overlay-notification">
                <div className="ti-offcanvas-body offcanvas-custom-body !p-0">
                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10 flex items-center justify-between">
                        <h5 className="mb-0 font-semibold">Notifications</h5>
                        <button type="button"
                            className="ti-btn flex-shrink-0 p-0 transition-none text-defaulttextcolor dark:text-defaulttextcolor/80 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white  dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                            data-hs-overlay="#hs-overlay-notification">
                            <span className="sr-only">Close modal</span>
                            <i className="ri-close-line leading-none text-[1.5rem]"></i>
                        </button>
                    </div>
                    <ul className="ti-list-group list-group-flush mb-0 scroll-items-container">
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon rounded-indicator bg-success/[0.15] text-success"><i
                                        className="ti ti-truck-delivery"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Your order has been shipped</p>
                                        <span className="text-[0.75rem]">5 min</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Your order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#1289456</Link> has been shipped.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-warning/[0.15] text-warning rounded-indicator"><i
                                        className="ti ti-phone-off"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Delivery partner tried to reach you</p>
                                        <span className="text-[0.75rem]">1 hr</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Your order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#1289456</Link> has been delivered and delivery
                                        partner waiting at your doorstep.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon rounded-indicator bg-danger/[0.15] text-danger"><i
                                        className="ti ti-package-off"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Your order has been cancelled</p>
                                        <span className="text-[0.75rem]">3 hr</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Your order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#1289456</Link> has been cancelled successfully.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-secondary/[0.15] text-secondary rounded-indicator"><i
                                        className="ti ti-discount-2"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Discount on selected produts!</p>
                                        <span className="text-[0.75rem]">1 d</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Shop now and get min 50% Off on selected products. <a
                                        href="#!" className="text-primary font-medium">Click Here</a>.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-info/[0.15] text-info"><i className="ti ti-package"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">New products added</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">1 d</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Shopping list has been updated by new products. <a
                                        href="#!" className="text-primary font-medium">Click Here</a> to
                                        see now.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-success/[0.15] text-success"><i
                                        className="ti ti-check"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Order Placed successfully!</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">2 d</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#12567845</Link> has been placed succefully.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-pinkmain/[0.15] text-pinkmain"><i
                                        className="ti ti-ticket"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Coupons added!</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">5 d</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">You have won 2 new coupons. <a
                                        href="/ecommerce/customer/customer" className="text-primary font-medium">Check Now</a>.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-secondary/[0.15]  text-secondary"><i
                                        className="ti ti-discount-2"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Discount on selected products!</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">1 W</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Shop now and get min 50% Off on selected products. <a
                                        href="#!" className="text-primary font-medium">Click Here</a>.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item !border-b">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-warning/[0.15] text-warning"><i
                                        className="ti ti-phone-off"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Delivery partner tried to reach you</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">1 W</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Your order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#1289456</Link> has been delivered and delivery
                                        partner waiting at your doorstep.</p>
                                </div>
                            </div>
                        </li>
                        <li className="ti-list-group-item">
                            <div className="flex items-start gap-2">
                                <div className="min-w-fit">
                                    <span className="notify-icon bg-success/[0.15] text-success"><i
                                        className="ti ti-truck-delivery"></i></span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="mb-0 font-medium">Your order has been shipped</p>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">1 W</span>
                                    </div>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">Your order <Link scroll={false} href="/ecommerce/customer/customer"
                                        className="text-primary font-medium">#1289456</Link> has been shipped.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="p-4 flex items-center gap-2">
                        <Link scroll={false} href="#!" className="flex-grow ti-btn ti-btn-outline-light !text-dark"><i
                            className="ti ti-x me-1"></i> Clear all</Link>
                        <Link scroll={false} href="#!" className="flex-grow ti-btn ti-btn-primary"><i
                            className="ti ti-checks me-1"></i> Mark all as read</Link>
                    </div>
                </div>
            </div>
            {/* <!-- End::Notifications-offcanvas --> */}

            {/* <!-- Start::Cart-offcanvs --> */}
            <div className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1} id="hs-overlay-cart">
                <div className="ti-offcanvas-body offcanvas-custom-body !p-0">
                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10 flex items-center justify-between">
                        <h5 className="mb-0 font-semibold">Cart</h5>
                        <button type="button"
                            className="ti-btn flex-shrink-0 p-0 transition-none text-defaulttextcolor dark:text-defaulttextcolor/80 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white  dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                            data-hs-overlay="#hs-overlay-cart">
                            <span className="sr-only">Close modal</span>
                            <i className="ri-close-line leading-none text-[1.5rem]"></i>
                        </button>
                    </div>
                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10 flex items-center justify-between font-medium flex-wrap">
                        <div className="flex-grow flex items-center gap-2 overflow-hidden">
                            <span className="min-w-fit text-textmuted dark:text-textmuted/50">Deliver to :</span>
                            <div className="flex items-center gap-2 flex-grow overflow-hidden">
                                <div className="leading-none">
                                    <span className="avatar avatar-xs avatar-rounded"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/1.jpg`} alt="img" /></span>
                                </div>
                                <div>
                                    <span className="flex-grow truncate" title="Rubt Disousa">Ruby D</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-end ms-3">
                            <div className="ti-dropdown hs-dropdown">
                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className=""><i className="ti ti-map-pin me-1 text-[1rem] inline-block"></i>California, USA <i className="ti ti-chevron-down mx-1"></i></Link>
                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden max-w-[12rem]">
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate" title="Venizula, 212, MS">Venizula, 212, MS</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate" title="Vicecity, GTX">Vicecity, GTX</Link></li>
                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item truncate" title="Paradox, 12, LN">Paradox, 12, LN</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-items-container">
                        <ul className="ti-list-group ti-list-group-flush">
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/1.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Flower Pot</Link></p>
                                            <div className="min-w-fit">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Yellow<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">1</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$12.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="1" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/4.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Kiwi Fruit</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Pink<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">2</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$25.05</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="2" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/3.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Camera</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Blue<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">1</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$49.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="1" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/5.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Donut</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Size: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">10<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">11</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">10</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Blue<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">1</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$42.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="1" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/2.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Head Phones</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Pink<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">2</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$39.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="2" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/6.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Cactus Plant</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Yellow<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">3</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$25.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="3" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/7.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Wooden Chair</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Blue<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">5</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$19.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="5" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="ti-list-group-item">
                                <div className="flex items-start gap-2">
                                    <div className="rounded">
                                        <Link scroll={false} href="/ecommerce/customer/product-details" className="avatar avatar-xxl"><Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/ecommerce/jpg/8.jpg`} alt="img" className="w-full img-fluid" /></Link>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start mb-2">
                                            <p className="text-[0.875rem] font-semibold mb-0 flex-grow truncate"><Link scroll={false} href="/ecommerce/customer/product-details">Showcase Pot</Link></p>
                                            <div className="min-w-fit ms-3">
                                                <Link scroll={false} href="#!" className="opacity-70"><i className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-textmuted dark:text-textmuted/50 ">
                                            <p className="mb-0">Color: </p>
                                            <div className="ti-dropdown hs-dropdown">
                                                <Link scroll={false} href="#!" data-bs-toggle="dropdown" className="text-primary">Blue<i className="ti ti-chevron-down"></i></Link>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Yellow</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Black</Link></li>
                                                    <li><Link scroll={false} href="#!" className="ti-dropdown-item">Blue</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-grow w-[75%] flex items-end gap-1 overflow-hidden">
                                                <div className=" text-textmuted dark:text-textmuted/50"><span className="me-1">4</span>&times;</div>
                                                <div className="flex-grow text-[0.875rem] mb-0 overflow-hidden truncate">$55.00</div>
                                            </div>
                                            <div className="counter-group-1 justify-end" role="group">
                                                <button type="button" className="counter-btn btn-decrement min-w-fit"><i className="ti ti-minus"></i></button>
                                                <input type="text" className="counter-input" value="4" readOnly />
                                                <button type="button" className="counter-btn btn-increment min-w-fit"><i className="ti ti-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10 flex items-center justify-between font-medium flex-wrap">
                        <div className="min-w-fit">
                            <span className="text-textmuted dark:text-textmuted/50">Total Items:</span>
                            <span className="ms-2">8</span>
                        </div>
                        <div className="min-w-fit">
                            <Link scroll={false} href="#!" className="text-primary">Shop More <i className="ti ti-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                        <p className="mb-2 text-textmuted dark:text-textmuted/50">Have a coupon code? Enter below</p>
                        <div className="input-group mb-4">
                            <input type="text" className="form-control !border-s" placeholder="Coupon code" />
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary btn-wave !m-0">Check</Link>
                        </div>
                        <div className="flex items-center justify-between font-semibold mb-2">
                            <span>Sub total</span>
                            <span>$624</span>
                        </div>
                        <div className="flex items-center justify-between mb-2  text-textmuted dark:text-textmuted/50">
                            <span>Delivery Charges:</span>
                            <span>+$5.03</span>
                        </div>
                        <div className="flex items-center justify-between  text-textmuted dark:text-textmuted/50">
                            <span>Discount:</span>
                            <span>-$10.08</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-primary px-4 py-2 font-semibold text-[1.125rem]">
                        <span>Total:</span>
                        <span>$773.00</span>
                    </div>
                    <div className="p-4 border-t border-defaultborder dark:border-defaultborder/10">
                        <div className="flex items-center gap-2">
                            <Link scroll={false} href="/ecommerce/customer/cart" className="flex-grow ti-btn ti-btn-light !text-dark">View Cart <i className="ti ti-shopping-cart ms-1"></i></Link>
                            <Link scroll={false} href="/ecommerce/customer/checkout" className="flex-grow ti-btn ti-btn-primary">Checkout <i className="ti ti-arrow-right ms-1"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::Cart-offcanvs --> */}
        </Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Ecommerceheader);

// export default Ecommerceheader