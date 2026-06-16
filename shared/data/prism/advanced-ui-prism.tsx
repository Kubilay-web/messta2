export const data1=`export const Basicaccordion =[
  {
      Id: 'hs-basic-collapse-one',
      title: 'Accordion #1',
      Customclass:'active',
      content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
      Mainid:"hs-basic-heading-one",
      Custombodyclass:"",
      Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
      Svgcontent2:<><path d="M5 12h14" /></>
    },
    {
      Id: 'hs-basic-collapse-two',
      title: 'Accordion #2',
      Customclass:'',
      content:  <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
      Mainid:"hs-basic-heading-two",
       Custombodyclass:"hidden",
       Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
       Svgcontent2:<><path d="M5 12h14" /></>
    },
    {
      Id: 'hs-basic-collapse-three',  
      title: 'Accordion #3',
      Customclass:'',
      content:  <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
      Mainid:"hs-basic-heading-three",
       Custombodyclass:"hidden",
       Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
       Svgcontent2:<><path d="M5 12h14" /></>
    }
]`
export const reactaccordion1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
    <div className="hs-accordion active" id="hs-basic-heading-one">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-collapse-one">
        <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
        Accordion #1
      </button>
      <div id="hs-basic-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>
  
    <div className="hs-accordion" id="hs-basic-heading-two">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-collapse-two">
        <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
        Accordion #2
      </button>
      <div id="hs-basic-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-two">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>
  
    <div className="hs-accordion" id="hs-basic-heading-three">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-collapse-three">
        <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
        Accordion #3
      </button>
      <div id="hs-basic-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-three">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>
  </div>
// End Prism Code//`;
export const reuseaccordion1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions items={Basicaccordion} SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />
// End Prism Code//`;

export const data2=`export const Alwaysopendata =[
{
    Id: 'hs-basic-always-open-collapse-one',
    title: 'Accordion #1',
    Customclass:'active',
    content: <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is
    hidden by default, until the collapse plugin adds the
    appropriate classes that we use to style each element. These
    classes control the overall appearance, as well as the
    showing and hiding via CSS transitions.
  </p>,
    Mainid:"hs-basic-always-open-heading-one",
    Custombodyclass:"",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-always-open-collapse-two',
  title: 'Accordion #2',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-always-open-heading-two",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-always-open-collapse-three',  
  title: 'Accordion #3',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-always-open-heading-three",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
}
]`
export const reactaccordion2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group" data-hs-accordion-always-open>
<div className="hs-accordion active" id="hs-basic-always-open-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-one">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #1
</button>
<div id="hs-basic-always-open-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-one">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-always-open-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-two">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #2
</button>
<div id="hs-basic-always-open-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-always-open-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-three">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #3
</button>
<div id="hs-basic-always-open-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions Alwaysopen={true} items={Alwaysopendata} SvgIcon={true}  Titletext="after" Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data3=`export const Nestingarrow =[
{
    Id: 'hs-basic-nested-collapse-one',
    title: 'Accordion #1',
    Customclass:'active',
    content:  
    <SpkAccordions items={Subnest} SvgIcon={true} Titletext="after" Groupclass="ps-6" Toggleclass="hs-accordion-toggle hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />,
    Mainid:"hs-basic-nested-heading-one",
    Custombodyclass:"",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-nested-collapse-two',
  title: 'Accordion #2',
  Customclass:'',
  content:     <p className="text-gray-800 dark:text-gray-200">
  <em>This is the second item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-nested-heading-two",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
  Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-nested-collapse-three',  
  title: 'Accordion #3',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the first item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-nested-heading-three",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
  Svgcontent2:<><path d="M5 12h14" /></>
}
]`

export const reactaccordion3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active" id="hs-basic-nested-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-one">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #1
</button>
<div id="hs-basic-nested-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-one">
  <div className="hs-accordion-group ps-6">
    <div className="hs-accordion active" id="hs-basic-nested-sub-heading-one">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
        <svg className="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg className="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Sub accordion #1
      </button>
      <div id="hs-basic-nested-sub-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-one">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>

    <div className="hs-accordion" id="hs-basic-nested-sub-heading-two">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-two">
        <svg className="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg className="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Sub accordion #2
      </button>
      <div id="hs-basic-nested-sub-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-two">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>

    <div className="hs-accordion" id="hs-basic-nested-sub-heading-three">
      <button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-three">
        <svg className="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg className="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Sub accordion #3
      </button>
      <div id="hs-basic-nested-sub-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-three">
        <p className="text-gray-800 dark:text-gray-200">
          <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
        </p>
      </div>
    </div>
  </div>
</div>
</div>

<div className="hs-accordion" id="hs-basic-nested-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-two">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #2
</button>
<div id="hs-basic-nested-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-nested-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-three">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #3
</button>
<div id="hs-basic-nested-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Nestingarrow} SvgIcon={true}  Titletext="after" Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data4=`export const NoArrowdata =[
{
    Id: 'hs-basic-no-arrow-collapse-one',
    title: 'Accordion #1',
    Customclass:'active',
    content: <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is
    hidden by default, until the collapse plugin adds the
    appropriate classes that we use to style each element. These
    classes control the overall appearance, as well as the
    showing and hiding via CSS transitions.
  </p>,
    Mainid:"hs-basic-no-arrow-heading-one",
    Custombodyclass:"",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-no-arrow-collapse-two',
  title: 'Accordion #2',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-no-arrow-heading-two",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-no-arrow-collapse-three',  
  title: 'Accordion #3',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-no-arrow-heading-three",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-no-arrow-collapse-four',  
  title: 'Accordion #4',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-no-arrow-heading-four",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-no-arrow-collapse-five',  
  title: 'Accordion #5',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
    Mainid:"hs-basic-no-arrow-heading-five",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
},
{
  Id: 'hs-basic-no-arrow-collapse-six',  
  title: 'Accordion #6',
  Customclass:'',
  content:  <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
    Mainid:"hs-basic-no-arrow-heading-six",
    Custombodyclass:"hidden",
    Svgcontent1:<><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2:<><path d="M5 12h14" /></>
}
]`

export const reactaccordion4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active" id="hs-basic-no-arrow-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-one">
  Accordion #1
</button>
<div id="hs-basic-no-arrow-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-one">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-no-arrow-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-two">
  Accordion #2
</button>
<div id="hs-basic-no-arrow-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-no-arrow-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
  Accordion #3
</button>
<div id="hs-basic-no-arrow-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-no-arrow-heading-four">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
  Accordion #4
</button>
<div id="hs-basic-no-arrow-collapse-four" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-no-arrow-heading-five">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
  Accordion #5
</button>
<div id="hs-basic-no-arrow-collapse-five" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-no-arrow-heading-six">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
  Accordion #6
</button>
<div id="hs-basic-no-arrow-collapse-six" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={NoArrowdata} Titletext="after"  Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data5=`export const Witharrow=[
{
  Id: 'hs-basic-with-arrow-collapse-one',
  title: 'Accordion #1',
  Customclass:'active',
  content: <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-always-open-heading-one",
  Custombodyclass:"",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
},
{
Id: 'hs-basic-with-arrow-collapse-two',
title: 'Accordion #2',
Customclass:'',
content:  <p className="text-gray-800 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-always-open-heading-two",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
},
{
Id: 'hs-basic-with-arrow-collapse-three',  
title: 'Accordion #3',
Customclass:'',
content:  <p className="text-gray-800 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-always-open-heading-three",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
}
]`

export const reactaccordion5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active" id="hs-basic-with-arrow-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-one">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  Accordion #1
</button>
<div id="hs-basic-with-arrow-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-one">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-with-arrow-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-two">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  Accordion #2
</button>
<div id="hs-basic-with-arrow-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-with-arrow-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-three">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  Accordion #3
</button>
<div id="hs-basic-with-arrow-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Witharrow}  SvgIcon={true} Titletext="after" Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data6=`export const Arrowstretched=[
{
  Id: 'hs-basic-with-arrow-collapse-one',
  title: 'Accordion #1',
  Customclass:'active',
  content: <p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-with-title-and-arrow-stretched-heading-one",
  Custombodyclass:"",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
},
{
Id: 'hs-basic-with-arrow-collapse-two',
title: 'Accordion #2',
Customclass:'',
content:  <p className="text-gray-800 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-with-title-and-arrow-stretched-heading-two",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
},
{
Id: 'hs-basic-with-arrow-collapse-three',  
title: 'Accordion #3',
Customclass:'',
content:  <p className="text-gray-800 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-with-title-and-arrow-stretched-heading-three",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="m6 9 6 6 6-6" /></>,
  Svgcontent2:<><path d="m18 15-6-6-6 6" /></>
}
]`

export const reactaccordion6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
  Accordion #1
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
</button>
<div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-with-title-and-arrow-stretched-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
  Accordion #2
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
</button>
<div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>

<div className="hs-accordion" id="hs-basic-with-title-and-arrow-stretched-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
  Accordion #3
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
</button>
<div id="hs-basic-with-title-and-arrow-stretched-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Arrowstretched}  SvgIcon={true} Titletext="before" Toggleclass="hs-accordion-active:!text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data7=`export const Borderedaccordion=[
{
  Id: 'hs-basic-bordered-collapse-one',
  title: 'Accordion #1',
  Customclass:'active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10',
  content:<div className="pb-4 px-5">
                  <p className="text-gray-800 dark:text-gray-200">
                    <em>This is the first item's accordion body.</em> It is
                    hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element.
                    These classes control the overall appearance, as well as
                    the showing and hiding via CSS transitions.
                  </p>
                </div>,
  Mainid:"hs-bordered-heading-one",
  Custombodyclass:"",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
},
{
Id: 'hs-basic-bordered-collapse-two',
title: 'Accordion #2',
Customclass:'bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10',
content:<div className="pb-4 px-5 dark:bg-bodybg">
<p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions.
</p>
</div>,
Mainid:"hs-bordered-heading-two",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
},
{
Id: 'hs-basic-bordered-collapse-three',  
title: 'Accordion #3',
Customclass:'bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10',
content: <div className="pb-4 px-5 dark:bg-bodybg">
<p className="text-gray-800 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions.
</p>
</div>,
Mainid:"hs-bordered-heading-three",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
}
]`

export const reactaccordion7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-one">
<button className="hs-accordion-toggle dark:bg-bodybg dark:border-white/10 hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-one">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #1
</button>
<div id="hs-basic-bordered-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-one">
  <div className="pb-4 px-5 dark:bg-bodybg">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>

<div className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-two">
<button className="hs-accordion-toggle dark:bg-bodybg hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-two">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #2
</button>
<div id="hs-basic-bordered-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-two">
  <div className="pb-4 px-5 dark:bg-bodybg">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>

<div className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-three">
<button className="hs-accordion-toggle dark:bg-bodybg hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-three">
  <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  Accordion #3
</button>
<div id="hs-basic-bordered-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-three">
  <div className="pb-4 px-5 dark:bg-bodybg">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Borderedaccordion}  SvgIcon={true} Titletext="after" Toggleclass="dark:bg-bodybg dark:border-white/10 hs-accordion-active:!text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />
// End Prism Code//`;

