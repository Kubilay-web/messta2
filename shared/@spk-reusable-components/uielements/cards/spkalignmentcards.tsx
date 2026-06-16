
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'

interface Alignment {
    Imagesrc?: string
    Buttontext?: string;
    Text?: string;
    Title?: string;
    Customclass?: string;
    Customtitleclass?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkalignmentcards: React.FC<Alignment> = ({ Imagesrc, Customclass, Customtitleclass, Title, Text, Buttontext, Navigate }: any) => {
    return (
        <Fragment>
            <div className={`box ${Customclass}`}>
                <div className="box-body">
                    <div className="mb-2">
                        <span className="avatar avatar-md">
                            <Image fill src={Imagesrc} alt="img" className="!rounded-md" />
                        </span>
                    </div>
                    <h6 className={`box-title ${Customtitleclass}`}>{Title}</h6>
                    <p className="card-text mb-4">{Text}</p>
                    <Link scroll={false} href={Navigate} className="ti-btn ti-btn-primary">{Buttontext}</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Spkalignmentcards