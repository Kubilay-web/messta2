"use client"
import React, { FC, Fragment } from "react";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as uiElementsPrism from "@/shared/data/prism/ui-elements-prism";
import * as buttonsData from "@/shared/data/ui-elements/buttonsdata";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import Link from "next/link";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

interface ButtonsProps { }

const Buttons: FC<ButtonsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Buttons" />
            <Pageheader Heading="Buttons" breadcrumbs={['Ui Elements']} currentpage="Buttons" />
            {/* <!-- Page Header Close --> */}

            {/* <!--ROW-START--> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Default Buttons" reactCode={uiElementsPrism.reactbuttons1} reusableCode={uiElementsPrism.reusebuttons1} dataCode={uiElementsPrism.buttondata1}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            <SpkButton buttontype="button" customClass="ti-btn" variant="primary">Primary</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="secondary">Secondary</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="success">Success</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="danger">Danger</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="warning">Warning</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="info">Info</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="light">Light</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn" variant="dark">Dark</SpkButton>
                            <SpkButton buttontype="button" customClass="ti-btn ti-btn-link" >Link</SpkButton>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Rounded Buttons" reactCode={uiElementsPrism.reactbuttons2} reusableCode={uiElementsPrism.reusebuttons2} dataCode={uiElementsPrism.buttondata1}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Defaultbutton.map((idx) => (
                                <SpkButton buttontype="button" customClass="ti-btn !rounded-full ti-btn-wave" variant={idx.color} key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Light Buttons" reactCode={uiElementsPrism.reactbuttons3} reusableCode={uiElementsPrism.reusebuttons3} dataCode={uiElementsPrism.buttondata3}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Lightbuttons.map((idx) => (
                                <SpkButton buttontype="button" customClass="ti-btn" variant={idx.color} key={idx.id}   >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Light Rounded Buttons" reactCode={uiElementsPrism.reactbuttons4} reusableCode={uiElementsPrism.reusebuttons4} dataCode={uiElementsPrism.buttondata3}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Lightbuttons.map((idx) => (
                                <SpkButton buttontype="button" variant={idx.color} customClass="ti-btn !rounded-full ti-btn-wave" key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Outline Buttons" reactCode={uiElementsPrism.reactbuttons5} reusableCode={uiElementsPrism.reusebuttons5} dataCode={uiElementsPrism.buttondata5}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.outlinebuttons.map((idx) => (
                                <SpkButton buttontype="button" variant={`outline-${idx.color}`} customClass="ti-btn" key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Rounded Outline Buttons" reactCode={uiElementsPrism.reactbuttons6} reusableCode={uiElementsPrism.reusebuttons6} dataCode={uiElementsPrism.buttondata5}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">

                            {buttonsData.outlinebuttons.map((idx) => (
                                <SpkButton buttontype="button" variant={`outline-${idx.color}`} customClass="ti-btn !rounded-full ti-btn-wave" key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Gradient Buttons" reactCode={uiElementsPrism.reactbuttons7} reusableCode={uiElementsPrism.reusebuttons7} dataCode={uiElementsPrism.buttondata7}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.gradientbuttons.map((idx) => (
                                <SpkButton buttontype="button" variant="" customClass={`ti-btn ti-btn-wave ${idx.color}`} key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Rounded Gradient Buttons" reactCode={uiElementsPrism.reactbuttons8} reusableCode={uiElementsPrism.reusebuttons8} dataCode={uiElementsPrism.buttondata7}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.gradientbuttons.map((idx) => (
                                <SpkButton buttontype="button" variant="" customClass={`ti-btn !rounded-full ti-btn-wave ${idx.color}`} key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Ghost Buttons" reactCode={uiElementsPrism.reactbuttons9} reusableCode={uiElementsPrism.reusebuttons9} dataCode={uiElementsPrism.buttondata7}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Ghostbuttons.map((idx) => (
                                <SpkButton buttontype="button" variant="" customClass={`ti-btn ${idx.color}`} key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Rounded Ghost Buttons" reactCode={uiElementsPrism.reactbuttons10} reusableCode={uiElementsPrism.reusebuttons10} dataCode={uiElementsPrism.buttondata7}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Ghostbuttons.map((idx) => (
                                <SpkButton buttontype="button" variant="" customClass={`ti-btn !rounded-full ${idx.color}`}  key={idx.id} >
                                    {idx.class}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Button Tags" reactCode={uiElementsPrism.reactbuttons11} reusableCode={uiElementsPrism.reusebuttons11}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            <Link scroll={false} className="ti-btn ti-btn-primary btn-wave " href="#!">Link</Link>
                            <SpkButton variant="secondary" customClass="ti-btn btn-wave " type="submit">Button</SpkButton>
                            <input className="ti-btn ti-btn-info" type="button" value="Input" />
                            <input className="ti-btn ti-btn-warning" type="button" value="Submit" />
                            <input className="ti-btn ti-btn-success" type="button" value="Reset" />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Disable State With anchor Tags" reactCode={uiElementsPrism.reactbuttons12} reusableCode={uiElementsPrism.reusebuttons12} dataCode={uiElementsPrism.buttondata12}>
                        <div className="ti-btn-list sm:flex">
                            <div className="mb-4">
                                {buttonsData.Disabledanchortags.map((idx) => (
                                    <SpkButton key={idx.id} buttontype="button" variant={idx.color}  customClass="ti-btn ti-btn-disabled" >
                                        {idx.title}
                                    </SpkButton>
                                ))}
                            </div>
                            <div>

                                <Link href="#!" scroll={false} className="ti-btn ti-btn-primary ti-btn-disabled" aria-disabled="true">Primary
                                    link</Link>
                                <Link href="#!" scroll={false} className="ti-btn ti-btn-secondary ti-btn-disabled" aria-disabled="true">Link</Link>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Loading Buttons" reactCode={uiElementsPrism.reactbuttons13} reusableCode={uiElementsPrism.reusebuttons13} dataCode={uiElementsPrism.buttondata13}>
                        <div className="ti-btn-list md:flex flex-wrap">
                            {buttonsData.Loadingbuttons.map((idx) => (
                                <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                    {idx.htmltext}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Icon Buttons" reactCode={uiElementsPrism.reactbuttons14} reusableCode={uiElementsPrism.reusebuttons14} dataCode={uiElementsPrism.buttondata14}>
                        <div className="ti-btn-list md:flex block gap-x-6">
                            <div className="md:mb-0 mb-2 flex gap-x-2">
                                {buttonsData.IconButtons.slice(0, 4).map((idx) => (
                                    <SpkButton key={idx.id}
                                        // title={idx.htmltext} 
                                        buttontype="button" variant={idx.color} customClass={idx.customcls}>
                                        {idx.htmltext}
                                    </SpkButton>
                                ))}
                            </div>
                            <div className="md:mb-0 mb-2 flex gap-x-2">
                                {buttonsData.IconButtons.slice(4, 8).map((idx) => (
                                    <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                        {idx.htmltext}
                                    </SpkButton>
                                ))}
                            </div>
                            <div className=" flex gap-x-2">
                                {buttonsData.IconButtons.slice(8, 12).map((idx) => (
                                    <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls}>
                                        {idx.htmltext}
                                    </SpkButton>
                                ))}
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Social Buttons" reactCode={uiElementsPrism.reactbuttons15} reusableCode={uiElementsPrism.reusebuttons15} dataCode={uiElementsPrism.buttondata15}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.SocialButtons.map((idx) => (
                                <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass="ti-btn ti-btn-icon" >
                                    {idx.icon}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Sizes" reactCode={uiElementsPrism.reactbuttons16} reusableCode={uiElementsPrism.reusebuttons16} dataCode={uiElementsPrism.buttondata16}>
                                <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                                    {buttonsData.Sizes.map((idx) => (
                                        <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} size={idx.size} >
                                            {idx.titletxt}
                                        </SpkButton>
                                    ))}
                                </div>
                            </Showcode>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Button Widths" reactCode={uiElementsPrism.reactbuttons17} reusableCode={uiElementsPrism.reusebuttons17} dataCode={uiElementsPrism.buttondata17}>
                                <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                                    {buttonsData.Buttonwidths.map((idx) => (
                                        <SpkButton key={idx.id} buttontype="button" size={idx.size} variant={idx.color} customClass="ti-btn" >
                                            {idx.title}
                                        </SpkButton>
                                    ))}
                                </div>
                            </Showcode>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Buttons With Different Shadows" reactCode={uiElementsPrism.reactbuttons18} reusableCode={uiElementsPrism.reusebuttons18} dataCode={uiElementsPrism.buttondata18}>
                        <div className="ti-btn-list flex">
                            <div className="me-[3rem]">
                                {buttonsData.Differentshadows.slice(0, 3).map((idx) => (
                                    <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls}>
                                        Button
                                    </SpkButton>
                                ))}
                            </div>
                            <div className="">
                                {buttonsData.Differentshadows.slice(3, 6).map((idx) => (
                                    <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                        Button
                                    </SpkButton>
                                ))}
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Different Colored Buttons With Shadows" reactCode={uiElementsPrism.reactbuttons19} reusableCode={uiElementsPrism.reusebuttons19} dataCode={uiElementsPrism.buttondata19}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Differentcolored.map((idx) => (
                                <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                    Button
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Label Buttons" reactCode={uiElementsPrism.reactbuttons20} reusableCode={uiElementsPrism.reusebuttons20} dataCode={uiElementsPrism.buttondata20}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            {buttonsData.Labelbuttons.map((idx) => (
                                <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                    {idx.title}{idx.icon}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Custom Buttons" reactCode={uiElementsPrism.reactbuttons21} reusableCode={uiElementsPrism.reusebuttons21} dataCode={uiElementsPrism.buttondata21}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            <SpkButton buttontype="button" variant="info" customClass="ti-btn custom-button label-ti-btn !rounded-full" >
                                <span className="custom-ti-btn-icons"><i className="ri-twitter-x-line text-info"></i></span>
                                Twitter
                            </SpkButton>
                            {buttonsData.Custombuttons.map((idx) => (
                                <SpkButton key={idx.id} buttontype="button" variant={idx.color} customClass={idx.customcls} >
                                    {idx.title}
                                </SpkButton>
                            ))}
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Block Buttons" reactCode={uiElementsPrism.reactbuttons22} reusableCode={uiElementsPrism.reusebuttons22}>
                        <div className="ti-btn-list space-x-2 rtl:space-x-reverse">
                            <div className="grid  gap-2 mb-6">
                                <SpkButton buttontype="button" variant="primary" customClass="ti-btn me-1" >
                                    Button
                                </SpkButton>
                                <SpkButton buttontype="button" variant="secondary" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                            </div>
                            <div className="grid gap-2 md:block">
                                <SpkButton buttontype="button" variant="info" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                                <SpkButton buttontype="button" variant="success" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                            </div>
                            <div className="grid !mx-auto gap-2 w-[50%]">
                                <SpkButton buttontype="button" variant="danger" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                                <SpkButton buttontype="button" variant="warning" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                            </div>
                            <div className="grid gap-2 md:flex md:justify-end">
                                <SpkButton buttontype="button" variant="teal" customClass="ti-btn md:me-2" >
                                    Button
                                </SpkButton>
                                <SpkButton buttontype="button" variant="purple" customClass="ti-btn " >
                                    Button
                                </SpkButton>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!--ROW-END--> */}
        </Fragment>
    );
};

export default Buttons;