export const data8=`export const Activebordered=[
{
  Id: 'hs-basic-active-bordered-collapse-one',
  title: 'Accordion #1',
  Customclass:'hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
  content:<div className="pb-4 px-5">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
  Mainid:"hs-active-bordered-heading-one",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
},
{
Id: 'hs-basic-active-bordered-collapse-two',
title: 'Accordion #2',
Customclass:'hs-accordion hs-accordion-active:border-gray-200 active bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
content:<div className="pb-4 px-5">
<p className="text-gray-800 dark:text-gray-200">
  <em>This is the first item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions.
</p>
</div>,
Mainid:"hs-active-bordered-heading-two",
  Custombodyclass:"",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
},
{
Id: 'hs-basic-active-bordered-collapse-three',  
title: 'Accordion #3',
Customclass:'hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
content: <div className="pb-4 px-5">
<p className="text-gray-800 dark:text-gray-200">
  <em>This is the first item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions.
</p>
</div>,
Mainid:"hs-active-bordered-heading-three",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Svgcontent2:<> <path d="M5 12h14" /></>
}
]`

export const reactaccordion8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-one">
<button className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-one">
  Accordion #1
  <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
</button>
<div id="hs-basic-active-bordered-collapse-one" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-one">
  <div className="pb-4 px-5">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>

<div className="hs-accordion hs-accordion-active:border-gray-200 active bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-two">
<button className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-two">
  Accordion #2
  <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
</button>
<div id="hs-basic-active-bordered-collapse-two" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-two">
  <div className="pb-4 px-5">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>

<div className="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-three">
<button className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-three">
  Accordion #3
  <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
</button>
<div id="hs-basic-active-bordered-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-three">
  <div className="pb-4 px-5">
    <p className="text-gray-800 dark:text-gray-200">
      <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Activebordered}  SvgIcon={true} Titletext="before" Toggleclass="hs-accordion-active:!text-primary inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"  />           
// End Prism Code//`;

export const data9=`export const Basiccustomaccordion =[
{
  Id: 'hs-basic-collapse-custom-one',
  title: 'Accordion #1',
  Customclass:'accordion-item overflow-hidden !border-b-0',
  content:  <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong> It
  is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions. You can modify any
  of this with custom CSS or overriding our default variables.
  It's also worth noting that just about any HTML can go
  within the <code>.accordion-body</code>, though the
  transition does limit overflow.
</div>,
  Mainid:"hs-basic-heading-custom-one",
  Custombodyclass:"hidden",
},
{
Id: 'hs-basic-collapse-custom-two',
title: 'Accordion #2',
Customclass:'accordion-item !border-b-0',
content:  <div className="accordion-body">
<strong>This is the first item's accordion body.</strong> It
is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions. You can modify any
of this with custom CSS or overriding our default variables.
It's also worth noting that just about any HTML can go
within the <code>.accordion-body</code>, though the
transition does limit overflow.
</div>,
Mainid:"hs-basic-heading-custom-two",
  Custombodyclass:"hidden",
},
{
Id: 'hs-basic-collapse-custom-three',  
title: 'Accordion #3',
Customclass:'accordion-item overflow-hidden',
content:   <div className="accordion-body">
<strong>This is the first item's accordion body.</strong> It
is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions. You can modify any
of this with custom CSS or overriding our default variables.
It's also worth noting that just about any HTML can go
within the <code>.accordion-body</code>, though the
transition does limit overflow.
</div>,
Mainid:"hs-basic-heading-custom-three",
  Custombodyclass:"hidden",
}
]`

export const reactaccordion9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion accordion-item overflow-hidden !border-b-0" id="hs-basic-heading-custom-one">
<button className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-collapse-custom-one" type="button">
  Accordion #1
</button>

<div id="hs-basic-collapse-custom-one"
  className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-heading-custom-one">
  <div className="accordion-body">
      <strong>This is the first item's accordion body.</strong> It is shown by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>

<div className="hs-accordion accordion-item !border-b-0" id="hs-basic-heading-custom-two">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-collapse-custom-two" type="button">
  Accordion #2
</button>
<div id="hs-basic-collapse-custom-two"
  className="hs-accordion-content hidden overflow-hidden w-full transition-[height] duration-300"
  aria-labelledby="hs-basic-heading-custom-two">
  <div className="accordion-body">
      <strong>This is the second item's accordion body.</strong> It is shown by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>

<div className="hs-accordion accordion-item overflow-hidden" id="hs-basic-heading-custom-three">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-collapse-custom-three" type="button">
  Accordion #3
</button>
<div id="hs-basic-collapse-custom-three"
  className="hs-accordion-content  overflow-hidden  w-full hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-heading-custom-three">
  <div className="accordion-body">
      <strong>This is the third item's accordion body.</strong> It is shown by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";
