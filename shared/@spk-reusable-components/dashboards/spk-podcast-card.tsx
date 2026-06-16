import React, { Fragment } from 'react';
import SpkDropdown from '../uielements/spk-dropdown';
import Link from 'next/link';
import Image from 'next/image';



const SpkPodcastCard = ({ card }: any) => {
	return (
		<Fragment>
			<div className="box">
				<div className="grid grid-cols-12 gap-0">
					<div className="md:col-span-3 custom-img col-span-12 relative">
						<Image fill src={card.image} className="img-fluid  rounded-tl-sm rounded-bl-sm rtl:rounded-tl-none rtl:rounded-bl-none rtl:rounded-tr-sm rtl:rounded-br-sm w-full h-full" alt="..." />
					</div>
					<div className="md:col-span-9 col-span-12">
						<div className="box-body !p-6">
							<div className="flex items-start justify-between mb-5">
								<div>
									<Link scroll={false} href="#!"><h6 className="font-medium mb-0">{card.title}</h6></Link>
									<span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">By {card.author}</span>
								</div>
								<SpkDropdown Linktag={true} Linkclass="text-[0.75rem] text-textmuted dark:text-textmuted/50"
									Icon={true} IconClass="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50">
									<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Week</Link></li>
									<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Day</Link></li>
									<li><Link scroll={false} className="ti-dropdown-item" href="#!"> Year</Link></li>
								</SpkDropdown>
							</div>
							<div className="flex items-end justify-between">
								<div className="flex items-center gap-4 leading-none">
									<span className="block  items-center gap-2 text-textmuted dark:text-textmuted/50 text-[0.75rem] leading-none"><i className="ri-time-line leading-none align-middle text-[0.875rem] me-1"></i>{card.duration}</span>
									<span className="block items-center gap-2 text-[0.875rem] font-medium leading-none"><i className="ri-volume-up-line leading-none align-middle text-[0.875rem] me-1"></i>{card.listeners}</span>
								</div>
								<div>
									<button className="ti-btn ti-btn-soft-secondary ti-btn-icon ti-btn-sm btn-wave">
										<i className="ri-play-fill"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkPodcastCard;
