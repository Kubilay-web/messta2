"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { FC, Fragment, useState } from "react";

interface ValidationProps { }

const Validation: FC<ValidationProps> = () => {
    const [dates, setDates] = useState<{ [key: string]: Date | null }>({});

    const handleDateChange = (key: string, date: Date | null) => {
      setDates((prevDates) => ({
        ...prevDates,
        [key]: date,
      }));
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Validation" />
            <Pageheader Heading="Validation" breadcrumbs={['Forms']} currentpage="Validation" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Default Validation</h5>
                        </div>
                        <div className="box-body">
                            <form className="ti-validation">
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">First
                                            Name</label>
                                        <input type="text" className="my-auto ti-form-input  rounded-sm "
                                            placeholder="Firstname" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Last
                                            Name</label>
                                        <input type="text" className="my-auto ti-form-input  rounded-sm "
                                            placeholder="Lastname" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Phone
                                            Number</label>
                                        <input type="number" className="my-auto ti-form-input  rounded-sm "
                                            placeholder="+91 123-456-789" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Email
                                            Address</label>
                                        <input type="email" className="my-auto ti-form-input  rounded-sm"
                                            placeholder="your@site.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Password</label>
                                        <input type="password" className="ti-form-input  rounded-sm"
                                            placeholder="password" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Confirm
                                            Password</label>
                                        <input type="password" className="ti-form-input  rounded-sm"
                                            placeholder="password" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Date Of
                                            Birth</label>
                                            <SpkDatepickr className="my-auto ti-form-input  rounded-sm"   selected={dates["validation"]} onChange={(date) => handleDateChange("validation", date)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Gender</label>
                                        <ul className="flex flex-col sm:flex-row">
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 px-4 sm:!border-b !border-b-0 rtl:!rounded-tl-none rtl:!rounded-bl-none rtl:!rounded-tr-md rtl:!rounded-br-md !rounded-br-none !rounded-bl-none sm:!rounded-bl-md sm:!rounded-br-none sm:-ms-px sm:mt-0 sm:first:rounded-se-none  sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-14"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" defaultChecked required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-14"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Female
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 px-4 sm:!border-b !border-b-0 !rounded-none sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:!rounded-none sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-15"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-15"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Male
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 rtl:!rounded-tr-none rtl:!rounded-br-none rtl:!rounded-tl-md rtl:!rounded-bl-md !rounded-tr-none !rounded-tl-none px-4 sm:-ms-px sm:mt-0 sm:!rounded-tr-md sm:first:rounded-se-none sm:!rounded-tl-none  sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-16"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-16"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Others
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <div className="space-y-2">
                                        <label
                                            className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Address</label>
                                        <input type="text" className="my-auto ti-form-input  rounded-sm"
                                            placeholder="Address" required />
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="ti-form-label dark:text-defaulttextcolor/80 mb-0">City</label>
                                        <input type="text" className="my-auto ti-form-input  rounded-sm"
                                            placeholder="city" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="ti-form-label dark:text-defaulttextcolor/80 mb-0">State</label>
                                        <input type="text" className="my-auto ti-form-input  rounded-sm"
                                            placeholder="state" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="ti-form-label dark:text-defaulttextcolor/80 mb-0">Pincode</label>
                                        <input type="number" className="my-auto ti-form-input  rounded-sm"
                                            placeholder="pincode" required />
                                    </div>
                                </div>
                                <div className="my-5">
                                    <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked" />
                                    <label htmlFor="flexCheckChecked"
                                        className="text-sm text-gray-500 ms-3 text-textmuted dark:text-textmuted/50 inline">I
                                        agree with the <Link scroll={false} href="#!"
                                            className="text-primary hover:underline ms-1">terms and
                                            conditions</Link></label>
                                </div>
                                <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Submit</SpkButton>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Custom Validation</h5>
                        </div>
                        <div className="box-body">
                            <form className="ti-custom-validation" noValidate>
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">First
                                        Name</label> <input type="text"
                                            className="firstName my-auto ti-form-input  rounded-sm"
                                            placeholder="Firstname" defaultValue="John mark" required /> <span
                                                className="firstNameError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Last
                                        Name</label> <input type="text"
                                            className="lastName my-auto ti-form-input  rounded-sm"
                                            placeholder="Lastname" required /> <span
                                                className="lastNameError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Phone
                                        Number</label> <input type="number"
                                            className="phonenumber my-auto ti-form-input  rounded-sm"
                                            placeholder="+91 123-456-789" required /> <span
                                                className="phoneError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Email
                                        Address</label> <input type="email"
                                            className="email-address my-auto ti-form-input  rounded-sm"
                                            placeholder="your@site.com" required /> <span
                                                className="emailError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Password</label>
                                        <input type="password" className="password ti-form-input  rounded-sm"
                                            placeholder="password" required /> <span
                                                className="passwordError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Confirm
                                        Password</label> <input type="password"
                                            className="confirmPassword ti-form-input  rounded-sm" placeholder="password"
                                            required /> <span
                                                className="confirmPasswordError text-red-500 text-xs hidden">error</span>
                                    </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Date Of
                                        Birth</label> 
                                        <SpkDatepickr className="my-auto ti-form-input  rounded-sm"   selected={dates["defaultdate"]} onChange={(date) => handleDateChange("defaultdate", date)} />
                                        <span className="dobError text-red-500 text-xs hidden">error</span>
                                         </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Gender</label>
                                        <ul className="flex flex-col sm:flex-row">
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 px-4 sm:!border-b !border-b-0 rtl:!rounded-tl-none rtl:!rounded-bl-none rtl:!rounded-tr-md rtl:!rounded-br-md !rounded-br-none !rounded-bl-none sm:!rounded-bl-md sm:!rounded-br-none sm:-ms-px sm:mt-0 sm:first:rounded-se-none  sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-11"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" defaultChecked required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-11"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Female
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 px-4 sm:!border-b !border-b-0 !rounded-none sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:!rounded-none sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-12"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-12"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Male
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group w-full gap-x-2.5 flex py-2 rtl:!rounded-tr-none rtl:!rounded-br-none rtl:!rounded-tl-md rtl:!rounded-bl-md !rounded-tr-none !rounded-tl-none px-4 sm:-ms-px sm:mt-0 sm:!rounded-tr-md sm:first:rounded-se-none sm:!rounded-tl-none  sm:first:rounded-es-sm sm:last:rounded-es-none  sm:last:rounded-se-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="ti-radio-validation-13"
                                                            name="ti-radio-validation" type="radio"
                                                            className="ti-form-radio" required />
                                                    </div>
                                                    <label htmlFor="ti-radio-validation-13"
                                                        className="ms-3 block w-full text-sm text-textmuted dark:text-textmuted/50">
                                                        Others
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="my-5">
                                </div>
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Address</label>
                                        <input type="text" className="postalAddress my-auto ti-form-input  rounded-sm"
                                            placeholder="Address" required /> <span
                                                className="addressError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">City</label>
                                        <input type="text" className="cityName my-auto ti-form-input  rounded-sm"
                                            placeholder="city" required /> <span
                                                className="cityError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">State</label>
                                        <input type="text" className="stateName my-auto ti-form-input  rounded-sm"
                                            placeholder="state" required /> <span
                                                className="stateError text-red-500 text-xs hidden">error</span> </div>
                                    <div className="space-y-2"> <label
                                        className="ti-form-label dark:text-defaulttextcolor/70 mb-0">Pincode</label>
                                        <input type="number" className="pincode my-auto ti-form-input  rounded-sm"
                                            placeholder="pincode" required /> <span
                                                className="pincodeError text-red-500 text-xs hidden">error</span> </div>
                                </div>
                                <div className="my-5"> <input type="checkbox"
                                    className="validationCheckbox ti-form-checkbox mt-0.5 form-check-input" id="hs-checkbox-group-12"
                                    required /> <span
                                        className="checkboxError text-red-500 text-xs hidden">error</span> <label
                                            htmlFor="hs-checkbox-group-12"
                                            className="text-sm text-gray-500 sm:ms-3 dark:text-[#8c9097] dark:text-white/50 inline">I
                                        agree with the <Link scroll={false} href="#!"
                                            className="text-primary hover:underline">terms and conditions</Link></label>
                                </div> <SpkButton defaultValue="Login Now" buttontype="submit"
                                    customClass="ti-btn ti-btn-primary ti-custom-validate-btn">Submit</SpkButton>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- End::row-1 --> */}
        </Fragment>
    );
};

export default Validation;