<SpkAccordions  items={Basiccustomaccordion} Titletext="before" Toggleclass="accordion-button hs-accordion-active:!text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data10=`export const Basicwithiconaccordion =[
{
  Id: 'hs-basic-with-arrow1-collapse-one',
  title: 'Accordion #1',
  Customclass:'accordion-item overflow-hidden !border-b-0',
  content:  <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong> It
  is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions. You can modify any
  of this with custom CSS or overriding our default variables.
  It's also worth noting that just about any HTML can go
  within the <code>.accordion-body</code>, though the
  transition does limit overflow.
</div>,
  Mainid:"hs-basic-with-arrow1-heading-one",
  Custombodyclass:"hidden",
  Svgcontent1:<> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>,
  Svgcontent2:<> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-with-arrow1-collapse-two',
title: 'Accordion #2',
Customclass:'accordion-item !border-b-0',
content:  <div className="accordion-body">
<strong>This is the first item's accordion body.</strong> It
is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions. You can modify any
of this with custom CSS or overriding our default variables.
It's also worth noting that just about any HTML can go
within the <code>.accordion-body</code>, though the
transition does limit overflow.
</div>,
Mainid:"hs-basic-with-arrow1-heading-two",
  Custombodyclass:"hidden",
  Svgcontent1:<> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-with-arrow1-collapse-three',  
title: 'Accordion #3',
Customclass:'accordion-item overflow-hidden',
content:   <div className="accordion-body">
<strong>This is the first item's accordion body.</strong> It
is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions. You can modify any
of this with custom CSS or overriding our default variables.
It's also worth noting that just about any HTML can go
within the <code>.accordion-body</code>, though the
transition does limit overflow.
</div>,
Mainid:"hs-basic-with-arrow1-heading-three",
  Custombodyclass:"hidden ",
  Svgcontent1:<> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion accordion-item  overflow-hidden !border-b-0" id="hs-basic-with-arrow1-heading-one">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-arrow1-collapse-one" type="button">
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  Accordion #1
</button>
<div id="hs-basic-with-arrow1-collapse-one"
  className="hs-accordion-content w-full hidden overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-with-arrow1-heading-one">
  <div className="accordion-body">
      <strong>This is the first item's accordion body.</strong> It is shown by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>
<div className="hs-accordion accordion-item !border-b-0" id="hs-basic-with-arrow2-heading-two">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-arrow1-collapse-two" type="button">
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  Accordion #2
</button>
<div id="hs-basic-with-arrow1-collapse-two"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-with-arrow2-heading-two">
  <div className="accordion-body">
      <strong>This is the first item's accordion body.</strong> It is shown by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>
<div className="hs-accordion accordion-item  overflow-hidden" id="hs-basic-with-arrow3-heading-three">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-arrow1-collapse-three" type="button">
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  Accordion #3
</button>
<div id="hs-basic-with-arrow1-collapse-three"
  className="hs-accordion-content hidden overflow-hidden w-full transition-[height] duration-300"
  aria-labelledby="hs-basic-with-arrow3-heading-three">
  <div className="accordion-body">
      <strong>This is the third item's accordion body.</strong> It is hidden
      by
      default, until the collapse plugin adds the appropriate classes that we
      use
      to
      style each element. These classes control the overall appearance, as
      well as
      the
      showing and hiding via CSS transitions. You can modify any of this with
      custom
      CSS or overriding our default variables. It's also worth noting that
      just
      about
      any HTML can go within the <code>.accordion-body</code>, though the
      transition
      does limit overflow.
  </div>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions  items={Basicwithiconaccordion} Titletext="after" SvgIcon={true} Toggleclass="accordion-button hs-accordion-active:!text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data11=`export const Arrowbasicstretched=[
{
  Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-one',
  title: 'Accordion #1',
  Customclass:'accordion-item  overflow-hidden !border-b-0',
  content:   <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-basic-with-title-and-arrow1-stretched-heading-one",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-two',
title: 'Accordion #2',
Customclass:'accordion-item  overflow-hidden !border-b-0',
content:   <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-with-title-and-arrow1-stretched-heading-two",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-three',  
title: 'Accordion #3',
Customclass:'accordion-item  overflow-hidden !border-b-0',
content:    <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-basic-with-title-and-arrow1-stretched-heading-three",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion accordion-item  overflow-hidden !border-b-0" id="hs-basic-with-title-and-arrow1-stretched-heading-one">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-title-and-arrow1-stretched-collapse-one" type="button">
  Accordion #1
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-basic-with-title-and-arrow1-stretched-collapse-one"
  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-with-title-and-arrow1-stretched-heading-one">
  <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion accordion-item !border-b-0" id="hs-basic-with-title-and-arrow1-stretched-heading-two">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-title-and-arrow1-stretched-collapse-two" type="button">
  Accordion #2
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-basic-with-title-and-arrow1-stretched-collapse-two"
  className="hs-accordion-content accordion-body hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-with-title-and-arrow1-stretched-heading-two">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion accordion-item  overflow-hidden" id="hs-basic-with-title-and-arrow1-stretched-heading-three">
<button
  className="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-basic-with-title-and-arrow1-stretched-collapse-three" type="button">
  Accordion #3
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-basic-with-title-and-arrow1-stretched-collapse-three"
  className="hs-accordion-content accordion-body hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-basic-with-title-and-arrow1-stretched-heading-three">
  <p className="text-gray-800 dark:text-gray-200">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions items={Arrowbasicstretched} Titletext="before" SvgIcon={true} Toggleclass="accordion-button hs-accordion-active:!text-primary hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

//
export const data12=`export const Primarysoftcolor=[
{
  Id: 'hs-accordion-collapse-1',
  title: 'Accordion #1',
  Customclass:'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
  content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-accordion-heading-1",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-accordion-collapse-2',
title: 'Accordion #2',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-accordion-heading-2",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-accordion-collapse-3',  
title: 'Accordion #3',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-accordion-heading-3",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`
export const reactaccordion12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1">
<button
  className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-1" type="button">
  Accordion #1
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-accordion-collapse-1"
  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-1">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2">
<button
  className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-2" type="button">
  Accordion #2
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-accordion-collapse-2"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-2">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3">
<button
  className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-3" type="button">
  Accordion #3
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-accordion-collapse-3"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-3">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";
<SpkAccordions items={Primarysoftcolor} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:!text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data13=`export const Secondarysoftcolor=[
{
  Id: 'hs-accordion-collapse-1-primary',
  title: 'Accordion #1',
  Customclass:'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
  content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-accordion-heading-1-primary",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-accordion-collapse-2-primary',
title: 'Accordion #2',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-accordion-heading-2-primary",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-accordion-collapse-3-primary',  
title: 'Accordion #3',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-accordion-heading-3-primary",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`
export const reactaccordion13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1-primary">
<button
  className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-1-primary" type="button">
  Accordion #1
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-accordion-collapse-1-primary"
  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-1-primary">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2-primary">
<button
className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
aria-controls="hs-accordion-collapse-1-primary" type="button">
Accordion #2
<svg
  className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
</svg>
<svg
  className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
</svg>
</button>
<div id="hs-accordion-collapse-2-primary"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-2-primary">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3-primary">
<button
  className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-1-primary" type="button">
  Accordion #3
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-accordion-collapse-3-primary"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-accordion-heading-3-primary">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions items={Secondarysoftcolor} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data14=`export const Solidprimary=[
{
  Id: 'hs-primary-collapse-1',
  title: 'Accordion #1',
  Customclass:'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
  content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-primary-heading-1",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-primary-collapse-2',
title: 'Accordion #2',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-primary-heading-2",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-primary-collapse-3',  
title: 'Accordion #3',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-primary-heading-3",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`
export const reactaccordion14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-1">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-primary-collapse-1" type="button">
  Accordion #1
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-primary-collapse-1"
  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-primary-heading-1">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-2">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-primary-collapse-2" type="button">
  Accordion #2
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-primary-collapse-2"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-primary-heading-2">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-3">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-primary-collapse-3" type="button">
  Accordion #3
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-primary-collapse-3"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-primary-heading-3">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions items={Solidprimary} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data15=`export const Solidsecondary=[
{
  Id: 'hs-primary-collapse-1',
  title: 'Accordion #1',
  Customclass:'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
  content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
  <em>This is the third item's accordion body.</em> It is
  hidden by default, until the collapse plugin adds the
  appropriate classes that we use to style each element. These
  classes control the overall appearance, as well as the
  showing and hiding via CSS transitions.
</p>,
  Mainid:"hs-secondary-heading-1",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-primary-collapse-2',
title: 'Accordion #2',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-secondary-heading-2",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-primary-collapse-3',  
title: 'Accordion #3',
Customclass:'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
content:<p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
<em>This is the third item's accordion body.</em> It is
hidden by default, until the collapse plugin adds the
appropriate classes that we use to style each element. These
classes control the overall appearance, as well as the
showing and hiding via CSS transitions.
</p>,
Mainid:"hs-secondary-heading-3",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="hs-accordion-group">
<div className="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-1">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-secondary-collapse-1" type="button">
  Accordion #1
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-secondary-collapse-1"
  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-secondary-heading-1">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-2">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-secondary-collapse-2" type="button">
  Accordion #2
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-secondary-collapse-2"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-secondary-heading-2">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
<div className="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-3">
<button
  className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-secondary-collapse-3" type="button">
  Accordion #3
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>
<div id="hs-secondary-collapse-3"
  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
  aria-labelledby="hs-secondary-heading-3">
  <p className="text-gray-800 dark:text-gray-200 py-4 px-5">
    <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
    plugin adds the appropriate classes that we use to style each element. These classes control the
    overall appearance, as well as the showing and hiding via CSS transitions.
  </p>
</div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<SpkAccordions items={Solidsecondary} Titletext="before" SvgIcon={true} Toggleclass="hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"  />
// End Prism Code//`;

export const data16=`export const colored=[
{
  Id: 'hs-basic-collapse1',
  title: 'Accordion #1',
  Customclass:'accordion-item active',
  content: <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong>{" "}
  It is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions. You can modify
  any of this with custom CSS or overriding our default
  variables. It's also worth noting that just about any HTML
  can go within the
  <code>.accordion-body</code>, though the transition does
  limit overflow.
</div>,
  Mainid:"hs-basic-heading1",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-basic-collapse2',
title: 'Accordion #2',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading2",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-collapse3',  
title: 'Accordion #3',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading3",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="accordion accordion-border-primary accordions-items-seperate"
id="accordionprimaryborderExample">
<div className="hs-accordion-group">
  <div className="hs-accordion  accordion-item active" id="hs-basic-heading1">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between  gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse1" type="button">
          Accordion Item #1
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse1"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300"
          aria-labelledby="hs-basic-heading1">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item" id="hs-basic-heading2">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group  inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse2" type="button">
          Accordion Item #2
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse2"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
          aria-labelledby="hs-basic-heading2">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item" id="hs-basic-heading-tree">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group  inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse-tree" type="button">
          Accordion Item #3
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse-tree"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading-two">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<div className="accordion accordion-border-primary accordions-items-seperate"  id="accordionprimaryborderExample">
    <SpkAccordions items={colored} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group  inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"  />
</div>
// End Prism Code//`;

export const data17=`export const Successcolored=[
{
  Id: 'hs-basic-collapse11',
  title: 'Accordion #1',
  Customclass:'accordion-item active',
  content: <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong>{" "}
  It is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions. You can modify
  any of this with custom CSS or overriding our default
  variables. It's also worth noting that just about any HTML
  can go within the
  <code>.accordion-body</code>, though the transition does
  limit overflow.
</div>,
  Mainid:"hs-basic-heading11",
  Custombodyclass:"",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-basic-collapse12',
title: 'Accordion #2',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading12",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-collapse13',  
title: 'Accordion #3',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading13",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="accordion accordion-border-success accordions-items-seperate"
id="accordionsuccessborderExample">
<div className="hs-accordion-group">
  <div className="hs-accordion  accordion-item active" id="hs-basic-heading11">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse11" type="button">
          Accordion Item #1
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse11"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300"
          aria-labelledby="hs-basic-heading11">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item" id="hs-basic-heading12">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group  inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse12" type="button">
          Accordion Item #2
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse12"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
          aria-labelledby="hs-basic-heading12">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion accordion-item" id="hs-basic-heading13">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group  inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse13" type="button">
          Accordion Item #3
          <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
          width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div id="hs-basic-collapse13"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading13">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<div className="accordion accordion-border-success accordions-items-seperate" id="accordionsuccessborderExample">
             <SpkAccordions items={Successcolored} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"  />
          </div>
// End Prism Code//`;

export const data18=`export const Leftalignedicons=[
{
  Id: 'hs-basic-collapse21',
  title: 'Accordion #1',
  Customclass:'accordion-item',
  content: <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong>{" "}
  It is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions. You can modify
  any of this with custom CSS or overriding our default
  variables. It's also worth noting that just about any HTML
  can go within the
  <code>.accordion-body</code>, though the transition does
  limit overflow.
</div>,
  Mainid:"hs-basic-heading21",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-basic-collapse22',
title: 'Accordion #2',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading22",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-collapse23',  
title: 'Accordion #3',
Customclass:'accordion-item',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading23",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="accordion accordionicon-left accordions-items-seperate"
id="accordioniconLeftExample">
<div className="hs-accordion-group">
  <div className="hs-accordion  accordion-item" id="hs-basic-heading21">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse21" type="button">
  <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
          Accordion Item #1
      </button>
      <div id="hs-basic-collapse21"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading21">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item" id="hs-basic-heading22">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse22" type="button">
          <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
          Accordion Item #2
      </button>
      <div id="hs-basic-collapse22"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
          aria-labelledby="hs-basic-heading22">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item" id="hs-basic-heading23">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse23" type="button">
          <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
          Accordion Item #3
      </button>
      <div id="hs-basic-collapse23"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading23">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<div className="accordion accordionicon-left accordions-items-seperate" id="accordioniconLeftExample">
    <SpkAccordions items={Leftalignedicons} Titletext="after" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"  />
</div>
// End Prism Code//`;

export const data19=` export const Customaccaordion=[
{
  Id: 'hs-basic-collapse31',
  title: 'Accordion #1',
  Customclass:'accordion-item custom-accordion-primary',
  content: <div className="accordion-body">
  <strong>This is the first item's accordion body.</strong>{" "}
  It is shown by default, until the collapse plugin adds the
  appropriate classes that we use to style each element.
  These classes control the overall appearance, as well as
  the showing and hiding via CSS transitions. You can modify
  any of this with custom CSS or overriding our default
  variables. It's also worth noting that just about any HTML
  can go within the
  <code>.accordion-body</code>, though the transition does
  limit overflow.
</div>,
  Mainid:"hs-basic-heading31",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, 
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
},
{
Id: 'hs-basic-collapse32',
title: 'Accordion #2',
Customclass:'accordion-item custom-accordion-secondary',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading32",
  Custombodyclass:"hidden",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
},
{
Id: 'hs-basic-collapse33',  
title: 'Accordion #3',
Customclass:'accordion-item custom-accordion-danger',
content: <div className="accordion-body">
<strong>This is the first item's accordion body.</strong>{" "}
It is shown by default, until the collapse plugin adds the
appropriate classes that we use to style each element.
These classes control the overall appearance, as well as
the showing and hiding via CSS transitions. You can modify
any of this with custom CSS or overriding our default
variables. It's also worth noting that just about any HTML
can go within the
<code>.accordion-body</code>, though the transition does
limit overflow.
</div>,
Mainid:"hs-basic-heading33",
  Custombodyclass:"hidden ",
  Svgcontent1:<><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  /></>,
  Svgcontent2:<><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
}
]`

export const reactaccordion19 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="accordion customized-accordion accordions-items-seperate"
id="customizedAccordion">
<div className="hs-accordion-group">
  <div className="hs-accordion  accordion-item custom-accordion-primary" id="hs-basic-heading31">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse31" type="button">
          Accordion Item #1
          <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
      </button>
      <div id="hs-basic-collapse31"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading31">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item custom-accordion-secondary" id="hs-basic-heading32">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse32" type="button">
          Accordion Item #2
          <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
      </button>
      <div id="hs-basic-collapse32"
          className="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
          aria-labelledby="hs-basic-heading32">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
  <div className="hs-accordion  accordion-item custom-accordion-danger" id="hs-basic-heading33">
      <button
          className="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
          aria-controls="hs-basic-collapse33" type="button">
          Accordion Item #3
          <svg
    className="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
  <svg
    className="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
      </button>
      <div id="hs-basic-collapse33"
          className="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading33">
          <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by
              default, until the collapse plugin adds the appropriate classes that we
              use to style each element. These classes control the overall appearance,
              as well as the showing and hiding via CSS transitions. You can modify
              any of this with custom CSS or overriding our default variables. It's
              also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
      </div>
  </div>
</div>
</div>
// End Prism Code//`;
export const reuseaccordion19 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
import SpkAccordions from "/../@spk/advanced-ui/spk-accordions";

<div className="accordion customized-accordion accordions-items-seperate" id="customizedAccordion">
             <SpkAccordions items={Customaccaordion} Titletext="before" SvgIcon={true} Toggleclass="accordion-button  hs-accordion-active:pb-3 group inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"  />
          </div>
// End Prism Code//`;


//Modals & Closes

export const modal1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <Link scroll={false} href="#!" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#todo-compose">Launch demo modal
</Link>
<div id="todo-compose" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Modal title</h6>
              <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" Overlay="#todo-compose">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </SpkButton>
        </div>
        <div className="ti-modal-body px-4">
            ...
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave  ti-btn-secondary align-middle" Overlay="#todo-compose">
            Close
          </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave bg-primary text-white !font-medium">Save Changes</SpkButton>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
    <Link scroll={false} href="#!" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary " data-hs-overlay="#staticBackdrop">Launch static backdrop modal
</Link>
<div id="staticBackdrop" className="hs-overlay hidden ti-modal  [--overlay-backdrop:static]">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold">Modal title</h6>
              <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" Overlay="#staticBackdrop">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </SpkButton>
        </div>
        <div className="ti-modal-body px-4">
            <p>I will not close if you click outside me. Don't even try to
                press
                escape key.</p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave  ti-btn-secondary align-middle"  Overlay="#staticBackdrop">
            Close
          </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave bg-primary text-white !font-medium">Understood</SpkButton>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<Link scroll={false} href="#!" className="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#exampleModalScrollable"> Scrolling long content
</Link>
<div id="exampleModalScrollable" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7  ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold">Modal title</h6>
              <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"  Overlay="#exampleModalScrollable">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </SpkButton>
        </div>
        <div className="ti-modal-body px-4">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Libero
                ipsum quasi, error quibusdam debitis maiores hic eum? Vitae
                nisi
                ipsa maiores fugiat deleniti quis reiciendis veritatis.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
                voluptatibus, ipsam quo est rerum modi quos expedita facere,
                ex
                tempore fuga similique ipsa blanditiis et accusamus
                temporibus
                commodi voluptas! Nobis veniam illo architecto expedita quam
                ratione quaerat omnis. In, recusandae eos! Pariatur,
                deleniti
                quis ad nemo ipsam officia temporibus, doloribus fuga
                asperiores
                ratione distinctio velit alias hic modi praesentium aperiam
                officiis eaque, accusamus aut. Accusantium assumenda,
                commodi
                nulla provident asperiores fugit inventore iste amet aut
                placeat
                consequatur reprehenderit. Ratione tenetur eligendi, quis
                aperiam dolores magni iusto distinctio voluptatibus minus a
                unde
                at! Consequatur voluptatum in eaque obcaecati, impedit
                accusantium ea soluta, excepturi, quasi quia commodi
                blanditiis?
                Qui blanditiis iusto corrupti necessitatibus dolorem fugiat
                consequuntur quod quo veniam? Labore dignissimos reiciendis
                accusamus recusandae est consequuntur iure.</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="ti-modal-footer">
            <SpkButton buttontype="button"
            customClass="hs-dropdown-toggle ti-btn  btn-wave  ti-btn-secondary align-middle"
            Overlay="#exampleModalScrollable
            
            ">
            Close
          </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave bg-primary text-white !font-medium">Save Changes</SpkButton>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#hs-vertically-centered-modal">
    Vertically centered modal
  </SpkButton>
<div id="hs-vertically-centered-modal" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel2">Modal title
            </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-vertically-centered-modal">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Libero
                ipsum quasi, error quibusdam debitis maiores hic eum? Vitae
                nisi
                ipsa maiores fugiat deleniti quis reiciendis veritatis.</p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-vertically-centered-modal">
            Close
          </SpkButton>
          <a className="ti-btn  btn-wave ti-btn-primary" href="#!">
            Save changes
          </a>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-vertically-centered-scrollable-modal">
  Vertically centered scrollable modal
</SpkButton>
<div id="hs-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
    <div className="max-h-full overflow-hidden ti-modal-content">
      <div className="ti-modal-header">
          <h6 className="modal-title text-[1rem] font-semiboldmodal-title" id="staticBackdropLabel3">Modal title
          </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-vertically-centered-scrollable-modal">
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body overflow-y-auto">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
              voluptatibus, ipsam quo est rerum modi quos expedita facere,
              ex
              tempore fuga similique ipsa blanditiis et accusamus
              temporibus
              commodi voluptas! Nobis veniam illo architecto expedita quam
              ratione quaerat omnis. In, recusandae eos! Pariatur,
              deleniti
              quis ad nemo ipsam officia temporibus, doloribus fuga
              asperiores
              ratione distinctio velit alias hic modi praesentium aperiam
              officiis eaque, accusamus aut. Accusantium assumenda,
              commodi
              nulla provident asperiores fugit inventore iste amet aut
              placeat
              consequatur reprehenderit. Ratione tenetur eligendi, quis
              aperiam dolores magni iusto distinctio voluptatibus minus a
              unde
              at! Consequatur voluptatum in eaque obcaecati, impedit
              accusantium ea soluta, excepturi, quasi quia commodi
              blanditiis?
              Qui blanditiis iusto corrupti necessitatibus dolorem fugiat
              consequuntur quod quo veniam? Labore dignissimos reiciendis
              accusamus recusandae est consequuntur iure.</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
          Close
        </SpkButton>
        <a className="ti-btn  btn-wave ti-btn-primary" href="#!">
          Save changes
        </a>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#exampleModalScrollable4">
Launch demo modal
</SpkButton>
<div id="exampleModalScrollable4" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
<div className="ti-modal-content w-full">
<div className="ti-modal-header">
  <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel4">Modal title
  </h6>
<SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn"  Overlay="#exampleModalScrollable4">
  <span className="sr-only">Close</span>
  <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
  </svg>
</SpkButton>
</div>
<div className="ti-modal-body">
  <h5>Popover in a modal</h5>
  <div className="mb-2">This
    <SpkOverlay customClass="[--trigger:click] [--placement:top]">
        <Link scroll={false} className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn  btn-wave ti-btn-secondary me-1" href="#!">button
            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                <h6>Popover Title</h6>
                </div>
                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover body content is set in this attribute.</p>
            </div>
          </Link>
      </SpkOverlay>
      triggers a popover on click.</div>
  <hr className="my-2"/>
  <h5>Tooltips in a modal</h5>
  <div>
    <SpkOverlay>
      <Link scroll={false} href="#!" className="hs-tooltip-toggle text-primary">
          This Link
          <span
              className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
              role="tooltip">
              Tooltip
          </span>
        </Link>
  </SpkOverlay> and
  <SpkOverlay>
    <Link scroll={false} href="#!" className="hs-tooltip-toggle text-primary">
        This Link
        <span
            className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
            role="tooltip">
            Tooltip
        </span>
      </Link>
</SpkOverlay>
    have tooltips on hover.
  </div>
</div>
<div className="ti-modal-footer">
<SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary"  Overlay="#exampleModalScrollable4">
  Close
</SpkButton>
<Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
  Save changes
</Link>
</div>
</div>
</div>
</div>
// End Prism Code//`;

export const modal7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#exampleModalgrid">
Launch demo modal
</SpkButton>
<div id="exampleModalgrid" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
<div className="ti-modal-content w-full">
  <div className="ti-modal-header">
      <h6 className="modal-title text-[1rem] font-semibold">Modal title
      </h6>
    <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#exampleModalgrid">
      <span className="sr-only">Close</span>
      <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
      </svg>
    </SpkButton>
  </div>
  <div className="ti-modal-body">
      <div className="container-fluid">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">01</div>
            <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">02</div>
            <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">03</div>
            <div className="col-span-2 rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">04</div>
            <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">05</div>
            <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">06</div>
            <div className="col-span-2 rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">07</div>
          </div>
      </div>
  </div>
  <div className="ti-modal-footer">
    <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#exampleModalgrid">
      Close
    </SpkButton>
    <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
      Save changes
    </Link>
  </div>
</div>
</div>
</div>
// End Prism Code//`;

export const modal8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-toggle-between-modals-first-modal">
  Open first modal
</SpkButton>
<div id="hs-toggle-between-modals-first-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
    <div className="ti-modal-content">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal 1
        </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-toggle-between-modals-first-modal" Overlayclose>
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
          Show a second modal and hide this one with the button below.
        </p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary" Overlay="#hs-toggle-between-modals-second-modal">
          Open second modal
        </SpkButton>
      </div>
    </div>
  </div>
</div>
<div id="hs-toggle-between-modals-second-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
    <div className="ti-modal-content">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal 2
        </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-toggle-between-modals-second-modal" Overlayclose>
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
          Hide this modal and show the first with the button below.
        </p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary" Overlay="#hs-toggle-between-modals-first-modal">
          Back to first
        </SpkButton>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
     <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-extralarge-modal">
    Extra Large modal
  </SpkButton>
  <div id="hs-extralarge-modal" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Modal title
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn"
            data-hs-overlay="#hs-extralarge-modal">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                fill="currentColor" />
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-large-modal">
    Large modal
  </SpkButton>
  <div id="hs-large-modal" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Modal title
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn"
            Overlay="#hs-large-modal">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                fill="currentColor" />
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-small-modal">
    small modal
  </SpkButton>
  <div id="hs-small-modal" className="hs-overlay hidden ti-modal">
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h6 className="ti-modal-title">
              Modal title
            </h6>
            <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn"
              Overlay="#hs-small-modal">
              <span className="sr-only">Close</span>
              <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor" />
              </svg>
            </SpkButton>
          </div>
          <div className="ti-modal-body">
            <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
              ...
            </p>
          </div>
        </div>
      </div>
  </div>
// End Prism Code//`;

export const modal10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-slide-down-animation-modal">
  Open modal
</SpkButton>
<div id="hs-slide-down-animation-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
    <div className="ti-modal-content">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal title
        </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-slide-down-animation-modal">
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <p className="mt-1 text-gray-800 dark:text-white/70">
          This is a wider card with supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-slide-down-animation-modal">
          Close
        </SpkButton>
        <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
          Save changes
        </Link>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-slide-up-animation-modal">
  Open modal
</SpkButton>

<div id="hs-slide-up-animation-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:!mt-7 !mt-14 ease-out ti-modal-box">
    <div className="ti-modal-content">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal title
        </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-slide-up-animation-modal">
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <p className="mt-1 text-gray-800 dark:text-white/70">
          This is a wider card with supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-slide-up-animation-modal">
          Close
        </SpkButton>
        <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
          Save changes
        </Link>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-primary" Overlay="#hs-focus-management-modal">
  Open modal
</SpkButton>
<div id="hs-focus-management-modal" className="hs-overlay hidden ti-modal">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
    <div className="ti-modal-content">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal title
        </h6>
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-focus-management-modal">
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
          </svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <label htmlFor="input-label" className="ti-form-label">Email</label>
        <input type="email" id="input-label" className="ti-form-input" placeholder="you@site.com" autoFocus/>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-focus-management-modal">
          Close
        </SpkButton>
        <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
          Save changes
        </Link>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary" Overlay="#hs-stacked-overlays">
      Open modal
    </SpkButton>

    <div id="hs-stacked-overlays" className="hs-overlay hidden ti-modal pointer-events-none">
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
        <div className="ti-modal-content pointer-events-auto">
          <div className="ti-modal-header">
            <h6 className="ti-modal-title">
              Modal title (level 1)
            </h6>
            <SpkButton buttontype="button" customClass="ti-modal-close-btn" Overlay="#hs-stacked-overlays">
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </SpkButton>
          </div>
    
          <div className="ti-modal-body">
            <p className="mt-1 mb-2 text-gray-800 dark:text-white/70">
              Stacked Overlays modals are a user interface design concept where multiple overlay windows, or modals, are displayed on top of each other, typically in a web or app interface. These modals are often used to present additional information, confirm actions, or to guide users through multi-step processes. The key characteristic of Stacked Overlays is their layered appearance, where each new modal partially covers the previous one, creating a stack effect. This stacking can provide a visual cue to users about the depth of their interaction or the sequence of tasks. To maintain usability, these modals are designed with careful attention to transparency, size, and the ability to easily return to previous layers. They often incorporate animations for smooth transitions between layers and may include features like dimming the background to focus user attention on the active modal.
            </p>
    
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary" Overlay="#hs-stacked-overlays-2" Overlayoptions="{
              &quot;isClosePrev&quot;: false
            }">
              Open modal
            </SpkButton>
          </div>
    
          <div className="ti-modal-footer">
            <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-stacked-overlays">
              Close
            </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary">
              Save changes
            </SpkButton>
          </div>
        </div>
      </div>
    </div>

    <div id="hs-stacked-overlays-2" className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/70 hidden ti-modal pointer-events-none">
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
        <div className="ti-modal-content pointer-events-auto">
          <div className="ti-modal-header">
            <h6 className="ti-modal-title">
              Modal title (level 2)
            </h6>
            <SpkButton buttontype="button" customClass="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10" data-hs-overlay="#hs-stacked-overlays-2" data-hs-overlay-options="{
              &quot;isClosePrev&quot;: false
            }">
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </SpkButton>
          </div>

          <div className="ti-modal-body">
            <p className="mt-1 mb-2 text-gray-800 dark:text-white/70">
              Stacked Overlays modals represent a design approach in user interfaces, where several overlay windows, known as modals, are layered on top of one another. This is commonly seen in web or mobile application interfaces.
            </p>

            <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary"  Overlay="#hs-stacked-overlays-3" Overlayoptions="{
              &quot;isClosePrev&quot;: false
            }">
              Open modal
            </SpkButton>
          </div>

          <div className="ti-modal-footer">
            <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary"  Overlay="#hs-stacked-overlays-2" Overlayoptions="{
              &quot;isClosePrev&quot;: false
            }">
              Close
            </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary">
              Save changes
            </SpkButton>
          </div>
        </div>
      </div>
    </div>
    <div id="hs-stacked-overlays-3" className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/80 hidden ti-modal z-[80] pointer-events-none">
      <div className="hs-overlay-open:mt-7 ti-modal-box ease-out">
        <div className="ti-modal-content pointer-events-auto ">
          <div className="ti-modal-header">
            <h6
              className="ti-modal-title">
              Modal title (level 3)
            </h6>
            <SpkButton buttontype="button" customClass="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10" Overlay="#hs-stacked-overlays-3" Overlayoptions="{
              &quot;isClosePrev&quot;: false
            }">
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </SpkButton>
          </div>

          <div className="ti-modal-body">
            <p className="mt-1 text-gray-800 dark:text-white/70">
              Stacked Overlays: UI design with layered modals, often in web/apps, where each window overlays the previous one.
            </p>
          </div>

          <div className="ti-modal-footer">
            <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-stacked-overlays-3" Overlayoptions="{
              &quot;isClosePrev&quot;: false
            }">
              Close
            </SpkButton>
            <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary">
              Save changes
            </SpkButton>
          </div>
        </div>
      </div>
    </div>
