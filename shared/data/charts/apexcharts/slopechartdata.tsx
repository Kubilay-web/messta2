import { Component } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

interface spark3 {
  options?: ApexOptions,
  width?: string | number,
  height?: string | number,
  series?: ApexOptions['series'],
  [key: string]: any
  label?: XAxisAnnotations
  endingShape?: string
}

//Basic Slope Chart

export class Basicslope extends Component<{}, spark3>
{
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Primary',
          data: [
            {
              x: 'Jan',
              y: 43,
            },
            {
              x: 'Feb',
              y: 58,
            },
          ],
        },
        {
          name: 'Primary1',
          data: [
            {
              x: 'Jan',
              y: 33,
            },
            {
              x: 'Feb',
              y: 38,
            },
          ],
        },
        {
          name: 'Warning',
          data: [
            {
              x: 'Jan',
              y: 55,
            },
            {
              x: 'Feb',
              y: 21,
            },
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        colors: ["#5c67f7", "#E354D4", "#FFC658", "#9e5cf7"]
      }

    };
  }

  render() {
    return (
      <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" width={"100%"} height={320} />

    );
  }
}

//Multi-group Slope Chart

export class MultigroupSlope extends Component<{}, spark3>
{
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Primary',
          data: [
            {
              x: 'Category 1',
              y: 503,
            },
            {
              x: 'Category 2',
              y: 580,
            },
            {
              x: 'Category 3',
              y: 135,
            },
          ],
        },
        {
          name: 'Primary1',
          data: [
            {
              x: 'Category 1',
              y: 733,
            },
            {
              x: 'Category 2',
              y: 385,
            },
            {
              x: 'Category 3',
              y: 715,
            },
          ],
        },
        {
          name: 'Warning',
          data: [
            {
              x: 'Category 1',
              y: 255,
            },
            {
              x: 'Category 2',
              y: 211,
            },
            {
              x: 'Category 3',
              y: 441,
            },
          ],
        },
        {
          name: 'Secondary',
          data: [
            {
              x: 'Category 1',
              y: 428,
            },
            {
              x: 'Category 2',
              y: 749,
            },
            {
              x: 'Category 3',
              y: 559,
            },
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        tooltip: {
          followCursor: true,
          intersect: false,
          shared: true,
        },
        dataLabels: {
          background: {
            enabled: true,
          },
          formatter(val, opts) {
            const seriesName = opts.w.config.series[opts.seriesIndex].name
            return val !== null ? seriesName : ''
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
          },
        },
        xaxis: {
          position: 'bottom',
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
        },
        stroke: {
          width: [2, 3, 4, 2],
          dashArray: [0, 0, 5, 2],
          curve: 'smooth',
        },
        colors: ["#5c67f7", "#E354D4", "#FFC658", "#9e5cf7"]
      }

    };
  }

  render() {
    return (
      <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" width={"100%"} height={320} />

    );
  }
}