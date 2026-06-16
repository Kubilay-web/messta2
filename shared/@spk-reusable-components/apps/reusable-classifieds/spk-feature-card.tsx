
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkFeatureCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className={`box ${card.boxClass}`}>
				{card.badge && (
					<span className={`badge bg-${card.bg} tag-badge text-white`}>
						{card.badge}
					</span>
				)}
				<Link href="/classifieds/classified-details">
					<div className="featured-img p-2 bg-gray-300  dark:bg-bodybg !rounded-sm relative">
						<Image fill src={card.image} className="!rounded-sm" alt="..." />
					</div>
				</Link>
				<div className="box-body !p-4 relative">
					<div className="flex items-center">
						<div className="flex-grow">
							<h5 className="mb-0 font-semibold"><span>{card.price}</span></h5>
							<p className="mb-1 font-semibold">{card.title}</p>
						</div>
						<div className="hs-tooltip ti-main-tooltip]">
							<Link scroll={false} href="#!"
								className="ti-btn ti-btn-sm ti-btn-icon ti-btn-outline-light !rounded-full hs-tooltip-toggle">
								<i className={`ri-heart-fill ${card.opacity}`}></i>
								<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
									Add to Wishlist
								</span>
							</Link>
						</div>
					</div>
					<h6 className="text-textmuted dark:text-textmuted/50">{card.description}</h6>
					<div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50">
						<span className=""><i className="bi bi-geo-alt me-1"></i>{card.location}</span>
						<span className="mx-1">,</span>
						<span className="">{card.date}</span>
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkFeatureCard;



