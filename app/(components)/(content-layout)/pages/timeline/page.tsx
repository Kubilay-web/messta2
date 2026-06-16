"use client"
import { Timeline2, Timeline3 } from "@/shared/data/pages/timelinedata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Timeline = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Timeline" />
            <Pageheader Heading="Timeline" breadcrumbs={['Pages']} currentpage="Timeline" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6 mb-[3rem]">
                <div className="xl:col-span-12 col-span-12">
                    <h6>TIMELINE 1</h6>
                    <div className="timeline">
                        <div className="container">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="lg:col-span-12 col-span-12">
                                    <div className="timeline-container">
                                        <div className="timeline-end">
                                            <span
                                                className="avatar avatar-lg avatar-rounded bg-primary/[0.15] text-primary backdrop-blur text-center border border-primary/10">
                                                <span className="text-[0.8125rem]">2024</span>
                                            </span>
                                        </div>
                                        <div className="timeline-continue">
                                            <div className="grid grid-cols-12 gap-x-6 timeline-right">
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        21 Nov 2024
                                                    </p>
                                                    <span
                                                        className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block">
                                                        12:37PM
                                                    </span>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box">
                                                        <p className="mb-2">
                                                            <b>You</b> Commented on <b>alexander taylor</b> post <Link scroll={false} className="text-secondary" href="#!"><u>#beautiful day</u></Link>.
                                                        </p>
                                                        <p className="profile-activity-media flex mb-0">
                                                            <Link scroll={false} href="#!"> <Image fill src="../../assets/images/media/media-17.jpg" alt="" /> </Link>
                                                            <Link scroll={false} href="#!"> <Image fill src="../../assets/images/media/media-18.jpg" alt="" /></Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6 timeline-left">
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box ms-md-auto">
                                                        <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                            <span className="text-default"><b>Json Smith</b> reacted to
                                                                the post &#128077;</span>.
                                                        </p>
                                                        <p className="text-textmuted dark:text-textmuted/50 mb-0">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                            Repudiandae, repellendus rem rerum excepturi aperiam
                                                            ipsam temporibus inventore ullam tempora eligendi libero
                                                            sequi dignissimos cumque, et a sint tenetur consequatur
                                                            omnis!
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        30 Nov 2024
                                                    </p>
                                                    <span className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block text-start">
                                                        10:15AM
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <div className="timeline-year">
                                                        <span className="avatar avatar-lg avatar-rounded bg-success/[0.15] text-success backdrop-blur text-center border border-success/10">
                                                            <span className="text-[0.8125rem]">2024</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6 timeline-right">
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        01 Jan 2024
                                                    </p>
                                                    <span
                                                        className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block">
                                                        17:25PM
                                                    </span>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box">
                                                        <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                            <span className="text-default"><b>Alicia Keys</b> shared a
                                                                document with <b>you</b></span>.
                                                        </p>
                                                        <p className="profile-activity-media mb-0">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/file-manager/3.png" alt="" />
                                                            </Link>
                                                            <span className="fs-11 text-textmuted dark:text-textmuted/50">432.87KB</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6 timeline-left">
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box ms-md-auto">
                                                        <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                            <span className="text-default"><b>You</b> shared a post with
                                                                4 people</span>.
                                                        </p>
                                                        <p className="profile-activity-media mb-2">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-75.jpg" alt="" />
                                                            </Link>
                                                        </p>
                                                        <div>
                                                            <div className="avatar-list-stacked">
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <Image fill src="../../assets/images/faces/10.jpg" alt="img" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        19 Dec 2024
                                                    </p>
                                                    <span
                                                        className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block text-start">
                                                        11:55AM
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <div className="timeline-year">
                                                        <span className="avatar avatar-lg avatar-rounded bg-danger/[0.15] text-danger backdrop-blur text-center border border-danger/10">
                                                            <span className="text-[0.8125rem]"> 2024</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6 timeline-right">
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        25 Nov 2024
                                                    </p>
                                                    <span className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block">
                                                        07:45AM
                                                    </span>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box">
                                                        <p className="text-textmuted dark:text-textmuted/50 mb-1">
                                                            <span className="text-default"><b>Melissa Blue</b> liked
                                                                your post <b>travel excites</b></span>.<span
                                                                    className="float-end fs-11 text-textmuted dark:text-textmuted/50">11,Dec 2022 -
                                                                11:18
                                                            </span>
                                                        </p>
                                                        <p className="text-textmuted dark:text-textmuted/50">you are already feeling the tense
                                                            atmosphere of the video playing in the background</p>
                                                        <p className="profile-activity-media flex gap-2 mb-0">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-59.jpg" className="m-1" alt="" />
                                                            </Link>
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-60.jpg" className="m-1" alt="" />
                                                            </Link>
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-61.jpg" className="m-1" alt="" />
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-x-6 timeline-left">
                                                <div className="md:col-span-6 col-span-12">
                                                    <div className="timeline-box ms-md-auto">
                                                        <p className="mb-1">
                                                            <b>You</b> Commented on <b>Peter Engola</b> post <Link
                                                                className="text-secondary"
                                                                href="#!"><u>#Mother Nature</u></Link>.<span className="float-end fs-11 text-textmuted dark:text-textmuted/50">24,Dec 2022 -
                                                                    14:34</span>
                                                        </p>
                                                        <p className="text-textmuted dark:text-textmuted/50">Technology id developing rapidly kepp uo your work &#128076;</p>
                                                        <p className="profile-activity-media flex mb-0">
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-26.jpg" alt="" />
                                                            </Link>
                                                            <Link scroll={false} href="#!">
                                                                <Image fill src="../../assets/images/media/media-29.jpg" alt="" />
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-6 col-span-12">
                                                    <p className="timeline-date">
                                                        16 Dec 2024
                                                    </p>
                                                    <span
                                                        className="timeline-time text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium block text-start">
                                                        15:56PM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="timeline-start">
                                            <span
                                                className="avatar avatar-lg avatar-rounded bg-warning/[0.15] text-warning backdrop-blur text-center border border-warning/10">
                                                <span className="text-[0.8125rem]">2024</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">TIMELINE 2</div>
                        </div>
                        <div className="box-body">
                            <div className="timeline-steps">
                                {Timeline2.map((idx) => (
                                    <div className="timeline-step" key={idx.id}>
                                        <div className="timeline-content" data-toggle="popover" data-placement="top" title=""
                                            data-content="And here's some amazing content. It's very engaging. Right?"
                                            data-original-title={idx.originalTitle}>
                                            <div className="inner-circle"></div>
                                            <p className="font-medium mt-3 mb-1">{idx.time}</p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-0 mb-lg-0">{idx.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <h6>TIMELINE 3</h6>
                    <ul className="notification">
                        {Timeline3.map((idx) => (
                            <li key={idx.id}>
                                <div className="notification-time">
                                    <span className="date">{idx.date}</span>
                                    <span className="time">{idx.time}</span>
                                </div>
                                <div className="notification-icon">
                                    <Link scroll={false} href="#!"></Link>
                                </div>
                                <div className="notification-body">
                                    <div className="flex items-start gap-4 flex-wrap">
                                        <div>
                                            <span className="avatar avatar-lg online">
                                                <Image fill src={idx.src} alt="" />
                                            </span>
                                        </div>
                                        <div className="flex-grow w-[50%]">
                                            <h5 className="mb-1 text-[0.9375rem] font-medium text-dark">{idx.title}</h5>
                                            <p className="mb-0  text-textmuted dark:text-textmuted/50">{idx.description}</p>
                                        </div>
                                        <div>
                                            <span className="badge bg-light text-default">{idx.badge} </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mb-4">
                        <button type="button" className="ti-btn bg-info/10 text-info ti-btn-loader m-2">
                            <span className="me-2">Loading</span>
                            <span className="loading"><i className="ri-loader-4-line text-[1rem] animate-spin"></i></span>
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}
        </Fragment>
    );
};

export default Timeline;