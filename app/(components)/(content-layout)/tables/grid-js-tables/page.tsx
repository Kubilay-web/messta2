"use client"
import SpkGridjstables from "@/shared/@spk-reusable-components/tables/spk-gridjstable";
import { Columns, Data, Data1, Data2, Data3 } from "@/shared/data/tables/gridjsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface GridJsTablesProps { }

const GridJsTables: FC<GridJsTablesProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Grid Tables" />
            <Pageheader Heading="Grid Tables" breadcrumbs={['Tables',]} currentpage="Grid Tables" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Table
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-example1">
                                <SpkGridjstables Data={Data} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Table With Pagination
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-pagination">
                                <SpkGridjstables Data={Data} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                    Pagination={{ limit: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Table With Search
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-search">
                                <SpkGridjstables Search={true} Data={Data} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                    Pagination={{ limit: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Table Sorting
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-sorting">
                                <SpkGridjstables
                                    Sort={true}
                                    Search={true} Data={Data} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                //  Pagination={{ limit: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Table Loading
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-loading">
                                <SpkGridjstables Sort={true} Search={true} Data={Data1} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                    Pagination={{ limit: 5 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Wide Table
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-wide">
                                <SpkGridjstables reSizable={true} Sort={true} Search={true} Data={Data2} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}

            {/* <!-- Start:: row-7 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Fixed Header
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-header-fixed">
                                <SpkGridjstables fixedHeader={true} Height="350px" Sort={true} Search={true} Data={Data3} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                     />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-7 --> */}

            {/* <!-- Start:: row-8 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Hidden Columns
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-hidden-column">
                                <SpkGridjstables Sort={true} Search={true} Data={Data} Columns={["Date", "Name", "Email", "Id", "Price", "Quantity", "Total"]}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-8 --> */}

        </Fragment>
    );
};

export default GridJsTables;