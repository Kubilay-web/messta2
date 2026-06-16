"use client"
import { RelatedProducts } from "@/shared/data/apps/market-place/details-data";
import React, { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import Slider, { SliderThumb } from "@mui/material/Slider";
import SpkMarketplaceProduct from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-marketplace-product";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

const Search = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize with -1 for no item expanded

    const toggleDropdown = (index:any) => {
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
                                                className="ti-btn ti-btn-lg btn-wave ti-btn-white !py-2 !bg-white dark:!bg-bodybg shadow-none leading-[2.43rem] rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none categorydropdown !border-0 !m-0"
                                            >
                                                <i className="ri-function-line me-2 text-primary"></i>All Categories<i
                                                    className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="categories-dropdowns">
                                                <li className="category-dropdown">
                                                    <ul className="main-dropdown" style={{ display: isOpen ? 'block' : 'none' }}  id="dropdown-toggle">
                                                        <li onClick={() => toggleDropdown(0)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 0 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-code-line"></i></span>Scripts & Code
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">Angular</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">CSS</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Django</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Java</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(1)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 1 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-shirt-line"></i></span>
                                                                Themes
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">Drupal</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Ghost</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">HTML</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Joomla</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Magento</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(2)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 2 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-bear-smile-line"></i></span>
                                                                Plugins
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">WooCommerce</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Wordpress</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">HTML</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Joomla</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Magento</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li onClick={() => toggleDropdown(3)}>
                                                            <div className={`categories-dropdowns__item ${expandedIndex === 3 ? 'is-expanded' : ''}`}>
                                                                <span className="me-2"><i className="ri-community-line"></i></span>
                                                                Admin Dashboards
                                                                <span className="float-end"><i className="bi bi-chevron-right"></i></span>
                                                            </div>
                                                            <ul className="category-menu">
                                                                <li><Link scroll={false} href="#!" className="category-item">HTML</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">React</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">PHP</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Angular</Link></li>
                                                                <li><Link scroll={false} href="#!" className="category-item">Laravel</Link></li>
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
                                        <button
                                            className="ti-btn ti-btn-lg ti-btn-secondary !border-0 shadow-sm search-btn !m-0"
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

            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4">
                <div className="container">
                    <Seo title={"Search"} />
                    <Pageheader breadcrumbs={['Apps', 'Marketplace']} currentpage="Search" Updated={true} />
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body p-3">
                                    <div className="grid grid-cols-12 gap-x-6 items-center gap-y-2">
                                        <div className="lg:col-span-8 col-span-12">
                                            <div className="flex">
                                                <h5 className="font-semibold mb-0"><span className="font-normal">Showing</span> 3456 Items</h5>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-4 col-span-12 lg:text-end">
                                            <div className="btn-group ti-dropdown hs-dropdown">
                                                <button className="ti-btn ti-btn-outline-light !border !text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Sort By<i className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                                </button>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Best Seller</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most Relevant</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price Low to High</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price High to Low</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Best Rated</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box products-navigation-card">
                                <div className="box-body !p-0">
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Categories</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-1" defaultChecked />
                                                <label className="form-check-label" htmlFor="c-1">
                                                    HTML
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,712</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-2" />
                                                <label className="form-check-label" htmlFor="c-2">
                                                    Ecommerce
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">536</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="c-3">
                                                    Scripts & Code
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">18,289</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-4" defaultChecked />
                                                <label className="form-check-label" htmlFor="c-4">
                                                    Wordpress Pugins
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">3,453</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-5" />
                                                <label className="form-check-label" htmlFor="c-5">
                                                    Wordpress Themes
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">7,165</span>
                                            </div>
                                            <div id="hs-show-hide-industry-heading"
                                                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                            >
                                                <div className="form-check !mb-2 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="c-6" />
                                                    <label className="form-check-label" htmlFor="c-6">
                                                        React
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">5,964</span>
                                                </div>
                                                <div className="form-check !mb-2 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="c-7" />
                                                    <label className="form-check-label" htmlFor="c-7">
                                                        Vuejs
                                                    </label>
                                                    <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,123</span>
                                                </div>
                                            </div>
                                            <Link scroll={false} className="ecommerce-more-link hs-collapse-toggle inline-flex items-center gap-x-2"
                                                href="#!" id="hs-show-hide-industry"
                                                data-hs-collapse="#hs-show-hide-industry-heading" role="button">MORE</Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Sales</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-1" />
                                                <label className="form-check-label" htmlFor="ty-1">
                                                    No Sales
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="ty-2">
                                                    Low
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-3" />
                                                <label className="form-check-label" htmlFor="ty-3">
                                                    High
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-4" defaultChecked />
                                                <label className="form-check-label" htmlFor="ty-4">
                                                    Medium
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">4,531</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-5" />
                                                <label className="form-check-label" htmlFor="ty-5">
                                                    Top Sellers
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
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
                                    <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Date Added</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-1" defaultChecked />
                                                <label className="form-check-label" htmlFor="j-1">
                                                    Any Date
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">512</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="j-2">
                                                    Last Week
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,186</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="j-3">
                                                    Last Month
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">734</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-4" />
                                                <label className="form-check-label" htmlFor="j-4">
                                                    Last Year
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="font-semibold mb-0">Price</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-1" />
                                                <label className="form-check-label" htmlFor="q-1">
                                                    All
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="q-2">
                                                    Free
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-3" />
                                                <label className="form-check-label" htmlFor="q-3">
                                                    Premium
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-6" />
                                                <label className="form-check-label" htmlFor="q-6">
                                                    Price Drop
                                                </label>
                                                <span className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {RelatedProducts.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkMarketplaceProduct card={card} />
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
                                    <li className="page-item"><Link scroll={false} className="page-link active" href="#!">1</Link></li>
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
                            <h3 className="font-semibold mb-2 text-white">&#128073; Browse the top template to build the awesome applications
                            </h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                            magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                            sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <div className="btn-list">
                            <Link scroll={false} href="/market-place/search/" className="ti-btn ti-btn-lg ti-btn-light"><i className="bi bi-search me-1"></i> Search Products</Link>
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-danger"><i className="bi bi-send me-1"></i> Signup Now</Link>
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