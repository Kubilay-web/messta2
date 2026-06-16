"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { fileNavItems, files, FilesOptions, FilesSeries, Folders, Folders1, QuickAccess } from "@/shared/data/pages/file-manager-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const FileManager = () => {

    const footertext = (
        <tr>
            <td colSpan={5}>
                <nav aria-label="Page navigation">
                    <ul className="ti-pagination justify-end mb-0">
                        <li className="page-item"><Link scroll={false} className="page-link disabled" href="#!">Previous</Link>
                        </li>
                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">1</Link>
                        </li>
                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link>
                        </li>
                        <li className="page-item"><Link scroll={false} className="page-link" href="#!">Next</Link>
                        </li>
                    </ul>
                </nav>
            </td>
        </tr>
    );
    return (
        <Fragment>


            {/* <!-- Page Header --> */}
            <Seo title="File Manager" />
            <Pageheader Heading="File Manager" breadcrumbs={['Pages']} currentpage="File Manager" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-4 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <ul className="ti-list-unstyled files-main-nav" id="files-main-nav">
                                        {fileNavItems.map((idx) => (
                                            <li className={`files-type ${idx.active}`} key={idx.id} >
                                                <Link scroll={false} href="#!">
                                                    <div className="flex items-center">
                                                        <div className="me-2">
                                                            <i className={`ri-${idx.icon} text-[1rem]`}></i>
                                                        </div>
                                                        <span className="flex-grow text-nowrap">
                                                            {idx.name}
                                                        </span>
                                                        <span className={`badge bg-${idx.color} text-white`}>{idx.count}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <div className="flex items-start gap-4">
                                                <div>
                                                    <span className="avatar avatar-md bg-info/[0.15] svg-info">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="!fill-info !text-info" viewBox="0 0 256 256">
                                                            <rect width="256" height="256" fill="none" />
                                                            <ellipse cx="128" cy="80" rx="88" ry="48"
                                                                opacity="0.2" />
                                                            <ellipse cx="128" cy="80" rx="88" ry="48" fill="none"
                                                                stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" strokeWidth="16" />
                                                            <path
                                                                d="M40,80v48c0,26.51,39.4,48,88,48s88-21.49,88-48V80"
                                                                fill="none" stroke="currentColor"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="16" />
                                                            <path
                                                                d="M40,128v48c0,26.51,39.4,48,88,48s88-21.49,88-48V128"
                                                                fill="none" stroke="currentColor"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="16" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <div className=" mb-2">
                                                        <p className="mb-0"><span className="font-bold text-[0.875rem]">69.42GB</span> Used</p>
                                                        <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">58% Used -  51.04Gb free</p>
                                                    </div>
                                                    <div className="progress progress-xs">
                                                        <div className="progress-bar !bg-info progress-bar-animated progress-bar-striped"
                                                            role="progressbar" style={{ width: '58%' }} aria-valuenow={58}
                                                            aria-valuemin={0} aria-valuemax={100}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-body">
                                    <div id="file-manager-storage">
                                        <Spkapexcharts chartOptions={FilesOptions} chartSeries={FilesSeries} type="donut" width={"100%"} height={225} />
                                    </div>
                                </div>
                                <div className="box-footer !p-0">
                                    <ul className="ti-list-group ti-list-group-flush">
                                        {Folders1.map((idx) => (
                                            <li className="ti-list-group-item" key={idx.id}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`main-card-icon ${idx.cardIconBg}`}>
                                                        <div className={`avatar avatar-lg bg-${idx.iconBg}/[0.15] border border-${idx.iconBg}/10`}>
                                                            <div className="avatar avatar-sm svg-white">
                                                                {idx.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <span className="font-medium">{idx.type}</span>
                                                        <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem] block">{idx.files} files</span>
                                                    </div>
                                                    <div>
                                                        <span className={`font-medium text-${idx.iconBg} mb-0 text-[0.875rem]`}>{idx.size}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box !border-0 shadow-none !bg-primary/[0.15]">
                                <div className="box-body">
                                    <div className="filemanager-upgrade-storage w-full text-center">
                                        <span className="block mb-3"> <Image fill src="../../assets/images/media/file-manager/2.png" alt="" className="!inline-flex" /> </span>
                                        <span className="text-[0.9375rem] font-semibold text-default">Upgrade To PRO</span>
                                        <span className="text-[0.75rem] font-medium block text-textmuted dark:text-textmuted/50 mt-2">Upgrade
                                            to Pro for lightning-fast transfers, enhanced security, unlimited
                                            storage</span>
                                        <div className="mt-4 grid">
                                            <button className="ti-btn ti-btn-lg bg-gradient-to-r !border-0 !text-white from-primary to-secondary ti-btn-primary-gradient btn-wave">Upgrade Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-9 xl:col-span-8 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="file-manager-folders">
                                <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b border-defaultborder dark:border-defaultborder/10">
                                    <div className="flex-grow">
                                        <h6 className="font-medium mb-0">Folders</h6>
                                    </div>
                                    <div className="flex gap-2 flex-wrap sm:justify-end !w-[75%]">
                                        <input className="form-control form-control-sm !w-[50%]" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                        <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-sm btn-wave ti-btn-primary !m-0" data-hs-overlay="#creafoldermodal">
                                            <i className="ri-add-circle-line align-middle"></i> Create Folder
                                        </button>
                                        <div id="creafoldermodal" className="hs-overlay hidden ti-modal">
                                            <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                                <div className="ti-modal-content">
                                                    <div className="ti-modal-header">
                                                        <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel1">Create Folder</h6>
                                                        <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#creafoldermodal">
                                                            <span className="sr-only">Close</span>
                                                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="ti-modal-body">
                                                        <label htmlFor="create-folder2" className="ti-form-label">Folder Name</label>
                                                        <input type="text" className="form-control" id="create-folder2" placeholder="Folder Name" />
                                                    </div>
                                                    <div className="ti-modal-footer">
                                                        <button type="button" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-light" data-hs-overlay="#creafoldermodal">
                                                            <i className="ri-close-fill"></i>
                                                        </button>
                                                        <Link scroll={false} className="ti-btn  btn-wave ti-btn-success" href="#!">
                                                            Create
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-sm btn-wave ti-btn-outline-secondary !m-0" data-hs-overlay="#creafilemodal">
                                            <i className="ri-add-circle-line align-middle"></i> Create File
                                        </button>
                                        <div id="creafilemodal" className="hs-overlay hidden ti-modal">
                                            <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                                <div className="ti-modal-content">
                                                    <div className="ti-modal-header">
                                                        <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel2">Create File
                                                        </h6>
                                                        <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#creafilemodal">
                                                            <span className="sr-only">Close</span>
                                                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="ti-modal-body">
                                                        <label htmlFor="create-folder1" className="ti-form-label">File Name</label>
                                                        <input type="text" className="form-control" id="create-folder1" placeholder="Folder Name" />
                                                    </div>
                                                    <div className="ti-modal-footer">
                                                        <button type="button" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-light" data-hs-overlay="#creafilemodal">
                                                            <i className="ri-close-fill"></i>
                                                        </button>
                                                        <Link scroll={false} className="ti-btn  btn-wave ti-btn-success" href="#!">
                                                            Create
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 file-folders-container">
                                    <div className="flex mb-3 items-center justify-between">
                                        <p className="mb-0 font-medium text-[0.875rem]">Quick Access</p>
                                        <Link scroll={false} href="#!"
                                            className="text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium"> View All<i
                                                className="ti ti-arrow-narrow-right ms-1"></i> </Link>
                                    </div>
                                    <div className="grid grid-cols-12 sm:gap-x-6 mb-4">
                                        {QuickAccess.map((idx) => (
                                            <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12" key={idx.id}>
                                                <div className="box !shadow-none">
                                                    <div className="box-body">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`main-card-icon ${idx.cardIconBg}`}>
                                                                <div className={`avatar avatar-lg bg-${idx.iconBg}/[0.15] border ${idx.iconBorder}`}>
                                                                    <div className="avatar avatar-sm svg-white">
                                                                        {idx.icon}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <Link scroll={false} href="#!" className="block font-medium">{idx.type}</Link>
                                                                <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">{idx.used} Used</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <span className="block text-[0.75rem] font-medium">{idx.size}</span>
                                                                <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">{idx.files} files</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex mb-4 items-center justify-between">
                                        <p className="mb-0 font-medium text-[0.875rem]">Folders</p>
                                        <Link scroll={false} href="#!" className="text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium"> View All
                                            <i className="ti ti-arrow-narrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-12 sm:gap-x-6 mb-4">
                                        {Folders.map((idx) => (
                                            <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12" key={idx.id}>
                                                <div className="box !shadow-none">
                                                    <div className="box-body">
                                                        <div className="mb-4 folder-svg-container flex flex-wrap justify-between items-top">
                                                            <div className="svg-warning text-warning">
                                                                <svg className="!fill-warning !text-warning"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 256 256">
                                                                    <rect width="256" height="256" fill="none" />
                                                                    <path
                                                                        d="M69.77,112H208V88a8,8,0,0,0-8-8H130.67a8,8,0,0,1-4.8-1.6L98.13,57.6a8,8,0,0,0-4.8-1.6H40a8,8,0,0,0-8,8V208l30.18-90.53A8,8,0,0,1,69.77,112Z"
                                                                        opacity="0.2" />
                                                                    <path
                                                                        d="M32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6l27.74,20.8a8,8,0,0,0,4.8,1.6H200a8,8,0,0,1,8,8v24"
                                                                        fill="none" stroke="currentColor"
                                                                        strokeLinecap="round" strokeLinejoin="round"
                                                                        strokeWidth="16" />
                                                                    <path
                                                                        d="M32,208l30.18-90.53A8,8,0,0,1,69.77,112H232a8,8,0,0,1,7.59,10.53L211.09,208Z"
                                                                        fill="none" stroke="currentColor"
                                                                        strokeLinecap="round" strokeLinejoin="round"
                                                                        strokeWidth="16" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="ti-dropdown hs-dropdown">
                                                                    <Link scroll={false} href="#!" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i className="ri-more-2-fill font-semibold text-textmuted dark:text-textmuted/50"></i>
                                                                    </Link>
                                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Delete</Link> </li>
                                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Rename</Link></li>
                                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">HideFolder</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-[0.875rem] font-medium mb-1 leading-none">
                                                            <Link scroll={false} href="#!">{idx.type}</Link>
                                                        </p>
                                                        <div className="flex items-center justify-between flex-wrap">
                                                            <div>
                                                                <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                                                                    {idx.files} Files
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="text-default font-medium">
                                                                    {idx.size}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex mb-4 items-center justify-between">
                                        <p className="mb-0 font-medium text-[0.875rem]">Recent Files</p>
                                        <Link scroll={false} href="#!" className="text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium"> View All
                                            <i className="ti ti-arrow-narrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-12 sm:gap-x-6">
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="table-responsive border  border-defaultborder dark:border-defaultborder/10 me-3">
                                                <Spktables tableClass="ti-custom-table ti-custom-table-hover ti-custom-table-head w-full" footchildren={footertext} header={[{ title: 'File Name' }, { title: 'Category' }, { title: 'Size', }, { title: 'Date Modified', }, { title: 'Action' }]}>
                                                    {files.map((idx) => (
                                                        <tr key={idx.id} className={idx.trClass}>
                                                            <th scope="row">
                                                                <div className="flex items-center">
                                                                    <div className="me-0">
                                                                        <span className={`avatar avatar-md svg-primary text-${idx.color}`}>
                                                                            {idx.icon}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <Link scroll={false} href="#!" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" >{idx.fileName}</Link>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td>{idx.fileType}</td>
                                                            <td>{idx.fileSize}</td>
                                                            <td>{idx.uploadDate}</td>
                                                            <td>
                                                                <div className="">
                                                                    <Link scroll={false} href="#!" className="ti-btn btn-icon ti-btn-sm ti-btn-soft-info !m-0 !me-1">
                                                                        <i className="ri-eye-line"></i>
                                                                    </Link>
                                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-danger !m-0">
                                                                        <i className="ri-delete-bin-line"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </Spktables>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    );
};

export default FileManager;