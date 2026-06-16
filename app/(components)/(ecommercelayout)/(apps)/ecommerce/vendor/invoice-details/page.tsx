"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { OrderDetailsData } from "@/shared/data/apps/ecommers/admin/order-details-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const InvoiceDetails = () => {
    const print = () => {
        window.print();
    };
    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Invoice Details"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Vendor']} currentpage="Invoice Details" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-3">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header md:flex block">
                                    <div className="h5 mb-0 sm:flex block items-center">
                                        <div className="relative">
                                            <Image fill src="../../../assets/images/brand-logos/toggle-logo.png" alt="" />
                                        </div>
                                        <div className="sm:ms-2 ms-0 mt-sm-0 mt-2">
                                            <div className="h6 font-semibold mb-0">INVOICE : <span className="text-primary">#8140-2099</span></div>
                                        </div>
                                    </div>
                                    <div className="ms-auto md:mt-0 mt-2">
                                        <Link href="/ecommerce/vendor/invoices/" className="ti-btn ti-btn-outline-light !text-dark me-1" >Go Back
                                            <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex "></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12">
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
                                                        sprukotrust.xia@gmail.com
                                                    </p>
                                                    <p className="mb-1 text-textmuted dark:text-textmuted/50">
                                                        (555) 555-1234
                                                    </p>
                                                    <p className="text-textmuted dark:text-textmuted/50 mb-4">For more information check for <Link scroll={false} href="#!" className="text-primary font-semibold"><u>GSTIN</u></Link> Details.</p>
                                                </div>
                                                <div className="xl:col-span-2 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12"></div>
                                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 ms-auto mt-sm-0 mt-3">
                                                    <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                        Billing To :
                                                    </p>
                                                    <p className="font-bold mb-1">
                                                        Jack Miller
                                                    </p>
                                                    <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                        Lig-22-1,20 Covington Place
                                                    </p>
                                                    <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                        New Castle,de, United States,19320
                                                    </p>
                                                    <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                        jackmiller2134@gmail.com
                                                    </p>
                                                    <p className="text-muted">
                                                        +1 202-918-2132
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-3 col-span-12">
                                            <p className="font-semibold text-textmuted dark:text-textmuted/50 mb-1">Invoice ID :</p>
                                            <p className="text-[0.9375rem] mb-1">#SPK120219890</p>
                                        </div>
                                        <div className="xl:col-span-3 col-span-12">
                                            <p className="font-semibold text-textmuted dark:text-textmuted/50 mb-1">Date Issued :</p>
                                            <p className="text-[0.9375rem] mb-1">29,Nov 2022 - <span className="text-textmuted dark:text-textmuted/50 fs-12">12:42PM</span></p>
                                        </div>
                                        <div className="xl:col-span-3 col-span-12">
                                            <p className="font-semibold text-textmuted dark:text-textmuted/50 mb-1">Due Date :</p>
                                            <p className="text-[0.9375rem] mb-1">29,Dec 2022</p>
                                        </div>
                                        <div className="xl:col-span-3 col-span-12">
                                            <p className="font-semibold text-textmuted dark:text-textmuted/50 mb-1">Due Amount :</p>
                                            <p className="text-[1rem] mb-1 font-semibold">$2,570.42</p>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="table-responsive">
                                                <Spktables tableClass="ti-custom-table ti-custom-table-head w-full border border-defaultborder dark:border-defaultborder/10 mt-4" header={[{ title: 'BRAND NAME' }, { title: 'DESCRIPTION', }, { title: 'QUANTITY', }, { title: 'PRICE PER UNIT' }, { title: 'TOTAL' }]}>
                                                    {OrderDetailsData.map((idx) => (
                                                        <tr key={idx.id}>
                                                            <td>
                                                                <div className="font-semibold">
                                                                    {idx.name}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted">
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
                                                    <tr>
                                                        <td colSpan={3}></td>
                                                        <td colSpan={2} className="!p-0">
                                                            <table className="ti-custom-table ti-custom-table-head w-full mb-0 !border-s border-defaultborder dark:border-defaultborder/10 table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0">Sub Total :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[0.9375rem]">$2,364</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0">Avail Discount :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[0.9375rem]">$29.98</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0">Coupon Discount <span className="text-success">(10%)</span> :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[0.9375rem]">$236.40</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0">Vat <span className="text-danger">(20%)</span> :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[0.9375rem]">$472.80</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0">Due Till Date :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[0.9375rem]">$0</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <p className="mb-0 text-[0.875rem]">Total :</p>
                                                                        </th>
                                                                        <td>
                                                                            <p className="mb-0 font-semibold text-[1rem] text-success">$2,570.42</p>
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
                                                <textarea className="form-control form-control-light !bg-light" id="invoice-note" rows={3} defaultValue="Once the invoice has been verified by the accounts payable team and recorded, the only task left is to send it for approval before releasing the payment"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer text-end">
                                    <div className="btn-list">
                                        <button className="ti-btn ti-btn-secondary" onClick={() => print()}>Print<i className="ri-printer-line ms-1 align-middle"></i></button>
                                        <button className="ti-btn ti-btn-danger">Save As PDF<i className="ri-file-pdf-line ms-1 align-middle"></i></button>
                                        <button className="ti-btn ti-btn-success">Download <i className="ri-download-2-line ms-1 align-middle"></i></button>
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

export default InvoiceDetails;