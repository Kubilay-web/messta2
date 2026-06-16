
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const MarketGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../assets/images/marketplace/1.png" },
        { src: "../../assets/images/marketplace/2.png" },
    ]

    return (
        <>
            <Link href="#!" className="glightbox card border-0 mb-0" data-gallery="gallery1" data-title="Cadbo Car kb43 (1/2)" data-type="image" data-draggable="true">
                <div className="classify-gallery p-2 rounded-sm relative">
                    <span className="ti-btn !bg-white/[0.15] backdrop-blur-[30px] !border !border-white/20 classifyimage-btn !rounded-full !bottom-[6rem] !text-white" onClick={() => setOpen(true)}>
                        <i className="ri-image-line bg-primary !text-white feature-icons !border-0"></i>2 Images
                    </span>
                    <Image priority fill src="../../assets/images/marketplace/1.png" alt="image" className="rounded-sm" onClick={() => setOpen(true)} />
                </div>
            </Link>
            <Lightboxcomponent
                close={() => setOpen(false)} // Close function
                zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }} // Zoom settings
                open={open}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                slides={Slides} index={2} />
        </>
    );
};
