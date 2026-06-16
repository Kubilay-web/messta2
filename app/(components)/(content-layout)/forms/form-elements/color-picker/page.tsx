"use client"
import React, { FC, Fragment, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { ChromePicker } from 'react-color';
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import { color1, tailwindpicker2 } from "@/shared/data/prism/forms-prism";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import "react-color-palette/css"; //color picker
interface ColorPickerProps { }

const ColorPickers: FC<ColorPickerProps> = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    //color picker
    const [color, setColor] = useColor("#561ecb");

    // color picker
    const [color2, setColor2] = useState<any>("#6c5ffc");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const handleChangeComplete = (color: any) => {
        console.log(color);
    };

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Color Pickers" />
            <Pageheader Heading="Color Pickers" breadcrumbs={['Forms', ' Form Elements']} currentpage="Color Pickers" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Color Picker" reactCode={color1}>
                        <input type="color" className="form-control form-control-color !border-0" id="exampleColorInput" defaultValue="#136ad0" title="Choose your color" />
                    </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <Showcode title="Tailwind colorpicker" reactCode={tailwindpicker2}>
                        <input type="color"
                            className="p-1 h-10 w-10 block bg-white dark:bg-bodybg cursor-pointer rounded-sm 
                                    disabled:opacity-50 disabled:pointer-events-none dark:bg-bgdark dark:border-white/10"
                            id="hs-color-input" defaultValue="#5a66f1" title="Choose your color" />
                    </Showcode>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!--Start::row-2 --> */}

            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Classic1" reactCode={color1}>
                        <>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 xl:col-span-6 md:col-span-8">
                                <SpkButton variant="primary" onclickfunc={toggleVisibility} customClass='ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium'>
                                    <i className="ri-palette-line"></i>
                                </SpkButton>
                                {isVisible && (<ColorPicker color={color} onChange={setColor} hideInput={["hex", "hsv"]} />)}
                            </div>
                        </div>
                        </>
                                        
                         </Showcode>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <Showcode title="Classic2" reactCode={tailwindpicker2}>
                        <>
                        <SpkButton variant="primary" customClass='pcr-button ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium' onclickfunc={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{showColorPicker ? "Close Picker" : "Pick Color"}</SpkButton>
                        {showColorPicker && (<ChromePicker disableAlpha={true} color={color2} onChange={(updatedColor: { hex: any; }) => setColor2(updatedColor.hex)} onChangeComplete={handleChangeComplete} />
                        )}
                        </>
                        
                    </Showcode>
                </div>
            </div>
        </Fragment>
    );
};

export default ColorPickers;