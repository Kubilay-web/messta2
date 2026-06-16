"use client"
import * as formsPrism from "@/shared/data/prism/forms-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment, useState } from "react";

interface ChecksRadiosProps { }

const ChecksRadios: FC<ChecksRadiosProps> = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Checks & Radios" />
            <Pageheader Heading="Checks & Radios" breadcrumbs={['Forms', ' Form Elements']} currentpage="Checks & Radios" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Radios" reactCode={formsPrism.radio1}>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Default radio
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault2" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Default checked radio
                            </label>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Disabled" reactCode={formsPrism.radio2}>
                        <div className="form-check flex items-center gap-2 pointer-events-none">
                            <input className="form-check-input" type="radio" name="flexRadioDisabled"
                                id="flexRadioDisabled" disabled />
                            <label className="form-check-label" htmlFor="flexRadioDisabled">
                                Disabled radio
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2 pointer-events-none">
                            <input className="form-check-input opacity-[0.6]" type="radio" name="flexRadioDisabled"
                                id="flexRadioCheckedDisabled" defaultChecked disabled />
                            <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                                Disabled checked radio
                            </label>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Disabled" reactCode={formsPrism.radio5}>
                        <div className="form-check flex items-center gap-2 pointer-events-none">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"
                                disabled />
                            <label className="form-check-label" htmlFor="flexCheckDisabled">
                                Disabled checkbox
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2 pointer-events-none">
                            <input className="form-check-input opacity-[0.6]" type="checkbox" value=""
                                id="flexCheckCheckedDisabled" defaultChecked disabled />
                            <label className="form-check-label" htmlFor="flexCheckCheckedDisabled">
                                Disabled checked checkbox
                            </label>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Checks" reactCode={formsPrism.radio4}>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Default checkbox
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                defaultChecked />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Checked checkbox
                            </label>
                        </div>
                    </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Radio Sizes" reactCode={formsPrism.radio3} customCardBodyClass="">
                        <div className="sm:flex items-center justify-between">
                            <div className="form-check flex items-center gap-2">
                                <input className="form-check-input" type="radio" name="Radio" id="Radio-sm" />
                                <label className="form-check-label" htmlFor="Radio-sm">
                                    default
                                </label>
                            </div>
                            <div className="form-check flex items-center gap-2 form-check-md">
                                <input className="form-check-input" type="radio" name="Radio" id="Radio-md" />
                                <label className="form-check-label" htmlFor="Radio-md">
                                    Medium
                                </label>
                            </div>
                            <div className="form-check flex items-center gap-2 form-check-lg">
                                <input className="form-check-input" type="radio" name="Radio" id="Radio-lg" defaultChecked />
                                <label className="form-check-label" htmlFor="Radio-lg">
                                    Large
                                </label>
                            </div>
                        </div>
                    </Showcode>
                </div>


                <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Checkbox Sizes" reactCode={formsPrism.radio6} customCardBodyClass="">
                        <div className="sm:flex items-center justify-between">
                            <div className="form-check flex items-center gap-2">
                                <input className="form-check-input" type="checkbox" value="" id="checkebox-sm" defaultChecked />
                                <label className="form-check-label" htmlFor="checkebox-sm">
                                    Default
                                </label>
                            </div>
                            <div className="form-check form-check-md  flex items-center gap-2">
                                <input className="form-check-input" type="checkbox" value="" id="checkebox-md" defaultChecked />
                                <label className="form-check-label" htmlFor="checkebox-md">
                                    Medium
                                </label>
                            </div>
                            <div className="form-check form-check-lg flex items-center gap-2">
                                <input className="form-check-input" type="checkbox" value="" id="checkebox-lg" defaultChecked />
                                <label className="form-check-label" htmlFor="checkebox-lg">
                                    Large
                                </label>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Default (stacked)" reactCode={formsPrism.radio7}>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Default checkbox
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"
                                disabled />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Disabled checkbox
                            </label>
                        </div>
                        <div className="form-check flex items-center gap-2">
                            <input className="form-check-input" type="radio" name="exampleRadios"
                                id="exampleRadios1" value="option1" defaultChecked />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Default radio
                            </label>
                        </div>
                        <div className="form-check mb-0">
                            <input className="form-check-input" type="radio" name="exampleRadios"
                                id="exampleRadios3" value="option3" disabled />
                            <label className="form-check-label" htmlFor="exampleRadios3">
                                Disabled radio
                            </label>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Switches" reactCode={formsPrism.radio8} customCardBodyClass="flex flex-col gap-y-4">
                        <div className="flex items-center  !pb-1">
                            <input type="checkbox" id="hs-basic-with-description-checked" className="ti-switch" defaultChecked />
                            <label htmlFor="hs-basic-with-description-checked" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Checked</label>
                        </div>
                        <div className="flex items-center !pb-1 ">
                            <input type="checkbox" id="hs-basic-with-description-unchecked" className="ti-switch" />
                            <label htmlFor="hs-basic-with-description-unchecked" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Unchecked</label>
                        </div>
                        <div className="flex items-center ">
                            <label className="text-sm text-gray-500 ltr:mr-3 rtl:ml-3 dark:text-white/70">On</label>
                            <input type="checkbox" id="hs-basic-with-description" className="ti-switch" />
                            <label className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">Off</label>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Inline" reactCode={formsPrism.radio9} customCardBodyClass="sm:flex gap-6">
                        <div className="flex gap-4">
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                    value="option1" />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                            </div>
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                    value="option2" />
                                <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
                            </div>
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                    value="option3" disabled />
                                <label className="form-check-label" htmlFor="inlineCheckbox3">3 (disabled)</label>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="inlineRadio1" value="option1" />
                                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                            </div>
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="inlineRadio2" value="option2" />
                                <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                            </div>
                            <div className="form-check form-check-inline flex items-center">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="inlineRadio3" value="option3" disabled />
                                <label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</label>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6  lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                    <Showcode title="Reverse" reactCode={formsPrism.radio10}>
                        <div className="form-check form-check-reverse mb-4">
                            <input className="form-check-input" type="checkbox" value=""
                                id="reverseCheck1" />
                            <label className="form-check-label ms-4" htmlFor="reverseCheck1">
                                Reverse checkbox
                            </label>
                        </div>
                        <div className="form-check form-check-reverse mb-4">
                            <input className="form-check-input" type="checkbox" value=""
                                id="reverseCheck2" disabled />
                            <label className="form-check-label ms-4" htmlFor="reverseCheck2">
                                Disabled reverse checkbox
                            </label>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            
        </Fragment>
    );
};

export default ChecksRadios;