
import Image from 'next/image';
import React, { Fragment } from 'react'

interface Imgoverlay {
  Imgsrc: string
  Footertext?: string;
  Overlayclass?: string;
  CustomTitleclass?: string;
  Customimgclass?: string;
  Custombodyclass?: string;
  Customfooterclass?: string;
  Text?: string;
  Title?: string;
  CustomClass?: string;
  children?: React.ReactNode;
  CardHeader?: boolean;
  CardFooter?: boolean;
}

const Spkimageoverlaycard: React.FC<Imgoverlay> = ({ Imgsrc, CustomClass, CardHeader = true, Overlayclass, CardFooter = true, Footertext, Customfooterclass, Custombodyclass, CustomTitleclass, Customimgclass, Title, children }) => {
  return (
    <Fragment>
      <div className={`box overlay-box ${CustomClass}`}>
      <Image fill src={Imgsrc} className={Customimgclass} alt="..." />
            <div className={`box-img-overlay flex flex-col p-0 ${Overlayclass}`}>
                {CardHeader ?
                    <div className="box-header !border-b !border-defaultborder/10">
                        <div className={`box-title ${CustomTitleclass}`}>
                            {Title}
                        </div>
                    </div>
                :""}
                <div className={`box-body ${Custombodyclass}`}>
                    {children}
                </div>
                {CardFooter ?  <div className={`box-footer ${Customfooterclass}`}>{Footertext}</div> :""}
            </div>
        </div>
    </Fragment>
  )
}

export default Spkimageoverlaycard