import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkStepsCard = ({ card }: any) => {

	return (
		<Fragment>
			<div className={`box ${card.boxClass} steps-card`}>
				<div className="box-body rounded-md">
					{card.bg ? (
						<div className={`main-card-icon ${card.bg} mb-4`}>
							<div className={`avatar avatar-lg bg-${card.bg}/[0.15] border border-${card.bg}/10`}>
								<div className="avatar avatar-sm svg-white">{card.iconSvg}</div>
							</div>
						</div>
					) : (
						<div className="mb-4 ms-1">
							<span className="feature-style-icon bg-primary/[0.15] svg-primary">{card.iconSvg}</span>
						</div>
					)}

					<h5 className="font-semibold">{ card.title }</h5>
					<p className="opacity-80 mb-4">{ card.description }</p>
					<Link scroll={false} className={`text-${card.bg1} font-semibold`} href="#!">{ card.linkText }<i
						className="ri-arrow-right-s-line align-middle rtl:!rotate-180 inline-flex"></i></Link>
				</div>
			</div>


		</Fragment>
	);
}

export default SpkStepsCard;
