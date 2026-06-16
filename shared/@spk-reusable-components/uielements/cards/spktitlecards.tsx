
import React, { Fragment } from 'react'
import SpkButton from '../spk-button';
import Link from 'next/link';

import Image from 'next/image';

interface Titlecards {
  CustomBodyclass?: string;
  CustomHeaderclass?: string;
  Imgsrc?: string;
  Footertext?: string;
  Title?: string;
  Customclass?: string;
  Customfooterclass?: string;
  Icon?: string;
  LinkClass?: string;
  Icontag?: boolean;
  Linktag?: boolean;
  ButtonTag?: boolean;
  Cardheader?: boolean;
  Imagetag?: boolean;
  Cardfooter?: boolean;
  Anchortagbefore?: boolean;
  children?: React.ReactNode;
  OnclickFunc?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  Navigate?: string | URL; // Made optional
  AnchortagNavigate?: string | URL; // Made optional
}
const Spktitlecards: React.FC<Titlecards> = ({ ButtonTag, Imgsrc, Anchortagbefore = false, OnclickFunc, Navigate, AnchortagNavigate, Cardheader, Imagetag = false, Icontag = false, LinkClass, CustomBodyclass, Customfooterclass, Icon, Cardfooter, Customclass, CustomHeaderclass, children, Footertext, Title, Linktag }: any) => {
  return (
    <Fragment>
      <div className={`box ${Customclass}`}>
        {Imagetag ? <Image fill src={Imgsrc} className="card-img-top" alt="..." /> : ''}
        {Anchortagbefore && AnchortagNavigate && (<Link scroll={false} aria-label="anchor" href={AnchortagNavigate} className="card-anchor"></Link>)}
        {Cardheader ?
          <div className={`box-header ${CustomHeaderclass}`}>
            <div className="box-title">{Title}</div>
            {Linktag && Navigate && (<Link scroll={false} aria-label="anchor" href={Navigate} className={LinkClass} onClick={OnclickFunc}>
              {Icontag ? <i className={Icon}></i> : ''}
            </Link>
            )}
          </div>

          : ''}
        <div className={`box-body ${CustomBodyclass}`}>
          {children}
        </div>
        {Cardfooter ? <div className={`box-footer ${Customfooterclass}`}>
          {ButtonTag ? <SpkButton buttontype="button" customClass="ti-btn ti-btn-primary">Read More</SpkButton> : Footertext}
        </div>
          : ""}
      </div>
    </Fragment>
  )
}

export default Spktitlecards