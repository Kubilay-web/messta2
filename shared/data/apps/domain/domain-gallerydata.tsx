
"use client";
import { useState } from 'react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Link from 'next/link';
import { Lightboxcomponent } from '@/shared/@spk-reusable-components/spk-packages/spk-lightbox-component';
import Image from 'next/image';

export const DomainGallerylist = () => {

	const [open, setOpen] = useState(false);

	const Slides = [
		{ src: "../../assets/images/domains/1.jpg" },
		{ src: "../../assets/images/marketplace/templates/2.png" },
		{ src: "../../assets/images/marketplace/templates/3.png" },
		{ src: "../../assets/images/marketplace/templates/4.png" },
		{ src: "../../assets/images/marketplace/templates/5.png" },
	]

	return (
		<>
			<Link scroll={false} href="#!" className="glightbox card border-0 mb-0" data-gallery="gallery1" data-title="spotechtechnical.com" data-type="image" data-draggable="true">
				<div className="classify-gallery p-2 rounded-sm relative">
					<span className="ti-btn !bg-white/[0.15] !text-black !backdrop-blur-md border !border-white/10 classifyimage-btn !rounded-full z-100" onClick={() => setOpen(true)}>
						<i className="ri-image-line me-2 bg-primary !border-primary !text-white feature-icons border-0"></i>5 Images</span>
					<Image fill src="../../assets/images/domains/1.jpg" alt="image" className="rounded-sm" onClick={() => setOpen(true)} />
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


