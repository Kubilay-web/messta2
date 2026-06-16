import React, { Fragment } from 'react';



const SpkMedicalCard = ({ card }: any) => {
	return (
		<Fragment>

			<div className={`box overflow-hidden medical-main-card ${card.boxClass}`}>
				<div className="box-body text-center !p-6">
					<div className={`main-card-icon ${card.iconClass}`}>
						<div className="avatar avatar-lg bg-primary/[0.15] border border-primary/10">
							<div className="avatar avatar-sm svg-white">
								{card.svg}
							</div>
						</div>
					</div>
					<h4 className="font-medium mb-2 mt-3">{ card.count }</h4>
					<span className="block mb-3">{ card.title }</span>
					<span className={`block font-medium ${card.percentageClass} leading-none`}><i className={card.percentageIcon}></i>{ card.percentage }</span>
				</div>
			</div>
		</Fragment>
	);
}

export default SpkMedicalCard;
