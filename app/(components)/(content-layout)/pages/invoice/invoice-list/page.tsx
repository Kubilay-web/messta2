"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { Invoicecards, InvoicesList } from "@/shared/data/apps/ecommers/vendor/invoicesdata";
import { InvoiceStatisticsOptions, InvoiceStatisticsSeries } from "@/shared/data/pages/invoice/invoice-list-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import CountUp from "react-countup";


const InvoiceList = () => {
    const [manageTaskData, setManageTaskData] = useState([...InvoicesList]);

    const handleDelete = (idToRemove: any) => {
        const updatedTaskData = manageTaskData.filter((item: any) => item.id !== idToRemove);
        setManageTaskData(updatedTaskData);
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Invoice List" />
            <Pageheader Heading="Invoice List" breadcrumbs={['Pages', ' Invoice']} currentpage="Invoice List" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {Invoicecards.map((idx) => (
                                    <div className="xxl:col-span-6 col-span-12" key={idx.id}>
                                        <div className="box">
                                            <div className="box-body !p-6">
                                                <div className="flex items-start gap-3">
                                                    <div className={`main-card-icon ${idx.iconBG} mb-3`}>
                                                        <div className={`avatar avatar-lg bg-${idx.iconBgColor}/[0.15] border border-${idx.iconBgColor}/10`}>
                                                            <div className="avatar avatar-sm svg-white">
                                                                {idx.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h6 className="text-[0.75rem]">{idx.title}</h6>
                                                        <div className="pb-0 mt-0">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-medium mb-0">$ <CountUp className="count-up" end={idx.value} /> {idx.valueUnit} </h4>
                                                                    <span className={`badge bg-${idx.iconBgColor} text-white`}>{idx.badge}</span>
                                                                </div>
                                                                <p className="text-muted text-[0.6875rem] mb-0 leading-none">
                                                                    <span className={`text-${idx.percentClass} me-1 font-medium`}>
                                                                        <i className={`ri-arrow-${idx.arrowClass}-s-line me-1 align-middle`}></i>{idx.percentChange}%
                                                                    </span>
                                                                    <span> this month</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Invoice Statistics
                                    </div>
                                </div>
                                <div className="box-body !px-0 !pb-0">
                                    <div id="invoice-list-stats">
                                        <Spkapexcharts chartOptions={InvoiceStatisticsOptions} chartSeries={InvoiceStatisticsSeries} type="bar" width={"100%"} height={180} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header justify-content-between">
                            <div className="box-title">
                                Manage Invoices
                            </div>
                            <div className="flex">
                                <Link href="/pages/invoice/create-invoice/" className="ti-btn ti-btn-sm ti-btn-primary btn-wave waves-light"><i className="ri-add-line font-medium align-middle me-1"></i> Create Invoice</Link>
                                <div className="ti-dropdown hs-dropdown ms-2">
                                    <button className="ti-btn ti-btn-icon ti-btn-soft-secondary ti-btn-sm btn-wave waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">All Invoices</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Paid Invoices</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Pending Invoices</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Overdue Invoices</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="table-responsive">
                                <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Client' }, { title: 'Invoice ID' }, { title: 'Issued Date', }, { title: 'Amount', }, { title: 'Status' }, { title: 'Due Date' }, { title: 'Action' }]}>
                                    {manageTaskData.map((idx) => (
                                        <tr key={idx.id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-sm avatar-rounded">
                                                            <Image fill src={idx.src} alt="" />
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-medium">{idx.name}</p>
                                                        <p className="mb-0 text-[0.6875rem] text-muted">{idx.mail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Link href="/pages/invoice/create-invoice/" className="font-semibold text-primary">
                                                    {idx.id}
                                                </Link>
                                            </td>
                                            <td>{idx.date} </td>
                                            <td>{idx.amount}</td>
                                            <td>
                                                <span className={`badge bg-${idx.statusColor}/[0.15] text-${idx.statusColor}`}>{idx.status}</span>
                                            </td>
                                            <td>{idx.dueDate} </td>
                                            <td>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-soft-primary ti-btn-icon ti-btn-sm !m-0 hs-tooltip-toggle !me-2">
                                                        <i className="ri-printer-line"></i>
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                            role="tooltip">
                                                            Print
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="hs-tooltip ti-main-tooltip">
                                                    <Link onClick={() => handleDelete(idx.id)} scroll={false} href="#!" className="ti-btn ti-btn-soft-danger ti-btn-icon ti-btn-sm !m-0 hs-tooltip-toggle !me-1">
                                                        <i className="ri-delete-bin-5-line"></i>
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                            role="tooltip">
                                                            Delete
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </Spktables>
                            </div>
                        </div>
                        <div className="box-footer">
                            <nav aria-label="Page navigation">
                                <ul className="ti-pagination mb-0 float-end">
                                    <li className="page-item">
                                        <Link href="#!" scroll={false} className="page-link disabled">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">1</Link></li>
                                    <li className="page-item" aria-current="page">
                                        <Link scroll={false} className="page-link active" href="#!">2</Link>
                                    </li>
                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                    <li className="page-item">
                                        <Link scroll={false} className="page-link" href="#!">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default InvoiceList;