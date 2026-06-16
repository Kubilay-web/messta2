"use client"
import { image1, image2, image3, image4, image5, image6, image7, image8, image9 } from "@/shared/data/prism/ui-elements-prism";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Image from "next/image";
import React, { FC, Fragment } from "react";

interface ImagesFiguresProps { }

const ImagesFigures: FC<ImagesFiguresProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Images & Figures" />
            <Pageheader Heading="Images & Figures" breadcrumbs={['Ui Elements']} currentpage="Images & Figures" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Image Center Align" reactCode={image1}>
                        <Image fill className="rounded-md mx-auto block" src="../../assets/images/media/media-55.jpg" alt="..." />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Image Right Align" reactCode={image2}>
                        <Image fill className="rounded-md float-end" src="../../assets/images/media/media-54.jpg" alt="..." />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Image Left Align" reactCode={image3}>
                        <p className="mb-3">Use <code>.float-start</code> class to <code>img</code> tag to get left align image.</p>
                        <Image fill className="rounded-md float-start" src="../../assets/images/media/media-53.jpg" alt="..." />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Image With Radius" reactCode={image4}>
                        <p className="mb-3">Use <code>.rounded</code> class along with <code>.img-fluid</code> to get border radius.</p>
                        <div className="text-center">
                            <Image fill src="../../assets/images/media/media-49.jpg" className="img-fluid rounded-md inline-flex" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Responsive Image" reactCode={image5}>
                        <p className="mb-3">Use <code> .img-fluid </code>class to the img tag to get responsive image.</p>
                        <div className="text-center">
                            <Image fill src="../../assets/images/media/media-48.jpg" className="img-fluid inline-flex" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Rounded Image" reactCode={image6}>
                        <p className="mb-3">Use <code>.rounded-full</code> class to <code>img</code> tag to get rounded-md image.</p>
                        <div className="text-center">
                            <Image fill src="../../assets/images/media/media-50.jpg" className="img-fluid rounded-full inline-flex" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Image Thumbnail" reactCode={image7}>
                        <p className="mb-3">Use <code> .img-thumbnail </code>to give an image a rounded-md 1px border.</p>
                        <div className="text-center">
                            <Image fill src="../../assets/images/media/media-51.jpg" className="img-thumbnail inline-flex" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Rounded-md Thumbnail" reactCode={image8}>
                        <p className="mb-3">Use <code> .rounded-full </code>along with <code> .img-thummbnail </code> to get radius.</p>
                        <div className="text-center">
                            <Image fill src="../../assets/images/media/media-52.jpg" className="img-thumbnail rounded-full inline-flex" alt="..." />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode customCardBodyClass="" title="Figures" reactCode={image9}>

                        <div className="flex justify-between gap-2">
                            <figure className="figure inline-block mb-4">
                                <Image fill className="m-[0.125rem] leading-none img-fluid rounded-md w-full" src="../../assets/images/media/media-56.jpg" alt="..." />
                                <figcaption className="text-[0.875em] text-textmuted dark:text-textmuted/50  mt-2">A caption for the above image. </figcaption>
                            </figure>
                            <figure className="figure ltr:float-right rtl:float-left">
                                <Image fill className="m-[0.125rem] leading-none img-fluid rounded-md w-full" src="../../assets/images/media/media-57.jpg" alt="..." />
                                <figcaption className="text-[0.875em] text-textmuted dark:text-textmuted/50 text-end mt-2">A caption for the above image. </figcaption>
                            </figure>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    );
};

export default ImagesFigures;