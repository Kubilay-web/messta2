import SpkAccordions from "@/shared/@spk-reusable-components/advanced-ui/spk-accordions"

//Accordions
export const Basicaccordion = [
  {
    Id: 'hs-basic-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  }
]
export const Alwaysopendata = [
  {
    Id: 'hs-basic-always-open-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-always-open-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-always-open-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  }
]
const Subnest = [
  {
    Id: 'hs-basic-nested-sub-collapse-one',
    title: ' Sub accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It
      is hidden by default, until the collapse plugin adds
      the appropriate classes that we use to style each
      element. These classes control the overall appearance,
      as well as the showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-nested-sub-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-nested-sub-collapse-two',
    title: ' Sub accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-nested-sub-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-nested-sub-collapse-three',
    title: ' Sub accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It
      is hidden by default, until the collapse plugin adds
      the appropriate classes that we use to style each
      element. These classes control the overall appearance,
      as well as the showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-nested-sub-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  }
]
export const Nestingarrow = [
  {
    Id: 'hs-basic-nested-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content:
      <SpkAccordions items={Subnest} SvgIcon={true} Titletext="after" Groupclass="ps-6" Toggleclass="hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" />,
    Mainid: "hs-basic-nested-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-nested-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the second item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-nested-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-nested-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the first item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-nested-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  }
]
export const NoArrowdata = [
  {
    Id: 'hs-basic-no-arrow-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-no-arrow-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-no-arrow-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-no-arrow-collapse-four',
    title: 'Accordion #4',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-four",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-no-arrow-collapse-five',
    title: 'Accordion #5',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-five",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-no-arrow-collapse-six',
    title: 'Accordion #6',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-no-arrow-heading-six",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /> <path d="M12 5v14" /></>,
    Svgcontent2: <><path d="M5 12h14" /></>
  }
]
export const Witharrow = [
  {
    Id: 'hs-basic-with-arrow-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  },
  {
    Id: 'hs-basic-with-arrow-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  },
  {
    Id: 'hs-basic-with-arrow-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-always-open-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  }
]
export const Arrowstretched = [
  {
    Id: 'hs-basic-with-arrow-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow-stretched-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  },
  {
    Id: 'hs-basic-with-arrow-collapse-two',
    title: 'Accordion #2',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow-stretched-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  },
  {
    Id: 'hs-basic-with-arrow-collapse-three',
    title: 'Accordion #3',
    Customclass: '',
    content: <p className="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow-stretched-heading-three",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="m6 9 6 6 6-6" /></>,
    Svgcontent2: <><path d="m18 15-6-6-6 6" /></>
  }
]
export const Borderedaccordion = [
  {
    Id: 'hs-basic-bordered-collapse-one',
    title: 'Accordion #1',
    Customclass: 'active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg overflow-hidden dark:bg-bodybg dark:border-white/10',
    content: <div className="pb-4 px-5">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-bordered-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-bordered-collapse-two',
    title: 'Accordion #2',
    Customclass: 'bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg overflow-hidden dark:bg-bodybg dark:border-white/10',
    content: <div className="pb-4 px-5 dark:bg-bodybg">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the third item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-bordered-heading-two",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-bordered-collapse-three',
    title: 'Accordion #3',
    Customclass: 'bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg overflow-hidden dark:bg-bodybg dark:border-white/10',
    content: <div className="pb-4 px-5 dark:bg-bodybg">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the third item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-bordered-heading-three",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  }
]
export const Activebordered = [
  {
    Id: 'hs-basic-active-bordered-collapse-one',
    title: 'Accordion #1',
    Customclass: 'hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
    content: <div className="pb-4 px-5">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-active-bordered-heading-one",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-active-bordered-collapse-two',
    title: 'Accordion #2',
    Customclass: 'hs-accordion hs-accordion-active:border-gray-200 active bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
    content: <div className="pb-4 px-5">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-active-bordered-heading-two",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  },
  {
    Id: 'hs-basic-active-bordered-collapse-three',
    title: 'Accordion #3',
    Customclass: 'hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent',
    content: <div className="pb-4 px-5">
      <p className="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is
        hidden by default, until the collapse plugin adds the
        appropriate classes that we use to style each element.
        These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions.
      </p>
    </div>,
    Mainid: "hs-active-bordered-heading-three",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    Svgcontent2: <> <path d="M5 12h14" /></>
  }
]
export const Basiccustomaccordion = [
  {
    Id: 'hs-basic-collapse-custom-one',
    title: 'Accordion #1',
    Customclass: 'accordion-item overflow-hidden !border-b-0',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-heading-custom-one",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",

  },
  {
    Id: 'hs-basic-collapse-custom-two',
    title: 'Accordion #2',
    Customclass: 'accordion-item !border-b-0',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-heading-custom-two",
    Custombodyclass: "hidden",
  },
  {
    Id: 'hs-basic-collapse-custom-three',
    title: 'Accordion #3',
    Customclass: 'accordion-item overflow-hidden',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-heading-custom-three",
    Custombodyclass: "hidden",
  }
]
export const Basicwithiconaccordion = [
  {
    Id: 'hs-basic-with-arrow1-collapse-one',
    title: 'Accordion #1',
    Customclass: 'accordion-item overflow-hidden !border-b-0',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-with-arrow1-heading-one",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-with-arrow1-collapse-two',
    title: 'Accordion #2',
    Customclass: 'accordion-item !border-b-0',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-with-arrow1-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-with-arrow1-collapse-three',
    title: 'Accordion #3',
    Customclass: 'accordion-item overflow-hidden',
    content: <div className="accordion-body">
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
    Mainid: "hs-basic-with-arrow1-heading-three",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <> <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Arrowbasicstretched = [
  {
    Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-one',
    title: 'Accordion #1',
    Customclass: 'accordion-item  overflow-hidden !border-b-0',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow1-stretched-heading-one",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-two',
    title: 'Accordion #2',
    Customclass: 'accordion-item  overflow-hidden !border-b-0',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow1-stretched-heading-two",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-with-title-and-arrow1-stretched-collapse-three',
    title: 'Accordion #3',
    Customclass: 'accordion-item  overflow-hidden',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-basic-with-title-and-arrow1-stretched-heading-three",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Primarysoftcolor = [
  {
    Id: 'hs-accordion-collapse-1',
    title: 'Accordion #1',
    Customclass: 'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-1",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-accordion-collapse-2',
    title: 'Accordion #2',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-2",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-accordion-collapse-3',
    title: 'Accordion #3',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-3",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Secondarysoftcolor = [
  {
    Id: 'hs-accordion-collapse-1-primary',
    title: 'Accordion #1',
    Customclass: 'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-1-primary",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-accordion-collapse-2-primary',
    title: 'Accordion #2',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-2-primary",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-accordion-collapse-3-primary',
    title: 'Accordion #3',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-accordion-heading-3-primary",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Solidprimary = [
  {
    Id: 'hs-primary-collapse-1',
    title: 'Accordion #1',
    Customclass: 'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-primary-heading-1",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-primary-collapse-2',
    title: 'Accordion #2',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-primary-heading-2",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-primary-collapse-3',
    title: 'Accordion #3',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-primary-heading-3",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Solidsecondary = [
  {
    Id: 'hs-primary-collapse-1',
    title: 'Accordion #1',
    Customclass: 'active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-secondary-heading-1",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-primary-collapse-2',
    title: 'Accordion #2',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-secondary-heading-2",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-primary-collapse-3',
    title: 'Accordion #3',
    Customclass: 'overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10',
    content: <p className="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is
      hidden by default, until the collapse plugin adds the
      appropriate classes that we use to style each element. These
      classes control the overall appearance, as well as the
      showing and hiding via CSS transitions.
    </p>,
    Mainid: "hs-secondary-heading-3",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const colored = [
  {
    Id: 'hs-basic-collapse1',
    title: 'Accordion Item #1',
    Customclass: 'accordion-item active',
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
    Mainid: "hs-basic-heading1",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse2',
    title: 'Accordion  Item  #2',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading2",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse3',
    title: 'Accordion  Item  #3',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading3",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Successcolored = [
  {
    Id: 'hs-basic-collapse11',
    title: 'Accordion  Item  #1',
    Customclass: 'accordion-item active',
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
    Mainid: "hs-basic-heading11",
    Custombodyclass: "",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse12',
    title: 'Accordion  Item  #2',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading12",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse13',
    title: 'Accordion  Item  #3',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading13",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]

export const Leftalignedicons = [
  {
    Id: 'hs-basic-collapse21',
    title: 'Accordion Item #1',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading21",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse22',
    title: 'Accordion Item #2',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading22",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse23',
    title: 'Accordion Item #3',
    Customclass: 'accordion-item',
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
    Mainid: "hs-basic-heading23",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
export const Customaccaordion = [
  {
    Id: 'hs-basic-collapse31',
    title: 'Accordion Item  #1',
    Customclass: 'accordion-item custom-accordion-primary',
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
    Mainid: "hs-basic-heading31",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse32',
    title: 'Accordion Item  #2',
    Customclass: 'accordion-item custom-accordion-secondary',
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
    Mainid: "hs-basic-heading32",
    Custombodyclass: "hidden",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  },
  {
    Id: 'hs-basic-collapse33',
    title: 'Accordion Item  #3',
    Customclass: 'accordion-item custom-accordion-danger',
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
    Mainid: "hs-basic-heading33",
    Custombodyclass: "hidden ",
    Svgclass: "block size-4",
    Svgclass1: "hidden size-4 ",
    Svgcontent1: <><path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    Svgcontent2: <><path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
  }
]
