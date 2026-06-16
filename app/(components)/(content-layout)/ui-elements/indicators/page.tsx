
"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface IndicatorsProps { }

const Indicators: FC<IndicatorsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Indicators" />
            <Pageheader Heading="Indicators" breadcrumbs={['Ui Elements']} currentpage="Indicators" />
            {/* <!-- Page Header Close --> */}
            
            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Basic Legend Indicator</h5>
                        </div>
                        <div className="box-body">
                            <div className="inline-flex items-center">
                                <span className="w-2 h-2 inline-block bg-gray-500 dark:bg-white/80 rounded-full me-2"></span>
                                <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Legend indicator</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Color variations Legend Indicator</h5>
                        </div>
                        <div className="box-body">
                            <div className="grid gap-y-2">
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-black/20 rounded-full me-2 dark:bg-white"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Dark</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-gray-500 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Gray</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-red-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Red</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-yellow-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Yellow</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-blue-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Green</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-blue-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Blue</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-indigo-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Indigo</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-purple-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Purple</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-pink-600 rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Pink</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-light rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Light</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Template Color variations Legend Indicator</h5>
                        </div>
                        <div className="box-body">
                            <div className="grid gap-y-2">
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-primary rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Primary</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-secondary rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Secondary</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-warning rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Warning</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-success rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Success</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-info rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Info</span>
                                </div>
                                <div className="inline-flex items-center">
                                    <span className="w-2 h-2 inline-block bg-danger rounded-full me-2"></span>
                                    <span className="text-defaulttextcolor dark:text-defaulttextcolor/80">Danger</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}
        </Fragment>
    );
};

export default Indicators;