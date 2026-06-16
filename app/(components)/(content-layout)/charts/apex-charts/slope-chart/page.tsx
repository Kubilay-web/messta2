"use client"
import { Basicslope, MultigroupSlope } from "@/shared/data/charts/apexcharts/slopechartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface SlopeChartProps { }

const SlopeChart: FC<SlopeChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Slope Charts" />
            <Pageheader Heading="Apex Slope Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Slope Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title"> Basic Slope Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="basic-slope-chart">
                                <Basicslope />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title"> Multi-group Slope Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="multigroupchart">
                                <MultigroupSlope />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default SlopeChart;