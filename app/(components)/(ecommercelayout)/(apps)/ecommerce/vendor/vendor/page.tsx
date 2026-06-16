"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { AllProductsList, customerdata } from "@/shared/data/apps/ecommers/vendor/vendordata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Vendor = () => {
    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Vendor"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Vendor']} currentpage="Vendor" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box">
                                <div className="sm:flex items-start p-4">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded online me-3">
                                            <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="main-profile-info flex-fill">
                                        <div className="font-semibold mb-1 h6">
                                            <Link scroll={false} href="/ecommerce/vendor/profile/">Jack Miller</Link><div className="hs-tooltip ti-main-tooltip">
                                                <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                    <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                    <span
                                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                        role="tooltip">
                                                        Verified User
                                                    </span>
                                                </Link>
                                            </div></div>
                                        <p className="mb-1">Member Since 2005</p>
                                        <div className="flex items-center gap-4">
                                            <span className="badge badge-md bg-warning/[0.15] text-warning"><i
                                                className="ri-vip-crown-2-line vertical-middle me-1"></i> Basic</span>
                                            <Link scroll={false} href="/ecommerce/vendor/packages/" className="text-danger"><u>Upgrade
                                                Plan</u></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <nav className="nav nav-tabs flex !flex-col candidateprofile-nav">
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/vendor/vendor/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <path
                                                    d="M128,129.09,32.7,76.93a8,8,0,0,0-.7,3.25v95.64a8,8,0,0,0,4.16,7l88,48.18a8,8,0,0,0,3.84,1Z"
                                                    opacity="0.2"></path>
                                                <polyline points="32.7 76.92 128 129.08 223.3 76.92" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></polyline>
                                                <line x1="128" y1="129.09" x2="128" y2="231.97" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <path
                                                    d="M219.84,182.84l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18a8,8,0,0,1,4.16,7v95.64A8,8,0,0,1,219.84,182.84Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></path>
                                                <polyline points="81.56 48.31 176 100 176 152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></polyline>
                                            </svg>All Products
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/invoices/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <path d="M168,200V104h56v88a8,8,0,0,1-8,8Z" opacity="0.2"></path>
                                                <path
                                                    d="M64,56H40A16,16,0,0,0,24,72h0A16,16,0,0,0,40,88H56a16,16,0,0,1,16,16h0a16,16,0,0,1-16,16H28"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></path>
                                                <line x1="48" y1="48" x2="48" y2="56" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
                                                </line>
                                                <line x1="48" y1="120" x2="48" y2="128" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <path d="M96,56H224V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></path>
                                                <line x1="104" y1="104" x2="224" y2="104" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <line x1="80" y1="152" x2="224" y2="152" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                                <line x1="168" y1="104" x2="168" y2="200" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></line>
                                            </svg>Invoices
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/orders/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none"></rect>
                                                <rect x="32" y="48" width="192" height="160" rx="8" opacity="0.2">
                                                </rect>
                                                <rect x="32" y="48" width="192" height="160" rx="8" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16"></rect>
                                                <path d="M168,88a40,40,0,0,1-80,0" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
                                                </path>
                                            </svg>Orders
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/refund-requests/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" />
                                                <path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" />
                                                <line x1="128" y1="24" x2="128" y2="48" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="128" y1="208" x2="128" y2="232" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path
                                                    d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Refunds
                                        </Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/vendor/settings/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
                                                    opacity="0.2" />
                                                <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path
                                                    d="M130.05,206.11c-1.34,0-2.69,0-4,0L94,224a104.61,104.61,0,0,1-34.11-19.2l-.12-36c-.71-1.12-1.38-2.25-2-3.41L25.9,147.24a99.15,99.15,0,0,1,0-38.46l31.84-18.1c.65-1.15,1.32-2.29,2-3.41l.16-36A104.58,104.58,0,0,1,94,32l32,17.89c1.34,0,2.69,0,4,0L162,32a104.61,104.61,0,0,1,34.11,19.2l.12,36c.71,1.12,1.38,2.25,2,3.41l31.85,18.14a99.15,99.15,0,0,1,0,38.46l-31.84,18.1c-.65,1.15-1.32,2.29-2,3.41l-.16,36A104.58,104.58,0,0,1,162,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Settings
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {customerdata.map((idx) => (
                                    <div className="lg:col-span-4 col-span-12" key={idx.id}>
                                        <div className={`box ${idx.boxclass}`}>
                                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                                            <div className="box-body !p-6">
                                                <div className="flex gap-3">
                                                    <div className={`main-card-icon ${idx.iconBg}`}>
                                                        <div className={`avatar avatar-lg bg-${idx.bgColor1}/[0.15] border border-${idx.bgColor}/10`}>
                                                            <div className="avatar avatar-sm svg-white">
                                                                {idx.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`${idx.bgColor1 === "white" ? "text-white" : "text-textmuted dark:text-textmuted/50"}`}>
                                                        <div className="mb-1">{idx.name}</div>

                                                        <h5 className={`text-[1.5rem] mb-0 flex-grow ${idx.bgColor1 === "white" ? "text-white" : "text-dark"} font-medium`}>
                                                            {idx.count}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        All Products List
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control" type="text"
                                                placeholder="Search Here" aria-label=".form-control-sm example" />
                                        </div>
                                        <Link scroll={false} href="/ecommerce/vendor/add-product/" className="ti-btn ti-btn-primary btn-wave !m-0">
                                            <i className="bi bi-plus-circle"></i>  Add Product
                                        </Link>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-hover ti-custom-table-head w-full" showCheckbox={true} Customcheckclass="ps-6" header={[{ title: 'Product' }, { title: 'Status', }, { title: 'Stock Qty', }, { title: 'Total Sales' }, { title: 'Price' }, { title: 'Action' }]}>
                                            {AllProductsList.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="ps-6">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`checkboxNoLabeljob${product.id}`}
                                                            aria-label="..."
                                                            defaultChecked={product.checked}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="flex">
                                                            <span className="avatar avatar-md avatar-square bg-light">
                                                                <Image fill src={product.image} alt="..." />
                                                            </span>
                                                            <div className="ms-2">
                                                                <p className="font-semibold mb-0 flex items-center">
                                                                    <Link scroll={false} href="#!">{product.name}</Link>
                                                                </p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">
                                                                    {product.brand}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge !rounded-full badge-sm ${product.status === "Published"
                                                                ? "bg-success/[0.15] text-success"
                                                                : "bg-danger/[0.15] text-danger"
                                                                }`}
                                                        >
                                                            {product.status}
                                                        </span>
                                                    </td>
                                                    <td>{product.stockQty}</td>
                                                    <td>{product.totalSales}</td>
                                                    <td className="font-semibold">{product.price}</td>
                                                    <td>
                                                        <Link href="/ecommerce/customer/product-details/" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-primary btn-wave !m-0 !me-1">
                                                            <i className="ri-eye-line"></i>
                                                        </Link>
                                                        <Link href="/ecommerce/vendor/add-product/" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-info btn-wave !m-0 !me-1" >
                                                            <i className="ri-edit-line"></i>
                                                        </Link>
                                                        <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-danger btn-wave !m-0">
                                                            <i className="ri-delete-bin-line"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Spktables>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="flex items-center flex-wrap overflow-auto">
                                        <div className="mb-2 sm:mb-0">
                                            Showing <b>1</b> to <b>6</b> of <b>10</b> entries <i
                                                className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <nav aria-label="Page navigation" className="pagination-style-4 float-end">
                                                <ul className="ti-pagination mb-0">
                                                    <li className="page-item">
                                                        <Link scroll={false} className="page-link disabled" href="#!">
                                                            Prev
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link scroll={false} className="page-link active"
                                                        href="#!">1</Link></li>
                                                    <li className="page-item"><Link scroll={false} className="page-link"
                                                        href="#!">2</Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link scroll={false} className="page-link" href="#!">
                                                            <i className="bi bi-three-dots"></i>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link scroll={false} className="page-link"
                                                        href="#!">16</Link>
                                                    </li>
                                                    <li className="page-item"><Link scroll={false} className="page-link"
                                                        href="#!">17</Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link scroll={false} className="page-link text-primary" href="#!">
                                                            next
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
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

export default Vendor;