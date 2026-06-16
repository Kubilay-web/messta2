"use client"
import React, { ChangeEvent, FC, Fragment, useState } from "react";
import { InputMask } from "@react-input/mask";
import { NumericFormat } from "react-number-format";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
interface InputMasksProps { }

const InputMasks: FC<InputMasksProps> = () => {

    const [licensePlate, setLicensePlate] = useState("");
    const handleLicensePlateChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputText = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        inputText = inputText.slice(0, 14);
        const formattedText = formatLicensePlate(inputText);
        setLicensePlate(formattedText);
    };

    const formatLicensePlate = (inputText: string): string => {
        const formattedText = inputText
            .split("")
            .map((char, index) => (index % 4 === 0 && index !== 0 ? ` ${char}` : char))
            .join("");
        return formattedText;
    };
    const [value1, setValue1] = useState("");

    function onChange1(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue1(event.target.value);
    }

    const [value2, setValue2] = useState("");

    function onChange2(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue2(event.target.value);
    }

    const [value3, setValue3] = useState("");

    function onChange3(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue3(event.target.value);
    }

    const [value4, setValue4] = useState("");

    function onChange4(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue4(event.target.value);
    }

    const [value5, setValue5] = useState("");

    function onChange5(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue5(event.target.value);
    }
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Input Masks" />
            <Pageheader Heading="Input Masks" breadcrumbs={['Forms', ' Form Elements']} currentpage="Input Masks" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date Format-1
                            </div>
                        </div>
                        <div className="box-body">
                            <InputMask className="form-control date-format" mask="dd-mm-yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} placeholder="DD-MM-YYYY" showMask separate value={value1} onChange={onChange1} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date Format-2
                            </div>
                        </div>
                        <div className="box-body">
                            <InputMask className="form-control date-format" mask="dd-mm" replacement={{ d: /\d/, m: /\d/ }} placeholder="MM-DD" showMask separate value={value2} onChange={onChange2} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date Format-3
                            </div>
                        </div>
                        <div className="box-body">
                            <InputMask className="form-control date-format" mask="dd-yy" replacement={{ d: /\d/, y: /\d/ }} placeholder="MM-YY" showMask separate value={value3} onChange={onChange3} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Number Formatting
                            </div>
                        </div>
                        <div className="box-body">
                            <NumericFormat className='form-control' value="20020220" allowLeadingZeros thousandSeparator="" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Time Format-1
                            </div>
                        </div>
                        <div className="box-body">
                            <InputMask className="form-control date-format" mask="99:99:99" replacement={{ 9: /\d/ }} placeholder="hh:mm:ss" separate value={value4} onChange={onChange4} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Time Format-2
                            </div>
                        </div>
                        <div className="box-body">
                            <InputMask className="form-control date-format" mask="99:99" replacement={{ 9: /\d/ }} placeholder="hh:mm" showMask separate value={value5} onChange={onChange5} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Formatting Into Blocks
                            </div>
                        </div>
                        <div className="box-body">
                            <input className="form-control formatting-blocks" placeholder="ABCD EFG HIJ KLMN" value={licensePlate} onChange={handleLicensePlateChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    );
};

export default InputMasks;