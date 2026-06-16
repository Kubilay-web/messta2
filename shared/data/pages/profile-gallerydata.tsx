
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const ProfileGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../assets/images/media/media-40.jpg" },
        { src: "../../assets/images/media/media-41.jpg" },
        { src: "../../assets/images/media/media-42.jpg" },
        { src: "../../assets/images/media/media-43.jpg" },
        { src: "../../assets/images/media/media-44.jpg" },
        { src: "../../assets/images/media/media-45.jpg" },
        { src: "../../assets/images/media/media-46.jpg" },
        { src: "../../assets/images/media/media-60.jpg" },
        { src: "../../assets/images/media/media-26.jpg" },
        { src: "../../assets/images/media/media-32.jpg" },
        { src: "../../assets/images/media/media-30.jpg" },
        { src: "../../assets/images/media/media-31.jpg" },
        { src: "../../assets/images/media/media-46.jpg" },
        { src: "../../assets/images/media/media-59.jpg" },
        { src: "../../assets/images/media/media-61.jpg" },
        { src: "../../assets/images/media/media-42.jpg" }
    ]

    return (
        <>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-40.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-41.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-42.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>

                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-43.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-44.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-45.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-46.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-60.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-26.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-32.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-30.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-31.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-46.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-59.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-61.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12" >
                    <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                        <Image fill
                            src="../../assets/images/media/media-42.jpg"
                            alt=""
                            onClick={() => setOpen(true)}
                        />
                    </Link>
                </div>
            </div>
            <Lightboxcomponent
                close={() => setOpen(false)} // Close function
                zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                open={open}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                slides={Slides} index={0} />
        </>
    );
};
