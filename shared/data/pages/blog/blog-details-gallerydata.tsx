
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import Lightbox from "yet-another-react-lightbox";
import Image from 'next/image';
export const BlogGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../../assets/images/media/media-48.jpg" },
        { src: "../../../assets/images/media/media-49.jpg" },
        { src: "../../../assets/images/media/media-50.jpg" },
        { src: "../../../assets/images/media/media-51.jpg" },
        { src: "../../../assets/images/media/media-52.jpg" },
        { src: "../../../assets/images/media/media-53.jpg" },
        { src: "../../../assets/images/media/media-54.jpg" },
        { src: "../../../assets/images/media/media-55.jpg" },
        { src: "../../../assets/images/media/media-56.jpg" }
    ]

    return (
        <>
            <div className="grid grid-cols-12 sm:gap-x-6 gap-x-3 gap-y-4">
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                    <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-48.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-49.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-50.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-51.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-52.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-53.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-54.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-55.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6" >
                    <Link href="#!" scroll={false} className="glightbox card mb-0" data-gallery="gallery1">
                        <Image width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}} className="rounded-sm w-full"
                            src="../../../assets/images/media/media-56.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
            </div>
            <Lightbox
                close={() => setOpen(false)} // Close function
                zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                open={open}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                slides={Slides} index={0} />
        </>
    );
};
