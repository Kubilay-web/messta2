import Link from 'next/link';
import React, { Fragment } from 'react'

interface CutomFooter {
  Title?: string;
  Text?: string;
  Imgsrc?: string;
  Linktext1?: string;
  Linktext2?: string;
  Subtitle?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}
const SpkCustomfootercard: React.FC<CutomFooter> = ({ Linktext1, Title, Subtitle, Text, Linktext2 , Navigate}) => {
  return (
    <Fragment>
      <div className="box">
            <div className="box-body">
                <h6 className="box-title font-medium mb-2">{Title}</h6>
                <p className="card-subtitle mb-3 text-textmuted dark:text-textmuted/50">{Subtitle}</p>
                <p className="card-text">{Text}</p>
            </div>
            <div className="box-footer">
                <Link scroll={false} href={Navigate} className="card-link text-danger m-1 ms-2"> {Linktext1}</Link>
                <Link scroll={false} href={Navigate} className="card-link text-success m-1">
                <u>{Linktext2}</u>
                </Link>
            </div>
        </div>
    </Fragment>
  )
}

export default SpkCustomfootercard