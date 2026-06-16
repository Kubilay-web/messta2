import React, { Fragment } from 'react';



const SpkSchoolCard = ({ card }: any) => {
	return (
		<Fragment>
			<div className="box">
				<div className="box-body !p-6">
					<div className="flex items-start gap-2 flex-wrap">
						<div className={`main-card-icon ${card.iconClass}`}>
							<div className={`avatar avatar-lg ${card.iconBorderClass}`}>
								<div className="avatar avatar-sm svg-white">
									{card.svg}
								</div>
							</div>
						</div>
						<div className="leading-none">
							<span className="block mb-3 font-medium">{ card.title }</span>
							<h4 className="font-medium mb-1">{ card.count }</h4>
							<span className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 mb-0"><span className={`${card.percentChangeClass} font-semibold`}>{ card.percentChange }<i className={`ri-arrow-${card.icon}-s-line align-middle mx-1`}></i></span> { card.timePeriod }</span>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkSchoolCard;
