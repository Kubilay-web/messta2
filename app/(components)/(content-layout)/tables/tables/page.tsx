"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as tablesPrisn from "@/shared/data/prism/tables-prism";
import * as tableData from "@/shared/data/tables/tablesdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface TablesProps { }

const Tables: FC<TablesProps> = () => {
    const footertext = (
        <tr className="border-b border-defaultborder dark:border-b-white/10">
            <th scope="row">
                Total
            </th>
            <td>
                United States
            </td>
            <td>
                558
            </td>
            <td><SpkBadge variant="primary" customClass="text-white">56%</SpkBadge></td>
        </tr>
    );
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Tables" />
            <Pageheader Heading="Tables" breadcrumbs={['Tables',]} currentpage="Tables" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Basic Table" reactCode={tablesPrisn.reacttabledata1} reusableCode={tablesPrisn.reusetabledata1} dataCode={tablesPrisn.basictabledata} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableClass="ti-custom-table ti-custom-table-head" tableRowclass="border-b  border-defaultborder dark:border-defaultborder/10" header={[{ title: 'Name', headerClassname: 'text-start' }, { title: 'Created On', headerClassname: 'text-start' }, { title: 'Number', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.Basictable.map((idx) => (
                                    <tr key={idx.id} className='border-b  border-defaultborder dark:border-defaultborder/10'>
                                        <th scope="row" className="text-start">{idx.name}</th>
                                        <td>{idx.date}</td>
                                        <td>{idx.number}</td>
                                        <td><SpkBadge customClass={`bg-outline-${idx.color}`}>{idx.status}</SpkBadge></td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Bordered Table" reactCode={tablesPrisn.reacttabledata2} reusableCode={tablesPrisn.reusetabledata2} dataCode={tablesPrisn.datatable2} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableClass="ti-custom-table ti-custom-table-head !border  border-defaultborder dark:border-defaultborder/10" tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' header={[{ title: 'User' }, { title: 'Status' }, { title: 'Email' }, { title: 'Action' }]}>
                                {tableData.Table1data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row">
                                            <div className="flex items-center">
                                                <span className={`avatar avatar-xs me-2 ${idx.class1} avatar-rounded shrink-0`}>
                                                    <Image fill src={idx.src} alt="img" />
                                                </span>{idx.name}
                                            </div>
                                        </th>
                                        <td><SpkBadge variant={idx.color} customClass={`text-${idx.color1}`}>{idx.text}</SpkBadge></td>
                                        <td>{idx.mail}</td>
                                        <td>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Link aria-label="anchor" href="#" className="text-info text-[.875rem] leading-none me-2"><i
                                                    className="ri-edit-line"></i></Link>
                                                <Link aria-label="anchor" href="#" className="text-danger text-[.875rem] leading-none"><i
                                                    className="ri-delete-bin-5-line"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Bordered Primary" reactCode={tablesPrisn.reacttabledata3} reusableCode={tablesPrisn.reusetabledata3} dataCode={tablesPrisn.datatable4} customCardClass="custom box">
                        <div className="table-responsive overflow-auto table-bordered-primary">
                            <Spktables tableRowclass='border-b border-primary/30' tableClass="ti-custom-table ti-custom-table-head" header={[{ title: 'Order', headerClassname: "text-start" }, { title: 'Date', headerClassname: "text-start" }, { title: 'Customer', headerClassname: "text-start" }, { title: 'Action', headerClassname: "text-start" }]}>
                                {tableData.Table4data.map((idx) => (
                                    <tr key={idx.id} className='border-b border-primary/30'>
                                        <th scope="row" className="text-start">
                                            {idx.order}
                                        </th>
                                        <td>
                                            <SpkBadge variant="light" customClass="text-dark">{idx.date}</SpkBadge>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                <span className="avatar avatar-xs me-2 online avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </span>{idx.name}
                                            </div>
                                        </td>

                                        <td>
                                            <SpkBadge variant="primary/10" customClass="text-primary">Booked</SpkBadge>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Bordered Success" customCardClass="custom box" reactCode={tablesPrisn.reacttabledata4} reusableCode={tablesPrisn.reusetabledata4} dataCode={tablesPrisn.datatable5}>
                        <div className="table-responsive overflow-auto table-bordered-success">
                            <Spktables tableRowclass="border-b border-success/30" tableClass="ti-custom-table ti-custom-table-head" header={[{ title: 'Order', headerClassname: 'text-start' }, { title: 'Date', headerClassname: 'text-start' }, { title: 'Customer', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.Tabledata5.map((idx) => (
                                    <tr className="border-b border-success/30" key={idx.id}>
                                        <th scope="row" className="text-start">
                                            {idx.order}
                                        </th>
                                        <td>
                                            <SpkBadge variant="light" customClass="text-dark">{idx.date}</SpkBadge>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                <span className="avatar avatar-xs me-2 online avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </span>{idx.name}
                                            </div>
                                        </td>
                                        <td><SpkBadge variant="success/10" customClass="text-success">Delivered</SpkBadge></td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Bordered Warning" customCardClass="custom box" reactCode={tablesPrisn.reacttabledata5} reusableCode={tablesPrisn.reusetabledata5} dataCode={tablesPrisn.datatable6}>
                        <div className="table-responsive overflow-auto table-bordered-warning">
                            <Spktables tableRowclass='border-b border-warning/30' tableClass="ti-custom-table ti-custom-table-head" header={[{ title: 'Order', headerClassname: 'text-start' }, { title: 'Date', headerClassname: 'text-start' }, { title: 'Customer', headerClassname: 'text-start' }, { title: 'Action', headerClassname: 'text-start' }]}>
                                {tableData.Tabledata6.map((idx) => (
                                    <tr className="border-b border-warning/30" key={idx.id}>
                                        <th scope="row" className="text-start">
                                            {idx.order}
                                        </th>
                                        <td>
                                            <SpkBadge variant="light" customClass="text-dark">{idx.date}</SpkBadge>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                <span className="avatar avatar-xs me-2 online avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </span>{idx.name}
                                            </div>
                                        </td>
                                        <td><SpkBadge variant="warning/10" customClass="text-warning">Accepted</SpkBadge></td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Without Borders" customCardClass="custom box" reactCode={tablesPrisn.reacttabledata6} reusableCode={tablesPrisn.reusetabledata6} dataCode={tablesPrisn.datatable7}>
                        <div className="table-responsive table-border-less custom-table-list">
                            <Spktables tableClass="ti-custom-table" header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.Borderdata.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.name}</th>
                                        <td>{idx.transactionid}</td>
                                        <td>{idx.date}</td>
                                        <td><span className={`badge bg-${idx.color} text-white`}>{idx.status}</span></td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Group Divideres" reactCode={tablesPrisn.reacttabledata7} reusableCode={tablesPrisn.reusetabledata7} dataCode={tablesPrisn.datatable8} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableClass="ti-custom-table" tBodyClass="table-group-divider dark:!border-defaultborder/10" header={[{ title: 'Product', headerClassname: 'text-start' }, { title: 'Seller', headerClassname: 'text-start' }, { title: 'Sale Percentage', headerClassname: 'text-start' }, { title: 'Quantity Sold', headerClassname: 'text-start' }]}>
                                {tableData.Groupdata.map((idx) => (
                                    <tr className="border-b border-defaultborder  dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row" className="text-start">{idx.product}</th>
                                        <td>{idx.seller}</td>
                                        <td><Link href="#!" className={`text-${idx.color}`}>{idx.percent}<i className={`ri-arrow-${idx.icon}-fill ms-1`}></i></Link></td>
                                        <td>{idx.sold}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Striped Rows" reactCode={tablesPrisn.reacttabledata8} reusableCode={tablesPrisn.reusetabledata8} dataCode={tablesPrisn.datatable9} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass="border-b border-defaultborder dark:border-defaultborder/10" tableClass="ti-custom-table ti-custom-table-head ti-striped-table"
                                header={[{ title: 'ID', headerClassname: 'text-start' }, { title: 'Date', headerClassname: 'text-start' }, { title: 'Customer', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.Table5data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10 " key={idx.id}>
                                        <th scope="row">{idx.order}</th>
                                        <td>{idx.date}</td>
                                        <td>{idx.name}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant="" customClass="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-success-full btn-wave">
                                                <i className="ri-download-2-line align-middle me-2 inline-block"></i>Download
                                            </SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Striped Columns" reactCode={tablesPrisn.reacttabledata9} reusableCode={tablesPrisn.reusetabledata9} dataCode={tablesPrisn.datatable9} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass="border-b  border-defaultborder dark:border-defaultborder/10" tableClass="ti-custom-table ti-custom-table-head table-striped-columns min-w-full"
                                header={[{ title: 'ID', headerClassname: "text-start" }, { title: 'Date', headerClassname: "text-start" }, { title: 'Customer', headerClassname: "text-start" }, { title: 'Action', headerClassname: "text-start" }]}>
                                {tableData.Table5data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row">{idx.order}</th>
                                        <td>{idx.date}</td>
                                        <td>{idx.name}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant="soft-danger" customClass="ti-btn !py-1 !px-2 !text-[0.75rem]  btn-wave">
                                                <i className="ri-delete-bin-line align-middle me-2 d-inline-block"></i>Delete
                                            </SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Primary Table" reactCode={tablesPrisn.reacttabledata10} reusableCode={tablesPrisn.reusetabledata10} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive overflow-auto table-primary">
                            <Spktables tableRowclass='border-b border-primary/10' tableClass="ti-custom-table ti-custom-table-head"
                                header={[{ title: '#', headerClassname: "text-start" }, { title: 'First', headerClassname: "text-start" }, { title: 'Last', headerClassname: "text-start" }, { title: 'Handle', headerClassname: "text-start" }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Secondary Table" reactCode={tablesPrisn.reacttabledata11} reusableCode={tablesPrisn.reusetabledata11} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive overflow-auto table-secondary">
                            <Spktables tableRowclass='border-b border-secondary/10' tableClass="ti-custom-table ti-custom-table-head" header={[{ title: '#' }, { title: 'First' }, { title: 'Last' }, { title: 'Handle' }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Warning Table" reactCode={tablesPrisn.reacttabledata12} reusableCode={tablesPrisn.reusetabledata12} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive  overflow-auto table-warning">
                            <Spktables tableRowclass='border-b border-warning/10' tableClass="ti-custom-table ti-custom-table-head" header={[{ title: '#', headerClassname: 'text-start' }, { title: 'First', headerClassname: 'text-start' }, { title: 'Last', headerClassname: 'text-start' }, { title: 'Handle', headerClassname: 'text-start' }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Danger Table" reactCode={tablesPrisn.reacttabledata13} reusableCode={tablesPrisn.reusetabledata13} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive table-danger">
                            <Spktables tableRowclass='border-b border-danger/10' tableClass="ti-custom-table ti-custom-table-head" header={[{ headerClassname: 'text-start', title: '#' }, { headerClassname: 'text-start', title: 'First' }, { headerClassname: 'text-start', title: 'Last' }, { headerClassname: 'text-start', title: 'Handle' }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Info Table" reactCode={tablesPrisn.reacttabledata14} reusableCode={tablesPrisn.reusetabledata14} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive table-info">
                            <Spktables tableRowclass='border-b border-danger/10' tableClass="ti-custom-table ti-custom-table-head" header={[{ headerClassname: 'text-start', title: '#' }, { headerClassname: 'text-start', title: 'First' }, { headerClassname: 'text-start', title: 'Last' }, { headerClassname: 'text-start', title: 'Handle' }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Success Table" reactCode={tablesPrisn.reacttabledata15} reusableCode={tablesPrisn.reusetabledata15} dataCode={tablesPrisn.datatable10} customCardClass="custom box">
                        <div className="table-responsive table-success">
                            <Spktables tableRowclass='border-b border-success/10' tableClass="ti-custom-table ti-custom-table-head" header={[{ headerClassname: 'text-start', title: '#' }, { headerClassname: 'text-start', title: 'First' }, { headerClassname: 'text-start', title: 'Last' }, { headerClassname: 'text-start', title: 'Handle' }]}>
                                {tableData.Table6data.map((idx) => (
                                    <tr key={idx.id}>
                                        <th scope="row" className="text-start">{idx.id}</th>
                                        <td>{idx.text1}</td>
                                        <td>{idx.text2}</td>
                                        <td>{idx.text3}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Hoverable Rows" reactCode={tablesPrisn.reacttabledata16} reusableCode={tablesPrisn.reusetabledata16} dataCode={tablesPrisn.datatable16} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-custom-table-hover" header={[{ title: 'Product Manager' }, { title: 'Category' }, { title: 'Team' }, { title: 'Status' }]}>
                                {tableData.Hoverabledata.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10 " key={idx.id}>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="avatar avatar-sm me-2 avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </div>
                                                <div>
                                                    <div className="leading-none">
                                                        <span>{idx.product}</span>
                                                    </div>
                                                    <div className="leading-none">
                                                        <span
                                                            className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">{idx.mail}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><SpkBadge customClass={`badge bg-${idx.color}/10 text-${idx.color}`}>{idx.category}</SpkBadge></td>
                                        <td>
                                            {idx.team}
                                        </td>
                                        <td>
                                            <div className="progress progress-xs">
                                                <div className={`progress-bar bg-primary w-${idx.status}`} role="progressbar" aria-valuenow={52} aria-valuemin={0}
                                                    aria-valuemax={100}>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Hoverable Rows With Striped Rows" reactCode={tablesPrisn.reacttabledata17} reusableCode={tablesPrisn.reusetabledata17} dataCode={tablesPrisn.datatable17} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10 dark:hover:!bg-light ' tableClass="ti-custom-table ti-custom-table-head ti-striped-table ti-custom-table-hover"
                                header={[{ title: 'Invoice', headerClassname: 'text-start' }, { title: 'Customer', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }, { title: 'Date', headerClassname: 'text-start' }]}>
                                {tableData.Table13data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10 dark:hover:!bg-light " key={idx.id}>
                                        <th scope="row">{idx.text1}</th>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="avatar avatar-sm me-2 avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </div>
                                                <div>
                                                    <div className="leading-none">
                                                        <span>{idx.name}</span>
                                                    </div>
                                                    <div className="leading-none">
                                                        <span
                                                            className="text-[0.6875rem] text-[#8c9097] dark:text-white/50">{idx.mail}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><SpkBadge customClass={`bg-${idx.color}/10 text-${idx.color} ${idx.customclass}`}><i
                                            className={`ri-${idx.icon} align-middle me-1`}></i>{idx.text2}</SpkBadge></td>
                                        <td>{idx.date}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}

            {/* <!-- Start:: row-7 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Primary" reactCode={tablesPrisn.reacttabledata18} reusableCode={tablesPrisn.reusetabledata18} dataCode={tablesPrisn.datatable7} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b border-primary/10' headerClass="bg-primary/10" tableClass="ti-custom-table ti-custom-table-head ti-head-primary"
                                header={[{ headerClassname: "text-start", title: 'User Name' }, { headerClassname: "text-start", title: 'Transaction Id' }, { headerClassname: "text-start", title: 'Created' }, { headerClassname: "text-start", title: 'Status' }]}>
                                {tableData.Table7data.map((idx) => (
                                    <tr className="border-b border-primary/10" key={idx.id}>
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <div className="hstack flex gap-3 text-[.9375rem]">
                                                <Link scroll={false} aria-label="anchor" href="#!"
                                                    className="ti-btn ti-btn-sm ti-btn-soft-success !rounded-full"><i
                                                        className="ri-download-2-line"></i></Link>
                                                <Link scroll={false} aria-label="anchor" href="#!"
                                                    className="ti-btn ti-btn-sm ti-btn-soft-info !rounded-full"><i
                                                        className="ri-edit-line"></i></Link>
                                                <Link scroll={false} aria-label="anchor" href="#!"
                                                    className="ti-btn ti-btn-sm ti-btn-soft-danger !rounded-full"><i
                                                        className="ri-delete-bin-line"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Secondary" reactCode={tablesPrisn.reacttabledata22} reusableCode={tablesPrisn.reusetabledata22} dataCode={tablesPrisn.datatable20} customCardClass="custom box">
                        <div className="table-responsive ">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-head-secondary"
                                headerClass="bg-secondary/10" header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.tablehead.map((idx) => (
                                    <tr key={idx.id} className="border-b  border-defaultborder dark:border-defaultborder/10">
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Success" reactCode={tablesPrisn.reacttabledata20} reusableCode={tablesPrisn.reusetabledata20} dataCode={tablesPrisn.datatable20} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-head-success" headerClass="bg-success/10"
                                header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.tablehead.map((idx) => (
                                    <tr key={idx.id} className="border-b  border-defaultborder dark:border-defaultborder/10">
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Info" reactCode={tablesPrisn.reacttabledata21} reusableCode={tablesPrisn.reusetabledata21} dataCode={tablesPrisn.datatable20} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-head-info" headerClass="bg-info/10"
                                header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.tablehead.map((idx) => (
                                    <tr key={idx.id} className="border-b  border-defaultborder dark:border-defaultborder/10">
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Warning" reactCode={tablesPrisn.reacttabledata19} reusableCode={tablesPrisn.reusetabledata19} dataCode={tablesPrisn.datatable19} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-head-warning" headerClass="bg-warning/10"
                                header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.tablehead.map((idx) => (
                                    <tr key={idx.id} className="border-b  border-defaultborder dark:border-defaultborder/10">
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Table Head Danger" reactCode={tablesPrisn.reacttabledata23} reusableCode={tablesPrisn.reusetabledata23} dataCode={tablesPrisn.datatable20} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table ti-custom-table-head ti-head-danger" headerClass="bg-danger/10"
                                header={[{ title: 'User Name', headerClassname: 'text-start' }, { title: 'Transaction Id', headerClassname: 'text-start' }, { title: 'Created', headerClassname: 'text-start' }, { title: 'Status', headerClassname: 'text-start' }]}>
                                {tableData.tablehead.map((idx) => (
                                    <tr key={idx.id} className="border-b  border-defaultborder dark:border-defaultborder/10">
                                        <td scope="row" className="text-start">{idx.name}</td>
                                        <td>{idx.text}</td>
                                        <td>{idx.date}</td>
                                        <td>
                                            <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !py-1 !px-2 !text-[0.75rem]">{idx.btn}</SpkButton>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-7 --> */}

            {/* <!-- Start:: row-8 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Table Foot" reactCode={tablesPrisn.reacttabledata24} reusableCode={tablesPrisn.reusetabledata24} dataCode={tablesPrisn.datatable24} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' footchildren={footertext} footerClass="bg-primary/10" headerClass="bg-primary/10"
                                tableClass="ti-custom-table whitespace-nowrap min-w-full" header={[{ title: 'S.No' }, { title: 'Team' }, { title: 'Matches Won' }, { title: 'Win Ratio' }]}>
                                {tableData.Table10data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row">
                                            {idx.text1}
                                        </th>
                                        <td>
                                            {idx.text2}
                                        </td>
                                        <td>
                                            {idx.text3}
                                        </td>
                                        <td>
                                            <SpkBadge variant="primary" customClass="text-white">{idx.text4} </SpkBadge>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Table With Caption" reactCode={tablesPrisn.reacttabledata25} reusableCode={tablesPrisn.reusetabledata25} dataCode={tablesPrisn.datatable25} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' headerContent={<caption>Top 3 Countries</caption>} tableClass="ti-custom-table whitespace-nowrap min-w-full caption-bottom" header={[{ headerClassname: 'text-start', title: 'S.No' }, { headerClassname: 'text-start', title: 'Country' }, { headerClassname: 'text-start', title: 'Medals Won' }, { headerClassname: 'text-start', title: 'No Of Athletes' }]}>
                                {tableData.Captiondata.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row" className="text-start">0{idx.id}</th>
                                        <td>{idx.country}</td>
                                        <td>{idx.won}<i className="ri-medal-line mx-2"></i></td>
                                        <td>{idx.athletes}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Showcode title="Table With Top Caption" reactCode={tablesPrisn.reacttabledata26} reusableCode={tablesPrisn.reusetabledata26} dataCode={tablesPrisn.datatable26} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables headerContent={<caption>Top IT Companies</caption>} tableClass="ti-custom-table whitespace-nowrap caption-top w-full" header={[{ title: 'S.No' }, { title: 'Name' }, { title: 'Revenue' }, { title: 'Country' }]}>
                                {tableData.Topcaptuiondata.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row">{idx.id}</th>
                                        <td>{idx.name}</td>
                                        <td>{idx.revenue}</td>
                                        <td>{idx.country}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-8 --> */}

            {/* <!-- Start:: row-9 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Active Tables" reactCode={tablesPrisn.reacttabledata27} reusableCode={tablesPrisn.reusetabledata27} dataCode={tablesPrisn.datatable27} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table whitespace-nowrap min-w-full" header={[{ headerClassname: 'text-start', title: 'Name' }, { headerClassname: 'text-start', title: 'Created On' }, { headerClassname: 'text-start', title: 'Number' }, { headerClassname: 'text-start', title: 'Status' }]}>
                                {tableData.Activedata.map((idx) => (
                                    <tr key={idx.id} className={idx.class}>
                                        <th scope="row" className="text-start">{idx.name}</th>
                                        <td>{idx.create}</td>
                                        <td className={idx.tdclass}>{idx.number}</td>
                                        <td><span className={`badge bg-${idx.color} text-white`}>{idx.status}</span></td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Small Tables" reactCode={tablesPrisn.reacttabledata28} reusableCode={tablesPrisn.reusetabledata28} dataCode={tablesPrisn.datatable28} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="table whitespace-nowrap table-sm min-w-full"
                                header={[{ headerClassname: 'text-start', title: 'Invoice' }, { headerClassname: 'text-start', title: 'Created Date' }, { headerClassname: 'text-start', title: 'Status' }, { headerClassname: 'text-start', title: 'Action' }]}>
                                {tableData.Table9data.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row" className="text-start">
                                            <div className="form-check">
                                                <input id={idx.id} defaultChecked={idx.checked === 'defaultChecked'} className="form-check-input me-1" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="checkebox-sm">
                                                    {idx.name}
                                                </label>
                                            </div>
                                        </th>
                                        <td>{idx.date}</td>
                                        <td><span className={`badge bg-${idx.class}/10 text-${idx.class}`}>{idx.text}</span></td>
                                        <td>
                                            <div className="hstack flex gap-3 text-[.9375rem]">
                                                <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-9 --> */}

            {/* <!-- Start:: row-10 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Color Variant Tables" reactCode={tablesPrisn.reacttabledata29} reusableCode={tablesPrisn.reusetabledata29} dataCode={tablesPrisn.datatable29} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table whitespace-nowrap min-w-full" header={[{ headerClassname: 'text-start', title: 'Color' }, { headerClassname: 'headerClassname', title: 'Client' }, { headerClassname: 'headerClassname', title: 'State' }, { headerClassname: 'headerClassname', title: 'Quantity' }, { headerClassname: 'headerClassname', title: 'Total Price' }]}>
                                {tableData.Colortables.map((idx) => (
                                    <tr key={idx.id} className={`${idx.class1} border-b  border-defaultborder dark:border-defaultborder/10`}>
                                        <th scope="row">{idx.text}</th>
                                        <td>{idx.name}</td>
                                        <td><span
                                            className={`badge ${idx.class2}`}>Processed</span></td>
                                        <td>{idx.quantity}</td>
                                        <td>{idx.price}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Nesting" reactCode={tablesPrisn.reacttabledata30} reusableCode={tablesPrisn.reusetabledata30} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table whitespace-nowrap table-striped table-bordered min-w-full" header={[{ headerClassname: 'text-start', title: '#' }, { headerClassname: 'text-start', title: 'First' }, { headerClassname: 'text-start', title: 'Last' }, { headerClassname: 'text-start', title: 'Handle' }]}>
                                <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                    <th scope="row" className="text-start">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                    <td colSpan={4} className="!p-0">
                                        <Spktables tableClass="table whitespace-nowrap mb-0 min-w-full" tableRowclass="border-b  border-defaultborder dark:border-defaultborder/10"
                                            header={[{ headerClassname: 'text-start', title: 'Alphabets' }, { headerClassname: 'text-start', title: 'Users' }, { headerClassname: 'text-start', title: 'Email' }]}>
                                            <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                                <th scope="row" className="text-start">A</th>
                                                <td>Dino King</td>
                                                <td>dinoking231@gmail.com</td>
                                            </tr>
                                            <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                                <th scope="row" className="text-start">B</th>
                                                <td>Poppins sams</td>
                                                <td>pops@gmail.com</td>
                                            </tr>
                                            <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                                <th scope="row" className="text-start">C</th>
                                                <td>Brian Shaw</td>
                                                <td>swanbrian@gmail.com</td>
                                            </tr>
                                        </Spktables>
                                    </td>
                                </tr>
                                <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                    <th scope="row" className="text-start">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                                <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                    <th scope="row" className="text-start">4</th>
                                    <td>Jimmy</td>
                                    <td>the Ostrich</td>
                                    <td>Dummy Text</td>
                                </tr>
                                <tr className="border-b  border-defaultborder dark:border-defaultborder/10">
                                    <th scope="row" className="text-start">5</th>
                                    <td>Cobra Kai</td>
                                    <td>the Snake</td>
                                    <td>Another Name</td>
                                </tr>
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-10 --> */}

            {/* <!-- Start:: row-11 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Always Responsive" reactCode={tablesPrisn.reacttabledata31} reusableCode={tablesPrisn.reusetabledata31} dataCode={tablesPrisn.datatable31} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table whitespace-nowrap min-w-full" showCheckbox={true} header={[{ title: 'Team Head' }, { title: 'Category' }, { title: 'Role' }, { headerClassname: "text-start", title: 'Gmail' }, { headerClassname: "text-start", title: 'Team' }, { headerClassname: "text-start", title: 'Work Progress' }, { headerClassname: "text-start", title: 'Revenue' }, { headerClassname: "text-start", title: 'Action' }]}>
                                {tableData.Responsivedata.map((idx) => (
                                    <tr className="border-b  border-defaultborder dark:border-defaultborder/10" key={idx.id}>
                                        <th scope="row"><input className="form-check-input" type="checkbox" id="checkboxNoLabel1" defaultValue="" aria-label="..." /></th>
                                        <td>
                                            <div className="flex items-center">
                                                <span className="avatar avatar-xs me-2 online avatar-rounded">
                                                    <Image fill src={idx.src} alt="img" />
                                                </span>{idx.name}
                                            </div>
                                        </td>
                                        <td>{idx.category}</td>
                                        <td><SpkBadge customClass={`bg-${idx.color}/10 text-${idx.color}`}>{idx.role}</SpkBadge></td>
                                        <td>{idx.mail}</td>
                                        <td>
                                            {idx.team}
                                        </td>
                                        <td>
                                            <div className="progress progress-xs">
                                                <div className={`progress-bar bg-primary w-[${idx.progress}%]`} role="progressbar" aria-valuenow={52} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{idx.revenue}</td>
                                        <td>
                                            <div className="hstack flex gap-3 text-[.9375rem]">
                                                <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-success"><i className="ri-download-2-line"></i></Link>
                                                <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-info"><i className="ri-edit-line"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-11 --> */}

            {/* <!-- Start:: row-12 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Vertical Alignment" reactCode={tablesPrisn.reacttabledata32} reusableCode={tablesPrisn.reusetabledata32} dataCode={tablesPrisn.datatable32} customCardClass="custom box">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b  border-defaultborder dark:border-defaultborder/10' tableClass="ti-custom-table align-middle min-w-full !whitespace-normal"
                                header={[{ title: 'Heading 1', headerClassname: '!w-[25%] !whitespace-normal text-start' }, { title: 'Heading 2', headerClassname: '!w-[25%] !whitespace-normal text-start' }, { title: 'Heading 3', headerClassname: '!w-[25%] !whitespace-normal text-start' }, { title: 'Heading 4', headerClassname: '!w-[25%] !whitespace-normal text-start' }]}>
                                {tableData.Table12data.map((idx) => (
                                    <tr key={idx.id} className={idx.class1}>
                                        <td className='!whitespace-normal'>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
                                        <td className='!whitespace-normal'>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
                                        <td className={idx.class2}>{idx.text3} <code>{idx.code2}</code> {idx.text4}</td>
                                        <td className='!whitespace-normal'>This here is some placeholder text, intended to take up
                                            quite a
                                            bit of vertical space, to demonstrate how the vertical
                                            alignment
                                            works in the preceding cells.</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-12 --> */}
        </Fragment>
    );
};

export default Tables;