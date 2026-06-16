"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Boxplothoptions, Boxplothseries, Boxplotoptions, Boxplotseries, Boxplotsoptions, Boxplotsseries } from "@/shared/data/charts/apexcharts/boxplotdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface BoxplotChartProps { }

const BoxplotChart: FC<BoxplotChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Boxplot Charts" />
            <Pageheader Heading="Apex Boxplot Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Boxplot Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Boxplot Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-basic">
                                <Spkapexcharts chartOptions={Boxplotoptions} chartSeries={Boxplotseries} type="boxPlot" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Boxplot With Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-scatter">
                                <Spkapexcharts chartOptions={Boxplotsoptions} chartSeries={Boxplotsseries} type="boxPlot" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Horizontal Boxplot Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-horizontal">
                                <Spkapexcharts chartOptions={Boxplothoptions} chartSeries={Boxplothseries} type="boxPlot" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default BoxplotChart;