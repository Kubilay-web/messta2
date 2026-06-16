import React, { Fragment } from 'react';
import Spkapexcharts from '../spk-packages/apexcharts-component';

const SpkCrmCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="box-body !p-6">
					<div className="mb-4 flex items-start justify-between">
						<div className={`main-card-icon ${card.maincolor}`}>
							<div className={`avatar avatar-lg bg-${card.color}/[0.15] border border-${card.color}/10`}>
								<div className="avatar avatar-sm svg-white">
									{card.svgIcon}
								</div>
							</div>
						</div>
						<div id="total-customers">
							<Spkapexcharts chartOptions={card.chartOptions} chartSeries={card.chartSeries} type="area" width={100} height={50} />
						</div>
					</div>
					<h4 className="mb-2 font-medium">{card.count}</h4>
					<div className="flex items-center justify-between">
						<span className="text-textmuted dark:text-textmuted/50">{card.lable}</span>
						<span className={`badge bg-${card.badgeColor}/[0.15] text-${card.badgeColor}`}><i className={`ti ti-trending-${card.icon} me-1 align-middle`}></i>{card.badgeText}</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default SpkCrmCard;

