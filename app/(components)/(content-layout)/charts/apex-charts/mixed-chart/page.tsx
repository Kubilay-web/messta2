"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as mixedchartsData from "@/shared/data/charts/apexcharts/mixedchartsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface MixedChartProps { }

const MixedChart: FC<MixedChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Mixed Charts" />
            <Pageheader Heading="Apex Mixed Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Mixed Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Line & Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-linecolumn">
                                <Spkapexcharts chartOptions={mixedchartsData.Mixedlineoptions} chartSeries={mixedchartsData.Mixedlineseries} type="line" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multiple Y-Axis Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-multiple-y">
                                <Spkapexcharts chartOptions={mixedchartsData.Mixedaxisoptions} chartSeries={mixedchartsData.Mixedaxisseries} type="line" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Line & Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-linearea">
                                <Spkapexcharts chartOptions={mixedchartsData.Mixedareaoptions} chartSeries={mixedchartsData.Mixedareaseries} type="line" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Line,Column & Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-all">
                                <Spkapexcharts chartOptions={mixedchartsData.Mixedcolumnoptions} chartSeries={mixedchartsData.Mixedcolumnseries} type="line" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default MixedChart;