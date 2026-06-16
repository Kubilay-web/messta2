
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkSwiperlanding = ({ card }: any) => {

    return (
        <Fragment>
            <div >
                <div className="flex items-center gap-2 flex-nowrap">
                    <div>
                        <span className={`avatar avatar-sm bg-${card.bg} svg-white avatar-rounded`}>
                            {card.src ? (
                                <Image fill src={card.src} alt="img" className="img-fluid w-full" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" height="24px" width="24px" fill="#000000">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z" />
                                </svg>
                            )}
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold mb-0">{card.name}</p>
                        <small className="text-textmuted dark:text-textmuted/50">{card.date}</small>
                    </div>
                    <p className="font-semibold">{card.price}</p>
                </div>
            </div>

        </Fragment>
    );
}

export default SpkSwiperlanding;
