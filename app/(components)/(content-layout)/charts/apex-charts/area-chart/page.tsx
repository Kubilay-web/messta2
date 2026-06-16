"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import * as areachartData from "@/shared/data/charts/apexcharts/areachartdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface AreaChartProps { }

const AreaChart: FC<AreaChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Area Charts" />
            <Pageheader Heading="Apex Area Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Area Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-basic">
                                <Spkapexcharts chartOptions={areachartData.Areabasicoptions} chartSeries={areachartData.Areabasicseries} type="area" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Spline Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-spline">
                                <Spkapexcharts chartOptions={areachartData.Areasplineoptions} chartSeries={areachartData.Areasplineseries} type="area" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Area Chart With Negative Values</div>
                        </div>
                        <div className="box-body">
                            <div id="area-negative">
                                <Spkapexcharts chartOptions={areachartData.Areavalueoptions} chartSeries={areachartData.Areavalueseries} type="area" width={"100%"} height={300} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Selection-Github Style Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="chart-months">
                                <Spkapexcharts chartOptions={areachartData.Areagithuboptions} chartSeries={areachartData.Areagithubseries} type="area" width={"100%"} height={130} />
                            </div>
                            <div className="github-style flex items-center">
                                <div className="me-2">
                                <Image width={38} height={38} className="userimg rounded" src="../../../assets/images/faces/1.jpg"
                                            data-hovercard-user-id="634573" alt="" />
                                </div>
                                <div className="userdetails leading-none">
                                    <Link scroll={false} href="#!" className="username font-medium text-[14px]">coder</Link>
                                    <span className="cmeta block mt-1">
                                        <span className="commits"></span> commits
                                    </span>
                                </div>
                            </div>
                            <div id="chart-years">
                                <Spkapexcharts chartOptions={areachartData.optionsYears} chartSeries={areachartData.seriesYears} type="area" width={"100%"} height={140} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Stacked Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-stacked">
                                <Spkapexcharts chartOptions={areachartData.Areastackoptions} chartSeries={areachartData.Areastackseries} type="area" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Irregular Time Series Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-irregular">
                                <Spkapexcharts chartOptions={areachartData.Areatimeoptions} chartSeries={areachartData.Areatimeseries} type="area" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Area Chart With Null Values</div>
                        </div>
                        <div className="box-body">
                            <div id="area-null">
                                <Spkapexcharts chartOptions={areachartData.Areanulloptions} chartSeries={areachartData.Areanullseries} type="area" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">

                        <div className="box-header flex">
                            <div className="box-title">Area Chart-Datetime X-Axis Chart</div>

                            <div className="inline-flex rounded-sm">
                                <SpkButton
                                    buttontype="button"
                                    onclickfunc={() => areachartData.Dateoptions.updateData("one_month")}
                                    customClass={`ti-btn-group !border-0 !text-[0.8rem] !py-1 !px-[0.8rem] ti-btn-primary btn-wave text-white waves-effect waves-light ${areachartData.Dateoptions.selection === "one_month" ? "active" : ""}`}
                                    Id="one_month"
                                >
                                    1M
                                </SpkButton>

                                <SpkButton
                                    buttontype="button"
                                    onclickfunc={() => areachartData.Dateoptions.updateData("six_months")}
                                    customClass={`ti-btn-group !border-0 !text-[0.8rem] !py-1 !px-[0.8rem] btn-wave ti-btn-soft-primary waves-effect waves-light ${areachartData.Dateoptions.selection === "six_months" ? "active" : ""}`}
                                    Id="six_months"
                                >
                                    6M
                                </SpkButton>

                                <SpkButton
                                    buttontype="button"
                                    onclickfunc={() => areachartData.Dateoptions.updateData("ytd")}
                                    customClass={`ti-btn-group !border-0 !text-[0.8rem] !py-1 !px-[0.8rem] btn-wave ti-btn-soft-primary waves-effect waves-light ${areachartData.Dateoptions.selection === "ytd" ? "active" : ""}`}
                                    Id="ytd"
                                >
                                    1Y
                                </SpkButton>

                                <SpkButton
                                    buttontype="button"
                                    onclickfunc={() => areachartData.Dateoptions.updateData("all")}
                                    customClass={`ti-btn-group !border-0 !text-[0.8rem] !py-1 !px-[0.8rem] btn-wave ti-btn-soft-primary !rounded-s-none waves-effect waves-light ${areachartData.Dateoptions.selection === "all" ? "active" : ""}`}
                                    Id="all"
                                >
                                    All
                                </SpkButton>
                            </div>


                        </div>
                        <div className="box-body">
                            <div id="area-datetime">
                                <Spkapexcharts chartOptions={areachartData.Dateoptions} chartSeries={areachartData.Dateseries} type='area' height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default AreaChart;
