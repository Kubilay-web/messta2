"use client"
import React, { FC, Fragment } from "react";

import dynamic from "next/dynamic";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
const LineChart1 = dynamic(() => import('@/shared/data/charts/apexcharts/linechartsdata1'), { ssr: false });

interface LineChartProps { }

const LineChart: FC<LineChartProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Apex Line Charts" />
            <Pageheader Heading="Apex Line Charts" breadcrumbs={['Charts', ' Apex Charts']} currentpage="Apex Line Charts" />
            {/* <!-- Page Header Close --> */}

            <LineChart1 />
        </Fragment>
    );
};

export default LineChart;