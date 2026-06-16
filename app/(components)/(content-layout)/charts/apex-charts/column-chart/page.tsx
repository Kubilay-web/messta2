"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as columnchartData from "@/shared/data/charts/apexcharts/columnchartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface ColumnChartProps { }

const ColumnChart: FC<ColumnChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Column Charts" />
            <Pageheader Heading="Apex Column Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Column Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="column-basic">
                                <Spkapexcharts chartOptions={columnchartData.Columnbasicoptions} chartSeries={columnchartData.Columnbasicseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Column Chart With Datalabels</div>
                        </div>
                        <div className="box-body">
                            <div id="column-datalabels">
                                <Spkapexcharts chartOptions={columnchartData.Columnchartoptions} chartSeries={columnchartData.Columnchartseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stacked Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="column-stacked">
                                <Spkapexcharts chartOptions={columnchartData.Stackcolumnoptions} chartSeries={columnchartData.Stackcolumnseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">100% Stacked Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="column-stacked-full">
                                <Spkapexcharts chartOptions={columnchartData.Columnstack1options} chartSeries={columnchartData.Columnstack1series} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Column Chart With Markers</div>
                        </div>
                        <div className="box-body">
                            <div id="column-markers">
                                <Spkapexcharts chartOptions={columnchartData.Columnmakeroptions} chartSeries={columnchartData.Columnmakerseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Column Chart With Rotated Labels</div>
                        </div>
                        <div className="box-body">
                            <div id="column-rotated-labels">
                                <Spkapexcharts chartOptions={columnchartData.Columnrotateoptions} chartSeries={columnchartData.Columnrotateseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Column Chart With Negative Values</div>
                        </div>
                        <div className="box-body">
                            <div id="column-negative">
                                <Spkapexcharts chartOptions={columnchartData.Columnvalueoptions} chartSeries={columnchartData.Columnvalueseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Range Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="column-range">
                                <Spkapexcharts chartOptions={columnchartData.Columnoptions} chartSeries={columnchartData.Columnseries} type="bar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="xl:col-span-6 col-span-12">
                        <div className="box">
                            <div className="box-header">
                                <div className="box-title">Dynamic Loaded Chart</div>
                            </div>
                            <div className="box-body">
                                <div id="chart-year"></div>
                                <div id="chart-quarter"></div>
                            </div>
                        </div>
                    </div> */}
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Distributed Columns Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="columns-distributed">
                                <Spkapexcharts chartOptions={columnchartData.Column1options} chartSeries={columnchartData.Column1series} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default ColumnChart;