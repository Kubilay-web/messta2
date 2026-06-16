import React, { Fragment } from 'react';
import SpkDropdown from '../uielements/spk-dropdown';
import Link from 'next/link';
import Spkapexcharts from '../spk-packages/apexcharts-component';

const SpkSocialmediaCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box">
				<div className="box-body">
					<div className="flex align-items-start gap-4">
						<div className={`main-card-icon ${card.bgClass}`}>
							<div className={`avatar avatar-lg ${card.svgClass}`}>
								<div className="avatar avatar-sm svg-white">
									{card.svg}
								</div>
							</div>
						</div>
						<div className="flex-grow">
							<h5 className="text-[1.5rem] mb-1 font-medium">{ card.count }</h5>
							<span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">{ card.label }<span className="text-success ms-2 inline-block">{ card.percentage }<i className="ti ti-arrow-narrow-up"></i></span></span>
							<div id={card.chartId} className="mt-4">
								<Spkapexcharts chartOptions={card.YoutubeOptions} chartSeries={card.YoutubeSeries} type="area" width={100} height={30} />
							</div>
						</div>
						<div>
							<SpkDropdown Linktag={true} Linkclass="text-[0.75rem] text-textmuted dark:text-textmuted/50"
								Icon={true} IconClass="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50">
								<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Week</Link></li>
								<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Day</Link></li>
								<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Year</Link></li>
							</SpkDropdown>
						</div>
					</div>
				</div>
			</div>
			

		</Fragment>
	);
}

export default SpkSocialmediaCard;