// End Prism Code//`;

export const modal14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary" data-hs-overlay="#hs-custom-backdrop-modal">
  Open modal
</SpkButton>
<div id="hs-custom-backdrop-modal" className="hs-overlay hs-overlay-backdrop-open:bg-primary/50 hidden ti-modal z-[101] pointer-events-none">
  <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
    <div className="ti-modal-content pointer-events-auto">
      <div className="ti-modal-header">
        <h6 className="ti-modal-title">
          Modal title
        </h6>
        <SpkButton buttontype="button" customClass="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" Overlay="#hs-custom-backdrop-modal">
          <span className="sr-only">Close</span>
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </SpkButton>
      </div>
      <div className="ti-modal-body">
        <p className="mt-1 text-gray-800 dark:text-white/70">
          This is a wider card with supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div className="ti-modal-footer">
        <SpkButton buttontype="button" customClass="hs-dropdown-toggle hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-custom-backdrop-modal">
          Close
        </SpkButton>
        <Link scroll={false} className="ti-btn  btn-wave ti-btn-primary" href="#!">
          Save changes
        </Link>
      </div>
    </div>
  </div>
</div>
// End Prism Code//`;

export const modal15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-primary" Overlay="#hs-full-screen-modal">
    Full screen
  </SpkButton>
  <div id="hs-full-screen-modal" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !m-0 !max-w-full !w-full">
      <div className="ti-modal-content !rounded-none">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen Modal
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-full-screen-modal">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal">
            Close
          </SpkButton>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-secondary"  Overlay="#hs-full-screen-modal-below-sm">
    Full screen below sm
  </SpkButton>
  <div id="hs-full-screen-modal-below-sm" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 max-w-full w-full !m-0 sm:hs-overlay-open:!mt-10 sm:!mt-0 sm:max-w-lg sm:!mx-auto">
      <div className="ti-modal-content sm:border sm:rounded-sm sm:shadow-sm dark:bg-bodybg sm:dark:border-white/10">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen below sm
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn"  Overlay="#hs-full-screen-modal-below-sm">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-sm">
              Close
            </SpkButton>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-warning" Overlay="#hs-full-screen-modal-below-md">
    Full screen below md
  </SpkButton>
  <div id="hs-full-screen-modal-below-md" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0 md:hs-overlay-open:!mt-10 md:!mt-0 md:!max-w-lg md:!mx-auto">
      <div className="ti-modal-content md:border md:rounded-sm md:shadow-sm md:dark:border-white/10">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen below md
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-full-screen-modal-below-md">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-md">
              Close
            </SpkButton>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-lg">
    Full screen below lg
  </SpkButton>
  <div id="hs-full-screen-modal-below-lg" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0 lg:hs-overlay-open:!mt-10 lg:!mt-0 lg:!max-w-lg lg:!mx-auto">
      <div className="ti-modal-content lg:border lg:rounded-sm lg:shadow-sm lg:dark:border-white/10">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen below lg
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-full-screen-modal-below-lg">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-lg">
              Close
            </SpkButton>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-success" Overlay="#hs-full-screen-modal-below-xl">
    Full screen below xl
  </SpkButton>
  <div id="hs-full-screen-modal-below-xl" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0  xl:hs-overlay-open:!mt-10 xl:!mt-0 xl:!max-w-xl xl:!mx-auto">
      <div className="ti-modal-content xl:border xl:rounded-sm xl:shadow-sm xl:dark:border-white/10">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen below xl
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-full-screen-modal-below-xl">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-xl">
              Close
            </SpkButton>
        </div>
      </div>
    </div>
  </div>
  <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-danger" Overlay="#hs-full-screen-modal-below-xxl">
      Full screen below xxl
  </SpkButton>
  <div id="hs-full-screen-modal-below-xxl" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0  xxl:hs-overlay-open:!mt-10 xxl:!mt-0 xxl:!max-w-xl xxl:!mx-auto">
      <div className="ti-modal-content xxl:border xxl:rounded-sm xxl:shadow-sm xxl:dark:border-white/10">
        <div className="ti-modal-header">
          <h6 className="ti-modal-title">
            Full screen below xxl
          </h6>
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-modal-close-btn" Overlay="#hs-full-screen-modal-below-xxl">
            <span className="sr-only">Close</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
          </SpkButton>
        </div>
        <div className="ti-modal-body">
          <p className="mt-1 text-gray-800 text-textmuted dark:text-textmuted/50">
            ...
          </p>
        </div>
        <div className="ti-modal-footer">
          <SpkButton buttontype="button" customClass="hs-dropdown-toggle ti-btn  btn-wave ti-btn-secondary" Overlay="#hs-full-screen-modal-below-xxl">
              Close
            </SpkButton>
        </div>
      </div>
    </div>
  </div>
// End Prism Code//`;

export const modal16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50 hover:text-defaulttextcolor" Overlay="#formmodalmdo">
  <span className="sr-only">Close</span>
  <i className="ri-close-line"></i>
</SpkButton>
// End Prism Code//`;

export const modal17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50/25 pointer-events-none" Overlay="#formmodalmdo">
  <span className="sr-only">Close</span>
  <i className="ri-close-line"></i>
</SpkButton>
// End Prism Code//`;

export const modal18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50 hover:text-[#8c9097]" Overlay="#formmodalmdo">
  <span className="sr-only">Close</span>
  <i className="ri-close-line"></i>
</SpkButton>
<SpkButton buttontype="button" customClass="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50/25 pointer-events-none" Overlay="#formmodalmdo">
  <span className="sr-only">Close</span>
  <i className="ri-close-line"></i>
</SpkButton>
// End Prism Code//`;

//OffCanvas

export const offcanvas1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary"
  Overlay="#hs-overlay-example">
  Button
</SpkButton>
<div id="hs-overlay-example"
  className="hs-overlay hidden ti-offcanvas ti-offcanvas-left !z-[105]" tabIndex={-1}>
  <div className="ti-offcanvas-header">
      <h6 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
          Notifications
      </h6>
      <SpkButton buttontype="button"
          customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
          Overlay="#hs-overlay-example">
          <span className="sr-only">Close modal</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"></path>
          </svg>
      </SpkButton>
  </div>
  <div className="ti-offcanvas-body !h-[90%] !p-0">
      <div>
          <ul className="ti-list-group ti-list-group-flush mb-0">
              <li className="ti-list-group-item !border-t-0">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-primary !rounded-full text-white">
                              NW
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">New Website Created<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                                  Nov 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>30
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-danger !rounded-full text-white">
                              CH
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for the new
                              project<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>2
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              S
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Decide the live
                              discussion<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                  Feb 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/12.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-success text-white !rounded-full">
                              RC
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/1.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Brenda New product
                              launching<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>7
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-secondary text-white !rounded-full">
                              M
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Medeleine Hey! there i'm
                              available<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              OL
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Olivia New schedule
                              release<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>45
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-warning text-white !rounded-full">
                              A
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Kamala Preparing for new admin
                              launch<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>28
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/6.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Oisha Meeting with clinet for
                              dinner<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>14
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-danger !rounded-full text-white">
                              CH
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for the new
                              project<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>2
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              S
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Decide the live
                              discussion<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                  Feb 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/14.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-success text-white !rounded-full">
                              RC
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</div>
// End Prism Code//`;

export const offcanvas2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-primary"
  Overlay="#hs-overlay-body-scrolling">
  Enable body scrolling
</SpkButton>
<div id="hs-overlay-body-scrolling"
  className="hs-overlay ti-offcanvas ti-offcanvas-left hidden [--body-scroll:true] [--overlay-backdrop:false] !z-[105]"
  tabIndex={-1}>
  <div className="ti-offcanvas-header">
      <h6 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
          Notifications
      </h6>
      <SpkButton buttontype="button"
          customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
          Overlay="#hs-overlay-body-scrolling">
          <span className="sr-only">Close modal</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"></path>
          </svg>
      </SpkButton>
  </div>
  <div className="ti-offcanvas-body !h-[90%] !p-0">
      <div>
          <ul className="ti-list-group ti-list-group-flush mb-0">
              <li className="ti-list-group-item !border-t-0">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-primary !rounded-full text-white">
                              NW
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">New Website Created<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                                  Nov 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>30
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-danger !rounded-full text-white">
                              CH
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for the new
                              project<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>2
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              S
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Decide the live
                              discussion<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                  Feb 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/12.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-success text-white !rounded-full">
                              RC
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/1.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Brenda New product
                              launching<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>7
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-secondary text-white !rounded-full">
                              M
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Medeleine Hey! there i'm
                              available<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              OL
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Olivia New schedule
                              release<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>45
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-warning text-white !rounded-full">
                              A
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Kamala Preparing for new admin
                              launch<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>28
                              mins ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/6.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Oisha Meeting with clinet for
                              dinner<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>14
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-danger !rounded-full text-white">
                              CH
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for the new
                              project<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                  Jan 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>2
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-info !rounded-full text-white">
                              S
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Decide the live
                              discussion<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                  Feb 2023</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>3
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span className="avatar avatar-md !rounded-full">
                              <Image fill src="../../assets/images/faces/14.jpg" alt=""
                                  className="!rounded-full"/>
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
              <li className="ti-list-group-item">
                  <div className="flex items-center">
                      <div className="me-2">
                          <span
                              className="avatar avatar-md bg-success text-white !rounded-full">
                              RC
                          </span>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                  variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                  Dec 2022</SpkBadge></p>
                          <span
                              className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                  className="ri-time-line align-middle me-1 inline-block"></i>4
                              hrs ago</span>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</div>
// End Prism Code//`;

export const offcanvas3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//

   <Showcode title="Enable backdrop" reactCode={offcanvas3} customCardClass="custom-box">
<SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-primary"
Overlay="#hs-overlay-backdrop-default">
Enable backdrop
</SpkButton>

<div id="hs-overlay-backdrop-default"
className="hs-overlay ti-offcanvas ti-offcanvas-left hidden !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
  <h6 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
      Notifications
  </h6>
  <SpkButton buttontype="button"
      customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
      Overlay="#hs-overlay-backdrop-default">
      <span className="sr-only">Close modal</span>
      <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
              fill="currentColor"></path>
      </svg>
  </SpkButton>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
  <div>
      <ul className="ti-list-group ti-list-group-flush mb-0">
          <li className="ti-list-group-item !border-t-0">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-primary !rounded-full text-white">
                          NW
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">New Website Created<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                              Nov 2022</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>30
                          mins ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new
                          project<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>2
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live
                          discussion<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                              Feb 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>3
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <Image fill src="../../assets/images/faces/12.jpg" alt=""
                              className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                              Dec 2022</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>4
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                              Dec 2022</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>4
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <Image fill src="../../assets/images/faces/1.jpg" alt=""
                              className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Brenda New product
                          launching<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>7
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-secondary text-white !rounded-full">
                          M
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Medeleine Hey! there i'm
                          available<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>3
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-info !rounded-full text-white">
                          OL
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Olivia New schedule
                          release<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>45
                          mins ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-warning text-white !rounded-full">
                          A
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Kamala Preparing for new admin
                          launch<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>28
                          mins ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <Image fill src="../../assets/images/faces/6.jpg" alt=""
                              className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Oisha Meeting with clinet for
                          dinner<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>14
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new
                          project<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                              Jan 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>2
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live
                          discussion<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                              Feb 2023</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>3
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <Image fill src="../../assets/images/faces/14.jpg" alt=""
                              className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                              Dec 2022</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>4
                          hrs ago</span>
                  </div>
              </div>
          </li>
          <li className="ti-list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span
                          className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                              variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                              Dec 2022</SpkBadge></p>
                      <span
                          className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                              className="ri-time-line align-middle me-1 inline-block"></i>4
                          hrs ago</span>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</div>
</div>
</Showcode>
// End Prism Code//`;

export const offcanvas4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//

<SpkButton buttontype="button" customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-primary"
    Overlay="#hs-overlay-backdrop-with-scrolling">
    Enable both scrolling &amp; backdrop
</SpkButton>

<div id="hs-overlay-backdrop-with-scrolling"
    className="hs-overlay ti-offcanvas ti-offcanvas-left hidden !z-[105] [--body-scroll:true]"
    tabIndex={-1} data-hs-overlay-scroll="true">
    <div className="ti-offcanvas-header">
        <h6 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
            Notifications
        </h6>
        <SpkButton buttontype="button"
            customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            Overlay="#hs-overlay-backdrop-with-scrolling">
            <span className="sr-only">Close modal</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"></path>
            </svg>
        </SpkButton>
    </div>
    <div className="ti-offcanvas-body !h-[90%] !p-0">
        <div>
            <ul className="ti-list-group ti-list-group-flush mb-0">
                <li className="ti-list-group-item !border-t-0">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-primary !rounded-full text-white">
                                NW
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">New Website Created<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                                    Nov 2022</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>30
                                mins ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-danger !rounded-full text-white">
                                CH
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Prepare for the new
                                project<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>2
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-info !rounded-full text-white">
                                S
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Decide the live
                                discussion<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                    Feb 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>3
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span className="avatar avatar-md !rounded-full">
                                <Image fill src="../../assets/images/faces/12.jpg" alt=""
                                    className="!rounded-full"/>
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                    Dec 2022</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>4
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-success text-white !rounded-full">
                                RC
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                    Dec 2022</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>4
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span className="avatar avatar-md !rounded-full">
                                <Image fill src="../../assets/images/faces/1.jpg" alt=""
                                    className="!rounded-full"/>
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Brenda New product
                                launching<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>7
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-secondary text-white !rounded-full">
                                M
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Medeleine Hey! there i'm
                                available<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>3
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-info !rounded-full text-white">
                                OL
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Olivia New schedule
                                release<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>45
                                mins ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-warning text-white !rounded-full">
                                A
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Kamala Preparing for new admin
                                launch<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>28
                                mins ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span className="avatar avatar-md !rounded-full">
                                <Image fill src="../../assets/images/faces/6.jpg" alt=""
                                    className="!rounded-full"/>
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Oisha Meeting with clinet for
                                dinner<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>14
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-danger !rounded-full text-white">
                                CH
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Prepare for the new
                                project<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                    Jan 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>2
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-info !rounded-full text-white">
                                S
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Decide the live
                                discussion<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                    Feb 2023</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>3
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span className="avatar avatar-md !rounded-full">
                                <Image fill src="../../assets/images/faces/14.jpg" alt=""
                                    className="!rounded-full"/>
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                    Dec 2022</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>4
                                hrs ago</span>
                        </div>
                    </div>
                </li>
                <li className="ti-list-group-item">
                    <div className="flex items-center">
                        <div className="me-2">
                            <span
                                className="avatar avatar-md bg-success text-white !rounded-full">
                                RC
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                    variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                    Dec 2022</SpkBadge></p>
                            <span
                                className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                    className="ri-time-line align-middle me-1 inline-block"></i>4
                                hrs ago</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
// End Prism Code//`;

export const offcanvas5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <SpkButton buttontype="button"
        customClass="m-1 ms-0 ti-btn  btn-wave ti-btn-primary disabled:pointer-events-none"
        Expand="false"
        Controls="hs-offcanvas-custom-backdrop-color"
        Overlay="#hs-offcanvas-custom-backdrop-color">
        Open offcanvas
    </SpkButton>

    <div id="hs-offcanvas-custom-backdrop-color"
        className="!max-w-[27.5rem] hs-overlay-backdrop-open:bg-primary/50  hs-overlay ti-offcanvas ti-offcanvas-left hidden !z-[105] dark:hs-overlay-backdrop-open:bg-primary/50"
        role="dialog" tabIndex={-1}
        aria-labelledby="hs-offcanvas-custom-backdrop-color-label">
        <div
            className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h6 id="hs-offcanvas-custom-backdrop-color-label"
                className="font-bold text-gray-800 dark:text-white">
                Notifications
            </h6>
            <SpkButton buttontype="button"
                customClass="ti-btn inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none  dark:text-neutral-400 dark:focus:bg-neutral-600"
                Label="Close" Overlay="#hs-offcanvas-custom-backdrop-color">
                <span className="sr-only">Close</span>
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </SpkButton>
        </div>
        <div className="ti-offcanvas-body !p-0">
            <div>
                <ul className="ti-list-group ti-list-group-flush mb-0">
                    <li className="ti-list-group-item !border-t-0">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-primary !rounded-full text-white">
                                    NW
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">New Website Created<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                                        Nov 2022</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>30
                                    mins ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-danger !rounded-full text-white">
                                    CH
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Prepare for the new
                                    project<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>2
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-info !rounded-full text-white">
                                    S
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Decide the live
                                    discussion<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                        Feb 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>3
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span className="avatar avatar-md !rounded-full">
                                    <Image fill src="../../assets/images/faces/12.jpg" alt=""
                                        className="!rounded-full"/>
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                        Dec 2022</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>4
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-success text-white !rounded-full">
                                    RC
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                        Dec 2022</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>4
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span className="avatar avatar-md !rounded-full">
                                    <Image fill src="../../assets/images/faces/1.jpg" alt=""
                                        className="!rounded-full"/>
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Brenda New product
                                    launching<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>7
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-secondary text-white !rounded-full">
                                    M
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Medeleine Hey! there i'm
                                    available<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>3
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-info !rounded-full text-white">
                                    OL
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Olivia New schedule
                                    release<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>45
                                    mins ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-warning text-white !rounded-full">
                                    A
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Kamala Preparing for new admin
                                    launch<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>28
                                    mins ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span className="avatar avatar-md !rounded-full">
                                    <Image fill src="../../assets/images/faces/6.jpg" alt=""
                                        className="!rounded-full"/>
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Oisha Meeting with clinet for
                                    dinner<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>14
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-danger !rounded-full text-white">
                                    CH
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Prepare for the new
                                    project<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                                        Jan 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>2
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-info !rounded-full text-white">
                                    S
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Decide the live
                                    discussion<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                                        Feb 2023</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>3
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span className="avatar avatar-md !rounded-full">
                                    <Image fill src="../../assets/images/faces/14.jpg" alt=""
                                        className="!rounded-full"/>
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                                        Dec 2022</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>4
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                    <li className="ti-list-group-item">
                        <div className="flex items-center">
                            <div className="me-2">
                                <span
                                    className="avatar avatar-md bg-success text-white !rounded-full">
                                    RC
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                                        variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                                        Dec 2022</SpkBadge></p>
                                <span
                                    className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                                        className="ri-time-line align-middle me-1 inline-block"></i>4
                                    hrs ago</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
// End Prism Code//`;

export const offcanvas6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary"
Overlay="#hs-overlay-top">
Toggle top offcanvas
</SpkButton>


<div id="hs-overlay-top"
className="hs-overlay hidden ti-offcanvas ti-offcanvas-top !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
<h5 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
    Offcanvas top
</h5>
<SpkButton buttontype="button"
    customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
    Overlay="#hs-overlay-top">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor" />
    </svg>
</SpkButton>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-4">
<p className="text-gray-800 text-textmuted dark:text-textmuted/50">
    ...
</p>
</div>
</div>
<SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary"
Overlay="#hs-overlay-right">
Toggle right offcanvas
</SpkButton>
<div id="hs-overlay-right" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right"
tabIndex={-1}>
<div className="ti-offcanvas-header">
<h5 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
    Notifications
</h5>
<SpkButton buttontype="button"
    customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
    Overlay="#hs-overlay-right">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor"></path>
    </svg>
</SpkButton>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
<div>
    <ul className="ti-list-group ti-list-group-flush mb-0">
        <li className="ti-list-group-item !border-t-0">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-primary !rounded-full text-white">
                        NW
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">New Website Created<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20
                            Nov 2022</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>30
                        mins ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-danger !rounded-full text-white">
                        CH
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Prepare for the new
                        project<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>2
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-info !rounded-full text-white">
                        S
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Decide the live
                        discussion<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                            Feb 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>3
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span className="avatar avatar-md !rounded-full">
                        <Image fill src="../../assets/images/faces/12.jpg" alt=""
                            className="!rounded-full"/>
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                            Dec 2022</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>4
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-success text-white !rounded-full">
                        RC
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                            Dec 2022</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>4
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span className="avatar avatar-md !rounded-full">
                        <Image fill src="../../assets/images/faces/1.jpg" alt=""
                            className="!rounded-full"/>
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Brenda New product
                        launching<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>7
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-secondary text-white !rounded-full">
                        M
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Medeleine Hey! there i'm
                        available<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>3
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-info !rounded-full text-white">
                        OL
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Olivia New schedule
                        release<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>45
                        mins ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-warning text-white !rounded-full">
                        A
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Kamala Preparing for new admin
                        launch<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>28
                        mins ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span className="avatar avatar-md !rounded-full">
                        <Image fill src="../../assets/images/faces/6.jpg" alt=""
                            className="!rounded-full"/>
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Oisha Meeting with clinet for
                        dinner<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>14
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-danger !rounded-full text-white">
                        CH
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Prepare for the new
                        project<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3
                            Jan 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>2
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-info !rounded-full text-white">
                        S
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Decide the live
                        discussion<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17
                            Feb 2023</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>3
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span className="avatar avatar-md !rounded-full">
                        <Image fill src="../../assets/images/faces/14.jpg" alt=""
                            className="!rounded-full"/>
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Meeting at 3:00 pm<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29
                            Dec 2022</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>4
                        hrs ago</span>
                </div>
            </div>
        </li>
        <li className="ti-list-group-item">
            <div className="flex items-center">
                <div className="me-2">
                    <span
                        className="avatar avatar-md bg-success text-white !rounded-full">
                        RC
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="font-semibold mb-0">Prepare for presentation<SpkBadge
                            variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31
                            Dec 2022</SpkBadge></p>
                    <span
                        className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i
                            className="ri-time-line align-middle me-1 inline-block"></i>4
                        hrs ago</span>
                </div>
            </div>
        </li>
    </ul>
</div>
</div>
</div>
<SpkButton buttontype="button" customClass="ti-btn  btn-wave ti-btn-primary"
Overlay="#hs-overlay-bottom">
Toggle bottom offcanvas
</SpkButton>

<div id="hs-overlay-bottom"
className="hs-overlay hidden ti-offcanvas ti-offcanvas-bottom !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
<h5 className="ti-offcanvas-title !text-[1.25rem] !font-medium">
    Offcanvas title
</h5>
<SpkButton buttontype="button"
    customClass="ti-btn  btn-wave flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white text-textmuted dark:text-textmuted/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
    Overlay="#hs-overlay-bottom">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor" />
    </svg>
</SpkButton>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-4">
<p className="text-gray-800 text-textmuted dark:text-textmuted/50">
    ...
</p>
</div>
</div>
// End Prism Code//`;

// Stepper

export const Stepper1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper>
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 1}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 2}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 3}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name1" className="ti-form-label">Name: </label>
                  <input type="text" id="Name1" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email1" className="ti-form-label">Email: </label>
                  <input type="email" id="Email1" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone1" className="ti-form-label">Telephone: </label>
                  <input type="text" id="Telephone1" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile2" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile2" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder1" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder1" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card1" className="ti-form-label">Card number: </label>
                  <input type="text" id="card1" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry1" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry1" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv1" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv1" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}'
  //  style="display: none;"
   >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn><i className="ri-arrow-left-s-line rtl:rotate-180"></i>
          Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn>Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn 
          
          >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn
          //  style="display: none;"
           >Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

