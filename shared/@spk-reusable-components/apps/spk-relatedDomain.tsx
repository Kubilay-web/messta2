import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
interface SpkrelatedDomainProps { object?: any }

const SpkrelatedDomain: React.FC<SpkrelatedDomainProps> = ({ object }) => {
    return (
        <Fragment>
            <div className="box">
                <div className="box-body p-4">
                    <div className="flex gap-4">
                        {object.src ? (
                            <div className="avatar avatar-lg bg-primary/[0.15] svg-primary shrink-0">
                                <Image fill src={object.src} alt="img" className="img-fluid w-full rounded-sm" />
                            </div>
                        ) : (
                            <div className={`avatar avatar-lg bg-${object.bgColor}/[0.15] svg-primary`}>
                                {object.icon}
                            </div>
                        )}
                        <div className="flex-grow">
                            <div className="mb-4">
                                <h6 className="font-semibold mb-1 sm:text-[1.125rem] break-all">{object.title}</h6>
                                <div className="flex items-baseline text-[0.6875rem]">
                                    <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 me-2">
                                        <span className=""><i className="bi bi-geo-alt me-1"></i>USA</span>
                                        <span>,</span>
                                        <span className="">25 Feb 2024</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <h6 className="font-semibold mb-0 flex items-center gap-2">{object.price} <span className="badge bg-danger/[0.15] text-danger">{object.bids} Bids</span></h6>
                                <div className="min-w-fit">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-primary !border-0">Bid Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SpkrelatedDomain

