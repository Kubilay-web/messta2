"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Funneloptions, Funnelseries, Pyramidoptions, Pyramidseries } from "@/shared/data/charts/apexcharts/funnelchartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface FunnelChartProps { }

const FunnelChart: FC<FunnelChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Funnel Charts" />
            <Pageheader Heading="Apex Funnel Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Funnel Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Funnel Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="funnel-chart">
                                <Spkapexcharts chartOptions={Funneloptions} chartSeries={Funnelseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Pyramid Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pyramid-chart">
                                <Spkapexcharts chartOptions={Pyramidoptions} chartSeries={Pyramidseries} type="bar" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default FunnelChart;