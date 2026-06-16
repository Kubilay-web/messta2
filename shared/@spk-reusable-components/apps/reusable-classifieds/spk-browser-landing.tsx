import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkBrowserLanding = ({ card }: any) => {

    return (
        <Fragment>
            <div className="box">
                <div className="box-body rounded-md">
                    <div className={`main-card-icon ${card.bg1} mb-3`}>
                        <div className={`avatar avatar-lg bg-${card.bg}/[0.15] border ${card.borderColor}`}>
                            <div className="avatar avatar-sm svg-white">
                                {card.svg}
                            </div>
                        </div>
                    </div>
                    <Link scroll={false} href="#!">
                        <h5 className="font-semibold mb-0">{card.title}</h5>
                    </Link>
                    <p className="mb-2"><span className="text-default font-semibold "> {card.items} Items </span> available</p>
                    <Link scroll={false} className="text-primary font-semibold" href="#!">Explore items<i
                        className="ri-arrow-right-s-line align-middle ms-1  rtl:!rotate-180 inline-flex"></i></Link>
                </div>
            </div>

        </Fragment>
    );
}

export default SpkBrowserLanding;
