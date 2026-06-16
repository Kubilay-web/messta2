"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import { layout1, layout10, layout11, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from "@/shared/data/prism/forms-prism";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import React, { FC, Fragment } from "react";
import { inlineForm, inputCountry, inputState, inputState1 } from '@/shared/data/forms/formadvancedata';

interface FormLayoutsProps { }

const FormLayouts: FC<FormLayoutsProps> = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Form Layouts" />
            <Pageheader Heading="Form Layouts" breadcrumbs={['Forms']} currentpage="Form Layouts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Vertical Forms" reactCode={layout1}>
                        <div className="mb-4">
                            <label htmlFor="form-text" className="ti-form-label !text-[.875rem] text-black">Enter name</label>
                            <input type="text" className="form-control" id="form-text" placeholder="" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="form-password" className="ti-form-label text-[.875rem] text-black">Enter
                                Password</label>
                            <input type="password" className="form-control" id="form-password" placeholder="" />
                        </div>
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck"
                                required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Accept Policy
                            </label>
                        </div>
                        <SpkButton variant="primary" customClass="ti-btn" buttontype="submit">Submit</SpkButton>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Horizontal Form" reactCode={layout2}>
                        <form>
                            <div className="grid grid-cols-12 mb-4">
                                <label htmlFor="inputEmail3"
                                    className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
                                <div className="sm:col-span-10 col-span-12">
                                    <input type="email" className="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mb-4">
                                <label htmlFor="inputPassword3"
                                    className="sm:col-span-2 col-span-12 col-ti-form-label">Password</label>
                                <div className="sm:col-span-10 col-span-12">
                                    <input type="password" className="form-control" id="inputPassword3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mb-4">
                                <div className=" sm:col-span-2 col-span-12 col-ti-form-label pt-0">Qualified</div>
                                <div className="sm:col-span-10 col-span-12 ">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                            name="gridRadios" id="gridRadios1" defaultValue="option1"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="gridRadios1">
                                            Prelims
                                        </label>
                                    </div>
                                    <div className="form-check disabled">
                                        <input className="form-check-input" type="radio"
                                            name="gridRadios" id="gridRadios2" defaultValue="option3"
                                            disabled />
                                        <label className="form-check-label" htmlFor="gridRadios2">
                                            Mains
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                            id="gridCheck1" />
                                        <label className="form-check-label" htmlFor="gridCheck1">
                                            Certified
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
                        </form>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Vertical Form With Icon" reactCode={layout3}>
                        <div className="mb-4">
                            <label htmlFor="form-text1" className="ti-form-label text-[.875rem] text-black">Enter name</label>
                            <div className="input-group">
                                <div className="input-group-text"><i className="ri-user-line"></i></div>
                                <input type="text" className="form-control" id="form-text1" placeholder="" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="form-password1" className="ti-form-label text-[.875rem] text-black">Enter
                                Password</label>
                            <div className="input-group">
                                <div className="input-group-text"><i className="ri-lock-line"></i></div>
                                <input type="password" className="form-control" id="form-password1" placeholder="" />
                            </div>
                        </div>
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck1"
                                required />
                            <label className="form-check-label" htmlFor="invalidCheck1">
                                Accept Policy
                            </label>
                        </div>
                        <SpkButton variant="primary" customClass="ti-btn !mb-0 mt-4" buttontype="submit">Submit</SpkButton>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Horizontal Form With Icons" reactCode={layout4}>
                        <form>
                            <div className="grid grid-cols-12 mb-4">
                                <label htmlFor="inputEmail1"
                                    className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
                                <div className="sm:col-span-10 col-span-12">
                                    <div className="input-group">
                                        <input type="email" className="form-control !border-s" id="inputEmail1" />
                                        <div className="input-group-text">
                                            <i className="ri-mail-line"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mb-4">
                                <label htmlFor="inputPassword1"
                                    className="sm:col-span-2 col-span-12 col-ti-form-label">Password</label>
                                <div className="sm:col-span-10 col-span-12">
                                    <div className="input-group">
                                        <input type="password" className="form-control !border-s" id="inputPassword1" />
                                        <div className="input-group-text">
                                            <i className="ri-lock-line"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 mb-4">
                                <div className="col-ti-form-label sm:col-span-2 col-span-12 pt-0">Qualified</div>
                                <div className="sm:col-span-10 col-span-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                            name="gridRadios" id="gridRadios4" defaultValue="option1"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="gridRadios4">
                                            Prelims
                                        </label>
                                    </div>
                                    <div className="form-check disabled">
                                        <input className="form-check-input" type="radio"
                                            name="gridRadios" id="gridRadios3" defaultValue="option3"
                                            disabled />
                                        <label className="form-check-label" htmlFor="gridRadios3">
                                            Mains
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                            id="gridCheck2" />
                                        <label className="form-check-label" htmlFor="gridCheck2">
                                            Certified
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
                        </form>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Inline Forms" reactCode={layout5}>
                        <form className="sm:grid grid-cols-4 gap-4 items-center">
                            <div className="mb-4 sm:mb-0 input-group">
                                <div className="input-group-text">@</div>
                                <input type="text" className="form-control"
                                    id="inlineFormInputGroupUsername" placeholder="Username" />
                            </div>
                            <SpkSelect option={inlineForm} mainClass="mb-4 sm:mb-0 " id="inlineFormSelectPref"
                                menuplacement='auto' classNameprefix="Select2" defaultvalue={[inlineForm[0]]}
                            />

                            <div className=" form-check !my-auto">
                                <input className="form-check-input" type="checkbox"
                                    id="inlineFormCheck" />
                                <label className="form-check-label" htmlFor="inlineFormCheck">
                                    Remember me
                                </label>
                            </div>
                            <SpkButton buttontype="submit" variant="primary" customClass="ti-btn !mb-0 mt-4">Submit</SpkButton>
                        </form>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Column Sizing" reactCode={layout6}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="sm:col-span-7 col-span-12">
                                <input type="text" className="form-control" placeholder="City"
                                    aria-label="City" />
                            </div>
                            <div className="sm:col-span-3 col-span-12">
                                <input type="text" className="form-control" placeholder="State"
                                    aria-label="State" />
                            </div>
                            <div className="sm:col-span-2 col-span-12">
                                <input type="text" className="form-control" placeholder="Zip"
                                    aria-label="Zip" />
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Utilities" reactCode={layout7}>
                        <div className="mb-4">
                            <label htmlFor="formGroupExampleInput" className="ti-form-label">Example label</label>
                            <input type="text" className="form-control" id="formGroupExampleInput"
                                placeholder="Example input placeholder" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="formGroupExampleInput2" className="ti-form-label">Another label</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2"
                                placeholder="Another input placeholder" />
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Horizontal Form Label sizing" reactCode={layout8}>
                        <div className="grid grid-cols-12 mb-4">
                            <label htmlFor="colFormLabelSm"
                                className="sm:col-span-2 col-span-12 col-ti-form-label col-ti-form-label-sm">Email</label>
                            <div className="sm:col-span-10 col-span-12">
                                <input type="email" className="form-control form-control-sm"
                                    id="colFormLabelSm" placeholder="col-ti-form-label-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mb-4">
                            <label htmlFor="colFormLabel" className="sm:col-span-2 col-span-12 col-ti-form-label">Email</label>
                            <div className="sm:col-span-10 col-span-12">
                                <input type="email" className="form-control" id="colFormLabel"
                                    placeholder="col-ti-form-label" />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <label htmlFor="colFormLabelLg"
                                className="sm:col-span-2 col-span-12 col-ti-form-label col-ti-form-label-lg text-[1.25rem]">Email</label>
                            <div className="sm:col-span-10 col-span-12">
                                <input type="email" className="form-control form-control-lg"
                                    id="colFormLabelLg" placeholder="col-ti-form-label-lg" />
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Auto Sizing" reactCode={layout9}>
                        <form className="sm:grid grid-cols-12 block gap-y-2 gap-x-4 items-center mb-4">
                            <div className="col-span-12 mb-4 sm:mb-0">
                                <label className="hidden" htmlFor="autoSizingInput">Name</label>
                                <input type="text" className="form-control" id="autoSizingInput"
                                    placeholder="Jane Doe" />
                            </div>
                            <div className="col-span-12 mb-4 sm:mb-0">
                                <label className="hidden"
                                    htmlFor="autoSizingInputGroup">Username</label>
                                <div className="input-group">
                                    <div className="input-group-text">@</div>
                                    <input type="text" className="form-control"
                                        id="autoSizingInputGroup" placeholder="Username" />
                                </div>
                            </div>
                            <div className="col-span-12 mb-4 sm:mb-0">
                                <label className="hidden"
                                    htmlFor="autoSizingSelect">Preference</label>
                                <SpkSelect option={inlineForm} mainClass="mb-4 sm:mb-0 " id="autoSizingSelect"
                                    menuplacement='auto' classNameprefix="Select2" defaultvalue={[inlineForm[0]]}
                                />
                            </div>
                            <div className="col-span-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        id="autoSizingCheck" />
                                    <label className="form-check-label" htmlFor="autoSizingCheck">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <SpkButton buttontype="submit" variant="primary" customClass="ti-btn !mb-0 mt-4">Submit</SpkButton>
                            </div>
                        </form>
                        <span className="font-semibold text-[#8c9097] dark:text-white/50">You can then remix that once again with size-specific column
                            classes.</span>
                        <form className="grid grid-cols-12  gap-x-4 gap-y-2 items-center mt-2">
                            <div className="sm:col-span-3 col-span-12">
                                <label className="hidden"
                                    htmlFor="specificSizeInputName">Name</label>
                                <input type="text" className="form-control" id="specificSizeInputName"
                                    placeholder="Jane Doe" />
                            </div>
                            <div className="sm:col-span-3 col-span-12">
                                <label className="hidden"
                                    htmlFor="specificSizeInputGroupUsername">Username</label>
                                <div className="input-group">
                                    <div className="input-group-text">@</div>
                                    <input type="text" className="form-control"
                                        id="specificSizeInputGroupUsername" placeholder="Username" />
                                </div>
                            </div>
                            <div className="sm:col-span-3 col-span-12">
                                <label className="hidden"
                                    htmlFor="specificSizeSelect">Preference</label>
                                <SpkSelect option={inlineForm} mainClass="!py-[0.23rem]" id="specificSizeSelect"
                                    menuplacement='auto' classNameprefix="Select2" defaultvalue={[inlineForm[0]]}
                                />
                            </div>
                            <div className="sm:col-span-3 col-span-12">
                                <div className="form-check !my-auto">
                                    <input className="form-check-input" type="checkbox"
                                        id="autoSizingCheck2" />
                                    <label className="form-check-label" htmlFor="autoSizingCheck2">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="sm:col-span-3 col-span-12">
                                <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Submit</SpkButton>
                            </div>
                        </form>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Form Grid" reactCode={layout10}>
                        <div className="grid grid-cols-12 sm:gap-x-6 sm:gap-y-4">
                            <div className="md:col-span-6 col-span-12 mb-4">
                                <label className="ti-form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="First name"
                                    aria-label="First name" />
                            </div>
                            <div className="md:col-span-6 col-span-12 mb-4">
                                <label className="ti-form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name"
                                    aria-label="Last name" />
                            </div>
                            <div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
                                <label className="ti-form-label">Address</label>
                                <div className="grid grid-cols-12 sm:gap-x-4">
                                    <div className="xl:col-span-12 col-span-12 mb-4">
                                        <input type="text" className="form-control" placeholder="Street"
                                            aria-label="Street" />
                                    </div>
                                    <div className="xl:col-span-12 col-span-12 mb-4">
                                        <input type="text" className="form-control" placeholder="Landmark"
                                            aria-label="Landmark" />
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 col-span-12 mb-4">
                                        <input type="text" className="form-control" placeholder="City"
                                            aria-label="City" />
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 col-span-12 mb-4">
                                        <SpkSelect option={inputState1} mainClass="!py-[0.23rem]" id="inputState1"
                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[inputState1[0]]}
                                        />

                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 col-span-12 xxl:mb-0 mb-4">
                                        <input type="text" className="form-control" placeholder="Postal/Zip code"
                                            aria-label="Postal/Zip code" />
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                                    <SpkSelect option={inputCountry} mainClass="!py-[0.23rem]" id="inputCountry"
                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[inputCountry[0]]}
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-6  col-span-12">
                                <div className="grid grid-cols-12">
                                    <div className="xl:col-span-12 col-span-12 mb-4">
                                        <label className="ti-form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="Email"
                                            aria-label="email" />
                                    </div>
                                    <div className="xl:col-span-12 col-span-12 mb-4">
                                        <label className="ti-form-label">D.O.B</label>
                                        <input type="date" className="form-control"
                                            aria-label="dateofbirth" />
                                    </div>
                                    <div className="xl:col-span-12 col-span-12 mb-4">
                                        <div className="grid grid-cols-12 gap-3">
                                            <label className="ti-form-label mb-1 xl:col-span-12 col-span-12">Maritial Status</label>
                                            <div className="xl:col-span-6 col-span-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" defaultValue="" id="status-married" name="status-married" />
                                                    <label className="form-check-label" htmlFor="status-married">
                                                        Married
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" defaultValue="" id="status-unmarried" name="status-married" defaultChecked />
                                                    <label className="form-check-label" htmlFor="status-unmarried">
                                                        Single
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:col-span-12 col-span-12">

                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
                                <label className="ti-form-label">Contact Number</label>
                                <input type="number" className="form-control" placeholder="Phone number"
                                    aria-label="Phone number" />
                            </div>
                            <div className="md:col-span-6 col-span-12 mb-4 sm:mb-0">
                                <label className="ti-form-label">Alternative Contact</label>
                                <input type="number" className="form-control" placeholder="Phone number"
                                    aria-label="Phone number" />
                            </div>
                            <div className="md:col-span-12 col-span-12 mb-4 sm:mb-0">
                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Check me out
                                    </label>
                                </div>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                                <SpkButton variant="primary" buttontype="submit" customClass="ti-btn !mb-0">Sign in</SpkButton>
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Gutters" reactCode={layout11}>
                        <form className="grid grid-cols-12 gap-4 mt-0">
                            <div className="md:col-span-6 col-span-12">
                                <label className="ti-form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="First name"
                                    aria-label="First name" />
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <label className="ti-form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name"
                                    aria-label="Last name" />
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <label htmlFor="inputEmail4" className="ti-form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" />
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <label htmlFor="inputPassword4" className="ti-form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" />
                            </div>
                            <div className="col-span-12">
                                <label htmlFor="inputAddress" className="ti-form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress"
                                    placeholder="1234 Main St" />
                            </div>
                            <div className="col-span-12">
                                <label htmlFor="inputAddress2" className="ti-form-label">Address 2</label>
                                <input type="text" className="form-control" id="inputAddress2"
                                    placeholder="Apartment, studio, or floor" />
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <label htmlFor="inputCity" className="ti-form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="md:col-span-4 col-span-12">
                                <label htmlFor="inputState" className="ti-form-label">State</label>
                                <SpkSelect option={inputState} mainClass="!py-[0.23rem] !pt-0 custom-label" id="inputState"
                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[inputState[0]]}
                                        />
                               
                            </div>
                            <div className="md:col-span-2 col-span-12">
                                <label htmlFor="inputZip" className="ti-form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                            <div className="col-span-12 ">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck3" />
                                    <label className="form-check-label" htmlFor="gridCheck3">
                                        Check me out
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <SpkButton buttontype="submit" variant="primary" customClass="ti-btn">Sign in</SpkButton>
                            </div>
                        </form>
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}
        </Fragment>
    );
};

export default FormLayouts;