"use client"
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Error500 = () => {
    return (
        <Fragment>
            <div className="page error-bg">
                {/* <!-- Start::error-page --> */}
                <div className="error-page">
                    <div className="container">
                        <div className="my-auto">
                            <div className="grid grid-cols-12 gap-x-6 h-full">
                                <div className="xxl:col-span-2 xl:col-span-1 lg:col-span-2 md:col-span-1 col-span-1"></div>
                                <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-10">
                                    <p className="error-text mb-4 text-white">500</p>
                                    <p className="text-[1.75rem] font-normal mb-3 text-white">Oops, the page you are trying to access does not exist ?</p>
                                    <p className="text-[1rem] text-white mb-[3rem] opacity-80">The requested page is not available. It might have been relocated, deleted, or never existed.</p>
                                    <Link href="/dashboards/sales" className="ti-btn ti-btn-secondary"><i className="ri-arrow-left-line align-middle me-1 inline-block"></i>BACK TO HOME</Link>
                                </div>
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-2 md:col-span-1 col-span-1 xl:block hidden">
                                <Image fill src="../../../assets/images/media/gif/1.gif" alt="" className="bg-white/[0.15] !rounded-full backdrop-blur img-fluid" />
                                </div>
                                <div className="xxl:col-span-2 xl:col-span-1 lg:col-span-2 md:col-span-1 col-span-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Error500;