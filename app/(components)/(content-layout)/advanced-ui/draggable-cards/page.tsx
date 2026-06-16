"use client";
import React, { FC, Fragment, } from "react";
import dynamic from "next/dynamic";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
const Draggabledata = dynamic(() => import("@/shared/data/adavanec-ui/draggabledata"), { ssr: false });
interface DraggableCardsProps { }

const DraggableCards: FC<DraggableCardsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Draggable Cards" />
            <Pageheader Heading="Draggable Cards" breadcrumbs={['Advanced Ui']} currentpage="Draggable Cards" />
            {/* <!-- Page Header Close --> */}

            <Draggabledata />
        </Fragment>
    );
};

export default DraggableCards;