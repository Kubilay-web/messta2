import React, { Fragment } from 'react';

const SpkJobsCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="box-body !p-2">
					<div
						className={`flex items-center justify-between bg-${card.bgClass}/[0.15] p-4 rounded flex-wrap gap-3`}>
						<div className="flex-grow">
							<span className="block mb-2 text-default">{card.title}</span>
							<div className="flex items-end">
								<h4 className="font-medium mb-0 leading-none">{card.value}</h4>
								<span className={`block ${card.changeClass} ms-2 font-medium`}>{card.change}<i
									className={`ti ${card.changeIcon}`}></i></span>
							</div>
						</div>
						<div className={`main-card-icon ${card.iconClass}`}>
							<div
								className={`avatar avatar-lg bg-${card.iconBorderClass}/[0.15] border border-${card.iconBorderClass}/10`}>
								<div className="avatar avatar-sm svg-white">
								{card.svg}	
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			

		</Fragment>
	);
}

export default SpkJobsCard;

