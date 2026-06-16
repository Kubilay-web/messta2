"use client"
import { border1, border2, border3, border4, border5, border6, border7, border8 } from "@/shared/data/prism/utilities-prism";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import React, { FC, Fragment } from "react";

interface BordersProps { }

const Borders: FC<BordersProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Borders" />
            <Pageheader Heading="Borders" breadcrumbs={['Utilities']} currentpage="Borders" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            < div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Borders" reactCode={border1}>
                        <span className="border dark:border-defaultborder/10 border-defaultborder border-container"></span>
                        <span className="border-t dark:border-defaultborder/10 border-container"></span>
                        <span className="border-e dark:border-defaultborder/10 border-container"></span>
                        <span className="border-b dark:border-defaultborder/10 border-container"></span>
                        <span className="border-s dark:border-defaultborder/10 border-container"></span>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Remove Borders" reactCode={border2}>
                        <span className="border-0 border-container"></span>
                        <span className="border dark:border-defaultborder/10 border-defaultborder border-t-0 border-container"></span>
                        <span className="border dark:border-defaultborder/10 border-defaultborder border-e-0 border-container"></span>
                        <span className="border dark:border-defaultborder/10 border-defaultborder border-b-0 border-container"></span>
                        <span className="border dark:border-defaultborder/10 border-defaultborder border-s-0 border-container"></span>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Border Colors" reactCode={border3}>
                        <span className="border border-container !border-primary"></span>
                        <span className="border border-container !border-secondary"></span>
                        <span className="border border-container !border-success"></span>
                        <span className="border border-container !border-danger"></span>
                        <span className="border border-container !border-warning"></span>
                        <span className="border border-container !border-info"></span>
                        <span className="border border-container !border-light"></span>
                        <span className="border border-container !border-black"></span>
                        <span className="border border-container !border-white"></span>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Border Widths" reactCode={border4}>
                        <span className="border-1 dark:border-defaultborder/10 border-defaultborder border-container"></span>
                        <span className="border-container dark:border-defaultborder/10 border-defaultborder border-2"></span>
                        <span className="border-container dark:border-defaultborder/10 border-defaultborder border-4"></span>
                        <span className="border-container dark:border-defaultborder/10 border-defaultborder border-8"></span>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Border Radius" customCardBodyClass="!flex flex-wrap gap-2" reactCode={border5}>
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-t-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-e-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-b-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-s-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-full" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img  rounded-full" alt="..." />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Sizes" customCardBodyClass="!flex flex-wrap gap-2" reactCode={border6}>
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-none" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-sm" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-md" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-lg" alt="..." />
                        <Image fill src="../../assets/images/media/media-58.jpg" className="bd-placeholder-img rounded-xl" alt="..." />
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Border With Opacity" reactCode={border7}>
                        <div className="border border-success p-2 mb-2">This is default success border</div>
                        <div className="border border-success/75 p-2 mb-2">This is 75%
                            opacity
                            success border
                        </div>
                        <div className="border border-success/50 p-2 mb-2">This is 50%
                            opacity
                            success border
                        </div>
                        <div className="border border-success/25 p-2 mb-2 ">This is 25%
                            opacity
                            success border
                        </div>
                        <div className="border border-success/10 p-2">This is 10% opacity
                            success
                            border
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Border Color Styling" reactCode={border8}>
                        <div className="mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email
                                address</label>
                            <input type="email" className="form-control w-full !rounded-md !border-success"
                                id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="h4 pb-4 mb-4 text-danger border-b !border-danger">
                            Below Shows Danger Border
                        </div>
                        <div
                            className="p-4 bg-info/10 border !border-info  !border-s-0 rounded-e-md mb-1">
                            Customizing borders with background colors
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}
        </Fragment >
    );
};

export default Borders;