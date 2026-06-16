"use client"
import SpkPropertyCard from "@/shared/@spk-reusable-components/apps/reusable-realestate/spk-property-card";
import { RealProperties } from "@/shared/data/apps/real-estate/detailsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import Image from "next/image";

const Search = () => {


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
                                        <div className="input-group inline-flex group-search xl:flex gap-4 mb-5">
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
                                                    className="form-control rounded-md  shadow-none !border-0 border-e !border-s"
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
                                                    <div className="ti-dropdown hs-dropdown ad-dropdown custom-locaton">
                                                        <Link scroll={false} href="#!"
                                                            className="ti-btn text-default btn-wave"
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

            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4 !bg-white dark:!bg-bodybg">
                <div className="container">
                    <Seo title={"Realestate Search"} />
                    <Pageheader breadcrumbs={['Apps', 'Real Estate']} currentpage="Search" Updated={true} />
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}


            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6">
                <div className="container">
                    <div className="box">
                        <div className="box-body !p-4">
                            <div className="flex gap-1 flex-wrap">
                                <h5 className="font-normal mb-0">Showing <span className="font-semibold">3,456
                                    Properties</span> for sale in Georgia</h5>
                                <div className="btn-group ti-dropdown hs-dropdown ms-auto">
                                    <button
                                        className="ti-btn ti-btn-outline-light !text-dark !border dropdown-toggle !m-0"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By <i
                                            className="ri-arrow-down-s-line align-middle ms-2 inline-block"></i>
                                    </button>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} className="ti-dropdown-item"
                                            href="#!">Popularity</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most
                                            Relevant</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price Low
                                            to High</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price High
                                            to Low</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Recently
                                            Added</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box products-navigation-card">
                                <div className="box-body !p-0">
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Property Type</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="c-1">
                                                    Apartments
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">2,712</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-2" />
                                                <label className="form-check-label" htmlFor="c-2">
                                                    Villas
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">536</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="plots-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="plots-3">
                                                    Plots
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">18,289</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="duplex-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="duplex-3">
                                                    Duplex
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">18,289</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Posted By</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-1" />
                                                <label className="form-check-label" htmlFor="ty-1">
                                                    Builder
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="ty-2">
                                                    Broker
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="ty-3" />
                                                <label className="form-check-label" htmlFor="ty-3">
                                                    Owner
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Budget Range</h6>
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
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Added Date</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-1">
                                                    Any Date
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">512</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-2">
                                                    In 24 Hours
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">2,186</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-3"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-3">
                                                    In A Week
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">734</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-4" />
                                                <label className="form-check-label" htmlFor="j-4">
                                                    In A Month
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Available From</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="availablefrom-1" />
                                                <label className="form-check-label" htmlFor="availablefrom-1">
                                                    Ready to Move
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">512</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="availablefrom-2" />
                                                <label className="form-check-label" htmlFor="availablefrom-2">
                                                    Within 1 Month
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">2,186</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="availablefrom-3" defaultChecked />
                                                <label className="form-check-label" htmlFor="availablefrom-3">
                                                    Within 3 Months
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">734</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="availablefrom-4" />
                                                <label className="form-check-label" htmlFor="availablefrom-4">
                                                    Within 6 Months
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="availablefrom-5" />
                                                <label className="form-check-label" htmlFor="availablefrom-5">
                                                    Within 1 Year
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Furnishing Status</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="furnished-1" />
                                                <label className="form-check-label" htmlFor="furnished-1">
                                                    Fully Furnished
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="furnished-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="furnished-2">
                                                    Semi Furnished
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="furnished-3" />
                                                <label className="form-check-label" htmlFor="furnished-3">
                                                    Unfurnished
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h6 className="font-semibold mb-0">Beds</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="beds-1" />
                                                <label className="form-check-label" htmlFor="beds-1">
                                                    1BHK
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="beds-2" defaultChecked />
                                                <label className="form-check-label" htmlFor="beds-2">
                                                    2BHK
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-2 !flex  items-center">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="beds-3" />
                                                <label className="form-check-label" htmlFor="beds-3">
                                                    3BHK
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="beds-4" />
                                                <label className="form-check-label" htmlFor="beds-4">
                                                    4BHK
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" value=""
                                                    id="beds-5" />
                                                <label className="form-check-label" htmlFor="beds-5">
                                                    4BHK +
                                                </label>
                                                <span
                                                    className="badge bg-light text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {RealProperties.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12">
                                        <SpkPropertyCard card={card} />
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