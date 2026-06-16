"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as radialbarData from "@/shared/data/charts/apexcharts/radialbardata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface RadialbarChartProps { }

const RadialbarChart: FC<RadialbarChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Radialbar Charts" />
            <Pageheader Heading="Apex Radialbar Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Radialbar Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radialbar-basic">
                                <Spkapexcharts chartOptions={radialbarData.Pieoptions} chartSeries={radialbarData.Pieseries} type="radialBar" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multiple Radialbar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radialbar-multiple">
                                <Spkapexcharts chartOptions={radialbarData.Multiroptions} chartSeries={radialbarData.Multirseries} type="radialBar" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Circle Chart - Custom Angle</div>
                        </div>
                        <div className="box-body">
                            <div id="circle-custom">
                                <Spkapexcharts chartOptions={radialbarData.Customoptions} chartSeries={radialbarData.Customseries} type="radialBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Gradient Circle Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="gradient-circle">
                                <Spkapexcharts chartOptions={radialbarData.Gradientoptions} chartSeries={radialbarData.Gradientseries} type="radialBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stroked Circular Gauge</div>
                        </div>
                        <div className="box-body">
                            <div id="circular-stroked">
                                <Spkapexcharts chartOptions={radialbarData.Strokeoptions} chartSeries={radialbarData.Storkeseries} type="radialBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Circle Chart With Image</div>
                        </div>
                        <div className="box-body">
                            <div id="circle-image">
                                <Spkapexcharts chartOptions={radialbarData.Circleoptions} chartSeries={radialbarData.Circleseries} type="radialBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Semi Circular Gauge</div>
                        </div>
                        <div className="box-body">
                            <div id="circular-semi">
                                <Spkapexcharts chartOptions={radialbarData.Gaugeoptions} chartSeries={radialbarData.Gaugeseries} type="radialBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default RadialbarChart;