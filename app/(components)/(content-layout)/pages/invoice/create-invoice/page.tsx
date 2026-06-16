"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useReducer, useState } from "react";

const CreateInvoice = () => {

    const [dates, setDates] = useState<{ [key: string]: Date | null }>({});

    const handleDateChange = (key: string, date: Date | null) => {
        setDates((prevDates) => ({
            ...prevDates,
            [key]: date,
        }));
    };



    const initialState = { count1: 1, count2: 1 }

    const reducer = (state: { count1: number; count2: number; }, action: any) => {
        switch (action) {

            case "addition":
                return state = {
                    ...state, count1: state.count1 + 1,

                }
            case "subtraction":
                return {
                    ...state,
                    count1: state.count1 > 0 ? state.count1 - 1 : 0, // Prevent going below zero
                };
            case "addition1":
                return state = {
                    ...state, count2: state.count2 + 1,
                }
            case "subtraction1":
                return {
                    ...state,
                    count2: state.count2 > 0 ? state.count2 - 1 : 0, // Prevent going below zero
                };
            default:
                return state
        }
    }
    // 
    const [count, dispatch] = useReducer(reducer, initialState)

    //Currency select data
    const Currencydata = [
        { value: 'Select Currency', label: 'Select Currency' },
        { value: 'USD - (United States Dollar)', label: 'USD - (United States Dollar)' },
        { value: 'BHD - (Bahraini Dinar)', label: 'BHD - (Bahraini Dinar)' },
        { value: 'KWD - (Kuwaiti Dinar)', label: 'KWD - (Kuwaiti Dinar)' },
        { value: 'CHF - (Swiss Franc)', label: 'CHF - (Swiss Franc)' },
    ]

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Create Invoice" />
            <Pageheader Heading="Create Invoice" breadcrumbs={['Pages', ' Invoice']} currentpage="Create Invoice" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-9 col-span-12">
                    <div className="box">
                        <div className="box-header xxl:!flex !block">
                            <div className="h5 mb-0 sm:flex block items-center">
                                <div>
                                    <Image fill src="../../../assets/images/brand-logos/toggle-logo.png" alt="" />
                                </div>
                                <div className="sm:ms-2 ms-0 sm:mt-0 mt-2">
                                    <input type="text" className="form-control !text-[.8rem] !py-1 !px-[0.8rem] !bg-light !rounded-md !border-0" placeholder="Invoice Title" defaultValue="INV TITLE" />
                                </div>
                                <div className="mx-2">:</div>
                                <div className="sm:mt-0">
                                    <input type="text" className="form-control !text-[.8rem] !py-1 !px-[0.8rem] !bg-light !rounded-md !border-0" placeholder="Invoice ID" defaultValue="INV ID" />
                                </div>
                            </div>
                            <div className="ms-auto xxl:!mt-0 !mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 bg-primary btn-wave text-white !text-[0.75rem] me-2">Save As PDF<i className="ri-file-pdf-line ms-1 align-middle inline-block"></i></button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-soft-secondary me-2"><i className="bi bi-plus-lg"></i></button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-soft-success me-2"><i className="bi bi-download"></i></button>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                        <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                            <p className="font-medium mb-2">
                                                Billing From :
                                            </p>
                                            <div className="grid grid-cols-12 col-span-12 gap-2">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="Company-Name" placeholder="Company Name" defaultValue="SPRUKO TECHNOLOGIES" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <textarea className="form-control w-full !rounded-md !bg-light !border-0" id="company-address" placeholder="Enter Address" rows={3}></textarea>
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="company-mail" placeholder="Company Email" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="company-phone" placeholder="Phone Number" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <textarea className="form-control w-full !rounded-md !bg-light !border-0" id="invoice-subject" placeholder="Subject" rows={4}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 xl:flex hidden"></div>
                                        <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:mt-0 mt-4">
                                            <p className="font-medium mb-2">
                                                Billing To :
                                            </p>
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="customer-Name" placeholder="Customer Name" defaultValue="Json Taylor" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <textarea className="form-control w-full !rounded-md !bg-light !border-0" id="customer-address" placeholder="Enter Address" rows={3}></textarea>
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="customer-mail" placeholder="Customer Email" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="customer-phone" placeholder="Phone Number" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12">
                                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="zip-code" placeholder="Zip Code" />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12 choices-control">
                                                    <p className="font-semibold mb-2 mt-2">
                                                        Currency :
                                                    </p>
                                                    <SpkSelect option={Currencydata} mainClass="basic-multi-select w-full !rounded-md light-bg-select !border-0" name="invoice-currency" id="invoice-currency"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Currencydata[0]]} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="invoice-number" className="ti-form-label">Invoice ID</label>
                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="invoice-number" placeholder="Inv No" defaultValue="#SPK120219890" />
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="invoice-date-issued" className="ti-form-label">Date Issued</label>

                                    <SpkDatepickr className="form-control w-full !rounded-md !bg-light !border-0" placeholderText='Choose Date' selected={dates["dateissues"]}
                                        onChange={(date) => handleDateChange("dateissues", date)} />
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="invoice-date-due" className="ti-form-label">Due Date</label>
                                    <SpkDatepickr className="form-control w-full !rounded-md !bg-light !border-0" placeholderText='Choose Date' selected={dates["duedate"]}
                                        onChange={(date) => handleDateChange("duedate", date)} />
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="invoice-due-amount" className="ti-form-label">Due Amount</label>
                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="invoice-due-amount" placeholder="Enter Amount" defaultValue="$12,983.78" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table ti-custom-table-head !border  border-defaultborder dark:border-defaultborder/10 w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="row">PRODUCT NAME</th>
                                                    <th scope="row">DESCRIPTION</th>
                                                    <th scope="row" className="min-w-[120px]">QUANTITY</th>
                                                    <th scope="row">PRICE PER UNIT</th>
                                                    <th scope="row">TOTAL</th>
                                                    <th scope="row">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td>
                                                        <input type="text" className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Product Name" />
                                                    </td>
                                                    <td>
                                                        <textarea rows={1} className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Description"></textarea>
                                                    </td>
                                                    <td className="invoice-quantity-container">
                                                        <div className="input-group dark:border-defaultborder/10 rounded-md !flex-nowrap">
                                                            <button aria-label="button" type="button" className="ti-btn border !border-primary !m-0 ti-btn-icon !bg-primary !text-white input-group-text !mb-0 product-quantity-minus !rounded-e-none" onClick={() => dispatch('subtraction1')}><i className="ri-subtract-line"></i></button>
                                                            <input type="text" className="form-control  border-0 text-center !border-t !border-b !w-12 !p-1" aria-label="quantity" id="product-quantity6" key={count.count2}
                                                                defaultValue={count.count2} />
                                                            <button aria-label="button" type="button" className="ti-btn border !border-primary !m-0 ti-btn-icon !bg-primary !text-white input-group-text !mb-0 product-quantity-plus !rounded-s-none" onClick={() => dispatch('addition1')}><i className="ri-add-line"></i></button>
                                                        </div>
                                                    </td>
                                                    <td><input className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="" type="text" defaultValue="$60.00" /></td>
                                                    <td><input className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="" type="text" defaultValue="$120.00" /></td>
                                                    <td>
                                                        <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon btn-wave   ti-btn-soft-danger"><i className="ri-delete-bin-5-line"></i></button>
                                                    </td>
                                                </tr>
                                                <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td>
                                                        <input type="text" className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Product Name" />
                                                    </td>
                                                    <td>
                                                        <textarea rows={1} className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Description"></textarea>
                                                    </td>
                                                    <td className="invoice-quantity-container">
                                                        <div className="input-group dark:border-defaultborder/10 rounded-md !flex-nowrap">
                                                            <button aria-label="button" type="button" className="ti-btn border !border-primary !m-0 ti-btn-icon !bg-primary !text-white input-group-text !mb-0 product-quantity-minus !rounded-e-none" onClick={() => dispatch('subtraction')}><i className="ri-subtract-line"></i></button>
                                                            <input type="text" className="form-control  border-0 text-center !border-t !border-b !w-12 !p-1" aria-label="quantity" id="product-quantity6" key={count.count1}
                                                                defaultValue={count.count1} />
                                                            <button aria-label="button" type="button" className="ti-btn border !border-primary !m-0 ti-btn-icon !bg-primary !text-white input-group-text !mb-0 product-quantity-plus !rounded-s-none" onClick={() => dispatch('addition')}><i className="ri-add-line"></i></button>
                                                        </div>
                                                    </td>
                                                    <td><input className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Amount" type="text" /></td>
                                                    <td><input className="form-control !w-auto !rounded-md !bg-light !border-0" placeholder="Enter Amount" type="text" /></td>
                                                    <td>
                                                        <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon btn-wave ti-btn-soft-danger"><i className="ri-delete-bin-5-line"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={6} className="border-bottom-0"><Link scroll={false} className="ti-btn ti-btn-light !font-medium" href="#!"><i className="bi bi-plus-lg"></i> Add Product</Link></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}></td>
                                                    <td colSpan={3}>
                                                        <table className="ti-custom-table ti-custom-table-head !border  border-defaultborder dark:border-defaultborder/10 w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fw-medium">Sub Total :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$1209.89" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fw-medium">Avail Discount :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$29.98" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fw-medium">Coupon Discount <span className="text-success">(10%)</span> :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$129.00" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fw-medium">Vat <span className="text-danger">(20%)</span> :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$258.00" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fw-medium">Due Till Date :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$0.00" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">
                                                                        <div className="fs-14 fw-medium">Total :</div>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" className="form-control form-control-light invoice-amount-input !bg-light" placeholder="Enter Amount" defaultValue="$1,071.89" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div>
                                        <label htmlFor="invoice-note" className="ti-form-label">Note:</label>
                                        <textarea className="form-control w-full !rounded-md !bg-light !border-0" id="invoice-note" rows={3} defaultValue="Once the invoice has been verified by the accounts payable team and recorded, the only task left is to send it for approval before releasing the payment"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer text-end">
                            <button type="button" className="ti-btn ti-btn-light btn-wave sm:me-1 !mb-2 sm:!mb-0"><i className="ri-eye-line me-1 align-middle inline-block"></i>Preview</button>
                            <button type="button" className="ti-btn bg-primary btn-wave text-white !mb-0">Send Invoice <i className="ri-send-plane-2-line ms-1 align-middle inline-block"></i></button>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Mode Of Payment
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio2" />
                                        <label className="ti-btn ti-btn-outline-light dark:text-defaulttextcolor/80 !me-0 dark:!border-defaultborder/10 !border-e-0  sm:mt-0 mt-1 !rounded-e-none hover:!bg-light " htmlFor="btnradio2">UPI</label>
                                        <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio3" defaultChecked />
                                        <label className="ti-btn ti-btn-light sm:mt-0 mt-1 dark:text-defaulttextcolor/80 dark:!border-defaultborder/10 !rounded-s-none hover:!bg-light" htmlFor="btnradio3">Credit/Debit Card</label>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" placeholder="Card Holder Name" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0" id="invoice-payment-cardname" placeholder="Card Number" defaultValue="1234 5678 9087 XXXX" />
                                    <label htmlFor="invoice-payment-cardname" className="ti-form-label mb-0"><Link scroll={false} className="text-danger text-[0.6875rem]" href="#!">Enter valid card number*</Link></label>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <input type="text" className="form-control w-full !rounded-md !bg-light !border-0 mb-2" placeholder="Enter OTP" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="alert alert-success !border-success/10 !font-normal" role="alert">
                                        Please Make sure to pay the invoice bill within 30 days.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default CreateInvoice;