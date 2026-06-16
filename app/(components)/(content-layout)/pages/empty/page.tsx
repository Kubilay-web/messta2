"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";

const Empty = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Empty" />
            <Pageheader Heading="Empty" breadcrumbs={['Pages']} currentpage="Empty" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <h6 className="mb-0 font-medium">EMPTY CARD</h6>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default Empty;