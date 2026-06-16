"use client"
import SpkChartJs from "@/shared/@spk-reusable-components/spk-packages/spk-chartjs";
import * as chartjsdata from "@/shared/data/charts/chartjsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface ChartjsChartsProps { }

const ChartjsCharts: FC<ChartjsChartsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Chartjs" />
            <Pageheader Heading="Chartjs" breadcrumbs={['Charts',]} currentpage="Chartjs" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Line Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="line" chartOptions={chartjsdata.Option} chartSeries={chartjsdata.Data} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Bar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="bar" chartOptions={chartjsdata.Option1} chartSeries={chartjsdata.Data1} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="pie" chartOptions={chartjsdata.Option2} chartSeries={chartjsdata.Data2} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Doughnut Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="doughnut" chartOptions={chartjsdata.Option3} chartSeries={chartjsdata.Data3} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Mixed Chart</div>
                        </div>
                        <div className="box-body">
                        <chartjsdata.Chartjsmixed/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Polar Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="polarArea" chartOptions={chartjsdata.Option5} chartSeries={chartjsdata.Data5} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Radial Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="radar" chartOptions={chartjsdata.Option6} chartSeries={chartjsdata.Data6} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="scatter" chartOptions={chartjsdata.Option7} chartSeries={chartjsdata.Data7} height='250px' />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <SpkChartJs id="chartjs-charts" type="bubble" chartOptions={chartjsdata.Option8} chartSeries={chartjsdata.Data8} height='250px' />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default ChartjsCharts;