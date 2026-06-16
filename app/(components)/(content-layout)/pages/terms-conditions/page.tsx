"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";

const TermsConditions = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Terms & Conditions" />
            <Pageheader Heading="Terms & Conditions" breadcrumbs={['Pages']} currentpage="Terms & Conditions" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6 justify-center">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-[3rem]">
                            <div className="mb-4">
                                <span className="block font-medium text-gradient text-[1rem]">Last Updated - 21,May 2024</span>
                            </div>
                            <h5 className="font-medium mb-3">Welcome to Spruko,</h5>
                            <p className="mb-4">By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully:</p>

                            <ul className="terms-list list-unstyled mb-0">
                                <li><p className="mb-1"><strong>Acceptance of Terms :</strong></p> By using our services, you agree to comply with these terms and any additional terms that may apply.</li>

                                <li><p className="mb-1"><strong>Eligibility :</strong></p> You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this requirement.</li>

                                <li><p className="mb-1"><strong>Account Registration :</strong></p> To access certain features of our services, you may be required to register for an account. You agree to provide accurate and complete information during the registration process.</li>

                                <li><p className="mb-1"><strong>User Conduct :</strong></p> You are solely responsible for your conduct while using our services. Unacceptable behavior, including but not limited to harassment, abuse, or violation of third-party rights, may result in the suspension or termination of your account.</li>

                                <li><p className="mb-1"><strong>Intellectual Property :</strong></p> All content, trademarks, and intellectual property on our website are owned by [Your Company Name]. You may not use, reproduce, or distribute any content from our services without our prior written consent.</li>

                                <li><p className="mb-1"><strong>Privacy :</strong></p> We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and disclose your information. By using our services, you consent to the practices outlined in the Privacy Policy.
                                    <ul className="mt-2 ps-[2rem] list-disc">
                                        <li>We may collect personal information, such as your name, email address, and location, to provide a personalized experience.</li>
                                        <li>Your information will not be shared with third parties without your explicit consent.</li>
                                        <li>We use cookies to enhance user experience and track website usage.</li>
                                    </ul>
                                </li>

                                <li><p className="mb-1"><strong>Termination :</strong></p> We reserve the right to terminate or suspend your account at any time for any reason without notice.</li>

                                <li><p className="mb-1"><strong>Disclaimer :</strong></p> Our services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of the content on our website. Use information at your own risk.
                                    <ul className="mt-2 ps-[2rem] list-disc">
                                        <li>This includes but is not limited to:</li>
                                        <li>Any errors or omissions in the content</li>
                                        <li>Any loss or damage of any kind incurred as a result of the use of the content</li>
                                        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                                    </ul>
                                </li>

                                <li><p className="mb-1"><strong>Changes to Terms :</strong></p> We may update these terms and conditions from time to time. Any changes will be effective immediately upon posting. It is your responsibility to review the terms periodically.</li>

                                <li><p className="mb-1"><strong>Contact :</strong></p> If you have any questions or concerns regarding these terms, please contact us at [Your Contact Email].</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default TermsConditions;