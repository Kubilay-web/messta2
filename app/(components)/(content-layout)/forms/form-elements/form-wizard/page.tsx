"use client"
import HorizontalNonLinearStepper from "@/shared/data/forms/formwizarddata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";

interface FormWizardProps { }

const FormWizard: FC<FormWizardProps> = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Form Wizard" />
            <Pageheader Heading="Form Wizard" breadcrumbs={['Forms', ' Form Elements']} currentpage="Form Wizard" />
            {/* <!-- Page Header Close --> */}
            
            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                FORM WIZARD
                            </div>
                        </div>
                        <div className="box-body pb-7 custom-form">
                            <HorizontalNonLinearStepper />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default FormWizard;