"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { OrderDetailsData } from "@/shared/data/apps/ecommers/admin/order-details-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const InvoiceDetaiils = () => {

    const print = () => {
        window.print();
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Invoice Detaiils" />
            <Pageheader Heading="Invoice Detaiils" breadcrumbs={['Pages', ' Invoice']} currentpage="Invoice Detaiils" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                <div className="xl:col-span-9 col-span-12">
                    <div className="box">
                        <div className="box-header md:flex block">
                            <div className="h5 mb-0 sm:flex bllock items-center">
                                <div className="avatar avatar-sm">
                                    <Image fill src="../../../assets/images/brand-logos/toggle-logo.png" alt="" />
                                </div>
                                <div className="sm:ms-2 ms-0 sm:mt-0 mt-2">
                                    <div className="h6 font-medium mb-0 ">SHOPPING INVOICE : <span className="text-primary">#8140-2099</span></div>
                                </div>
                            </div>
                            <div className="ms-auto md:mt-0 mt-2">
                                <button type="button" onClick={() => print()} className="ti-btn !py-1 !px-2 btn-wave  text-white !text-[0.75rem] bg-secondary me-1">Print<i className="ri-printer-line ms-1 align-middle inline-block"></i></button>
                                <button type="button" className="ti-btn !py-1 !px-2 btn-wave text-white !text-[0.75rem] bg-primary">Save As PDF<i className="ri-file-pdf-line ms-1 align-middle inline-block"></i></button>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                        <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                            <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                Billing From :
                                            </p>
                                            <p className="font-bold mb-1">
                                                SPRUKO TECHNOLOGIES
                                            </p>
                                            <p className="mb-1 text-textmuted dark:text-textmuted/50">
                                                Mig-1-11,Manroe street
                                            </p>
                                            <p className="mb-1 text-textmuted dark:text-textmuted/50">
                                                Georgetown,Washington D.C,USA,200071
                                            </p>
                                            <p className="mb-1 text-textmuted dark:text-textmuted/50">
                                                sprukotrust.mamix@gmail.com
                                            </p>
                                            <p className="mb-1 text-textmuted dark:text-textmuted/50">
                                                (555) 555-1234
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50">For more information check for <Link scroll={false} href="#!" className="text-primary font-medium"><u>GSTIN</u></Link> Details.</p>
                                        </div>
                                        <div className="xl:col-span-4 xl:flex hidden"></div>
                                        <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 sm:ms-auto sm:mt-0 mt-4">
                                            <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                Billing To :
                                            </p>
                                            <p className="font-bold mb-1">
                                                Json Taylor
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                Lig-22-1,20 Covington Place
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                New Castle,de, United States,19320
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                jsontaylor2134@gmail.com
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50">
                                                +1 202-918-2132
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Invoice ID :</p>
                                    <p className="text-[.9375rem] mb-1">#SPK120219890</p>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Date Issued :</p>
                                    <p className="text-[.9375rem] mb-1">29,Nov 2022 - <span className="text-textmuted dark:text-textmuted/50 text-xs">12:42PM</span></p>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Due Date :</p>
                                    <p className="text-[.9375rem] mb-1">29,Dec 2022</p>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Due Amount :</p>
                                    <p className="text-[1rem] mb-1 font-medium">$2,570.42</p>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full border  border-defaultborder dark:border-defaultborder/10 me-1" header={[{ title: 'BRAND NAME' }, { title: 'DESCRIPTION', }, { title: 'QUANTITY', }, { title: 'PRICE PER UNIT' }, { title: 'TOTAL' }]}>
                                            {OrderDetailsData.map((idx) => (
                                                <tr key={idx.id} className="border border-defaultborder dark:border-defaultborder/10">
                                                    <td>
                                                        <div className="font-semibold">
                                                            {idx.name}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-textmuted dark:text-textmuted/50">
                                                            {idx.description}
                                                        </div>
                                                    </td>
                                                    <td className="product-quantity-container">
                                                        {idx.quantity}
                                                    </td>
                                                    <td>
                                                        ${idx.price}
                                                    </td>
                                                    <td>
                                                        ${idx.total}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="border border-defaultborder dark:border-defaultborder/10">
                                                <td colSpan={3}></td>
                                                <td colSpan={2}>
                                                    <table className="ti-custom-table ti-custom-table-head w-full border  border-defaultborder dark:border-defaultborder/10">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0">Sub Total :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[.9375rem]">$2,364</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0">Avail Discount :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[.9375rem]">$29.98</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0">Coupon Discount <span className="text-success">(10%)</span> :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[.9375rem]">$236.40</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0">Vat <span className="text-danger">(20%)</span> :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[.9375rem]">$472.80</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0">Due Till Date :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[.9375rem]">$0</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <p className="mb-0 text-[.875rem]">Total :</p>
                                                                </th>
                                                                <td>
                                                                    <p className="mb-0 font-medium text-[1rem] text-success">$2,570.42</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </Spktables>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div>
                                        <label htmlFor="invoice-note" className="ti-form-label">Note:</label>
                                        <textarea className="form-control w-full !rounded-md !bg-light" id="invoice-note" rows={3} defaultValue="Once the invoice has been verified by the accounts payable team and recorded, the only task left is to send it for approval before releasing the payment"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer text-end">
                            <button type="button" className="ti-btn bg-success btn-wave text-white">Download <i className="ri-download-2-line ms-1 align-middle"></i></button>
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
                                    <p className="text-[.875rem] font-medium mb-4">
                                        Credit/Debit Card
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium text-textmuted dark:text-textmuted/50 text-[0.75rem]">Name On Card :</span> Json Taylor
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium text-textmuted dark:text-textmuted/50 text-[0.75rem]">Card Number :</span> 1234 5678 9087 XXXX
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium text-textmuted dark:text-textmuted/50 text-[0.75rem]">Total Amount :</span> <span className="text-success font-medium text-[.875rem]">$2570.42</span>
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium text-textmuted dark:text-textmuted/50 text-[0.75rem]">Due Date :</span> 29,Dec 2022 - <span className="text-danger text-[0.75rem] font-medium">30 days due</span>
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium text-textmuted dark:text-textmuted/50 text-[0.75rem]">Invoice Status : <span className="badge bg-warning/10 text-warning">Pending</span></span>
                                    </p>
                                    <div className="alert alert-warning" role="alert">
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

export default InvoiceDetaiils;