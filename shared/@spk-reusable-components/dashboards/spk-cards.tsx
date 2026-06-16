import React, { Fragment } from 'react';

const Spkcardscomponent = ({ card }:any) => {

    return (
        <Fragment>
            <div className="box main-card">
                <div className="box-body !p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div>
                                <span className="block mb-1">{card.title}</span>
                                <h5 className="mb-5 text-[1.5rem] font-medium">{card.value}</h5>
                            </div>
                            <span className={`${card.trendColor} me-2 inline-block`}><i
                                className={`ti ${card.trendIcon} text-[1.25rem] align-middle me-1 inline-block`}></i>{card.percentage}</span><span
                                    className="text-textmuted dark:text-textmuted/50">{card.description}</span>
                        </div>
                        <div>
                            <div className={`main-card-icon ${card.iconColor1}`}>
                                <div className={`avatar avatar-lg !mb-0 bg-${card.iconColor}/[0.15] border border-${card.iconColor}/10`}>
                                    <div className="avatar avatar-sm !mb-0 svg-white">
                                        {card.svg}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Spkcardscomponent;



