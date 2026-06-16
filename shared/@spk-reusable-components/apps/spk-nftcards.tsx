import Link from 'next/link';
import React, { Fragment } from 'react';
import SpkBadge from '../uielements/spk-badge';

import Image from 'next/image';

interface SpkNftCardProps {
    imgSrc: string;
    ethlogo: string;
    time?: number | string;
    title?: string;

    clientName?: string;

    count?: number | string;

}

const SpkNftcards: React.FC<SpkNftCardProps> = ({ imgSrc, time, title, clientName, count, ethlogo
}) => {
    return (
        <Fragment>

            {/*<div className="box">*/}
            <div className="box-body">
                <Link scroll={false} href="#!" className="stretched-link"></Link>
                <div className="relative">
                    <Image fill priority src={imgSrc} className="card-img mb-4" alt="..." />
                    <p className="mb-0 text-white nft-auction-time"> {time} </p>
                </div>
                <p className="text-[0.875rem] font-semibold mb-2">{title}</p>
                <div className="flex mb-4 items-center flex-wrap gap-2 justify-between">
                    <div>
                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 block mb-1">Created By</span>
                        <span className="font-medium block leading-none">{clientName}</span>
                    </div>
                    <div className="text-end">
                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 block mb-1">Top Bid</span>
                        <div className="flex items-center">
                            <span className="avatar avatar-xs">
                                <Image width={20} height={20} src={ethlogo} alt="" />
                            </span>
                            <span className="ms-1 font-medium">{count}</span>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <button className="ti-btn ti-btn-light btn-wave">
                        Place BId
                    </button>
                </div>
            </div>
            {/*</div>*/}



        </Fragment>
    );
};

export default SpkNftcards;
