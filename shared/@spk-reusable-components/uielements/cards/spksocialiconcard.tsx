import React, { Fragment } from 'react'
import SpkButton from '../spk-button';

import Image from 'next/image';

interface Social {
    Imgsrc?: string;
    Name?: string;
    Role?: string;
}
const SpkSocialiconcard: React.FC<Social> = ({ Name, Role, Imgsrc }: any) => {
    return (
        <Fragment>
            <div className="box text-center">
                <div className="box-header !border-b-0 pb-0">
                    <span className="ms-auto shadow-lg text-[17px]"><i
                        className="ri-heart-fill text-danger"></i></span>
                </div>
                <div className="box-body !pt-1">
                    <span className="avatar avatar-xl avatar-rounded me-2 mb-2">
                        <Image fill src={Imgsrc} alt="img" />
                    </span>
                    <div className="font-semibold text-[1rem]">{Name}</div>
                    <p className="mb-4 text-textmuted dark:text-textmuted/50 text-[11px]">{Role}</p>
                    <div className="btn-list">
                        <SpkButton variant="" buttontype="button" Label="button" customClass="ti-btn ti-btn-icon ti-btn-facebook btn-wave">
                            <i className="ri-facebook-line"></i>
                        </SpkButton>
                        <SpkButton variant="" buttontype="button" Label="button" customClass="ti-btn ti-btn-icon ti-btn-twitter btn-wave">
                            <i className="ri-twitter-x-line"></i>
                        </SpkButton>
                        <SpkButton variant="" buttontype="button" Label="button" customClass="ti-btn ti-btn-icon ti-btn-instagram btn-wave">
                            <i className="ri-instagram-line"></i>
                        </SpkButton>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SpkSocialiconcard