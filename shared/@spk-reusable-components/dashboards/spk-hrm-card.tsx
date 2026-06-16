import React, { Fragment } from 'react';
import Spkapexcharts from '../spk-packages/apexcharts-component';

const SpkHrmCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box !border-b-0 overflow-hidden !shadow-none">
				<div className="box-body !p-0">
					<div className="p-4">
						<div className={`main-card-icon ${card.maincolor}`}>
							<div className={`avatar avatar-lg bg-${card.color}/[0.15] border border-${card.color}/10`}>
								<div className="avatar avatar-sm svg-white">
									{card.svgIcon}
								</div>
							</div>
						</div>
						<span className="block text-textmuted dark:text-textmuted/50 mb-1 mt-3">{card.lable}</span>
						<h4 className="font-medium mb-0">{card.count}<span className={`text-[0.75rem] text-${card.iconColor} ms-2`}><i className={`ri-arrow-${card.icon}-s-line text-[1rem] align-middle me-1`}></i>{card.text}</span></h4>
					</div>
					<div id="total-employees">
						<Spkapexcharts chartOptions={card.chartOptions} chartSeries={card.chartSeries} type="area" width={'100%'} height={50} />
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkHrmCard;

