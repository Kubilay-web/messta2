
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkBrowserDomain = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="box-body">
					<div className="btn-list float-end">
						<div className="hs-tooltip ti-main-tooltip">
							<Link scroll={false} href="#!" className="wishlist-icon hs-tooltip-toggle">
								<i className="bi bi-heart"></i>
								<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
									Add to wishlist
								</span>
							</Link>
						</div>
					</div>
					<div className="flex items-center flex-wrap gap-3 mb-3">
						<div>
							{card.image ? (
								<span className="avatar avatar-xl bg-primary/[0.15]">
									<Image fill src={card.image} alt="img" className="img-fluid w-full rounded-1" />
								</span>
							) : (
								<span className={`domain-icon avatar avatar-xl bg-${card.bgColor}/[0.15] svg-${card.bgColor} ${card.bgColor}`}>
									{card.icon}
								</span>
							)}
						</div>
						<div className="">
							<span
								className="badge !rounded-full h5 bg-danger/[0.15] text-danger mb-1">{card.badge}</span>
							<div className="font-semibold mb-0 flex h5 items-center">
								<Link href="/domain/domain-details"> {card.title}
									<div className="hs-tooltip ti-main-tooltip">
										<span className="p-1 hs-tooltip-toggle">
											<i className="bi bi-check-circle-fill text-success ms-2 !text-[1rem]"></i>
											<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
												Verified Domain
											</span>
										</span>
									</div>
								</Link>
							</div>
							<Link scroll={false} href="#!">
								<i className="bi bi-geo-alt text-[0.6875rem]"></i>
								{card.loction}
							</Link>
						</div>
					</div>
					<div className="hs-tooltip ti-main-tooltip float-end">
						<span
							className="text-danger float-end hs-tooltip-toggle">
							<i className="bi bi-exclamation-circle me-1"></i>{card.days} Days Left
							<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
								Valid Till
							</span>
						</span>
					</div>
					<div className="popular-tags">
						<Link scroll={false} href="#!" className="badge !rounded-full bg-gray-300 dark:bg-light text-default !me-1">
							<i className="bi bi-geo-alt text-muted me-1"></i> Net Profit : {card.profit}
						</Link>
						<Link scroll={false} href="#!" className="badge !rounded-full bg-gray-300 dark:bg-light text-default">
							<i className="bi bi-briefcase text-muted me-1"></i> Industry : {card.industry}
						</Link>
					</div>
				</div>
				<div className="box-footer">
					<div className="flex items-center flex-wrap gap-2">
						<div className="flex-grow ">
							<div className="hs-tooltip ti-main-tooltip !me-1">
								<Link scroll={false} href="#!" className="badge badge-md !rounded-full bg-info/[0.15] text-info hs-tooltip-toggle">
									<i className="bi bi-people me-1"></i>Domain Age : {card.age} years
									<span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
										Domains Age
									</span>
								</Link>
							</div>
							<Link scroll={false} href="#!" className="badge badge-md !rounded-full bg-primary/[0.15] text-primary">
								<i className="bi bi-briefcase me-1"></i>Bids : {card.bids}
							</Link>
						</div>
						<Link scroll={false} href="#!" className="ti-btn btn-wave ti-btn-primary">
							View <i className="ri-arrow-right-line rtl:rotate-180"></i>
						</Link>
					</div>
				</div>
			</div>


		</Fragment>
	);
}

export default SpkBrowserDomain;
