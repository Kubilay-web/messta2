"use client"
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as uiElementsPrism from "@/shared/data/prism/ui-elements-prism";
import { badges, gradientbadge, lightbadges, outlinebadges } from "@/shared/data/ui-elements/badgesdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import React, { FC, Fragment } from "react";

interface BadgeProps { }

const Badge: FC<BadgeProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Badge" />
            <Pageheader Heading="Badge" breadcrumbs={['Ui Elements']} currentpage="Badge" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Buttons With Badges" reactCode={uiElementsPrism.reactbadges15} reusableCode={uiElementsPrism.reusebadges15} customCardBodyClass="flex flex-wrap gap-2">
                        <SpkButton buttontype="button" customClass="ti-btn bg-primary text-white my-1 me-2">
                            Notifications <SpkBadge variant="secondary" customClass="ms-2">4</SpkBadge>
                        </SpkButton>

                        <SpkButton buttontype="button" customClass="ti-btn bg-secondary text-white my-1 me-2">
                            Notifications <SpkBadge variant="primary" customClass="ms-2">7</SpkBadge>
                        </SpkButton>
                        <SpkButton buttontype="button" customClass="ti-btn bg-success text-white my-1 me-2">
                            Notifications <SpkBadge variant="danger" customClass="ms-2">12</SpkBadge>
                        </SpkButton>
                        <SpkButton buttontype="button" customClass="ti-btn bg-info text-white my-1 me-2">
                            Notifications <SpkBadge variant="warning" customClass="ms-2">32</SpkBadge>
                        </SpkButton>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Button Badges" reactCode={uiElementsPrism.reactbadges16} reusableCode={uiElementsPrism.reusebadges16} customCardBodyClass="flex flex-wrap gap-2">
                        <SpkButton buttontype="button" customClass="ti-btn my-1 me-2" variant="outline-primary">
                            Notifications <SpkBadge customClass="ms-2 text-white" variant="primary">4</SpkBadge>
                        </SpkButton>
                        <SpkButton buttontype="button" customClass="ti-btn my-1 me-2" variant="outline-secondary">
                            Notifications <SpkBadge customClass="ms-2 text-white" variant="secondary">7</SpkBadge>
                        </SpkButton>
                        <SpkButton buttontype="button" customClass="ti-btn my-1 me-2" variant="outline-success">
                            Notifications <SpkBadge customClass="ms-2 text-white" variant="success">12</SpkBadge>
                        </SpkButton>
                        <SpkButton buttontype="button" customClass="ti-btn my-1 me-2" variant="outline-info">
                            Notifications <SpkBadge customClass="ms-2 text-white" variant="info">32</SpkBadge>
                        </SpkButton>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Light Badges" reactCode={uiElementsPrism.reactbadges3} reusableCode={uiElementsPrism.reusebadges3} dataCode={uiElementsPrism.badgedata3} customCardBodyClass="flex flex-wrap gap-2 space-y-2">
                        {lightbadges.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2" variant={idx.color}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Badges" reactCode={uiElementsPrism.reactbadges1} reusableCode={uiElementsPrism.reusebadges1} customCardBodyClass="flex flex-wrap gap-2 space-y-2">
                        <SpkBadge variant="primary text-white" customClass="me-2">Primary</SpkBadge>
                        <SpkBadge variant="secondary text-white" customClass="me-2">Secondary</SpkBadge>
                        <SpkBadge variant="success text-white" customClass="me-2">Success</SpkBadge>
                        <SpkBadge variant="danger text-white" customClass="me-2">Danger</SpkBadge>
                        <SpkBadge variant="warning text-white" customClass="me-2">Warning</SpkBadge>
                        <SpkBadge variant="info text-white" customClass="me-2">Info</SpkBadge>
                        <SpkBadge variant="light text-dark" customClass="me-2">Light</SpkBadge>
                        <SpkBadge variant="black text-white" customClass="me-2">Dark</SpkBadge>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-6 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Positioned Badges" reactCode={uiElementsPrism.reactbadges18} reusableCode={uiElementsPrism.reusebadges18} customCardBodyClass="!flex flex-wrap gap-4">
                                <SpkButton buttontype="button" customClass="ti-btn bg-primary text-white relative">
                                    Inbox
                                    <span
                                        className="absolute -top-2 start-[60%] translate-middle  badge !rounded-full bg-danger">
                                        99+
                                        <span className="hidden">unread messages</span>
                                    </span>
                                </SpkButton>
                                <SpkButton buttontype="button" customClass="ti-btn bg-secondary text-white relative">
                                    Profile
                                    <span className="absolute -top-2 start-[80%] translate-middle p-2 bg-success border border-light !rounded-full">
                                        <span className="hidden">New alerts</span>
                                    </span>
                                </SpkButton>
                                <span className="avatar relative">
                                    <Image fill src="../../assets/images/faces/2.jpg" alt="img" className="!rounded-md" />
                                    <span className="absolute -top-1 start-[80%] translate-middle p-1 bg-success border border-light !rounded-full">
                                        <span className="hidden">New alerts</span>
                                    </span>
                                </span>
                                <span className="avatar avatar-rounded relative">
                                    <Image fill src="../../assets/images/faces/15.jpg" alt="img" />
                                    <span className="absolute top-0 start-[80%] translate-middle p-1 bg-success border border-light !rounded-full">
                                        <span className="hidden">New alerts</span>
                                    </span>
                                </span>
                                <span className="avatar avatar-rounded relative">
                                    <Image fill src="../../assets/images/faces/10.jpg" alt="img" />
                                    <span className="absolute -top-2 start-[60%] translate-middle badge bg-secondary !rounded-full shadow-lg text-white">1000+
                                        <span className="hidden">New alerts</span>
                                    </span>
                                </span>
                            </Showcode>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Custom Badges" reactCode={uiElementsPrism.reactbadges19} reusableCode={uiElementsPrism.reusebadges19} customCardBodyClass="">
                                <div className="flex items-center gap-5 flex-wrap">
                                    <div>
                                        <SpkBadge variant="outline-secondary"
                                            customClass="border  !font-semibold !text-[.9375rem] inline-flex items-center">
                                            <i className="ti ti-flame me-1"></i>
                                            Hot
                                        </SpkBadge>
                                    </div>
                                    <div>
                                        <span className="relative">
                                            <svg className="fill-textmuted dark:fill-textmuted/50 w-8 h-8 text-[2rem]"
                                                xmlns="http://www.w3.org/2000/svg" height="24px"
                                                viewBox="0 0 24 24" width="24px" fill="#000000">
                                                <path
                                                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z">
                                                </path>
                                            </svg>
                                            <SpkBadge variant="success"
                                                customClass="!rounded-full text-white absolute -end-2 top-0">14</SpkBadge>
                                        </span>
                                    </div>
                                    <div>
                                        <SpkBadge variant="light" customClass="border dark:border-light text-defaulttextcolor font-semibold font-[.7rem]">
                                            <i className="fe fe-eye me-2 inline-block"></i>13.2k
                                        </SpkBadge>
                                    </div>
                                    <div>
                                        <span className="text-badge relative">
                                            <span className="text text-lg">Inbox</span>
                                            <SpkBadge variant="success" customClass="!rounded-full  text-white">32</SpkBadge>
                                        </span>
                                    </div>
                                </div>
                            </Showcode>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Headings" reactCode={uiElementsPrism.reactbadges17} reusableCode={uiElementsPrism.reusebadges17} customCardBodyClass="">
                        <h1 className="text-[2.5rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h1>
                        <h2 className="text-[2rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h2>
                        <h3 className="text-[1.75rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h3>
                        <h4 className="text-[1.5rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h4>
                        <h5 className="text-[1.25rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h5>
                        <h6 className="text-[1rem]">Example heading <SpkBadge variant="primary"
                            customClass=" text-white">New</SpkBadge></h6>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-6 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Gradient Badges" reactCode={uiElementsPrism.reactbadges5} reusableCode={uiElementsPrism.reusebadges5} dataCode={uiElementsPrism.badgedata5}
                        customCardBodyClass="flex flex-wrap gap-2">
                        {gradientbadge.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2" variant={`${idx.color}-gradient`}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title=" Gradient Pill Badges" reactCode={uiElementsPrism.reactbadges6} reusableCode={uiElementsPrism.reusebadges6} dataCode={uiElementsPrism.badgedata5}
                        customCardBodyClass="flex flex-wrap gap-2">
                        {gradientbadge.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2 rounded-full" variant={`${idx.color}-gradient`}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}

            {/* <!-- Start::row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Badges" reactCode={uiElementsPrism.reactbadges7} reusableCode={uiElementsPrism.reusebadges7} dataCode={uiElementsPrism.badgedata7}
                        customCardBodyClass="!flex !flex-wrap !gap-2">
                        {outlinebadges.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2" variant={`outline-${idx.color}`}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Pill Badges" reactCode={uiElementsPrism.reactbadges8} reusableCode={uiElementsPrism.reusebadges8} dataCode={uiElementsPrism.badgedata7}
                        customCardBodyClass="!flex !flex-wrap !gap-2">
                        {outlinebadges.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2 !rounded-full" variant={`outline-${idx.color}`}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-4 --> */}

            {/* <!-- Start::row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Pill badges" reactCode={uiElementsPrism.reactbadges2} reusableCode={uiElementsPrism.reusebadges2} dataCode={uiElementsPrism.badgedata2}
                        customCardBodyClass="!flex !flex-wrap !gap-2">
                        {badges.map((idx) => (
                            <SpkBadge key={idx.id} customClass="!rounded-full me-2" variant={idx.color}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Light Pill Badges" reactCode={uiElementsPrism.reactbadges4} reusableCode={uiElementsPrism.reusebadges4} dataCode={uiElementsPrism.badgedata4}
                        customCardBodyClass="flex flex-wrap gap-2">
                        {lightbadges.map((idx) => (
                            <SpkBadge key={idx.id} customClass="me-2 !rounded-full" variant={idx.color}>{idx.class}</SpkBadge>
                        ))}
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-5 --> */}
        </Fragment>
    );
};

export default Badge;