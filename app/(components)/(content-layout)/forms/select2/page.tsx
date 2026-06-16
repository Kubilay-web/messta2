"use client"
import SpkMultiselect from "@/shared/@spk-reusable-components/spk-packages/spk-multiselect";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import { options, options1, Selectmaxoption, Selectoption1, Selectoption2, Selectoption3, Selectoption4, Selectoption5 } from "@/shared/data/forms/select2data";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface Select2Props { }

const Select2: FC<Select2Props> = () => {
    const [_valuesA, setValuesA] = useState()
    const [_valuesB, setValuesB] = useState()

    const [singleSelectValue, setSingleSelectValue] = useState<Option | null>(null);
    const [multiSelectValue, setMultiSelectValue] = useState<Option[] | null>([]);
    const [isSelectDisabled, setSelectDisabled] = useState(false);



    const handleSingleSelectChange = (selectedOption: Option | null) => {
        setSingleSelectValue(selectedOption);
    };

    const handleMultiSelectChange = (selectedOptions: Option[] | null) => {
        setMultiSelectValue(selectedOptions);
    };


    const disableSelect = () => {
        setSelectDisabled(true);
    };

    const enableSelect = () => {
        setSelectDisabled(false);
    };

    const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
   
    
    const handleSelectChange1 = (selected1: string[]) => {
        // Define your maximum selection limit (e.g., 2 in this example)
        const maxSelections = 3;
        
        if (selected1 && selected1.length <= maxSelections) {
            setErrorMessage('You can only select up to 3 items!');
            setSelectedOptions1(selected1);
        }
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Select2" />
            <Pageheader Heading="Select2" breadcrumbs={['Forms']} currentpage="Select2" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Select2
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSelect name="state" option={Selectoption1} mainClass="basic-multi-select " searchable menuplacement='auto' classNameprefix="Select2" defaultvalue={[Selectoption1[0]]} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title !text-start">
                                Multiple Select
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkMultiselect multi options={Selectoption2} mainClass="default basic-multi-select custom-multi " values={[Selectoption2[0]]} onChange={(valuesA: any) => setValuesA(valuesA)} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Single Select With Placeholder
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSelect name="state" option={Selectoption3} mainClass="js-example-placeholder-single js-states" clearable menuplacement='auto' classNameprefix="Select2" defaultvalue={[Selectoption3[0]]} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Multiple Select With Placeholder
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkMultiselect multi options={Selectoption4} mainClass="default basic-multi-select custom-multi " onChange={(valuesB: any) => setValuesB(valuesB)} placeholder="Select a State" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Templating
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSelect name="state" option={Selectoption5} mainClass="js-example-templating js-persons basic-custom-select" menuplacement="auto" classNameprefix="Select2"
                                defaultvalue={[Selectoption5[0]]}
                            />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Templating Selection
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSelect name="state" option={Selectoption5} mainClass="basic-multi-select" menuplacement="auto" classNameprefix="Select2" defaultvalue={[Selectoption5[0]]} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Max Selections Limiting
                            </div>
                        </div>
                        <div className="box-body">
                            <SpkSelect multi name="states[]" option={Selectmaxoption} mainClass="basic-multi-select" value={selectedOptions1} searchable menuplacement="auto" classNameprefix="Select2"  onfunchange={handleSelectChange1} />
                            {errorMessage && (
                                <div className="text-danger mt-2">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Disabling a Select2 control
                            </div>
                        </div>
                        <div className="box-body flex flex-col gap-3">
                            <SpkSelect mainClass="mb-3" option={options} classNameprefix="Select2" defaultvalue={singleSelectValue} onfunchange={handleSingleSelectChange} disabled={isSelectDisabled} />
                            <SpkSelect mainClass="js-example-disabled-multi" option={options1} defaultvalue={multiSelectValue} classNameprefix="Select2" onfunchange={handleMultiSelectChange} multi disabled={isSelectDisabled} clearable={!isSelectDisabled} />
                            <div>
                                <SpkButton buttontype="button" customClass="ti-btn ti-btn-soft-primary " onclickfunc={enableSelect}>Enable</SpkButton>
                                <SpkButton buttontype="button" customClass="ti-btn ti-btn-primary " onclickfunc={disableSelect}>Disable</SpkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}
        </Fragment>
    );
};

export default Select2;