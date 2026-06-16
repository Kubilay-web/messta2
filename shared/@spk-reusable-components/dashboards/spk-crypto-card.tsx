import React, { Fragment } from 'react';
import Spkapexcharts from '../spk-packages/apexcharts-component';
import Link from 'next/link';
import Image from 'next/image';

const SpkCryptoCard = ({ card }: any) => {

    return (
        <Fragment>
            <div className={`box overflow-hidden card-bg-${card.cardBgColor} border-0`}>
                <div className="box-body !p-0">
                    <div className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="flex items-center w-full">
                                <div className="me-2">
                                    <span className={`avatar avatar-sm custom-img avatar-rounded  p-1 bg-${card.imgBgcolor}/[0.15]`}>
                                        <Image fill src={card.img} alt="" />
                                    </span>
                                </div>
                                <div className="mb-0 font-medium flex-grow text-white">
                                    {card.title}
                                </div>
                                <div className="ti-dropdown hs-dropdown">
                                    <Link scroll={false} aria-label="anchor" href="#!"
                                        data-bs-toggle="dropdown">
                                        <i
                                            className="ri-more-fill text-[1.25rem] !text-white leading-none"></i>
                                    </Link>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                        <li><Link scroll={false} className="ti-dropdown-item"
                                            href="#!">Week</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item"
                                            href="#!">Day</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item"
                                            href="#!">Year</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <div>
                                <p className="mb-0 text-white">{card.coin} / USD</p>
                                <h4 className="mb-0 text-white font-medium"> {card.count} {card.coin} </h4>
                            </div>
                            <div className="ms-auto text-end">
                                <p className="mb-0 text-white">{card.text}</p>
                                <p className="mb-0 text-white"><span>Vol: </span>({card.vol})</p>
                            </div>
                        </div>
                    </div>
                    <div id={`${card.title.toLowerCase()}-chart`}>
                        <Spkapexcharts chartOptions={card.chartOptions} chartSeries={card.chartSeries} type="area" width={'100%'} height={60} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SpkCryptoCard;

