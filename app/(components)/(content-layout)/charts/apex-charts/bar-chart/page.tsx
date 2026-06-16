"use client"
import React, { FC, Fragment } from "react";
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as barchartData from "@/shared/data/charts/apexcharts/barchartdata";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

interface BarChartProps { }

const BarChart: FC<BarChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Bar Charts" />
            <Pageheader Heading="Apex Bar Charts" breadcrumbs={['Charts',' Apex Charts']} currentpage="Apex Bar Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-basic">
                                <Spkapexcharts chartOptions={barchartData.Barbasicoptions} chartSeries={barchartData.Barbasicseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Grouped Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-group">
                                <Spkapexcharts chartOptions={barchartData.Bargroupoptions} chartSeries={barchartData.Bargroupseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stacked Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-stacked">
                                <Spkapexcharts chartOptions={barchartData.Barstackoptions} chartSeries={barchartData.Barstackseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">100% Stacked Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-full">
                                <Spkapexcharts chartOptions={barchartData.Barstack1options} chartSeries={barchartData.Barstck1series} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar Chart With Negative Values</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-negative">
                                <Spkapexcharts chartOptions={barchartData.Barchartoptions} chartSeries={barchartData.Barchartseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar Chart With Markers</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-markers">
                                <Spkapexcharts chartOptions={barchartData.Barmakeroptions} chartSeries={barchartData.Barmakerseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Reversed Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-reversed">
                                <Spkapexcharts chartOptions={barchartData.Barreverseoptions} chartSeries={barchartData.Barreverseseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar With Category DataLabels</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-categories">
                                <Spkapexcharts chartOptions={barchartData.Barlableoptions} chartSeries={barchartData.Barlabelseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Patterned Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-pattern">
                                <Spkapexcharts chartOptions={barchartData.Barpatternoptions} chartSeries={barchartData.Barpatternseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar With Image Fill</div>
                        </div>
                        <div className="box-body">
                            <div id="bar-image">
                                <Spkapexcharts chartOptions={barchartData.Barimgoptions} chartSeries={barchartData.Barimgseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default BarChart;