import React, { Fragment } from 'react'
import SpkDropdown from '../spk-dropdown';
import Link from 'next/link';

import Image from 'next/image';

interface Dropdowncardtype {
    Text?: string;
    Imgsrc?: string;
    Gender?: string;
    Date?: string;
    Role?: string;
    Title?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}

const SpkDropdowncard: React.FC<Dropdowncardtype> = ({ Text, Imgsrc, Gender, Date, Role, Title, Navigate }: any) => {
    return (
        <Fragment>
            <div className="box">
                <div className="box-header">
                    <div className="flex align-center w-full">
                        <div className="me-2">
                            <span className="avatar avatar-rounded">
                                <Image fill src={Imgsrc} alt="img" />
                            </span>
                        </div>
                        <div className="">
                            <div className="text-[15px] font-medium">{Title}</div>
                            <p className="mb-0 text-textmuted dark:text-textmuted/50 text-[11px]">{Gender}
                            </p>
                        </div>
                        <SpkDropdown Icon={true} Customclass="ms-auto my-auto" Linktag={true} arialexpand={false} IconClass="fe fe-more-vertical"
                            Linkclass="ti-btn ti-btn-icon ti-btn-sm ti-btn-light !mb-0">
                            <li><Link scroll={false} className="ti-dropdown-item" href={Navigate}>Week</Link></li>
                            <li><Link scroll={false} className="ti-dropdown-item" href={Navigate}>Month</Link></li>
                            <li><Link scroll={false} className="ti-dropdown-item" href={Navigate}>Year</Link></li>
                        </SpkDropdown>
                    </div>
                </div>
                <div className="box-body">
                    {Text}
                </div>
                <div className="box-footer">
                    <div className="flex justify-between flex-wrap gap-2">
                        <div className="fs-semibold text-[14px]">{Date}</div>
                        <div className="font-medium text-success">{Role}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SpkDropdowncard