"use client"
import React, { FC, Fragment } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Showcode from "@/shared/layouts-components/showcode/showcode";
import { range1, range2, range3, range4 } from "@/shared/data/prism/forms-prism";
import LabeledTwoThumbs, { Marks } from "@/shared/data/forms/rangesliderdata";
import { connect } from "react-redux";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";


interface RangeSliderProps { }

const RangeSlider: FC<RangeSliderProps> = ({ local_varaiable }: any) => {

    function valuetext(value: any) {
        return `${value}°C`;
    }

    const AirbnbSlider = styled(Slider)(({ theme }) => ({
        color: '#546dfe',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            height: 27,
            width: 27,
            backgroundColor: '#fff',
            border: '1px solid currentColor',
            '&:hover': {
                boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
            },
            '& .airbnb-bar': {
                height: 9,
                width: 1,
                backgroundColor: 'currentColor',
                marginLeft: 1,
                marginRight: 1,
            },
        },
        '& .MuiSlider-track': {
            height: 3,
        },
        '& .MuiSlider-rail': {
            color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
            opacity: theme.palette.mode === 'dark' ? undefined : 1,
            height: 3,
        },
    }));

    function AirbnbThumbComponent(props: any) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
            </SliderThumb>
        );
    }

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Range Slider" />
            <Pageheader Heading="Range Slider" breadcrumbs={['Forms', ' Form Elements']} currentpage="Range Slider" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <h6 className="mb-3">Default:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Default Range" reactCode={range1}>
                        <input type="range" className="form-range" id="customRange1" />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Disabled Range" reactCode={range2}>
                        <input type="range" className="form-range" id="disabledRange" disabled />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Range With Min and Max Values" reactCode={range3}>
                        <input type="range" className="form-range" min="0" max="5" id="customRange2" />
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Range With Steps" reactCode={range4}>
                        <input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange3" />
                    </Showcode>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <h6 className="mb-3">noUiSlider:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Default-Styling
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="slider">
                                {/* <Box sx={{ m: 3 }} /> */}
                                <AirbnbSlider slots={{ thumb: AirbnbThumbComponent }} getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')} defaultValue={[10, 90]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Fit Handles
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="slider-fit">
                                <AirbnbSlider slots={{ thumb: AirbnbThumbComponent }} getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')} defaultValue={[10, 90]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Rounded Styling
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="slider-round" className="!pb-[2rem]">
                                <Slider component="span" aria-label="Temperature" defaultValue={30} color="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Square Styling
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="slider-square" className="!pb-[2rem]">
                                <Slider className="square-thumb" aria-label="Temperature" defaultValue={30} color="primary" style={{ margin: 'auto', }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Toggle Movement By Clicking Pips</div>
                        </div>
                        <div className="box-body">
                            <div id="slider-pips">
                                <LabeledTwoThumbs rtl={local_varaiable.dir == 'rtl'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="xl:col-span-12 col-span-12">
                        <div className="box">
                            <div className="box-header">
                                <div className="box-title">Soft Limits</div>
                            </div>
                            <div className="box-body">
                                <div id="soft">
                                    <Marks rtl={local_varaiable.dir == 'rtl'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}





            {/* <!-- Start:: row-6 --> */}
            <h6 className="mb-3">noUiSlider Colors:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Primary
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="primary-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} color="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Secondary
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="secondary-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} color="secondary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Warning
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="warning-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Info
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="info-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Success
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="success-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Danger
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="danger-colored-slider">
                                <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}
        </Fragment>
    );
};

// export default RangeSlider;
const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, {})(RangeSlider);