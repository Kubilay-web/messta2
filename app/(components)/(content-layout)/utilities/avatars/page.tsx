"use client"
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import * as utilitiesPrism from "@/shared/data/prism/utilities-prism";
import { Avataricon, Avatarinitial, Avatarnumber, Avataroffline, Avataronline, Avatarsize, Avatarstack } from "@/shared/data/utilities/avatarsdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface AvatarsProps { }

const Avatars: FC<AvatarsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Avatars" />
            <Pageheader Heading="Avatars" breadcrumbs={['Utilities']} currentpage="Avatars" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatars" reactCode={utilitiesPrism.avatar1} customCardBodyClass="py-4">
                        <span className="avatar me-2 avatar-radius-0">
                            <Image fill src="../../assets/images/faces/1.jpg" alt="img" />
                        </span>
                        <span className="avatar me-2">
                            <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                        </span>
                        <span className="avatar me-2 avatar-rounded">
                            <Image fill src="../../assets/images/faces/3.jpg" alt="img" />
                        </span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 col-sm-12 col-span-12">
                    <Showcode title="Avatar Sizes <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'>
                                    Avatars of different sizes  </p>" reactCode={utilitiesPrism.avatar3} dataCode={utilitiesPrism.avatardata3} >
                        {Avatarsize.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2`} key={idx.id}>
                                <Image fill src={idx.src} alt="img" />
                            </span>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 col-sm-12 col-span-12">
                    <Showcode title="Avatar With Icons <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'> Avatar contains icons to perform respective action.</p>"
                        reactCode={utilitiesPrism.avatar2} dataCode={utilitiesPrism.avatardata2} >
                        {Avataricon.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 avatar-rounded`} key={idx.id}>
                                <Image fill src={idx.src} alt="img" />
                                <Link aria-label="anchor" scroll={false} href="#!" className={`badge bg-${idx.color} rounded-full text-white avatar-badge`}><i className={`fe fe-${idx.icon} text-[.5rem]`}></i></Link>
                            </span>
                        ))}
                    </Showcode>
                </div>

                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 col-sm-12 col-span-12">
                    <Showcode title="Avatar With Online Status Indicators <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'>  avatars having online status indicator. </p>"
                        reactCode={utilitiesPrism.avatar4} dataCode={utilitiesPrism.avatardata4} >
                        {Avataronline.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 online avatar-rounded`} key={idx.id}>
                                <Image fill src={idx.src} alt="img" />
                            </span>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 col-sm-12 col-span-12">
                    <Showcode title=" Avatar With Ofline Status Indicators <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'> avatars having a offline status indicator. </p>"
                        reactCode={utilitiesPrism.avatar5} dataCode={utilitiesPrism.avatardata5} >
                        {Avataroffline.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 offline avatar-rounded`} key={idx.id}>
                                <Image fill src={idx.src} alt="img" />
                            </span>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 col-sm-12 col-span-12">
                    <Showcode title=" Avatars With Number Badges <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'>Avatar numbers indicates the no. of unread notififactions/messages.</p>"
                        reactCode={utilitiesPrism.avatar6} dataCode={utilitiesPrism.avatardata6} >
                        {Avatarnumber.map((idx) => (
                            <span className={`avatar avatar-${idx.class} me-2 avatar-rounded`} key={idx.id}>
                                <Image fill src={idx.src} alt="img" />
                                <SpkBadge variant={idx.color} customClass={`rounded-full text-white avatar-badge`}>{idx.number}</SpkBadge>
                            </span>
                        ))}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/*<!-- Start::row-2 -->*/}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatar With Brand Logos " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <div className="space-x-3 rtl:space-x-reverse">
                            <div className="relative inline-block ">
                                <Image fill className="inline-block avatar avatar-lg" src="../../assets/images/faces/2.jpg"
                                    alt="img" />
                                <span
                                    className="absolute bottom-[-7px] end-[-15px] block p-1 rounded-full bg-white dark:bg-slate-900 dark:ring-slate-900">
                                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        id="TailwindCss">
                                        <path
                                            d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a4.72 4.72 0 0 0-5 4 3.23 3.23 0 0 1 3.5-1.49 4.32 4.32 0 0 1 1.91 1.35A5.77 5.77 0 0 0 17 12a4.72 4.72 0 0 0 5-4 3.2 3.2 0 0 1-3.5 1.51zm-13 4.98a4.22 4.22 0 0 1 1.91 1.34A5.77 5.77 0 0 0 12 18a4.72 4.72 0 0 0 5-4 3.23 3.23 0 0 1-3.5 1.49 4.32 4.32 0 0 1-1.91-1.35A5.8 5.8 0 0 0 7 12a4.72 4.72 0 0 0-5 4 3.2 3.2 0 0 1 3.5-1.51z"
                                            fill="#87ddfd" className="color000000 svgShape"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="relative inline-block">
                                <Image fill className="inline-block avatar avatar-lg avatar-rounded"
                                    src="../../assets/images/faces/3.jpg" alt="img" />
                                <span
                                    className="absolute bottom-[-7px] end-[-15px] block p-1 rounded-full bg-white dark:bg-slate-900 dark:ring-slate-900">
                                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"
                                        id="slack">
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="#36C5F0"
                                                d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386">
                                            </path>
                                            <path fill="#2EB67D"
                                                d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387">
                                            </path>
                                            <path fill="#ECB22E"
                                                d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386">
                                            </path>
                                            <path fill="#E01E5A"
                                                d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387">
                                            </path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatar With Placeholder Icon " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <span className="avatar avatar-sm  avatar-rounded me-2">
                            <Image fill src="../../assets/images/faces/21.jpg" alt="img" />
                        </span>

                        <span className="avatar avatar-md  avatar-rounded me-2">
                            <Image fill src="../../assets/images/faces/21.jpg" alt="img" />
                        </span>

                        <span className="avatar avatar-lg  avatar-rounded me-2">
                            <Image fill src="../../assets/images/faces/21.jpg" alt="img" />
                        </span>

                        <span className="avatar avatar-xl  avatar-rounded me-2">
                            <Image fill src="../../assets/images/faces/21.jpg" alt="img" />
                        </span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatar with solid color variants " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-primary">YX</span>
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-secondary">YX</span>
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-warning">YX</span>
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-danger">YX</span>
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-success">YX</span>
                        <span className="avatar avatar-md avatar-rounded text-white me-1 bg-info">YX</span>
                        <span className="avatar avatar-md avatar-rounded bg-light text-defaulttextcolor">YX</span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar with soft color variants " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <span className="avatar avatar-md avatar-rounded bg-primary/10 me-1 text-primary/80">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded bg-secondary/10 me-1 text-secondary/80">YX</span>
                        <span className="avatar avatar-md avatar-rounded bg-success/10 me-1 text-success/80">YX</span>
                        <span className="avatar avatar-md avatar-rounded bg-info/10 me-1 text-info/80">YX</span>
                        <span className="avatar avatar-md avatar-rounded bg-danger/10 me-1 text-danger/80">YX</span>
                        <span className="avatar avatar-md avatar-rounded bg-warning/10 me-1 text-warning/80">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded bg-light/50 me-1 text-defaulttextcolor">YX</span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatar with outline color variants" reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <span
                            className="avatar avatar-md avatar-rounded border border-primary/80 me-1 text-primary">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded border border-secondary/80 me-1 text-secondary">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded border border-success/80 me-1 text-success">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded border border-danger/80 me-1 text-danger">YX</span>
                        <span className="avatar avatar-md avatar-rounded border border-info/80 me-1 text-info">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded border border-warning/80 me-1 text-warning">YX</span>
                        <span
                            className="avatar avatar-md avatar-rounded border border-gray-500 dark:text-white me-1 text-defaulttextcolor">YX</span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar with white color variants" reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <span
                            className="avatar avatar-sm avatar-rounded me-2 border border-defaultborder bg-white text-defaulttextcolor dark:bg-bodybg dark:border-white/10 dark:text-white">
                            YX
                        </span>
                        <span
                            className="avatar avatar-md avatar-rounded me-2 border border-defaultborder bg-white text-defaulttextcolor dark:bg-bodybg dark:border-white/10 dark:text-white">
                            YX
                        </span>
                        <span
                            className="avatar avatar-lg avatar-rounded me-2 border border-defaultborder bg-white text-defaulttextcolor dark:bg-bodybg dark:border-white/10 dark:text-white">
                            YX
                        </span>
                        <span
                            className="avatar avatar-xl avatar-rounded me-2 border border-defaultborder bg-white text-defaulttextcolor dark:bg-bodybg dark:border-white/10 dark:text-white">
                            YX
                        </span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatar displaying a tooltip " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <div className="hs-tooltip inline-block">
                            <Link scroll={false} className="hs-tooltip-toggle relative inline-block avatar online avatar-rounded"
                                href="#">
                                <Image fill className="inline-block size-[46px]" src="../../assets/images/faces/4.jpg"
                                    alt="img" />
                                <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-slate-700"
                                    role="tooltip">
                                    Stella is online
                                </div>
                            </Link >
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar with text " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <div className="flex-shrink-0 group block">
                            <div className="flex items-center relative">
                                <Image fill className="avatar avatar-md avatar-rounded"
                                    src="../../assets/images/faces/5.jpg" alt="Image Description" />
                                <div className="ms-3">
                                    <h6 className="">Michael</h6>
                                    <p className="text-sm font-medium">mic@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="  Avatar with border color " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9}>
                        <div className="flex -space-x-2 avatar-color relative">
                            <Image fill className=" avatar avatar-rounded border-2 border-primary" src="../../assets/images/faces/5.jpg" alt="Image Description" />
                            <Image fill className="avatar avatar-rounded border-2 border-primary" src="../../assets/images/faces/6.jpg" alt="Image Description" />
                            <Image fill className="avatar avatar-rounded border-2 border-primary" src="../../assets/images/faces/7.jpg" alt="Image Description" />
                            <Image fill className="avatar avatar-rounded border-2 border-primary" src="../../assets/images/faces/8.jpg" alt="Image Description" />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatar With Initials   <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'>
                            Avatar contains intials when user profile doesn't exist.</p> " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        {Avatarinitial.map((idx) => (
                            <span className={`avatar avatar-${idx.class} text-white m-2 bg-${idx.color}`} key={idx.id}>
                                {idx.data1}
                            </span>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Stacked Avatars <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'> Group of avatars stacked together.</p>"
                        reactCode={utilitiesPrism.avatar7} dataCode={utilitiesPrism.avatardata7} >
                        <div className="avatar-list-stacked">
                            {Avatarstack.map((idx) => (
                                <span className="avatar" key={idx.id}>
                                    <Image fill src={idx.src} alt="img" />
                                </span>
                            ))}
                            <Link className="avatar bg-primary text-white" scroll={false} href="#!" >
                                +8
                            </Link>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Rounded Stacked Avatars <p class='text-textmuted dark:text-textmuted/50 !text-[0.75rem] font-normal !normal-case'> Group of avatars stacked together.</p>" reactCode={utilitiesPrism.avatar8} dataCode={utilitiesPrism.avatardata8} >
                        <div className="avatar-list-stacked">
                            {Avatarstack.map((idx) => (
                                <span className="avatar avatar-rounded" key={idx.id}>
                                    <Image fill src={idx.src} alt="img" />
                                </span>
                            ))}
                            <Link className="avatar bg-primary avatar-rounded text-white" href="#!" scroll={false} >
                                +8
                            </Link>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/*<!-- End::row-2 -->*/}

            {/*<!-- Start::row-2 -->*/}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Stacked avatar with sizes " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <div className="grid gap-10 sm:flex sm:items-end justify-between">
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
                            </div>
                            <div className="avatar-list-stacked">
                                <span className="avatar avatar-md avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-md avatar-rounded">
                                    <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-md avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                            </div>
                            <div className="avatar-list-stacked">
                                <span className="avatar avatar-lg avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-lg avatar-rounded">
                                    <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-lg avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                            </div>
                            <div className="avatar-list-stacked">
                                <span className="avatar avatar-xl avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-xl avatar-rounded">
                                    <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-xl avatar-rounded">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" />
                                </span>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Avatars grid " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <div className="grid gap-10 sm:items-end">
                            <div className="grid xxl:!grid-cols-8 md:!grid-cols-11 sm:grid-cols-7 grid-cols-4 gap-4 avatar-color relative">
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/2.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/4.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/6.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/5.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/7.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/2.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/9.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/1.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/4.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/6.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/5.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/7.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/2.jpg" alt="Image Description" />
                                <Image fill className="avatar avatar-rounded" src="../../assets/images/faces/9.jpg" alt="Image Description" />
                                <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] avatar-rounded bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">9+</span>
                                </span>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Stacked avatar with tooltip " reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <div className="flex -space-x-2 rtl:space-x-reverse">
                            <div className="hs-tooltip inline-block">
                                <Link scroll={false} className="hs-tooltip-toggle relative inline-block avatar-color" href="#!">
                                    <Image fill className="avatar rounded-full" src="../../assets/images/faces/1.jpg" alt="Image Description" />
                                    <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-sm dark:bg-slate-700" role="tooltip" data-popper-placement="top" style={{ position: "fixed", inset: "auto auto 0px 0px", margin: "0px", transform: "translate(1096px, -301px)" }}>
                                        James bond
                                    </div>
                                </Link>
                            </div>
                            <div className="hs-tooltip inline-block show">
                                <Link scroll={false} className="hs-tooltip-toggle relative inline-block avatar-color" href="#!">
                                    <Image fill className="avatar rounded-full" src="../../assets/images/faces/4.jpg" alt="Image Description" />
                                    <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-sm dark:bg-slate-700" role="tooltip" data-popper-placement="top" style={{ position: "fixed", inset: "auto auto 0px 0px", margin: "0px", transform: "translate(1126px, -301px)" }}>
                                        James bond
                                    </div>
                                </Link>
                            </div>
                            <div className="hs-tooltip inline-block show">
                                <Link scroll={false} className="hs-tooltip-toggle relative inline-block avatar-color" href="#!">
                                    <Image fill className="avatar rounded-full" src="../../assets/images/faces/2.jpg" alt="Image Description" />
                                    <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-sm dark:bg-slate-700" role="tooltip" data-popper-placement="top" style={{ position: "fixed", inset: "auto auto 0px 0px", margin: "0px", transform: "translate(1156px, -301px)" }}>
                                        James bond
                                    </div>
                                </Link>
                            </div>
                            <div className="hs-tooltip inline-block show">
                                <Link scroll={false} className="hs-tooltip-toggle relative inline-block avatar-color" href="#!">
                                    <Image fill className="avatar rounded-full" src="../../assets/images/faces/3.jpg" alt="Image Description" />
                                    <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-sm dark:bg-slate-700" role="tooltip" data-popper-placement="top" style={{ position: "fixed", inset: "auto auto 0px 0px", margin: "0px", transform: "translate(1186px, -301px)" }}>
                                        James bond
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title=" Avatars with dropdown" reactCode={utilitiesPrism.avatar9} dataCode={utilitiesPrism.avatardata9} >
                        <div className="flex -space-x-2 rtl:space-x-reverse avatar-color relative">
                            <Image fill className="inline-block avatar avatar-rounded" src="../../assets/images/faces/8.jpg" alt="Image Description" />
                            <Image fill className="inline-block avatar avatar-rounded" src="../../assets/images/faces/4.jpg" alt="Image Description" />
                            <Image fill className="inline-block avatar avatar-rounded" src="../../assets/images/faces/6.jpg" alt="Image Description" />
                            <Image fill className="inline-block avatar avatar-rounded" src="../../assets/images/faces/7.jpg" alt="Image Description" />
                            <div className="hs-dropdown relative inline-flex" data-hs-dropdown-placement="top-left">
                                <button type="button" id="hs-dropdown-avatar-more" className="inline-block avatar avatar-rounded hs-dropdown-toggle  items-center justify-center avatar 
                                      avatar-rounded bg-gray-200 border-2 border-white font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-300 
                                      focus:outline-none focus:bg-primary focus:text-white focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-primary 
                                      transition-all text-sm dark:bg-bodybg2 dark:hover:bg-black/30 dark:border-white/10 dark:text-white/70 dark:hover:text-white 
                                      dark:focus:bg-primary dark:focus:text-white dark:focus:ring-offset-white/10">
                                    <span className="font-medium leading-none">9+</span>
                                </button>
                                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 min-w-[15rem]
                                       bg-white shadow-md rounded-sm p-2 dark:bg-bodybg2 dark:border dark:border-white/10 dark:divide-white/10">
                                    <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-defaulttextcolor hover:bg-gray-100 dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300" href="#!">
                                        Chris Lynch
                                    </Link>
                                    <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-defaulttextcolor hover:bg-gray-100 dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300" href="#!">
                                        Maria Guan
                                    </Link>
                                    <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-defaulttextcolor hover:bg-gray-100 dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300" href="#!">
                                        Amil Evara
                                    </Link>
                                    <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-defaulttextcolor hover:bg-gray-100 dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300" href="#!">
                                        Ebele Egbuna
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/*<!-- End::row-2 -->*/}


        </Fragment>
    );
};

export default Avatars;