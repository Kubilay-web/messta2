"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { customerdata, MyOrders } from "@/shared/data/apps/ecommers/customer/customerdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Customer = () => {
    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Customer"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Customer" />
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
                                        <div className="font-semibold mb-1 h6">Jack Miller <div className="hs-tooltip ti-main-tooltip">
                                            <Link scroll={false} href="#!" className="p-1 hs-tooltip-toggle">
                                                <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                    role="tooltip">
                                                    Verified User
                                                </span>
                                            </Link>
                                        </div></div>
                                        <p className="mb-0">Member Since 2005</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <nav className="nav nav-tabs flex !flex-col candidateprofile-nav">
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/customer/customer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" opacity="0.2" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,96V64a40,40,0,0,1,80,0V96" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>My Orders</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/wishlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    opacity="0.2" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>My Wishlist</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/order-tracking">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <circle cx="200" cy="200" r="24" opacity="0.2" />
                                                <circle cx="200" cy="200" r="24" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path d="M72,56h96a32,32,0,0,1,0,64H72a40,40,0,0,0,0,80H176" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Order Tracking</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/refunds">
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
                                            </svg>Refunds</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/address">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M208,32H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V40A8,8,0,0,0,208,32ZM136,144a32,32,0,1,1,32-32A32,32,0,0,1,136,144Z"
                                                    opacity="0.2" />
                                                <circle cx="136" cy="112" r="32" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="72" x2="56" y2="72" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="128" x2="56" y2="128" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="32" y1="184" x2="56" y2="184" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,168a60,60,0,0,1,96,0" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <rect x="40" y="48" width="192" height="160" rx="8"
                                                    transform="translate(264 -8) rotate(90)" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Address Book</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/settings">
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
                                            </svg>Settings</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {customerdata.map((idx) => (
                                    <div className="lg:col-span-3 col-span-12" key={idx.id}>
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
                                        My Orders
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control form-control-sm" type="text"
                                                placeholder="Search Here" aria-label=".form-control-sm example" />
                                        </div>
                                        <div className="ti-dropdown hs-dropdown">
                                            <Link scroll={false} href="#!"
                                                className="ti-btn ti-btn-primary ti-btn-sm btn-wave !m-0"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort By<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Week</Link>
                                                </li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This
                                                    Month</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Order Id' }, { title: 'Product', }, { title: 'Ordered Date', }, { title: 'Payment Mode' }, { title: 'Cost' }, { title: 'Status' }, { title: 'Action' }]}>
                                            {MyOrders.map((idx) => (
                                                <tr key={idx.id}>
                                                    <td>{idx.id}</td>
                                                    <td>
                                                        <div className="flex">
                                                            <span className="avatar avatar-md avatar-square bg-light"><Image fill
                                                                src={idx.productSrc}
                                                                className="w-full h-full" alt="..." /></span>
                                                            <div className="ms-2">
                                                                <p className="font-semibold mb-0 flex items-center"><a
                                                                    href="#!"> {idx.productName}</a></p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">{idx.productBrand}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{idx.date} </td>
                                                    <td>{idx.paymentMode}</td>
                                                    <td className="font-semibold">{idx.price}</td>
                                                    <td><span
                                                        className={`badge bg-${idx.statusColor}/[0.15] text-${idx.statusColor}`}>{idx.status}</span>
                                                    </td>
                                                    <td>
                                                        <Link scroll={false} href="/ecommerce/customer/order-tracking"
                                                            className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave">
                                                            <i className="ri-eye-line"></i>
                                                        </Link>
                                                        <Link scroll={false} href="#!"
                                                            className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave">
                                                            <i className="ri-download-line"></i>
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
                                            Showing <b>1</b> to <b>5</b> of <b>10</b> entries <i
                                                className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <nav aria-label="Page navigation" className="pagination-style-4 float-end">
                                                <ul className="ti-pagination mb-0 me-1">
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

export default Customer;