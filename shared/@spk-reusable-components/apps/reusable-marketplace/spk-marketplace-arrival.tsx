
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkMarketplaceArrival = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box card-style-5">
				<div className="box-body !p-4">
					<div className="grid grid-cols-12 gap-x-6">
						<div className="xl:col-span-4 col-span-4">
							<div className="img-box-1 bg-gray-300 dark:bg-light">
								<Link scroll={false} href="#!">
									<Image fill src={card.src} alt="img" className="img-fluid w-100 rounded-sm" />
								</Link>
							</div>
						</div>
						<div className="xl:col-span-8 col-span-8">
							<div className="flex items-start justify-between mb-3">
								<div className="flex-grow">
									<Link scroll={false} href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{card.subTitle}</Link>
									<h6 className="font-semibold mb-1"><Link scroll={false} href="#!">{card.title}</Link></h6>
									<div className="flex items-baseline text-[0.6875rem] flex-wrap">
										<div className="min-w-fit">
											<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
											<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
											<span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
											<span className="text-warning"><i className="bi bi-star-half"></i></span>
										</div>
										<p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
											<span>({card.ratings})</span>
											<span>Ratings</span>
										</p>
									</div>
								</div>
								<div className="min-w-fit">
									<div className="hs-tooltip ti-main-tooltip">
										<span
											className="hs-tooltip-toggle btn btn-wishlist btn-icon !rounded-full active">
											<i className="bi bi-heart outline1"></i>
											<i className="bi bi-heart-fill filled"></i>
											<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-xs !rounded-sm !font-medium !text-white shadow-sm " role="tooltip">
												wishlist
											</span>
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="font-semibold text-primary mb-0">{card.price}</h5>
								<div className="min-w-fit">
									<Link scroll={false} href="#!" className="ti-btn ti-btn-primary !m-0 border-0"><i className="ti ti-shopping-cart-plus me-1 inline-block"></i>Add</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</Fragment>
	);
}

export default SpkMarketplaceArrival;
