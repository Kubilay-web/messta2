"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as timelinechartData from "@/shared/data/charts/apexcharts/timelinechartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface TimelineChartProps { }

const TimelineChart: FC<TimelineChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Timeline Charts" />
            <Pageheader Heading="Apex Timeline Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Timeline Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic TImeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-basic">
                                <Spkapexcharts chartOptions={timelinechartData.Timelineoptions} chartSeries={timelinechartData.Timelineseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multiple Colored TImeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-colors">
                                <Spkapexcharts chartOptions={timelinechartData.Timecoloroptions} chartSeries={timelinechartData.Timecolorseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multi Series Timeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-multi">
                                <Spkapexcharts chartOptions={timelinechartData.Timemultioptions} chartSeries={timelinechartData.Timemultiseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Advanced Timeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-advanced">
                                <Spkapexcharts chartOptions={timelinechartData.Timeadvanceoptions} chartSeries={timelinechartData.Timeadvanceseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Timeline-Grouped Rows</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-grouped">
                                <Spkapexcharts chartOptions={timelinechartData.Timegroupoptions} chartSeries={timelinechartData.Timegroupseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Dumbbell Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="dumbbell-chart">
                                <Spkapexcharts chartOptions={timelinechartData.Timedumbeloptions} chartSeries={timelinechartData.Timedumbelseries} type="rangeBar" width={"100%"} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default TimelineChart;