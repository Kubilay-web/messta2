
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const ClassifiedGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../assets/images/classifieds/classify-gallery/1.jpg" },
        { src: "../../assets/images/classifieds/classify-gallery/2.jpg" },
        { src: "../../assets/images/classifieds/classify-gallery/3.jpg" },
        { src: "../../assets/images/classifieds/classify-gallery/4.jpg" },
        { src: "../../assets/images/classifieds/classify-gallery/5.jpg" },
    ]

    return (
        <>
            <Link scroll={false} href="#!" className="glightbox card border-0 mb-0 relative" data-gallery="gallery1" data-title="Cadbo Car kb43 (1/5)" data-type="image" data-draggable="true">
                <div className="classify-gallery p-2 pb-0 relative">
                    <span className="badge bg-warning  tag-badge text-white">Featured</span>
                    <span className="ti-btn !bg-white/[0.15] !border !border-white/10 !text-white backdrop-blur classifyimage-btn !rounded-full" onClick={() => setOpen(true)}>
                        <i className="ri-image-line me-2 bg-primary !text-white feature-icons !border-0"></i>5 Images</span>
                    <Image fill priority src="../../assets/images/classifieds/classify-gallery/1.jpg" alt="image" className="rounded-sm" onClick={() => setOpen(true)} />
                </div>
            </Link>
            <Lightboxcomponent
                close={() => setOpen(false)} // Close function
                zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                open={open}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                slides={Slides} index={0} />
        </>
    );
};
