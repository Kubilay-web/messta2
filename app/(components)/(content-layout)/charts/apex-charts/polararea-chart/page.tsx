"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Areaoptions, Areaseries, Monooptions, Monoseries } from "@/shared/data/charts/apexcharts/polarareadata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface PolarareaChartProps { }

const PolarareaChart: FC<PolarareaChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Polar Area Charts" />
            <Pageheader Heading="Apex Polar Area Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Polar Area Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Polar Area Chart</div>
                        </div>
                        <div className="box-body mx-auto">
                            <div id="polararea-basic">
                                <Spkapexcharts chartOptions={Areaoptions} chartSeries={Areaseries} type="polarArea" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Polar Area Monochrome Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="polararea-monochrome">
                                <Spkapexcharts chartOptions={Monooptions} chartSeries={Monoseries} type="polarArea" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default PolarareaChart;