export const Stepper2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper='{"mode": "non-linear"}'>
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 1}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 2}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 3}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name2" className="ti-form-label">Name: </label>
                  <input type="text" id="Name2" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email2" className="ti-form-label">Email: </label>
                  <input type="email" id="Email2" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone2" className="ti-form-label">Telephone: </label>
                  <input type="text" id="Telephone2" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile3" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile3" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder2" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder2" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card2" className="ti-form-label">Card number: </label>
                  <input type="text" id="card2" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry2" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry2" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv2" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv2" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn><i className="ri-arrow-left-s-line rtl:rotate-180"></i>
          Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-skip-btn 
          
          >Skip</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-complete-step-btn='{"completedText": "This step is completed"}'>Complete
          Step</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn>Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn 
          
          >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn 
          
          >Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

export const Stepper3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper>
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group active"
      data-hs-stepper-nav-item='{"index": 1,"isOptional": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group active"
      data-hs-stepper-nav-item='{"index": 2 ,"isOptional": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 3,"isOptional": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name5" className="ti-form-label">Name: </label>
                  <input type="text" id="Name5" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email5" className="ti-form-label">Email: </label>
                  <input type="email" id="Email5" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone5" className="ti-form-label">Telephone:
                  </label>
                  <input type="text" id="Telephone5" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile5" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile5" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3}'
  //  style="display: none;"
   >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder5" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder5" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card5" className="ti-form-label">Card number: </label>
                  <input type="text" id="card5" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry5" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry5" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv5" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv5" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn><i className="ri-arrow-left-s-line rtl:rotate-180"></i>
          Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-skip-btn 
          
          >Skip</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn>Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn 
          
          >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn 
          
          >Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

