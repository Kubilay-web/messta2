
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';


export const CustomerGallerylist = () => {

    const [open, setOpen] = useState(false);

    const Slides = [
        { src: "../../../assets/images/ecommerce/png/1.png" },
        { src: "../../../assets/images/ecommerce/png/2.png" },
        { src: "../../../assets/images/ecommerce/png/3.png" },
        { src: "../../../assets/images/ecommerce/png/4.png" },
        { src: "../../../assets/images/ecommerce/png/5.png" },
    ]

    return (
        <>

        </>
    );
};
