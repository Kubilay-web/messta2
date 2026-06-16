import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ApexchartsComponentProps {
  chartOptions: any;
  chartSeries: any;
  height?: string | number;
  width?: string | number;
  type?: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'scatter' | 'radar' | 'candlestick' | any;
}

const Spkapexcharts: React.FC<ApexchartsComponentProps> = ({ chartOptions, chartSeries, height, width, type }) => {

  return (
    <ReactApexChart options={chartOptions} series={chartSeries} height={height} width={width} type={type} />
  );

};

export default Spkapexcharts;