export const Stepper4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper='{"currentIndex": 2}'>
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
      data-hs-stepper-nav-item='{"index": 1,"isCompleted": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group active"
      data-hs-stepper-nav-item='{"index": 2}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 3}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name3" className="ti-form-label">Name: </label>
                  <input type="text" id="Name3" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email3" className="ti-form-label">Email: </label>
                  <input type="email" id="Email3" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone3" className="ti-form-label">Telephone: </label>
                  <input type="text" id="Telephone3" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile1" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile1" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder3" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder3" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card3" className="ti-form-label">Card number: </label>
                  <input type="text" id="card3" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry3" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry3" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv3" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv3" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}'
  //  style="display: none;"
   >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn><i className="ri-arrow-left-s-line rtl:rotate-180"></i>
          Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn>Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn 
          
          >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn 
          
          >Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

export const Stepper5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper='{"currentIndex": 2}'>
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
      data-hs-stepper-nav-item='{"index": 1,"isCompleted": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success hs-stepper-error:!bg-danger hs-stepper-active:text-white hs-stepper-success:text-white hs-stepper-processed:bg-white hs-stepper-processed:border hs-stepper-processed:border-gray-200 hs-stepper-processed:dark:border-white/10">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden hs-stepper-error:hidden hs-stepper-processed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-error:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
              </svg>
              <span
                  className="hidden animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-white hs-stepper-processed:inline-block"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
              </span>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success hs-stepper-error:!text-danger">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group active"
      data-hs-stepper-nav-item='{"index": 2 , "hasError": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success hs-stepper-error:!bg-danger hs-stepper-active:text-white hs-stepper-success:text-white hs-stepper-processed:bg-white hs-stepper-processed:border hs-stepper-processed:border-gray-200 hs-stepper-processed:dark:border-white/10">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden hs-stepper-error:hidden hs-stepper-processed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-error:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
              </svg>
              <span
                  className="hidden animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-white hs-stepper-processed:inline-block"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
              </span>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success hs-stepper-error:!text-danger">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
      data-hs-stepper-nav-item='{"index": 3}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-active:!text-white hs-stepper-success:!bg-primary hs-stepper-success:!text-white hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name4" className="ti-form-label">Name: </label>
                  <input type="text" id="Name4" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email4" className="ti-form-label">Email: </label>
                  <input type="email" id="Email4" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone4" className="ti-form-label">Telephone: </label>
                  <input type="text" id="Telephone4" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile4" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile4" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder4" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder4" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card4" className="ti-form-label">Card number: </label>
                  <input type="text" id="card4" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry4" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry4" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv4" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv4" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}' 
  
  >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn><i className="ri-arrow-left-s-line rtl:rotate-180"></i>
          Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn>Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn
          //  style="display: none;"
           >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn 
          
          >Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

