"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import * as uiElementsPrism from "@/shared/data/prism/ui-elements-prism";
import { Dropdowndat6 } from "@/shared/data/prism/utilities-prism";
import { SingleButtons } from "@/shared/data/ui-elements/dropdownsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface DropdownsProps { }

const Dropdowns: FC<DropdownsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Dropdowns" />
            <Pageheader Heading="Dropdowns" breadcrumbs={['Ui Elements']} currentpage="Dropdowns" />
            {/* <!-- Page Header Close --> */}

            {/* <!--Start:: row-1--> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Dropdowns" reactCode={uiElementsPrism.reactdropdown1} reusableCode={uiElementsPrism.reusedropdown1}>
                        <div className="ti-btn-list flex align-center flex-wrap">
                            <SpkDropdown Dropdownoptions Icon={true} Toggletext="Dropdown button" arialexpand={false} Menulabel="dropdownMenuButton1" iconPosition="after" color="primary"
                                Customclass="me-2" buttonid="dropdownMenuButton1" IconClass="ri-arrow-down-s-line align-middle ms-2 inline-block" CustomToggleclass="!py-2 ti-dropdown-toggle">
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Action</Link></li>
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Another action</Link></li>
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Icon={true} Toggletext="Dropdown link" iconPosition="after" Menulabel="dropdownMenuLink" arialexpand={false} color="secondary" CustomToggleclass="!py-2 ti-dropdown-toggle" buttonid="dropdownMenuLink" IconClass="ri-arrow-down-s-line align-middle ms-2 inline-block">
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Action</Link></li>
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" href="#!" scroll={false}>Something else here</Link></li>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Single Button Dropdowns" reactCode={uiElementsPrism.reactdropdown2} reusableCode={uiElementsPrism.reusedropdown2} dataCode={Dropdowndat6}>
                        <div className="ti-btn-list">
                            {SingleButtons.map((idx) => (
                                <div className="ti-btn-group !p-0 !border-0 !m-0" key={idx.id}>
                                    <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]"
                                        Menulabel="dropdownMenuButton2" arialexpand={false} CustomToggleclass={`ti-btn ti-btn-${idx.class} ti-dropdown-toggle`}
                                        buttonid="dropdownMenuButton2">
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Action</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Another action</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Something else here</Link></li>
                                    </SpkDropdown>
                                </div>
                            ))}
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!--End:: row-1--> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Rounded Dropdown Buttons" reactCode={uiElementsPrism.reactdropdown3} reusableCode={uiElementsPrism.reusedropdown3} dataCode={Dropdowndat6}>
                        <div className="ti-btn-list">
                            {SingleButtons.map((idx) => (
                                <div className="ti-btn-group !p-0 !border-0 !m-0" key={idx.id}>
                                    <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton3" arialexpand={false}
                                        CustomToggleclass={`ti-btn ti-btn-${idx.class} ti-dropdown-toggle !rounded-full`} buttonid="dropdownMenuButton3">
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                    </SpkDropdown>
                                </div>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Dropdown Sizing" reactCode={uiElementsPrism.reactdropdown7} reusableCode={uiElementsPrism.reusedropdown7}>
                        <SpkDropdown Arrowicon={true} Customclass="ti-btn-group !p-0 !mb-2 !me-2 !border-0" Toggletext="Large button" color="primary" arialexpand={false}
                            CustomToggleclass="ti-btn-lg ti-dropdown-toggle">
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                        </SpkDropdown>
                        <div className="ti-btn-group !p-0 !mb-2 !m-0 !border-0 !me-2">
                            <div className="hs-dropdown ti-dropdown">
                                <SpkButton
                                    customClass="ti-btn-lg ti-btn-light !border !border-defaultborder dark:!border-defaultborder/10 !me-0 !rounded-e-none ti-dropdown-toggle"
                                    buttontypetype="button" Id="dropdownMenuButton32"
                                    aria-expanded="false">
                                    Large split button
                                </SpkButton>
                                <SpkDropdown Arrowicon={true} Customclass="[--placement:bottom-left]" buttonid="hs-split-dropdown" arialexpand={false}
                                    CustomToggleclass="ti-btn-lg !m-0 !py-[0.75rem] !border-s-0 !px-[1rem] ti-btn-light hover:!bg-light !rounded-tl-none !rounded-bl-none rtl:!rounded-tr-none rtl:!rounded-br-none  rtl:!rounded-tl-sm rtl:!rounded-bl-sm ti-dropdown-toggle -ms-[4px]"
                                    Menulabel="dropdownMenuButton32">
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                </SpkDropdown>
                            </div>
                        </div>
                        <div className="ti-btn-group !p-0 !mb-2 !me-2 !border-0">
                            <SpkDropdown Arrowicon={true} Toggletext="Small button" Customclass="ti-btn-group !p-0 !mb-0 !m-0 !border-0" buttonid="hs-split-dropdown" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-primary !py-1 !px-4 !text-[0.75rem] ti-dropdown-toggle"
                                Menulabel="hs-split-dropdown">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                        </div>
                        <div className="ti-btn-group !p-0 !mb-2 !m-0 !border-0">
                            <div className="hs-dropdown ti-dropdown">
                                <SpkButton
                                    customClass="ti-btn btn-wave  !py-1 !px-4 !text-[0.75rem]  ti-btn-light !border !border-defaultborder  dark:!border-defaultborder/10 !me-0 !rounded-e-none ti-dropdown-toggle"
                                    buttontype="button" id="dropdownMenuButton33"
                                    aria-expanded="false">
                                    Small split button
                                </SpkButton>
                                <SpkDropdown Arrowicon={true} Toggletext="" Customclass="[--placement:bottom-left]" buttonid="hs-split-dropdown" arialexpand={false}
                                    CustomToggleclass="ti-btn !py-1 !px-2 hover:!bg-light !border-s-0  ti-btn-light opacity-[0.85] !rounded-tl-none !rounded-bl-none rtl:!rounded-tr-none rtl:!rounded-br-none  rtl:!rounded-tl-sm rtl:!rounded-bl-sm ti-dropdown-toggle -ms-[4px]  pb-[0.4rem]"
                                    Menulabel="hs-split-dropdown">
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                </SpkDropdown>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Button Dropdowns" reactCode={uiElementsPrism.reactdropdown4} reusableCode={uiElementsPrism.reusedropdown4} dataCode={Dropdowndat6}>
                        <div className="ti-btn-list">
                            {SingleButtons.map((idx) => (
                                <div className="ti-btn-group !p-0 !border-0 !m-0" key={idx.id}>
                                    <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton4" arialexpand={false}
                                        CustomToggleclass={`ti-btn ti-btn-outline-${idx.class} ti-dropdown-toggle `} buttonid="dropdownMenuButton4">
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                    </SpkDropdown>
                                </div>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Button Dropdowns" reactCode={uiElementsPrism.reactdropdown5} reusableCode={uiElementsPrism.reusedropdown5} dataCode={Dropdowndat6}>
                        <div className="ti-btn-list">
                            {SingleButtons.map((idx) => (
                                <div className="ti-btn-group  !p-0 !border-0 !m-0" key={idx.id}>
                                    <SpkDropdown Arrowicon={true} Toggletext="Action" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton5" arialexpand={false}
                                        CustomToggleclass={`ti-btn ti-btn-outline-${idx.class} ti-dropdown-toggle !rounded-full`} buttonid="dropdownMenuButton5">
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                        <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                    </SpkDropdown>
                                </div>
                            ))}
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Spilt Dropdowns" reactCode={uiElementsPrism.reactdropdown6} reusableCode={uiElementsPrism.reusedropdown6} dataCode={Dropdowndat6}>
                        <div className="ti-btn-list">
                            {SingleButtons.map((idx) => (
                                <div className="ti-btn-group !p-0 !border-0 !m-0" key={idx.id}>
                                    <div className="inline-flex">
                                        <SpkButton
                                            customClass={`ti-btn ti-btn-${idx.class} !me-0 !rounded-e-none`}
                                            buttontype="button" Id="dropdownMenuButton26"
                                            Expand="false">
                                            Action
                                        </SpkButton>
                                        <SpkDropdown Arrowicon={true} Toggletext="" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" Menulabel="dropdownMenuButton26" arialexpand={false}
                                            CustomToggleclass={`ti-btn ti-btn-${idx.class} btn-wave  ti-btn-primary opacity-[0.85] !m-0 !rounded-s-none ti-dropdown-toggle`} buttonid="dropdownMenuButton26">
                                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                        </SpkDropdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropup" reactCode={uiElementsPrism.reactdropdown8} reusableCode={uiElementsPrism.reusedropdown8}>
                        <SpkDropdown Svg={true} Toggletext="Dropup" Customclass="[--placement:top-left] rtl:[--placement:top-right] m-1" SvgClass="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                            Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright" arialexpand={false}
                            CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-primary !py-2" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link>
                        </SpkDropdown>
                        <div className="ti-dropdown m-1">
                            <SpkButton buttonid="button" customClass="relative ti-dropdown-toggle  ti-btn btn-wave !m-0 ti-btn-secondary !py-1 !rounded-e-none !me-0">
                                Split dropup
                            </SpkButton>
                            <SpkDropdown Svg={true} Customclass="[--placement:top-left]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle relative ti-btn btn-wave  ti-btn-secondary !opacity-[0.85] !m-0 !rounded-s-none ti-dropdown-toggle" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropup Right" reactCode={uiElementsPrism.reactdropdown9} reusableCode={uiElementsPrism.reusedropdown9}>
                        <SpkDropdown Svg={true} Toggletext="Dropright" Customclass="[--placement:right-top] m-1" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                            Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright" arialexpand={false}
                            CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-primary !py-2" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
                            <Link className="ti-dropdown-item" scroll={false} href="#!">
                                Action
                            </Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">
                                Another action
                            </Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">
                                Something else here
                            </Link>
                            <Link scroll={false} href="#!" aria-label="anchor">
                                <hr className="dropdown-divider" />
                            </Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">
                                Separated link
                            </Link>
                        </SpkDropdown>
                        <div className="hs-dropdown ti-dropdown [--placement:right-top] m-1">
                            <SpkButton buttontype="button" customClass="hs-dropdown-toggle relative ti-btn btn-wave  ti-btn-secondary !py-2 !rounded-e-none ti-dropdown-toggle !me-0">
                                Split dropright
                            </SpkButton>
                            <SpkDropdown Svg={true} Customclass=" [--placement:left-top]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn btn-wave  ti-btn-secondary !rounded-s-none" Custommenuclass="transition-none" Menulabel="hs-split-dropright">
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!"> Something else here</Link>
                                <Link scroll={false} href="#!" aria-label="anchor"><hr className="dropdown-divider" /></Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">  Separated link</Link>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropup Left" reactCode={uiElementsPrism.reactdropdown10} reusableCode={uiElementsPrism.reusedropdown10}>
                        <SpkDropdown Svg={true} Svgaftertext="Dropleft" Customclass="[--placement:left-top] m-1" SvgClass="w-auto h-2.5 text-white" Strokewidth="2" SvgStroke="currentColor"
                            Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright3" arialexpand={false}
                            CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-primary !py-2" Custommenuclass="transition-none" Menulabel="hs-dropright3">
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!"> Something else here</Link>
                            <Link scroll={false} href="#!" aria-label="anchor"><hr className="dropdown-divider" /></Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">  Separated link</Link>
                        </SpkDropdown>
                        <div className="hs-dropdown ti-dropdown [--placement:left-top] m-1">
                            <SpkDropdown Svg={true} Customclass=" [--placement:left-top]" SvgClass="w-auto h-2.5 text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-split-dropright1" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn btn-wave !m-0 ti-btn-secondary !rounded-e-none" Custommenuclass="transition-none" Menulabel="hs-split-dropright1">
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!"> Something else here</Link>
                                <Link scroll={false} href="#!" aria-label="anchor"><hr className="dropdown-divider" /></Link>
                                <Link className="ti-dropdown-item" scroll={false} href="#!">  Separated link</Link>
                            </SpkDropdown>
                            <SpkButton buttontype="button"
                                customClass="hs-dropdown-toggle relative ti-btn btn-wave  ti-btn-secondary !m-0  !py-2 !rounded-s-none ti-dropdown-toggle !me-0">
                                Split dropleft
                            </SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Active" reactCode={uiElementsPrism.reactdropdown11} reusableCode={uiElementsPrism.reusedropdown11}>
                        <SpkDropdown Arrowicon={true} Toggletext="Dropstart" arialexpand={false}
                            CustomToggleclass="ti-btn btn-wave  ti-btn-primary ti-dropdown-toggle !py-2" >
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Regular link</Link></li>
                            <li><Link className="ti-dropdown-item active" scroll={false} href="#!" aria-current="true">Active link</Link></li>
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another link</Link></li>
                        </SpkDropdown>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Disabled" reactCode={uiElementsPrism.reactdropdown12} reusableCode={uiElementsPrism.reusedropdown12}>
                        <SpkDropdown Arrowicon={true} Toggletext="Dropstart" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" arialexpand={false}
                            CustomToggleclass="ti-btn-primary ti-dropdown-toggle !py-2" >
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Regular link</Link></li>
                            <li><Link className="ti-dropdown-item disabled" scroll={false} href="#!" aria-current="true">Active link</Link></li>
                            <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another link</Link></li>
                        </SpkDropdown>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Auto Close Behaviour" reactCode={uiElementsPrism.reactdropdown13} reusableCode={uiElementsPrism.reusedropdown13}>
                        <div className="ti-btn-list">
                            <div className="ti-btn-group !p-0 !m-0 !border-0">
                                <SpkDropdown Arrowicon={true} Toggletext="Default dropdown" Customclass="" arialexpand={false}
                                    CustomToggleclass="ti-btn btn-wave  ti-btn-primary ti-dropdown-toggle" buttonid="defaultDropdown" Menulabel="defaultDropdown" >
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                </SpkDropdown>
                            </div>
                            <div className="ti-btn-group !p-0 !m-0 !border-0">
                                <SpkDropdown Arrowicon={true} Toggletext="Clickable outside" arialexpand={false}
                                    CustomToggleclass="ti-btn btn-wave  ti-btn-secondary ti-dropdown-toggle" buttonid="dropdownMenuClickableOutside" Menulabel="dropdownMenuClickableOutside" >
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                </SpkDropdown>
                            </div>
                            <div className="ti-btn-group !p-0 !m-0 !border-0">
                                <SpkDropdown Arrowicon={true} Toggletext="Clickable inside" arialexpand={false}
                                    CustomToggleclass="ti-btn btn-wave  ti-btn-info ti-dropdown-toggle" buttonid="dropdownMenuClickableInside" Menulabel="dropdownMenuClickableInside" >
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                </SpkDropdown>
                            </div>
                            <div className="ti-btn-group !p-0 !m-0 !border-0">
                                <SpkDropdown Arrowicon={true} Toggletext="Manual close" Customclass="" arialexpand={false} buttonid="dropdownMenuClickable" Menulabel="dropdownMenuClickable"
                                    CustomToggleclass="ti-btn btn-wave  ti-btn-warning ti-dropdown-toggle" >
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                    <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link> </li>
                                </SpkDropdown>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Dropdowns With Forms" reactCode={uiElementsPrism.reactdropdown14} reusableCode={uiElementsPrism.reusedropdown14}>
                        <SpkDropdown Arrowicon={true} Toggletext="Dropdown" Customclass="[--auto-close:inside]" arialexpand={false} buttonid="hs-dropdown-auto-close-inside" Menulabel="hs-dropdown-auto-close-inside"
                            CustomToggleclass="ti-btn ti-btn-secondary !py-2" id="hs-dropdown-auto-close-inside" >
                            <form className="!px-6 !py-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email
                                        address</label>
                                    <input type="email" className="form-control w-full !rounded-md"
                                        id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleDropdownFormPassword1"
                                        className="form-label">Password</label>
                                    <input type="password" className="form-control w-full !rounded-md"
                                        id="exampleDropdownFormPassword1" placeholder="Password" />
                                </div>
                                <div className="mb-4">
                                    <div className="form-check !ps-0">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                                        <label className="ps-2 form-check-label" htmlFor="dropdownCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
                            </form>
                            <div className="dropdown-divider"></div>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">New around here? Sign
                                up</Link>
                            <Link className="ti-dropdown-item" scroll={false} href="#!">Forgot password?</Link>
                        </SpkDropdown>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}

            {/* <!-- Start:: row-7 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-9 col-span-12">
                    <Showcode title="Alignment Options" reactCode={uiElementsPrism.reactdropdown15} reusableCode={uiElementsPrism.reusedropdown15}>
                        <div className="">
                            <SpkDropdown Arrowicon={true} Toggletext="Dropdown" Customclass="[--placement:bottom-left] rtl:[--placement:bottom-right]" arialexpand={false}
                                buttonid="dropdownMenuButton" Menulabel="dropdownMenuButton" CustomToggleclass="ti-btn btn-wave  ti-btn-primary ti-dropdown-toggle mb-0 !py-2" >
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Right-aligned menu" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-secondary ti-dropdown-toggle mb-0 !py-2" Custommenuclass="ti-dropdown-menu-end">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext=" Left-aligned, right-aligned lg" Customclass="" arialexpand={false} buttonid="hs-dropdown-left-but-right-on-lg"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-info ti-dropdown-toggle mb-0 !py-2" Custommenuclass="lg:ti-dropdown-menu-end" Menulabel="hs-dropdown-left-but-right-on-lg">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Right-aligned, left-aligned lg" Customclass="" arialexpand={false} buttonid="hs-dropdown-right-but-left-on-lg"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-warning ti-dropdown-toggle mb-0 !py-2" Custommenuclass="ti-dropdown-menu-end lg:ti-dropdown-menu-start" Menulabel="-dropdown-right-but-left-on-lg">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Svgaftertext="Dropstart" Svg={true} Customclass="--placement:left-top] m-1" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-success !py-2" Custommenuclass="transition-none" Menulabel="hs-dropright">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Toggletext="Dropend" Svg={true} Customclass="[--placement:right-top] m-1 rtl:[--placement:bottom-right]" SvgClass="w-auto h-2.5 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropright" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-primary !py-2" Custommenuclass="mt-0 transition-none" Menulabel="hs-dropright">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Toggletext="Dropup" Svg={true} Customclass="[--placement:top-left] m-1" SvgClass=" hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white" Strokewidth="2" SvgStroke="currentColor"
                                Svgicon="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" width="16" height="16" Svvgviewbox="0 0 16 16" buttonid="hs-dropup1" arialexpand={false}
                                CustomToggleclass="hs-dropdown-toggle ti-dropdown-toggle ti-btn btn-wave  ti-btn-success !py-2" Custommenuclass="mt-0 transition-none" Menulabel="hs-dropup1">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Menu item</Link></li>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Dark Dropdowns" reactCode={uiElementsPrism.reactdropdown16} reusableCode={uiElementsPrism.reusedropdown16} >
                        <SpkDropdown Arrowicon={true} Toggletext="Dropdown button" Customclass="" arialexpand={false} buttonid="hs-dropdown-left-but-right-on-lg"
                            CustomToggleclass="ti-btn btn-wave  ti-btn-dark ti-dropdown-toggle !py-2" Custommenuclass="!bg-black text-white dark:text-black">
                            <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" scroll={false} href="#!">Action</Link></li>
                            <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" scroll={false} href="#!">Another action</Link></li>
                            <li><Link className="ti-dropdown-item !text-white dark:!text-defaulttextcolor" scroll={false} href="#!">Something else here</Link></li>
                        </SpkDropdown>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-7 --> */}

            {/* <!-- Start:: row-8 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Custom Dropdown Menus's" reactCode={uiElementsPrism.reactdropdown17} reusableCode={uiElementsPrism.reusedropdown17}>
                        <div className="ti-btn-list">
                            <SpkDropdown Arrowicon={true} Toggletext="Primary" Customclass="" arialexpand={false} Custommenuclass="!bg-primary"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-primary ti-dropdown-toggle !py-2" >
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Another action</Link></li>
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="secondary" Customclass="" arialexpand={false} Custommenuclass="!bg-secondary block"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-secondary ti-dropdown-toggle !py-2" >
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Another action</Link></li>
                                <li><Link className="ti-dropdown-item !text-white" scroll={false} href="#!">Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="warning" Customclass="" arialexpand={false} Custommenuclass="dropmenu-item-warning"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-warning ti-dropdown-toggle !py-2" >
                                <li><Link scroll={false} href="#!" className="ti-dropdown-item active">Active</Link></li>
                                <li><Link scroll={false} href="#!" className="ti-dropdown-item">Action</Link></li>
                                <li><Link scroll={false} href="#!" className="ti-dropdown-item">Another  action</Link></li>
                                <li><Link scroll={false} href="#!" className="ti-dropdown-item">Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="info" Customclass="" arialexpand={false} Custommenuclass="dropmenu-item-info block"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-info ti-dropdown-toggle !py-2" >
                                <li><Link className="ti-dropdown-item active" scroll={false} href="#!">Active</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Success" Customclass="" arialexpand={false} Custommenuclass="dropmenu-light-success block"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-success ti-dropdown-toggle !py-2" >
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another   action</Link></li>
                                <li><Link className="ti-dropdown-item active" scroll={false} href="#!">Active</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Danger" Customclass="" arialexpand={false} Custommenuclass="dropmenu-light-danger block"
                                CustomToggleclass="ti-btn btn-wave  ti-btn-danger ti-dropdown-toggle !py-2" >
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link></li>
                                <li><Link className="ti-dropdown-item active" scroll={false} href="#!">Active</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Ghost Button Dropdowns" reactCode={uiElementsPrism.reactdropdown18} reusableCode={uiElementsPrism.reusedropdown18}>
                        <div className="ti-btn-list">
                            <SpkDropdown Arrowicon={true} Toggletext="Primary" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-primary ti-dropdown-toggle !py-2 !shadow-none">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Secondary" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-secondary ti-dropdown-toggle !py-2 !shadow-none">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Success" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-success ti-dropdown-toggle !py-2 !shadow-none">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Info" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-info ti-dropdown-toggle !py-2 !shadow-none">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Warning" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-warning ti-dropdown-toggle !py-2 !shadow-none">
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                            <SpkDropdown Arrowicon={true} Toggletext="Danger" Customclass="" arialexpand={false}
                                CustomToggleclass="ti-btn btn-wave  ti-btn-ghost-danger ti-dropdown-toggle !py-2 !shadow-none" >
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another  action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else here</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link></li>
                            </SpkDropdown>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-8 --> */}

            {/* <!-- Start:: row-9 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">

                    <Showcode title="Non-Interactive Dropdown Items" reactCode={uiElementsPrism.reactdropdown19}>
                        <p className=" mb-3">Use <code>.ti-dropdown-item-text.</code> to create non-interactive
                            dropdown items.</p>
                        <div className="bd-example">
                            <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm p-2 rounded-sm">
                                <li><span className="!py-2 !px-4 !text-[0.875rem]">Dropdown item text</span>
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else
                                    here</Link>
                                </li>
                            </ul>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropdown Headers" reactCode={uiElementsPrism.reactdropdown20}>
                        <p className="card-titlte mb-3">Add a <code className="!text-[#d63384]">.dropdown-header</code>
                            to label sections of actions in any dropdown menu.</p>
                        <div className="bd-example">
                            <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm rounded-sm">
                                <li>
                                    <h6 className="dropdown-header">Dropdown header</h6>
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else
                                    here</Link></li>
                            </ul>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropdown Dividers" reactCode={uiElementsPrism.reactdropdown21}>
                        <div className="bd-example">
                            <ul className="dropdown-menu border dark:border-defaultborder/10 shadow-sm !rounded-sm">
                                <li><Link className="dropdown-header" scroll={false} href="#!">Heading</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Action</Link></li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Another action</Link>
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Something else
                                    here</Link></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><Link className="ti-dropdown-item" scroll={false} href="#!">Separated link</Link>
                                </li>
                            </ul>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Dropdown Menu Text" reactCode={uiElementsPrism.reactdropdown22}>
                        <div className="bd-example">
                            <div className="dropdown-menu border dark:border-defaultborder/10 shadow-sm p-6 !rounded-sm text-[#8c9097] dark:text-white/50 text-[0.875rem] max-w-[200px]">
                                <p>
                                    Some example text that's free-flowing within the dropdown menu.
                                </p>
                                <p className="mb-0">
                                    And this is more example text.
                                </p>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-9 --> */}
        </Fragment>
    );
};

export default Dropdowns;