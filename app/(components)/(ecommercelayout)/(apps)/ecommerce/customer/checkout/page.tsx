"use client"
import Link from "next/link";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState } from "react";
import Image from "next/image";

const Checkout = () => {

    //Citydata select
    const Citydata = [
        { value: 'Georgetown', label: 'Georgetown' },
        { value: 'Alexandria', label: 'Alexandria' },
        { value: 'Rockville', label: 'Rockville' },
        { value: 'Frederick', label: 'Frederick' },
    ]
    //Statedata select
    const Statedata = [
        { value: 'Washington,D.C', label: 'Washington,D.C' },
        { value: 'California', label: 'California' },
        { value: 'Texas', label: 'Texas' },
        { value: 'Alaska', label: 'Alaska' },
    ]


    const [key, setKey] = useState("first");

    const handleNext = () => {
        switch (key) {
            case "first":
                setKey("second");
                break;
            case "second":
                setKey("third");
                break;
            case "third":
                setKey("fourth");
                break;
            default:
                break;
        }
    };

    const handlePrevious = () => {
        switch (key) {
            case "second":
                setKey("first");
                break;
            case "third":
                setKey("second");
                break;
            case "fourth":
                setKey("third");
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Checkout"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Checkout" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-3 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title me-1">Order Summary</div><span
                                        className="badge bg-primary/[0.15] text-primary !rounded-full">02</span>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group mb-0 !border-0 !rounded-none">
                                        <li className="ti-list-group-item border-t-0">
                                            <div className="flex items-center flex-wrap">
                                                <div className="me-2">
                                                    <span className="avatar avatar-lg bg-light">
                                                        <Image fill src="../../../assets/images/ecommerce/png/1.png" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="mb-0 font-semibold">Spectrum Striders</p>
                                                    <p
                                                        className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                                                        Quantity : 2 <span
                                                            className="badge bg-success/[0.15] text-success ms-3">30%
                                                            Off</span></p>
                                                </div>
                                                <div>
                                                    <p className="mb-0 text-end">
                                                        <Link href="#!">
                                                            <i
                                                                className="ri-close-line text-[1rem] text-textmuted dark:text-textmuted/50"></i>
                                                        </Link>
                                                    </p>
                                                    <p className="mb-0 text-[0.875rem] font-semibold">$189<span
                                                        className="ms-1 text-textmuted dark:text-textmuted/50 text-[0.6875rem] d-inline-block"><s>$329</s></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item  !border-b !border-dashed">
                                            <div className="flex items-center flex-wrap">
                                                <div className="me-2">
                                                    <span className="avatar avatar-lg bg-light">
                                                        <Image fill src="../../../assets/images/ecommerce/png/7.png" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="mb-0 font-semibold">Leather Hand Bag</p>
                                                    <p
                                                        className="mb-0 text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                                                        Quantity : 1 <span
                                                            className="badge bg-success/[0.15] text-success ms-3">10%
                                                            Off</span></p>
                                                </div>
                                                <div>
                                                    <p className="mb-0 text-end">
                                                        <Link href="#!">
                                                            <i
                                                                className="ri-close-line text-[1rem] text-textmuted dark:text-textmuted/50"></i>
                                                        </Link>
                                                    </p>
                                                    <p className="mb-0 text-[0.875rem] font-semibold">$129<span
                                                        className="ms-1 text-textmuted dark:text-textmuted/50 text-[0.6875rem] d-inline-block"><s>$139</s></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div
                                        className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <div
                                                className="text-[0.75rem] font-semibold bg-primary/[0.15] text-primary badge badge-md rounded">
                                                SPRUKO25</div>
                                            <div className="text-success">COUPON APPLIED</div>
                                        </div>
                                    </div>
                                    <div
                                        className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Sub Total
                                            </div>
                                            <div className="font-semibold text-[0.875rem]">$318</div>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Discount</div>
                                            <div className="font-semibold text-[0.875rem] text-success">10% - $31.8</div>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Delivery
                                                Charges</div>
                                            <div className="font-semibold text-[0.875rem] text-danger">- $29</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Service Tax
                                                (18%)</div>
                                            <div className="font-semibold text-[0.875rem]">- $45.29</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="fs-15">Total :</div>
                                            <div className="font-semibold text-[1rem] text-dark"> $1,387</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-9 col-span-12">
                            <div className="box">
                                <div className="box-body !p-0  product-checkout">
                                    <nav className="justify-start !border-b !border-dashed border-defaultborder dark:border-defaultborder/10"
                                        aria-label="Tabs" >
                                        <Link scroll={false} key="first" onClick={() => setKey("first")}
                                        className={` ${key === "first" ? "active" : ""} hs-tab-active:text-primary hs-tab-active:relative hs-tab-active:before:bg-primary hs-tab-active:before:absolute hs-tab-active:before:start-0 hs-tab-active:before:end-0 hs-tab-active:before:bottom-0 hs-tab-active:before:h-[0.175rem] hs-tab-active:before:rounded-full text-defaulttextcolor cursor-pointer dark:text-defaulttextcolor/80 !p-2 text-sm inline-flex !d-sm-block items-center flex-grow font-medium text-center rounded-none hover:text-primary custom-checkout`}
                                        id="order-tab" data-hs-tab="#order-tab-pane" aria-controls="order-tab-pane" href="#!">
                                            <i
                                                className="ri-truck-line me-2 align-middle w-[1.875rem] h-[1.875rem] p-[0.3rem] rounded-full hs-tab-active:bg-primary/10 bg-light !block"></i>Shipping
                                        </Link>
                                        <Link scroll={false} key="second" onClick={() => setKey("second")}
                                        className={` ${key === "second" ? "active" : ""} hs-tab-active:text-primary hs-tab-active:relative hs-tab-active:before:bg-primary hs-tab-active:before:absolute hs-tab-active:before:start-0 hs-tab-active:before:end-0 hs-tab-active:before:bottom-0 hs-tab-active:before:h-[0.175rem] hs-tab-active:before:rounded-full text-defaulttextcolor cursor-pointer dark:text-defaulttextcolor/80 !p-2 text-sm inline-flex items-center flex-grow font-medium text-center rounded-none hover:text-primary custom-checkout`}
                                        id="confirmed-tab" data-hs-tab="#confirm-tab-pane"
                                        aria-controls="confirm-tab-pane" href="#!"> <i
                                                className="ri-user-3-line me-2 align-middle w-[1.875rem] h-[1.875rem] p-[0.3rem] rounded-full hs-tab-active:bg-primary/10 bg-light !block "></i>Personal Details
                                        </Link>
                                        <Link scroll={false} key="third" onClick={() => setKey("third")}
                                        className={` ${key === "third" ? "active" : ""} hs-tab-active:text-primary hs-tab-active:relative hs-tab-active:before:bg-primary hs-tab-active:before:absolute hs-tab-active:before:start-0 hs-tab-active:before:end-0 hs-tab-active:before:bottom-0 hs-tab-active:before:h-[0.175rem] hs-tab-active:before:rounded-full text-defaulttextcolor cursor-pointer dark:text-defaulttextcolor/80 !p-2 text-sm inline-flex items-center flex-grow font-medium text-center rounded-none hover:text-primary custom-checkout`}
                                        id="shipped-tab" data-hs-tab="#shipped-tab-pane"
                                        aria-controls="shipped-tab-pane" href="#!"> <i
                                                className="ri-bank-card-line me-2 align-middle w-[1.875rem] h-[1.875rem] p-[0.3rem] rounded-full hs-tab-active:bg-primary/10 bg-light !block "></i>Payment
                                        </Link>
                                        <Link scroll={false} key="fourth" onClick={() => setKey("fourth")}
                                        className={` ${key === "fourth" ? "active" : ""} hs-tab-active:text-primary hs-tab-active:relative hs-tab-active:before:bg-primary hs-tab-active:before:absolute hs-tab-active:before:start-0 hs-tab-active:before:end-0 hs-tab-active:before:bottom-0 hs-tab-active:before:h-[0.175rem] hs-tab-active:before:rounded-full text-defaulttextcolor cursor-pointer dark:text-defaulttextcolor/80 !p-2 text-sm inline-flex items-center flex-grow font-medium text-center rounded-none hover:text-primary custom-checkout`}
                                        id="delivered-tab" data-hs-tab="#delivery-tab-pane"
                                        aria-controls="delivery-tab-pane" href="#!"> <i
                                                className="ri-checkbox-circle-line me-2 align-middle w-[1.875rem] h-[1.875rem] p-[0.3rem] rounded-full hs-tab-active:bg-primary/10 bg-light !block"></i>Confirmation
                                        </Link>
                                    </nav>
                                    <div className="tab-content" id="myTabContent">
                                        {key === "first" && (
                                            <div className="tab-pane fade  text-defaulttextcolor dark:!text-defaulttextcolor/70 !border-0 !p-0"
                                                id="order-tab-pane" aria-labelledby="order-tab" role="tabpanel"
                                                tabIndex={0}>
                                                <div className="p-6">
                                                    <p
                                                        className="mb-1 font-semibold text-[#8c9097] dark:text-white/50 opacity-[0.5] text-[1.25rem]">
                                                        01</p>
                                                    <div
                                                        className="text-[0.9375rem] font-semibold sm:flex block items-center justify-between mb-4">
                                                        <div>Shipping Address :</div>
                                                        <div className="sm:mt-0 mt-2"> <Link scroll={false} href="#!"
                                                            className="ti-btn bg-primary text-white !py-1 !px-2 !text-[0.75rem]"
                                                            data-hs-overlay="#modal-new-address"><i
                                                                className="ri-add-line  align-middle text-[0.875rem] font-semibold inline-block"></i>Add
                                                            New Address </Link>
                                                            <div id="modal-new-address" className="hs-overlay hidden ti-modal">
                                                                <div
                                                                    className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
                                                                    <div className="ti-modal-content">
                                                                        <div className="ti-modal-header">
                                                                            <h6 className="modal-title text-[1rem] font-semibold"
                                                                                id="modal-new-addres">New Address</h6>
                                                                            <button type="button"
                                                                                className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                                                                                data-hs-overlay="#modal-new-address"> <span
                                                                                    className="sr-only">Close</span> <i
                                                                                        className="ri-close-line"></i> </button>
                                                                        </div>
                                                                        <div className="ti-modal-body px-4">
                                                                            <div className="grid grid-cols-12 gap-6">
                                                                                <div className="xl:col-span-6 col-span-12">
                                                                                    <label htmlFor="fullname-new"
                                                                                        className="ti-form-label">Full
                                                                                        Name</label>
                                                                                    <input type="text" className="form-control"
                                                                                        id="fullname-new"
                                                                                        placeholder="Full Name" />
                                                                                </div>
                                                                                <div className="xl:col-span-6 col-span-12">
                                                                                    <label htmlFor="email-new"
                                                                                        className="ti-form-label">Email</label>
                                                                                    <input type="email" className="form-control"
                                                                                        id="email-new" placeholder="email" />
                                                                                </div>
                                                                                <div className="xl:col-span-6 col-span-12">
                                                                                    <label htmlFor="phonenumber-new"
                                                                                        className="ti-form-label">Phone
                                                                                        Number</label> <input type="number"
                                                                                            className="form-control"
                                                                                            id="phonenumber-new"
                                                                                            placeholder="Phone" />
                                                                                </div>
                                                                                <div className="xl:col-span-6 col-span-12">
                                                                                    <label htmlFor="address-new"
                                                                                        className="ti-form-label">Address</label>
                                                                                    <input type="text" className="form-control"
                                                                                        id="address-new"
                                                                                        placeholder="Address" />
                                                                                </div>
                                                                                <div className="xl:col-span-12 col-span-12">
                                                                                    <div className="grid grid-cols-12 gap-4">
                                                                                        <div
                                                                                            className="xl:col-span-3 col-span-6">
                                                                                            <label htmlFor="pincode-new"
                                                                                                className="ti-form-label">Pincode</label>
                                                                                            <input type="number"
                                                                                                className="form-control"
                                                                                                id="pincode-new"
                                                                                                placeholder="Pincode" />
                                                                                        </div>
                                                                                        <div
                                                                                            className="xl:col-span-3 col-span-6">
                                                                                            <label htmlFor="city-new"
                                                                                                className="ti-form-label">City</label>
                                                                                            <input type="text"
                                                                                                className="form-control"
                                                                                                id="city-new"
                                                                                                placeholder="City" />
                                                                                        </div>
                                                                                        <div
                                                                                            className="xl:col-span-3 col-span-6">
                                                                                            <label htmlFor="state-new"
                                                                                                className="ti-form-label">State</label>
                                                                                            <input type="text"
                                                                                                className="form-control"
                                                                                                id="state-new"
                                                                                                placeholder="State" />
                                                                                        </div>
                                                                                        <div
                                                                                            className="xl:col-span-3 col-span-6">
                                                                                            <label htmlFor="country-new"
                                                                                                className="ti-form-label">Country</label>
                                                                                            <input type="text"
                                                                                                className="form-control"
                                                                                                id="country-new"
                                                                                                placeholder="Country" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ti-modal-footer"> <button type="button"
                                                                            className="hs-dropdown-toggle ti-btn  ti-btn-light align-middle"
                                                                            data-hs-overlay="#modal-new-address"> Close
                                                                        </button> <button type="button"
                                                                            className="ti-btn bg-success text-white !font-medium">Save
                                                                                Adress</button> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-12 gap-4 !mb-4">
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-floating"> <input type="text"
                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                id="fullname-add" defaultValue="Json Taylor"
                                                                placeholder="Name" /> <label htmlFor="fullname-add"
                                                                    className="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]">Full
                                                                    Name</label> </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-floating"> <input type="email"
                                                                className="form-control  w-full !rounded-[0.3rem]" id="email-add"
                                                                defaultValue="jsontaylor2413@gmail.com"
                                                                placeholder="name@example.com" /> <label htmlFor="email-add"
                                                                    className="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]">Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-floating"> <input type="email"
                                                                className="form-control is-valid  w-full !rounded-[0.3rem]"
                                                                id="phoneno-add" defaultValue="(555) 555-1234"
                                                                placeholder="1234-XX-XXXX" /> <label htmlFor="phoneno-add"
                                                                    className="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]">Phone
                                                                    No</label>
                                                                <div
                                                                    className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                                    <svg className="h-5 w-5 text-success"
                                                                        xmlns="http://www.w3.org/2000/svg" width="16"
                                                                        height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z">
                                                                        </path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-floating"> <textarea
                                                                className="form-control  w-full !rounded-[0.3rem]"
                                                                placeholder="Address Here"
                                                                id="address-add" defaultValue="MIG-1-11,Monroe Street,Washington D.C,USA"></textarea>
                                                                <label htmlFor="address-add"
                                                                    className="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]">Address</label>
                                                            </div>
                                                            <div className="form-check !flex items-center gap-2 !ps-0"> <input
                                                                className="form-check-input form-checked-success checked:bg-success checked:ring-success hover:checked:bg-success hover:checked:ring-success focus:checked:bg-success focus:checked:ring-success focus:ring-success focus:border-success"
                                                                type="checkbox" id="invalidCheck"
                                                                defaultChecked /> <label className="form-check-label text-success"
                                                                    htmlFor="invalidCheck"> Same as Billing Address ? </label>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <div className="grid grid-cols-12 sm:gap-6 gap-5">
                                                                <div className="xl:col-span-3 col-span-12">
                                                                    <div className="form-floating"> <input type="text"
                                                                        className="form-control is-valid  w-full !rounded-[0.3rem]"
                                                                        id="pincode-add" defaultValue="20071"
                                                                        placeholder="Name" /> <label htmlFor="pincode-add">Pin
                                                                            Code</label>
                                                                        <div
                                                                            className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                                            <svg className="h-5 w-5 text-success"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="16" height="16" fill="currentColor"
                                                                                viewBox="0 0 16 16">
                                                                                <path
                                                                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z">
                                                                                </path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xl:col-span-3 col-span-12">
                                                                    <div className="form-floating"> <input type="text"
                                                                        className="form-control  w-full !rounded-[0.3rem]"
                                                                        id="city-add" defaultValue="Georgetown"
                                                                        placeholder="Name" /> <label
                                                                            htmlFor="city-add">City</label> </div>
                                                                </div>
                                                                <div className="xl:col-span-3 col-span-12">
                                                                    <div className="form-floating"> <input type="text"
                                                                        className="form-control  w-full !rounded-[0.3rem]"
                                                                        id="state-add" defaultValue="Washington, D.C"
                                                                        placeholder="Name" /> <label
                                                                            htmlFor="state-add">State</label> </div>
                                                                </div>
                                                                <div className="xl:col-span-3 col-span-12">
                                                                    <div className="form-floating"> <input type="text"
                                                                        className="form-control  w-full !rounded-[0.3rem]"
                                                                        id="country-add" defaultValue="USA" placeholder="Name" />
                                                                        <label htmlFor="country-add">Country</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-[0.9375rem] font-semibold mb-1 xl:col-span-12">Shipping
                                                        Methods :</p>
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div
                                                                className="form-check shipping-method-container mb-0 flex items-center">
                                                                <div className="form-check-label">
                                                                    <div className="sm:flex items-center justify-between">
                                                                        <div className="!me-2"> <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/21.png"
                                                                                alt="" /> </span> </div>
                                                                        <div className="shipping-partner-details sm:me-5 me-0">
                                                                            <p className="mb-0 font-semibold">UPS</p>
                                                                            <p
                                                                                className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] mb-0">
                                                                                Delivered By 24,Nov 2022</p>
                                                                        </div>
                                                                        <div className="font-semibold sm:me-5 me-0"> $9.99
                                                                        </div>
                                                                        <div> <input id="shipping-method4"
                                                                            name="shipping-methods" type="radio"
                                                                            className="form-check-input  !top-[1.5rem]"
                                                                            defaultChecked /> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-check shipping-method-container mb-0">
                                                                <div className="form-check-label">
                                                                    <div className="sm:flex items-center justify-between">
                                                                        <div className="me-2"> <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/22.png"
                                                                                alt="" /> </span> </div>
                                                                        <div className="shipping-partner-details sm:me-5 me-0">
                                                                            <p className="mb-0 font-semibold">USPS</p>
                                                                            <p
                                                                                className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] mb-0">
                                                                                Delivered By 22,Nov 2022</p>
                                                                        </div>
                                                                        <div className="font-semibold sm:me-5 me-0"> $10.49
                                                                        </div>
                                                                        <div> <input id="shipping-method2"
                                                                            name="shipping-methods" type="radio"
                                                                            className="form-check-input !top-[1.5rem]"
                                                                        /> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-check shipping-method-container mb-0">
                                                                <div className="form-check-label">
                                                                    <div className="sm:flex items-center justify-between">
                                                                        <div className="me-2"> <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/25.png"
                                                                                alt="" /> </span> </div>
                                                                        <div className="shipping-partner-details sm:me-5 me-0">
                                                                            <p className="mb-0 font-semibold">FedEx</p>
                                                                            <p
                                                                                className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] mb-0">
                                                                                Delivered Tomorrow</p>
                                                                        </div>
                                                                        <div className="font-semibold sm:me-5 me-0"> $12.29
                                                                        </div>
                                                                        <div> <input id="shipping-method3"
                                                                            name="shipping-methods" type="radio"
                                                                            className="form-check-input !top-[1.5rem]"
                                                                        /> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12">
                                                            <div className="form-check shipping-method-container mb-0">
                                                                <div className="form-check-label">
                                                                    <div className="sm:flex items-center justify-between">
                                                                        <div className="me-2"> <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/28.png"
                                                                                alt="" /> </span> </div>
                                                                        <div className="shipping-partner-details sm:me-5 me-0">
                                                                            <p className="mb-0 font-semibold">DHL</p>
                                                                            <p
                                                                                className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] mb-0">
                                                                                Delivered Today</p>
                                                                        </div>
                                                                        <div className="font-semibold sm:me-5 me-0"> $18.99
                                                                        </div>
                                                                        <div> <input id="shipping-method5"
                                                                            name="shipping-methods" type="radio"
                                                                            className="form-check-input  !top-[1.5rem]"
                                                                        /> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end">
                                                    <button type="button" className="ti-btn ti-btn-soft-success" onClick={handleNext}
                                                        id="personal-details-trigger">Personal Details<i
                                                            className="ri-user-3-line ms-2 align-middle inline-block"></i></button>
                                                </div>
                                            </div>
                                        )}
                                        {key === "second" && (
                                            <div className="tab-pane fade !border-0 !p-0 text-defaulttextcolor dark:!text-defaulttextcolor/70"
                                                id="confirm-tab-pane" aria-labelledby="confirmed-tab" role="tabpanel"
                                                tabIndex={0}>
                                                <div className="p-4">
                                                    <p
                                                        className="mb-1 font-semibold text-[#8c9097] dark:text-white/50 opacity-[0.5] text-[1.25rem]">
                                                        02</p>
                                                    <div
                                                        className="text-[0.9375rem] font-semibold sm:flex block items-center justify-between mb-4">
                                                        <div>Personal Details :</div>
                                                    </div>
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="xl:col-span-6 col-span-12"> <label
                                                            htmlFor="firstname-personal" className="ti-form-label">First
                                                            Name</label> <input type="text"
                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                id="firstname-personal" placeholder="First Name"
                                                                defaultValue="Json" /> </div>
                                                        <div className="xl:col-span-6 col-span-12"> <label
                                                            htmlFor="lastname-personal" className="ti-form-label">Last
                                                            Name</label>
                                                            <input type="text" className="form-control w-full !rounded-[0.3rem]"
                                                                id="lastname-personal" placeholder="Last Name"
                                                                defaultValue="Taylor" />
                                                        </div>
                                                        <div className="xl:col-span-6 col-span-12"> <label htmlFor="email-personal"
                                                            className="ti-form-label">Email</label> <input type="email"
                                                                className="form-control w-full !rounded-[0.3rem]" id="email-personal"
                                                                placeholder="xyz@example.com" /> </div>
                                                        <div className="xl:col-span-6 col-span-12"> <label
                                                            htmlFor="phoneno-personal" className="ti-form-label">Phone
                                                            no</label>
                                                            <input type="text" className="form-control w-full !rounded-[0.3rem]"
                                                                id="phoneno-personal" placeholder="(555)-555-1234" />
                                                        </div>
                                                        <div className="xl:col-span-12 col-span-12"> <label htmlFor="text-area"
                                                            className="ti-form-label">Address</label> <textarea
                                                                className="form-control w-full !rounded-[0.3rem]" id="text-area"
                                                                rows={4}></textarea>
                                                            <div className="form-check !flex items-center gap-2 !ps-0"> <input
                                                                className="form-check-input form-checked-success w-full checked:bg-success checked:ring-success hover:checked:bg-success hover:checked:ring-success focus:checked:bg-success focus:checked:ring-success focus:ring-success focus:border-success"
                                                                type="checkbox" defaultValue="" id="invalidCheck1"
                                                                defaultChecked /> <label className="form-check-label text-success"
                                                                    htmlFor="invalidCheck"> Same as Shipping Address Address ?
                                                                </label> </div>
                                                        </div>
                                                        <div className="xxl:col-span-2 col-span-12"> <label
                                                            htmlFor="pincode-personal" className="ti-form-label">Pincode</label>
                                                            <input type="text" className="form-control w-full !rounded-[0.3rem]"
                                                                id="pincode-personal" placeholder="200017" />
                                                        </div>
                                                        <div className="xxl:col-span-4 col-span-12"> <label
                                                            htmlFor="choices-single-default"
                                                            className="ti-form-label">City</label>
                                                            <SpkSelect option={Citydata} mainClass="" name="choices-single-default" id="choices-single-default"
                                                                menuplacement='auto' classNameprefix="Select2" defaultvalue={[Citydata[0]]} />
                                                        </div>
                                                        <div className="xxl:col-span-4 col-span-12"> <label
                                                            htmlFor="choices-single-default1"
                                                            className="ti-form-label">State</label>
                                                            <SpkSelect option={Statedata} mainClass="" name="choices-single-default" id="choices-single-default1"
                                                                menuplacement='auto' classNameprefix="Select2" defaultvalue={[Statedata[0]]} />
                                                        </div>
                                                        <div className="xxl:col-span-2 col-span-12"> <label
                                                            htmlFor="country-personal" className="ti-form-label">Country</label>
                                                            <input type="text" className="form-control w-full !rounded-[0.3rem]"
                                                                id="country-personal" placeholder="Country" defaultValue="USA" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-4 py-3 border-top border-block-start-dashed sm:flex justify-between">
                                                    <button onClick={handlePrevious} type="button" className="ti-btn ti-btn-soft-danger m-1"
                                                        id="back-shipping-trigger"><i
                                                            className="ri-truck-line me-2 align-middle inline-block"></i>Back To
                                                        Shipping</button> <button type="button" onClick={handleNext}
                                                            className="ti-btn ti-btn-soft-success m-1" id="payment-trigger">Continue
                                                        To
                                                        Payment<i
                                                            className="bi bi-credit-card-2-front align-middle ms-2 inline-block"></i></button>
                                                </div>
                                            </div>
                                        )}
                                        {key === "third" && (
                                            <div className="tab-pane fade !border-0 !p-0 " id="shipped-tab-pane"
                                                aria-labelledby="shipped-tab" role="tabpanel" tabIndex={0}>
                                                <div className="p-4 text-defaulttextcolor dark:!text-defaulttextcolor/70">
                                                    <p
                                                        className="mb-1 font-semibold text-[#8c9097] dark:text-white/50 opacity-[0.5] text-[1.25rem]">
                                                        03</p>
                                                    <div
                                                        className="text-[0.9375rem] font-semibold sm:flex block items-center justify-between mb-4">
                                                        <div>Payment Details :</div>
                                                    </div>
                                                    <div className="grid grid-cols-12 sm:gap-6">
                                                        <div className="xl:col-span-12 col-span-12">
                                                            <div className="mb-4"> <label className="ti-form-label">Delivery
                                                                Address</label>
                                                                <div className="input-group"> <input type="text"
                                                                    className="form-control !border-s !rounded-s-sm"
                                                                    placeholder="Address" aria-label="address"
                                                                    aria-describedby="payment-address"
                                                                    defaultValue="MIG-1-11,Monroe Street,Washington D.C,USA" />
                                                                    <button type="button"
                                                                        className="ti-btn ti-btn-soft-info border-inputborder !border !rounded-s-none !m-0"
                                                                        id="payment-address">Change</button>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="box border dark:border-defaultborder/10 !shadow-none mb-4">
                                                                <div className="box-header">
                                                                    <div className="box-title"> Payment Methods </div>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="mb-4 sm:flex block " role="group"
                                                                        aria-label="Basic radio toggle button group"> <input
                                                                            type="radio"
                                                                            className="btn-check opacity-0 absolute"
                                                                            name="btnradio" id="btnradio1" /> <label
                                                                                className="w-full ti-btn ti-btn-outline-light !text-defaulttextcolor sm:!m-0 sm:!border-e-0 dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 hover:!bg-light !rounded-e-none"
                                                                                htmlFor="btnradio1">C.O.D(Cash on delivery)</label>
                                                                        <input type="radio"
                                                                            className="btn-check  opacity-0 absolute"
                                                                            name="btnradio" id="btnradio2" /> <label
                                                                                className="w-full ti-btn ti-btn-outline-light !text-defaulttextcolor dark:!text-defaulttextcolor/70 sm:!border-e-0 dark:!border-defaultborder/10 hover:!bg-light  sm:!m-0 !rounded-none"
                                                                                htmlFor="btnradio2">UPI</label> <input type="radio"
                                                                                    className="btn-check  opacity-0 absolute"
                                                                                    name="btnradio" id="btnradio3" defaultChecked />
                                                                        <label
                                                                            className="w-full ti-btn ti-btn-light !m-0 !text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 hover:!bg-light !rounded-s-none sm:!m-0"
                                                                            htmlFor="btnradio3">Credit/Debit Card</label>
                                                                    </div>
                                                                    <div className="grid grid-cols-12 gap-4">
                                                                        <div className="xl:col-span-12 col-span-12"> <label
                                                                            htmlFor="payment-card-number"
                                                                            className="ti-form-label">Card Number</label>
                                                                            <input type="text"
                                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                                id="payment-card-number"
                                                                                placeholder="Card Number"
                                                                                defaultValue="1245 - 5447 - 8934 - XXXX" />
                                                                        </div>
                                                                        <div className="xl:col-span-12 col-span-12"> <label
                                                                            htmlFor="payment-card-name"
                                                                            className="ti-form-label">Name On Card</label>
                                                                            <input type="text"
                                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                                id="payment-card-name"
                                                                                placeholder="Name On Card"
                                                                                defaultValue="JSON TAYLOR" />
                                                                        </div>
                                                                        <div className="xl:col-span-4 col-span-12"> <label
                                                                            htmlFor="payment-cardexpiry-date"
                                                                            className="ti-form-label">Expiration
                                                                            Date</label>
                                                                            <input type="text"
                                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                                id="payment-cardexpiry-date"
                                                                                placeholder="MM/YY" defaultValue="08/2024" />
                                                                        </div>
                                                                        <div className="xl:col-span-4 col-span-12"> <label
                                                                            htmlFor="payment-cvv"
                                                                            className="ti-form-label">CVV</label> <input
                                                                                type="text"
                                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                                id="payment-cvv" placeholder="XXX"
                                                                                defaultValue="341" /> </div>
                                                                        <div className="xl:col-span-4 col-span-12"> <label
                                                                            htmlFor="payment-security"
                                                                            className="ti-form-label">O.T.P</label> <input
                                                                                type="text"
                                                                                className="form-control w-full !rounded-[0.3rem]"
                                                                                id="payment-security" placeholder="XXXXXX"
                                                                                defaultValue="183467" /> <label
                                                                                    htmlFor="payment-security"
                                                                                    className=" mt-1 !text-danger !text-[0.6875rem]"><sup
                                                                                    ><i
                                                                                        className="ri-star-s-fill"></i></sup>Do
                                                                                not share O.T.P with anyone</label> </div>
                                                                        <div className="xl:col-span-12 col-span-12">
                                                                            <div
                                                                                className="form-check !flex items-center gap-2 !ps-0">
                                                                                <input
                                                                                    className="form-check-input form-checked-success w-full checked:bg-success checked:ring-success hover:checked:bg-success hover:checked:ring-success focus:checked:bg-success focus:checked:ring-success focus:ring-success focus:border-success"
                                                                                    type="checkbox"
                                                                                    id="payment-card-save" defaultChecked />
                                                                                <label className="form-check-label"
                                                                                    htmlFor="payment-card-save"> Save this card
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="box-footer">
                                                                    <div className="grid grid-cols-12 gap-4">
                                                                        <p
                                                                            className="xl:col-span-12 col-span-12 text-[0.9375rem] font-semibold mb-1">
                                                                            Saved Cards :</p>
                                                                        <div className="xl:col-span-6 col-span-12">
                                                                            <div
                                                                                className="form-check payment-card-container mb-0 leading-none">
                                                                                <div className="form-check-label">
                                                                                    <div
                                                                                        className="sm:flex block items-center justify-between">
                                                                                        <div className="me-2 leading-none">
                                                                                            <span className="avatar avatar-md">
                                                                                                <Image fill src="../../../assets/images/ecommerce/png/26.png"
                                                                                                    alt="" /> </span>
                                                                                        </div>
                                                                                        <div className="saved-card-details">
                                                                                            <p className="mb-0 font-semibold">
                                                                                                XXXX - XXXX - XXXX - 7646
                                                                                            </p>
                                                                                        </div>
                                                                                        <div> <input id="payment-card1"
                                                                                            name="payment-cards"
                                                                                            type="radio"
                                                                                            className="form-check-input !top-[1.5rem]"
                                                                                            defaultChecked /> </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xl:col-span-6 col-span-12">
                                                                            <div
                                                                                className="form-check payment-card-container mb-0 leading-none">
                                                                                <div className="form-check-label">
                                                                                    <div
                                                                                        className="sm:flex block items-center justify-between">
                                                                                        <div className="me-2 leading-none">
                                                                                            <span className="avatar avatar-md">
                                                                                                <Image fill src="../../../assets/images/ecommerce/png/27.png"
                                                                                                    alt="" /> </span>
                                                                                        </div>
                                                                                        <div className="saved-card-details">
                                                                                            <p className="mb-0 font-semibold">
                                                                                                XXXX - XXXX - XXXX - 9556
                                                                                            </p>
                                                                                        </div>
                                                                                        <div> <input id="payment-card2"
                                                                                            name="payment-cards"
                                                                                            type="radio"
                                                                                            className="form-check-input !top-[1.5rem]"
                                                                                            defaultChecked /> </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-between">
                                                    <button onClick={handlePrevious} type="button" className="ti-btn ti-btn-soft-danger m-1"
                                                        id="back-personal-trigger"><i
                                                            className="ri-user-3-line me-2 align-middle inline-block"></i>Back
                                                        To Personal Info</button> <button type="button" onClick={handleNext}
                                                            className="ti-btn ti-btn-soft-success m-1"
                                                            id="continue-payment-trigger">Continue Payment<i
                                                                className="bi bi-credit-card-2-front align-middle ms-2 inline-block"></i></button>
                                                </div>
                                            </div>
                                        )}
                                        {key === "fourth" && (
                                            <div className="tab-pane fade !border-0 !p-0 " id="delivery-tab-pane"
                                                aria-labelledby="delivered-tab" role="tabpanel" tabIndex={0}>
                                                <div className="p-[3rem] checkout-payment-success my-3">
                                                    <div className="mb-[3rem]">
                                                        <h5 className="text-success font-semibold text-[1.25rem]">Payment
                                                            Successful...🤝</h5>
                                                    </div>
                                                    <div className="mb-[3rem] !inline-flex"> <Image fill
                                                        src="../../../assets/images/ecommerce/png/24.png" alt=""
                                                        className="img-fluid" /> </div>
                                                    <div className="mb-6">
                                                        <p className="mb-1 text-[0.875rem]">You can track your order with Order
                                                            Id <b>SPK#1FR</b> from <Link scroll={false} className="link-success"
                                                                href="#!"><u className="text-success">Track
                                                                    Order</u></Link></p>
                                                        <p className="text-[#8c9097] dark:text-white/50">Thankyou for shopping
                                                            with us.</p>
                                                    </div> <Link href={"/ecommerce/customer/shop/"}
                                                        className="ti-btn bg-success text-white !font-medium">Continue
                                                        Shopping<i className="bi bi-cart ms-2"></i></Link>
                                                </div>

                                            </div>
                                        )}
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
                            <Link href="#!" className="ti-btn  bg-black app-store relative">
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
            {/* <!-- End:: Section-2 --></div> */}
        </Fragment>
    );
};

export default Checkout;