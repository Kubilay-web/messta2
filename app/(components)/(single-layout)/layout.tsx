"use client"
import PrelineScript from '@/app/PrelineScript';
import Backtotop from '@/shared/layouts-components/backtotop/backtotop';
import Landingfooter from '@/shared/layouts-components/landingfooter.tsx/landingfooter';
import Landingsidebar from '@/shared/layouts-components/landingsidebar/landingsidebar';
import LandingSwitcher from '@/shared/layouts-components/switcher/landing-switcher';
import store from '@/shared/redux/store';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ThemeChanger } from "@/shared/redux/action";
import { connect } from "react-redux";
import Landingheader from '@/shared/layouts-components/landingheader/landingheader';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Layout = ({ children, ThemeChanger ,local_varaiable}: any) => {
  const Currentpath = usePathname();
  const pathName = usePathname()
  const [lateLoad, setlateLoad] = useState(false)


  useEffect(() => {
    setlateLoad(true);
    const theme = store.getState().reducer;
    ThemeChanger({
      ...theme,
      dataNavLayout: "horizontal",
      dataNavStyle: Currentpath.includes("/landing") || Currentpath.includes("/classified-details") ? "menu-hover" : "menu-hover",
      dataHeaderStyles: "",
      dataVerticalStyle: "",
      body: Currentpath.includes("/single-landing") ? "bg-white dark:!bg-bodybg" : "landing-body ecommerce-landing classified-landing",


    });

    return () => {

      ThemeChanger({
        ...theme,
        dataNavStyle: "",
        dataVerticalStyle: "",
        dataHeaderStyles: "",
        dataNavLayout: `${localStorage.mamixlayout == "horizontal" ? "horizontal" : "vertical"
          }`,
        body: local_varaiable.body ? local_varaiable.body : "",



      });
    };
  }, []);
  return (
    <Fragment>
      <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
        <LandingSwitcher />
            {children}
      </div>
      <PrelineScript />
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state.reducer
});


export default connect(mapStateToProps, { ThemeChanger })(Layout);

