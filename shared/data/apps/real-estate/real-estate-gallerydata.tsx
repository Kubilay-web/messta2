
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const RealGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../assets/images/realestate/Main-2.png" },
        { src: "../../assets/images/realestate/Main-3.png" },
        { src: "../../assets/images/realestate/Main-4.png" },
        { src: "../../assets/images/realestate/Main-2.png" },
    ]

    return (
        <>
            <Link href="#!" className="glightbox card border-0 mb-0" data-gallery="gallery1" data-title="Cadbo Car kb43 (1/5)" data-type="image" data-draggable="true">
                <div className="classify-gallery !p-0 !border-0 relative">
                    <span className="badge bg-warning tag-badge text-white">Featured</span>
                    <span className="ti-btn !bg-white/[0.15] !border !border-white/10 backdrop-blur classifyimage-btn !text-white !rounded-full" onClick={() => setOpen(true)}><i className="ri-image-line me-2 bg-primary !text-white feature-icons !border-0"></i>5 Images</span>
                    <Image fill priority src="../../assets/images/realestate/Main.png" alt="image" onClick={() => setOpen(true)} />
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
