"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import { Basicrangeoptions, Basicrangeseries, Rangecombooptions, Rangecomboseries } from "@/shared/data/charts/apexcharts/rangeareadata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface RangeAreaChartProps { }

const RangeAreaChart: FC<RangeAreaChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Range Area Charts" />
            <Pageheader Heading="Apex Range Area Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Range Area Charts" />
            {/* <!-- Page Header Close --> */}

            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Range Area Chart
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="rangearea-basic">
                                <Spkapexcharts chartOptions={Basicrangeoptions} chartSeries={Basicrangeseries} type="rangeArea" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Combo Range Area Chart
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="rangearea-combo">
                                <Spkapexcharts chartOptions={Rangecombooptions} chartSeries={Rangecomboseries} type="rangeArea" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default RangeAreaChart;