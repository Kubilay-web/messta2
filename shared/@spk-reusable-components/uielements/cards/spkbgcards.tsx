

import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'

interface cardprops {
    Title?: string;
    color?: string;
    Customclass?: string;
    Value?: string;
    Imgsrc?: string
    Textclass?: string
    Class?: string
    Imgclass?: string
    Linktag?: boolean;
    Navigate: string | URL;
}
const Spkbgcards: React.FC<cardprops> = ({ Title, Linktag, Customclass, color, Value, Imgsrc, Imgclass, Class, Textclass, Navigate }: any) => {
    return (
        <Fragment>
            <div className={`box  !bg-${color} ${Customclass}`}>
                <div className="box-body">
                    <div className="flex items-center w-full">
                        <div className="me-2">
                            <span className="avatar avatar-rounded">
                                <Image fill src={Imgsrc} alt="img" className={Imgclass} />
                            </span>
                        </div>
                        <div className="">
                            <div className={`text-[15px] font-medium !text-${Textclass}`}>{Title}</div>
                            <p className={`mb-0 text-${Textclass}  opacity-70 text-xs`}>{Value}</p>
                        </div>
                        <div className="ms-auto">
                            {Linktag ?
                                <Link aria-label="anchor" scroll={false} href={Navigate} className={`text-${Class}`}><i className="bi bi-three-dots-vertical"></i></Link> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Spkbgcards