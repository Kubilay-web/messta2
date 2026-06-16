
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkPropertyCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box overflow-hidden card-style-2">
				<span className={`badge bg-${card.statusColor} tag-badge text-white`}>{card.status}</span>
				<span className={`badge bg-${card.discountColor} top-right-badge text-white`}>
					{card.discount}
				</span>
				{card.rightBadge && (
					<div className="badge top-right-badge bg-warning text-white">
						<div className="badge-icon"><i className="ti ti-star-filled text-[0.875rem]"></i></div>
						<div className="badge-text">Featured</div>
					</div>
				)}
				<Link href="/real-estate/details">
					<div className="featured-img p-2 bg-gray-300 dark:bg-bodybg relative">
						<Image fill src={card.image} className="" alt="..." />
					</div>
				</Link>
				<div className="box-body !p-4 relative">
					<div className="min-w-fit float-end">
						<Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-outline-light !rounded-full" data-bs-toggle="tooltip" data-bs-placement="top"
							aria-label="Add to wishlist" data-bs-original-title="Add to wishlist">
							<i className="ri-heart-fill op-3"></i>
						</Link>
					</div>
					<p className="mb-2">By <Link scroll={false} href="#!"
						className="inline-block text-primary text-[0.8125rem] font-semibold">{card.author}</Link></p>
					<h5 className="mb-1 font-semibold"><Link href="/real-estate/details">{card.title}</Link></h5>
					<div className="flex items-baseline text-[0.6875rem] mb-3 flex-wrap gap-2">
						<div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50">
							<span className=""><i className="bi bi-geo-alt me-1"></i> {card.location}</span>
							<span>,</span>
							<span className=""> {card.date}</span>
						</div>
						<span className="text-danger">( {card.type} )</span>
					</div>
					<div className="popular-tags">
						{card.details.map((badge: any, index: any) => (
							<Link scroll={false} href="#!" className="badge !rounded-full bg-light border text-default border-defaultborder dark:border-defaultborder/10 !me-1" key={index}>{badge}</Link>
						))}
					</div>
					<div className="flex items-center mt-4 flex-wrap gap-2">
						<h4 className="font-semibold text-primary mb-0 flex-grow">{card.price}</h4>
						<Link href="/real-estate/details" className="ti-btn ti-btn-primary"><i className="ti ti-phone me-1 inline-block"></i>Contact</Link>
					</div>
				</div>
			</div>



		</Fragment>
	);
}

export default SpkPropertyCard;
