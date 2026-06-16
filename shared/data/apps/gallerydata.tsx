
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import Lightbox from "yet-another-react-lightbox";
import Image from 'next/image';
export const Gallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../assets/images/media/media-40.jpg" },
        { src: "../../assets/images/media/media-41.jpg" },
        { src: "../../assets/images/media/media-42.jpg" },
        { src: "../../assets/images/media/media-43.jpg" },
        { src: "../../assets/images/media/media-44.jpg" },
        { src: "../../assets/images/media/media-45.jpg" },
        { src: "../../assets/images/media/media-46.jpg" },
        { src: "../../assets/images/media/media-60.jpg" }
    ]

    return (
        <>
            <div className="grid grid-cols-12 gap-x-6">
                
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-40.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-41.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-42.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-43.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-44.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-45.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-46.jpg"
                                alt=""
                                onClick={() => setOpen(true)}
                            />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" >
                        <Link href="#!" scroll={false} className="glightbox box" data-gallery="gallery1">
                            <Image priority width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height:"auto"}}
                                src="../../assets/images/media/media-60.jpg"
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
