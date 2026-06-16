import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkPackagesCard = ({ card }: any) => {

	return (
		<Fragment>

			<div className={`box overflow-hidden ${card.discount ? '!border !border-primary pricing-offer' : ''}`}>
				<div className="box-body !p-0">
					<div className="p-6">
						{card.discount && (
							<div className="ribbon ribbon-primary ribbon-top-right">
								<span>{card.discount}</span>
							</div>
						)}
						<div className="flex gap-4 items-center mb-3">
							<div className={`main-card-icon ${card.bg1}`}>
								<div className={`avatar avatar-lg bg-${card.bg}/[0.15] border border-${card.Bgborder}`}>
									<div className="avatar avatar-sm svg-white">
										<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
											<rect width="256" height="256" fill="none" />
											<path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2" />
											<polyline points="32.7 76.92 128 129.08 223.3 76.92" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
											<path d="M131.84,25l88,48.18a8,8,0,0,1,4.16,7v95.64a8,8,0,0,1-4.16,7l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18A8,8,0,0,1,131.84,25Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
											<line x1="128" y1="129.09" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
										</svg>
									</div>
								</div>
							</div>
							<div>
								<div className="text-[1.125rem] font-medium">{card.title}</div>
								<span className="badge bg-gray-300 dark:bg-light text-default font-medium">For {card.type}</span>
							</div>
						</div>
						<div className="text-[1.5625rem] font-medium mb-1">
							{card.price}
							<sub className="text-textmuted dark:text-textmuted/50 font-medium text-[0.6875rem]">
								{card.pricePeriod}
							</sub>
						</div>
						<div className="mb-2 text-textmuted dark:text-textmuted/50">{card.description}</div>
						<ul className="list-unstyled mb-0">
							{card.features.map((feature:any, index:any) => (
								<li key={index} className="flex items-center mb-4">
									<span className="me-2">
										<i className={`ri-checkbox-circle-line text-[0.9375rem] ${feature.chekboxclass}`} ></i>
									</span>
									<span>
										{feature.label && (
											<span className="me-1 inline-block font-semibold">{feature.label}</span>
										)}
										{feature.label1}
									</span>
								</li>
							))}
						</ul>
						<div className="grid">
							<button className="ti-btn ti-btn-lg ti-btn-primary btn-wave">{card.buttonLabel}</button>
						</div>
					</div>
				</div>
			</div>


		</Fragment>
	);
}

export default SpkPackagesCard;
