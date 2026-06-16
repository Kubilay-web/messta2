"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Bubble3doptions, Bubble3dseries, Bubbleoptions, Bubbleseries } from "@/shared/data/charts/apexcharts/bubblechartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface BubbleChartProps { }

const BubbleChart: FC<BubbleChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Bubble Charts" />
            <Pageheader Heading="Apex Bubble Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Bubble Charts" />
            {/* <!-- Page Header Close --> */}

            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Simple Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bubble-simple">
                                <Spkapexcharts chartOptions={Bubbleoptions} chartSeries={Bubbleseries} type="bubble" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">3D Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bubble-3d">
                                <Spkapexcharts chartOptions={Bubble3doptions} chartSeries={Bubble3dseries} type="bubble" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default BubbleChart;