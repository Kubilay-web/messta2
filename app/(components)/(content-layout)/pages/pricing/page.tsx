"use client"
import { PricingCards } from "@/shared/data/pages/pricingdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const Pricing = () => {

    const [isMonthly, setIsMonthly] = useState(true);

    const handleToggle = () => {
        setIsMonthly(!isMonthly);
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Pricing" />
            <Pageheader Heading="Pricing" breadcrumbs={['Pages']} currentpage="Pricing" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6 mb-[3rem]">
                {PricingCards.map((idx) => (
                    <div key={idx.id} className="lg:col-span-12 xl:col-span-4 xxl:col-span-4 md:col-span-12 sm:col-span-12 col-span-12">
                        <div className={`box pricing-card ${idx.bestPlan ? 'hover' : ''}`}>
                            <div className="box-body !p-[3rem]">
                                {idx.bestPlan && (
                                    <div className="ribbon-2 ribbon-primary ribbon-right">Best Plan</div>
                                )}
                                <div className="text-center">
                                    <h4 className="font-medium mb-1">{idx.name}</h4>
                                    <span className="mb-1 text-textmuted dark:text-textmuted/50 block">
                                        {idx.description}
                                    </span>
                                    <h2 className="mb-0 font-bold block text-gradient sm:text-[2rem] text-[1.2rem]">
                                        {idx.price}/<span className="text-[0.75rem] text-default font-medium ms-1">
                                            {idx.pricePerMonth}
                                        </span>
                                    </h2>
                                </div>
                                <hr className="border-t my-4" />
                                <ul className="list-unstyled pricing-body">
                                    {idx.features.map((feature, index) => (
                                        <li key={index}>
                                            <div className="flex items-center">
                                                <span className="avatar avatar-xs svg-success">
                                                    <i className="ti ti-check text-success text-[1.125rem]"></i>
                                                </span>
                                                <span className="ms-2 my-auto flex-grow">{feature.text}</span>
                                                {feature.badge && (
                                                    <span className={`badge bg-${feature.color} text-${feature.textColor} !rounded-full`}>
                                                        <i className={`ri-${feature.icon} text-warning me-1`}></i> {feature.badge}
                                                    </span>
                                                )}
                                                {feature.additionalText && (
                                                    <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem] font-medium">
                                                        {feature.additionalText}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <hr className="border-t my-4" />
                                {idx.btn ? (
                                    <button type="button" className="ti-btn ti-btn-lg ti-btn-outline-primary grid w-full btn-wave">
                                        <span className="ms-4 me-4">Start Today</span>
                                    </button>
                                ) : (
                                    <button type="button" className="ti-btn ti-btn-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white grid w-full btn-wave waves-effect waves-light">
                                        <span className="ms-4 me-4">Start Today</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12" id="convertable-pricing">
                    <div className="flex justify-center mb-4">
                        <div className="switcher-box">
                            <span>Monthly</span>
                            <div className="switcher-pricing text-center">
                                <input type="checkbox" className="pricing-toggle"  checked={!isMonthly}
                                    onChange={handleToggle} />
                            </div>
                            <span>Yearly</span>
                        </div>
                    </div>
                    <div className={`tab-content ${isMonthly ? 'show' : ''}`} id="monthly1">
                        <div className="grid grid-cols-12 gap-x-6">
                            {PricingCards.map((idx) => (
                                <div key={idx.id} className="xl:col-span-4 md:col-span-12 sm:col-span-12 col-span-12">
                                    <div className={`box pricing-card ${idx.bestPlan ? 'hover' : ''}`}>
                                        <div className="box-body !p-[3rem]">
                                            {idx.bestPlan && (
                                                <div className="ribbon-2 ribbon-primary ribbon-right">Best Plan</div>
                                            )}
                                            <div className="text-center">
                                                <h4 className="font-medium mb-1">{idx.name}</h4>
                                                <span className="mb-1 text-textmuted dark:text-textmuted/50 block">
                                                    {idx.description}
                                                </span>
                                                <h2 className="mb-0 font-bold block text-gradient sm:text-[2rem] text-[1.2rem]">
                                                    {idx.price}/<span className="text-[0.75rem] text-default font-medium ms-1">
                                                        {idx.pricePerMonth}
                                                    </span>
                                                </h2>
                                            </div>
                                            <hr className="border-t my-4" />
                                            <ul className="list-unstyled pricing-body">
                                                {idx.features.map((feature, index) => (
                                                    <li key={index}>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-xs svg-success">
                                                                <i className="ti ti-check text-success text-[1.125rem]"></i>
                                                            </span>
                                                            <span className="ms-2 my-auto flex-grow">{feature.text}</span>
                                                            {feature.badge && (
                                                                <span className={`badge bg-${feature.color} text-${feature.textColor} !rounded-full`}>
                                                                    <i className={`ri-${feature.icon} text-warning me-1`}></i> {feature.badge}
                                                                </span>
                                                            )}
                                                            {feature.additionalText && (
                                                                <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem] font-medium">
                                                                    {feature.additionalText}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <hr className="border-t my-4" />
                                            {idx.btn ? (
                                                <button type="button" className="ti-btn ti-btn-lg ti-btn-outline-primary grid w-full btn-wave">
                                                    <span className="ms-4 me-4">Start Today</span>
                                                </button>
                                            ) : (
                                                <button type="button" className="ti-btn ti-btn-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white grid w-full btn-wave waves-effect waves-light">
                                                    <span className="ms-4 me-4">Start Today</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`tab-content ${isMonthly ? '' : 'show'}`} id="yearly1">
                        <div className="grid grid-cols-12 gap-x-6">
                            {PricingCards.map((idx) => (
                                <div key={idx.id} className="xl:col-span-4 md:col-span-12 sm:col-span-12 col-span-12">
                                    <div className={`box pricing-card ${idx.bestPlan ? 'hover' : ''}`}>
                                        <div className="box-body !p-[3rem]">
                                            {idx.bestPlan && (
                                                <div className="ribbon-2 ribbon-primary ribbon-right">Best Plan</div>
                                            )}
                                            <div className="text-center">
                                                <h4 className="font-medium mb-1">{idx.name}</h4>
                                                <span className="mb-1 text-textmuted dark:text-textmuted/50 block">
                                                    {idx.description}
                                                </span>
                                                <h2 className="mb-0 font-bold block text-gradient sm:text-[2rem] text-[1.2rem]">
                                                    {idx.yearlyPrice}/<span className="text-[0.75rem] text-default font-medium ms-1">
                                                        {idx.pricePerYearly}
                                                    </span>
                                                </h2>
                                            </div>
                                            <hr className="border-t my-4" />
                                            <ul className="list-unstyled pricing-body">
                                                {idx.features.map((feature, index) => (
                                                    <li key={index}>
                                                        <div className="flex items-center">
                                                            <span className="avatar avatar-xs svg-success">
                                                                <i className="ti ti-check text-success text-[1.125rem]"></i>
                                                            </span>
                                                            <span className="ms-2 my-auto flex-grow">{feature.text}</span>
                                                            {feature.badge && (
                                                                <span className={`badge bg-${feature.color} text-${feature.textColor} !rounded-full`}>
                                                                    <i className={`ri-${feature.icon} text-warning me-1`}></i> {feature.badge}
                                                                </span>
                                                            )}
                                                            {feature.additionalText && (
                                                                <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem] font-medium">
                                                                    {feature.additionalText}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <hr className="border-t my-4" />
                                            {idx.btn ? (
                                                <button type="button" className="ti-btn ti-btn-lg ti-btn-outline-primary grid w-full btn-wave">
                                                    <span className="ms-4 me-4">Start Today</span>
                                                </button>
                                            ) : (
                                                <button type="button" className="ti-btn ti-btn-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white grid w-full btn-wave waves-effect waves-light">
                                                    <span className="ms-4 me-4">Start Today</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="text-center my-5">
                        <nav className="bg-primary/10 p-1 mb-4 inline-flex !shadow-sm rounded-full bg-white dark:bg-bodybg" aria-label="Tabs" role="tablist">
                            <Link scroll={false} href="#!" className="hs-tab-active:bg-primary hs-tab-active:text-white cursor-pointer text-primary py-2 px-4  text-sm font-medium text-center rounded-full hover:text-primary active"
                                id="pricing-item" data-hs-tab="#pricing-monthly1-pane"
                                aria-controls="pricing-monthly1-pane"> Monthly
                            </Link>
                            <Link scroll={false} href="#!" className="hs-tab-active:bg-primary hs-tab-active:text-white cursor-pointer text-primary py-2 px-4 text-sm font-medium text-center  rounded-full hover:text-primary "
                                id="pricing-yearly1-item" data-hs-tab="#pricing-yearly1-pane"
                                aria-controls="pricing-yearly1-pane"> Yearly
                            </Link>
                        </nav>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane show active !p-0 border-0" id="pricing-monthly1-pane" role="tabpanel" aria-labelledby="pricing-item">
                            <div className="box !shadow-none overflow-hidden !border-0">
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table table-bordered ti-custom-table-head w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="row"
                                                        className="bg-primary text-white border-e !border-white/10">
                                                        <div className="flex items-center">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-lg rounded bg-white/[0.15] "><i
                                                                        className="bx bx-headphone"></i></span>
                                                            </div>
                                                            <div className="flex-grow text-start">
                                                                <p className="h5 mb-0 text-white">Contact Us!</p>
                                                                <Link scroll={false} href="#!"
                                                                    className="text-white opacity-80">Start <i
                                                                        className="fe fe-chevrons-right ms-1 text-[0.875rem]"></i></Link>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th scope="row"
                                                        className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2">
                                                            Newest</p>
                                                        <p className="h5 mb-0 text-white">Free</p>
                                                        <p className="h3 text-white mb-0">$0<span className="text-[0.8125rem] opacity-50 ms-1">/ month</span></p>
                                                    </th>
                                                    <th scope="row" className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2"> Popular</p>
                                                        <p className="h5 mb-0 text-white">Starter</p>
                                                        <p className="h3 text-white mb-0">$9<span className="text-[0.8125rem] opacity-50 ms-1">/ month</span></p>
                                                    </th>
                                                    <th scope="row" className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-warning rounded font-semibold mb-2"> Recommended</p>
                                                        <p className="h5 mb-0 text-white">Pro</p>
                                                        <p className="h3 text-white mb-0">$15<span className="text-[0.8125rem] opacity-50 ms-1">/ month</span></p>
                                                    </th>
                                                    <th scope="row" className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2"> Most Used</p>
                                                        <p className="h5 mb-0 text-white">Business</p>
                                                        <p className="h3 text-white mb-0">$29<span className="text-[0.8125rem] opacity-50 ms-1">/ month</span></p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td colSpan={5} className="pricing-feature font-bold">Site Features</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Drag and Drop Builder
                                                    </td>
                                                    <td>1</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">No of Pages</td>
                                                    <td>1</td>
                                                    <td>Unlimited</td>
                                                    <td>Unlimited</td>
                                                    <td>Unlimited</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Customizable footer
                                                    </td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Responsive Design</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">SEO Optimization</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Social Media
                                                        Management</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Custom Forms</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">E-commerce</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Content Management
                                                    </td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td colSpan={5} className="pricing-feature font-bold">Functionality
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Search Functionality
                                                    </td>
                                                    <td>Upto 5</td>
                                                    <td>Upto 10</td>
                                                    <td>Upto 25</td>
                                                    <td>Unlimited</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Custom Forms</td>
                                                    <td>3%</td>
                                                    <td>3%</td>
                                                    <td>3%</td>
                                                    <td>0%</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Blogging Platform</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Analytics Integration
                                                    </td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Membership System</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Video Integration</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div>
                                                            <Link scroll={false} href="#!"
                                                                className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">Get
                                                                Started<i
                                                                    className="ti ti-arrow-narrow-right ms-1"></i></Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <Link scroll={false} href="#!"
                                                                className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">Get
                                                                Started<i
                                                                    className="ti ti-arrow-narrow-right ms-1"></i></Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <Link scroll={false} href="#!"
                                                                className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">Get
                                                                Started<i
                                                                    className="ti ti-arrow-narrow-right ms-1"></i></Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <Link scroll={false} href="#!"
                                                                className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">Get
                                                                Started<i
                                                                    className="ti ti-arrow-narrow-right ms-1"></i></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane p-0 border-0 hidden" id="pricing-yearly1-pane" role="tabpanel" aria-labelledby="pricing-yearly1-item">
                            <div className="box !shadow-none !border-0 reveal">
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table table-bordered ti-custom-table-head w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="row"
                                                        className="bg-primary text-white border-e dark:border-defaultborder/10 border-white/10">
                                                        <div className="flex items-center">
                                                            <div className="me-3">
                                                                <span className="avatar avatar-lg rounded bg-white/[0.15] "><i className="bx bx-headphone"></i></span>
                                                            </div>
                                                            <div className="flex-grow text-start">
                                                                <p className="h5 mb-0 text-white">Contact Us!</p>
                                                                <Link scroll={false} href="#!" className="text-white opacity-80">Start <i className="fe fe-chevrons-right ms-1 text-[0.875rem]"></i></Link>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th scope="row"
                                                        className="bg-primary text-white border-e  dark:border-defaultborder/10 !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2"> Newest</p>
                                                        <p className="h5 mb-0 text-white">Free</p>
                                                        <p className="h3 text-white mb-0">$19<span className="text-[0.8125rem] opacity-50 ms-1">/ year</span></p>
                                                    </th>
                                                    <th scope="row"
                                                        className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2">
                                                            Popular</p>
                                                        <p className="h5 mb-0 text-white">Starter</p>
                                                        <p className="h3 text-white mb-0">$49<span
                                                            className="text-[0.8125rem] opacity-50 ms-1">/ year</span></p>
                                                    </th>
                                                    <th scope="row" className="bg-primary text-white border-e !border-white/10">
                                                        <p className="badge badge-lg bg-warning fs-white rounded font-semibold mb-2">
                                                            Recommended</p>
                                                        <p className="h5 mb-0 text-white">Pro</p>
                                                        <p className="h3 text-white mb-0">$75<span
                                                            className="text-[0.8125rem] opacity-50 ms-1">/ year</span></p>
                                                    </th>
                                                    <th scope="row" className="bg-primary text-white p-4 border-e !border-white/10">
                                                        <p className="badge badge-lg bg-white/[0.15] rounded font-semibold mb-2"> Most Used</p>
                                                        <p className="h5 mb-0 text-white">Business</p>
                                                        <p className="h3 text-white mb-0">$99<span className="text-[0.8125rem] opacity-50 ms-1">/ year</span></p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border  border-defaultborder dark:border-defaultborder/10">
                                                    <td colSpan={5} className="pricing-feature font-bold">Site Features</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Drag and Drop Builder</td>
                                                    <td>1</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">No of Pages</td>
                                                    <td>1</td>
                                                    <td>Unlimited</td>
                                                    <td>Unlimited</td>
                                                    <td>Unlimited</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Customizable footer </td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Responsive Design</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">SEO Optimization</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Social Media Management</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Custom Forms</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">E-commerce</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Content Management
                                                    </td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td colSpan={5} className="pricing-feature font-bold">Functionality
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Search Functionality </td>
                                                    <td>Upto 5</td>
                                                    <td>Upto 10</td>
                                                    <td>Upto 25</td>
                                                    <td>Unlimited</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Custom Forms</td>
                                                    <td>3%</td>
                                                    <td>3%</td>
                                                    <td>3%</td>
                                                    <td>0%</td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Blogging Platform</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Analytics Integration
                                                    </td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Membership System</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td className="pricing-feature font-semibold">Video Integration</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td><i className="fe fe-check-circle text-success"></i></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div className="grid">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">
                                                                Get Started<i className="ti ti-arrow-narrow-right ms-1"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="grid">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">
                                                                Get  Started<i className="ti ti-arrow-narrow-right ms-1"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="grid">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">
                                                                Get Started<i className="ti ti-arrow-narrow-right ms-1"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="grid">
                                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-w-lg bg-gradient-to-r from-primary to-secondary !border-0 !text-white btn-wave">
                                                                Get Started<i className="ti ti-arrow-narrow-right ms-1"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}
        </Fragment>
    );
};

export default Pricing;