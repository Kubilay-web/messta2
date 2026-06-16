import Link from 'next/link';
import React, { Fragment } from 'react';
import SpkOverlay from '../uielements/spk-overlay';

import Image from 'next/image';
interface SpkCandidateDetailsProps {

    object?: any;
}

const SpkCandidateDetails: React.FC<SpkCandidateDetailsProps> = ({ object, }) => {

    return (
        <Fragment>
            <div className="box">
                <div className="box-body">
                    <div className="flex mb-3 items-center flex-wrap gap-2">
                        <div>
                            <span className="avatar avatar-lg avatar-rounded">
                                <Image fill src={object.image} alt="" />
                            </span>
                        </div>
                        <div className="flex-grow">
                            <div className="font-medium mb-0 flex h5 items-center"><Link scroll={false} href="#!">{object.name}
                                <SpkOverlay>
                                    <span
                                        className="p-1 hs-tooltip-toggle">
                                        <i
                                            className="bi bi-check-circle-fill text-success !text-[1rem]"></i>
                                        <span
                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                            role="tooltip">
                                            Verified Candidate
                                        </span>
                                    </span>
                                </SpkOverlay>
                            </Link></div>
                            <div className="flex flex-wrap gap-2">
                                <Link scroll={false} href="#!">{object.jobTitle}</Link>
                                <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50"><i className="bi bi-geo-alt text-[0.6875rem]"></i> {object.location}</p>
                            </div>
                            <div className="flex flex-wrap items-center text-[0.75rem] text-textmuted dark:text-textmuted/50 ">
                                <p className="text-[0.75rem] mb-0">Ratings : </p>
                                <div className="min-w-fit ms-2">
                                    {object.ratings}
                                </div>
                                <Link href="#!" className="ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                    <span>{object.ratingCount}</span>
                                    <span> Ratings</span>
                                </Link>
                            </div>
                        </div>
                        <div className="btn-list float-end">
                            <SpkOverlay>
                                <button type="button"
                                    className="hs-tooltip-toggle avatar avatar-rounded avatar-sm bg-primary text-white me-1">
                                    <i className="bi bi-download"></i>
                                    <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                        role="tooltip">
                                        Download Resume
                                    </span>
                                </button>
                            </SpkOverlay>
                            <SpkOverlay>
                                <button type="button"
                                    className="hs-tooltip-toggle avatar avatar-rounded avatar-sm bg-light text-default border border-defaultborder dark:border-defaultborder/10 me-1">
                                    <i className="bi bi-heart"></i>
                                    <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                        role="tooltip">
                                        Add to Wishlist
                                    </span>
                                </button>
                            </SpkOverlay>
                            <SpkOverlay>
                                <button type="button"
                                    className="hs-tooltip-toggle avatar avatar-rounded avatar-sm bg-light text-default border border-defaultborder dark:border-defaultborder/10 me-1">
                                    <i className="bi bi-eye"></i>
                                    <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                        role="tooltip">
                                        View Profile
                                    </span>
                                </button>
                            </SpkOverlay>


                        </div>
                    </div>
                    <div className="popular-tags">
                        {object.labels.map(({ label, labelIcon }: any, index: any) => (

                            <Link scroll={false} key={index} href="#!" className="badge !rounded-full bg-light text-default me-1"><i className={` ${labelIcon}`}></i> {label}</Link>

                        ))}
                    </div>
                </div>
                <div className="box-footer">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h6 className="mb-0 font-medium">Skills :</h6>
                        <div className="popular-tags flex-grow-1">
                            {object.skillbdg.map((label: any, index: any) => (

                                <Link key={index} href="#!" className="badge !rounded-full bg-light text-default me-1"> {label}</Link>

                            ))}

                            <Link href="#!" className="badge !rounded-full bg-primary-transparent"><i className="bi bi-plus"></i> More</Link>
                        </div>
                        <div>
                            {object.bond && (
                                <SpkOverlay>
                                    <Link scroll={false} href="#!"
                                        className="badge badge-md !rounded-full bg-info/[0.15] text-info hs-tooltip-toggle">
                                        {object.bond} years bond
                                        accepted
                                        <span
                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                            role="tooltip">
                                            {object.bond} year bond accepted
                                        </span>
                                    </Link>
                                </SpkOverlay>

                            )}

                            <Link scroll={false} href="#!" className="badge badge-md !rounded-full bg-primary-transparent"><i className="bi bi-briefcase me-1"></i>Exp : {object.exp} Years</Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default SpkCandidateDetails;
