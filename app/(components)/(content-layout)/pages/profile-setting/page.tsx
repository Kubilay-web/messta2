"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import { Languagedata, Timezonedata } from "@/shared/data/pages/profiledata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const ProfileSettings = () => {

    const [toggles, setToggles] = useState<{ [key: string]: string }>({});

    const toggle = (toggleKey: string) => {
        setToggles((prevState) => ({
            ...prevState,
            [toggleKey]: prevState[toggleKey] === 'on' ? 'off' : 'on',
        }));
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Profile Settings" />
            <Pageheader Heading="Profile Settings" breadcrumbs={['Pages']} currentpage="Profile Settings" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                PROFILE SETTINGS
                            </div>
                        </div>
                        <div className="box-body !p-6">
                            <span className="font-semibold mb-3 block">ACCOUNT :</span>
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4 mb-4">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="flex items-start flex-wrap gap-3">
                                        <div>
                                            <span className="avatar avatar-xxl">
                                                <Image fill src="../../assets/images/faces/9.jpg" alt="" />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium block mb-2">Profile Picture</span>
                                            <div className="btn-list mb-1">
                                                <button className="ti-btn ti-btn-sm ti-btn-primary btn-wave me-2"><i className="ri-upload-2-line me-1"></i>Change Image</button>
                                                <button className="ti-btn ti-btn-sm ti-btn-light btn-wave"><i className="ri-delete-bin-line me-1"></i>Remove</button>
                                            </div>
                                            <span className="block text-[0.75rem] text-textmuted dark:text-textmuted/50">Use JPEG, PNG, or GIF. Best size: 200x200 pixels. Keep it under 5MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="profile-user-name" className="ti-form-label">User Name :</label>
                                    <input type="text" className="form-control" id="profile-user-name" placeholder="Enter Name" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="profile-email" className="ti-form-label">Email :</label>
                                    <input type="email" className="form-control" id="profile-email" placeholder="Enter Email" />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="profile-phn-no" className="ti-form-label">Phone No :</label>
                                    <input type="text" className="form-control" id="profile-phn-no" placeholder="Enter Number" />
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="profile-age" className="ti-form-label">Age :</label>
                                    <input type="number" className="form-control" id="profile-age" placeholder="Enter Age" />
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="profile-designation" className="ti-form-label">Designation :</label>
                                    <input type="text" className="form-control" id="profile-designation" placeholder="Enter Designation" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="profile-address" className="ti-form-label">Address :</label>
                                    <textarea className="form-control" id="profile-address" rows={3}></textarea>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="profile-language" className="ti-form-label">Language :</label>
                                    <SpkSelect name="colors" option={Languagedata} mainClass="basic-multi-select"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Languagedata[0]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label htmlFor="profile-timezone" className="ti-form-label">Timezone :</label>
                                    <SpkSelect name="colors" option={Timezonedata} mainClass="basic-multi-select"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Timezonedata[0]]} />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="mb-sm-0 mb-2 w-75">
                                        <label htmlFor="profile-age" className="ti-form-label">Verification :</label>
                                        <div className="mb-0 authentication-btn-group">
                                            <div className="btn-group btn-group-sm inline-flex" role="group" aria-label="Basic radio toggle button group">
                                                <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio1" defaultChecked />
                                                <label className="ti-btn ti-btn-light ti-btn-sm rtl:!rounded-tr-sm rtl:!rounded-br-sm rtl:!rounded-tl-none rtl:!rounded-bl-none !rounded-tr-none !rounded-br-none !m-0" htmlFor="btnradio1"><i className="ri-mail-line me-1 align-middle inline-block"></i>Email</label>
                                                <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio2" />
                                                <label className="ti-btn ti-btn-outline-light !rounded-none ti-btn-sm !m-0" htmlFor="btnradio2"><i className="ri-chat-4-line me-1 align-middle inline-block"></i>Sms</label>
                                                <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio3" />
                                                <label className="ti-btn ti-btn-outline-light !rounded-tl-none !border-s-0 !rounded-bl-none ti-btn-sm !m-0" htmlFor="btnradio3"><i className="ri-phone-line me-1 align-middle inline-block"></i>Phone</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4 mb-4">
                                <div className="xl:col-span-12 col-span-12">
                                    <span className="font-semibold mb-3 block">SECURITY SETTINGS :</span>
                                    <div className="sm:flex block items-top justify-between">
                                        <div className="w-[50%]">
                                            <p className="text-[0.875rem] mb-1 font-medium">Login Verification</p>
                                            <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">This helps protect accounts from unauthorized access, even if a password is compromised.</p>
                                        </div>
                                        <Link scroll={false} href="#!" className="text-primary underline">Set Up Verification</Link>
                                    </div>
                                    <div className="sm:flex block items-top justify-between mt-3">
                                        <div className="w-[50%]">
                                            <p className="text-[0.875rem] mb-1 font-medium">Password Verification</p>
                                            <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">This additional step helps ensure that the person attempting to modify account details is the legitimate account owner.</p>
                                        </div>
                                        <div className="form-check !flex items-center">
                                            <input className="form-check-input" type="checkbox" id="personal-details" />
                                            <label className="form-check-label" htmlFor="personal-details">
                                                Require Personal Details
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <span className="font-semibold mb-3 block">NOTIFICATIONS :</span>
                                    <div className="grid grid-cols-12 md:gap-x-[3rem] gap-y-4">
                                        <div className="xl:col-span-12 col-span-12">
                                            <p className="text-[0.875rem] mb-1 font-medium">Configure Notifications</p>
                                            <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">By configuring notifications, users can tailor their experience to receive alerts for the types of events that matter to them.</p>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="flex items-top justify-between mt-sm-0 mt-3">
                                                <div className="mail-notification-settings">
                                                    <p className="text-[0.875rem] mb-1 font-medium">In-App Notifications</p>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Alerts that appear within the application interface.</p>
                                                </div>
                                                <div className={`toggle mb-0 float-sm-end  toggle-success ${toggles['notification1'] === 'on' || !toggles['notification1'] ? 'on' : ''}`} onClick={() => toggle('notification1')} id="in-app-notifications">
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="flex items-top justify-between mt-3">
                                                <div className="mail-notification-settings">
                                                    <p className="text-[0.875rem] mb-1 font-medium">Email Notifications</p>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Messages sent to the user's email address.</p>
                                                </div>
                                                <div className={`toggle mb-0 float-sm-end  toggle-success ${toggles['notification2'] === 'on' || !toggles['notification2'] ? 'on' : ''}`} onClick={() => toggle('notification2')} id="email-notifications">
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="flex items-top justify-between mt-3">
                                                <div className="mail-notification-settings">
                                                    <p className="text-[0.875rem] mb-1 font-medium">Push Notifications</p>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Alerts sent to the user's mobile device or desktop.</p>
                                                </div>
                                                <div className={`toggle mb-0 float-sm-end  toggle-success ${toggles['notification3'] === 'off' ? 'on' : ''}`} onClick={() => toggle('notification3')} id="push-notifications" >
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="flex items-top justify-between mt-3">
                                                <div className="mail-notification-settings">
                                                    <p className="text-[0.875rem] mb-1 font-medium">SMS Notifications</p>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Text messages sent to the user's mobile phone.</p>
                                                </div>
                                                <div className={`toggle mb-0 float-sm-end  toggle-success ${toggles['notification4'] === 'on' || !toggles['notification4'] ? 'on' : ''}`} onClick={() => toggle('notification4')} id="sms-notifications">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="btn-list float-end">
                                <button className="ti-btn ti-btn-danger btn-wave me-2">Deactivate Account</button>
                                <button className="ti-btn ti-btn-light btn-wave">Restore Defaults</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default ProfileSettings;