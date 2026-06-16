"use client"

import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as formsPrism from "@/shared/data/prism/forms-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment } from "react";

interface PasswordsProps { }

const Passwords: FC<PasswordsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Passwords" />
            <Pageheader Heading="Passwords" breadcrumbs={['Forms', ' Form Elements']} currentpage="Passwords" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <h6 className="text-base mb-4">Strong Password:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-6">
                    <Showcode title="Basic Strong Password" reactCode={formsPrism.password1}>
                        {/* <!-- Strong Password --> */}
                        <div className="flex">
                            <div className="flex-1">
                                <input type="password" id="hs-strong-password-base"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
                                    placeholder="Enter password" />
                                <div data-hs-strong-password='{
                                        "target": "#hs-strong-password-base",
                                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1"
                                        }' className="flex mt-3 -mx-1"></div>
                            </div>
                        </div>
                        {/* <!-- End Strong Password --> */}
                    </Showcode>
                    <Showcode title="Strong Password with API" reactCode={formsPrism.password2}>
                        {/* <!-- Strong Password --> */}
                        <div className="flex">
                            <div className="relative flex-1">
                                <input type="password"
                                    id="hs-strong-password-api-with-indicator-and-hint-in-popover"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
                                    placeholder="Enter password" />
                                <div id="hs-strong-password-api"
                                    className="hidden absolute z-10 w-full bg-white shadow-md rounded-sm p-4 dark:bg-bodybg dark:border dark:border-white/10 dark:divide-white/10">
                                    <div id="hs-strong-password-api-in-popover" data-hs-strong-password='{
                                                "target": "#hs-strong-password-api-with-indicator-and-hint-in-popover",
                                                "hints": "#hs-strong-password-api",
                                                "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
                                                "mode": "popover",
                                                "checksExclude": ["lowercase", "min-length"],
                                                "specialCharactersSet": "&!@"
                                            }' className="flex mt-2 -mx-1">
                                    </div>
                                    <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                                        Your password must contain:
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
                                        <li data-hs-strong-password-hints-rule-text="uppercase"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain uppercase.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="numbers"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain numbers.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="special-characters"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain special characters (available chars: &!@).
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Strong Password --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <Showcode title="Min Length Strong Password" reactCode={formsPrism.password3}>
                        {/* <!-- Strong Password --> */}
                        <div className="flex-1">
                            <input type="password" id="hs-strong-password-with-minLength"
                                className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
                                placeholder="Enter password" />
                            <div id="hs-strong-password-minLength" data-hs-strong-password='{
                                        "target": "#hs-strong-password-with-minLength",
                                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
                                        "minLength": "8"
                                        }' className="flex mt-3 -mx-1">
                            </div>
                        </div>
                        {/* <!-- End Strong Password --> */}
                    </Showcode>
                    <Showcode title="Strong Password Working with Popover" reactCode={formsPrism.password4}>
                        {/* <!-- Strong Password --> */}
                        <div className="flex">
                            <div className="relative flex-1">
                                <input type="password"
                                    id="hs-strong-password-with-indicator-and-hint-in-popover"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
                                    placeholder="Enter password" />
                                <div id="hs-strong-password-popover"
                                    className="hidden absolute z-10 w-full bg-white shadow-md rounded-sm p-4 dark:bg-bodybg dark:border dark:border-white/10 dark:divide-white/10">
                                    <div id="hs-strong-password-in-popover" data-hs-strong-password='{
                                            "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
                                            "hints": "#hs-strong-password-popover",
                                            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1",
                                            "mode": "popover"
                                        }' className="flex mt-2 -mx-1">
                                    </div>

                                    <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                                        Your password must contain:
                                    </h4>

                                    <ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
                                        <li data-hs-strong-password-hints-rule-text="min-length"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Minimum number of characters is 6.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="lowercase"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain lowercase.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="uppercase"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain uppercase.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="numbers"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain numbers.
                                        </li>
                                        <li data-hs-strong-password-hints-rule-text="special-characters"
                                            className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                            <span className="hidden" data-check>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span data-uncheck>
                                                <svg className="flex-shrink-0 size-4"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </span>
                                            Should contain special characters.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Strong Password --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <Showcode title="Strong Password With Indicator and Hints" reactCode={formsPrism.password5}>
                        {/* <!-- Strong Password --> */}
                        <div className="flex mb-2">
                            <div className="flex-1">
                                <input type="password" id="hs-strong-password-with-indicator-and-hint"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-white/10"
                                    placeholder="Enter password" />
                                <div id="hs-strong-password" data-hs-strong-password='{
                                            "target": "#hs-strong-password-with-indicator-and-hint",
                                            "hints": "#hs-strong-password-hints",
                                            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-success h-2 flex-auto rounded-full bg-primary/70 opacity-50 mx-1"
                                        }' className="flex mt-3 -mx-1"></div>
                            </div>
                        </div>
                        <div id="hs-strong-password-hints" className="">
                            <div>
                                <span className="text-sm text-gray-800 dark:text-gray-200 me-1">Level :</span>
                                <span data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]'
                                    className="text-sm font-semibold text-gray-800 dark:text-gray-200"></span>
                            </div>

                            <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
                                Your password must contain:
                            </h4>

                            <ul className="space-y-1 text-sm text-gray-500 dark:text-white/70">
                                <li data-hs-strong-password-hints-rule-text="min-length"
                                    className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                    <span className="hidden" data-check>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    <span data-uncheck>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </span>
                                    Minimum number of characters is 6.
                                </li>
                                <li data-hs-strong-password-hints-rule-text="lowercase"
                                    className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                    <span className="hidden" data-check>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    <span data-uncheck>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </span>
                                    Should contain lowercase.
                                </li>
                                <li data-hs-strong-password-hints-rule-text="uppercase"
                                    className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                    <span className="hidden" data-check>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    <span data-uncheck>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </span>
                                    Should contain uppercase.
                                </li>
                                <li data-hs-strong-password-hints-rule-text="numbers"
                                    className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                    <span className="hidden" data-check>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    <span data-uncheck>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </span>
                                    Should contain numbers.
                                </li>
                                <li data-hs-strong-password-hints-rule-text="special-characters"
                                    className="hs-strong-password-active:text-success flex items-center gap-x-2">
                                    <span className="hidden" data-check>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    <span data-uncheck>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </span>
                                    Should contain special characters.
                                </li>
                            </ul>
                        </div>
                        {/* <!-- End Strong Password --> */}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <h6 className="text-base mb-4">Toggle Password:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <Showcode title=" Basic Toggle Password" reactCode={formsPrism.password6}>
                        {/* <!-- Form Group --> */}
                        <label className="block text-sm mb-2 dark:text-white">Password</label>
                        <div className="relative">
                            <input id="hs-toggle-password" type="password"
                                className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
                                placeholder="Enter password" defaultValue="12345qwerty" />
                            <SpkButton buttontype="button" Togglepassword='{
                                    "target": "#hs-toggle-password"
                                    }'
                                customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
                                <svg className="flex-shrink-0 size-3.5 text-gray-600 dark:text-white" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path className="hs-password-active:hidden"
                                        d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                    <path className="hs-password-active:hidden"
                                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path className="hs-password-active:hidden"
                                        d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                                    <path className="hidden hs-password-active:block"
                                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                                </svg>
                            </SpkButton>
                        </div>
                        {/* <!-- End Form Group --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <Showcode title="Checkbox Tooggle Password" reactCode={formsPrism.password7}>
                        {/* <!-- Form Group --> */}
                        <div className="mb-5">
                            <label htmlFor="hs-toggle-password-with-checkbox" className="block text-sm mb-2 dark:text-white">Current password</label>
                            <input id="hs-toggle-password-with-checkbox" type="password" className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder
                                     rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2
                                      dark:border-white/10 dark:text-white/70 dark:focus:ring-primary" placeholder="Enter current password" defaultValue="12345qwerty" />
                            {/*<!-- Checkbox -->*/}
                            <div className="flex mt-4">
                                <input data-hs-toggle-password="{
                                            &quot;target&quot;: &quot;#hs-toggle-password-with-checkbox&quot;
                                        }" id="hs-toggle-password-checkbox" type="checkbox" className="form-check-input mt-0.5 pointer-events-none" />
                                <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-2 dark:text-white/70">Show password</label>
                            </div>
                            {/*<!-- End Checkbox -->*/}
                        </div>
                        {/* <!-- End Form Group --> */}


                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <Showcode title="Multi Toggle" reactCode={formsPrism.password8}>
                        <div className="space-y-5" data-hs-toggle-password-group>
                            {/* <!-- Form Group --> */}
                            <label htmlFor="hs-toggle-password-multi-toggle-np"
                                className="block text-sm mb-2 dark:text-white">New password</label>
                            <div className="relative">
                                <input id="hs-toggle-password-multi-toggle-np" type="password"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
                                    placeholder="Enter new password" />
                                <SpkButton buttontype="button" Togglepassword='{
                                            "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
                                        }'
                                    customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-600 dark:text-white" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path className="hs-password-active:hidden"
                                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                        <path className="hs-password-active:hidden"
                                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                        <path className="hs-password-active:hidden"
                                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                                        <path className="hidden hs-password-active:block"
                                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                                    </svg>
                                </SpkButton>
                            </div>
                            {/* <!-- End Form Group --> */}

                            {/* <!-- Form Group --> */}
                            <label htmlFor="hs-toggle-password-multi-toggle"
                                className="block text-sm mb-2 dark:text-white">Current password</label>
                            <div className="relative">
                                <input id="hs-toggle-password-multi-toggle" type="password"
                                    className="dark:placeholder:text-white/50 py-3 px-4 block w-full border-inputborder rounded-sm text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:ring-primary"
                                    placeholder="Enter current password" defaultValue="12345qwerty" />
                                <SpkButton buttontype="button" Togglepassword='{
                                            "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
                                        }'
                                    customClass="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-transparent">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-600 dark:text-white" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path className="hs-password-active:hidden"
                                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                        <path className="hs-password-active:hidden"
                                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                        <path className="hs-password-active:hidden"
                                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                                        <path className="hidden hs-password-active:block"
                                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                                    </svg>
                                </SpkButton>
                            </div>
                            {/* <!-- End Form Group --> */}
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-3 --> */}
            <h6 className="text-base mb-4">PIN Input:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Basic PIN Input" reactCode={formsPrism.password9}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                data-hs-pin-input-item autoFocus />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Placeholder PIN Input" reactCode={formsPrism.password10}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Gray PIN Input" reactCode={formsPrism.password11}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-gray-100 border-transparent rounded-md text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg2 dark:border-transparent dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Underline PIN Input" reactCode={formsPrism.password12}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-primary focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-white/10 dark:text-white dark:focus:ring-primary dark:focus:border-b-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Focus effect PIN Input" reactCode={formsPrism.password13}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm focus:scale-110 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="PIN Input Type" reactCode={formsPrism.password14}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-9]+$"}'>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="PIN Input Regex type" reactCode={formsPrism.password15}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-3]+$"}'>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <Showcode title="Masked" reactCode={formsPrism.password16}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input='{"availableCharsRE": "^[0-3]+$"}'>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12  lg:col-span-6">
                    <Showcode title="Show PIN code suggest on iOS keyboard" reactCode={formsPrism.password17}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                type="tel" placeholder="⚬" data-hs-pin-input-item />
                            <input
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                type="tel" placeholder="⚬" data-hs-pin-input-item />
                            <input
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                type="tel" placeholder="⚬" data-hs-pin-input-item />
                            <input
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                type="tel" placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12  lg:col-span-6">
                    <Showcode title="Pin Input Disabled" reactCode={formsPrism.password18}>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item disabled />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item disabled />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item disabled />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item disabled />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <Showcode title="Focus effect PIN Input" reactCode={formsPrism.password19} customCardBodyClass="space-y-4">
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                            <input type="text"
                                className="dark:placeholder:text-white/50 block w-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary"
                                placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <Showcode title="PIN Input Sizes" reactCode={formsPrism.password20} customCardBodyClass="space-y-4">
                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[38px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block size-[46px] text-center border-inputborder rounded-md text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse" data-hs-pin-input>
                            <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                            <input type="text" className="dark:placeholder:text-white/50 block sm:size-[62px] size-[50px] text-center border-inputborder rounded-md text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:focus:ring-primary" placeholder="⚬" data-hs-pin-input-item />
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}
        </Fragment>
    );
};

export default Passwords;