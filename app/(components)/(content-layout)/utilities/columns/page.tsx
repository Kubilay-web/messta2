"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { Fragment } from "react";

const Columns = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Columns" />
            <Pageheader Heading="Columns" breadcrumbs={['Utilities']} currentpage="Columns" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Based On Column Count</h5>
                        </div>
                        <div className="box-body">
                            <div className="relative">
                                <div className="absolute inset-0 -top-8 -bottom-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    <div className="bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                    <div className="hidden sm:block bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                    <div className="hidden sm:block bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                </div>
                                <div className="relative columns-1 sm:columns-3 gap-8">
                                    <div className="relative  aspect-w-16 aspect-h-9">
                                        <Image width={400} height={225}  className="w-full object-cover rounded-sm" src="../../assets/images/media/media-30.jpg" alt="Image Description" />
                                    </div>
                                    <div className="relative aspect-w-1 aspect-h-1 mt-8">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-29.jpg" alt="Image Description" />
                                    </div>
                                    <div className="relative aspect-w-1 aspect-h-1 mt-8">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-28.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8 sm:mt-0">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-27.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-16 aspect-h-9 mt-8">
                                        <Image width={400} height={225} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-30.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-26.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8 sm:mt-0">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-29.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8">
                                        <Image width={400} height={400} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-31.jpg" alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-16 aspect-h-9 mt-8">
                                        <Image width={400} height={225} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-25.jpg" alt="Image Description" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Based On Column Width</h5>
                        </div>
                        <div className="box-body">
                            <div className="relative rounded-sm overflow-auto max-h-[800px]">
                                <div className="relative">
                                    <div className="columns-3xs gap-8 space-y-8">
                                        <div className="relative aspect-w-16 aspect-h-9">
                                            <Image width={292} height={164} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-26.jpg" alt="Image Description" />
                                        </div>
                                        <div className="relative aspect-w-1 aspect-h-1">
                                            <Image width={292} height={292} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-27.jpg" alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-1 aspect-h-1">
                                            <Image width={292} height={292} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-28.jpg" alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-16 aspect-h-9">
                                            <Image width={292} height={164} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-29.jpg" alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-16 aspect-h-9">
                                            <Image width={292} height={164} className="w-full object-cover rounded-sm" src="../../assets/images/media/media-25.jpg" alt="Image Description" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}
        </Fragment>
    );
};

export default Columns;