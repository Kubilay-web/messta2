"use client"
import React, { Fragment } from "react";
import { Gallerylist } from "@/shared/data/apps/gallerydata";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

const Gallery = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Gallery" />
            <Pageheader Heading="Gallery" breadcrumbs={['Apps']} currentpage="Gallery" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <Gallerylist />
            {/* <!--End::row-1 --> */}

        </Fragment>
    );
};

export default Gallery;