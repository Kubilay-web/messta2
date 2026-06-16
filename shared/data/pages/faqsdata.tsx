//Accordions
export const accordion = [
    {
        Id: 'faq-collapse-one',
        title: ' 1. How can I change the color scheme of the admin template? ',
        Customclass: 'active bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">Navigate to the "Theme
                Settings" page, where you'll find options to choose a primary color and accent
                color. Select your desired colors and save the changes.
            </p>
        </div>,
        Mainid: "faq-one",
        Custombodyclass: "w-full  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. Is it possible to upload a custom logo for my admin dashboard?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. Are there predefined themes available, or can I create a custom theme?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. Can I use my own CSS styles to override the default styles?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. How do I enable or disable the dark mode?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]
export const accordion1 = [
    {
        Id: 'faq-collapse-one1',
        title: ' 1. What are user roles, and how do they affect access  permissions? ',
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                User roles define the level of access. Visit "User Roles" in the admin settings to
                manage roles and customize permissions for each role.
            </p>
        </div>,
        Mainid: "faq-one2",
        Custombodyclass: "w-full overflow-hidden hidden  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. Can I reset a user's password as an administrator?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. Is there a way to import multiple users simultaneously?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. How can I view the login history of a specific user?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. What happens if a user forgets their password?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]
export const accordion2 = [
    {
        Id: 'faq-collapse-one',
        title: '1. Can I schedule automatic data exports for specific intervals? ',
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                User roles define the level of access. Visit "User Roles" in the admin settings to
                manage roles and customize permissions for each role.
            </p>
        </div>,
        Mainid: "faq-one2",
        Custombodyclass: "w-full overflow-hidden hidden  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. What types of data can be exported from the admin template?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. Is there a limit to the size of exported files?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. Can I customize the format of exported reports?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. How do I generate and download a quick summary  report?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]
export const accordion3 = [
    {
        Id: 'faq-collapse-one',
        title: '1. Are there security measures in place to protect against unauthorized access? ',
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                User roles define the level of access. Visit "User Roles" in the admin settings to
                manage roles and customize permissions for each role.
            </p>
        </div>,
        Mainid: "faq-one2",
        Custombodyclass: "w-full overflow-hidden hidden  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. Can I enable two-factor authentication for admin accounts?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. What should I do if I suspect a security breach?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. How often should I update the admin template for security patches?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. Can I restrict access to certain features based on user roles?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]
export const accordion4 = [
    {
        Id: 'faq-collapse-one',
        title: '1. How do I rearrange the order of items in the navigation menu? ',
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                User roles define the level of access. Visit "User Roles" in the admin settings to
                manage roles and customize permissions for each role.
            </p>
        </div>,
        Mainid: "faq-one2",
        Custombodyclass: "w-full overflow-hidden hidden  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. Is it possible to customize the dashboard layout?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. Can I set a default landing page for users after login?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. How do I enable or disable email notifications for certain events?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. Is there a search feature available to quickly find specific data or settings?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]
export const accordion5 = [
    {
        Id: 'faq-collapse-one',
        title: '1. What should I do if the admin template is not loading correctly? ',
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10',
        content: <div className="p-5">
            <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                User roles define the level of access. Visit "User Roles" in the admin settings to
                manage roles and customize permissions for each role.
            </p>
        </div>,
        Mainid: "faq-one2",
        Custombodyclass: "w-full overflow-hidden hidden  transition-[height] duration-300",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-two', title: "2. How can I report a bug or technical issue with the admin template?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-two",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-three', title: "3. Are there known compatibility issues with certain browsers or devices?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className="">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-three",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-four', title: "4. What do I do if I forget my username or encounter issues with login?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-four",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
    {
        Id: 'faq-collapse-five', title: "5. How do I check for updates and apply patches to fix issues?",
        Customclass: 'bg-white dark:bg-bodybg border dark:border-defaultborder/10 border-defaultborder mt-[0.5rem] rounded-sm',
        content: <div className="p-5">
            <p className=" ">
                <strong>This is the first item's accordion body.</strong> It
                is shown by
                default, until the collapse plugin adds the appropriate
                classes that we
                use to style each element. These classes control the overall
                appearance,
                as well as the showing and hiding via CSS transitions. You
                can modify
                any of this with custom CSS or overriding our default
                variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does
                limit overflow.
            </p>
        </div>,
        Mainid: "faq-five",
        Custombodyclass: "w-full overflow-hidden hidden transition-[height] duration-300 hidden",
        Svgclass: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80",
        Svgclass1: "hs-accordion-active:!text-primary hs-accordion-active:!bg-white hs-accordion-active:dark:!bg-bodybg hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] pt-[4px] pb-[3px] pl-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 ",

        Svgcontent1: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path>
            <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"></path></>,
        Svgcontent2: <> <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"></path></>
    },
]