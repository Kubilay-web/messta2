"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as piechartData from "@/shared/data/charts/apexcharts/piechartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment, useState } from "react";

interface PieChartProps { }

const PieChart: FC<PieChartProps> = () => {
    const [state, setState] = useState({ series: piechartData.Updatedseries });

    const appendData = () => {
        const newSeries = [...state.series, Math.floor(Math.random() * 100) + 1];
        setState({ series: newSeries });
    };

    const removeData = () => {
        if (state.series.length > 1) {
            const newSeries = state.series.slice(0, -1);
            setState({ series: newSeries });
        }
    };

    const randomize = () => {
        const newSeries = state.series.map(() => Math.floor(Math.random() * 100) + 1);
        setState({ series: newSeries });
    };

    const reset = () => {
        setState({ series: piechartData.Updatedseries });
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Pie Charts" />
            <Pageheader Heading="Apex Pie Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Pie Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-basic">
                                <Spkapexcharts chartOptions={piechartData.Basicpieoptions} chartSeries={piechartData.Basicpieseries} type="pie" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Simple Donut Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="donut-simple">
                                <Spkapexcharts chartOptions={piechartData.Donutoptions} chartSeries={piechartData.Donutseries} type="donut" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Updating Donut Chart</div>
                        </div>
                        <div className="box-body mx-auto">
                            <div id="donut-update">
                            <Spkapexcharts chartOptions={piechartData.Updatedoptions} chartSeries={state.series} type="donut" width={"100%"} height={225} />

                            {/*<Spkapexcharts chartOptions={piechartData.Updatedseries} chartSeries={piechartData.Updatedoptions} type="donut" width={"100%"} height={300} />*/}
                            </div>
                            <div className="text-center mt-4">
                                <SpkButton variant="primary" customClass="ti-btn btn-sm m-1" Id="randomize" onclickfunc={randomize}>Randomize</SpkButton>
                                <SpkButton variant="primary" customClass="ti-btn btn-sm m-1" Id="add" onclickfunc={appendData}>Add</SpkButton>
                                <SpkButton variant="primary" customClass="ti-btn btn-sm m-1" Id="remove" onclickfunc={removeData}>Remove</SpkButton>
                                <SpkButton variant="primary" customClass="ti-btn btn-sm m-1" Id="reset" onclickfunc={reset}>Reset</SpkButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Monochrome Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-monochrome">
                                <Spkapexcharts chartOptions={piechartData.Piemonooptions} chartSeries={piechartData.Piemonoseries} type="pie" width={"100%"} height={280} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Gradient Donut Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="donut-gradient">
                                <Spkapexcharts chartOptions={piechartData.Piegardientoptions} chartSeries={piechartData.Piegradientseries} type="donut" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Donut Chart With Patterns</div>
                        </div>
                        <div className="box-body mx-auto">
                            <div id="donut-pattern">
                                <Spkapexcharts chartOptions={piechartData.Piechartoptions} chartSeries={piechartData.Piechartseries} type="donut" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Image Filled Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-image">
                                <Spkapexcharts chartOptions={piechartData.Pieimgoptions} chartSeries={piechartData.Pieimgseries} type="pie" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default PieChart;