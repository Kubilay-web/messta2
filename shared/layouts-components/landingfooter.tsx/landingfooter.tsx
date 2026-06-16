import Link from 'next/link'
import React, { Fragment } from 'react'

const Landingfooter = () => {
    return (
        <Fragment>
            {/* <!-- Start:: Footer --> */}
            <div className="landing-main-footer py-3 mt-auto">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6 items-center">
                        <div className="lg:col-span-6 col-span-12 lg:text-start text-center">
                            <span className="text-white opacity-70 text-[0.875rem]"> © Copyright <span id="year">2025</span> <a
                                href="#!" className="text-primary text-[0.875rem] font-semibold">Mamix</a>.
                            </span>
                        </div>
                        <div className="lg:col-span-6 col-span-12 lg:text-end text-center">
                            <ul className="list-unstyled font-normal landing-footer-list mb-0">
                                <li>
                                    <Link scroll={false} href="#!" className="text-white opacity-80">Terms Of Service</Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!" className="text-white opacity-80">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!" className="text-white opacity-80">Legal</Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!" className="text-white opacity-80">Contact</Link>
                                </li>
                                <li>
                                    <Link scroll={false} href="#!" className="text-white opacity-80">Report Abuse</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: Footer --> */}
        </Fragment>
    )
}

export default Landingfooter