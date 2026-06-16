"use client";
import dynamic from "next/dynamic";
import { Lineannotationoptions, Lineannotationseries, Linebasicoptions, Linebasicseries, Linebrushoptions, Linebrushseries, Linedashoptions, Linedashseries, Linedataoptions, Linedataseries, Linegardientoptions, Linegardientseries, Linenulloptions, Linenullseries, Linerealoptions, Linerealseries, Linestepoptions, Linestepseries, Linesyncoptions, Linesyncseries, Linezoomoptions, Linezoomseries, optionsArea, optionsLine, optionsLine2, seriesArea, seriesLine, seriesLine2 } from "@/shared/data/charts/apexcharts/linechartsdata";
import { Fragment } from "react";
const Spkapexcharts = dynamic(() => import('@/shared/@spk-reusable-components/spk-packages/apexcharts-component'), { ssr: false });

const LineChart1 = () => {

  return (
    <Fragment>
      

      {/* Start::row-1 */}
       <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Basic Line Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="line-chart">
                              <Spkapexcharts chartOptions={Linebasicoptions} chartSeries={Linebasicseries} type="line" width={"100%"} height={300} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Line Chart With Data Labels</div>
                      </div>
                      <div className="box-body">
                          <div id="line-chart-datalabels">
                                <Spkapexcharts chartOptions={Linedataoptions} chartSeries={Linedataseries} type="line" width={"100%"} height={300} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Zoomable Time Series</div>
                      </div>
                      <div className="box-body">
                          <div id="zoom-chart">
                                <Spkapexcharts chartOptions={Linezoomoptions} chartSeries={Linezoomseries} type="area" width={"100%"} height={300} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Line With Annotations</div>
                      </div>
                      <div className="box-body">
                          <div id="annotation-chart">
                              <Spkapexcharts chartOptions={Lineannotationoptions} chartSeries={Lineannotationseries} type="area" width={"100%"} height={300} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Brush Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="brush-chart1">
                              <Spkapexcharts chartOptions={Linebrushoptions} chartSeries={Linebrushseries} type="line" width={"100%"} height={200} />
                          </div>
                          <div id="brush-chart">
                              <Spkapexcharts chartOptions={optionsLine} chartSeries={seriesLine} type="area" width={"100%"} height={170} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">StepLine Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="stepline-chart">
                                <Spkapexcharts chartOptions={Linestepoptions} chartSeries={Linestepseries} type="line" width={"100%"} height={380} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Gradient Line Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="gradient-chart">
                              <Spkapexcharts chartOptions={Linegardientoptions} chartSeries={Linegardientseries} type="line" width={"100%"} height={350} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Missing/Null Values Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="null-chart">
                              <Spkapexcharts chartOptions={Linenulloptions} chartSeries={Linenullseries} type="line" width={"100%"} height={350} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Real Time Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="dynamic-chart">
                              <Spkapexcharts chartOptions={Linerealoptions} chartSeries={Linerealseries} type="line" width={"100%"} height={350} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Dashed Line Chart</div>
                      </div>
                      <div className="box-body">
                          <div id="dashed-chart">
                                <Spkapexcharts chartOptions={Linedashoptions} chartSeries={Linedashseries} type="line" width={"100%"} height={350} />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="xl:col-span-6 col-span-12">
                  <div className="box">
                      <div className="box-header">
                          <div className="box-title">Syncing Charts</div>
                      </div>
                      <div className="box-body">
                          <div id="chart-line">
                              <Spkapexcharts chartOptions={Linesyncoptions} chartSeries={Linesyncseries} type="line" width={"100%"} height={160} />
                          </div>
                          <div id="chart-line2">
                                <Spkapexcharts chartOptions={optionsLine2} chartSeries={seriesLine2} type="line" width={"100%"} height={160} />
                          </div>
                          <div id="chart-area">
                                <Spkapexcharts chartOptions={optionsArea} chartSeries={seriesArea} type="area" width={"100%"} height={160} />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      {/* End::row-1 */}
    </Fragment>
  );
};

export default LineChart1;






