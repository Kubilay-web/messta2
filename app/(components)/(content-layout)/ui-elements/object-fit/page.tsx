"use client"
import * as utilitiesPrism from "@/shared/data/prism/utilities-prism";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import React, { FC, Fragment } from "react";

interface ObjectFtProps { }

const ObjectFt: FC<ObjectFtProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Object Fit" />
            <Pageheader Heading="Object Fit" breadcrumbs={['Ui Elements']} currentpage="Object Fit" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain" reactCode={utilitiesPrism.object1} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Cover" reactCode={utilitiesPrism.object2} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="object-cover border dark:border-defaultborder/10 md:!rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Fill" reactCode={utilitiesPrism.object3} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="object-fill border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Scale Down" reactCode={utilitiesPrism.object4} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="object-scale-down border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit None" reactCode={utilitiesPrism.object5} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg"
                                className="object-none border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain (SM -responsive)" reactCode={utilitiesPrism.object6} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="sm:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain (MD -responsive)" reactCode={utilitiesPrism.object7} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="md:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain (LG -responsive)" reactCode={utilitiesPrism.object8} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="lg:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain (XL -responsive)" reactCode={utilitiesPrism.object9} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="xl:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain (XXL -responsive)" reactCode={utilitiesPrism.object10} customCardBodyClass="object-fit-container">
                        <div className="object-fit-container">
                            <Image fill src="../../assets/images/media/media-28.jpg" className="xxl:object-contain border dark:border-defaultborder/10 !rounded-md" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain Video" customCardBodyClass="object-fit-container" reactCode={utilitiesPrism.object11}>
                        <div className="object-fit-container">
                            <video src="./../../assets/video/1.mp4" className="object-contain !rounded-md border dark:border-defaultborder/10" autoPlay loop muted></video>
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Cover Video" customCardBodyClass="object-fit-container" reactCode={utilitiesPrism.object12}>
                        <div className="object-fit-container">
                            <video src="./../../assets/video/1.mp4" className="object-cover !rounded-md border dark:border-defaultborder/10" autoPlay loop muted></video>
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Fill Video" customCardBodyClass="object-fit-container" reactCode={utilitiesPrism.object13}>
                        <div className="object-fit-container">
                            <video src="./../../assets/video/1.mp4" className="object-fill !rounded-md border dark:border-defaultborder/10" autoPlay loop muted></video>
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Scale Video" customCardBodyClass="object-fit-container" reactCode={utilitiesPrism.object14}>
                        <div className="object-fit-container">
                            <video src="./../../assets/video/1.mp4" className="object-scale-down !rounded-md border dark:border-defaultborder/10" autoPlay loop muted></video>
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit None Video" customCardBodyClass="object-fit-container" reactCode={utilitiesPrism.object15}>
                        <div className="object-fit-container">
                            <video src="./../../assets/video/1.mp4" className="object-none !rounded-md border dark:border-defaultborder/10" autoPlay loop muted></video>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}
        </Fragment>
    );
};

export default ObjectFt;