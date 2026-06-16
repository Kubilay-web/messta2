"use client"
import Footer from '@/shared/layouts-components/footer/footer';
import Header from '@/shared/layouts-components/header/header';
import Sidebar from '@/shared/layouts-components/sidebar/sidebar';
import SidebarNew from '@/shared/layouts-components/sidebarnew/layouts/sidebar/page';
import Switcher from '@/shared/layouts-components/switcher/switcher';
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux"
import { ThemeChanger } from "@/shared/redux/action"
import Backtotop from '@/shared/layouts-components/backtotop/backtotop';
import Loader from '@/shared/layouts-components/loader/loader';
import PrelineScript from "@/app/PrelineScript"


const Layout = ({ children, }: any) => {
    const [lateLoad, setlateLoad] = useState(false);
    useEffect(() => {
        setlateLoad(true);
    });
    return (
        <Fragment>
            <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
                <Switcher />
                <Loader />
                <div className='page'>
                    <Header />
                      <Sidebar />  
                    <div className='content main-index'>
                  
                        <div className='main-content'>
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
                <Backtotop />
            </div>
            <PrelineScript/>
        </Fragment>
    )

}

const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Layout);