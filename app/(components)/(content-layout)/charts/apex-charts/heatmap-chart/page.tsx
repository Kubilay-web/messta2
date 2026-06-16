"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as asheatmapData from "@/shared/data/charts/apexcharts/heatmapdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface HeatmapChartProps { }

const HeatmapChart: FC<HeatmapChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Heatmap Charts" />
            <Pageheader Heading="Apex Heatmap Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Heatmap Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-basic">
                                <Spkapexcharts chartOptions={asheatmapData.Heatboptions} chartSeries={asheatmapData.Heatbseries} type="heatmap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multi Series Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-multiseries">
                                <Spkapexcharts chartOptions={asheatmapData.Heatmultioptions} chartSeries={asheatmapData.Heatmultiseries} type="heatmap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Color Range Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-colorrange">
                                <Spkapexcharts chartOptions={asheatmapData.Heatrangeoptions} chartSeries={asheatmapData.Heatrangeseries} type="heatmap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Heatmap Range Without Shades</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-range">
                                <Spkapexcharts chartOptions={asheatmapData.Heatshadeoptions} chartSeries={asheatmapData.Heatshadeseries} type="heatmap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default HeatmapChart;