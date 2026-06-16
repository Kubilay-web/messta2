"use client"
import { TeamData } from "@/shared/data/pages/teamdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Team = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Team" />
            <Pageheader Heading="Team" breadcrumbs={['Pages']} currentpage="Team" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6 gap-y-[3rem] mb-4">
                {TeamData.map((idx) => (
                    <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12 lg:mb-0 mb-4" key={idx.id}>
                        <div className="box team-member">
                            <div className={`team-bg-shape ${idx.bgColor}`}></div>
                            <div className="box-body text-center !p-[3rem]">
                                <div className="mb-4 leading-none">
                                    <span className={`avatar avatar-xxl avatar-rounded bg-${idx.srcBg}`}>
                                        <Image fill src={idx.src} className="card-img" alt="..." />
                                    </span>
                                </div>
                                <div className="text-center">
                                    <h6 className="mb-0 font-semibold">{idx.name}</h6>
                                    <p className="mb-0 text-textmuted dark:text-textmuted/50">{idx.position}</p>
                                    <div className="flex justify-center mt-3">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-primary !rounded-full btn-wave"><i className="ri-twitter-x-fill"></i></Link>
                                        <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-secondary !rounded-full btn-wave ms-2"><i className="ri-facebook-fill"></i></Link>
                                        <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-success !rounded-full btn-wave ms-2"><i className="ri-instagram-line"></i></Link>
                                        <Link scroll={false} aria-label="anchor" href="#!" className="ti-btn ti-btn-icon ti-btn-orange !rounded-full btn-wave ms-2"><i className="ri-linkedin-fill"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    );
};

export default Team;