"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Settings = () => {

    const Accounttype = [
        { value: 'Business', label: 'Business' },
        { value: 'Private', label: 'Private' },
    ]

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Settings"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Vendor']} currentpage="Settings" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
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
                                        <div className="font-semibold mb-1"><Link
                                            href="/ecommerce/vendor/profile/">Jack Miller</Link><div className="hs-tooltip ti-main-tooltip">
                                                <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                    <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                    <span
                                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                        role="tooltip">
                                                        Verified User
                                                    </span>
                                                </Link>
                                            </div></div>
                                        <p className="mb-1">Member Since 2005</p>
                                        <div className="flex items-center gap-4">
                                            <span className="badge badge-md bg-warning/[0.15] text-warning"><i
                                                className="ri-vip-crown-2-line vertical-middle me-1"></i> Basic</span>
                                            <Link href="/ecommerce/vendor/packages/" className="text-danger"><u>Upgrade
                                                Plan</u></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <nav className="nav nav-tabs flex !flex-col candidateprofile-nav">
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/vendor/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <path
                                                    d="M128,129.09,32.7,76.93a8,8,0,0,0-.7,3.25v95.64a8,8,0,0,0,4.16,7l88,48.18a8,8,0,0,0,3.84,1Z"
                                                    opacity="0.2"></path>
                                                <polyline points="32.7 76.92 128 129.08 223.3 76.92" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></polyline>
                                                <line x1="128" y1="129.09" x2="128" y2="231.97" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <path
                                                    d="M219.84,182.84l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18a8,8,0,0,1,4.16,7v95.64A8,8,0,0,1,219.84,182.84Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></path>
                                                <polyline points="81.56 48.31 176 100 176 152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></polyline>
                                            </svg>All Products
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/invoices/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <path d="M168,200V104h56v88a8,8,0,0,1-8,8Z" opacity="0.2"></path>
                                                <path
                                                    d="M64,56H40A16,16,0,0,0,24,72h0A16,16,0,0,0,40,88H56a16,16,0,0,1,16,16h0a16,16,0,0,1-16,16H28"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></path>
                                                <line x1="48" y1="48" x2="48" y2="56" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
                                                </line>
                                                <line x1="48" y1="120" x2="48" y2="128" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <path d="M96,56H224V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></path>
                                                <line x1="104" y1="104" x2="224" y2="104" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <line x1="80" y1="152" x2="224" y2="152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <line x1="168" y1="104" x2="168" y2="200" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                            </svg>Invoices
                                        </Link>
                                        <Link scroll={false} className="nav-link " href="/ecommerce/vendor/orders/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <rect x="32" y="48" width="192" height="160" rx="8" opacity="0.2">
                                                </rect>
                                                <rect x="32" y="48" width="192" height="160" rx="8" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></rect>
                                                <path d="M168,88a40,40,0,0,1-80,0" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
                                                </path>
                                            </svg>Orders
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/refund-requests/">
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
                                            </svg>Refunds
                                        </Link>
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/vendor/settings/">
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
                                            </svg>Settings
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Account Settings
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-x-6 gap-y-[3rem]">
                                        <div className="col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">General Settings :</h6>
                                            <div className="grid grid-cols-12 gap-x-6 mb-4">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <span className="text-[0.875rem] font-semibold mb-0">Account Type :</span>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Select the account type</p>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <SpkSelect option={Accounttype} mainClass="basic-multi-select" name="account-type-select" id="account-type-select"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Accounttype[0]]} />
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top mb-4 justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">Two Step Verification</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Two step verificatoin is very secured and restricts in happening faulty practices.</p>
                                                </div>
                                                <div className="custom-toggle-switch mt-3 toggle-sm ms-sm-2 ms-0">
                                                    <input id="two-step" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                    <label htmlFor="two-step" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top mb-4 justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">Recovery Mail</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Incase of forgetting password mails are sent to  heifo@gmail.com</p>
                                                </div>
                                                <div className="custom-toggle-switch mt-3 toggle-sm ms-sm-2 ms-0">
                                                    <input id="recovery-mail" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                    <label htmlFor="recovery-mail" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">SMS Recovery</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">SMS are sent to 9102312xx in case of recovery</p>
                                                </div>
                                                <div className="custom-toggle-switch mt-3 toggle-sm ms-sm-2 ms-0">
                                                    <input id="sms-recovery" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                    <label htmlFor="sms-recovery" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">Email Settings</h6>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="Productupdate" defaultChecked />
                                                        <label className="form-check-label" htmlFor="Productupdate">
                                                            Product Update Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="Productcomment" />
                                                        <label className="form-check-label" htmlFor="Productcomment">
                                                            Product Comment Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="Productreview" />
                                                        <label className="form-check-label" htmlFor="Productreview">
                                                            Product Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="Productbuyerreview" defaultChecked />
                                                        <label className="form-check-label" htmlFor="Productbuyerreview">
                                                            Buyer Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">Change Password</h6>
                                            <p className="text-[0.8125rem] mb-4">Password should be min of <b className="text-success font-semibold">8 digits<sup>*</sup></b>,atleast <b className="text-success font-semibold">One Capital letter<sup>*</sup></b> and <b className="text-success font-semibold">One Special Character<sup>*</sup></b> included.</p>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="sm:col-span-4 col-span-12 mb-2">
                                                    <label htmlFor="current-password" className="ti-form-label">Current Password</label>
                                                    <input type="text" className="form-control" id="current-password" placeholder="Current Password" />
                                                </div>
                                                <div className="sm:col-span-4 col-span-12 mb-2">
                                                    <label htmlFor="new-password" className="ti-form-label">New Password</label>
                                                    <input type="text" className="form-control" id="new-password" placeholder="New Password" />
                                                </div>
                                                <div className="sm:col-span-4 col-span-12 mb-0">
                                                    <label htmlFor="confirm-password" className="ti-form-label">Confirm Password</label>
                                                    <input type="text" className="form-control" id="confirm-password" placeholder="Confirm PAssword" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="float-end">
                                        <button className="ti-btn ti-btn-light m-1">
                                            Restore Defaults
                                        </button>
                                        <button className="ti-btn ti-btn-primary m-1">
                                            Save Changes
                                        </button>
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
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
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
        </Fragment>
    );
};

export default Settings;