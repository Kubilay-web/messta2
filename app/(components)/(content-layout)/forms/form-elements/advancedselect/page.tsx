"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as formsPrism from "@/shared/data/prism/forms-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        HSSelect: {
            getInstance(selector: string): any; // Adjust the return type according to your implementation
        };
    }
}

interface AdvancedselectProps { }

const Advancedselect: FC<AdvancedselectProps> = () => {
    const [validationState, setValidationState] = useState<'success' | 'error' | ''>('');
    const validationTargetRef = useRef<HTMLDivElement>(null);

    const handleSuccessClick = () => {
        setValidationState('success');
    };

    const handleErrorClick = () => {
        setValidationState('error');
    };

    const handleClearClick = () => {
        setValidationState('');
    };

    //
    useEffect(() => {
        const handleDynamicOptions = () => {
            setTimeout(() => {
                const addOptionBtn = document.querySelector('#add-option') as HTMLButtonElement;
                const addOptionsBtn = document.querySelector('#add-options') as HTMLButtonElement;
                const removeOptionBtn = document.querySelector('#remove-option') as HTMLButtonElement;
                const removeOptionsBtn = document.querySelector('#remove-options') as HTMLButtonElement;
                const selectEl = document.querySelector('#hs-select-with-dynamic-options') as HTMLElement;

                if (!(window as any).HSSelect || !selectEl) {
                    console.warn("HSSelect is not available or select element is missing");
                    return;
                }

                const select = (window as any).HSSelect.getInstance(selectEl);
                if (!select) {
                    console.warn("HSSelect instance not found");
                    return;
                }

                addOptionBtn?.addEventListener('click', () => {
                    select.addOption({
                        title: "Jannete Atkinson",
                        val: "4",
                        options: {
                            icon: `<img class="inline-block size-6 rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl|50" alt="Jannete Atkinson" />`
                        }
                    });
                });

                addOptionsBtn?.addEventListener('click', () => {
                    select.addOption([
                        {
                            title: "Kyle Peterson",
                            val: "5",
                            options: {
                                icon: `<img class="inline-block size-6 rounded-full" src="https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl|50" alt="Kyle Peterson" />`
                            }
                        },
                        {
                            title: "Brad Cooper",
                            val: "6",
                            options: {
                                icon: `<img class="inline-block size-6 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl|50" alt="Brad Cooper" />`
                            }
                        },
                        {
                            title: "Linette Johnson",
                            val: "7"
                        }
                    ]);
                });

                removeOptionBtn?.addEventListener('click', () => {
                    select.removeOption("4");
                });

                removeOptionsBtn?.addEventListener('click', () => {
                    select.removeOption(["5", "6", "7"]);
                });
            }, 200);
        };

        handleDynamicOptions();

        return () => {
            document.querySelector('#add-option')?.removeEventListener('click', handleDynamicOptions);
            document.querySelector('#add-options')?.removeEventListener('click', handleDynamicOptions);
            document.querySelector('#remove-option')?.removeEventListener('click', handleDynamicOptions);
            document.querySelector('#remove-options')?.removeEventListener('click', handleDynamicOptions);
        };
    }, []);

    ///
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                const destroyBtn = document.querySelector('#destroy') as HTMLButtonElement;
                const reinitBtn = document.querySelector('#reinit') as HTMLButtonElement;
                const selectEl = document.querySelector('#hs-select-temporary') as HTMLElement;
                const selectToggleIcon = document.querySelector('#hs-select-temporary-toggle-icon') as HTMLElement;

                if (!selectEl) {
                    console.error("Select element not found");
                    return;
                }

                if (!(window as any).HSSelect) {
                    console.error("HSSelect is not loaded");
                    return;
                }

                let select = (window as any).HSSelect.getInstance(selectEl);
                if (!select) {
                    select = new (window as any).HSSelect(selectEl);
                }

                // Disable the reinitialize button initially
                reinitBtn.setAttribute('disabled', 'true');
                destroyBtn.removeAttribute('disabled');

                destroyBtn.addEventListener('click', () => {
                    try {
                        select.destroy();
                    } catch (error) {
                        console.log(error);
                    }
                    selectToggleIcon.style.display = 'none';
                    reinitBtn.removeAttribute('disabled');
                    destroyBtn.setAttribute('disabled', 'true');
                });

                reinitBtn.addEventListener('click', () => {
                    new (window as any).HSSelect(selectEl);
                    selectToggleIcon.style.display = '';
                    reinitBtn.setAttribute('disabled', 'true');
                    destroyBtn.removeAttribute('disabled');
                });
            }, 1000); // Increased timeout for reliability
        };

        handleLoad();

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);


    //
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Advanced Select" />
            <Pageheader Heading="Advanced Select" breadcrumbs={['Forms', ' Form Elements']} currentpage="Advanced Select" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Basic Select" reactCode={formsPrism.advanvcedselect1}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                        "placeholder": "Select option...",
                                        "toggleTag": "<button type=\"button\"></button>",
                                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-light rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>
                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select With Placeholder" reactCode={formsPrism.advanvcedselect2}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                    "placeholder": "<span class=\"inline-flex items-center\"><svg class=\"flex-shrink-0 size-3.5 me-2\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/></svg> Filter</span>",
                                    "toggleTag": "<button type=\"button\"></button>",
                                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                    "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>
                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Multiple Select" reactCode={formsPrism.advanvcedselect3}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select multiple data-hs-select='{
                                        "placeholder": "Select multiple options...",
                                        "toggleTag": "<button type=\"button\"></button>",
                                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>

                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Multiple Select with counter" reactCode={formsPrism.advanvcedselect4}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select multiple data-hs-select='{
                                        "placeholder": "Select multiple options...",
                                        "toggleTag": "<button type=\"button\"></button>",
                                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                        "toggleCountText": "selected",
                                        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>

                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Search inside dropdown" reactCode={formsPrism.advanvcedselect5}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                      "hasSearch": true,
                                      "searchPlaceholder": "Search...",
                                      "searchClasses": "block w-full text-sm border-inputborder rounded-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary py-2 px-3 dark:placeholder:text-white/50",
                                      "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-bodybg",
                                      "placeholder": "Select country...",
                                      "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
                                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                      "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                      "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-gray-200\" data-title></div></div></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option defaultValue="Us"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/us_flag.jpg\" alt=\"USA\" />"}'>
                                    USA
                                </option>
                                <option defaultValue="ar"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/argentina_flag.jpg\" alt=\"Argentina\" />"}'>
                                    Argentina
                                </option>
                                <option defaultValue="ca"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/canada_flag.jpg\" alt=\"Canada\" />"}'>
                                    Canada
                                </option>
                                <option defaultValue="fr"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/french_flag.jpg\" alt=\"India\" />"}'>
                                    French
                                </option>
                                <option defaultValue="gr"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/germany_flag.jpg\" alt=\"Germany\" />"}'>
                                    Germany
                                </option>
                                <option defaultValue="it"
                                    data-hs-select-option='{
                                      "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../../assets/images/flags/italy_flag.jpg\" alt=\"Italy\" />"}'>
                                    Italy
                                </option>
                            </select>
                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Tags" reactCode={formsPrism.advanvcedselect6}>
                        {/* <!-- Select --> */}
                        <select multiple data-hs-select='{
                                    "placeholder": "Select option...",
                                    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-defaultborder dark:border-defaultborder/10 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-bodybg",
                                    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 dark:bg-bodybg dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                    "mode": "tags",
                                    "wrapperClasses": "relative ps-0.5 pe-9 min-h-[46px] !bg-white dark:!bg-bodybg flex items-center flex-wrap text-nowrap w-full border border-defaultborder dark:border-defaultborder/10 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-bodybg dark:border-defaultborder/10dark:text-neutral-400",
                                    "tagsItemTemplate": "<div class=\"flex flex-nowrap items-center relative z-10 bg-white border border-defaultborder dark:border-defaultborder/10 rounded-full p-1 m-1 dark:bg-bodybg dark:border-defaultborder/10\"><div class=\"size-6 me-1\" data-icon></div><div class=\"whitespace-nowrap text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer\" data-remove><svg class=\"shrink-0 size-3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg></div></div>",
                                    "tagsInputClasses": "py-3 w-full border-0 px-2 order-1 text-sm bg-white dark:bg-bodybg",
                                    "optionTemplate": "<div class=\"flex items-center\"><div class=\"size-8 me-2\" data-icon></div><div><div class=\"text-sm font-semibold text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"text-xs text-gray-500 dark:text-neutral-500 \" data-description></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
                                    "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                  }' className="hidden">
                            <option defaultValue="">Choose</option>
                            <option selected defaultValue="1" data-hs-select-option='{
                                        "description": "chris",
                                        "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
                                      }'>Christina</option>
                            <option defaultValue="2" data-hs-select-option='{
                                        "description": "david",
                                        "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
                                      }'>David</option>
                            <option defaultValue="3" disabled data-hs-select-option='{
                                        "description": "alex27",
                                        "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
                                      }'>Alex</option>
                            <option defaultValue="4" data-hs-select-option='{
                                        "description": "samia_samia",
                                        "icon": "<img class=\"inline-block rounded-full\" src=\"https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
                                      }'>Samia</option>
                        </select>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Custom template with icons" reactCode={formsPrism.advanvcedselect7}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                      "placeholder": "Select option...",
                                      "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
                                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                      "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                      "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"font-semibold text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"mt-1.5 text-sm text-gray-500 dark:text-white/70\" data-description></div></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option defaultValue="1" selected data-hs-select-option='{
                                        "description": "Visible to anyone who van view your content.",
                                        "icon": "<svg class=\"flex-shrink-0 size-4 text-gray-800 dark:text-gray-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" class=\"lucide lucide-globe-2\"><path d=\"M21.54 15H17a2 2 0 0 0-2 2v4.54\"/><path d=\"M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17\"/><path d=\"M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>"
                                      }'>Anyone</option>

                                <option defaultValue="2" data-hs-select-option='{
                                        "description": "Only visible to you.",
                                        "icon": "<svg class=\"flex-shrink-0 size-4 text-gray-800 dark:text-gray-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" class=\"lucide lucide-lock\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>"
                                      }'>Only you</option>
                            </select>

                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Custom template with avatars" reactCode={formsPrism.advanvcedselect8}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                      "placeholder": "Select assignee",
                                      "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
                                      "toggleClasses": "hs-select-disabled:pointer-events-none items-center hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                      "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                      "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                      "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-primary\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option selected defaultValue="1"
                                    data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/10.jpg\" alt=\"James Collins\" />"}'>
                                    James Collins
                                </option>

                                <option defaultValue="2"
                                    data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/1.jpg\" alt=\"Amanda Harvey\" />"}'>
                                    Amanda Harvey
                                </option>

                                <option defaultValue="3"
                                    data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/11.jpg\" alt=\"Costa Quinn\" />"}'>
                                    Costa Quinn
                                </option>
                            </select>

                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-6 xxl:col-span-12">
                    <Showcode title="Select Sizes" reactCode={formsPrism.advanvcedselect9}>
                        <div className="space-y-3">
                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select data-hs-select='{
                                            "placeholder": "Select option...",
                                            "toggleTag": "<button type=\"button\"></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option>Name</option>
                                    <option>Email address</option>
                                    <option>Description</option>
                                    <option>User ID</option>
                                </select>
                                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}

                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select data-hs-select='{
                                            "placeholder": "Select option...",
                                            "toggleTag": "<button type=\"button\"></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                            }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option>Name</option>
                                    <option>Email address</option>
                                    <option>Description</option>
                                    <option>User ID</option>
                                </select>
                                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}

                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select data-hs-select='{
                                            "placeholder": "Select option...",
                                            "toggleTag": "<button type=\"button\"></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative sm:p-5 p-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                            }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option>Name</option>
                                    <option>Email address</option>
                                    <option>Description</option>
                                    <option>User ID</option>
                                </select>
                                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-12">
                    <Showcode title="Select Disabled" reactCode={formsPrism.advanvcedselect10}>
                        {/* <!-- Select --> */}
                        <div className="relative">
                            <select data-hs-select='{
                                      "placeholder": "Select option...",
                                      "toggleTag": "<button type=\"button\"></button>",
                                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                      "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                    }' className="hidden" disabled>
                                <option defaultValue="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>

                            <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>
                        {/* <!-- End Select --> */}
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Validation states" reactCode={formsPrism.advanvcedselect11} customCardBodyClass="space-y-4">
                        <div>
                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select data-hs-select='{
                                        "placeholder": "Select option...",
                                        "toggleTag": "<button type=\"button\"></button>",
                                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-danger rounded-sm text-start text-sm focus:border-danger focus:ring-danger before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1",
                                        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option>Name</option>
                                    <option>Email address</option>
                                    <option>Description</option>
                                    <option>User ID</option>
                                </select>

                                <div className="absolute top-1/2 end-8 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-4 text-danger"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" x2="12" y1="8" y2="12" />
                                        <line x1="12" x2="12.01" y1="16" y2="16" />
                                    </svg>
                                </div>

                                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}
                            <p className="text-xs text-danger mt-2">Please select a valid state.</p>
                        </div>

                        <div>
                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select data-hs-select='{
                                        "placeholder": "Select option...",
                                        "toggleTag": "<button type=\"button\"></button>",
                                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-success rounded-sm text-start text-sm focus:border-success focus:!ring-success before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                        "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option>Name</option>
                                    <option>Email address</option>
                                    <option>Description</option>
                                    <option>User ID</option>
                                </select>

                                <div className="absolute inset-y-0 end-8 flex items-center pointer-events-none">
                                    <svg className="flex-shrink-0 size-4 text-success"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>

                                <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}
                            <p className="text-xs text-success mt-2">Looks good!</p>
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Validation states" reactCode={formsPrism.advanvcedselect12} >
                        <div className="max-w-sm">
                            {/* <!-- Select --> */}
                            <select id="hs-select-with-dynamic-options" data-hs-select='{
                                      "placeholder": "Select assignee",
                                      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
                                      "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                      "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                      "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-neutral-200 \" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
                                      "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                    }' className="hidden">
                                <option defaultValue="">Choose</option>
                                <option defaultValue="1" data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80\" alt=\"James Collins\" />"}'>
                                    James Collins
                                </option>
                                <option defaultValue="2" data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80\" alt=\"Amanda Harvey\" />"}'>
                                    Amanda Harvey
                                </option>
                                <option defaultValue="3" data-hs-select-option='{
                                        "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80\" alt=\"Costa Quinn\" />"}'>
                                    Costa Quinn
                                </option>
                            </select>
                            {/* <!-- End Select --> */}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <SpkButton buttontype="button" Id="add-option" customClass="py-1 px-2 inline-flex my-2 bg-primary/10 text-primary items-center gap-x-1 text-sm rounded-md border border-transparent  disabled:opacity-50 disabled:pointer-events-none">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                Add one option
                            </SpkButton>
                            <SpkButton buttontype="button" Id="add-options" customClass="py-1 px-2 my-2 bg-primary/10 text-primary inline-flex items-center gap-x-1 text-sm rounded-md border border-transparent disabled:opacity-50 disabled:pointer-events-none">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                Add three options
                            </SpkButton>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <SpkButton Id="remove-option" customClass="py-2 px-2 inline-flex items-center gap-x-1 text-sm rounded-md border border-defaultborder bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                Remove value 4
                            </SpkButton>
                            <SpkButton buttontype="button" Id="remove-options" customClass="py-2 px-2 inline-flex items-center gap-x-1 text-sm rounded-md border border-defaultborder bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                Remove values 5, 6, 7
                            </SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Select Validation states" reactCode={formsPrism.advanvcedselect13} >
                        <div className="space-y-3">
                            <div id="validation-target" ref={validationTargetRef} className={`mb-4 ${validationState === 'error' ? 'error' : ''} ${validationState === 'success' ? 'success' : ''}`}>
                                {/* <!-- Select --> */}
                                <div className="relative">
                                    <select data-hs-select='{
                                            "placeholder": "Select option...",
                                            "toggleTag": "<button type=\"button\"></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border hs-error:border-danger hs-success:border-success rounded-sm text-start text-sm hs-error:focus:border-danger hs-success:focus:border-success hs-error:focus:ring-danger hs-success:focus:ring-success before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:text-white/70 dark:focus:outline-none dark:focus:ring-1 dark:border-white/10 dark:focus:ring-primary",
                                            "dropdownClasses": "mt-2 z-40 w-full max-h-72 p-1 space-y-0.5 bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                            }' className="hidden">
                                        <option defaultValue="">Choose</option>
                                        <option>Name</option>
                                        <option>Email address</option>
                                        <option>Description</option>
                                        <option>User ID</option>
                                    </select>
                                    {validationState === 'error' && (
                                        <div className="hidden hs-error:block absolute top-1/2 end-8 -translate-y-1/2">
                                            <svg className="flex-shrink-0 size-4 text-danger"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" x2="12" y1="8" y2="12" />
                                                <line x1="12" x2="12.01" y1="16" y2="16" />
                                            </svg>
                                        </div>
                                    )}
                                    {validationState === 'success' && (
                                        <div
                                            className="hidden hs-success:flex absolute inset-y-0 end-8 items-center pointer-events-none">
                                            <svg className="flex-shrink-0 size-4 text-success"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-1/2 end-3 -translate-y-1/2">
                                        <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m7 15 5 5 5-5" />
                                            <path d="m7 9 5-5 5 5" />
                                        </svg>
                                    </div>
                                </div>
                                {/* <!-- End Select --> */}
                                {validationState === 'error' && (
                                    <p className="hidden hs-error:block text-sm text-danger mt-2">Please select a valid
                                        state.</p>
                                )}
                                {validationState === 'success' && (
                                    <p className="hidden hs-success:flex text-sm text-success mt-2">Looks good!</p>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <SpkButton buttontype="button" Id="trigger-success" onclickfunc={handleSuccessClick}
                                    customClass="py-1 px-2 text-sm font-medium rounded-md border border-success/30 bg-success/10 dark:bg-success/25 text-success dark:text-success hover:bg-success/20 dark:hover:bg-success/50">
                                    Success
                                </SpkButton>
                                <SpkButton buttontype="button" Id="trigger-error" onclickfunc={handleErrorClick}
                                    customClass="py-1 px-2 text-sm font-medium rounded-md border border-danger/30 bg-danger/10 dark:bg-danger/25 text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/50">
                                    Error
                                </SpkButton>
                                <SpkButton buttontype="button" Id="trigger-clear" onclickfunc={handleClearClick}
                                    customClass="py-1 px-2 text-sm font-medium rounded-md border dark:border-white/10 bg-gray-100 dark:bg-gray-800/25 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-bodybg/50">
                                    Clear
                                </SpkButton>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-span-6">
                    <Showcode title="Destroy/Reinitialize Select" reactCode={formsPrism.advanvcedselect14} >
                        <div className="max-w-sm space-y-3">
                            {/* <!-- Select --> */}
                            <div className="relative">
                                <select id="hs-select-temporary" data-hs-select='{
                                            "placeholder": "Select assignee",
                                            "toggleTag": "<button type=\"button\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200\" data-title></span></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-inputborder rounded-sm text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary",
                                            "dropdownClasses": "mt-2 max-h-72 p-1 space-y-0.5 z-20 w-full bg-white border border-inputborder rounded-sm overflow-hidden overflow-y-auto dark:bg-bodybg dark:border-white/10",
                                            "optionClasses": "py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-sm focus:outline-none focus:bg-gray-100 dark:bg-bodybg dark:hover:bg-bodybg dark:text-gray-200 dark:focus:bg-bodybg",
                                            "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div><div class=\"hs-selected:font-semibold text-sm text-gray-800 dark:text-gray-200\" data-title></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-primary\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>"
                                            }' className="hidden">
                                    <option defaultValue="">Choose</option>
                                    <option defaultValue="1"
                                        data-hs-select-option='{
                                            "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/1.jpg\" alt=\"James Collins\" />"}'>
                                        James Collins
                                    </option>
                                    <option defaultValue="2"
                                        data-hs-select-option='{
                                            "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/2.jpg\" alt=\"Amanda Harvey\" />"}'>
                                        Amanda Harvey
                                    </option>
                                    <option defaultValue="3"
                                        data-hs-select-option='{
                                            "icon": "<img class=\"inline-block size-6 rounded-full\" src=\"../../../assets/images/faces/10.jpg\" alt=\"Costa Quinn\" />"}'>
                                        Costa Quinn
                                    </option>
                                </select>
                                <div id="hs-select-temporary-toggle-icon"
                                    className="absolute top-1/2 end-3 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-white/70"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </div>
                            </div>
                            {/* <!-- End Select --> */}
                            <div className="flex flex-wrap gap-2">
                                <SpkButton buttontype="button" Id="destroy"
                                    customClass="py-1 px-2 text-sm font-medium rounded-md border border-danger/30 bg-danger/10 dark:bg-danger/25 text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/50">
                                    Destroy Select
                                </SpkButton>
                                <SpkButton buttontype="button" Id="reinit"
                                    customClass="py-1 px-2 text-sm font-medium rounded-md border dark:border-white/10 bg-gray-100 dark:bg-gray-800/25 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-bodybg/50">
                                    Reinitialize Select
                                </SpkButton>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}
        </Fragment>
    );
};

export default Advancedselect;