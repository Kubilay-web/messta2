import SpkRibbons from "@/shared/@spk-reusable-components/advanced-ui/spk-ribbons";
import { Ribbon4, Ribbon6, Ribbons2, Ribbons3 } from "@/shared/data/adavanec-ui/ribbonsdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface RibbonsProps { }

const Ribbons: FC<RibbonsProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Ribbons" />
            <Pageheader Heading="Ribbons" breadcrumbs={['Advanced Ui']} currentpage="Ribbons" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                RIBBON STYLE 1
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                <div className="xl:col-span-6 col-span-12">
                                    <div className="box !shadow-none mb-0 ribbon-card !fborder border-defaultborder dark:border-defaultborder/10">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="primary" ribbonPosition="ribbon-top-left" ribbonClass="ribbon">
                                                <span>ribbon</span>
                                            </SpkRibbons>
                                            <div className="card-subtitle font-semibold mb-2 text-end">Top Left Ribbon</div>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <div className="box shadow-none mb-0 ribbon-card border border-defaultborder dark:border-defaultborder/10">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="secondary" ribbonPosition="ribbon-top-right" ribbonClass="ribbon"><span>ribbon</span></SpkRibbons>
                                            <div className="card-subtitle font-semibold mb-2 text-start">Top Right Ribbon</div>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <div className="box shadow-none mb-0 ribbon-card border border-defaultborder dark:border-defaultborder/10">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="success" ribbonPosition="ribbon-bottom-left" ribbonClass="ribbon"><span>ribbon</span></SpkRibbons>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            <div className="card-subtitle font-semibold mt-2 text-end">Bottom Left Ribbon</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <div className="box shadow-none mb-0 ribbon-card border border-defaultborder dark:border-defaultborder/10">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="orange" ribbonPosition="ribbon-bottom-right" ribbonClass="ribbon"><span>ribbon</span></SpkRibbons>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            <div className="card-subtitle font-semibold mt-2 text-start">Bottom Right Ribbon</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                RIBBON STYLE 2
                            </div>
                        </div>
                        <div className="box-body !p-6">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                {Ribbons2.map((idx) => (
                                    <div className="xl:col-span-6 col-span-12" key={idx.id}>
                                        <div className="box shadow-none mb-0 border border-defaultborder dark:border-defaultborder/10">
                                            <div className="box-body !p-6">
                                                <SpkRibbons ribbonColor={idx.color} ribbonPosition={`ribbon-${idx.position}`} ribbonClass="ribbon-2">Congratulations</SpkRibbons>
                                                <span className="block pt-4 mt-2">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                                <div className={`card-subtitle font-semibold mt-2 text-${idx.class}`}>{idx.title} Ribbon</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                RIBBON STYLE 3
                            </div>
                        </div>
                        <div className="box-body !p-6">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                {Ribbons3.map((idx) => (
                                    <div key={idx.id} className="xl:col-span-3 col-span-12">
                                        <div className="box mb-0 border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                            <div className="box-body !p-6">
                                                <SpkRibbons ribbonColor={idx.color} ribbonPosition={idx.position} ribbonClass="ribbon-3">
                                                    <span><i className="fe fe-zap"></i></span>
                                                </SpkRibbons>
                                                <div className={`card-subtitle font-semibold mb-2 text-${idx.class}`}>{idx.title} Ribbon</div>
                                                <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-3 --> */}

            {/* <!-- Start:: row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">RIBBON STYLE 4</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                {Ribbon4.map((idx) => (
                                    <div key={idx.id} className="xl:col-span-6 col-span-12">
                                        <div className="box mb-0 border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                            <div className="box-body !p-6">
                                                <SpkRibbons ribbonClass="ribbon-4" ribbonColor={idx.color} ribbonPosition={idx.position}>
                                                    <span>{idx.color.includes("primary") ? "May" : "Jun"}</span>
                                                </SpkRibbons>
                                                <div className={`card-subtitle font-semibold mb-2 text-${idx.class}`}>{idx.title}  Ribbon</div>
                                                <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-4 --> */}

            {/* <!-- Start:: row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                RIBBON STYLE 5
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                <div className="xl:col-span-3 col-span-12">
                                    <div className="box mb-0 overflow-hidden border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="primary" ribbonPosition="top-left" ribbonClass="ribbon-5">OFFER</SpkRibbons>
                                            <div className="card-subtitle font-semibold mb-2 text-end">Top Left Ribbon</div>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <div className="box mb-0 overflow-hidden border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="secondary" ribbonPosition="top-right" ribbonClass="ribbon-5">OPEN</SpkRibbons>
                                            <div className="card-subtitle font-semibold mb-2 text-start">Top Right Ribbon</div>
                                            <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <div className="box mb-0 overflow-hidden border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="success" ribbonPosition="bottom-left" ribbonClass="ribbon-5">CLOSE</SpkRibbons>
                                            <span className="block mb-2">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            <div className="card-subtitle font-semibold text-end">Bottom Left Ribbon</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-3 col-span-12">
                                    <div className="box mb-0 overflow-hidden border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                        <div className="box-body !p-6">
                                            <SpkRibbons ribbonColor="orange" ribbonPosition="bottom-right" ribbonClass="ribbon-5">SALE</SpkRibbons>
                                            <span className="block mb-2">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            <div className="card-subtitle font-semibold text-start">Bottom Right Ribbon</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-5 --> */}

            {/* <!-- Start:: row-6 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">RIBBON STYLE 6</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                {Ribbon6.map((idx) => (
                                    <div key={idx.id} className="xl:col-span-6 col-span-12">
                                        <div className="box mb-0 border border-defaultborder dark:border-defaultborder/10 !shadow-none">
                                            <div className="box-body !p-6">
                                                <SpkRibbons ribbonClass={`ribbon-6 ribbon-${idx.position} ribbon-${idx.color}`}>{idx.color.includes("primary") ? "Service" : "Offer"}</SpkRibbons>
                                                <div className={`card-subtitle font-semibold mb-2 text-${idx.class}`}>{idx.title} Ribbon</div>
                                                <span className="block">Join us in congratulating [Employee Name] for their outstanding contributions and dedication. Their hard work and commitment have truly set a standard for excellence. Let's celebrate their achievements together!</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-6 --> */}
        </Fragment>
    );
};

export default Ribbons;