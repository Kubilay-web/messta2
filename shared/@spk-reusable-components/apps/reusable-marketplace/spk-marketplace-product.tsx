
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkMarketplaceProduct = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box overflow-hidden card-style-2">
				{card.badge ? (
					<span className="badge bg-danger tag-badge text-white">{card.badge}</span>
				) : ''}
				{card.rightBadge ? (
					<div className="badge top-right-badge bg-warning text-white !flex-shrink-0">
						<div className="badge-icon">
							<i className="ti ti-bolt text-[0.875rem]"></i>
						</div>
						<div className="badge-text">Trending</div>
					</div>
				) : ''}
				<Link href="/market-place/details">
					<div className="featured-img p-2 bg-gray-300 dark:bg-bodybg rounded-sm relative">
						<Image fill src={card.src} className="rounded-sm" alt="..." />
					</div>
				</Link>
				<div className="box-body !p-4 position-relative">
					<div className="flex items-start justify-between">
						<div className="flex-grow">
							<Link href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{card.author}</Link>
							<h5 className="mb-1 font-semibold"><Link href="/market-place/details">{card.title}</Link></h5>
							<div className="flex items-baseline text-[0.6875rem] flex-wrap  gap-2">
								<div className="min-w-fit">
									<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
									<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
									<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
									<span className="text-warning"><i className="bi bi-star-half"></i></span>
								</div>
								<p className="mb-0 mx-1 min-w-fit text-textmuted dark:text-textmuted/50">
									<span> ({card.ratings})</span>
									<span> Ratings</span>
								</p>
								<span className="text-danger">( {card.sales} Sales )</span>
							</div>
						</div>
						<div className="min-w-fit">
							<div className="hs-tooltip ti-main-tooltip">
								<span
									className="hs-tooltip-toggle ti-btn ti-btn-sm ti-btn-icon ti-btn-outline-light !rounded-full">
									<i className="ri-heart-fill op-3"></i>
									<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm " role="tooltip">
										Add to wishlist
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className="flex items-baseline mt-4 flex-wrap  gap-2">
						<div className="flex items-center flex-grow">
							<h4 className="font-semibold text-primary mb-0">${card.discountedPrice}</h4>
							<span className="text-[1rem] ms-2 text-textmuted dark:text-textmuted/50 line-through flex-grow">${card.originalPrice}</span>
						</div>
						<Link href="/market-place/details" className="ti-btn ti-btn-primary !m-0"><i className="ti ti-eye me-1 inline-block"></i>Preview</Link>
					</div>
				</div>
			</div>


		</Fragment>
	);
}

export default SpkMarketplaceProduct;
