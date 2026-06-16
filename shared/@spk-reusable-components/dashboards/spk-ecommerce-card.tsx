import React, { Fragment } from 'react';

const SpkEcommerceCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="box-body !p-6">
					<div className={`main-card-icon ${card.maincolor} mb-4`}>
						<div className={`avatar avatar-lg bg-${card.color}/[0.15] border border-${card.color}/10`}>
							<div className="avatar avatar-sm svg-white">
								{card.svg}
							</div>
						</div>
					</div>
					<span className="block mb-2">{card.title}</span>
					<h4 className="mb-2 font-medium">{card.value}</h4>
					<span className={card.trendColor}>{card.percentage}<i className={`ti ti-arrow-narrow-${card.trend} ms-1 d-inline-block`}></i></span>
					<span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 ms-1">This week</span>
				</div>
			</div>
		</Fragment>
	);
}

export default SpkEcommerceCard;

