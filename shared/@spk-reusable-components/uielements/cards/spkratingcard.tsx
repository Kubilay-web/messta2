
import Image from 'next/image';
import React, { Fragment } from 'react'

interface ratingcard {
    Timevalue?: string
    Text?: string;
    Title?: string;
    Imgsrc?: string;
    Name?: string;
}
const Spkratingcard: React.FC<ratingcard> = ({ Timevalue, Title, Text, Imgsrc, Name }: any) => {
    return (
        <Fragment>
            <div className="box">
                <div className="box-header border-b-0 pb-0">
                    <div>
                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                        <span className="text-black/10"><i className="bi bi-star-fill"></i></span>
                        <p className="block text-textmuted dark:text-textmuted/50 mb-0 text-xs font-medium">{Timevalue}</p>
                    </div>
                </div>
                <div className="box-body pt-3">
                    <div className="font-medium text-[15px] mb-2">{Title}</div>
                    {Text}
                </div>
                <div className="box-footer">
                    <div className="flex align-center">
                        <span className="avatar avatar-sm avatar-rounded me-2">
                            <Image fill src={Imgsrc} alt="img" />
                        </span>
                        <div className="font-medium text-[14px]">{Name}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Spkratingcard