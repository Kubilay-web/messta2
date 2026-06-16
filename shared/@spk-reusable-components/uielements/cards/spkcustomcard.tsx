
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'

interface CutomCard {
  Title?: string;
  Text?: string;
  Imgsrc?: string;
  Linktext1?: string;
  Linktext2?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}

const SpkCustomcard: React.FC<CutomCard> = ({ Imgsrc, Text, Title, Linktext1, Linktext2, Navigate }: any) => {
  return (
    <Fragment>
      <div className="box">
        <Image fill src={Imgsrc} className="card-img-top" alt="..." />
        <div className="box-body">
          <h6 className="box-title font-semibold">{Title}</h6>
          <p className="card-text">{Text}</p>
        </div>
        <ul className="ti-list-group list-group-flush !rounded-none">
          <li className="ti-list-group-item">An item</li>
          <li className="ti-list-group-item">A second item</li>
        </ul>
        <div className="box-body">
          <Link scroll={false} href={Navigate} className="card-link text-primary !text-[0.75rem] me-3">{Linktext1}</Link>
          <Link scroll={false} href={Navigate} className="card-link text-secondary  !text-[0.75rem] inline-block">{Linktext2}</Link>
        </div>
      </div>
    </Fragment>
  )
}

export default SpkCustomcard