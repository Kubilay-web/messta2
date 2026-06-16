import React from 'react';
import SpkButton from '../uielements/spk-button';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  Id: string;
  Mainid: string;
  Customclass: string;
  Custombodyclass?: string;
}

interface SpkAccordionsProps {
  items: AccordionItem[];
  Alwaysopen?: boolean;
  SvgIcon?: boolean;
  Titletext?: string;
  Toggleclass?: string;
  Groupclass?: string;
}

const SpkAccordions: React.FC<SpkAccordionsProps> = ({ items, Alwaysopen, SvgIcon = false, Titletext, Groupclass, Toggleclass }) => {


  return (
    <div className={`hs-accordion-group ${Groupclass}`} data-hs-accordion-always-open={Alwaysopen}>
      {items.map((item: any) => (
        <div className={`hs-accordion ${item.Customclass}`} id={item.Mainid} key={item.Id}>
          <SpkButton
            customClass={`hs-accordion-toggle ${Toggleclass} `}
            Controls={item.Id}
          >
            {Titletext === "before" ? item.title : ''}
            {SvgIcon ?
              <>
                <svg className={`hs-accordion-active:hidden ${item.Svgclass} `}
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> {item.Svgcontent1} </svg>
                <svg
                  className={`hs-accordion-active:block ${item.Svgclass1} `}
                  
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> {item.Svgcontent2}
                 
                </svg>
              </>
              : ""}
            {Titletext === "after" ? item.title : ''}
          </SpkButton>
          <div
            id={item.Id}
            className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${item.Custombodyclass}`}
            aria-labelledby={item.Mainid}
          >
            {/* <p className="text-gray-800 dark:text-gray-200"> */} 
            {item.content}
            {/* </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpkAccordions;
