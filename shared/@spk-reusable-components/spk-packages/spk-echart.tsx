import React from 'react';
import { EChartsOption } from 'echarts';
import dynamic from 'next/dynamic';
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
interface EchartsComponentProps {
  chartOptions: EChartsOption;
  chartSeries: any;
  height?: string | number;
  width?: string | number;
  mainClass?: string;
  id?: string;
}

const SpkEcharts: React.FC<EchartsComponentProps> = ({ chartOptions, chartSeries, mainClass, height, width, id }) => {

  return (
    <ReactECharts option={{ ...chartOptions, series: chartSeries }} style={{ height, width }} key={id} className={mainClass} />
  );

};

export default SpkEcharts;
