
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkLandingAds = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="grid grid-cols-12 items-center">
					<div className="md:col-span-4 col-span-12">
						<Link scroll={false} href="#!">
							<Image fill src={card.imageUrl}
								className="img-fluid md:rounded-tl-md md:rounded-bl-md rtl:md:rounded-tl-none rtl:md:rounded-bl-none rtl:md:rounded-tr-md rtl:md:rounded-br-md h-full w-full csutom-lan-img"
								alt="..." />
						</Link>
					</div>
					<div className="md:col-span-8 col-span-12">
						<div className="box-body !p-4">
							<div className="hs-tooltip ti-main-tooltip]">
								<Link scroll={false} href="#!"
									className="ti-btn ti-btn-sm ti-btn-icon ti-btn-outline-light float-end text-textmuted dark:text-textmuted/50 md:!rounded-full hs-tooltip-toggle">
									<i className="ri-heart-line"></i>
									<span
										className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
										role="tooltip">
										Add to Wishlist
									</span>
								</Link>
							</div>
							<h5 className="card-title font-semibold mb-2">{card.title}</h5>
							<div className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-2">
								<span className=""><i className="bi bi-geo-alt me-1"></i>{card.location}</span>
								<span>,</span>
								<span className="">{card.date}</span>
							</div>
							{card.read && (
								<Link scroll={false} className="text-primary font-semibold" href="#!">Read More<i className="ri-arrow-right-s-line ms-1"></i></Link>
							)}

							<div className="flex justify-between flex-wrap gap-2">
								<h6 className="font-semibold mb-0 text-textmuted dark:text-textmuted/50">	{card.price}</h6>
								{card.view && (
									<Link scroll={false} href="#!"
										className="text-primary font-semibold text-[0.875rem]">
										View Details <i className="fe fe-arrow-right"></i>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkLandingAds;



