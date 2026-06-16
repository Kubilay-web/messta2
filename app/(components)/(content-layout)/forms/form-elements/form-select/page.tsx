"use client"
import SpkMultiselect from "@/shared/@spk-reusable-components/spk-packages/spk-multiselect";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import * as foemselectData from "@/shared/data/forms/foemselectdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";
import CreatableSelect from 'react-select/creatable';
interface FormSelectProps { }

const FormSelect: FC<FormSelectProps> = () => {
    const [_valuesA, setValuesA] = useState()
    const [_valuesB, setValuesB] = useState()
    const components = {
        DropdownIndicator: null,
    };

    const createOption = (label: string) => ({
        label,
        value: label,
    });

    const [inputValue, setInputValue] = useState<any>('');
    const [value, setValue] = useState([
        createOption("one"),
        createOption("two"),
        createOption("three")
    ]);
    const handleKeyDown = (event: any) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };
    const [inputValue1, setInputValue1] = useState<any>('');
    const [value1, setValue1] = useState([
        createOption("child-1"),
        createOption("child-2")
    ]);

    const handleKeyDown1 = (event: any) => {
        if (!inputValue1) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue1((prev) => [...prev, createOption(inputValue1)]);
                setInputValue1('');
                event.preventDefault();
        }
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const createOption1 = (email: string) => ({
        label: email,
        value: email,
    });

    const [inputValue2, setInputValue2] = useState<string>("");
    const [value2, setValue2] = useState<any[]>([createOption1("abc@hotmail.com")]);
    const [_error, setError] = useState<string>("");

    const handleKeyDown2 = (event: React.KeyboardEvent) => {
        if (!inputValue2) return;

        switch (event.key) {
            case "Enter":
            case "Tab":
                if (isValidEmail(inputValue2) && !value2.some(option => option.value === inputValue2)) {
                    setValue2((prev) => [...prev, createOption1(inputValue2)]);
                    setError("");
                } else {
                    setError("Please enter a valid email address or avoid duplicates.");
                }
                setInputValue2("");
                event.preventDefault();
                break;
            default:
                break;
        }
    };

    const defaults = [foemselectData.Multipleselectdata[5]];
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Form Select" />
            <Pageheader Heading="Form Select" breadcrumbs={['Forms', ' Form Elements']} currentpage="Form Select" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Choices Multiple Select</h5>
                        </div>
                        <div className="box-body">
                            <label className="ti-form-select  rounded-sm !p-0 !mb-2 font-medium">Default Choices Select</label>
                            <SpkMultiselect multi options={foemselectData.Multipleselectdata} mainClass="mb-3 default basic-multi-select custom-multi"
                                values={[foemselectData.Multipleselectdata[0], foemselectData.Multipleselectdata[1], foemselectData.Multipleselectdata[2]]} onChange={(valuesA: any) => setValuesA(valuesA)} disabledLabel={defaults.length} />
                            <label className="ti-form-select  rounded-sm !p-0 !mb-2 font-medium">With Remove Button</label>
                            <SpkMultiselect multi options={foemselectData.Multipleselectdata1} mainClass="mb-3 basic-multi-select custom-multi"
                                values={[foemselectData.Multipleselectdata1[0]]} onChange={(valuesB: any) => setValuesB(valuesB)} />
                            <label className="ti-form-select  rounded-sm !p-0 !mb-2 font-medium">Option groups</label>
                            <foemselectData.MultiGroup />
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Passing Through Options</h5>
                        </div>
                        <div className="box-body">
                            <CreatableSelect components={components} classNamePrefix='Select2' inputValue={inputValue} isClearable isMulti menuIsOpen={false} onChange={(newValue) => {
                                if (Array.isArray(newValue)) {
                                    setValue(newValue);
                                } else {
                                    setValue([]);
                                }
                            }} onInputChange={(newValue) => setInputValue(newValue)} onKeyDown={handleKeyDown} placeholder="Type something and press enter..." value={value} />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title"> Email Address Only</h5>
                        </div>
                        <div className="box-body">
                            <CreatableSelect components={{}} classNamePrefix='Select2' inputValue={inputValue2} isClearable isMulti menuIsOpen={false} onChange={(newValue) => {
                                if (Array.isArray(newValue)) {
                                    setValue2(newValue);
                                } else {
                                    setValue2([]);
                                }
                            }} onInputChange={(newValue) => setInputValue2(newValue)} onKeyDown={handleKeyDown2} placeholder="Type an email and press enter..." value={value2} />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Single Select</h5>
                        </div>
                        <div className="box-body">
                            <label className="ti-form-select rounded-sm !p-0 mb-2 font-medium">Default Single Choices Select</label>
                            <SpkSelect option={foemselectData.Multipleselectdata} mainClass="mb-4 default basic-multi-select" id="choices-multiple-default"
                                menuplacement='auto' classNameprefix="Select2" defaultvalue={[foemselectData.Multipleselectdata[0]]}
                            />
                            <label className="ti-form-select rounded-sm !p-0 mb-2 font-medium">Option groups</label>
                            <foemselectData.SingleGroup />
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Select With Label</h5>
                        </div>
                        <div className="box-body">
                            <label htmlFor="hs-select-label" className="ti-form-select rounded-sm !p-0 mb-2 font-medium">Label</label>
                            <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} placeholder='Open this select menu' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Select Sizes</h5>
                        </div>
                        <div className="box-body">
                            <div className="space-y-3">
                                <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} mainClass='py-[0.15rem] !text-[12px] !px-0 ti-form-select' placeholder='Open this select menu' />
                                <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} mainClass='ti-form-select sm:p-4 !px-0 !py-2' placeholder='Open this select menu' />
                                <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} mainClass='ti-form-select sm:p-5 !px-0 !py-3 !text-[16px]' placeholder='Open this select menu' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Select With Validation States</h5>
                        </div>
                        <div className="box-body">
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="select-1" className="ti-form-select rounded-sm !p-0 mb-2 font-medium">Label</label>
                                    <div className="relative">
                                        <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} mainClass='ti-form-select rounded-sm !py-2 !px-0 pe-16 !border-red focus:border-red focus:ring-red' placeholder='Open this select menu' />
                                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
                                            <svg className="h-4 w-4 text-danger" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-sm text-danger mt-2">Please select a valid state.</p>
                                </div>

                                <div>
                                    <label htmlFor="select-2" className="ti-form-select rounded-sm !p-0 mb-2 font-medium">Label</label>
                                    <div className="relative">
                                        <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} mainClass='ti-form-select rounded-sm !py-2 !px-0 pe-16 !border-red focus:border-red focus:ring-green' placeholder='Open this select menu' />
                                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
                                            <svg className="h-4 w-4 text-success" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.6091 3.41829C13.8594 3.68621 14 4.04952 14 4.42835C14 4.80718 13.8594 5.1705 13.6091 5.43841L6.93313 12.5817C6.68275 12.8495 6.3432 13 5.98916 13C5.63511 13 5.29556 12.8495 5.04518 12.5817L2.3748 9.72439C2.13159 9.45494 1.99701 9.09406 2.00005 8.71947C2.00309 8.34488 2.14351 7.98656 2.39107 7.72167C2.63862 7.45679 2.9735 7.30654 3.32359 7.30328C3.67367 7.30002 4.01094 7.44403 4.26276 7.70427L5.98916 9.55152L11.7211 3.41829C11.9715 3.15046 12.3111 3 12.6651 3C13.0191 3 13.3587 3.15046 13.6091 3.41829Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-sm text-success mt-2">Looks good!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}

            {/* <!-- Start::row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12  md:col-span-6 xl:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Tom Select Input</h5>
                        </div>
                        <div className="box-body">
                            <foemselectData.Tomselect />
                        </div>
                    </div>
                </div>
                <div className="col-span-12  md:col-span-6 xl:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title"> Basic Tom Select</h5>
                        </div>
                        <div className="box-body">
                            <SpkSelect classNameprefix="Select2" option={foemselectData.basicselect} mainClass='ti-form-select rounded-sm !p-0' placeholder='Select a person' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12  md:col-span-6 xl:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Disabled Tom Select</h5>
                        </div>
                        <div className="box-body">
                            <select className="ti-form-select rounded-sm !py-1 !px-2" id="select-beast-disabled" autoComplete="off" disabled={true}>
                                <option >Select a person...</option>
                                <option >Thomas Edison</option>
                                <option >Nikola</option>
                                <option  >Nikola Tesla</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-span-12  md:col-span-6 xl:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Multiple Tom Select</h5>
                        </div>
                        <div className="box-body">
                            <SpkSelect classNameprefix="Select2" multi option={foemselectData.multiDropdownSelect} mainClass='ti-form-select rounded-sm !p-0' onfunchange={(value) => console.log(value)} defaultvalue={[foemselectData.multiDropdownSelect[4]]} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- End::row-4 --> */}

            {/* <!-- Start::row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 md:col-span-6 xxl:!col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Default Select</h5>
                        </div>
                        <div className="box-body">
                            <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} placeholder='Open this select menu' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 xxl:!col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Pilled Select</h5>
                        </div>
                        <div className="box-body">
                            <SpkSelect classNameprefix="Select2" option={foemselectData.defaultselect} placeholder='Open this select menu' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 xxl:!col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Disabled Select</h5>
                        </div>
                        <div className="box-body">
                            <select className="opacity-70 pointer-events-none ti-form-select rounded-sm !py-2 !px-3" disabled={true}>
                                <option >Open this select menu</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 xxl:!col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Select With Hidden Label</h5>
                        </div>
                        <div className="box-body">
                            <label htmlFor="hs-hidden-select" className="sr-only">Label</label>
                            <SpkSelect  classNameprefix="Select2" option={foemselectData.defaultselect} placeholder='Open this select menu' />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-5 --> */}

            {/* <!-- Start::row-6 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title"> Options added via config with no search</h5>
                        </div>
                        <div className="box-body">
                            <SpkSelect classNameprefix="Select2" menuplacement="top" option={foemselectData.Optionwithnosearch} mainClass='default basic-multi-select' clearable={true} defaultvalue={[foemselectData.Optionwithnosearch[5]]} />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title"> Passing Unique Values</h5>
                        </div>
                        <div className="box-body">
                            <CreatableSelect
                                components={components}
                                classNamePrefix='Select2'
                                inputValue={inputValue1}
                                isClearable
                                isMulti
                                menuIsOpen={false}
                                onChange={(newValue) => {
                                    // Ensure newValue is an array (or empty array) of objects
                                    if (Array.isArray(newValue)) {
                                        setValue1(newValue);
                                    } else {
                                        // Handle the case when newValue is not an array
                                        setValue1([]);
                                    }
                                }}
                                onInputChange={(newValue) => setInputValue1(newValue)}
                                onKeyDown={handleKeyDown1}
                                placeholder="Type something and press enter..."
                                value={value1}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-6 --> */}
        </Fragment>
    );
};

export default FormSelect;