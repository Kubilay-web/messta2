
"use client"
import { ThemeChanger } from '@/shared/redux/action';
import store from '@/shared/redux/store';
import Link from 'next/link'
import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Image from 'next/image';
import nextConfig from '@/next.config';

const Landingheader = ({ ThemeChanger }: any) => {
    let { basePath } = nextConfig;
    function toggleNavigation() {
        if (window.innerWidth <= 992) {
            const theme = store.getState().reducer;
            ThemeChanger({ ...theme, "toggled": "open", "dataNavLayout": "horizontal" });

        }
    }
    return (
        <Fragment>
            {/* <!-- Start::Header --> */}
            <header className="app-header">

                {/* <!-- Start::main-header-container --> */}
                <div className="main-header-container container-fluid">

                    {/* <!-- Start::header-content-left --> */}
                    <div className="header-content-left">

                        {/* <!-- Start::header-element --> */}
                        <div className="header-element">
                            <div className="horizontal-logo">
                                <Link scroll={false} href="/dashboards/sales/" className="header-logo relative">
                                    <Image fill  src="/assets/images/logo.png" alt="logo" className="toggle-logo" />
                                    <Image fill src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} alt="logo" className="toggle-dark" />
                                </Link>
                            </div>
                        </div>
                        {/* <!-- End::header-element --> */}

                        {/* <!-- Start::header-element --> */}
                        <div className="header-element">
                            {/* <!-- Start::header-link --> */}
                            <Link scroll={false} aria-label="anchor" href="#!" className="sidemenu-toggle header-link" onClick={() => toggleNavigation()}>
                                <span className="open-toggle">
                                    <i className="ri-menu-3-line text-xl"></i>
                                </span>
                            </Link>
                            {/* <!-- End::header-link --> */}
                        </div>
                        {/* <!-- End::header-element --> */}

                    </div>
                    {/* <!-- End::header-content-left --> */}

                    {/* <!-- Start::header-content-right --> */}
                    <div className="header-content-right">

                        {/* <!-- Start::header-element --> */}
                        <div className="header-element !items-center">
                            {/* <!-- Start::header-link|switcher-icon --> */}
                            <div className="lg:hidden block">
                                <Link scroll={false} href="/authentication/sign-up/basic/" className="ti-btn ti-btn-soft-primary !me-2 btn-wave !m-0">
                                    Sign Up
                                </Link>
                                <Link scroll={false} aria-label="anchor" href="#!"
                                    className="ti-btn ti-btn-icon !m-0 ti-btn-success btn-wave"
                                    data-hs-overlay="#hs-overlay-switcher"><i
                                        className="ri-settings-3-line animate-spin-slow"></i></Link>
                            </div>
                            {/* <!-- End::header-link|switcher-icon --> */}
                        </div>
                        {/* <!-- End::header-element --> */}

                    </div>
                    {/* <!-- End::header-content-right --> */}

                </div>
                {/* <!-- End::main-header-container --> */}

            </header>
            {/* <!-- End::Header --> */}
        </Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Landingheader);
// export default Landingheader