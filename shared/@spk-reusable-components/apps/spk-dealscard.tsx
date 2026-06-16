import React from 'react';
import Link from 'next/link';

import Image from 'next/image';

interface SpkDealsCardProps {
    img?: string;
    title?: string;
    date?: string;

    amount?: string;
    company?: string;
    initials?: string

}

const SpkDealsCard: React.FC<SpkDealsCardProps> = ({ img, title, date, amount, company, initials }) => {
    return (
        <div className="box custom-box">
            <div className="box-body">
                <div className="flex items-center font-medium justify-between gap-1 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="lh-1">
                            <span className="avatar avatar-sm avatar-rounded">
                                {initials ? (
                                    <span className="avatar avatar-sm avatar-rounded text-white">
                                        PL
                                    </span>
                                ) : (
                                    <Image fill src={img} alt="" />
                                )
                                }
                            </span>
                        </div>
                        <div className="text-sm">{title}</div>
                    </div>
                    <div>{amount}</div>
                </div>
                <div className="deal-description">
                    <div className="my-1">
                        <Link href="#!" className="company-name">{company}</Link>
                    </div>
                    <div className="text-muted text-xs">{date}</div>
                </div>
            </div>
        </div>

    );
};

export default SpkDealsCard;
