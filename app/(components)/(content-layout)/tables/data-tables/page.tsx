"use client"
import StickyHeadTable, { CustomizedTables, DataTabless, ExportCSV, } from "@/shared/data/tables/datatablesdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface DataTablesProps { }

const DataTables: FC<DataTablesProps> = () => {

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Data Tables" />
            <Pageheader Heading="Data Tables" breadcrumbs={['Tables',]} currentpage="Data Tables" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Delete DataTable</h5>
                        </div>
                        <div className="box-body custom-delete-table">
                            <div id="basic-table" className="overflow-auto table-responsive">
                                <DataTabless />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Download DataTable</h5>
                        </div>
                        <div className="box-body space-y-3 custom-delete-table">
                            <div className="overflow-hidden">
                                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                                    <ExportCSV />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Sticky header Table</h5>
                        </div>
                        <div className="box-body space-y-3">
                            <div className="overflow-hidden">
                                <div id="" className="ti-striped-table ti-custom-table-hover">
                                    <StickyHeadTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Customization Table</h5>
                        </div>
                        <div className="box-body space-y-3">
                            <div className="overflow-hidden">
                                <div id="" className="ti-striped-table ti-custom-table-hover custom-datatable">
                                    <CustomizedTables />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-3 --> */}
        </Fragment>
    );
};

export default DataTables;