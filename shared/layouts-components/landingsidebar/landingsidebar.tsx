"use client"
import store from '@/shared/redux/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState, } from 'react'
import { Ecommercemenuitems } from '../ecommercesidebar/sidebardata';
import { ThemeChanger } from '@/shared/redux/action';
import { connect } from 'react-redux';
import Image from 'next/image';
import nextConfig from '@/next.config';

const Landingsidebar = ({ ThemeChanger }: any) => {
    let { basePath } = nextConfig;
    const Currentpath = usePathname();

    const overlayRef = useRef<HTMLElement | null>(null);
    function menuClose() {
        const theme = store.getState().reducer;
        if (window.innerWidth <= 992) {
            ThemeChanger({ ...theme, toggled: "close" });
        }
        if (overlayRef.current) {
            overlayRef.current.classList.remove("active");
        }
        if (theme.dataNavLayout == "horizontal" || theme.dataNavStyle == "menu-click" || theme.dataNavStyle == "icon-click") {
            closeMenu();
        }
    }

    const [menuitems, setMenuitems] = useState(Ecommercemenuitems);
    function closeMenu() {
        const closeMenudata = (items: any) => {
            items?.forEach((item: any) => {
                item.active = false;
                closeMenudata(item.children);
            });
        };
        closeMenudata(Ecommercemenuitems);
        setMenuitems((arr: any) => [...arr]);
    }


    useEffect(() => {
        function handleResize() {

            if (window.innerWidth <= 992) {
                const theme = store.getState().reducer;
                ThemeChanger({ ...theme, "toggled": "close", "dataNavLayout": "horizontal" });
            } else {
                const theme = store.getState().reducer;
                ThemeChanger({ ...theme, "toggled": "open", "dataNavLayout": "horizontal" });
            }

        }

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        // handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const landingpages = () => {
            if (window.scrollY > 30 && document.querySelector(".app-sidebar")) {
                let Scolls = document?.querySelectorAll(".sticky");
                Scolls.forEach((e) => {
                    e.classList.add("sticky-pin");
                });
            } else {
                let Scolls = document?.querySelectorAll(".sticky");
                Scolls.forEach((e) => {
                    e.classList.remove("sticky-pin");
                });
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", landingpages);
        }
    });

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('side-menu__item')) {
                const parent = target.parentElement;
                if (parent) {
                    const ulElement = parent.querySelector('ul');
                    if (ulElement && window.innerWidth <= 991) {
                        ulElement.classList.toggle('d-block');
                    }
                    console.log(ulElement?.parentNode?.querySelector('ul'), "sibling")
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
    return (
        <Fragment>
            <div id="responsive-overlay" onClick={() => menuClose()}></div>

            {/* classifieds sidebar */}
            {/* <!-- Start::app-sidebar --> */}
            {Currentpath.includes('classifieds') ?

                <aside
                    className="app-sidebar sticky !bg-white  !border-defaultborder dark:!border-defaultborder/10 dark:!bg-bodybg !py-2 !border-b"
                    id="sidebar">
                    <div className="container !p-0">
                        {/* <!-- Start::main-sidebar --> */}
                        <div className="main-sidebar !mx-0 !w-full">

                            {/* <!-- Start::nav --> */}
                            <nav className="main-menu-container nav nav-pills sub-open !justify-start flex-wrap">
                                <div className="landing-logo-container">
                                    <div className="horizontal-logo">
                                        <Link scroll={false} href="/dashboards/sales" className="header-logo relative">
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-logo !block" />
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-dark" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-left" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                </svg></div>

                                <ul className="main-menu !flex-grow">
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide">
                                        <Link scroll={false} className="side-menu__item" href="/ecommerce/customer/landing-page">
                                            <span className="side-menu__label">Home</span>
                                        </Link>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Categories</span>
                                        </Link>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">All Ads</span>
                                        </Link>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide has-sub">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Pages</span>
                                            <i className="fe fe-chevron-down side-menu__angle"></i>
                                        </Link>
                                        <ul className="slide-menu child1">
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Abous Us</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">FAQ</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Services</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Add Details</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Add Post</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Checkout</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">404</Link>
                                            </li>
                                            <li className="slide has-sub">
                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2
                                                    <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                <ul className="slide-menu child2">
                                                    <li className="slide">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-1</Link>
                                                    </li>
                                                    <li className="slide has-sub">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-2
                                                            <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                        <ul className="slide-menu child3">
                                                            <li className="slide">
                                                                <Link scroll={false} href="#!"
                                                                    className="side-menu__item">Level-2-2-1</Link>
                                                            </li>
                                                            <li className="slide has-sub">
                                                                <Link scroll={false} href="#!"
                                                                    className="side-menu__item">Level-2-2-2</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide has-sub">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Blog</span>
                                            <i className="fe fe-chevron-down side-menu__angle"></i>
                                        </Link>
                                        <ul className="slide-menu child1">
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Blog</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Blog Details</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Blog Post</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                    {/* <!-- Start::slide --> */}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Contact Us</span>
                                        </Link>
                                    </li>
                                    {/* <!-- End::slide --> */}
                                </ul>
                                <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                                    </path>
                                </svg>
                                </div>
                                <div className="lg:flex hidden items-center">
                                    {/* <!-- Start::header-link --> */}
                                    <Link scroll={false} href="#!" className="hs-dropdown-toggle me-3" data-hs-overlay="#searchModal" >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" width="20px"
                                            viewBox="0 0 24 24">
                                            <path fill="var(--primary-color)"
                                                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                                        </svg>
                                    </Link>
                                    {/* <!-- End::header-link --> */}
                                    {/* <!-- Start::dropdown --> */}
                                    <div className="country-selector ti-dropdown hs-dropdown">
                                        {/* <!-- Start::dropdown-toggle --> */}
                                        <Link scroll={false} href="#!"
                                            className="ti-btn btn-wave ti-btn-light btn-country !border dropdown-toggle me-2"
                                            data-bs-toggle="dropdown">
                                            English <i className="ri-arrow-down-s-line align-middle inline-block"></i>
                                        </Link>
                                        {/* <!-- End::dropdown-toggle --> */}
                                        <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden py-2"
                                            data-popper-placement="none">
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    English
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Spanish
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    French
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    German
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Italian
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Russian
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- End::dropdown --> */}

                                    <div className="btn-list xl:flex hidden">
                                        <Link scroll={false} href="/authentication/sign-in/basic" className="ti-btn btn-wave ti-btn-light !border">
                                            Login / Register
                                        </Link>
                                        <button className="ti-btn btn-wave ti-btn-primary">
                                            <i className="bi bi-plus-circle me-2"></i>Post Your Ad
                                        </button>
                                    </div>
                                    <Link scroll={false} href="#!" aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-soft-secondary categories-icon switcher-icon !m-0" data-hs-overlay="#hs-overlay-switcher">
                                        <i className="ti ti-settings"></i>
                                    </Link>
                                </div>
                            </nav>
                            {/* <!-- End::nav --> */}

                        </div>
                        {/* <!-- End::main-sidebar --> */}
                    </div>
                </aside>
                : ""
            }
            {/* <!-- End::app-sidebar --> */}
            {/* end classifieds sidebar */}

            {/* Domain sidebar */}
            {/* <!-- Start::app-sidebar --> */}
            {Currentpath.includes('domain') ?
                <aside
                    className="app-sidebar sticky !bg-white  !border-defaultborder dark:!border-defaultborder/10 dark:!bg-bodybg !py-2 !border-b"
                    id="sidebar">
                    <div className="container !p-0">
                        {/*<!-- Start::main-sidebar -->*/}
                        <div className="main-sidebar !mx-0 !w-full">

                            {/*<!-- Start::nav -->*/}
                            <nav className="main-menu-container nav nav-pills sub-open !justify-between flex-wrap">
                                <div className="landing-logo-container">
                                    <div className="horizontal-logo">
                                        <Link scroll={false} href="/dashboards/sales" className="header-logo relative">
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-logo !block" />
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-dark" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-left" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                </svg></div>

                                <ul className="main-menu ">
                                    <li className="slide">
                                        <Link scroll={false} className="side-menu__item" href="/domain/landing/">
                                            <span className="side-menu__label">Home</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Buy Domains</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Sell Domains</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Blog</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide has-sub">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Pages</span>
                                            <i className="fe fe-chevron-down side-menu__angle"></i>
                                        </Link>
                                        <ul className="slide-menu child1">
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Abous Us</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">FAQ</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Services</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Add Details</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Add Post</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Checkout</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">404</Link>
                                            </li>
                                            <li className="slide has-sub">
                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2
                                                    <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                <ul className="slide-menu child2">
                                                    <li className="slide">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-1</Link>
                                                    </li>
                                                    <li className="slide has-sub">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-2
                                                            <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                        <ul className="slide-menu child3">
                                                            <li className="slide">
                                                                <Link scroll={false} href="#!"
                                                                    className="side-menu__item">Level-2-2-1</Link>
                                                            </li>
                                                            <li className="slide has-sub">
                                                                <Link scroll={false} href="#!"
                                                                    className="side-menu__item">Level-2-2-2</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Contact Us</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                </ul>
                                <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                                    </path>
                                </svg>
                                </div>
                                <div className="lg:flex hidden items-center">
                                    {/*<!-- Start::header-link -->*/}
                                    <Link scroll={false} href="#!" className="hs-dropdown-toggle me-3"
                                        data-hs-overlay="#searchModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" width="20px"
                                            viewBox="0 0 24 24">
                                            <path fill="var(--primary-color)"
                                                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                                        </svg>
                                    </Link>
                                    {/*<!-- End::header-link -->*/}
                                    {/*<!-- Start::dropdown -->*/}
                                    <div className="country-selector ti-dropdown hs-dropdown">
                                        {/*<!-- Start::dropdown-toggle -->*/}
                                        <Link scroll={false} href="#!"
                                            className="ti-btn btn-wave ti-btn-light btn-country !border dropdown-toggle me-2"
                                            data-bs-toggle="dropdown">
                                            English <i className="ri-arrow-down-s-line align-middle inline-block"></i>
                                        </Link>
                                        {/*<!-- End::dropdown-toggle -->*/}
                                        <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden py-2"
                                            data-popper-placement="none">
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    English
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Spanish
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    French
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    German
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Italian
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Russian
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*<!-- End::dropdown -->*/}

                                    <div className="btn-list xl:flex hidden">
                                        <Link scroll={false} href="/authentication/sign-in/basic" className="ti-btn btn-wave ti-btn-light !border">
                                            Login
                                        </Link>
                                        <button className="ti-btn btn-wave ti-btn-primary">
                                            Register
                                        </button>
                                    </div>

                                    <Link scroll={false} href="#!"
                                        className="ti-btn ti-btn-icon ti-btn-soft-secondary categories-icon switcher-icon !m-0"
                                        data-hs-overlay="#hs-overlay-switcher">
                                        <i className="ti ti-settings"></i>
                                    </Link>
                                </div>
                            </nav>
                            {/*<!-- End::nav -->*/}

                        </div>
                        {/*<!-- End::main-sidebar -->*/}
                    </div>
                </aside>
                : ""
            }
            {/* <!-- End::app-sidebar --> */}
            {/* End Domain sidebar */}

            {/* Marketplace sidebar */}
            {/* <!-- Start::app-sidebar --> */}
            {Currentpath.includes('market-place') ?
                <aside className="app-sidebar sticky !bg-white  !border-defaultborder dark:!border-defaultborder/10 dark:!bg-bodybg !py-2 !border-b" id="sidebar">
                    <div className="container !p-0">
                        {/*<!-- Start::main-sidebar -->*/}
                        <div className="main-sidebar !mx-0 !w-full">

                            {/*<!-- Start::nav -->*/}
                            <nav className="main-menu-container nav nav-pills sub-open !justify-start flex-wrap">
                                <div className="landing-logo-container">
                                    <div className="horizontal-logo">
                                        <Link scroll={false} href="/dashboards/sales" className="header-logo relative">
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-logo !block" />
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-dark" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-left" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path> </svg></div>

                                <ul className="main-menu !flex-grow">
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} className="side-menu__item" href="/ecommerce/customer/landing-page/">
                                            <span className="side-menu__label">Home</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="/ecommerce/customer/about/" className="side-menu__item">
                                            <span className="side-menu__label">Categories</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Shop</span>
                                        </Link>
                                    </li>

                                    
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide has-sub">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Pages</span>
                                            <i className="fe fe-chevron-down side-menu__angle"></i>
                                        </Link>
                                        <ul className="slide-menu child1">
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Abous Us</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Terms&Conditions</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Privacy Policy</Link>
                                            </li>
                                            <li className="slide has-sub">
                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2
                                                    <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                <ul className="slide-menu child2">
                                                    <li className="slide">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-1</Link>
                                                    </li>
                                                    <li className="slide has-sub">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-2
                                                            <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                        <ul className="slide-menu child3">
                                                            <li className="slide">
                                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2-2-1</Link>
                                                            </li>
                                                            <li className="slide has-sub">
                                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2-2-2</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Subscription</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide --> */}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Contact Us</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                </ul>
                                <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                                    </path>
                                </svg>
                                </div>
                                <div className="lg:flex hidden items-center">
                                    {/*<!-- Start::header-link -->*/}
                                    <Link scroll={false} href="#!" className="hs-dropdown-toggle me-3"
                                        data-hs-overlay="#searchModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" width="20px" viewBox="0 0 24 24"><path fill="var(--primary-color)" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" /></svg>
                                    </Link>
                                    {/*<!-- End::header-link -->*/}
                                    {/*<!-- Start::dropdown -->*/}
                                    <div className="country-selector ti-dropdown hs-dropdown">
                                        {/*<!-- Start::dropdown-toggle -->*/}
                                        <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-light btn-country !border dropdown-toggle me-2" data-bs-toggle="dropdown">
                                            English <i className="ri-arrow-down-s-line align-middle inline-block"></i>
                                        </Link>
                                        {/*<!-- End::dropdown-toggle -->*/}
                                        <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden py-2" data-popper-placement="none">
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    English
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Spanish
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    French
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    German
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Italian
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Russian
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*<!-- End::dropdown -->  */}

                                    <div className="btn-list xl:flex hidden">
                                        <Link scroll={false} href="/authentication/sign-in/basic" className="ti-btn btn-wave ti-btn-light !border">
                                            Login / Register
                                        </Link>
                                        <button className="ti-btn btn-wave ti-btn-primary">
                                            <i className="bi bi-plus-circle me-2"></i>Become A Seller
                                        </button>
                                    </div>

                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-soft-secondary categories-icon switcher-icon !m-0"
                                        data-hs-overlay="#hs-overlay-switcher">
                                        <i className="ti ti-settings"></i>
                                    </Link>
                                </div>
                            </nav>
                            {/*<!-- End::nav -->*/}

                        </div>
                        {/*<!-- End::main-sidebar -->*/}
                    </div>
                </aside>
                : ""}

            {/* <!-- End::app-sidebar --> */}
            {/* End Marketplace sidebar */}

            {/* Realestate sidebar */}
            {/* <!-- Start::app-sidebar --> */}
            {Currentpath.includes('real-estate') ?
                <aside className="app-sidebar sticky !bg-white  !border-defaultborder dark:!border-defaultborder/10 dark:!bg-bodybg !py-2 !border-b" id="sidebar">
                    <div className="container !p-0">
                        {/*<!-- Start::main-sidebar -->*/}
                        <div className="main-sidebar !mx-0 !w-full">

                            {/*<!-- Start::nav -->*/}
                            <nav className="main-menu-container nav nav-pills sub-open !justify-start flex-wrap">
                                <div className="landing-logo-container">
                                    <div className="horizontal-logo">
                                        <Link scroll={false} href="/dashboards/sales" className="header-logo relative">
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-logo !block" />
                                            <Image fill src="/assets/images/logo.png" alt="logo" className="desktop-dark" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-left" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path> </svg></div>

                                <ul className="main-menu !flex-grow">
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} className="side-menu__item" href="/ecommerce/customer/landing-page">
                                            <span className="side-menu__label">Home</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="/ecommerce/customer/about/" className="side-menu__item">
                                            <span className="side-menu__label">Properties</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Buy</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Rent</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide has-sub">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Pages</span>
                                            <i className="fe fe-chevron-down side-menu__angle"></i>
                                        </Link>
                                        <ul className="slide-menu child1">
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Abous Us</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Terms & Conditions</Link>
                                            </li>
                                            <li className="slide">
                                                <Link scroll={false} href="#!" className="side-menu__item">Privacy Policy</Link>
                                            </li>
                                            <li className="slide has-sub">
                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2
                                                    <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                <ul className="slide-menu child2">
                                                    <li className="slide">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-1</Link>
                                                    </li>
                                                    <li className="slide has-sub">
                                                        <Link scroll={false} href="#!" className="side-menu__item">Level-2-2
                                                            <i className="fe fe-chevron-right side-menu__angle"></i></Link>
                                                        <ul className="slide-menu child3">
                                                            <li className="slide">
                                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2-2-1</Link>
                                                            </li>
                                                            <li className="slide has-sub">
                                                                <Link scroll={false} href="#!" className="side-menu__item">Level-2-2-2</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Agents</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                    {/*<!-- Start::slide -->*/}
                                    <li className="slide">
                                        <Link scroll={false} href="#!" className="side-menu__item">
                                            <span className="side-menu__label">Contact Us</span>
                                        </Link>
                                    </li>
                                    {/*<!-- End::slide -->*/}
                                </ul>
                                <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                                    </path>
                                </svg>
                                </div>
                                <div className="lg:flex hidden items-center">
                                    {/*<!-- Start::header-link -->*/}
                                    <Link scroll={false} href="#!" className="hs-dropdown-toggle me-3"
                                        data-hs-overlay="#searchModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" width="20px" viewBox="0 0 24 24"><path fill="var(--primary-color)" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" /></svg>
                                    </Link>
                                    {/*<!-- End::header-link -->*/}
                                    {/*<!-- Start::dropdown -->*/}
                                    <div className="country-selector ti-dropdown hs-dropdown">
                                        {/*<!-- Start::dropdown-toggle -->*/}
                                        <Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-light btn-country !border dropdown-toggle me-2" data-bs-toggle="dropdown">
                                            English <i className="ri-arrow-down-s-line align-middle d-inline-block"></i>
                                        </Link>
                                        {/*<!-- End::dropdown-toggle -->*/}
                                        <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden py-2" data-popper-placement="none">
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    English
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Spanish
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    French
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    German
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Italian
                                                </Link>
                                            </li>
                                            <li>
                                                <Link scroll={false} className="ti-dropdown-item" href="#!">
                                                    Russian
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*<!-- End::dropdown -->  */}

                                    <div className="btn-list xl:flex hidden">
                                        <Link scroll={false} href="/authentication/sign-in/basic" className="ti-btn btn-wave ti-btn-light !border">
                                            Login / Register
                                        </Link>
                                        <button className="ti-btn btn-wave ti-btn-primary">
                                            <i className="bi bi-plus-circle me-2"></i>Post Property
                                        </button>
                                    </div>

                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-soft-secondary categories-icon switcher-icon !m-0"
                                        data-hs-overlay="#hs-overlay-switcher">
                                        <i className="ti ti-settings"></i>
                                    </Link>
                                </div>
                            </nav>
                            {/*<!-- End::nav -->*/}

                        </div>
                        {/*<!-- End::main-sidebar -->*/}
                    </div>
                </aside>
                : ""}

            {/* <!-- End::app-sidebar --> */}
            {/* End Realestate sidebar */}

            <div id="searchModal" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
                    <div className="ti-modal-content">
                        <div className="ti-modal-body px-4">
                            <span className="input-group">
                                <input type="text" className="form-control form-control-lg !border-0 !shadow-none" placeholder="Search" aria-label="Username" />
                                <Link scroll={false} href="#!" className="input-group-text border-0" id="voice-search"><i className="fe fe-mic header-link-icon"></i></Link>
                            </span>
                            <div className="mt-4">
                                <p className="font-semibold text-textmuted mb-2">Are You Looking For...</p>
                                <Link scroll={false} href="#!" className="search-tags !me-1">Popular Articles</Link>
                                <Link scroll={false} href="#!" className="search-tags !me-1">Recent Articles</Link>
                                <Link scroll={false} href="#!" className="search-tags">News and Updates</Link>
                            </div>
                        </div>
                        <div className="ti-modal-footer">
                            <button className="ti-btn ti-btn-lg ti-btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Landingsidebar);
// export default Landingsidebar