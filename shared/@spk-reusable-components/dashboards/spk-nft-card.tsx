import React, { Fragment } from 'react';

const SpkNftCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className={`box !bg-${card.color}/[0.15] shadow-none`}>
				<div className="box-body !p-6 !pe-5">
					<div className="flex items-center gap-3 flex-wrap xxl:flex-nowrap">
						<div className={`main-card-icon ${card.maincolor}`}>
							<div className={`avatar avatar-lg bg-${card.color}/[0.15] border border-${card.color}/10`}>
								<div className="avatar avatar-sm">
								{card.svgIcon}							
									</div>
							</div>
						</div>
						<div className="leading-none">
							<span className="block mb-1">{card.title}</span>
							<h5 className="font-medium block mb-0">{ card.value }<span className={`${card.trendColor} font-semibold text-[0.75rem] ms-2 inline-block`}>{ card.percentage }<i className={`ri-arrow-${card.trend}-s-line align-middle mx-1`}></i></span></h5>
						</div>
					</div>
				</div>
			</div>
			
		</Fragment>
	);
}

export default SpkNftCard;

