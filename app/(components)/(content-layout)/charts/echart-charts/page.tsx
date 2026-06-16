"use client"
import SpkEcharts from "@/shared/@spk-reusable-components/spk-packages/spk-echart";
import * as echartsData from "@/shared/data/charts/echartsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface EchartChartsProps { }

const EchartCharts: FC<EchartChartsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Echart Charts" />
            <Pageheader Heading="Echart Charts" breadcrumbs={['Charts',]} currentpage="Echart Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Line Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Lineoption} chartSeries={echartsData.Lineseries} id="echart-basic-line" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Smoothed Line Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Smoothoption} chartSeries={echartsData.Smoothseries} id="echart-smoothed-line" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Area Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Basicoption} chartSeries={echartsData.Basicseries} id="echart-area-line" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stacked Line Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Stackoption} chartSeries={echartsData.Stackseries} id="echart-stacked-line" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stacked Area Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Stackareaoption} chartSeries={echartsData.Stackareaseries} id="echart-stacked-area" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Step Line Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Stepoption} chartSeries={echartsData.Stepseries} id="echart-step-line" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Baroption} chartSeries={echartsData.Barseries} id="echart-bar-basic" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar With Background Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Backoption} chartSeries={echartsData.Backseries} id="echart-bar-background" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Style For a Single Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Styleoption} chartSeries={echartsData.Styleseries} id="echart-bar-single" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Water Fall Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Wateroption} chartSeries={echartsData.Waterseries} id="echart-waterfall" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bar With Negative Values Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Negativeoption} chartSeries={echartsData.Negativeseries} id="echart-negative-values" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Horizontal Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Horizontaloption} chartSeries={echartsData.Horizontalseries} id="echart-bar-horizontal" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Horizontal Stacked Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.HoriStackoption} chartSeries={echartsData.HoriStackseries} id="echart-stacked-horizontal" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Pieoption} chartSeries={echartsData.Pieseries} id="echart-pie" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Doughnut Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Doughnutoption} chartSeries={echartsData.Doughnutseries} id="echart-doughnut" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Scattoption} chartSeries={echartsData.Scattseries} id="echart-scatter" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Bubbleoption} chartSeries={echartsData.Bubbleseries} id="echart-bubble" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Candlestick Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Candleoption} chartSeries={echartsData.Candleseries} id="echart-candlestick" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Radar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Radaroption} chartSeries={echartsData.Radarseries} id="echart-basic-radar" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Heatoption} chartSeries={echartsData.Heatseries} id="echart-heatmap" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Treemap Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Treeoption} chartSeries={echartsData.Treeseries} id="echart-treemap" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Funnel Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Funneloption} chartSeries={echartsData.Funnelseries} id="echart-funnel" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Gauge Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Gaugeoption} chartSeries={echartsData.Gaugeseries} id="echart-gauge-basic" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Simple Graph Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkEcharts chartOptions={echartsData.Graphoption} chartSeries={echartsData.Graphseries} id="echart-simple-graph" mainClass="echart-charts" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default EchartCharts;