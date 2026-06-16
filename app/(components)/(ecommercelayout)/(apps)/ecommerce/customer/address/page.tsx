"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Address = () => {

    //selectdata
    const Countrydata = [
        { value: 'India', label: 'India' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'Usa', label: 'Usa' },
        { value: 'Argentina', label: 'Argentina' },
    ]

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Address"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Address" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4 page-breadcrumb">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box">
                                <div className="sm:flex items-start p-4">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded online me-3">
                                            <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="main-profile-info flex-fill">
                                        <div className="font-semibold mb-1 h6">Jack Miller <div className="hs-tooltip ti-main-tooltip">
                                            <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                    role="tooltip">
                                                    Verified User
                                                </span>
                                            </Link>
                                        </div></div>
                                        <p className="mb-0">Member Since 2005</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <nav className="nav nav-tabs flex !flex-col candidateprofile-nav">
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/customer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" opacity="0.2" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,96V64a40,40,0,0,1,80,0V96" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>My Orders</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/wishlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    opacity="0.2" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>My Wishlist</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/order-tracking">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <circle cx="200" cy="200" r="24" opacity="0.2" />
                                                <circle cx="200" cy="200" r="24" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path d="M72,56h96a32,32,0,0,1,0,64H72a40,40,0,0,0,0,80H176" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Order Tracking</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/refunds">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" />
                                                <path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" />
                                                <line x1="128" y1="24" x2="128" y2="48" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="128" y1="208" x2="128" y2="232" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path
                                                    d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Refunds</Link>
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/customer/address">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M208,32H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V40A8,8,0,0,0,208,32ZM136,144a32,32,0,1,1,32-32A32,32,0,0,1,136,144Z"
                                                    opacity="0.2" />
                                                <circle cx="136" cy="112" r="32" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="72" x2="56" y2="72" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="128" x2="56" y2="128" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="32" y1="184" x2="56" y2="184" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,168a60,60,0,0,1,96,0" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <rect x="40" y="48" width="192" height="160" rx="8"
                                                    transform="translate(264 -8) rotate(90)" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Address Book</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/settings/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
                                                    opacity="0.2" />
                                                <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path
                                                    d="M130.05,206.11c-1.34,0-2.69,0-4,0L94,224a104.61,104.61,0,0,1-34.11-19.2l-.12-36c-.71-1.12-1.38-2.25-2-3.41L25.9,147.24a99.15,99.15,0,0,1,0-38.46l31.84-18.1c.65-1.15,1.32-2.29,2-3.41l.16-36A104.58,104.58,0,0,1,94,32l32,17.89c1.34,0,2.69,0,4,0L162,32a104.61,104.61,0,0,1,34.11,19.2l.12,36c.71,1.12,1.38,2.25,2,3.41l31.85,18.14a99.15,99.15,0,0,1,0,38.46l-31.84,18.1c-.65,1.15-1.32,2.29-2,3.41l-.16,36A104.58,104.58,0,0,1,162,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Settings</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="flex items-center justify-between flex-wrap mb-4 gap-2">
                                <div>
                                    <h5 className="font-semibold mb-0">My Addresses</h5>
                                </div>
                                <div>
                                    <button className="ti-btn ti-btn-primary" data-hs-overlay="#add-newaddress-modal"> <i className="ti ti-plus ms-1"></i> Add New Address</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box card-style-6">
                                        <div className="box-body !p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2 card-style-6-avatar">
                                                        <div className="min-w-fit">
                                                            <span className="avatar !rounded-full"><i className="ti ti-home text-[1rem]"></i></span>
                                                        </div>
                                                        <h6 className="text-[1rem] mb-0 font-semibold">Home</h6>
                                                    </div>
                                                </div>
                                                <div className="min-w-fit">
                                                    <div className="!flex gap-2 items-center">
                                                        <input className="form-check-input" type="radio" id="address1" name="default-address" defaultChecked />
                                                        <label className="form-check-label cursor-pointer" htmlFor="address1">Default</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="mb-1 font-semibold">Ruby Disousa</h6>
                                            <p className="mb-1 font-medium text-[0.8125rem]">rubyakuner@ginna.mail</p>
                                            <p className="mb-2 font-medium text-[0.8125rem]">+11-23-1116773</p>
                                            <p className="mb-0">
                                                H.No: 3-116/458, Golden Park, Marias St.,
                                                Near 12Amet Residency, 14756, United States Of America
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="box card-style-6">
                                        <div className="box-body !p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2 card-style-6-avatar">
                                                        <div className="min-w-fit">
                                                            <span className="avatar !rounded-full"><i className="ti ti-briefcase text-[1rem]"></i></span>
                                                        </div>
                                                        <h6 className="text-[1rem] mb-0 font-semibold">Work</h6>
                                                    </div>
                                                </div>
                                                <div className="min-w-fit">
                                                    <div className="!flex gap-2 items-center">
                                                        <input className="form-check-input" type="radio" id="address2" name="default-address" />
                                                        <label className="form-check-label cursor-pointer" htmlFor="address2">Default</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="mb-1 font-semibold">Ruby Disousa</h6>
                                            <p className="mb-1 font-medium text-[0.8125rem]">rubyakuner@ginna.mail</p>
                                            <p className="mb-2 font-medium text-[0.8125rem]">+11-23-1116773</p>
                                            <p className="mb-0">
                                                Taj Building, 3rd Floor, Room No: 3, Silver St.,
                                                Adugiahsuk, LICE, 14756, United States Of America
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store !me-2 relative">
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
            {/* <!-- End:: Section-2 --> */}


            <div id="add-newaddress-modal" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out  lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="ti-modal-title">
                                Add New Address
                            </h6>
                            <button type="button" className="hs-dropdown-toggle ti-modal-close-btn"
                                data-hs-overlay="#add-newaddress-modal">
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                        fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <div className="ti-modal-body !p-4">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="First-name" className="ti-form-label">First Name</label>
                                    <input type="text" className="form-control" id="First-name" placeholder="First Name" defaultValue="Jack Miller" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="Last-Name" className="ti-form-label">Last Name</label>
                                    <input type="text" className="form-control" id="Last-Name" placeholder="Last Name" defaultValue="andrewretail" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="email-address" className="ti-form-label">Email Address :</label>
                                    <input type="text" className="form-control" id="email-address" placeholder="xyz@gmail.com" defaultValue="json@gmail.com" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="phone-number" className="ti-form-label">Mobile Number :</label>
                                    <input type="text" className="form-control" id="phone-number" placeholder="*** *** ****" defaultValue="65432 76765" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="Country" className="ti-form-label">Country :</label>
                                    <SpkSelect option={Countrydata} mainClass="basic-multi-select" name="Country" id="Country"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Countrydata[0]]} />

                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="State" className="ti-form-label">State :</label>
                                    <input type="text" className="form-control" id="State" placeholder="State" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="Address" className="ti-form-label">Address :</label>
                                    <input type="text" className="form-control" id="Address" placeholder="Address" defaultValue="H.No: 3-116/458, Golden Park, USA" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="Zip-Code" className="ti-form-label">Zip Code :</label>
                                    <input type="text" className="form-control" id="Zip-Code" placeholder="Zip Code" defaultValue="1234" />
                                </div>
                            </div>
                        </div>
                        <div className="ti-modal-footer">
                            <button type="button" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" data-hs-overlay="#add-newaddress-modal">
                                Close
                            </button>
                            <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
                                Add Adress
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default Address;