export const Stepper6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div data-hs-stepper='{"isCompleted": true}' className="completed">
<ul className="relative sm:flex flex-row gap-x-2 sm:space-y-0 space-y-4">
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
      data-hs-stepper-nav-item='{"index": 1,"isCompleted": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success hs-stepper-error:!bg-danger hs-stepper-active:text-white hs-stepper-success:text-white hs-stepper-processed:bg-white hs-stepper-processed:border hs-stepper-processed:border-gray-200 hs-stepper-processed:dark:border-white/10">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden hs-stepper-error:hidden hs-stepper-processed:hidden">1</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-error:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
              </svg>
              <span
                  className="hidden animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-white hs-stepper-processed:inline-block"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
              </span>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success hs-stepper-error:!text-danger">
              Name &amp; Email
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
      data-hs-stepper-nav-item='{"index": 2,"isCompleted": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success hs-stepper-error:!bg-danger hs-stepper-active:text-white hs-stepper-success:text-white hs-stepper-processed:bg-white hs-stepper-processed:border hs-stepper-processed:border-gray-200 hs-stepper-processed:dark:border-white/10">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden hs-stepper-error:hidden hs-stepper-processed:hidden">2</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-error:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
              </svg>
              <span
                  className="hidden animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-white hs-stepper-processed:inline-block"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
              </span>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success hs-stepper-error:!text-danger">
              Contact
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success"
      data-hs-stepper-nav-item='{"index": 3,"isCompleted": true}'>
      <span
          className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
          <span
              className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-bodybg dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:!bg-primary hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success hs-stepper-completed:group-focus:!bg-success hs-stepper-error:!bg-danger hs-stepper-active:text-white hs-stepper-success:text-white hs-stepper-processed:bg-white hs-stepper-processed:border hs-stepper-processed:border-gray-200 hs-stepper-processed:dark:border-white/10">
              <span
                  className="hs-stepper-success:hidden hs-stepper-completed:hidden hs-stepper-error:hidden hs-stepper-processed:hidden">3</span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
              </svg>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-error:block"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
              </svg>
              <span
                  className="hidden animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-white hs-stepper-processed:inline-block"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
              </span>
          </span>
          <span
              className="ms-2 text-sm font-medium text-gray-800 dark:text-white hs-stepper-active:!text-primary hs-stepper-success:!text-primary hs-stepper-completed:!text-success hs-stepper-error:!text-danger">
              Payment
          </span>
      </span>
      <div
          className="hidden sm:block w-full h-px flex-1 bg-gray-200 dark:bg-bodybg group-last:hidden hs-stepper-success:!bg-primary hs-stepper-completed:!bg-success">
      </div>
  </li>
</ul>
<div className="mt-5 sm:mt-8">
  <div data-hs-stepper-content-item='{"index": 1,"isCompleted": true}'
      
      >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Name6" className="ti-form-label">Name: </label>
                  <input type="text" id="Name6" className="ti-form-input"
                      placeholder="Enter Name"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Email6" className="ti-form-label">Email: </label>
                  <input type="email" id="Email6" className="ti-form-input"
                      placeholder="Enter Email"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 2,"isCompleted": true}'
      
      >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 space-y-2 sm:space-y-0">
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Telephone6" className="ti-form-label">Telephone:
                  </label>
                  <input type="text" id="Telephone6" className="ti-form-input"
                      placeholder="Enter Telephone"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Mobile6" className="ti-form-label">Mobile: </label>
                  <input type="text" id="Mobile6" className="ti-form-input"
                      placeholder="Enter Mobile"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"index": 3,"isCompleted": true}'
      
      >
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
              <div className="col-span-12">
                  <label htmlFor="cardholder4" className="ti-form-label">CardHolder Name:
                  </label>
                  <input type="text" id="cardholder6" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="col-span-12">
                  <label htmlFor="card6" className="ti-form-label">Card number: </label>
                  <input type="text" id="card6" className="ti-form-input"
                      placeholder="Enter card Details"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="Expiry6" className="ti-form-label">Expiry: </label>
                  <input type="text" id="Expiry6" className="ti-form-input"
                      placeholder="Enter Expiry Date"/>
              </div>
              <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="cvv6" className="ti-form-label">CVV: </label>
                  <input type="text" id="cvv6" className="ti-form-input"
                      placeholder="Enter CVV"/>
              </div>
          </div>
      </div>
  </div>
  <div data-hs-stepper-content-item='{"isFinal": true}'>
      <div
          className="p-6 bg-gray-50 dark:bg-bodybg border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
          <div className="text-center">
              <i className="ri-checkbox-circle-line text-7xl text-success"></i>
              <h4 className="text-xl font-semibold mb-1">Hurray !..Your Payment is
                  Successfull</h4>
          </div>
      </div>
  </div>
  <div className="mt-5 sm:flex justify-between items-center gap-x-2">
      <button type="button"
          className="ti-btn ti-btn-light disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-back-btn 
          
          ><i
              className="ri-arrow-left-s-line rtl:rotate-180"></i> Back</button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-next-btn 
          
          >Next<i
              className="ri-arrow-right-s-line rtl:rotate-180"></i></button>
      <button type="button"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-finish-btn 
          
          >Finish</button>
      <button type="reset"
          className="ti-btn ti-btn-primary-full disabled:opacity-50 disabled:pointer-events-none"
          data-hs-stepper-reset-btn>Reset</button>
  </div>
</div>
</div>
// End Prism Code//`;

//Skeleton


export const Skeleton1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <div className="flex animate-pulse">
    <div className="flex-shrink-0">
        <span className="size-12 block bg-gray-200 rounded-full dark:bg-light"></span>
    </div>
    
    <div className="ms-4 mt-2 w-full">
        <p className="h-4 bg-gray-200 rounded-full dark:bg-light" style={{ width: "40%" }}></p>
    
        <ul className="mt-5 space-y-3">
        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
        <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
        </ul>
    </div>
</div>
// End Prism Code//`;
export const Skeleton2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <ul className="mt-5 space-y-3">
    <li className="w-full h-10 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-full h-6 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-full h-2 bg-gray-200 rounded-full dark:bg-light"></li>
</ul>
// End Prism Code//`;
export const Skeleton3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <ul className="mt-5 space-y-3">
    <li className="w-full h-4 bg-primary/50 rounded-full"></li>
    <li className="w-full h-4 bg-secondary/50 rounded-full"></li>
    <li className="w-full h-4 bg-success/50 rounded-full"></li>
    <li className="w-full h-4 bg-orangemain/50 rounded-full"></li>
    <li className="w-full h-4 bg-warning/50 rounded-full"></li>
</ul>
// End Prism Code//`;
export const Skeleton4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <ul className="mt-5 space-y-3">
    <li className="w-[25%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-[50%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-[75%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
</ul>
// End Prism Code//`;