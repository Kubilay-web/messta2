"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Accountoptions, Countryoptions, Languageoptions, Maximumoptions, MaxLimitoptions } from '@/shared/data/pages/email/mail-app-data';

const MailSetting = () => {

    //email

    const [toggles, setToggles] = useState<{ [key: string]: string }>({});

    const toggle = (toggleKey: string) => {
        setToggles((prevState) => ({
            ...prevState,
            [toggleKey]: prevState[toggleKey] === 'on' ? 'off' : 'on',
        }));
    };

    return (
        <Fragment>
            <div className="container-fluid">

                {/* <!-- Page Header --> */}
                <Seo title="Mail Setting" />
                <Pageheader Heading="Mail Setting" breadcrumbs={['Pages', ' Email']} currentpage="Mail Setting" />
                {/* <!-- Page Header Close --> */}

                {/* <!-- Start::row-1 --> */}
                <div className="grid grid-cols-12 gap-x-6 mb-[3rem]">
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box">
                            <div className="box-body">
                                <nav aria-label="Tabs"
                                    className="md:flex block !flex-col !justify-start whitespace-nowrap" role="tablist">
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 flex-grow  text-[0.8rem] font-medium rounded-sm hover:text-primary active"
                                        id="Personal-item" role="tab" data-hs-tab="#personal-info" href="#!">
                                        Personal Information
                                    </Link>
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                                        id="account-item" data-hs-tab="#account-settings" href="#!" >
                                        Account Settings
                                    </Link>
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                                        id="email-item" data-hs-tab="#email-settings" href="#!"  >
                                        Email
                                    </Link>
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                                        id="labels-item" data-hs-tab="#labels" href="#!">
                                        Labels
                                    </Link>
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                                        id="notifications-item" data-hs-tab="#notification-settings" href="#!" >
                                        Notifications
                                    </Link>
                                    <Link scroll={false} className="m-1 block w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                                        id="security-item" data-hs-tab="#security" href="#!">
                                        Security
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-9 col-span-12">
                        <div className="box">
                            <div className="box-body">
                                <div className="tab-content">
                                    <div className="tab-pane !border  border-defaultborder dark:border-defaultborder/10 !p-4 show active" id="personal-info"
                                        aria-labelledby="Personal-item" role="tabpanel">
                                        <div className="sm:p-4 p-0">
                                            <h6 className="font-medium mb-3">
                                                Photo :
                                            </h6>
                                            <div className="mb-4 sm:flex items-center">
                                                <div className="mb-0 me-5">
                                                    <span className="avatar avatar-xxl avatar-rounded">
                                                        <Image fill src="../../../assets/images/faces/9.jpg" alt=""
                                                            id="profile-img" />
                                                        <span
                                                            className="badge rounded-pill text-white bg-primary avatar-badge">
                                                            {/* <input type="file" name="photo"
                                                                className="position-absolute w-full h-full op-0"
                                                                id="profile-change" /> */}
                                                            <i className="fe fe-camera text-[0.75rem]"></i>
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="btn-group inline-flex gap-0">
                                                    <button className="ti-btn ti-btn-primary !m-0 rtl:!rounded-tr-md rtl:!rounded-br-md rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none">Change</button>
                                                    <button className="ti-btn ti-btn-light !m-0 !rounded-tl-none !rounded-bl-none">Remove</button>
                                                </div>
                                            </div>
                                            <h6 className="font-medium mb-4">
                                                Profile :
                                            </h6>
                                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6 mb-4">
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label htmlFor="first-name" className="ti-form-label">First Name</label>
                                                    <input type="text" className="form-control" id="first-name" placeholder="First Name" />
                                                </div>
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label htmlFor="last-name" className="ti-form-label">Last Name</label>
                                                    <input type="text" className="form-control" id="last-name" placeholder="Last Name" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label className="ti-form-label">User Name</label>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon3">user2413@gmail.com</span>
                                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="font-medium mb-3">
                                                Personal information :
                                            </h6>
                                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6 mb-4">
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label htmlFor="email-address" className="ti-form-label">Email Address :</label>
                                                    <input type="text" className="form-control" id="email-address" placeholder="xyz@gmail.com" />
                                                </div>
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label htmlFor="Contact-Details" className="ti-form-label">Contact Details :</label>
                                                    <input type="text" className="form-control" id="Contact-Details" placeholder="contact details" />
                                                </div>
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label htmlFor="language" className="ti-form-label">Language :</label>
                                                    <SpkSelect multi option={Languageoptions} mainClass="basic-multi-select" name="language" id="language"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Languageoptions[0]]} />
                                                </div>
                                                <div className="xl:col-span-6 col-span-12">
                                                    <label className="ti-form-label">Country :</label>
                                                    <SpkSelect option={Countryoptions} mainClass="basic-multi-select" name="country-select" id="country-select"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Countryoptions[0]]} />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="bio" className="ti-form-label">Bio :</label>
                                                    <textarea className="form-control" id="bio" rows={5} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit impedit, officiis non minima saepe voluptates a magnam enim sequi porro veniam ea suscipit dolorum vel mollitia voluptate iste nemo!"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane !p-4 !border  border-defaultborder dark:border-defaultborder/10 hidden" id="account-settings" aria-labelledby="account-item" role="tabpanel"  >
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                            <div className="xxl:col-span-7 col-span-12">
                                                <div className="box shadow-none mb-0 border">
                                                    <div className="box-body">
                                                        <div className="sm:flex block items-top mb-4 justify-between">
                                                            <div className="w-[75%]">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Two Step Verification</p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Two
                                                                    step verificatoin is very secured and restricts
                                                                    in happening faulty practices.</p>
                                                            </div>
                                                            <div className={`toggle toggle-primary ${toggles['twotep'] === 'on' || !toggles['twotep'] ? 'on' : ''}`} onClick={() => toggle('twotep')} id="two-step-verification">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top mb-4 justify-between">
                                                            <div className="sm:mb-0 mb-2 w-[75%]">
                                                                <p className="text-[0.875rem] mb-2 font-medium"> Authentication</p>
                                                                <div className="mb-0 authentication-btn-group">
                                                                    <div className="btn-group inline-flex" role="group" aria-label="Basic radio toggle button group">
                                                                        <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio1" defaultChecked />
                                                                        <label className="ti-btn ti-btn-outline-light !text-dark !m-0 rtl:!rounded-tr-sm flex-wrap rtl:!rounded-br-sm rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none" htmlFor="btnradio1">
                                                                            <i className="ri-lock-unlock-line me-1 align-middle inline-block"></i>Pin
                                                                        </label>
                                                                        <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio2" />
                                                                        <label className="ti-btn ti-btn-outline-light !text-dark !m-0 !border-s-[0] !rounded-none flex-wrap" htmlFor="btnradio2">
                                                                            <i className="ri-lock-password-line me-1 align-middle inline-block"></i>Password
                                                                        </label>
                                                                        <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio3" />
                                                                        <label className="ti-btn ti-btn-outline-light !text-dark !m-0 !border-s-[0] flex-wrap rtl:!rounded-tl-sm rtl:!rounded-bl-sm rtl:!rounded-tr-none rtl:!rounded-br-none !rounded-tr-none !rounded-tl-none !rounded-bl-none"
                                                                            htmlFor="btnradio3">
                                                                            <i className="ri-fingerprint-line me-1 align-middle inline-block"></i>Finger Print
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={`toggle  toggle-primary  mb-0 ms-0 sm:mt-0 mt-2 ${toggles['authntication'] === 'on' || !toggles['authntication'] ? 'on' : ''}`} onClick={() => toggle('authntication')} id="authentication">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top mb-4 justify-between">
                                                            <div className="w-[75%]">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Recovery Mail</p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Incase
                                                                    of forgetting password mails are sent to
                                                                    heifo@gmail.com</p>
                                                            </div>
                                                            <div className={`toggle toggle-primary mb-0 ms-0 sm:mt-0 mt-2 ${toggles['recovery'] === 'on' || !toggles['recovery'] ? 'on' : ''}`} onClick={() => toggle('recovery')} id="recovery-mail">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top mb-4 justify-between">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">SMS   Recovery</p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">SMS
                                                                    are sent to 9102312xx in case of recovery</p>
                                                            </div>
                                                            <div className={`toggle  toggle-primary  mb-0 ms-0 sm:mt-0 mt-2 ${toggles['smsrecovery'] === 'on' || !toggles['smsrecovery'] ? 'on' : ''}`} onClick={() => toggle('smsrecovery')} id="sms-recovery">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Reset Password</p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-4">
                                                                    Password should be min of <b
                                                                        className="text-success">8 digits<sup> *</sup></b>, atleast <b
                                                                            className="text-success"> One Capital
                                                                        letter<sup>*</sup></b> and <b
                                                                            className="text-success"> One Special
                                                                        Character<sup>*</sup></b> included.</p>
                                                                <div className="mb-2">
                                                                    <label htmlFor="current-password" className="ti-form-label">Current Password</label>
                                                                    <input type="text" className="form-control" id="current-password" placeholder="Current Password" />
                                                                </div>
                                                                <div className="mb-2">
                                                                    <label htmlFor="new-password" className="ti-form-label">New Password</label>
                                                                    <input type="text" className="form-control" id="new-password" placeholder="New Password" />
                                                                </div>
                                                                <div className="mb-0">
                                                                    <label htmlFor="confirm-password" className="ti-form-label">Confirm  Password</label>
                                                                    <input type="text" className="form-control" id="confirm-password" placeholder="Confirm Password" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-5 col-span-12">
                                                <div className="box shadow-none mb-0 border">
                                                    <div className="box-header justify-between sm:flex block">
                                                        <div className="box-title">Registered Devices</div>
                                                        <div className="sm:mt-0 mt-2">
                                                            <button className="ti-btn ti-btn-sm ti-btn-primary">Signout  from all devices</button>
                                                        </div>
                                                    </div>
                                                    <div className="box-body">
                                                        <ul className="ti-list-group">
                                                            <li className="ti-list-group-item">
                                                                <div className="sm:flex block items-top">
                                                                    <div className="leading-none sm:mb-0 mb-2"><i
                                                                        className="bi bi-phone me-2 text-[1rem] align-middle text-textmuted dark:text-textmuted/50"></i>
                                                                    </div>
                                                                    <div className="leading-none flex-grow">
                                                                        <p className="mb-1">
                                                                            <span className="font-medium">Mobile-LG-1023</span>
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">Manchester, UK-Nov 30, 04:45PM</span>
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="ti-dropdown hs-dropdown sm:mt-0 mt-2">
                                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="fe fe-more-vertical"></i>
                                                                        </Link>
                                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Another action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Something else here</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="ti-list-group-item">
                                                                <div className="sm:flex block items-top">
                                                                    <div className="leading-none sm:mb-0 mb-2">
                                                                        <i className="bi bi-laptop me-2 text-[1rem] align-middle text-textmuted dark:text-textmuted/50"></i>
                                                                    </div>
                                                                    <div className="leading-none flex-grow">
                                                                        <p className="mb-1">
                                                                            <span className="font-medium">Lenovo-1291203</span>
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">England, UK-Aug 12, 12:25PM</span>
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="ti-dropdown hs-dropdown sm:mt-0 mt-2">
                                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="fe fe-more-vertical"></i>
                                                                        </Link>
                                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Another action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Something else here</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="ti-list-group-item">
                                                                <div className="sm:flex block items-top">
                                                                    <div className="leading-none sm:mb-0 mb-2"><i
                                                                        className="bi bi-laptop me-2 text-[1rem] align-middle text-textmuted dark:text-textmuted/50"></i>
                                                                    </div>
                                                                    <div className="leading-none flex-grow">
                                                                        <p className="mb-1">
                                                                            <span className="font-medium">Macbook-Suzika</span>
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">Brightoon,  UK-Jul 18, 8:34AM</span>
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="ti-dropdown hs-dropdown sm:mt-0 mt-2">
                                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="fe fe-more-vertical"></i>
                                                                        </Link>
                                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Another action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Something else here</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="ti-list-group-item">
                                                                <div className="sm:flex block items-top">
                                                                    <div className="leading-none sm:mb-0 mb-2">
                                                                        <i className="bi bi-pc-display-horizontal me-2 text-[1rem] align-middle text-textmuted dark:text-textmuted/50"></i>
                                                                    </div>
                                                                    <div className="leading-none flex-grow">
                                                                        <p className="mb-1">
                                                                            <span className="font-medium">Apple-Desktop</span>
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">Darlington,  UK-Jan 14, 11:14AM</span>
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="ti-dropdown hs-dropdown sm:mt-0 mt-2">
                                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="fe fe-more-vertical"></i>
                                                                        </Link>
                                                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Another action</Link></li>
                                                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Something else here</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane !border  border-defaultborder dark:border-defaultborder/10 p-0 hidden" id="email-settings"
                                        aria-labelledby="email-item" role="tabpanel" >
                                        <ul className="ti-list-group ti-list-group-flush rounded-sm">
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12 col-lg-3 col-md-3 col-sm-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Menu View :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            <label className="form-check-label font-medium" htmlFor="flexRadioDefault1">
                                                                Default View
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="flexRadioDefault2">
                                                                Advanced View
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle  mb-0 sm:float-end  toggle-danger  ${toggles['advanceview'] === 'on' || !toggles['advanceview'] ? 'on' : ''}`} onClick={() => toggle('advanceview')} id="menu-view">
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Language :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="mail-language" className="ti-form-label">Languages :</label>
                                                        <SpkSelect multi option={Languageoptions} mainClass="basic-multi-select" name="mail-language" id="mail-language"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Languageoptions[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end toggle-success ${toggles['language'] === 'off' ? 'on' : ''}`} onClick={() => toggle('language')} id="mail-languages">
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Images :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="images-open" id="images-open1" />
                                                            <label className="form-check-label font-medium" htmlFor="images-open1">
                                                                Always Open Images
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="images-open" id="images-hide2" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="images-hide2">
                                                                Ask For Permission
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['permisssion'] === 'off' ? 'on' : ''}`} onClick={() => toggle('permisssion')} id="mails-images">
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Keyboard Shortcuts :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="keyboard-enable" id="keyboard-enable1" />
                                                            <label className="form-check-label font-medium" htmlFor="keyboard-enable1">
                                                                Keyboard Shortcuts Enable
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="keyboard-enable" id="keyboard-disable2" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="keyboard-disable2">
                                                                Keyboard Shortcuts Disable
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['keyboard'] === 'off' ? 'on' : ''}`} onClick={() => toggle('keyboard')} id="keyboard-shortcuts">

                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Notifications :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="checkbox" id="desktop-notifications" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="desktop-notifications">
                                                                Desktop Notifications
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="checkbox" id="mobile-notifications" />
                                                            <label className="form-check-label font-medium" htmlFor="mobile-notifications">
                                                                Mobile Notifications
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className="sm:float-end">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-outline-success ti-btn-sm">Learn-more</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Maximum Mails Per Page :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <SpkSelect option={Maximumoptions} mainClass="basic-multi-select" name="mail-per-page" id="mail-per-page"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Maximumoptions[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['mamximuncells'] === 'off' ? 'on' : ''}`} onClick={() => toggle('mamximuncells')} id="mails-per-page">

                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Mail Composer :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="mail-composer" id="mail-composeron1" />
                                                            <label className="form-check-label font-medium" htmlFor="mail-composeron1">
                                                                Mail Composer On
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="mail-composer" id="mail-composeroff2" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="mail-composeroff2">
                                                                Mail Composer Off
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['mailcomposer'] === 'off' ? 'on' : ''}`} onClick={() => toggle('mailcomposer')} id="mail-composer" >

                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Auto Correct :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="auto-correct" id="auto-correcton1" />
                                                            <label className="form-check-label font-medium" htmlFor="auto-correcton1"> Auto Correct On</label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="radio" name="auto-correct" id="auto-correctoff2" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="auto-correctoff2">
                                                                Auto Correct Off
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['autocorrect'] === 'off' ? 'on' : ''}`} onClick={() => toggle('autocorrect')} id="auto-correct">

                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                                    <div className="xl:col-span-3 col-span-12">
                                                        <span className="text-[0.875rem] font-medium mb-0">Mail Send  Action :</span>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="checkbox" id="on-keyboard" defaultChecked />
                                                            <label className="form-check-label font-medium" htmlFor="on-keyboard">
                                                                On Keyboard Action
                                                            </label>
                                                        </div>
                                                        <div className="form-check !flex !items-center">
                                                            <input className="form-check-input" type="checkbox" id="on-buttonclick" />
                                                            <label className="form-check-label font-medium" htmlFor="on-buttonclick">
                                                                On Button Click
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12 ms-auto">
                                                        <div className="sm:float-end">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-outline-success ti-btn-sm">Learn-more</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane hidden" id="labels" aria-labelledby="labels-item" role="tabpanel"  >
                                        <p className="text-[0.875rem] font-medium mb-3">Mail Labels :</p>
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2 custom-mail">
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center">
                                                            <input type="checkbox" id="hs-basic-with-description-checked" className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked />
                                                            <label htmlFor="hs-basic-with-description-checked" className="form-check-label font-medium ms-2">All Mails</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center">
                                                            <input type="checkbox" id="hs-basic-with-description-checked1" className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked />
                                                            <label htmlFor="hs-basic-with-description-checked1" className="form-check-label font-medium ms-2">Inbox</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center">
                                                            <input type="checkbox" id="hs-basic-with-description-checked2" className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked />
                                                            <label htmlFor="hs-basic-with-description-checked2" className="form-check-label font-medium ms-2">Sent</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center">
                                                            <input type="checkbox" id="hs-basic-with-description-checked3" className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked />
                                                            <label htmlFor="hs-basic-with-description-checked3" className="form-check-label font-medium ms-2">Drafts</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center">
                                                            <input type="checkbox" id="hs-basic-with-description-checked4" className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked />
                                                            <label htmlFor="hs-basic-with-description-checked4" className="form-check-label font-medium ms-2">Spam</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked5"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked5"
                                                                className="form-check-label font-medium ms-2">Important</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked6"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked6"
                                                                className="form-check-label font-medium ms-2">Trash</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked7"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked7"
                                                                className="form-check-label font-medium ms-2">Archieve</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked8"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked8"
                                                                className="form-check-label font-medium ms-2">Starred</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[0.875rem] font-medium mb-3">Settings :</p>
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked9"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked9"
                                                                className="form-check-label font-medium ms-2">Settings</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[0.875rem] font-medium mb-3">Custom Labels :</p>
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-2">
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked10"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked10"
                                                                className="form-check-label font-medium ms-2">Mail</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked11"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked11"
                                                                className="form-check-label font-medium ms-2">Home</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked12"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked12"
                                                                className="form-check-label font-medium ms-2">Work</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                                <div className="box shadow-none">
                                                    <div className="box-body flex items-center justify-between flex-wrap gap-2">
                                                        <div className="flex items-center"> <input type="checkbox"
                                                            id="hs-basic-with-description-checked13"
                                                            className="ti-switch shrink-0 !w-[35px] !h-[19px] before:size-4" defaultChecked /> <label
                                                                htmlFor="hs-basic-with-description-checked13"
                                                                className="form-check-label font-medium ms-2">Friends</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane p-0 hidden !border  border-defaultborder dark:border-defaultborder/10" id="notification-settings"
                                        aria-labelledby="notifications-item" role="tabpanel"  >
                                        <ul className="ti-list-group ti-list-group-flush ti-list-unstyled rounded-sm !border-0">
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 xl:gap-x-[3rem] gap-y-4">
                                                    <div className="xl:col-span-5 col-span-12">
                                                        <p className="text-[1rem] mb-1 font-medium">Email Notifications
                                                        </p>
                                                        <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Email
                                                            notifications are the notifications you will receeive
                                                            when you are offline, you can customize them by enabling
                                                            or disabling them.</p>
                                                    </div>
                                                    <div className="xl:col-span-7 col-span-12">
                                                        <div className="flex items-top justify-between sm:mt-0 mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Updates
                                                                    & Features</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Notifications about new updates and their
                                                                    features.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['notification1'] === 'on' || !toggles['notification1'] ? 'on' : ''}`} onClick={() => toggle('notification1')}
                                                                id="update-features">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Early
                                                                    Access</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Users
                                                                    are selected for beta testing of new
                                                                    update,notifications relating or participate in
                                                                    any of paid product promotion.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end toggle-success ${toggles['notification2'] === 'off' ? 'on' : ''}`} onClick={() => toggle('notification2')}
                                                                id="early-access">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Email
                                                                    Shortcuts</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Shortcut notifications for email.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['notification3'] === 'on' || !toggles['notification3'] ? 'on' : ''}`} onClick={() => toggle('notification3')}
                                                                id="email-shortcut">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">New
                                                                    Mails</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Notifications related to new mails received.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['notification4'] === 'on' || !toggles['notification4'] ? 'on' : ''}`} onClick={() => toggle('notification4')}
                                                                id="new-mails">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Mail
                                                                    Chat Messages</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Any of
                                                                    new messages are received will be updated
                                                                    through notifications.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['notification5'] === 'on' || !toggles['notification5'] ? 'on' : ''}`} onClick={() => toggle('notification5')}
                                                                id="mail-chat-messages">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 xl:gap-x-[3rem] gap-y-4">
                                                    <div className="xl:col-span-5 col-span-12">
                                                        <p className="text-[1rem] mb-1 font-medium">Push Notifications
                                                        </p>
                                                        <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Push
                                                            notifications are recieved when you are online, you can
                                                            customize them by enabling or disabling them.</p>
                                                    </div>
                                                    <div className="xl:col-span-7 col-span-12">
                                                        <div className="flex items-top justify-between sm:mt-0 mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">New
                                                                    Mails</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Notifications related to new mails received.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['notification6'] === 'on' || !toggles['notification6'] ? 'on' : ''}`} onClick={() => toggle('notification6')}
                                                                id="push-new-mails">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Mail
                                                                    Chat Messages</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Any of
                                                                    new messages are received will be updated
                                                                    through notifications.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['notification7'] === 'on' || !toggles['notification7'] ? 'on' : ''}`} onClick={() => toggle('notification7')}
                                                                id="push-mail-chat-messages">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-top justify-between mt-3">
                                                            <div className="mail-notification-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Mail
                                                                    Extensions</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Notifications related to the extensions received
                                                                    by new emails and thier propertied also been
                                                                    displayed.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['notification8'] === 'off' ? 'on' : ''}`} onClick={() => toggle('notification8')} id="mail-extensions">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane p-0 !border  border-defaultborder dark:border-defaultborder/10 hidden" id="security" aria-labelledby="security-item"
                                        role="tabpanel"  >
                                        <ul className="ti-list-group ti-list-group-flush ti-list-unstyled rounded-sm !border-0">
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 xl:gap-x-[3rem] gap-y-4">
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <p className="text-[1rem] mb-1 font-medium">Logging In</p>
                                                        <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Security
                                                            settings related to logging into our email account and
                                                            taking down account if any mischevious action happended.
                                                        </p>
                                                    </div>
                                                    <div className="xl:col-span-8 col-span-12">
                                                        <div
                                                            className="sm:flex block items-top justify-between sm:mt-0 mt-3">
                                                            <div className="mail-security-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Max
                                                                    Limit for login attempts</p>
                                                                <p
                                                                    className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50 sm:mb-0">
                                                                    Account will freeze for 24hrs while attempt to
                                                                    login with wrong credentials for selected number
                                                                    of times</p>
                                                            </div>
                                                            <div>
                                                                <SpkSelect option={MaxLimitoptions} mainClass="basic-multi-select custom-mail-drop" name="max-login-attempts" id="max-login-attempts"
                                                                    menuplacement='auto' classNameprefix="Select2" defaultvalue={[MaxLimitoptions[0]]} />

                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top justify-between mt-3">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Account
                                                                    Freeze time management</p>
                                                                <p
                                                                    className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50 sm:mb-0">
                                                                    You can change the time for the account freeze
                                                                    when attempts for </p>
                                                            </div>
                                                            <div className="time-select">
                                                                <SpkSelect option={Accountoptions} mainClass="basic-multi-select custom-mail-drop2" name="account-freeze-time-format" id="account-freeze-time-format"
                                                                    menuplacement='auto' classNameprefix="Select2" defaultvalue={[Accountoptions[0]]} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 xl:gap-x-[3rem] gap-y-4">
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <p className="text-[1rem] mb-1 font-medium">Password
                                                            Requirements</p>
                                                        <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Security
                                                            settings related to password strength.</p>
                                                    </div>
                                                    <div className="xl:col-span-8 col-span-12">
                                                        <div
                                                            className="sm:flex block items-top justify-between sm:mt-0 mt-3 gap-3">
                                                            <div className="mail-security-settings">
                                                                <p className="text-[0.875rem] mb-1 font-medium">Minimum
                                                                    number of characters in the password</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">There
                                                                    should be a minimum number of characters for a
                                                                    password to be validated that shouls be set
                                                                    here.</p>
                                                            </div>
                                                            <div>
                                                                <input type="text" className="form-control" defaultValue="8" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top justify-between mt-3">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Contain
                                                                    A Number</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Password should contain a number.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['number'] === 'on' || !toggles['number'] ? 'on' : ''}`} onClick={() => toggle('number')} id="password-number">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top justify-between mt-3">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Contain
                                                                    A Special Character</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Password should contain a special Character.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success  ${toggles['password'] === 'on' || !toggles['password'] ? 'on' : ''}`} onClick={() => toggle('password')} id="password-special-character">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top justify-between mt-3">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Atleast
                                                                    One Capital Letter</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Password should contain atleast one capital
                                                                    letter.</p>
                                                            </div>
                                                            <div className={`toggle mb-0 sm:float-end  toggle-success ${toggles['special'] === 'on' || !toggles['special'] ? 'on' : ''}`} onClick={() => toggle('special')} id="password-capital">
                                                                <span></span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex block items-top justify-between mt-3">
                                                            <div>
                                                                <p className="text-[0.875rem] mb-1 font-medium">Maximum
                                                                    Password Length</p>
                                                                <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">
                                                                    Maximum password lenth should be selected here.
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <input type="text" className="form-control" defaultValue="16" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="ti-list-group-item">
                                                <div className="grid grid-cols-12 xl:gap-x-[3rem] gap-y-4">
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <p className="text-[1rem] mb-1 font-medium">Unknown Chats</p>
                                                        <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Security
                                                            settings related to unknown chats.</p>
                                                    </div>
                                                    <div className="xl:col-span-8 col-span-12">
                                                        <div className="btn-group inline-flex sm:float-end" role="group"
                                                            aria-label="Basic radio toggle button group">
                                                            <input type="radio" className="btn-check opacity-0 absolute"
                                                                name="btnunknownchats" id="unknown-chats-show"
                                                                defaultChecked />
                                                            <label className="ti-btn ti-btn-outline-light ti-btn-light !border-e-0 !m-0 rtl:!rounded-tr-md rtl:!rounded-br-md !rounded-tl !rounded-bl !rounded-tr-none !rounded-br-none"
                                                                htmlFor="unknown-chats-show">Show</label>
                                                            <input type="radio" className="btn-check opacity-0 absolute"
                                                                name="btnunknownchats" id="unknown-chats-hide" />
                                                            <label className="ti-btn ti-btn-outline-light !m-0 rtl:!rounded-tl-md rtl:!rounded-bl-md rtl:!rounded-tr-none rtl:!rounded-br-none !rounded-tl-none !rounded-bl-none"
                                                                htmlFor="unknown-chats-hide">Hide</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                {/* <!--End::row-1 --> */}

            </div>
        </Fragment>
    );
};

export default MailSetting;