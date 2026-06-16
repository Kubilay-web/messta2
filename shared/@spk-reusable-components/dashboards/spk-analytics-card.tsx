import React, { Fragment } from 'react';
import SpkDropdown from '../uielements/spk-dropdown';
import Link from 'next/link';

const SpkAnalyticsCard = ({ card }: any) => {

    return (
        <Fragment>
            <div className="box">
                <div className="box-body !p-6">
                    <div className="flex items-start justify-between">
                        <div className={`main-card-icon ${card.icon1}`}>
                            <div className={`avatar avatar-lg mb-0 bg-${card.icon}/[0.15] border border-${card.icon}/10`}>
                                <div className="avatar avatar-sm !mb-0">
                                    {card.svg}
                                </div>
                            </div>
                        </div>
                        <SpkDropdown Linktag={true} Linkclass="text-[0.75rem] text-textmuted dark:text-textmuted/50"
                                  Icon={true} IconClass="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50">
                                <li><Link scroll={false} className="ti-dropdown-item" href="#!"> Week</Link></li>
                                <li><Link scroll={false} className="ti-dropdown-item" href="#!"> Day</Link></li>
                                <li><Link scroll={false} className="ti-dropdown-item" href="#!"> Year</Link></li>
                            </SpkDropdown>
                       
                    </div>
                    <span className="block mt-3 mb-2 font-medium">{ card.title }</span>
                    <div className="flex items-center justify-between">
                        <h5 className="text-[1.5rem] mb-0 leading-none font-medium">{ card.value }</h5>
                        <span className={`badge bg-${card.badgeClass}/[0.15] text-${card.badgeClass}`}>
                        { card.percentage }
                        </span>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default SpkAnalyticsCard;

