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
        { value: 'Private', label: 'Private' },
        { value: 'Business', label: 'Business' },
    ]

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Settings"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Settings" />
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
                                    <div className="main-profile-info flex-grow">
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
                                        <Link scroll={false} className="nav-link " href="/ecommerce/customer/customer">
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
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/address">
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
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/customer/settings/">
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
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title flex-grow">
                                        Personal Information
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Profile 60% completed - <Link scroll={false} href="#!" className="text-primary text-[0.75rem]">Finish now</Link></p>
                                        <div className="progress progress-xs progress-animate">
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-col-12 sm:gap-x-6 gap-y-6 mb-6">
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
                                            <label htmlFor="Address" className="ti-form-label">Address :</label>
                                            <input type="text" className="form-control" id="Address" placeholder="Address" defaultValue="USA" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Zip-Code" className="ti-form-label">Zip Code :</label>
                                            <input type="text" className="form-control" id="Zip-Code" placeholder="Zip Code" defaultValue="1234" />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="mb-3">
                                                <span className="avatar avatar-lg avatar-rounded">
                                                    <Image fill src="../../../assets/images/faces/9.jpg" alt="" className="w-full h-full" />
                                                    <Link scroll={false} href="#!" className="badge rounded-pill bg-danger text-white avatar-badge"><i className="fe fe-x"></i></Link>
                                                </span>
                                            </div>
                                            <div className="btn-list">
                                                <div> <label htmlFor="small-file-input" className="sr-only">Choose file</label> <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-defaultborder focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-defaultborder dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                                    file:border-0
                                                   file:bg-light file:me-4
                                                   file:py-2 file:px-4
                                                   dark:file:bg-black/20 dark:file:text-white/50" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="bio" className="ti-form-label">Bio :</label>
                                            <textarea className="form-control" id="bio" rows={7} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit impedit, officiis non minima saepe voluptates a magnam enim sequi porro veniam ea suscipit dolorum vel mollitia voluptate iste nemo!"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="float-end">
                                        <button className="ti-btn ti-btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Account Settings
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-[3rem]">
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">General Settings :</h6>
                                            <div className="grid grid-cols-12 sm:gap-x-6">
                                                <div className="xl:col-span-2 col-span-12 !mb-6">
                                                    <span className="text-[0.875rem] font-semibold mb-0">Account Type :</span>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Select the account type</p>
                                                </div>
                                                <div className="xl:col-span-7 col-span-12 !mb-6">
                                                    <SpkSelect option={Accounttype} mainClass="basic-multi-select" name="account-type-select" id="account-type-select"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Accounttype[0]]} />


                                                </div>
                                                <div className="xl:col-span-11 col-span-12">
                                                    <div className="sm:flex block items-top mb-4 justify-between">
                                                        <div>
                                                            <p className="text-[0.875rem] mb-1 font-semibold">Two Step Verification</p>
                                                            <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Two step verificatoin is very secured and restricts in happening faulty practices.</p>
                                                        </div>
                                                        <div className="custom-toggle-switch toggle-sm sm:ms-2 ms-0">
                                                            <input id="two-step" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                            <label htmlFor="two-step" className="label-primary mb-1"></label>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex block items-top mb-4 justify-between">
                                                        <div>
                                                            <p className="text-[0.875rem] mb-1 font-semibold">Recovery Mail</p>
                                                            <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Incase of forgetting password mails are sent to  heifo@gmail.com</p>
                                                        </div>
                                                        <div className="custom-toggle-switch toggle-sm sm:ms-2 ms-0">
                                                            <input id="recovery-mail" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                            <label htmlFor="recovery-mail" className="label-primary mb-1"></label>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex block items-top justify-between">
                                                        <div>
                                                            <p className="text-[0.875rem] mb-1 font-semibold">SMS Recovery</p>
                                                            <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">SMS are sent to 9102312xx in case of recovery</p>
                                                        </div>
                                                        <div className="custom-toggle-switch toggle-sm sm:ms-2 ms-0">
                                                            <input id="sms-recovery" name="toggleswitchsize" type="checkbox" defaultChecked />
                                                            <label htmlFor="sms-recovery" className="label-primary mb-1"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-4 font-semibold text-primary">Email Settings</h6>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="Productupdate" defaultChecked />
                                                        <label className="form-check-label" htmlFor="Productupdate">
                                                            Product Update Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="Productcomment" />
                                                        <label className="form-check-label" htmlFor="Productcomment">
                                                            Product Comment Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="Productreview" />
                                                        <label className="form-check-label" htmlFor="Productreview">
                                                            Product Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="Productbuyerreview" defaultChecked />
                                                        <label className="form-check-label" htmlFor="Productbuyerreview">
                                                            Buyer Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">Change Password</h6>
                                            <p className="fs-13 mb-4">Password should be min of <b className="text-success font-semibold">8 digits<sup>*</sup></b>,atleast <b className="text-success font-semibold">One Capital letter<sup>*</sup></b> and <b className="text-success font-semibold">One Special Character<sup>*</sup></b> included.</p>
                                            <div className="grid grid-cols-12 sm:gap-x-6">
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
                                                    <input type="text" className="form-control" id="confirm-password" placeholder="Confirm Password" />
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