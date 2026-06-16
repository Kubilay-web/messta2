"use client"
import Spkapexcharts from "@/shared/@spk-reusable-components/spk-packages/apexcharts-component";
import * as treemapData from "@/shared/data/charts/apexcharts/treemapdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface TreemapChartProps { }

const TreemapChart: FC<TreemapChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Treemap Charts" />
            <Pageheader Heading="Apex Treemap Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Treemap Charts" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Basic Treemap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="treemap-basic">
                                <Spkapexcharts chartOptions={treemapData.Treebasicoptions} chartSeries={treemapData.Treebasicseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Multi Dimensional Treemap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="treemap-multi">
                                <Spkapexcharts chartOptions={treemapData.Treemultioptions} chartSeries={treemapData.Treemultiseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Distributed Treemap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="treemap-distributed">
                                <Spkapexcharts chartOptions={treemapData.Treedisoptions} chartSeries={treemapData.Treedisseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">Treemap with color ranges</div>
                        </div>
                        <div className="box-body">
                            <div id="treemap-colorranges">
                                <Spkapexcharts chartOptions={treemapData.Treecoloroptions} chartSeries={treemapData.Treecolorseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default TreemapChart;