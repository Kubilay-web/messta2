"use client"
import SunEditorComponent from "@/shared/@spk-reusable-components/spk-packages/editor-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import { Mailappdata, Maildata, people } from "@/shared/data/pages/email/mail-app-data";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const MailApp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleVisibility = () => {
        if (isMobile) {
            setIsVisible((prev) => !prev);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        handleResize();

        window.addEventListener('resize', handleResize);


        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Fragment>
            <div className="container-fluid">

                {/* <!-- Page Header --> */}
                <Seo title="Mail App" />
                <Pageheader Heading="Mail App" breadcrumbs={['Pages', '  Email']} currentpage="Mail App" />
                {/* <!-- Page Header Close --> */}

                <div className="main-mail-container mb-2 gap-2 flex">
                    <div className="mail-navigation border  border-defaultborder dark:border-defaultborder/10" onClick={toggleVisibility} style={{ display: isMobile ? (isVisible ? 'block' : 'none') : 'block', }} >
                        <div className="grid items-top p-3 border-b  border-defaultborder dark:border-defaultborder/10">
                            <Link scroll={false} href="#!" className="hs-dropdown-toggle ti-btn !bg-success btn-wave text-white flex items-center justify-center !font-medium" data-hs-overlay="#todo-compose"><i className="ri-add-circle-line text-[1rem] align-middle"></i>Compose Mail</Link>

                        </div>
                        <div className="flex gap-3 items-center p-3 bg-light">
                            <div>
                                <span className="avatar avatar-md online avatar-rounded">
                                    <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                </span>
                            </div>
                            <div>
                                <p className="font-medium mb-0">Jack</p>
                                <p className="text-[0.8125rem] mb-0">jack1992@gmail.com</p>
                            </div>
                        </div>
                        <SimpleBar>
                            <ul className="list-unstyled mail-main-nav" id="mail-main-nav">
                                <li className="px-0 pt-0">
                                    <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">MAILS</span>
                                </li>
                                <li className="active mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-inbox-archive-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                All Mails
                                            </span>
                                            <span className="badge bg-primary rounded-full text-white">6,446</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-inbox-archive-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Inbox
                                            </span>
                                            <span className="badge bg-secondary rounded-full text-white">26</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-send-plane-2-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Sent
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-draft-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Drafts
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-spam-2-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Spam
                                            </span>
                                            <span className="badge bg-danger rounded-full text-white">6</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-bookmark-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Important
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-delete-bin-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Trash
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-archive-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Archive
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mail-type">
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-star-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Starred
                                            </span>
                                            <span className="badge bg-warning rounded-full text-white">16</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="px-0">
                                    <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">SETTINGS</span>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-settings-3-line align-middle text-[0.875rem]"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Settings
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="px-0">
                                    <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">LABELS</span>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-circle-fill align-middle text-[0.625rem] font-medium text-secondary"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Mail
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-circle-fill align-middle text-[0.625rem] font-medium text-danger"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Home
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-circle-fill align-middle text-[0.625rem] font-medium text-success"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Work
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-center">
                                            <span className="me-2 leading-none">
                                                <i className="ri-circle-fill align-middle text-[0.625rem] font-medium text-dark"></i>
                                            </span>
                                            <span className="flex-grow text-nowrap">
                                                Friends
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="px-0">
                                    <span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 opacity-70 font-medium">ONLINE USERS</span>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-top leading-none">
                                            <div className="me-2">
                                                <span className="avatar avatar-sm online avatar-rounded">
                                                    <Image fill src="../../../assets/images/faces/4.jpg" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-default font-medium mb-1">Angelica</p>
                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Hello this is angelica.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!">
                                        <div className="flex items-top leading-none">
                                            <div className="me-2">
                                                <span className="avatar avatar-sm online avatar-rounded">
                                                    <Image fill src="../../../assets/images/faces/6.jpg" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-default font-medium mb-1">Rexha</p>
                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Thanks for sharing file &#128512;.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </SimpleBar>
                    </div>
                    <div className="total-mails border  border-defaultborder dark:border-defaultborder/10" style={{ display: isMobile ? (isVisible ? 'none' : 'block') : 'block', }}>
                        <div className="p-4 flex items-center border-b  border-defaultborder dark:border-defaultborder/10 flex-wrap gap-2">
                            <div className="me-3 ms-1">
                                <input className="form-check-input" type="checkbox" id="checkAll" aria-label="..." />
                            </div>
                            <div className="flex-grow">
                                <h6 className="font-medium mb-0">All Mails</h6>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="input-group">
                                    <input type="text" className="form-control shadow-none !border-s" placeholder="Search Email" aria-describedby="button-addon" />
                                    <button className="ti-btn ti-btn-primary !m-0" type="button" id="button-addon"><i className="ri-search-line"></i></button>
                                </div>
                                <button className="ti-btn ti-btn-icon ti-btn-light !m-0 lg:hidden block total-mails-close" onClick={toggleVisibility}>
                                    <i className="ri-close-line"></i>
                                </button>
                                <div className="ti-dropdown hs-dropdown">
                                    <button className="ti-btn ti-btn-icon !m-0 ti-btn-soft-primary btn-wave" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Recent</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Unread</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Mark All Read</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Spam</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Delete All</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <SimpleBar className="mail-messages" id="mail-messages">
                            <ul className="list-unstyled mb-0 mail-messages-container">
                                {Mailappdata.map((idx) => (
                                    <li key={idx.id} className={idx.liClass}>
                                        <div className="sm:flex items-top flex-wrap">
                                            <div className="me-3 mt-1">
                                                <input className="form-check-input" type="checkbox" id="checkboxNoLabel1" aria-label="..." defaultChecked={idx.checked} />
                                            </div>
                                            <div className="me-1 leading-none">
                                                {idx.src ? (
                                                    <span className="avatar avatar-md me-2 avatar-rounded mail-msg-avatar">
                                                        <Image fill src={idx.src} alt="" />
                                                    </span>
                                                ) : (
                                                    <span className={`avatar avatar-md me-2 avatar-rounded text-white bg-${idx.bg} mail-msg-avatar`}>
                                                        {idx.text}
                                                    </span>
                                                )}

                                            </div>
                                            <div className="flex-grow">
                                                <Link scroll={false} href="#!" data-hs-overlay="#hs-overlay-mailexample">
                                                    <p className="mb-1 text-[0.75rem] font-medium">
                                                        {idx.name}
                                                        {idx.badge && (

                                                            <span className={`badge bg-${idx.badgeColor} text-white ms-2`}>{idx.badge}</span>
                                                        )}
                                                        <span className="float-end text-textmuted dark:text-textmuted/50 font-normal text-[0.6875rem]">
                                                            <span className="me-2"><i className={`ri-${idx.icon} align-middle text-[0.75rem]`}></i></span>{idx.time}
                                                        </span>
                                                    </p>
                                                </Link>
                                                <div className="mail-msg mb-0">
                                                    <span className="block mb-0 font-medium truncate w-[75%]">{idx.label}</span>
                                                    <div className="text-[0.75rem] text-textmuted dark:text-textmuted/50 text-wrap truncate mail-msg-content">{idx.content}
                                                        {idx.starred ? (<button className="btn p-0 leading-none mail-starred true border-0 float-end">
                                                            <i className="ri-star-fill text-[0.875rem]"></i>
                                                        </button>) : (
                                                            <button className="btn p-0 leading-none mail-starred border-0 float-end">
                                                                <i className="ri-star-fill text-[0.875rem]"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SimpleBar>
                    </div>
                    <div className="mail-recepients border  border-defaultborder dark:border-defaultborder/10">
                        <div className="p-4 border-b  dark:border-defaultborder/10">
                            <div className="hs-tooltip ti-main-tooltip">
                                <button aria-label="anchor" type="button" className="hs-tooltip-toggle ti-btn ti-btn-light ti-btn-icon !rounded-full" ><i className="ri-add-line"></i>
                                    <span
                                        className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                        role="tooltip">
                                        Add Recepient
                                    </span>
                                </button>
                            </div>
                        </div>
                        <SimpleBar className="p-4 flex flex-column items-center total-mail-recepients" id="mail-recepients">
                            {people.map((person, index) => (
                                <div key={index} className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!" className="mail-recepeint-person hs-tooltip-toggle">
                                        <span className={`avatar ${person.status} avatar-rounded`}>
                                            <Image fill src={person.avatar} alt={person.name} />
                                        </span>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip"
                                        >
                                            {person.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}

                        </SimpleBar>
                    </div>
                </div>

            </div>

            {/* <!-- Start::composemail modal --> */}
            <div id="todo-compose" className="hs-overlay hidden ti-modal">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
                    <div className="ti-modal-content">
                        <div className="ti-modal-header">
                            <h6 className="modal-title text-[1rem] font-semibold text-defaulttextcolor" id="mail-ComposeLabel">Compose Mail</h6>
                            <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70" data-hs-overlay="#todo-compose">
                                <span className="sr-only">Close</span>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="ti-modal-body px-4">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xl:col-span-6 col-span-12 mb-2">
                                    <label htmlFor="fromMail" className="ti-form-label">From<sup className="top-[0.5em] rtl:top-[-0.5rem]"><i className="ri-star-s-fill text-success text-[0.5rem]"></i></sup></label>
                                    <input type="email" className="form-control" id="fromMail" defaultValue="jsontaylor2345@gmail.com" />
                                </div>
                                <div className="xl:col-span-6 col-span-12 mb-2">
                                    <label htmlFor="toMail" className="ti-form-label">To<sup className="top-[0.5em] rtl:top-[-0.5rem]"><i className="ri-star-s-fill text-success text-[0.5rem]"></i></sup></label>
                                    <SpkSelect multi option={Maildata} mainClass="basic-multi-select" name="toMail" id="toMail"
                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Maildata[0]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12 mb-2">
                                    <label htmlFor="mailCC" className="ti-form-label text-dark font-semibold">Cc</label>
                                    <input type="email" className="form-control" id="mailCC" />
                                </div>
                                <div className="xl:col-span-6 col-span-12 mb-2">
                                    <label htmlFor="mailBcc" className="ti-form-label text-dark font-semibold">Bcc</label>
                                    <input type="email" className="form-control" id="mailBcc" />
                                </div>
                                <div className="xl:col-span-12 col-span-12 mb-2">
                                    <label htmlFor="Subject" className="ti-form-label">Subject</label>
                                    <input type="text" className="form-control" id="Subject" placeholder="Subject" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label className="col-ti-form-label">Content :</label>
                                    <div className="mail-compose">
                                        <div id="mail-compose-editor">
                                            <SunEditorComponent setoptions={{
                                                buttonList: [
                                                    ["undo", "redo"],
                                                    ["font", "fontSize"],
                                                    [
                                                        "bold",
                                                        "underline",
                                                        "italic",
                                                        "strike",
                                                        "subscript",
                                                        "superscript"
                                                    ],
                                                    ["fontColor", "hiliteColor"],
                                                    ["align", "list", "lineHeight"],
                                                    ["outdent", "indent"],
                                                    ["table", "link", "image", "video"],
                                                    ["preview", "print"],
                                                    ["removeFormat"]
                                                ],
                                                defaultTag: "div",
                                                minHeight: "200px",
                                                showPathLabel: false,
                                                font: ["Arial", "Comic Sans MS", "Courier New", "Impact"],
                                                defaultStyle: 'font-family: Arial; font-size: 16px;',
                                            }} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ti-modal-footer">
                            <button type="button"
                                className="hs-dropdown-toggle ti-btn  ti-btn-secondary align-middle"
                                data-hs-overlay="#todo-compose">
                                Close
                            </button>
                            <button type="button" className="ti-btn bg-primary text-white !font-medium">Send</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::composemail modal --> */}

            {/*<!-- Start::mail information offcanvas -->*/}
            <div id="hs-overlay-mailexample" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right !max-w-[50rem] !z-[105]" tabIndex={-1}  >
                <div className="ti-offcanvas-body p-0 !pb-[3rem]">
                    <div className="mails-information">
                        <div className="mail-info-header flex flex-wrap gap-2 items-center">
                            <div className="me-1">
                                <span className="avatar avatar-md me-2 avatar-rounded mail-msg-avatar">
                                    <Image fill src="../../../assets/images/faces/12.jpg" alt="" />
                                </span>
                            </div>
                            <div className="flex-grow">
                                <h6 className="mb-0 font-medium">Benjamin</h6>
                                <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">benjamin2194@gmail.com</span>
                            </div>
                            <div className="mail-action-icons">
                                <div className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!;" className="ti-btn ti-btn-icon ti-btn-outline-light !border hs-tooltip-toggle">
                                        <i className="ri-star-line"></i>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            Starred
                                        </span>
                                    </Link>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!;" className="ti-btn ti-btn-icon ti-btn-outline-light !border hs-tooltip-toggle">
                                        <i className="ri-inbox-archive-line"></i>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            Archive
                                        </span>
                                    </Link>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!;" className="ti-btn ti-btn-icon ti-btn-outline-light !border hs-tooltip-toggle">
                                        <i className="ri-spam-2-line"></i>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            Report spam
                                        </span>
                                    </Link>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!;" className="ti-btn ti-btn-icon ti-btn-outline-light !border hs-tooltip-toggle">
                                        <i className="ri-delete-bin-line"></i>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            Delete
                                        </span>
                                    </Link>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip [--placement:left]">
                                    <Link scroll={false} href="#!;" className="ti-btn ti-btn-icon ti-btn-outline-light !border hs-tooltip-toggle">
                                        <i className="ri-reply-line"></i>
                                        <span
                                            className="hs-tooltip-content ti-main-tooltip-content !py-[0.2rem] px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            Reply
                                        </span>
                                    </Link>
                                </div>
                                <button type="button" className="btn-close ti-btn ti-btn-icon ti-btn-outline-light !border" aria-label="Close" data-hs-overlay="#hs-overlay-mailexample">
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="responsive-mail-action-icons">
                                <div className="ti-dropdown hs-dropdown">
                                    <button className="ti-btn ti-btn-icon ti-btn-light btn-wave waves-light waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!;"><i className="ri-star-line me-1 align-middle inline-block"></i>Starred</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!;"><i className="ri-inbox-archive-line me-1 align-middle inline-block"></i>Archive</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!;"><i className="ri-spam-2-line me-1 align-middle inline-block"></i>Report Spam</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!;"><i className="ri-delete-bin-line me-1 align-middle inline-block"></i>Delete</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!;"><i className="ri-reply-line me-1 align-middle inline-block"></i>Reply</Link></li>
                                    </ul>
                                </div>
                                <button className="ti-btn ti-btn-icon ti-btn-light ms-1 close-button" data-hs-overlay="#hs-overlay-mailexample">
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        </div>
                        <div className="mail-info-body pt-6 px-6 pb-20 sm:pb-6" id="mail-info-body">
                            <div className="sm:flex block items-center justify-between mb-4">
                                <div>
                                    <p className="text-[1.25rem] font-medium mb-0">Strategic Insights Webinar: Navigating Future Trends.</p>
                                </div>
                                <div className="float-end">
                                    <span className="me-2 text-[0.75rem] text-textmuted dark:text-textmuted/50">Oct-22-2024,03:05PM</span>
                                </div>
                            </div>
                            <div className="main-mail-content mb-4">
                                <p className="text-[0.875rem] font-medium mb-4">Greetings Mr Jack &#128400;,</p>
                                <p className="mb-2 text-textmuted dark:text-textmuted/50">We're excited to invite you to our upcoming webinar, "Navigating Future Trends," where industry experts will share strategic insights to help you stay ahead in an ever-evolving landscape. Join us on [Date] at [Time] for an engaging session that promises to provide actionable knowledge and valuable perspectives.</p>
                                <span className="block text-textmuted dark:text-textmuted/50 font-meidum">Key Highlights :</span>
                                <ul className="text-textmuted dark:text-textmuted/50 my-4 ps-8 list-disc">
                                    <li className="mb-2">Expert analysis of emerging trends</li>
                                    <li className="mb-2">Practical strategies for staying competitive</li>
                                    <li className="mb-2">Q&A session for personalized insights</li>
                                </ul>
                                <p className="mb-2 text-textmuted dark:text-textmuted/50">Earth has a diameter of roughly 8,000 miles (13,000 kilometers) and is mostly round because gravity generally pulls matter into a ball. But the spin of our home planet causes it to be squashed at its poles and swollen at the equator, making the true shape of the Earth an "oblate spheroid.".</p>
                                <p className="mb-0 mt-4">
                                    <span className="block">Best Regards,</span>
                                    <span className="block">Benjamin</span>
                                </p>
                            </div>
                            <div className="mail-attachments mb-6">
                                <div className="flex justify-between items-center">
                                    <div className="mb-0">
                                        <span className="text-[0.875rem] font-medium"><i className="ri-attachment-2 me-1 align-middle"></i>Attachments (1.8mb):</span>
                                    </div>
                                    <div className="btn-list">
                                        <button className="ti-btn ti-btn-sm ti-btn-soft-warning">View All</button>
                                        <button className="ti-btn ti-btn-sm ti-btn-soft-success">Download All</button>
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-3">
                                    <Link scroll={false} href="#!">
                                        <span className="avatar avatar-xl shadow-sm">
                                            <Image fill src="../../../assets/images/media/media-74.jpg" alt="" />
                                        </span>
                                    </Link>
                                    <Link scroll={false} href="#!">
                                        <span className="avatar avatar-xl shadow-sm">
                                            <Image fill src="../../../assets/images/media/media-75.jpg" alt="" />
                                        </span>
                                    </Link>
                                    <Link scroll={false} href="#!">
                                        <span className="avatar avatar-xl shadow-sm">
                                            <Image fill src="../../../assets/images/media/media-76.jpg" alt="" />
                                        </span>
                                    </Link>
                                    <Link scroll={false} href="#!">
                                        <span className="avatar avatar-xl shadow-sm">
                                            <Image fill src="../../../assets/images/media/media-77.jpg" alt="" />
                                        </span>
                                    </Link>
                                    <Link scroll={false} href="#!">
                                        <span className="avatar avatar-xl bg-primary/[0.15] text-primary">
                                            15+
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="text-[0.875rem] font-medium"><i className="ri-reply-all-line me-1 align-middle inline-block"></i>Reply:</span>
                            </div>
                            <div className="mail-reply">
                                <div id="mail-reply-editor">
                                    <SunEditorComponent setoptions={{
                                        buttonList: [
                                            ["undo", "redo"],
                                            ["font", "fontSize"],
                                            [
                                                "bold",
                                                "underline",
                                                "italic",
                                                "strike",
                                                "subscript",
                                                "superscript"
                                            ],
                                            ["fontColor", "hiliteColor"],
                                            ["align", "list", "lineHeight"],
                                            ["outdent", "indent"],
                                            ["table", "link", "image", "video"],
                                            ["preview", "print"],
                                            ["removeFormat"]
                                        ],
                                        defaultTag: "div",
                                        minHeight: "300px",
                                        showPathLabel: false,
                                        font: ["Arial", "Comic Sans MS", "Courier New", "Impact"],
                                        defaultStyle: 'font-family: Arial; font-size: 16px;',
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="mail-info-footer ti-offcanvas-footer flex flex-wrap gap-2 items-center justify-between">
                            <div>
                                <button className="ti-btn ti-btn-icon ti-btn-soft-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Print">
                                    <i className="ri-printer-line"></i>
                                </button>
                                <button className="ti-btn ti-btn-icon ti-btn-soft-secondary ms-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mark as read">
                                    <i className="ri-mail-open-line"></i>
                                </button>
                                <button className="ti-btn ti-btn-icon ti-btn-soft-success ms-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reload">
                                    <i className="ri-refresh-line"></i>
                                </button>
                            </div>
                            <div>
                                <button className="ti-btn ti-btn-secondary">
                                    <i className="ri-share-forward-line me-1 inline-block align-middle"></i>Forward
                                </button>
                                <button className="ti-btn ti-btn-danger ms-1">
                                    <i className="ri-reply-all-line me-1 inline-block align-middle"></i>Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- End::mail information offcanvas -->*/}

        </Fragment>
    );
};

export default MailApp;