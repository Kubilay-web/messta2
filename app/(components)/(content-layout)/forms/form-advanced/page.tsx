"use client"
import React, { FC, Fragment, useState } from "react";
import PhoneInput from 'react-phone-number-input'
import { CountrySelect, } from "react-country-state-city";
import Tags from "@yaireo/tagify/dist/react.tagify";
import dynamic from "next/dynamic";
const ListBox = dynamic(() => import("react-listbox"), { ssr: false });
import { Colors, options, options1, Tagifyselectdata, top100Films } from "@/shared/data/forms/formadvancedata";
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import SpkMultiselect from "@/shared/@spk-reusable-components/spk-packages/spk-multiselect";
import TextInput  from "react-autocomplete-input";

interface TagifySettings {
    maxTags: number;
    placeholder: string;
    dropdown: {
        enabled: number;
    };
}
interface FormAdvancedProps { }

const FormAdvanced: FC<FormAdvancedProps> = () => {
    const [_valuesB, setValuesB] = useState<any>()


    const [value, setValue] = useState<any>()
    const [value1, setValue1] = useState<any>()
    const [countryid, setCountryid] = useState(0);


    const [selected, setSelected] = useState<any>([1, 2]);
  
    const [select, setSelect] = useState<any>([1, 2]);

    /*Tagify*/
    const [tags, setTags] = useState<string>("tag1, tag2");

    
    const handleChange = (e: CustomEvent<{ value: string }>) => {
        setTags(e.detail.value); 
        console.log("Tags:", e.detail.value);
    };

    // Tagify settings
    const tagifySettings: TagifySettings = {
        maxTags: 10, 
        placeholder: "Add tags here...", 
        dropdown: {
            enabled: 0, 
        },
    };
    const [tags1, setTags1] = useState<string>("CSS, HTML, JavaScript");

    
    const handleChange1 = (e: CustomEvent<{ value: string }>) => {
        setTags1(e.detail.value); 
        console.log("Tags:", e.detail.value);
    };

    // Tagify settings
    const tagifySettings1: TagifySettings = {
        maxTags: 10, 
        placeholder: "Add more tags...", 
        dropdown: {
            enabled: 0, 
        },
    };

    const [tags2, setTags2] = useState<string>("tag1, tag2, tag3, tag4, tag5, tag6");

    // Function to handle tag changes
    const handleChange2 = (e: CustomEvent<{ value: string }>) => {
        setTags2(e.detail.value); 
        console.log("Tags:", e.detail.value);
    };

    // Tagify settings
    const tagifySettings2: TagifySettings = {
        maxTags: 10, 
        placeholder: "Add more tags...", 
        dropdown: {
            enabled: 0, 
        },
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Form Advanced" />
            <Pageheader Heading="Form Advanced" breadcrumbs={['Forms']} currentpage="Form Advanced" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                TAGIFY JS
                            </div>
                        </div>
                        <div className="box-body basic-tagify">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label block">Basic Tagify</label>
                                    <Tags
                                        value={tags} // Default tags
                                        settings={tagifySettings} // Tagify settings
                                        onChange={handleChange} // Handle changes
                                    />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label block">Tagify With Custom Suggestions</label>
                                    <Tags
                                        value={tags1} // Default tags (CSS, HTML, JavaScript)
                                        settings={tagifySettings1} // Tagify settings
                                        onChange={(e: CustomEvent) => handleChange1(e as CustomEvent<{ value: string }>)}
                                    />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label block">Diasbled User Input</label>
                                    <SpkMultiselect multi options={options1} mainClass="default basic-multi-select custom-multi custom-ad" onChange={(valuesB: any) => setValuesB(valuesB)} placeholder="Select tags from the list" />

                                    {/*<input name='tags-disabled-user-input' placeholder='Select tags from the list' className="form-control" />*/}
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="ti-form-label block">Drag & Sort</label>
                                    <Tags
                                        value={tags2} // Default tags (tag1, tag2, tag3, tag4, tag5, tag6)
                                        settings={tagifySettings2} // Tagify settings
                                        onChange={(e: CustomEvent) => handleChange2(e as CustomEvent<{ value: string }>)}
                                    />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label className="ti-form-label block">Tagify Single-Value Select</label>
                                    <SpkSelect name="colors" option={Tagifyselectdata} mainClass="default basic-multi-select" id="choices-multiple-default" menuplacement='auto' classNameprefix="Select2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                TELEPHONE INPUT
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                <div className="xl:col-span-3 col-span-12">
                                    <label htmlFor="phone" className="ti-form-label block">Basic Telephone Input</label>
                                    <PhoneInput placeholder="Enter phone number" value={value} onChange={setValue} />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="phone-only-countries" className="ti-form-label block">Telephone Input With  Default Country</label>
                                    <PhoneInput placeholder="Enter phone number" defaultCountry="US" value={value1} onChange={setValue1} />
                                </div>
                                <div className="xl:col-span-4 col-span-12 custom-advance">
                                    <label htmlFor="phone-existing-number" className="ti-form-label block ">Input With Only Countries</label>
                                    <CountrySelect onChange={(e: any) => { setCountryid(e.id); }} placeHolder="Select Country" className="border-0 " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">AUTO COMPLETE</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="autoComplete" className="ti-form-label">Search Results Of Food & Drinks Combo</label>
                                    <TextInput  trigger={["", "@@"]} options={top100Films} className="form-control header-autoComplete" />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="autoComplete-color" className="ti-form-label">Advanced Search Results For Colors</label>
                                    <TextInput  trigger={["", "@@"]} options={Colors} className="form-control header-autoComplete" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 sm:gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">DUAL LIST BOX</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-6">
                                <div className="xl:col-span-6 col-span-12">
                                    <h6>Select by class :</h6>
                                    <ListBox options={options} onChange={(newValue: any) => setSelected(newValue)} selected={selected} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <h6>Add options and add eventListeners :</h6>

                                    <ListBox options={options1} onChange={(newValue: any) => setSelect(newValue)} selected={select} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}
        </Fragment>
    );
};

export default FormAdvanced;