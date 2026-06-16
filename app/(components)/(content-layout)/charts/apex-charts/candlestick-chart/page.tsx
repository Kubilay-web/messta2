"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as candlestickData from "@/shared/data/charts/apexcharts/candlestickdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface CandlestickChartProps { }

const CandlestickChart: FC<CandlestickChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Candlestick Charts" />
            <Pageheader Heading="Apex Candlestick Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Candlestick Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Candlestick Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-basic">
                                <Spkapexcharts chartOptions={candlestickData.Candbasicoptions} chartSeries={candlestickData.Candbasicseries} type="candlestick" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Candlestick Synced With Brush Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="chart-candlestick">
                                <Spkapexcharts chartOptions={candlestickData.Candsyncoptions} chartSeries={candlestickData.Candsyncedseries} type="candlestick" width={"100%"} height={215} />
                            </div>
                            <div id="chart-bar">
                                <Spkapexcharts chartOptions={candlestickData.CandeoptionsBar} chartSeries={candlestickData.CandseriesBar} type="bar" width={"100%"} height={120} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Candlestick With Category X-axis</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-categoryx">
                                <Spkapexcharts chartOptions={candlestickData.Candaxisoptions} chartSeries={candlestickData.Candaxisseries} type="candlestick" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Candlestick With Line Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-line">
                                <Spkapexcharts chartOptions={candlestickData.Candlineoptions} chartSeries={candlestickData.Candlineseries} type="candlestick" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default CandlestickChart;