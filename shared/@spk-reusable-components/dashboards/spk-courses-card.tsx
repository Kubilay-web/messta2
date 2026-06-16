import React, { Fragment } from 'react';

const SpkCoursesCard = ({ card }: any) => {

	return (
		<Fragment>

			<div className={`box ${card.boxClass} overflow-hidden`}>
				<div className="box-body !p-6">
					<span className="block mb-4">{card.title}</span>
					<h4 className="font-medium mb-2">{card.value}</h4>
					<span className="text-[0.75rem]">
						This Month <span className={`text-${card.percentageType} text-[0.75rem] font-medium ms-2 inline-block`}><i className={`ri-arrow-${ card.percentageType === 'success' ? 'up' : 'down' }-line me-1`}></i>{card.percentage}</span>
					</span>
					<span className="courses-main-cards-icon svg-white text-fixed-white">
					{card.svg}
					</span>
				</div>
			</div>
		</Fragment>
	);
}

export default SpkCoursesCard;

