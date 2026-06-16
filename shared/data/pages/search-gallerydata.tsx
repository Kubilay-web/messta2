
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const SearchGallerylist = () => {

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
    ]

    return (
        <>
            <div className="grid grid-cols-12 sm:gap-x-6">
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!" className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-40.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/6.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">  Tech Gadgets</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Innovative Marvels</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!" className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-41.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/2.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default"> Healthy Recipes</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Nutrient Nourish</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!" className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-42.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/4.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default"> Travel Explorer</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Global Wander</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!"
                        className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-43.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/5.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">
                                    Fashion Finds</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Chic Styles</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!"
                        className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-44.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/6.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">
                                    Nature Photography</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Wild Beauty</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!"
                        className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-45.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/7.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">
                                    Future Tales
                                </div>
                            </div>
                            <div className="text-[0.75rem] text-default">Innovative Marvels </div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!" className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-46.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/8.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">
                                    Science Fiction Books</div>
                            </div>
                            <div className="text-[0.75rem] text-default">Future Tales</div>
                        </div>
                    </Link>
                </div>
                <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link scroll={false} href="#!" className="glightbox box search-images-card" data-gallery="gallery1">
                        <Image fill src="../../assets/images/media/media-60.jpg" alt="image" onClick={() => setOpen(true)} />
                        <div className="p-2">
                            <div className="flex items-center gap-1">
                                <div className="avatar avatar-xs">
                                    <Image fill src="../../assets/images/company-logos/9.png" alt="" />
                                </div>
                                <div className="figure-caption text-[0.8125rem] font-medium text-default">
                                    Fitness Fanatics
                                </div>
                            </div>
                            <div className="text-[0.75rem] text-default">Active Vibes</div>
                        </div>
                    </Link>
                </div>
                <div className="xl:col-span-12 col-span-12 mb-6 text-center">
                    <button type="button" className="ti-btn bg-info/10 text-info ti-btn-loader">
                        <span className="me-2">Loading</span> <span className="loading"><i className="ri-loader-4-line text-[1rem] animate-spin"></i></span>
                    </button>
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
