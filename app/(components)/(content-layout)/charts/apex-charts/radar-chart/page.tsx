
"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Multioptions, Multiseries, Ploygonseries, Polygonoptions, Radaroptions, Radarseries } from "@/shared/data/charts/apexcharts/radardata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface RadarChartProps { }

const RadarChart: FC<RadarChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Radar Charts" />
            <Pageheader Heading="Apex Radar Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Radar Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Radar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-basic">
                                <Spkapexcharts chartOptions={Radaroptions} chartSeries={Radarseries} type="radar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Radar Chart-Multiple Series</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-multiple">
                                <Spkapexcharts chartOptions={Multioptions} chartSeries={Multiseries} type="radar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Radar Chart Polygon Fill</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-polygon">
                                <Spkapexcharts chartOptions={Polygonoptions} chartSeries={Ploygonseries} type="radar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default RadarChart;