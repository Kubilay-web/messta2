"use client"
import { Skeleton1, Skeleton2, Skeleton3, Skeleton4 } from "@/shared/data/prism/advanced-ui-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface SkeletonProps { }

const Skeleton: FC<SkeletonProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Skeleton" />
            <Pageheader Heading="Skeleton" breadcrumbs={['Advanced Ui']} currentpage="Skeleton" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                    <Image fill className="card-img-top" src="../../assets/images/media/media-60.jpg" alt="" />
                        <div className="box-body">
                            <h5 className="box-title">Card title</h5>
                            <p className="card-text !mb-4">Some quick example text to build on the card title and make
                                up
                                the bulk of the card's content.</p>
                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary">Go somewhere</Link>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box" aria-hidden="true">
                    <Image fill className="card-img-top" src="../../assets/images/media/media-61.jpg" alt="" />
                        <div className="box-body">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                                </div>

                                <div className="ms-4 mt-2 w-full">
                                    <p className="h-4 bg-gray-200 rounded-full dark:bg-light" style={{ width: "40%" }}></p>

                                    <ul className="mt-5 space-y-3">
                                        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                    </ul>
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
                    <Showcode title="Animation" reactCode={Skeleton1} customCardclassName="">
                        <div className="flex animate-pulse">
                            <div className="flex-shrink-0">
                                <span className="size-12 block bg-gray-200 rounded-full dark:bg-light"></span>
                            </div>

                            <div className="ms-4 mt-2 w-full">
                                <p className="h-4 bg-gray-200 rounded-full dark:bg-light" style={{ width: "40%" }}></p>

                                <ul className="mt-5 space-y-3">
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                </ul>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="xl:col-span-12 col-span-12">
                                    <Showcode title="Sizing" reactCode={Skeleton2} customCardclassName="">
                                        <ul className="mt-5 space-y-3">
                                            <li className="w-full h-10 bg-gray-200 rounded-full dark:bg-light"></li>
                                            <li className="w-full h-6 bg-gray-200 rounded-full dark:bg-light"></li>
                                            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                                            <li className="w-full h-2 bg-gray-200 rounded-full dark:bg-light"></li>
                                        </ul>
                                    </Showcode>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Colors" reactCode={Skeleton3} customCardclassName="">
                                <ul className="mt-5 space-y-3">
                                    <li className="w-full h-4 bg-primary/50 rounded-full"></li>
                                    <li className="w-full h-4 bg-secondary/50 rounded-full"></li>
                                    <li className="w-full h-4 bg-success/50 rounded-full"></li>
                                    <li className="w-full h-4 bg-orangemain/50 rounded-full"></li>
                                    <li className="w-full h-4 bg-warning/50 rounded-full"></li>
                                </ul>
                            </Showcode>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Width" reactCode={Skeleton4} customCardclassName="">
                        <ul className="mt-5 space-y-3">
                            <li className="w-[25%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                            <li className="w-[50%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                            <li className="w-[75%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
                        </ul>
                    </Showcode>
                </div>
            </div>
            {/* <!-- Start:: row-2 --> */}
        </Fragment>
    );
};

export default Skeleton;